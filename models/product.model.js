import mongoose from "mongoose"


const ProductSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    }, photo:{
        type: String,
    }, description:{
        type: String
    }, price:{
        type: Number,
        default: 0
    }, stock:{
        type: Number,
        default: 0
    }
},{timestamps: true})

export const Product = mongoose.model("Product", ProductSchema )
