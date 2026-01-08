import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} from "bun:test";
import { testPrisma as prisma } from "@/lib/prisma";
import { startTestServer } from "./test-server";
import type { Server } from "http";

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:8080";
const TEST_PORT = parseInt(process.env.TEST_PORT || "8080");

let testServer: Server | null = null;

describe("Booking API Integration Tests", () => {
  beforeAll(async () => {
    try {
      testServer = await startTestServer(TEST_PORT);
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error: any) {
      if (error?.code === "EADDRINUSE") {
        console.log(`Port ${TEST_PORT} already in use, assuming server is running`);
        await new Promise((resolve) => setTimeout(resolve, 100));
      } else {
        throw error;
      }
    }
    
    await prisma.$connect();
    await prisma.booking.deleteMany({});
  });

  afterAll(async () => {
    await prisma.booking.deleteMany({});
    await prisma.$disconnect();
    
    if (testServer) {
      await new Promise<void>((resolve, reject) => {
        testServer!.close((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
      testServer = null;
    }
  });

  beforeEach(async () => {
    await prisma.booking.deleteMany({});
    await new Promise((resolve) => setTimeout(resolve, 10));
  });

  afterEach(async () => {
    await prisma.booking.deleteMany({});
  });

  describe("POST /api/v1/bookings", () => {
    it("should create a new booking with valid data", async () => {
      const bookingData = {
        name: "John Doe",
        email: "john.doe@example.com",
        date: "2024-12-25T00:00:00Z",
        time: "19:00",
        guests: 4,
      };

      const response = await fetch(`${BASE_URL}/api/v1/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      expect(response.status).toBe(201);
      const data = (await response.json()) as {
        success: boolean;
        data: {
          id: string;
          name: string;
          email: string;
          guests: number;
          time: string;
        };
      };
      expect(data.success).toBe(true);
      expect(data.data).toHaveProperty("id");
      expect(data.data.name).toBe(bookingData.name);
      expect(data.data.email).toBe(bookingData.email);
      expect(data.data.guests).toBe(bookingData.guests);
      expect(data.data.time).toBe(bookingData.time);
    });

    it("should return 400 for missing required fields", async () => {
      const invalidData = {
        name: "John Doe",
      };

      const response = await fetch(`${BASE_URL}/api/v1/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invalidData),
      });

      expect(response.status).toBe(400);
      const data = (await response.json()) as {
        success: boolean;
        errors?: unknown;
      };
      expect(data.success).toBe(false);
      expect(data.errors).toBeDefined();
    });

    it("should return 400 for invalid email format", async () => {
      const invalidData = {
        name: "John Doe",
        email: "invalid-email",
        date: "2024-12-25T00:00:00Z",
        time: "19:00",
        guests: 4,
      };

      const response = await fetch(`${BASE_URL}/api/v1/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invalidData),
      });

      expect(response.status).toBe(400);
      const data = (await response.json()) as { success: boolean };
      expect(data.success).toBe(false);
    });

    it("should return 400 for guests less than 1", async () => {
      const invalidData = {
        name: "John Doe",
        email: "john.doe@example.com",
        date: "2024-12-25T00:00:00Z",
        time: "19:00",
        guests: 0,
      };

      const response = await fetch(`${BASE_URL}/api/v1/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invalidData),
      });

      expect(response.status).toBe(400);
      const data = (await response.json()) as { success: boolean };
      expect(data.success).toBe(false);
    });

    it("should return 400 for guests more than 20", async () => {
      const invalidData = {
        name: "John Doe",
        email: "john.doe@example.com",
        date: "2024-12-25T00:00:00Z",
        time: "19:00",
        guests: 21,
      };

      const response = await fetch(`${BASE_URL}/api/v1/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invalidData),
      });

      expect(response.status).toBe(400);
      const data = (await response.json()) as { success: boolean };
      expect(data.success).toBe(false);
    });

    it("should return 400 for empty name", async () => {
      const invalidData = {
        name: "",
        email: "john.doe@example.com",
        date: "2024-12-25T00:00:00Z",
        time: "19:00",
        guests: 4,
      };

      const response = await fetch(`${BASE_URL}/api/v1/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invalidData),
      });

      expect(response.status).toBe(400);
      const data = (await response.json()) as { success: boolean };
      expect(data.success).toBe(false);
    });
  });

  describe("GET /api/v1/bookings", () => {
    it("should return empty array when no bookings exist", async () => {
      const response = await fetch(`${BASE_URL}/api/v1/bookings`);

      expect(response.status).toBe(200);
      const data = (await response.json()) as {
        success: boolean;
        data: unknown[];
        count: number;
      };
      expect(data.success).toBe(true);
      expect(data.data).toEqual([]);
      expect(data.count).toBe(0);
    });

    it("should return all bookings", async () => {
      const booking1 = await prisma.booking.create({
        data: {
          name: "John Doe",
          email: "john.doe@example.com",
          date: new Date("2024-12-25T00:00:00Z"),
          time: "19:00",
          guests: 4,
        },
      });

      const booking2 = await prisma.booking.create({
        data: {
          name: "Jane Smith",
          email: "jane.smith@example.com",
          date: new Date("2024-12-26T00:00:00Z"),
          time: "20:00",
          guests: 2,
        },
      });

      const response = await fetch(`${BASE_URL}/api/v1/bookings`);

      expect(response.status).toBe(200);
      const data = (await response.json()) as {
        success: boolean;
        data: Array<{
          id: string;
          name: string;
          email: string;
        }>;
        count: number;
      };
      expect(data.success).toBe(true);
      expect(data.data).toHaveLength(2);
      expect(data.count).toBe(2);
      expect(data.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: booking1.id,
            name: booking1.name,
            email: booking1.email,
          }),
          expect.objectContaining({
            id: booking2.id,
            name: booking2.name,
            email: booking2.email,
          }),
        ]),
      );
    });

    it("should return bookings in descending order by createdAt", async () => {
      const booking1 = await prisma.booking.create({
        data: {
          name: "First Booking",
          email: "first@example.com",
          date: new Date("2024-12-25T00:00:00Z"),
          time: "19:00",
          guests: 2,
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 10));

      const booking2 = await prisma.booking.create({
        data: {
          name: "Second Booking",
          email: "second@example.com",
          date: new Date("2024-12-26T00:00:00Z"),
          time: "20:00",
          guests: 3,
        },
      });

      const response = await fetch(`${BASE_URL}/api/v1/bookings`);

      expect(response.status).toBe(200);
      const data = (await response.json()) as {
        success: boolean;
        data: Array<{ id: string }>;
      };
      expect(data.success).toBe(true);
      expect(data.data).toHaveLength(2);
      expect(data.data[0]!.id).toBe(booking2.id);
      expect(data.data[1]!.id).toBe(booking1.id);
    });
  });
});
