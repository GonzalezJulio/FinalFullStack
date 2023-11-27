import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import 'dotenv/config'
import userRouter from './routes/user.route.js'
import errorHandler from './middlewares/errorHandler.js';
import notFoundhandler from './middlewares/notFoundhandler.js';

//Conexion a mongoose
mongoose.connect(process.env.MONGO_DB)
.then (() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log('Error connecting to MongoDB', err)
})

const app = express()
//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
/* app.use(morgan("dev")) */


app.use(errorHandler)
app.use(notFoundhandler)

app.use('/api/user', userRouter)

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})

