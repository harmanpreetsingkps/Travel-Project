import { Product } from "../models/product.model.js";
import asyncHandler from "../service/error-handler/asyncErrorHandler.js";


const addProduct = asyncHandler(async(req, res)=>{
    const data = req.body

    if(!data.name && data.description )return res.status(403).json(403, "Please add all required data")

        const savedProduct = await Product.create({
            name: data.name,
            photo: data.photo,
            description: data.description,
            price: data.price,
            stock: data.stock

})
})