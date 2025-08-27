import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Config/Database.js';
import authRoutes from './Routes/authRoutes.js';
import bookRoutes from './Routes/bookRoutes.js';
import borrowRoutes from './Routes/borrowRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = 3000;
app.use(cors({
  origin: ['http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
connectDB();

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", bookRoutes);
app.use("/api", borrowRoutes);

app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
