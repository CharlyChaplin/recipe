import { Router } from "express";
import BlogController from "../controllers/blogController.js";

const blogRouter = Router();


blogRouter.post('/add', BlogController.addBlog);
blogRouter.post('/delete', BlogController.deleteBlog);
blogRouter.put('/change', BlogController.changeBlog);
blogRouter.get('/getbyid/:id', BlogController.getBlogById);
blogRouter.post('/getblog', BlogController.getOneBlog);
blogRouter.get('/blogs', BlogController.getAllBlogs);


export default blogRouter;