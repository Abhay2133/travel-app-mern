import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
// import path from "path";
import connectDB from "./config/db";
import BookingRouter from "./routes/bookingRoutes";
import PackageRouter from "./routes/packageRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import authRouter from "./routes/authRoutes";
import morgan from "morgan";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();
connectDB();

const app: Application = express();

app.use(cors())
// Middleware
// Use morgan to log requests
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.use("/api/auth", authRouter);
app.use("/api/bookings", BookingRouter);
app.use("/api/packages", PackageRouter);

// error handler middleware
app.use(errorHandler);

export default app;
