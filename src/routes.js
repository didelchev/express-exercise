import { Router } from "express";
import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";
import productController from "./controllers/productController.js";

const routes = Router();


routes.use('/', homeController)

routes.use('/auth', authController)

routes.use('/products', productController)

routes.all(/.*/, (req,res)=>{
    res.render('home/404', {title: "404 Not Found"})
})


export default routes;