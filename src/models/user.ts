import mongoose from "mongoose";
import bcrypt from 'bcrypt'

export interface IUser extends mongoose.Document {
    
    name:String
    phone:number
    email:string
    password?: string
    createdAt: Date
    updatedAt: Date
}

const UserSchema = new mongoose.Schema<IUser>({

    name: {
        type: String , required: true
    },
    phone: {
        type: Number  , required: true
    },
    email: {
        type: String  , required: true
    },
    password: {
        type: String , required: true, select: false
    }
},{timestamps: true})


UserSchema.pre<IUser>("save" , async function () {
    
    if(!this.isModified('password')) return 

    try{

        this.password = await bcrypt.hash(this.password as string, 10);

    }catch(err:any) {
       throw err
    }
})


UserSchema.pre('findOneAndUpdate' , async function () {

    const update = this.getUpdate() as any

    const password = update?.password || update?.$set?.password

    if(!password) return 

    try{

        const hashed = await bcrypt.hash(password, 10)

        if(update.password) update.pasword = hashed
        if(update.$set && update.$set.password) update.$set.password = hashed

        this.setUpdate(update)

    }catch(err:any) {
        throw err
    }
})

export const User = mongoose.model<IUser>('User' , UserSchema)
