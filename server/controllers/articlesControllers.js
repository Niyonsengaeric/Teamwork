import moment from 'moment';
import validate from '../middlewares/validateArticles';
import validateComment from '../middlewares/validatecomment';
import articles from '../models/articlesModels';
import comments from '../models/commentsModels';
import users from '../models/usersModels';
import response from '../helpers/response';

class articlescontrolllers {
  // create new article
  static async newArticle(req, res) {
    const { error } = validate(req.body);
    if (error) { return response.response(res, 422, 'error', `${error.details[0].message}`, true); }
    const { title, article } = req.body;
    const { id, isAdmin } = req.user;
    if (isAdmin) { response.response(res, 403, 'error', 'not allowed for Administrator to create Articles', true); } else {
      const getuser = users.find((finduser) => finduser.id === id);
      const { id: authorId, firstName, lastName } = getuser;

      const checkexisting = await articles.filter(
        (regArticles) => regArticles.title === req.body.title && regArticles.authorId === id,
      );

      // console.log(checkexisting[0]);
      if (checkexisting.length > 0) {
        response.response(res, 409, 'error', ` Article arleady registered with An ID Of :  ${checkexisting[0].articleId} `, true);
      } else {
        const authorName = `${firstName} ${lastName}`;
        const addarticle = {
          articleId: articles.length + 1,
          createdOn: moment().format(),
          title,
          authorId,
          authorName,
          article,
        };
        articles.push(addarticle);
        const data = { ...addarticle };
        delete data.authorId;
        response.response(res, 201, 'Articles created successfully', data, false);
      }
    }

    return (article);
  }

  // editarticle

  static async editArticle(req, res) {
    const { error } = validate(req.body);
    if (error) { return response.response(res, 422, 'error', `${error.details[0].message}`, true); }
    const { id: userId } = req.user;
    const { title, article } = req.body;
    const { id } = req.params;
    const checkexisting = await articles.filter(
      (regArticles) => regArticles.title === title && regArticles.authorId === userId,
    );
    // check if the user is the owner
    const findArticleindex = articles.findIndex(
      (findArticle) => findArticle.articleId === parseInt(id, 10)
        && findArticle.authorId === userId,
    );
    if (findArticleindex !== -1) {
      // check for already updated
      if (checkexisting.length > 0) {
        response.response(res, 409, 'error', 'Article arleady updated', true);
      } else {
        // update Article
        articles[findArticleindex].title = title.trim();
        articles[findArticleindex].article = article.trim();
        return response.response(res, 200, 'article successfully edited”', articles[findArticleindex], false);
      }
    } else { response.response(res, 404, 'error', 'No article Found', true); }


    return (articles);
  }

  // delete article
  static async deleteArticle(req, res) {
    const { id: userId, isAdmin } = req.user;
    const { id } = req.params;
    const findOwnerindex = await articles.findIndex(
      (findArticle) => findArticle.articleId === parseInt(id, 10)
        && findArticle.authorId === userId,
    );
    if (isAdmin) {
      const findArticle = await articles.findIndex(
        (findArticles) => findArticles.articleId === parseInt(id, 10),
      );
      if (findArticle !== -1) {
        articles.splice(findArticle, 1);
        response.response(res, 200, 'article successfully deleted');
      } else { return response.response(res, 404, 'error', 'article Not Found  ', true); }
    } else if (findOwnerindex !== -1) {
      // console.log(articles[findOwnerindex]);
      articles.splice(findOwnerindex, 1);
      response.response(res, 200, 'article successfully deleted');
    } else {
      return response.response(res, 404, 'error', 'article Not Found  ', true);
    }
    return (articles);
  }

  // comment on article
  static async commentArticle(req, res) {
    const { error } = validateComment(req.body);
    if (error) {
      return response.response(res, 422, 'error', `${error.details[0].message}`, true);
    }

    // destruct object
    const { id: userId, isAdmin } = req.user;
    const { id } = req.params;
    const { comment } = req.body;

    // limit admin to comment and allow for normal user
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
  }

  // display All articles
  static async getArticles(req, res) {
    const data = [];
    let j = 0;

    if (articles.length === 0) {
      return response.response(res, 404, 'error', 'no article Registered yet  ', true);
    }
    // get article starting from resent posted article

    for (let i = articles.length - 1; i >= 0; i -= 1) {
      // add data to new array;
      data[j] = articles[i];
      j += 1;
    }
    return response.response(res, 200, 'success', data, false);
  }

  // display specific article
  static async specificArticle(req, res) {
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
      response.response(res, 200, 'success', data, false);
    } else { return response.response(res, 404, 'error', 'article Not Found  ', true); }
    return (findArticle);
  }

  // find articles
  static async filterArticle(req, res) {
    if (req.query.articles) {
      const { articles: article } = req.query;

      const checktaget = articles.filter((regArticles) => regArticles.article.includes(`${article.trim()}`));
      if (checktaget.length > 0) {
        response.response(res, 200, 'success', checktaget, false);
      } else {
        return response.response(res, 404, 'error', `${article} don't match with any article`, true);
      }
    } else { return response.response(res, 405, 'error', 'please enter the tag', true); }
    return (articles);
  }
}

export default articlescontrolllers;
