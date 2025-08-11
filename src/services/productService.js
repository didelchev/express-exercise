import Product from "../models/Product.js";


const getAll = () => Product.find().lean();

const getTopThree = () => Product.find().sort({createdAt: -1}).limit(3);
    
const create = (productData, ownerId) => Product.create({...productData, owner: ownerId})

const getOne = (productId) => Product.findById(productId).populate('recommendList');

const remove = (productId) => Product.findByIdAndDelete(productId);

const edit = (productId, data) => Product.findByIdAndUpdate(productId, data);

const search = async (productName) => {
        let result = await Product.find().lean();
    
        if (productName) {
            result = result.filter(product => product.name.toLowerCase().includes(productName.toLowerCase()));
        }
    
        return result;
    };




export default {
    getAll,
    getTopThree,
    create,
    getOne,
    remove,
    edit,
    search
}