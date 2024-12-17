// parent route /api/bookings

import { Router } from "express";
import {
  addBooking,
  deleteBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
} from "../controllers/bookingController";
import adminProtection from "../middlewares/adminProtection";
// import authRouter from "./authRoutes";

const BookingRouter = Router();

// Routes for bookings (public routes)
BookingRouter.get("/:bookingId", getBookingById); // Get bookings by id
BookingRouter.post("/", addBooking); // Add a new booking

// admin protection middleware
BookingRouter.use(adminProtection);

BookingRouter.get("/", getAllBookings); // Get all bookings
BookingRouter.put("/:bookingId", updateBooking); // update booking
BookingRouter.delete("/:bookingId", deleteBooking); // delete a booking

export default BookingRouter;
