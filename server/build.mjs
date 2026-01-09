import * as esbuild from "esbuild";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

await esbuild.build({
  entryPoints: ["api/index.ts"],
  bundle: true,
  platform: "node",
  target: "node18",
  outfile: "api/index.mjs",
  format: "esm",
  packages: "external",
  alias: {
    "@/*": path.resolve(__dirname, "src/*"),
  },
});

console.log("Build complete!");
