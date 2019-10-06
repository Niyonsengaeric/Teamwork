import flags from '../models/flagsModels';
import articles from '../models/articlesModels';
import validateArticle from '../middlewares/validateflag';
import response from '../helpers/response';
import comments from '../models/commentsModels';


class flagsController {
  static async flagArticle(req, res) {
    try {
      const { id: userId } = req.user;
      const { error } = validateArticle(req.body);
      if (error) { return response.response(res, 422, 'error', `${error.details[0].message}`, true); }

      const { id } = req.params;
      const findowner = await articles.filter(
        (article) => article.articleId === parseInt(id, 10) && article.authorId === userId,
      );
      if (findowner.length > 0) {
        return response.response(res, 403, 'error', 'you can not flag your own article  ', true);
      }

      const findarticle = await articles.filter(
        (article) => article.articleId === parseInt(id, 10),
      );

      if (findarticle.length > 0) {
        const { article } = findarticle[0];
        const { reason: motif } = req.body;

        const arledyFlaged = await flags.filter(
          (flag) => flag.flagedId === parseInt(id, 10) && flag.reason === motif,
        );
        if (arledyFlaged.length > 0) {
          return response.response(res, 409, 'error', 'article arleady flagged with the same reason  ', true);
        }
        const data = {
          flagId: flags.length + 1,
          type: 'article',
          flagedId: parseInt(id, 10),
          content: article,
          reason: motif,
        };
        flags.push(data);
        response.response(res, 201, 'report send successfully', data, false);
      } else { return response.response(res, 404, 'error', 'article Not Found  ', true); }
      return (findarticle);
    } catch (error) {
      return error;
    }
  }

  static async flagComment(req, res) {
    try {
      const { id: userId } = req.user;
      const { error } = validateArticle(req.body);
      if (error) { return response.response(res, 422, 'error', `${error.details[0].message}`, true); }

      const { id } = req.params;

      const findowner = await comments.filter(
        (comment) => comment.commentId === parseInt(id, 10) && comment.authorId === userId,
      );
      if (findowner.length > 0) {
        return response.response(res, 403, 'error', 'you can not flag your comment  ', true);
      }

      const findcomment = await comments.filter(
        (comment) => comment.commentId === parseInt(id, 10),
      );

      if (findcomment.length > 0) {
        const { comment } = findcomment[0];
        const { reason: motif } = req.body;
        const arledyFlaged = await flags.filter(
          (flag) => flag.flagedId === parseInt(id, 10) && flag.reason === motif,
        );
        if (arledyFlaged.length > 0) {
          return response.response(res, 409, 'error', 'Comment arleady flagged with the same reason  ', true);
        }
        const data = {
          flagId: flags.length + 1,
          type: 'comment',
          flagedId: parseInt(id, 10),
          content: comment,
          reason: motif,
        };
        flags.push(data);
        response.response(res, 201, 'report send successfully', data, false);
      } else { return response.response(res, 404, 'error', 'comment Not Found  ', true); }
      return (findcomment);
    } catch (error) {
      return error;
    }
  }

  static async getFlags(req, res) {
    try {
      return response.response(res, 200, 'Lists Of flagged items', flags, false);
    } catch (error) {
      return error;
    }
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
