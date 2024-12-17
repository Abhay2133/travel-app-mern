import { Request, Response, NextFunction } from 'express';
import Package from '../models/Package';

export const getAllPackages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    next(error); // Pass error to the errorHandler
  }
};

export const getPackageById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const packageData = await Package.findById(req.params.id);
    if (!packageData) {
      const error = new Error('Package not found.');
      (error as any).status = 404;
      throw error;
    }
    res.status(200).json(packageData);
  } catch (error) {
    next(error);
  }
};

export const addPackage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newPackage = new Package(req.body);
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (error) {
    next(error);
  }
};

export const updatePackage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPackage) {
      const error = new Error('Package not found.');
      (error as any).status = 404;
      throw error;
    }
    res.status(200).json(updatedPackage);
  } catch (error) {
    next(error);
  }
};

export const deletePackage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    if (!deletedPackage) {
      const error = new Error('Package not found.');
      (error as any).status = 404;
      throw error;
    }
    res.status(200).json({ message: 'Package deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
