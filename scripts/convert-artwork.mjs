/**
 * Copies JPG/PNG and converts HEIC from attachments/ → public/artwork/work-NN.jpg
 * One row per file in attachments/ (13 sources → work-01..work-13).
 * Run: node scripts/convert-artwork.mjs
 */
import { readFile, writeFile, mkdir } from "fs/promises";
import { dirname, join, extname } from "path";
import { fileURLToPath } from "url";
import convert from "heic-convert";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const att = join(root, "attachments");
const outDir = join(root, "public", "artwork");

/** Every file in attachments/: March 10 (071705 trio, 071711 trio), then March 22 JPGs + HEIC. */
const artworkMap = [
  ["IMG_20260310_071705.jpg", "work-01.jpg"],
  ["IMG_20260310_071705.heic", "work-02.jpg"],
  ["IMG_20260310_071705 (1).heic", "work-03.jpg"],
  ["IMG_20260310_071711.heic", "work-04.jpg"],
  ["IMG_20260310_071711 (1).heic", "work-05.jpg"],
  ["IMG_20260310_071711 (3).heic", "work-06.jpg"],
  ["IMG_20260322_220746.jpg", "work-07.jpg"],
  ["IMG_20260322_221912.jpg", "work-08.jpg"],
  ["IMG_20260322_221942.jpg", "work-09.jpg"],
  ["IMG_20260322_221901.heic", "work-10.jpg"],
  ["IMG_20260322_221922.heic", "work-11.jpg"],
  ["IMG_20260322_221926.heic", "work-12.jpg"],
  ["IMG_20260322_221935.heic", "work-13.jpg"],
];

await mkdir(outDir, { recursive: true });

for (const [src, dest] of artworkMap) {
  const srcPath = join(att, src);
  const ext = extname(src).toLowerCase();
  if (ext === ".heic") {
    const inputBuffer = await readFile(srcPath);
    const outputBuffer = await convert({
      buffer: inputBuffer,
      format: "JPEG",
      quality: 0.92,
    });
    await writeFile(join(outDir, dest), Buffer.from(outputBuffer));
    console.log("converted", dest, "from", src);
  } else {
    const buf = await readFile(srcPath);
    await writeFile(join(outDir, dest), buf);
    console.log("copied", dest);
  }
}

console.log("Done. Output:", outDir);
