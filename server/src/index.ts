import express from "express";
import { env as serverEnv } from "@/env/server";
import cors from "cors";

const app = express();

const port = serverEnv.PORT;

app.use(
  cors({
    origin: [serverEnv.CORS_ORIGINS],
    credentials: true,
  }),
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
