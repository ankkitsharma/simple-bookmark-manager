import {
  Router,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { z } from "zod";
import {
  createBooking,
  getAllBookings,
} from "@/controllers/booking.controller";

const router = Router();

const name = z
  .string()
  .min(1, "Name is required")
  .max(100, "Name must be less than 100 characters")
  .meta({
    description: "Name of the person making the booking",
    example: "John Doe",
  });

const email = z
  .string()
  .email("Invalid email address")
  .meta({
    description: "Email address of the person making the booking",
    example: "john.doe@example.com",
  });

const date = z
  .string()
  .datetime("Invalid date format")
  .meta({
    description: "Date of the booking in ISO 8601 format",
    example: "2024-12-25T00:00:00Z",
  });

const time = z
  .string()
  .min(1, "Time is required")
  .meta({
    description: "Time of the booking",
    example: "19:00",
  });

const guests = z
  .number()
  .int()
  .min(1, "Guests must be at least 1")
  .max(20, "Guests cannot exceed 20")
  .meta({
    description: "Number of guests",
    example: 4,
  });

const createBookingSchema = z.object({ name, email, date, time, guests });

const bookingResponseSchema = z.object({
  id: z
    .string()
    .meta({ description: "Unique identifier for the booking", example: "123e4567-e89b-12d3-a456-426614174000" }),
  name: z.string().meta({ description: "Name of the person", example: "John Doe" }),
  email: z.string().email().meta({ description: "Email address", example: "john.doe@example.com" }),
  date: z.date().meta({ description: "Booking date", example: "2024-12-25T00:00:00Z" }),
  time: z.string().meta({ description: "Booking time", example: "19:00" }),
  guests: z.number().int().meta({ description: "Number of guests", example: 4 }),
  createdAt: z.date().meta({ description: "Creation timestamp", example: "2024-01-01T00:00:00Z" }),
  updatedAt: z.date().meta({ description: "Last update timestamp", example: "2024-01-01T00:00:00Z" }),
});

const successResponseSchema = z.object({
  success: z.boolean().meta({ description: "Indicates if the request was successful", example: true }),
  data: bookingResponseSchema,
});

const getAllBookingsResponseSchema = z.object({
  success: z.boolean().meta({ description: "Indicates if the request was successful", example: true }),
  data: z.array(bookingResponseSchema),
  count: z.number().int().meta({ description: "Total number of bookings", example: 2 }),
});

const errorResponseSchema = z.object({
  success: z.boolean().meta({ description: "Indicates if the request was successful", example: false }),
  message: z.string().meta({ description: "Error message", example: "Validation error" }),
  errors: z.array(
    z.object({
      code: z.string(),
      path: z.array(z.union([z.string(), z.number()])),
      message: z.string(),
    })
  ),
});

const validateBooking = (req: Request, res: Response, next: NextFunction) => {
  try {
    createBookingSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.issues,
      });
    }
    next(error);
  }
};

router.post("/", validateBooking, createBooking);

router.get("/", getAllBookings);

export {
  createBookingSchema,
  bookingResponseSchema,
  successResponseSchema,
  getAllBookingsResponseSchema,
  errorResponseSchema,
};

export default router;
