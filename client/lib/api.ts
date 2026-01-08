import { env } from "@/env/client";
import type {
  Booking,
  CreateBookingRequest,
  BookingResponse,
  GetAllBookingsResponse,
} from "@/types/bookingSchema";

const API_URL = env.NEXT_PUBLIC_API_URL;

export async function getAllBookings(): Promise<GetAllBookingsResponse> {
  const response = await fetch(`${API_URL}/api/v1/bookings`);
  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }
  return response.json();
}

export async function createBooking(
  data: CreateBookingRequest
): Promise<BookingResponse> {
  const response = await fetch(`${API_URL}/api/v1/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create booking");
  }

  return response.json();
}
