import { Router } from "express";
import RecipeController from "../controllers/recipeController.js";

const recipeRouter = Router();


recipeRouter.post('/add', RecipeController.addRecipe);
recipeRouter.post('/delete', RecipeController.deleteRecipe);
recipeRouter.post('/edit', RecipeController.changeRecipe);
recipeRouter.post('/getrecipe', RecipeController.getOneRecipe);
recipeRouter.get('/recipies', RecipeController.getAllRecipies);
recipeRouter.get('/preview', RecipeController.getPreviewRecipies);
recipeRouter.post('/getcategoryitems', RecipeController.getRecipiesInCategory);


export default recipeRouter;