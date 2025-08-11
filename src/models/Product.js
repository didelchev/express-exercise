import { Schema, model, Types } from "mongoose";
import User from "./User.js";

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product name is required!'],
        minLength: [2, 'Name must be at least 2 characters long.'],
    },
    skin: {
        type: String,
        required: [true, 'Skin field is required!'],
        minLength: [10, 'Skin must be at least 10 characters long.'],
        maxLength: [100, 'Skin cannot exceed 100 characters.'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [20, 'Description must be at least 20 characters long.'],
        maxLength: [200, 'Description cannot exceed 200 characters.'],
    },
    ingredients: {
        type: String,
        required: [true, 'Ingredients are required!'],
        minLength: [2, 'Ingredients must be at least 2 characters long.'],
        maxLength: [50, 'Ingredients cannot exceed 50 characters.'],
    },
    benefits: {
        type: String,
        required: [true, 'Benefits are required!'],
        minLength: [10, 'Benefits must be at least 10 characters long.'],
        maxLength: [100, 'Benefits cannot exceed 100 characters.'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        validate: {
            validator: function(value) {
                return value > 0;
            },
            message: 'Price must be a positive number.',
        },
    },
    image: {
        type: String,
        required: [true, 'Image URL is required!'],
        validate: {
            validator: function(value) {
                return /^https?:\/\//.test(value);
            },
            message: 'Image URL must start with http:// or https://.',
        },
    },
    recommendList: [{
        type: Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User',
    },
});


const Product = model('Product', productSchema)

export default Product;