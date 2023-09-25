import { Router } from "express";
import CategoryController from "../controllers/categoryController.js";
import roleCheck from "../middlewares/roleCheck.js";

const categoryRouter = Router();


categoryRouter.post('/add', CategoryController.addCategory);
categoryRouter.post('/delete', CategoryController.deleteCategory);
categoryRouter.post('/edit', CategoryController.editCategory);
categoryRouter.get('/categories', CategoryController.getAllCategories);
categoryRouter.post('/getcategoryname', CategoryController.getCategoryName);


export default categoryRouter;