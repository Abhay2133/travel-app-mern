import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import ROLES from "../constants/roles";

// Dummy admin credentials (replace with real DB validation)
const adminCredentials = {
  username: process.env.ADMIN_ID || "admin123", // admin username
  password: process.env.ADMIN_PASSWORD || "$2a$10$JrWewmc69f/z3wnlwZPTUeZu.XDkH55JW5yX1GRrUQQzHuh7qUpuq", // replace with real hashed password
};

const secretKey = process.env.JWT_SECRET || "my-jwt-secret";

export const adminLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    // Validate credentials (this should be replaced by real DB lookup)
    if (username === adminCredentials.username) {
      bcrypt.compare(password, adminCredentials.password, (err, isMatch) => {
        if (err || !isMatch) {
          console.error({err, isMatch})
          console.error(
            `password '${password}' != '${adminCredentials.password}'`
          );
          return res.status(401).json({ message: "Invalid credentials" });
        }

        // Create JWT token with 'admin' role in the payload
        const token = jwt.sign(
          { username, role: ROLES.ADMIN },
          secretKey,
          { expiresIn: "1h" } // set expiry as per your requirement
        );

        return res.json({ message: "Login successful", token });
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (e) {
    next(e);
  }
};
