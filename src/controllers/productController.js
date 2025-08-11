import { Router  } from "express";

const productController = Router();

productController.get("/", (req, res) => {
    res.send('<h1>Products wokrs</h1>')
})


export default productController