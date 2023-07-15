const mongoose = require("mongoose");
const validator = require("validator");


const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true,
            required: [false, "title is required"],
            minLength: [1, "Titile must be at least a character."],
            maxLength: [150, "Titile is too large"],
        },
        category: {
            type: String,
            trim: true,
            minLength: [1, "Category must be at least 3 characters."],
            maxLength: [20, "Category is too large"],
        },
        description: {
            type: String,
            required: [false, "Description is required"],
            trim: true,
        },
        image: {
            required: true,
            type: String,
            validate: [validator.isURL, "Please provide Thumbnail Image URL"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
        },

    },
    {
        timestamps: true,
    }

);


const Products = mongoose.model("products", productSchema);

module.exports = Products;