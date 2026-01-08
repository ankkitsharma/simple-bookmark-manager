import { createDocument } from "zod-openapi";
import {
  createBookingSchema,
  successResponseSchema,
  getAllBookingsResponseSchema,
  errorResponseSchema,
} from "@/routes/booking.routes";

export function generateOpenAPIDocument(port: number) {
  const document = createDocument({
    openapi: "3.1.0",
    info: {
      title: "Booking API",
      version: "1.0.0",
      description: "API documentation for the Booking Management System",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "Development server",
      },
    ],
    paths: {
      "/api/v1/bookings": {
        post: {
          summary: "Create a new booking",
          description: "Creates a new booking with the provided information",
          tags: ["Bookings"],
          requestBody: {
            content: {
              "application/json": {
                schema: createBookingSchema,
              },
            },
          },
          responses: {
            "201": {
              description: "Booking created successfully",
              content: {
                "application/json": {
                  schema: successResponseSchema,
                },
              },
            },
            "400": {
              description: "Validation error",
              content: {
                "application/json": {
                  schema: errorResponseSchema,
                },
              },
            },
            "500": {
              description: "Server error",
            },
          },
        },
        get: {
          summary: "Get all bookings",
          description:
            "Retrieves all bookings ordered by creation date (newest first)",
          tags: ["Bookings"],
          responses: {
            "200": {
              description: "List of all bookings",
              content: {
                "application/json": {
                  schema: getAllBookingsResponseSchema,
                },
              },
            },
            "500": {
              description: "Server error",
            },
          },
        },
      },
    },
  });

  return document;
}
