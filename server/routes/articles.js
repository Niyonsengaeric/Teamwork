import express from 'express';
import auth from '../middlewares/checkAuth';
import articlesController from '../controllers/articlesControllers';

const {
  newArticle, editArticle, deleteArticle, commentArticle,
  getArticles, specificArticle, filterArticle,
} = articlesController;
const router = express.Router();
router.post('/articles', auth, newArticle);
router.patch('/articles/:id', auth, editArticle);
router.delete('/articles/:id', auth, deleteArticle);
router.get('/feeds', auth, getArticles);
router.get('/articles/:id', auth, specificArticle);

router.get('/articles', auth, filterArticle);

// comment on articles
router.post('/articles/:id/comments', auth, commentArticle);

export default router;
