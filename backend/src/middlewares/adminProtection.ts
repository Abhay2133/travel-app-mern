import { NextFunction, Request, Response } from "express";
import { protectByRole } from "./authHandler";
import ROLES from "../constants/roles";

const adminProtection = (req: Request, res: Response, next: NextFunction) => {
  protectByRole(ROLES.ADMIN)(req, res, next);
};

export default adminProtection;
