import { Router } from "express";

const homeController = Router();

homeController.get('/', async(req, res) => {
    res.render('home', {title: 'Home Page'})
    
})


export default homeController