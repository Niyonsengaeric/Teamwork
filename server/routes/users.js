import express from 'express';
import usersController from '../controllers/usersControllers';

const { regUser, loginUser } = usersController;
const router = express.Router();
router.post('/auth/signup', regUser);
router.post('/auth/signin', loginUser);
export default router;
