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
