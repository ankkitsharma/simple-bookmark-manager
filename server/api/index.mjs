// src/lib/app-factory.ts
import express from "express";

// src/env/server.ts
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
var env = createEnv({
  server: {
    // DATABASE_URL: z.url(),
    PORT: z.coerce.number(),
    CORS_ORIGINS: z.string()
  },
  runtimeEnv: process.env
});

// src/lib/app-factory.ts
import cors from "cors";
import swaggerUi from "swagger-ui-express";

// src/lib/openapi.ts
import { createDocument } from "zod-openapi";

// src/routes/booking.routes.ts
import {
  Router
} from "express";
import { z as z2 } from "zod";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// generated/prisma/client.ts
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import "@prisma/client/runtime/client";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.2.0",
  "engineVersion": "0c8ef2ce45c83248ab3df073180d5eda9e8be7a3",
  "activeProvider": "mysql",
  "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "mysql"\n}\n\nmodel Booking {\n  id        String   @id @default(uuid())\n  name      String\n  email     String\n  date      DateTime\n  time      String\n  guests    Int\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("bookings")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Booking":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"time","kind":"scalar","type":"String"},{"name":"guests","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"bookings"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("node:buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_bg.mysql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_bg.mysql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  }
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || "3306"),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5
});
var prisma = new PrismaClient({ adapter });
var testAdapter = new PrismaMariaDb({
  host: process.env.TEST_DATABASE_HOST,
  port: parseInt(process.env.TEST_DATABASE_PORT || "3307"),
  user: process.env.TEST_DATABASE_USER,
  password: process.env.TEST_DATABASE_PASSWORD,
  database: process.env.TEST_DATABASE_NAME,
  connectionLimit: 5
});
var testPrisma = new PrismaClient({ adapter: testAdapter });
var isTestMode = process.env.NODE_ENV === "test" || process.env.USE_TEST_DATABASE === "true";
var activePrisma = isTestMode ? testPrisma : prisma;

// src/controllers/booking.controller.ts
var createBooking = async (req, res) => {
  try {
    const { name: name2, email: email2, date: date2, time: time2, guests: guests2 } = req.body;
    const booking = await activePrisma.booking.create({
      data: {
        name: name2,
        email: email2,
        date: new Date(date2),
        time: time2,
        guests: guests2
      }
    });
    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};
var getAllBookings = async (req, res) => {
  try {
    const bookings = await activePrisma.booking.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });
    res.status(200).json({
      success: true,
      data: bookings,
      count: bookings.length
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

// src/routes/booking.routes.ts
var router = Router();
var name = z2.string().min(1, "Name is required").max(100, "Name must be less than 100 characters").meta({
  description: "Name of the person making the booking",
  example: "John Doe"
});
var email = z2.string().email("Invalid email address").meta({
  description: "Email address of the person making the booking",
  example: "john.doe@example.com"
});
var date = z2.string().datetime("Invalid date format").meta({
  description: "Date of the booking in ISO 8601 format",
  example: "2024-12-25T00:00:00Z"
});
var time = z2.string().min(1, "Time is required").meta({
  description: "Time of the booking",
  example: "19:00"
});
var guests = z2.number().int().min(1, "Guests must be at least 1").max(20, "Guests cannot exceed 20").meta({
  description: "Number of guests",
  example: 4
});
var createBookingSchema = z2.object({ name, email, date, time, guests });
var bookingResponseSchema = z2.object({
  id: z2.string().meta({ description: "Unique identifier for the booking", example: "123e4567-e89b-12d3-a456-426614174000" }),
  name: z2.string().meta({ description: "Name of the person", example: "John Doe" }),
  email: z2.string().email().meta({ description: "Email address", example: "john.doe@example.com" }),
  date: z2.date().meta({ description: "Booking date", example: "2024-12-25T00:00:00Z" }),
  time: z2.string().meta({ description: "Booking time", example: "19:00" }),
  guests: z2.number().int().meta({ description: "Number of guests", example: 4 }),
  createdAt: z2.date().meta({ description: "Creation timestamp", example: "2024-01-01T00:00:00Z" }),
  updatedAt: z2.date().meta({ description: "Last update timestamp", example: "2024-01-01T00:00:00Z" })
});
var successResponseSchema = z2.object({
  success: z2.boolean().meta({ description: "Indicates if the request was successful", example: true }),
  data: bookingResponseSchema
});
var getAllBookingsResponseSchema = z2.object({
  success: z2.boolean().meta({ description: "Indicates if the request was successful", example: true }),
  data: z2.array(bookingResponseSchema),
  count: z2.number().int().meta({ description: "Total number of bookings", example: 2 })
});
var errorResponseSchema = z2.object({
  success: z2.boolean().meta({ description: "Indicates if the request was successful", example: false }),
  message: z2.string().meta({ description: "Error message", example: "Validation error" }),
  errors: z2.array(
    z2.object({
      code: z2.string(),
      path: z2.array(z2.union([z2.string(), z2.number()])),
      message: z2.string()
    })
  )
});
var validateBooking = (req, res, next) => {
  try {
    createBookingSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z2.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.issues
      });
    }
    next(error);
  }
};
router.post("/", validateBooking, createBooking);
router.get("/", getAllBookings);
var booking_routes_default = router;

// src/lib/openapi.ts
function generateOpenAPIDocument(port) {
  const document = createDocument({
    openapi: "3.1.0",
    info: {
      title: "Booking API",
      version: "1.0.0",
      description: "API documentation for the Booking Management System"
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "Development server"
      }
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
                schema: createBookingSchema
              }
            }
          },
          responses: {
            "201": {
              description: "Booking created successfully",
              content: {
                "application/json": {
                  schema: successResponseSchema
                }
              }
            },
            "400": {
              description: "Validation error",
              content: {
                "application/json": {
                  schema: errorResponseSchema
                }
              }
            },
            "500": {
              description: "Server error"
            }
          }
        },
        get: {
          summary: "Get all bookings",
          description: "Retrieves all bookings ordered by creation date (newest first)",
          tags: ["Bookings"],
          responses: {
            "200": {
              description: "List of all bookings",
              content: {
                "application/json": {
                  schema: getAllBookingsResponseSchema
                }
              }
            },
            "500": {
              description: "Server error"
            }
          }
        }
      }
    }
  });
  return document;
}

// src/routes/v1.routes.ts
import { Router as Router2 } from "express";
var router2 = Router2();
router2.use("/bookings", booking_routes_default);
var v1_routes_default = router2;

// src/lib/app-factory.ts
function createApp(options) {
  const { port, enableSwagger = true } = options;
  const app2 = express();
  app2.use(
    cors({
      origin: [env.CORS_ORIGINS],
      credentials: true
    })
  );
  app2.use(express.json());
  app2.use(express.urlencoded({ extended: true }));
  if (enableSwagger) {
    const openAPIDocument = generateOpenAPIDocument(port);
    app2.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openAPIDocument));
    app2.get("/api-docs.json", (req, res) => {
      res.json(openAPIDocument);
    });
  }
  app2.use("/api/v1", v1_routes_default);
  app2.get("/", (req, res) => {
    res.send("Hello World!!!");
  });
  return app2;
}

// api/index.ts
var app = createApp({
  port: process.env.PORT ? parseInt(process.env.PORT) : 3e3,
  enableSwagger: true
});
var index_default = app;
export {
  index_default as default
};
