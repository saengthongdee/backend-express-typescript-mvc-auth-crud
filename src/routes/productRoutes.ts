import { Router } from "express";
import { buyProduct , createProduct,deleteProduct ,readProduct ,updateProduct } from "../controllers/productController.js";

const router = Router()

router.route('/buy')
    .post(buyProduct)

router.route('/create')
    .post(createProduct)

router.route('/')
    .get(readProduct)

router.route('/:id')
    .delete(deleteProduct)
    .put(updateProduct)

export default router