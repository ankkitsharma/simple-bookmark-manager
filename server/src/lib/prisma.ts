import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma/client";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || "3306"),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
});
const prisma = new PrismaClient({ adapter });

const testAdapter = new PrismaMariaDb({
  host: process.env.TEST_DATABASE_HOST,
  port: parseInt(process.env.TEST_DATABASE_PORT || "3307"),
  user: process.env.TEST_DATABASE_USER,
  password: process.env.TEST_DATABASE_PASSWORD,
  database: process.env.TEST_DATABASE_NAME,
  connectionLimit: 5,
});
const testPrisma = new PrismaClient({ adapter: testAdapter });

const isTestMode = process.env.NODE_ENV === "test" || process.env.USE_TEST_DATABASE === "true";

const activePrisma = isTestMode ? testPrisma : prisma;

export { prisma, testPrisma, activePrisma };
