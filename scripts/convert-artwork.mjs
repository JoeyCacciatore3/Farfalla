/**
 * Copies JPG sources and converts HEIC attachments to public/artwork/work-01..07.jpg
 * Run: node scripts/convert-artwork.mjs
 */
import { readFile, writeFile, mkdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import convert from "heic-convert";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const att = join(root, "attachments (2)");
const outDir = join(root, "public", "artwork");

const jpgMap = [
  ["IMG_20260322_221912.jpg", "work-01.jpg"],
  ["IMG_20260322_221942.jpg", "work-02.jpg"],
  ["IMG_20260322_220746.jpg", "work-03.jpg"],
];

const heicMap = [
  ["IMG_20260322_221901.heic", "work-04.jpg"],
  ["IMG_20260322_221922.heic", "work-05.jpg"],
  ["IMG_20260322_221926.heic", "work-06.jpg"],
  ["IMG_20260322_221935.heic", "work-07.jpg"],
];

await mkdir(outDir, { recursive: true });

for (const [src, dest] of jpgMap) {
  const buf = await readFile(join(att, src));
  await writeFile(join(outDir, dest), buf);
  console.log("copied", dest);
}

for (const [src, dest] of heicMap) {
  const inputBuffer = await readFile(join(att, src));
  const outputBuffer = await convert({
    buffer: inputBuffer,
    format: "JPEG",
    quality: 0.92,
  });
  await writeFile(join(outDir, dest), Buffer.from(outputBuffer));
  console.log("converted", dest, "from", src);
}

console.log("Done. Output:", outDir);
