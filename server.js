import express from 'express';

const app = express();
import dotenv from 'dotenv';
dotenv.config();

import 'express-async-errors';

//db and authenticate
import connectDB from './db/connect.js';

//routers
import authRouter from './routes/authRoutes.js';
import tripsRouter from './routes/tripsRoutes.js';

//middleware
import NotFoundMiddleware from './middleware/not-found.js';
import ErrorHandlerMiddleware from './middleware/error-handler.js';
const path = require('path');

app.use(express.json());

app.get('/api/v1', (req, res) => {
  res.json({ msg: 'API' });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/trips', tripsRouter);

app.use(ErrorHandlerMiddleware);
app.use(NotFoundMiddleware);

app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
