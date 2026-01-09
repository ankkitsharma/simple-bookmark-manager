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
  banner: {
    js: `import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);`,
  },
});

console.log("Build complete!");
