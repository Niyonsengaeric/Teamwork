import moment from 'moment';
import { Client } from 'pg';
import flags from '../models/flagsModels';
import validate from '../middlewares/validateArticles';
import validateComment from '../middlewares/validatecomment';
import articles from '../models/articlesModels';
import comments from '../models/commentsModels';
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
      if (isAdmin) { response.response(res, 403, 'error', 'not allowed for Administrator to create Articles', true); } else {
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
        return response.response(res, 400, 'error', 'articleId must be an integer', true);
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

          return response.response(res, 200, 'article successfully edited”', data, false);
        }
      } else { response.response(res, 404, 'error', 'No article Found', true); }


      return (articles);
    } catch (error) {
      return error;
    }
  }

  static async deleteArticle(req, res) {
    try {
      const { id: userId, isAdmin } = req.user;
      const { id } = req.params;

      const findOwnerindex = await articles.findIndex(
        (findArticle) => findArticle.articleId === parseInt(id, 10)
          && findArticle.authorId === userId,
      );
      const findflag = await flags.findIndex(
        (findflags) => findflags.flagedId === parseInt(id, 10) && findflags.type === 'article',
      );

      if (isAdmin) {
        const findArticle = await articles.findIndex(
          (findArticles) => findArticles.articleId === parseInt(id, 10),
        );
        if (findArticle !== -1) {
          if (findflag === -1) {
            return response.response(res, 403, 'error', 'Article not flagged  ', true);
          }
          articles.splice(findArticle, 1);
          flags.splice(findflag, 1);
          response.response(res, 200, 'article successfully deleted');
        } else { return response.response(res, 404, 'error', 'article Not Found  ', true); }
      } else if (findOwnerindex !== -1) {
        articles.splice(findOwnerindex, 1);
        response.response(res, 200, 'article successfully deleted');
      } else {
        return response.response(res, 404, 'error', 'article Not Found  ', true);
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

      if (isAdmin) {
        response.response(res, 401, 'error', 'not allowed for Administrator to comment on  Articles', true);
      } else {
        const checkArticle = await articles.findIndex(
          (findArticle) => findArticle.articleId === parseInt(id, 10),
        );
        if (checkArticle !== -1) {
          const { createdOn, title, article } = articles[checkArticle];
          const addCommet = {
            commentId: comments.length + 1,
            articleId: parseInt(id, 10),
            authorId: userId,
            comment,
          };
          comments.push(addCommet);
          const data = {
            createdOn, title, article, comment,
          };
          response.response(res, 201, 'comment Added successfully', data, false);
        } else {
          return response.response(res, 404, 'error', 'article Not Found  ', true);
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

      if (articles.length === 0) {
        return response.response(res, 404, 'error', 'no article Registered yet  ', true);
      }
      for (let i = articles.length - 1; i >= 0; i -= 1) {
        data[j] = articles[i];
        j += 1;
      }
      return response.response(res, 200, 'List of Articles', data, false);
    } catch (error) {
      return error;
    }
  }

  static async specificArticle(req, res) {
    try {
      const { id } = req.params;

      const findArticle = articles.filter(
        (specfarticles) => specfarticles.articleId === parseInt(id, 10),
      );
      if (findArticle.length > 0) {
        const getcomments = await comments.filter(
          (article) => article.articleId === parseInt(id, 10),
        );
        const {
          articleId, createdOn, title, article, authorId,
        } = findArticle[0];
        const data = {
          articleId,
          createdOn,
          title,
          article,
          authorId,
          comments: getcomments,
        };
        response.response(res, 200, 'Article successfully retrieved', data, false);
      } else { return response.response(res, 404, 'error', 'article Not Found  ', true); }
      return (findArticle);
    } catch (error) {
      return error;
    }
  }

  static async filterArticle(req, res) {
    try {
      if (req.query.articles) {
        const { articles: article } = req.query;

        const checktaget = articles.filter((regArticles) => regArticles.article.includes(`${article.trim()}`));
        if (checktaget.length > 0) {
          response.response(res, 200, 'Article Found', checktaget, false);
        } else {
          return response.response(res, 404, 'error', `${article} don't match with any article`, true);
        }
      } else { return response.response(res, 405, 'error', 'please enter the tag', true); }
      return (articles);
    } catch (error) {
      return error;
    }
  }
}

export default articlescontrolllers;
