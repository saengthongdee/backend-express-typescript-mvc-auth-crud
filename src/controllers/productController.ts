import type { Request , Response , NextFunction } from "express";
import * as productService from '../services/productService.js'
import { AppError } from "../utils/AppError.js";

export const buyProduct = async (req:Request , res:Response , next:NextFunction) => {

    try{

        const { productId , qty} = req.body
        
        const updatedProduct = await productService.reduceStock(productId , qty)

        return res.status(200).json({
            message:'buy success',
            remainingStock:updatedProduct.stock
        })

    }catch(err:any){
        next(err)
    }
}

export const createProduct = async(req:Request , res:Response , next:NextFunction) => {

    try{

        const { name , stock , price} = req.body

        if(!name || !stock || !price) throw new AppError('name or stock or price required' , 400)

        const newProduct = await productService.addProduct(name , stock , price)

        return res.status(201).json({
            success: true,
            data: newProduct
        })

    }catch(err:any) {
        next(err)
    }
}