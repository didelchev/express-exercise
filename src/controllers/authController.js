import { Router } from "express";

const authController = Router();


authController.get("/login", (req, res ) => {
    res.render("auth/login", {title:"Login Page"})
})


authController.get('/register', (req, res) => {
    res.render("auth/register", {title: "Register Page"})
})

export default authController