import { Router } from "express";
import { body } from "express-validator";
import UserController from "../controllers/userController.js";
import roleCheck from "../middlewares/roleCheck.js";

const userRouter = Router();


userRouter.post('/signup',
	body('email').isEmail().escape(),
	body('password').isLength({ min: 3, max: 32 }).escape(),
	UserController.signup);
userRouter.post('/signin', UserController.signin);
userRouter.get('/logout', UserController.logout);
userRouter.get('/activate/:link', UserController.activate);
userRouter.get('/refresh', UserController.refresh);
userRouter.get('/getusers', UserController.getUsers);
userRouter.get('/getusersname', UserController.getUsersNickname);
userRouter.get('/getuser', UserController.getUser);
userRouter.get('/getroles', UserController.getRoles);
userRouter.post('/updateuser', UserController.updateUser);
userRouter.post('/getuserbyemail', UserController.getUserByEmail);
userRouter.post('/changeuserbyemail', UserController.changeUserByEmail);
userRouter.post('/delete', UserController.deleteUser);



export default userRouter;