import { Router  } from "express";
import productService from "../services/productService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const productController = Router();


// HOME 
productController.get("/catalog", (req, res) => {
    res.render('product/catalog', {title: "Catalog Page"})
})


// CREATE

productController.get("/create", (req, res) => {
    res.render('product/create', {title: "Create a Product"})
})


productController.post("/create", async (req, res) => {
    const productData = req.body;
    const ownerId = req.user._id;

    try {
        await productService.create(productData, ownerId)

        res.redirect('/products/catalog')
    } catch (err) {
        const error = getErrorMessage(err);
        return res.render('product/create', { product: productData, error, title:'Create Product'})
    }

    res.render('product/create', {title: "Create a Product"})
})






// DETAILS
productController.get("/:productId/details", (req,res) => {
    const productId = req.params.productId
    console.log(productId)
    res.render('product/details', {title: "Details Page"})
})

productController.get("/details/edit", (req,res) => {
    res.render('product/edit', {title: "Edit Page"})
})



// SEARCH
productController.get("/search", (req,res) => {
    res.render('product/search', {title: "Search Page"})
})

export default productController