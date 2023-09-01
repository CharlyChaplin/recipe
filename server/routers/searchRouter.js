import { Router } from "express";
import SearchController from "../controllers/searchController.js";

const searchRouter = Router();


searchRouter.get('', SearchController.searchQuery);


export default searchRouter;