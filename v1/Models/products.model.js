const mongoose = require("mongoose");
const validator = require("validator");


const productSchema = mongoose.Schema(
    {
        id: {
            type: String,
            unique: true,
        },
        sku: {
            type: String,
            unique: true,
        },
        name: {
            type: String,
            trim: true,
            unique: false,
            required: [true, "name is required"],
            minLength: [1, "Name must be at least a character."],
            maxLength: [150, "Name is too large"],
        },
        category: {
            type: String,
            trim: true,
            minLength: [1, "Category must be at least a characters."],
            maxLength: [20, "Category is too large"],
        },
        seller: {
            type: String,
            trim: true,
            minLength: [1, "Category must be at least a characters."],
            maxLength: [20, "Category is too large"],
        },
        description: {
            type: String,
            required: [false, "Description is not required"],
            trim: true,
        },
        images: {
            required: true,
            type: Array,
            // validate: [validator.isURL, "Please provide Thumbnail Image URL"],
        },
        stock: {
            type: Number,
            required: [false, "Stock is not required"],
        },
        ratings: {
            type: Number,
            required: [false, "ratings is not required"],
        },
        ratingsCount: {
            type: Number,
            required: [false, "ratingsCount is not required"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
        },
        sale: {
            type: Number,
            required: [false, "sale is not required"],
        },
        shipping: {
            type: Number,
            required: [false, "shipping is not required"],
        },
        quantity: {
            type: Number,
            required: [false, "quantity is not required"],
        },

    },
    {
        timestamps: true,
    }

);

const Products = mongoose.model("products", productSchema);

module.exports = Products;