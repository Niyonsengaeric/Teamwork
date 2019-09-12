import express from 'express';
import auth from '../middlewares/checkAuth';
import articlesController from '../controllers/articlesControllers';

const { newArticle, editArticle, deleteArticle } = articlesController;
const router = express.Router();
router.post('/articles', auth, newArticle);
router.patch('/articles/:id', auth, editArticle);
router.delete('/articles/:id', auth, deleteArticle);
export default router;
