import mongoose from 'mongoose'


export interface IProduct extends mongoose.Document {
    name: string
    stock: number
    price: number
}

const productSchema = new mongoose.Schema<IProduct>({
    name: {
        type:String , required: true
    },
    stock: {
        type:Number , required: true
    },
    price: {
        type:Number , required: true
    }
})

export const Product = mongoose.model<IProduct>('Product' , productSchema)