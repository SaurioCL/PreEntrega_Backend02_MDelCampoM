import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import passport from 'passport';
import userRouter from './routes/usersRouter.js';
import authRouter from './routes/authRouter.js';
import cartsRouter from './routes/cartRouter.js';
import productsRouter from './routes/productRouter.js';
import { initializePassport } from './config/passportConfig.js';
import { initMongoDB } from './db/database.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
const PORT = 8080;

// Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(morgan('dev'));
app.use(errorHandler);

// Passport
initializePassport();
app.use(passport.initialize());

// Routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/products', productsRouter);
app.use('/carts', cartsRouter);

// Mongo
initMongoDB();

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});
