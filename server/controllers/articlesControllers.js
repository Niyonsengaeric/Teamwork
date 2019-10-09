import moment from 'moment';
import { Client } from 'pg';
import validate from '../middlewares/validateArticles';
import validateComment from '../middlewares/validatecomment';
import response from '../helpers/response';

const { DATABASE_URL } = process.env;
const connectionString = DATABASE_URL;
const client = new Client({
  connectionString,
});
client.connect();

class articlescontrolllers {
  static async newArticle(req, res) {
    try {
      const { error } = validate(req.body);
      if (error) { return response.response(res, 422, 'error', `${error.details[0].message}`, true); }
      const { title, article } = req.body;
      const { id, isAdmin } = req.user;
      if (isAdmin) { response.response(res, 403, 'error', 'Not allowed for an administrator to create an articles', true); } else {
        const getuserinfo = await client.query('SELECT * FROM users WHERE id=$1', [
          id,
        ]);
        const { id: author_id, first_name, last_name } = getuserinfo.rows[0];

        const checkArticleExisting = await client.query(
          'SELECT * FROM articles WHERE title=$1 AND author_id=$2',
          [title, id],
        );

        if (checkArticleExisting.rows.length > 0) {
          response.response(res, 409, 'error', ` Article arleady registered with An ID Of :  ${checkArticleExisting.rows[0].article_id} `, true);
        } else {
          const authorName = `${first_name} ${last_name}`;
          client.query('INSERT INTO articles(created_on, title, author_id, author_name, article) VALUES($1,$2,$3,$4,$5)', [
            moment().format(),
            title,
            author_id,
            authorName,
            article,
          ]);
          const getarticleinfo = await client.query(
            'SELECT * FROM articles WHERE title=$1 AND author_id=$2',
            [title, id],
          );
          const { article_id: articleId, created_on: createdOn } = getarticleinfo.rows[0];
          const data = {
            articleId, createdOn, title, authorName, article,
          };
          response.response(res, 201, 'Article created successfully', data, false);
        }
      }

      return (article);
    } catch (error) {
      return error;
    }
  }

  static async editArticle(req, res) {
    try {
      const { error } = validate(req.body);
      if (error) { return response.response(res, 422, 'error', `${error.details[0].message}`, true); }
      const { id: userId } = req.user;
      const { title, article } = req.body;
      const { id } = req.params;
      if (isNaN(id)) {
        return response.response(res, 400, 'error', 'ArticleId must be an integer', true);
      }

      const checkArticleExisting = await client.query(
        'SELECT * FROM articles WHERE title=$1 AND author_id=$2 AND article=$3',
        [title, userId, article],
      );
      const findArticleindex = await client.query(
        'SELECT * FROM articles WHERE article_id=$1 AND author_id=$2',
        [parseInt(id, 10), userId],
      );
      if (findArticleindex.rows.length > 0) {
        if (checkArticleExisting.rows.length > 0) {
          response.response(res, 409, 'error', 'Article arleady updated', true);
        } else {
          const updateArticle = client.query('UPDATE articles SET title=$1, article=$2 where article_id = $3', [
            title, article, id,
          ]);
          const editedArticle = await client.query('SELECT * FROM articles WHERE article_id=$1 AND author_id=$2',
            [parseInt(id, 10), userId]);
          const {
            article_id: articleId, created_on: createdOn, author_id: authorId,
            author_name: authorName,
          } = editedArticle.rows[0];

          const data = {
            articleId, createdOn, title, authorId, authorName, article,
          };

          return response.response(res, 200, 'Article successfully edited”', data, false);
        }
      } else { response.response(res, 404, 'error', 'No article found', true); }


      return (articles);
    } catch (error) {
      return error;
    }
  }

  static async deleteArticle(req, res) {
    try {
      const { id: userId, isAdmin } = req.user;
      const { id } = req.params;

      if (isNaN(id)) {
        return response.response(res, 400, 'error', 'You request parameter must be an integer', true);
      }

      const findArticleOwner = await client.query(
        'SELECT * FROM articles WHERE article_id=$1 AND author_id=$2',
        [parseInt(id, 10), userId],
      );

      const articleFlaged = await client.query(
        'SELECT * FROM flags WHERE flaged_id=$1 AND type=$2',
        [parseInt(id, 10), 'article'],
      );

      if (isAdmin) {
        const findArticle = await client.query(
          'SELECT * FROM articles WHERE article_id=$1',
          [parseInt(id, 10)],
        );
        if (findArticle.rows.length > 0) {
          if (articleFlaged.rows.length <= 0) {
            return response.response(res, 403, 'error', 'Article not flagged  ', true);
          }
          client.query('DELETE FROM articles WHERE article_id=$1', [
            parseInt(id, 10),
          ]);

          client.query('DELETE FROM flags WHERE flaged_id=$1 AND type=$2', [
            parseInt(id, 10), 'article',
          ]);


          response.response(res, 200, 'Article successfully deleted');
        } else { return response.response(res, 404, 'error', 'Article not found  ', true); }
      } else if (findArticleOwner.rows.length > 0) {
        client.query('DELETE FROM articles WHERE article_id=$1', [
          parseInt(id, 10),
        ]);
        response.response(res, 200, 'Article successfully deleted');
      } else {
        return response.response(res, 404, 'error', 'Article not found  ', true);
      }
      return (articles);
    } catch (error) {
      return error;
    }
  }

