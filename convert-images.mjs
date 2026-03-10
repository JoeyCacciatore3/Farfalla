import fs from 'fs';
import path from 'path';
import heicConvert from 'heic-convert';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, 'attachments');
const outputDir = path.join(__dirname, 'public', 'artwork');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  const files = fs.readdirSync(inputDir);
  let index = 1;
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const inPath = path.join(inputDir, file);
    const outPath = path.join(outputDir, `farfalla_${index}.jpg`);
    
    console.log(`Processing ${file}...`);
    try {
      if (ext === '.heic') {
        const inputBuffer = fs.readFileSync(inPath);
        const outputBuffer = await heicConvert({
          buffer: inputBuffer,
          format: 'JPEG',
          quality: 0.85
        });
        fs.writeFileSync(outPath, outputBuffer);
      } else if (ext === '.jpg' || ext === '.jpeg') {
        // For existing JPGs, we'll just copy them over
        fs.copyFileSync(inPath, outPath);
      } else {
        console.log(`Skipping unsupported format ${file}`);
        continue;
      }
      console.log(`Saved farfalla_${index}.jpg`);
      index++;
    } catch (e) {
      console.error(`Error processing ${file}:`, e);
    }
  }
}

run();
