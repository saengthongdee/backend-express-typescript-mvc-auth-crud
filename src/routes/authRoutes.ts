import { Router } from "express";
import { loginController , registerController } from "../controllers/auth.js";

const router = Router()

router.route('/register')
    .post(registerController)

router.route('/register')
    .post(loginController)

export default router 