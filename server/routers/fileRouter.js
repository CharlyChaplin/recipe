import { Router } from "express";
import FileController from "../controllers/fileController.js";

const fileRouter = Router();


fileRouter.post('/upload', FileController.addFile);
fileRouter.get('/test', FileController.ping);



export default fileRouter;