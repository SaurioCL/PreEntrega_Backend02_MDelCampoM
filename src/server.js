import express from 'express';
import morgan from 'morgan';
import userRouter from './routes/usersRouter.js';
import cartsRouter from './routes/cartRouter.js';
import productsRouter from './routes/productRouter.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { initMongoDB } from './db/database.js';

// Crear una instancia de Express
const app = express();

// Middleware para el manejo de JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Montar los routers en las rutas correspondientes
app.use('/users', userRouter);
app.use('/products', productsRouter);
app.use('/carts', cartsRouter);

app.use(errorHandler);

initMongoDB();

// Iniciar el servidor
const PORT = 8080;

app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
