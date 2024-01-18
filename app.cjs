const express = require('express');
const cors = require('cors');
const userRouter = require('./userRoutes.cjs');
const app = express();

// Middleware
app.use(cors({
  origin: 'https://wiggyboard.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));
app.use(express.json());
app.use(express.static(`${__dirname}/tunetracker`));

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

// Routes
app.use('/users', userRouter);

module.exports = app;