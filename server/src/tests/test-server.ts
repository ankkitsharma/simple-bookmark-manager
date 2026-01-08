process.env.NODE_ENV = process.env.NODE_ENV || "test";
process.env.USE_TEST_DATABASE = "true";

import type { Server } from "http";
import { createApp } from "@/lib/app-factory";

export function createTestServer(port: number = 8080) {
  return createApp({ port, enableSwagger: true });
}

export function startTestServer(port: number = 8080): Promise<Server> {
  const app = createTestServer(port);
  
  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      console.log(`Test server listening on port http://localhost:${port}`);
      resolve(server);
    });
    
    server.once("error", (err) => {
      reject(err);
    });
  });
}
