import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import { initPassport } from './config/passport.config.js';
import 'dotenv/config'
import passport from 'passport';
import errorHandler from './middlewares/errorHandler.js';
import notFoundhandler from './middlewares/notFoundhandler.js';
import IndexRouter from './routes/index.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';

let router = new IndexRouter()
router = router.getRouter()

//Conexion a mongoose
mongoose.connect(process.env.MONGO_DB)
.then (() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log('Error connecting to MongoDB', err)
})
const app = express()
app.use(session({
    secret: "superseguronadieve",
    resave: true,
    saveUninitialized: true,
  
  store: new MongoStore({
    mongoUrl: process.env.MONGO_DB,
  
    ttl: 30,
  }),
  ttl: 30,
  }))

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
/* app.use(morgan("dev")) */
initPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/api",router)
app.use(errorHandler)
app.use(notFoundhandler)



app.listen(8080, () => {
    console.log('Server listening on port 8080')
})

