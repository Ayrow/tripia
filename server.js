import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

//db
import connectDB from './db/connect.js';

//routers

//middleware
app.use(express.json());

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
