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
import __dirname from './dirname.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

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
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
}))
/* app.use(morgan("dev")) */
initPassport();
app.use(passport.initialize());
app.use(passport.session());


app.use("/api",router)
app.use(errorHandler)
app.use(notFoundhandler)

const swaggerOptions = {
  definition: {
      openapi: '3.0.0',
      info: {
          title: 'Las Gonzalez Tienda API Doc',
          description: 'Here you can find my API documentation.',
          version: '1.0.0',
          contact: {
              name: 'Gonzalez, Julio',
              url: 'https://www.linkedin.com/in/julio-gonzalez-82a705245',
          }
      }
  },
  // Paths to files containing OpenAPI definitions (you can use glob patterns)
  apis: ['./src/document/*.yaml']
}

const swaggerSpecs = swaggerJSDoc(swaggerOptions)
app.use('/api/document', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpecs))



app.listen(8080, () => {
    console.log('Server listening on port 8080')
})

