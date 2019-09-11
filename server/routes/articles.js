import express from 'express';
import auth from '../middlewares/checkAuth';
import articlesController from '../controllers/articlesControllers';

const { newArticle, editArticle } = articlesController;
const router = express.Router();
router.post('/articles', auth, newArticle);
router.patch('/articles/:id', auth, editArticle);
export default router;
