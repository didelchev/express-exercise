import { Router  } from "express";
import productService from "../services/productService.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { checkIsOwner, isOwner } from "../middlewares/authMiddleware.js";

const productController = Router();


// HOME 
productController.get("/catalog", async (req, res) => {
    const products = await productService.getAll().lean();

    res.render('product/catalog', {products, title: "Catalog Page"})
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
productController.get("/:productId/details", async (req,res) => {
    const productId = req.params.productId
    
    const product = await productService.getOne(productId).lean()

    const isOwner = product.owner && product.owner.toString() === req.user?._id;

    const isLoogedIn = req.user ? true : false

    const isRecommended = product.recommendList.some((element) => req.user._id === element._id.toString())




    res.render('product/details', {product, isOwner, isLoogedIn, isRecommended, title: "Details Page"})
})


//EDIT

productController.get("/:productId/edit", async(req,res) => {
    const productId = req.params.productId

    const product = await productService.getOne(productId).lean()

    res.render('product/edit', {product, title:"Edit Page"})

})


productController.post('/:productId/edit', async (req,res) => {
    const productId = req.params.productId;
    const productData = req.body

    await productService.edit(productId, productData)

    res.redirect(`/products/${productId}/details`)
})




//DELETE
productController.get("/:productId/delete", async(req, res) => {
    const productId = req.params.productId

    const product = await productService.getOne(productId).lean();
    
    if(product.owner?.toString() !== req.user._id){
        res.setError('You cannot delete this movie!');
        return res.redirect('/404');
    }

    await productService.remove(productId);

    res.redirect('/');
})




// SEARCH
productController.get('/search', async (req,res) =>{
    const products = await productService.getAll().lean();

    res.render('product/search', {products, title: "Search page"})
})


productController.post('/search', async (req, res) => {
    console.log(req.body)
    try {
        const products = await productService.search(req.body.search); 

        res.render('product/search', { products }); 
    } catch (err) {
        const error = getErrorMessage(err);
        return res.render('product/search', {error, title:'Seach Page'})
    }
});



//RECOMMEND 

productController.get("/:productId/recommend", async (req, res) => {
    const productId = req.params.productId
    const userId = req.user._id
    const isRecommended = Boolean()

    try {
        await productService.recommend(productId, userId)
        isRecommended = true
        res.render(`/products/${productId}/details`, { isRecommended })
    } catch (error) {
        
    }



})


export default productController