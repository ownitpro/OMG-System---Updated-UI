
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

const iconPath = path.join(__dirname, '../public/icon.png');
const outputDir = path.join(__dirname, '../public/icons');

const sizes = [192, 512];

async function generateIcons() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    const image = await loadImage(iconPath);
    
    for (const size of sizes) {
      const canvas = createCanvas(size, size);
      const ctx = canvas.getContext('2d');
      // Draw image resized
      ctx.drawImage(image, 0, 0, size, size);
      
      const buffer = canvas.toBuffer('image/png');
      const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
      fs.writeFileSync(outputPath, buffer);
      console.log(`Generated ${size}x${size} icon at ${outputPath}`);
    }
    console.log('Icon generation complete.');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();
