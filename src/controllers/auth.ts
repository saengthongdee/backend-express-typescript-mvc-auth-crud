import type { Request , Response , NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import * as authService from '../services/authService.js'

export const loginController = async (req:Request , res:Response , next:NextFunction) => {

    try{

        const { email , password} = req.body

        if(!email || !password) throw new AppError('email or password required' , 400)
        
        const { user  , token} = await authService.login(email , password)

        return res.status(200).json({
            token:token,
            message:'login success',
            data: {
                user
            }
        })

    }catch(err:any) {
        next(err)
    }
}
export const registerController = async (req:Request , res:Response , next:NextFunction) => {

    try{

        const {name , phone , email , password} = req.body

        if(!name || !phone || !email || !password) 
            throw new AppError('กรุณากรอกข้อมูลให้ครบทุกช่อง', 400)
        
        const {newUser} = await authService.register(name , phone , email , password)

        return res.status(201).json({
            success: true,
            data: {
                newUser
            }
        })

    }catch(err:any) {
        next(err)
    }
}