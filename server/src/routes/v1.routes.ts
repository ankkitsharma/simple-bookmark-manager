import { Router } from "express";
import bookingRoutes from "./booking.routes";

const router = Router();

router.use("/bookings", bookingRoutes);

export default router;
