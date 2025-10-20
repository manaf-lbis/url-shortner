import express from "express";
import dotenv from "dotenv";
import appRouter from "./router/appRoute"
import errorHandler from "./middleware/errorHandler";
import authRouter from "./router/authRoute";
import cors from "cors";
import { connectDB } from "./config/db";
import cookieParser from "cookie-parser";
import { rateLimiter } from "./config/rateLimiting";

dotenv.config();

const app = express();
connectDB();

app.use(rateLimiter);
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/", appRouter);

app.use(errorHandler);

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
