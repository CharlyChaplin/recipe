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
userRouter.get('/getusers', roleCheck(1), UserController.getUsers);
userRouter.get('/getusersname', roleCheck(1), UserController.getUsersNickname);
userRouter.get('/getuser', UserController.getUser);
userRouter.get('/getroles', roleCheck(1), UserController.getRoles);
userRouter.post('/updateuser', UserController.updateUser);
userRouter.post('/getuserbyemail', roleCheck(1), UserController.getUserByEmail);
userRouter.post('/changeuserbyemail', roleCheck(1), UserController.changeUserByEmail);
userRouter.post('/delete', roleCheck(1), UserController.deleteUser);



export default userRouter;