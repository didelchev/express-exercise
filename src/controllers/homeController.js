import { Router } from "express";
import productService from "../services/productService.js";

const homeController = Router();

homeController.get('/', async(req, res) => {
    const getTop = await productService.getTopThree().lean()

    res.render('home/index', {getTop, title: "Home Page"})
    
})


export default homeController