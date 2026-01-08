// This file will be auto-generated from OpenAPI schema
// Run: npm run generate:types

export interface Booking {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingRequest {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
}

export interface BookingResponse {
  success: boolean;
  data: Booking;
}

export interface GetAllBookingsResponse {
  success: boolean;
  data: Booking[];
  count: number;
}

export interface ErrorResponse {
  success: false;
  message: string;
  errors?: Array<{
    code: string;
    path: (string | number)[];
    message: string;
  }>;
}
