import { NextFunction, Request, Response } from "express";

// // Define a custom error type
// interface CustomError extends Error {
//   status?: number;
// }

// Error handling middleware
export const errorHandler = (err: any, req: Request, res: Response, next:NextFunction) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: {
      message,
      status: statusCode,
    },
  });

  console.error(`[Error] ${message}`);
  next();
};
