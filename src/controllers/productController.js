import { Router  } from "express";

const productController = Router();


// HOME 
productController.get("/", (req, res) => {
    res.render('product/catalog', {title: "Catalog Page"})
})


// CREATE
productController.get("/create", (req, res) => {
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