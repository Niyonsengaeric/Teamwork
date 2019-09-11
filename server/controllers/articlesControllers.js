import moment from 'moment';
import validate from '../middlewares/validateArticles';
import articles from '../models/articlesModels';
import users from '../models/usersModels';
import response from '../helpers/response';

class articlescontrolllers {
  static async newArticle(req, res) {
    const { error } = validate(req.body);
    if (error) { return response.response(res, 422, 'error', `${error.details[0].message}`, true); }
    const { title, article } = req.body;
    const { id, isAdmin } = req.user;
    if (isAdmin) { response.response(res, 401, 'error', 'not allowed for Administrator to create Articles', true); } else {
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
        if (addarticle) {
          const data = { ...addarticle };
          delete data.authorId;
          response.response(res, 201, 'Articles created successfully', data, false);
        }
      }
    }

    // return
    return (article);
  }
}

export default articlescontrolllers;
