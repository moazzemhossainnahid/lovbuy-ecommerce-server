const mongoose = require("mongoose");
const validator = require("validator");


const orderSchema = mongoose.Schema(
    {
        userId: { type: String, required: false },
        customerId: { type: String, required: true },
        paymentIntentId: { type: String, required: true },
        products: [
            {
                id: { type: String },
                name: { type: String },
                brand: { type: String },
                description: { type: String },
                price: { type: String },
                image: { type: String },
                cartQuantity: { type: Number },
            }
        ],
        subtotal: { type: Number, required: true },
        total: { type: Number, required: true },
        shipping: { type: Object, required: true },
        delivery_status: { type: String, default: "pending" },
        payment_status: { type: String, required: true },
    },
    {
        timestamps: true,
    }

);


const Orders = mongoose.model("orders", orderSchema);

module.exports = Orders;