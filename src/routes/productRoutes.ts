import { Router } from "express";
import { buyProduct , createProduct } from "../controllers/productController.js";

const router = Router()

router.route('/buy')
    .post(buyProduct)

router.route('/create')
    .post(createProduct)

export default router