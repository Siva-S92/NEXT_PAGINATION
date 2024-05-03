import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        rate: {
            type: String,
            required: true,
            trim: true
        },
        count: {
            type: String,
            required: true,
            trim: true
        },
    }
}, {timestamps: true});

const Product = mongoose.models.product || mongoose.model("product", productSchema)
export default Product;