import express from 'express';
import usersController from '../controllers/usersControllers';
import signupValidator from '../middlewares/validateUser';
import validatelogin from '../middlewares/validateLogin';

const { regUser, loginUser } = usersController;
const router = express.Router();
router.post('/auth/signup', [signupValidator], regUser);
router.post('/auth/signin',[validatelogin], loginUser);
export default router;
