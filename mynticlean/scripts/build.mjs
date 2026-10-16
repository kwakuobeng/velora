import { mkdir, rm, cp, readFile, writeFile } from "node:fs/promises";
await rm("dist", { recursive: true, force: true });
await mkdir("dist");
for (const file of ["styles.css", "app.js", "components", "public"]) {
  await cp(file, `dist/${file}`, { recursive: true });
}
// A single-file entrypoint also works when downloaded and opened with file://.
let html = await readFile("index.html", "utf8");
const css =
  (await readFile("styles.css", "utf8")) +
  "\n" +
  (await readFile("directions.css", "utf8"));
const app = await readFile("app.js", "utf8");
const directions = await readFile("directions.js", "utf8");
const svg = await readFile("public/favicon.svg", "utf8");
const icon = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
html = html.replace(
  /<link rel="stylesheet" href="\.\/styles\.css"\s*\/>/,
  () => `<style>${css}</style>`,
);
html = html.replace(
  /<script defer src="\.\/components\/LogoMark\.js"><\/script>/,
  "",
);
html = html.replace(/<script defer src="\.\/app\.js"><\/script>/, "");
html = html.replaceAll("./public/favicon.svg", icon);
html = html.replace(/<script defer src="\.\/directions\.js"><\/script>/, "");
html = html.replace(
  /<link rel="stylesheet" href="\.\/directions\.css"\s*\/>/,
  "",
);
html = html.replace(
  "</body>",
  () => `<script>${app}\n${directions}</script></body>`,
);
const markup = html.split("<script>")[0];
if (markup.includes('src="./') || markup.includes('href="./')) {
  throw new Error("Standalone HTML still references local assets");
}
await writeFile("dist/index.html", html);
await cp("directions.html", "dist/directions.html");
console.log(
  "Built dist/index.html — self-contained, opens directly without a server.",
);
