import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

// Ensure we have a value for the API URL
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const env = createEnv({
  clientPrefix: "NEXT_PUBLIC_",
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_API_URL: apiUrl,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
