import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.resolve('screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 1. Mobile 360x800 (Tela Estreita) - "Quem vai entrar?"
  await page.setViewport({ width: 360, height: 800, deviceScaleFactor: 2, isMobile: true });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(OUTPUT_DIR, '01_mobile_360_quem_vai_entrar.png') });
  console.log('Saved 01_mobile_360_quem_vai_entrar.png');

  // 2. Mobile 412x915 (Tela Média/Larga) - "Quem vai entrar?"
  await page.setViewport({ width: 412, height: 915, deviceScaleFactor: 2, isMobile: true });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(OUTPUT_DIR, '02_mobile_412_quem_vai_entrar.png') });
  console.log('Saved 02_mobile_412_quem_vai_entrar.png');

  // 3. Mobile 393x852 (iPhone 16) - "Quem vai entrar?"
  await page.setViewport({ width: 393, height: 852, deviceScaleFactor: 2, isMobile: true });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(OUTPUT_DIR, '03_mobile_393_quem_vai_entrar.png') });
  console.log('Saved 03_mobile_393_quem_vai_entrar.png');

  // 4. Desktop 1280x900 - "Quem vai entrar?"
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(OUTPUT_DIR, '04_desktop_quem_vai_entrar.png') });
  console.log('Saved 04_desktop_quem_vai_entrar.png');

  // 5. Tablet 768x1024 - "Quem vai entrar?"
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(OUTPUT_DIR, '05_tablet_768_quem_vai_entrar.png') });
  console.log('Saved 05_tablet_768_quem_vai_entrar.png');

  // 6. Mobile 393x852 - Home, Remédios e Alarme
  await page.setViewport({ width: 393, height: 852, deviceScaleFactor: 2, isMobile: true });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  // Ir para Login
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('Continuar')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 600));

  // Ir para Home
  const enterButtons = await page.$$('button');
  for (const b of enterButtons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.trim() === 'Entrar') {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(OUTPUT_DIR, '06_mobile_393_home_idoso.png') });
  console.log('Saved 06_mobile_393_home_idoso.png');

  await browser.close();
  console.log('All verification screenshots captured successfully!');
}

run().catch(console.error);
