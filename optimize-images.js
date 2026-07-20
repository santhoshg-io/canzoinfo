import sharp from 'sharp';
import fs from 'fs';

async function optimize() {
  const images = [
    { src: 'public/logohero.webp', dest: 'public/logohero.webp' },
    { src: 'src/assets/cardcanteen.webp', dest: 'src/assets/cardcanteen.webp' },
    { src: 'src/assets/logohero.webp', dest: 'src/assets/logohero.webp' }
  ];

  for (const img of images) {
    if (fs.existsSync(img.src)) {
      const originalSize = fs.statSync(img.src).size;
      console.log(`Optimizing ${img.src} (Original: ${originalSize} bytes)...`);
      
      const fileBuffer = fs.readFileSync(img.src);
      const buffer = await sharp(fileBuffer)
        .webp({ quality: 70, effort: 6 })
        .toBuffer();
      
      fs.writeFileSync(img.dest, buffer);
      console.log(`Saved optimized image to ${img.dest}. New size: ${buffer.length} bytes (Saved ${originalSize - buffer.length} bytes)`);
    } else {
      console.log(`File not found: ${img.src}`);
    }
  }
}

optimize().catch(err => console.error(err));
