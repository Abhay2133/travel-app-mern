import { Request, Response, NextFunction } from "express";
import Booking from "../models/Booking";
import Package from "../models/Package";

// Add a new booking
export const addBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { packageId, name, email, phone, travelers, specialRequests } =
      req.body;

    const packageData = await Package.findById(packageId);
    if (!packageData) {
      const error = new Error("Package not found.");
      (error as any).status = 404;
      throw error;
    }

    if (!packageData.price)
      throw new Error(`invalid price : ${packageData.price}`);
    const totalPrice = packageData.price * travelers;

    const newBooking = new Booking({
      package: packageData._id,
      name,
      email,
      phone,
      travelers,
      specialRequests,
      totalPrice,
    });

    await newBooking.save();
    res
      .status(201)
      .json({ message: "Booking successful.", booking: newBooking });
  } catch (error) {
    next(error);
  }
};

// Get all bookings
export const getAllBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookings = await Booking.find().populate("package");
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

// Get a specific booking by ID
export const getBookingById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId).populate("package");

    if (!booking) {
      const error = new Error("Booking not found.");
      (error as any).status = 404;
      throw error;
    }

    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

// Update a booking
export const updateBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookingId } = req.params;
    const { packageId, name, email, phone, travelers, specialRequests } =
      req.body;

    const packageData = await Package.findById(packageId);
    if (!packageData) {
      const error = new Error("Package not found.");
      (error as any).status = 404;
      throw error;
    }

    if (!packageData.price)
      throw new Error(`invalid price : ${packageData.price}`);
    const totalPrice = packageData.price * travelers;

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        packageId,
        name,
        email,
        phone,
        travelers,
        specialRequests,
        totalPrice,
      },
      { new: true }
    );

    if (!updatedBooking) {
      const error = new Error("Booking not found.");
      (error as any).status = 404;
      throw error;
    }

    res.status(200).json({
      message: "Booking updated successfully.",
      booking: updatedBooking,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a booking
export const deleteBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookingId } = req.params;

    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      const error = new Error("Booking not found.");
      (error as any).status = 404;
      throw error;
    }

    res.status(200).json({
      message: "Booking deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};
