import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "my-jwt-secret";

export const protectByRole = (role:string) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as {
      username: string;
      role: string;
    };

    // Check if the role is 'admin'
    if (decoded.role !== role) {
      return res.status(403).json({ message: "Access denied. Not an admin." });
    }

    // Attach the decoded data to the request object
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
