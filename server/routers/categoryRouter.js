import { Router } from "express";
import CategoryController from "../controllers/categoryController.js";
import roleCheck from "../middlewares/roleCheck.js";

const categoryRouter = Router();


categoryRouter.post('/add', roleCheck(1), CategoryController.addCategory);
categoryRouter.post('/delete', roleCheck(1), CategoryController.deleteCategory);
categoryRouter.post('/edit', roleCheck(1), CategoryController.editCategory);
categoryRouter.get('/categories', CategoryController.getAllCategories);


export default categoryRouter;