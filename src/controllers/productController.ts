import type { Request , Response , NextFunction } from "express";
import * as productService from '../services/productService.js'
import { AppError } from "../utils/AppError.js";
import { Product } from "../models/Product.js";
import { count } from "node:console";

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

export const deleteProduct = async (req:Request , res:Response , next:NextFunction) => {

    try{

        const id = req.body.params

        if(!id) throw new AppError('id is required' ,400 ) 

        const { product } = await productService.deleteProduct(id)

        return res.status(200).json({
            success:true,
            data:{
                product
            }
        })

    }catch(err:any) {
        next(err)
    }
}

export const readProduct = async (req:Request , res:Response , next:NextFunction) => {

    try{

        const {products} = await productService.readProduct()
        
        return res.status(200).json({
            success:true,
            count:products.length,
            data:{
                products
            }
        })

    }catch(err:any) {
        next(err)
    }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { id } = req.params; 
        
        const updateData = req.body;

        if(!id || Object.keys(updateData).length === 0)
            throw new AppError('id or data are required', 400)
        
        const { product } = await productService.updateProduct(id as string, updateData);

        return res.status(200).json({
            success: true,
            data: { 
                product 
            }
        });

    } catch (err: any) {
        next(err);
    }
}