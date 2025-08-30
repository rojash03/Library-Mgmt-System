import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Config/Database.js';
import authRoutes from './Routes/authRoutes.js';
import bookRoutes from './Routes/bookRoutes.js';
import borrowRoutes from './Routes/borrowRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
connectDB();

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", bookRoutes);
app.use("/api", borrowRoutes);

app.get("/", (req, res) => {
  res.send("API is working ✅");
});

app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
