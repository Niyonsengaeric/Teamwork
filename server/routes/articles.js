import express from 'express';
import authChecker from '../middlewares/checkAuth';
import articlesController from '../controllers/articlesControllers';
import flagsController from '../controllers/flagsControllers';
import adminChecker from '../middlewares/checkAdmin';

const {
  newArticle, editArticle, deleteArticle, commentArticle,
  getArticles, specificArticle, filterArticle,
} = articlesController;
const router = express.Router();
router.post('/articles', authChecker.auth, newArticle);
router.patch('/articles/:id', authChecker.auth, editArticle);
router.delete('/articles/:id', authChecker.auth, deleteArticle);
router.get('/feeds', authChecker.auth, getArticles);
router.get('/articles/:id', authChecker.auth, specificArticle);
router.get('/articles', authChecker.auth, filterArticle);

const {
  flagArticle, flagComment, getFlags, deleteComment,
} = flagsController;

router.post('/articles/flag/:id', authChecker.auth, flagArticle);
router.post('/comments/flag/:id', authChecker.auth, flagComment);
router.get('/flags', [authChecker.auth, adminChecker.adminChecker], getFlags);

router.post('/articles/:id/comments', authChecker.auth, commentArticle);
router.delete('/comments/:id', [authChecker.auth, adminChecker.adminChecker], deleteComment);

export default router;
