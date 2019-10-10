import { Client } from 'pg';
import flags from '../models/flagsModels';
import validateArticle from '../middlewares/validateflag';
import response from '../helpers/response';
import comments from '../models/commentsModels';


const { DATABASE_URL } = process.env;
const connectionString = DATABASE_URL;
const client = new Client({
  connectionString,
});
client.connect();


class flagsController {
  static async flagArticle(req, res) {
    try {
      const { id } = req.params;
      const { id: userId } = req.user;
      const { error } = validateArticle(req.body);
      if (error) { return response.response(res, 422, 'error', `${error.details[0].message}`, true); }
      if (isNaN(id)) {
        return response.response(res, 400, 'error', 'Your request parameter must be an integer', true);
      }

      const findArticleOwner = await client.query(
        'SELECT * FROM articles WHERE article_id=$1 AND author_id=$2',
        [parseInt(id, 10), userId],
      );

      if (findArticleOwner.rows.length > 0) {
        return response.response(res, 403, 'error', 'You can not flag your own article  ', true);
      }

      const findarticleinfo = await client.query(
        'SELECT * FROM articles WHERE article_id=$1',
        [parseInt(id, 10)],
      );

      if (findarticleinfo.rows.length > 0) {
        const { article } = findarticleinfo.rows[0];
        const { reason: motif } = req.body;

        const alreadyFlaged = await client.query(
          'SELECT * FROM flags WHERE flaged_id=$1 AND reason=$2',
          [parseInt(id, 10), motif],
        );

        if (alreadyFlaged.rows.length > 0) {
          return response.response(res, 409, 'error', 'Article arleady flagged with the same reason  ', true);
        }

        client.query('INSERT INTO flags(type, flaged_id, content, reason) VALUES($1,$2,$3,$4)', [
          'article',
          parseInt(id, 10),
          article,
          motif,
        ]);

        const data = {
          type: 'article',
          content: article,
          reason: motif,
        };

        response.response(res, 201, 'Report send successfully', data, false);
      } else { return response.response(res, 404, 'error', 'Article Not Found  ', true); }
      return (findarticleinfo);
    } catch (error) {
      return error;
    }
  }

  static async flagComment(req, res) {
    try {
      const { id } = req.params;
      const { id: userId } = req.user;
      const { error } = validateArticle(req.body);
      if (error) { return response.response(res, 422, 'error', `${error.details[0].message}`, true); }


      if (isNaN(id)) {
        return response.response(res, 400, 'error', 'Request parameter must be an integer', true);
      }
      const findCommentOwner = await client.query(
        'SELECT * FROM comments WHERE comment_id=$1 AND author_id=$2',
        [parseInt(id, 10), userId],
      );
      if (findCommentOwner.rows.length > 0) {
        return response.response(res, 403, 'error', 'You can not flag your own article  ', true);
      }
      const findcommentinfo = await client.query(
        'SELECT * FROM comments WHERE comment_id=$1',
        [parseInt(id, 10)],
      );

      if (findcommentinfo.rows.length > 0) {
        const { comment } = findcommentinfo.rows[0];
        const { reason: motif } = req.body;

        const alreadyFlaged = await client.query(
          'SELECT * FROM flags WHERE flaged_id=$1 AND reason=$2',
          [parseInt(id, 10), motif],
        );

        if (alreadyFlaged.rows.length > 0) {
          return response.response(res, 409, 'error', 'Comment arleady flagged with the same reason  ', true);
        }
        client.query('INSERT INTO flags(type, flaged_id, content, reason) VALUES($1,$2,$3,$4)', [
          'comment',
          parseInt(id, 10),
          comment,
          motif,
        ]);
        const data = {
          type: 'comment',
          content: comment,
          reason: motif,
        };
        flags.push(data);
        response.response(res, 201, 'Report send successfully', data, false);
      } else { return response.response(res, 404, 'error', 'Comment Not Found  ', true); }
      return (findcommentinfo);
    } catch (error) {
      return error;
    }
  }

  static async getFlags(req, res) {
    client.query('SELECT flag_id as "flagId",type, flaged_id as "itemId",content, reason FROM flags', (err, result) => response.response(res, 200, 'List Of flagged items', result.rows, false));
  }

  static async deleteComment(req, res) {
    try {
      const { id } = req.params;
      const findComment = await comments.findIndex(
        (findComments) => findComments.commentId === parseInt(id, 10),
      );
      const findflag = await flags.findIndex(
        (findflags) => findflags.flagedId === parseInt(id, 10) && findflags.type === 'comment',
      );

      if (findComment !== -1) {
        if (findflag === -1) {
          return response.response(res, 403, 'error', 'comment not flagged  ', true);
        }
        comments.splice(findComment, 1);
        flags.splice(findflag, 1);
        response.response(res, 200, 'comment successfully deleted');
      } else { return response.response(res, 404, 'error', 'comment Not Found  ', true); }
      return (findComment);
    } catch (error) {
      return error;
    }
  }
}
export default flagsController;
