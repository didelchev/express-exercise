import { JWT_SECRET } from '../constants.js';
import jwt from '../lib/jwt.js';


export const authMiddleware = async (req, res, next) => {
    const token = req.cookies['auth'];
    if (!token) {
        return next();
    }

    try {
        const decodedToken = await jwt.verify(token, JWT_SECRET)

        const user = {
            _id: decodedToken._id,
            email: decodedToken.email,
        };

        req.user = user;
        req.isAuthenticated = true;
        res.locals.userId = user._id;
        res.locals.userEmail = user.email;
        res.locals.isAuthenticated = true;

        return next();
    } catch (err) {
        console.log(err);
        res.clearCookie('auth');

        res.redirect('/auth/login')
    }
};

export const isAuth = (req, res, next) => {
    if (!req.isAuthenticated) {
        return res.redirect('/auth/login');
    }
    
    return next();
}

export const isOwner = async (req, res, next) =>{
    let product = await productServices.getOne(req.params.productId);

    if (product.owner == req.user._id) {
        res.redirect(`/product/${req.params.productId}/details`);
    } else {
        next();
    }
}

async function checkIsOwner(req, res, next) {
    let product = await productServices.getOne(req.params.productId);

    if (product.owner == req.user._id) {
        next();
    } else {
        res.redirect(`/product/${req.params.productId}/details`);
    }
}