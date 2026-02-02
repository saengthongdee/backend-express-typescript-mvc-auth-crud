import { Product } from "../models/Product.js";
import { AppError } from "../utils/AppError.js";

export const reduceStock = async (productId: string, quantity: number) => {
    
  const product = await Product.findOneAndUpdate(
    { _id: productId, stock: { $gte: quantity } },
    { $inc: { stock: -quantity } },
    { new: true , runValidators: true},
  );

  if (!product) throw new AppError("สินค้าหมด หรือ สต็อกไม่พอ", 400);

  return product;
};

export const addProduct = async (name: string, stock: number, price: number) => {
  
  const product = await Product.findOne({ name });

  if (product) throw new AppError("มีสินค้านี้แล้ว", 409);

  const newProduct = await Product.create({
    name,
    stock,
    price,
  });

  return newProduct;
};

export const deleteProduct = async (id: string) => {
  
  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct) {
    throw new AppError('ไม่พบสินค้าที่ต้องการลบ', 404);
  }

  return {
    product: deletedProduct
  };
};

export const readProduct = async () => {
   
  const products = await Product.find()

  return {products}
}

export const updateProduct = async (id:string , updateData:object) => {

  const product = await Product.findByIdAndUpdate(id , updateData , {new:true , runValidators: true})

  if(!product) throw new AppError("ไม่พบสิน้ค้า" , 404)

    return {
      product
    }
}
