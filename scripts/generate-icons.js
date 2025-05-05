const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '../assets');

// Create assets directory if it doesn't exist
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Generate icon.png (1024x1024)
sharp({
  create: {
    width: 1024,
    height: 1024,
    channels: 4,
    background: { r: 255, g: 153, b: 153, alpha: 1 }
  }
})
  .composite([{
    input: Buffer.from(
      `<svg><text x="50%" y="50%" font-family="Arial" font-size="200" fill="white" text-anchor="middle" dominant-baseline="middle">P</text></svg>`
    ),
    top: 0,
    left: 0
  }])
  .png()
  .toFile(path.join(assetsDir, 'icon.png'));

// Generate splash.png (1242x2436)
sharp({
  create: {
    width: 1242,
    height: 2436,
    channels: 4,
    background: { r: 255, g: 245, b: 245, alpha: 1 }
  }
})
  .composite([{
    input: Buffer.from(
      `<svg><text x="50%" y="50%" font-family="Arial" font-size="300" fill="#FF9999" text-anchor="middle" dominant-baseline="middle">PlanUs</text></svg>`
    ),
    top: 0,
    left: 0
  }])
  .png()
  .toFile(path.join(assetsDir, 'splash.png'));

// Generate adaptive-icon.png (1024x1024)
sharp({
  create: {
    width: 1024,
    height: 1024,
    channels: 4,
    background: { r: 255, g: 153, b: 153, alpha: 1 }
  }
})
  .composite([{
    input: Buffer.from(
      `<svg><text x="50%" y="50%" font-family="Arial" font-size="200" fill="white" text-anchor="middle" dominant-baseline="middle">P</text></svg>`
    ),
    top: 0,
    left: 0
  }])
  .png()
  .toFile(path.join(assetsDir, 'adaptive-icon.png'));

// Generate favicon.png (32x32)
sharp({
  create: {
    width: 32,
    height: 32,
    channels: 4,
    background: { r: 255, g: 153, b: 153, alpha: 1 }
  }
})
  .composite([{
    input: Buffer.from(
      `<svg><text x="50%" y="50%" font-family="Arial" font-size="20" fill="white" text-anchor="middle" dominant-baseline="middle">P</text></svg>`
    ),
    top: 0,
    left: 0
  }])
  .png()
  .toFile(path.join(assetsDir, 'favicon.png')); 