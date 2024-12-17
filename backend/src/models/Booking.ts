import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  package: { type: mongoose.Schema.ObjectId, ref: "Package" },
  name: String,
  email: String,
  phone: String,
  travelers: Number,
  specialRequests: String,
  totalPrice: Number,
});
const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
