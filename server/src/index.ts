import e from "express";
import { env as serverEnv } from "@/env/server";

const app = e();

const port = serverEnv.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
