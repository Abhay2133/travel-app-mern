// parent route /api/packages

import { Router } from "express";
import {
  addPackage,
  deletePackage,
  getAllPackages,
  getPackageById,
  updatePackage,
} from "../controllers/packageController";
import adminProtection from "../middlewares/adminProtection";

const PackageRouter = Router();

PackageRouter.get("/", getAllPackages); // Get all packages
PackageRouter.get("/:id", getPackageById); // Get a single package by ID

// route protection middleware on edits access
PackageRouter.use(adminProtection);

PackageRouter.post("/", addPackage); // Add a new package
PackageRouter.put("/:id", updatePackage); // Update an existing package
PackageRouter.delete("/:id", deletePackage); // Delete a package

export default PackageRouter;
