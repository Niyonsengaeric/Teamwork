import express from 'express';
import usersController from '../controllers/usersControllers';
const { regUser,loginUser } = usersController;
const router = express.Router();
router.post('/auth/signup', regUser);
export default router;
