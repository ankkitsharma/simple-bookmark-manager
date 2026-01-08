import { env as serverEnv } from "@/env/server";
import { createApp } from "@/lib/app-factory";

const port = serverEnv.PORT;

const app = createApp({ port });

const server = app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});

export { app, server };
