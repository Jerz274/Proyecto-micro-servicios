require('dotenv').config();
require('express-async-errors');
const express = require('express');
const Helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const app = express();
const port = process.env.PORT || 3001;
//Websocket
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*'
  }
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on('connection', (socket) => {
  console.log('A client connected.');

  socket.on('disconnect', () => {
    console.log('A client disconnected.');
  });
});

const connectDB = require('./db/connect');

const orderRouter = require('./routes/order-routes');
const ingredientRouter = require('./routes/ingredient-routes');
const recipeRouter = require('./routes/recipe-routes');

// Middleware
const notFoundMiddleware = require('./middleware/not-found');

app.use(Helmet());
app.use(express.json());

app.use(cors({
  origin: "*", // Update with your frontend's origin
}));

// Limit the number of requests per IP address
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per minute
});
app.use(limiter);

// Routers
app.use(`${process.env.BASE_URL}/orders`, orderRouter);
app.use(`${process.env.BASE_URL}/ingredients`, ingredientRouter);
app.use(`${process.env.BASE_URL}/recipes`, recipeRouter);

app.use(notFoundMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(port, () =>
      console.log(`Server running on port ${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();

module.exports.io = io;
