import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";

const required = [
  "dist/index.html",
  "dist/privacy/index.html",
  "dist/data-sources/index.html",
  "dist/app-icon.png",
  "dist/favicon.png",
  "dist/og-image.png",
  "dist/robots.txt",
  "dist/sitemap.xml",
];

for (const path of required) {
  await access(path, constants.R_OK);
}

const home = await readFile("dist/index.html", "utf8");
const privacy = await readFile("dist/privacy/index.html", "utf8");
const dataSources = await readFile("dist/data-sources/index.html", "utf8");
const download = "https://github.com/hgthaii/dichthat/releases/latest/download/DichThat.dmg";
const support = "https://www.buymeacoffee.com/hgthaii";

if ((home.split(download).length - 1) !== 2) {
  throw new Error("Expected exactly two direct latest-DMG links on the landing page.");
}

if (!home.includes("canonical") || !home.includes("og-image.png")) {
  throw new Error("Landing page metadata is incomplete.");
}

if (!home.includes(support)) {
  throw new Error("Landing page footer is missing the Buy Me a Coffee link.");
}

if (!privacy.includes("Apple Translation") || !privacy.includes("offline dictionary")) {
  throw new Error("Privacy page is missing verified on-device processing disclosure.");
}

if (!dataSources.includes("Open English WordNet 2025") ||
    !dataSources.includes("CMU Pronouncing Dictionary") ||
    !dataSources.includes("Apple Translation")) {
  throw new Error("Data Sources page is missing bundled language data attribution.");
}

console.log("Static output verified.");
