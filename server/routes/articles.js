import express from 'express';
import auth from '../middlewares/checkAuth';
import articlesController from '../controllers/articlesControllers';
import flagsController from '../controllers/flagsControllers';
import admin from '../middlewares/checkAdmin';

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

// flag articles and comment
const {
  flagArticle, flagComment, getFlags, deleteComment,
} = flagsController;

router.post('/articles/flag/:id', auth, flagArticle);
router.post('/comments/flag/:id', auth, flagComment);
router.get('/flags', auth, admin, getFlags);

// comment on articles
router.post('/articles/:id/comments', auth, commentArticle);
router.delete('/comments/:id', auth, admin, deleteComment);

export default router;
