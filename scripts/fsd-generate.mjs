#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

const usage = () => {
  console.log(
    "Usage: npm run gen:fsd -- <layer> [slice] [--segments ui,model,lib,api,config] [--pages-alias views]"
  );
  console.log("  layer: app|widgets|features|entities|shared|pages|views");
  console.log(
    "  slice: required for widgets|features|entities|pages|views (ignored for app|shared)"
  );
  console.log("  --segments: comma-separated segments (default: ui,model,lib)");
  console.log(
    "  --pages-alias: rename FSD pages layer folder (default: pages, e.g. views)"
  );
};

const rawArgs = process.argv.slice(2);
if (rawArgs.length < 1) {
  usage();
  process.exit(1);
}

const flags = {};
const positionals = [];
for (const token of rawArgs) {
  if (token.startsWith("--")) {
    const [k, v] = token.replace(/^--/, "").split("=");
    flags[k] = v ?? true;
  } else {
    positionals.push(token);
  }
}

const [rawLayer, maybeSlice] = positionals;
const allowedLayers = [
  "app",
  "widgets",
  "features",
  "entities",
  "shared",
  "pages",
  "views",
];
if (!allowedLayers.includes(rawLayer)) {
  console.error(
    `Invalid layer: ${rawLayer}. Allowed: ${allowedLayers.join(", ")}`
  );
  process.exit(1);
}

const pagesAlias = flags["pages-alias"] || "pages";
const canonicalLayer = rawLayer === "views" ? "pages" : rawLayer;

const sliceRequiredLayers = new Set([
  "widgets",
  "features",
  "entities",
  "pages",
]);
const sliceProvided =
  typeof maybeSlice === "string" && !maybeSlice.startsWith("--");
if (sliceRequiredLayers.has(canonicalLayer) && !sliceProvided) {
  console.error(`Slice name is required for layer: ${rawLayer}`);
  usage();
  process.exit(1);
}

const defaultSegments = ["ui", "model", "lib"];
const segments =
  typeof flags.segments === "string"
    ? flags.segments
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : defaultSegments;

const srcDir = path.join(projectRoot, "src");
const layerDirName = canonicalLayer === "pages" ? pagesAlias : canonicalLayer;
const layerDir = path.join(srcDir, layerDirName);
const sliceDir = sliceProvided ? path.join(layerDir, maybeSlice) : layerDir;

const ensureDir = (p) => {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
};

ensureDir(srcDir);
ensureDir(layerDir);
ensureDir(sliceDir);

for (const seg of segments) {
  const segDir = path.join(sliceDir, seg);
  ensureDir(segDir);
  const indexFile = path.join(segDir, "index.ts");
  if (!fs.existsSync(indexFile)) {
    const commentPath = sliceProvided
      ? `${layerDirName}/${maybeSlice}/${seg}`
      : `${layerDirName}/${seg}`;
    fs.writeFileSync(indexFile, `// ${commentPath}\nexport {};\n`);
  }
}

// public API (export only created segments)
const publicApi = path.join(sliceDir, "index.ts");
if (!fs.existsSync(publicApi)) {
  const segmentExports = ["ui", "model", "lib", "api", "config"]
    .filter((s) => segments.includes(s))
    .map((s) => `export * as ${s} from './${s}'`)
    .join("\n");
  fs.writeFileSync(publicApi, segmentExports + (segmentExports ? "\n" : ""));
}

const targetPath = sliceProvided
  ? `src/${layerDirName}/${maybeSlice}`
  : `src/${layerDirName}`;
console.log(`Created: ${targetPath} with segments: ${segments.join(", ")}`);