  static async commentArticle(req, res) {
    try {
      const { error } = validateComment(req.body);
      if (error) {
        return response.response(res, 422, 'error', `${error.details[0].message}`, true);
      }

      const { id: userId, isAdmin } = req.user;
      const { id } = req.params;
      const { comment } = req.body;

      if (isNaN(id)) {
        return response.response(res, 400, 'error', 'Your request parameter must be an integer', true);
      }

      if (isAdmin) {
        response.response(res, 403, 'error', 'Not allowed for an administrator to comment on  articles', true);
      } else {
        const checkArticleinfo = await client.query(
          'SELECT  created_on as "createdOn", title, article FROM articles WHERE article_id=$1',
          [parseInt(id, 10)],
        );
        if (checkArticleinfo.rows.length > 0) {
          const { createdOn, title, article } = checkArticleinfo.rows[0];
          client.query('INSERT INTO comments(article_id, author_id, comment) VALUES($1,$2,$3)', [
            parseInt(id, 10),
            userId,
            comment,
          ]);
          const data = {
            createdOn, title, article, comment,
          };
          response.response(res, 201, 'Comment added successfully', data, false);
        } else {
          return response.response(res, 404, 'error', 'Article Not Found  ', true);
        }
      }
      return (articles);
    } catch (error) {
      return error;
    }
  }

  static async getArticles(req, res) {
    try {
      const data = [];
      let j = 0;
      await client.query('SELECT article_id as "articleId",created_on as "createdOn", title,author_name as "authorName",article FROM articles', (err, result) => {
        if (result.rows.length <= 0) {
          return response.response(res, 404, 'error', 'No article registered yet  ', true);
        }
        for (let i = result.rows.length - 1; i >= 0; i -= 1) {
          data[j] = result.rows[i];
          j += 1;
        }
        return response.response(res, 200, 'List of articles', data, false);
      });
      return (data);
    } catch (error) {
      return error;
    }
  }

  static async specificArticle(req, res) {
    try {
      const { id } = req.params;

      if (isNaN(id)) {
        return response.response(res, 400, 'error', 'Your request parameter must be an integer', true);
      }
      const findArticle = await client.query(
        'SELECT  article_id as "articleId",created_on as "createdOn", title,author_id as "authorId",author_name as "authorName", article FROM articles WHERE article_id=$1',
        [parseInt(id, 10)],
      );

      if (findArticle.rows.length > 0) {
        const articleComments = await client.query(
          'SELECT comment_id as "commentId",author_id as "authorId",comment FROM comments WHERE article_id=$1',
          [parseInt(id, 10)],
        );
        const {
          articleId, createdOn, title, article, authorId, authorName,
        } = findArticle.rows[0];
        const data = {
          articleId,
          createdOn,
          title,
          article,
          authorId,
          authorName,
          comments: articleComments.rows,
        };
        response.response(res, 200, 'Article successfully retrieved', data, false);
      } else { return response.response(res, 404, 'error', 'Article not Found  ', true); }
      return (findArticle);
    } catch (error) {
      return error;
    }
  }

  static async filterArticle(req, res) {
    try {
      if (req.query.tag) {
        const { tag } = req.query;

        const checkTag = await client.query(
          'SELECT article_id as "articleId",created_on as "createdOn",title,author_id as "authorId",author_name as "authorName",article FROM articles WHERE article LIKE $1',
          [`%${tag}%`],
        );

        if (checkTag.rows.length > 0) {
          response.response(res, 200, 'Search details', checkTag.rows, false);
        } else {
          return response.response(res, 404, 'error', `${tag} does not match with any article`, true);
        }
      } else { return response.response(res, 400, 'error', 'Please enter the tag', true); }
    } catch (error) {
      return error;
    }
  }
}

export default articlescontrolllers;
