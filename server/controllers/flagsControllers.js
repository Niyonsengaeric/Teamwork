import flags from '../models/flagsModels';
import articles from '../models/articlesModels';
import validateArticle from '../middlewares/validateflag';
import response from '../helpers/response';
import comments from '../models/commentsModels';


class flagsController {
  // flag an article
  static async flagArticle(req, res) {
    const { error } = validateArticle(req.body);
    if (error) { return response.response(res, 422, 'error', `${error.details[0].message}`, true); }

    const { id } = req.params;

    const findarticle = await articles.filter(
      (article) => article.articleId === parseInt(id, 10),
    );

    if (findarticle.length > 0) {
      const { article } = findarticle[0];
      const { reason: motif } = req.body;
      const data = {
        flagId: flags.length + 1,
        type: 'article',
        flagedId: parseInt(id, 10),
        content: article,
        reason: motif,
      };
      flags.push(data);
      response.response(res, 200, 'report send successfully', data, false);
    } else { return response.response(res, 404, 'error', 'article Not Found  ', true); }
    return (findarticle);
  }

  // flag a comment
  static async flagComment(req, res) {
    const { error } = validateArticle(req.body);
    if (error) { return response.response(res, 422, 'error', `${error.details[0].message}`, true); }

    const { id } = req.params;

    const findcomment = await comments.filter(
      (comment) => comment.commentId === parseInt(id, 10),
    );

    if (findcomment.length > 0) {
      const { comment } = findcomment[0];
      const { reason: motif } = req.body;
      const data = {
        flagId: flags.length + 1,
        type: 'comment',
        flagedId: parseInt(id, 10),
        content: comment,
        reason: motif,
      };
      flags.push(data);
      response.response(res, 200, 'report send successfully', data, false);
    } else { return response.response(res, 404, 'error', 'comment Not Found  ', true); }
    return (findcomment);
  }

  static async getFlags(req, res) {
    return response.response(res, 200, 'success', flags, false);
  }

  static async deleteComment(req, res) {
    const { id } = req.params;
    const findComment = await comments.findIndex(
      (findComments) => findComments.commentId === parseInt(id, 10),
    );
    if (findComment !== -1) {
      comments.splice(findComment, 1);
      response.response(res, 200, 'comment successfully deleted');
    } else { return response.response(res, 404, 'error', 'comment Not Found  ', true); }
    return (findComment);
  }
}
export default flagsController;
