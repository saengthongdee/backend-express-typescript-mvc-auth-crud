import express from "express";
import cors from "cors"
import dotenv from 'dotenv'
import {globalErrorHandler} from './middleware/errorMiddleware.js'


dotenv.config()
// connect
import { connectDB } from './config/db.js'

//router
import productRoutes from './routes/productRoutes.js'
import authRoutes from './routes/authRoutes.js'

const app = express()

app.use(express.json())
app.use(cors())

connectDB()

app.use('/api/products/' , productRoutes)
app.use('/api/auth/' , authRoutes)


app.use(globalErrorHandler)

const PORT = process.env.PORT || 3000

const server = app.listen(PORT , () => {
    console.log( `Server is runing on PORT ${PORT}`)
})


process.on('unhandledRejection' , (err , promist) => {
    console.log(err)
    server.close(() => process.exit(1))
})