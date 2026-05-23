import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetDir = path.join(__dirname, 'src', 'asset');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath, callback);
    } else if (/\.(png|jpg|jpeg)$/i.test(file)) {
      callback(filePath);
    }
  });
}

walkDir(assetDir, async (filePath) => {
  const ext = path.extname(filePath);
  const name = path.basename(filePath, ext);
  const dir = path.dirname(filePath);
  const webpPath = path.join(dir, name + '.webp');
  const avifPath = path.join(dir, name + '.avif');

  try {
    // Convert to WebP
    await sharp(filePath)
      .webp({ quality: 80 })
      .toFile(webpPath);
    console.log(`Converted ${filePath} to ${webpPath}`);

    // Convert to AVIF
    await sharp(filePath)
      .avif({ quality: 50 })
      .toFile(avifPath);
    console.log(`Converted ${filePath} to ${avifPath}`);
  } catch (err) {
    console.error(`Error converting ${filePath}:`, err);
  }
});
