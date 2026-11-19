import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.resolve('screenshots');

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  // No desktop, clicar direto em Dona Maria no SwitcherBar superior
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const mariaBtn = btns.find(b => b.textContent && b.textContent.includes('Dona Maria'));
    if (mariaBtn) mariaBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // Clicar na aba "Família" na barra inferior
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const famBtn = btns.find(b => b.textContent && b.textContent.includes('Família'));
    if (famBtn) famBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({ path: path.join(OUTPUT_DIR, '08_familia_desktop.png') });
  console.log('Saved 08_familia_desktop.png');

  await browser.close();
}

run().catch(console.error);

