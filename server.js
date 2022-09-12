import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

//db
import connectDB from './db/connect.js';

//routers
import authRouter from './routes/authRoutes.js';

//middleware
import NotFoundMiddleware from './middleware/not-found.js';
import ErrorHandlerMiddleware from './middleware/error-handler.js';

app.use('/api/v1/auth', authRouter);

app.use(express.json());
app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddleware);

const port = process.env.PORT;

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
