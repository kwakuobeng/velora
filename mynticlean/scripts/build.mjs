import { mkdir, rm, cp } from "node:fs/promises";
await rm("dist", { recursive: true, force: true });
await mkdir("dist");
for (const file of [
  "index.html",
  "styles.css",
  "app.js",
  "components",
  "public",
])
  await cp(file, `dist/${file}`, { recursive: true });
console.log("Built standalone static site in dist/");
