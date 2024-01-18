const express = require('express');
const cors = require('cors');
const userRouter = require('./userRoutes.cjs');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/tunetracker`));

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

// Routes
app.use('/users', userRouter);

module.exports = app;