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
  await page.setViewport({ width: 393, height: 852, deviceScaleFactor: 2, isMobile: true });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  // Ir para login Dona Maria
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const contBtn = btns.find(b => b.textContent && b.textContent.includes('Continuar'));
    if (contBtn) contBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const enterBtn = btns.find(b => b.textContent && b.textContent.trim() === 'Entrar');
    if (enterBtn) enterBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const famBtn = btns.find(b => b.textContent && b.textContent.includes('Família'));
    if (famBtn) famBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Rolar suavemente para baixo para mostrar o botão "Enviar relatório ao médico"
  await page.evaluate(() => {
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (scrollContainer) {
      scrollContainer.scrollTop = 220;
    }
  });
  await new Promise(r => setTimeout(r, 400));

  await page.screenshot({ path: path.join(OUTPUT_DIR, '01_familia_dona_maria_scrolled_393.png') });
  console.log('Saved 01_familia_dona_maria_scrolled_393.png');

  await browser.close();
}

run().catch(console.error);

