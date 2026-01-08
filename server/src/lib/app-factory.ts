import express, { type Express } from "express";
import { env as serverEnv } from "@/env/server";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { generateOpenAPIDocument } from "@/lib/openapi";
import v1Routes from "@/routes/v1.routes";

export interface AppFactoryOptions {
  port: number;
  enableSwagger?: boolean;
}

export function createApp(options: AppFactoryOptions): Express {
  const { port, enableSwagger = true } = options;
  const app = express();

  app.use(
    cors({
      origin: [serverEnv.CORS_ORIGINS],
      credentials: true,
    }),
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  if (enableSwagger) {
    const openAPIDocument = generateOpenAPIDocument(port);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openAPIDocument));
    app.get("/api-docs.json", (req, res) => {
      res.json(openAPIDocument);
    });
  }

  app.use("/api/v1", v1Routes);

  app.get("/", (req, res) => {
    res.send("Hello World!!!");
  });

  return app;
}
