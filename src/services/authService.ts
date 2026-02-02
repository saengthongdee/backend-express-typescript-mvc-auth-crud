import { User} from "../models/user.js"
import { AppError } from "../utils/AppError.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const login = async (email: string , password: string) => {

    const user = await User.findOne({email}).select("+password")

    if(!user) throw new AppError('email ไม่ถูกต้อง',400)

    const isMatch = await bcrypt.compare(password, user.password as string);

    if(!isMatch) {
    
        throw new AppError("password ไม่ถูกต้อง", 401)
    }

    const token = jwt.sign({id: user._id} , process.env.JWT_SECRET! , {
        expiresIn: '1d'
    })

    const userObj = user.toObject()
    delete (userObj as any).password

    return {
        user:userObj,
        token
    }
} 

export const register  = async(name:string , phone:number , email:string , password:string) =>{

    const exists = await User.findOne({email})

    if(exists)  throw new AppError("email นี้เคยใช้แล้ว" , 409)
    
    const newUser = await User.create({
        name,phone,email,password
    })

    if(!newUser) {

        throw new AppError('create failed',400)
    }
    
    const newUserobj = newUser.toObject()
    delete (newUserobj as any).password

    return {
        newUser:newUserobj
    }
}