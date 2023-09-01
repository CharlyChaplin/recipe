import { Router } from "express";
import userRouter from "./userRouter.js";
import phraseRouter from "./phraseRouter.js";
import categoryRouter from "./categoryRouter.js";
import fileRouter from './fileRouter.js';
import blogRouter from "./blogRouter.js";
import recipeRouter from "./recipeRouter.js";
import searchRouter from "./searchRouter.js";

const router = Router();

router.use('/user', userRouter);
router.use('/phrase', phraseRouter);
router.use('/category', categoryRouter);
router.use('/file', fileRouter);
router.use('/blog', blogRouter);
router.use('/recipe', recipeRouter);
router.use('/search', searchRouter);

export default router;