import express from 'express';
import auth from '../middlewares/checkAuth';
import articlesController from '../controllers/articlesControllers';

const {
  newArticle, editArticle, deleteArticle, commentArticle, getArticles,
} = articlesController;
const router = express.Router();
router.post('/articles', auth, newArticle);
router.patch('/articles/:id', auth, editArticle);
router.delete('/articles/:id', auth, deleteArticle);
router.get('/feeds', auth, getArticles);
// comment on articles
router.post('/articles/:id/comments', auth, commentArticle);

export default router;
