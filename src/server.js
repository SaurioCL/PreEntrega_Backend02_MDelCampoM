import express from 'express';
import handlebars from 'express-handlebars';
import morgan from 'morgan';
import { __dirname } from './utils.js';
import cartsRouter from './routes/cartRouter.js';
import productsRouter from './routes/productRouter.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { Server } from 'socket.io';

// Crear una instancia de Express
const app = express();

// Middleware para el manejo de JSON
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Manejo de handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

// Montar los routers en las rutas correspondientes
app.use('/', productsRouter);
app.use('/api/carts', cartsRouter);

app.use(errorHandler);

// Iniciar el servidor
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Configurar Socket.io
const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) =>{
  console.log(`Cliente conectado: ${socket.id}`);
  
  socket.on('disconnect', () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});