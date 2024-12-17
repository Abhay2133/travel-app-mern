import { Router } from "express";
import { adminLogin } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/admin", (req, res, next) => {
  adminLogin(req, res, next);
});

export default authRouter;
