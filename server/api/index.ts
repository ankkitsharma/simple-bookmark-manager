import { createApp } from "../src/lib/app-factory";

// Create the Express app instance
const app = createApp({
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  enableSwagger: true,
});

// Export the app as the default handler for Vercel
export default app;
