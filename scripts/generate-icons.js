import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const MASCOTE_PATH = path.resolve('public', 'pulso-mascote.png');
const PUBLIC_DIR = path.resolve('public');

async function run() {
  const mascoteBase64 = fs.readFileSync(MASCOTE_PATH).toString('base64');
  const mascoteDataUrl = `data:image/png;base64,${mascoteBase64}`;

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  const iconSpecs = [
    { name: 'icon-192.png', size: 192, mascotScale: 0.82 },
    { name: 'icon-512.png', size: 512, mascotScale: 0.82 },
    { name: 'icon-maskable-512.png', size: 512, mascotScale: 0.65 }, // Safe zone <= 70%
    { name: 'apple-touch-icon.png', size: 180, mascotScale: 0.80 },
    { name: 'favicon.png', size: 64, mascotScale: 0.85 },
  ];

  for (const spec of iconSpecs) {
    const dataUrl = await page.evaluate(async (s, src) => {
      return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        canvas.width = s.size;
        canvas.height = s.size;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Fundo degradê suave de lavanda claro (#EEF0FA) para ciano claro (#CFF1F7)
        const grad = ctx.createLinearGradient(0, 0, s.size, s.size);
        grad.addColorStop(0, '#EEF0FA');
        grad.addColorStop(0.5, '#E5F3F8');
        grad.addColorStop(1, '#CFF1F7');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, s.size, s.size);

        const img = new Image();
        img.onload = () => {
          const maxDim = s.size * s.mascotScale;
          const ratio = Math.min(maxDim / img.width, maxDim / img.height);
          const drawW = img.width * ratio;
          const drawH = img.height * ratio;
          const drawX = (s.size - drawW) / 2;
          const drawY = (s.size - drawH) / 2;

          ctx.drawImage(img, drawX, drawY, drawW, drawH);
          resolve(canvas.toDataURL('image/png'));
        };
        img.src = src;
      });
    }, spec, mascoteDataUrl);

    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(path.join(PUBLIC_DIR, spec.name), buffer);
    console.log(`Generated: ${spec.name} (${spec.size}x${spec.size}, ${buffer.length} bytes)`);
  }

  // Favicon.ico
  const faviconBuffer = fs.readFileSync(path.join(PUBLIC_DIR, 'favicon.png'));
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.ico'), faviconBuffer);
  console.log('Generated: favicon.ico');

  await browser.close();
  console.log('All PWA icons generated successfully!');
}

run().catch(console.error);
