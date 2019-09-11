import express from 'express';
import auth from '../middlewares/checkAuth';
import articlesController from '../controllers/articlesControllers';

const { newArticle } = articlesController;
const router = express.Router();
router.post('/articles', auth, newArticle);
export default router;
