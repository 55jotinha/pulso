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

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER CONSOLE ERROR:', msg.text());
    }
  });

  // ========================================================
  // 1. FLUXO DONA MARIA (393x852)
  // ========================================================
  await page.setViewport({ width: 393, height: 852, deviceScaleFactor: 2, isMobile: true });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  // Ir para tela de login da Dona Maria
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const contBtn = btns.find(b => b.textContent && b.textContent.includes('Continuar'));
    if (contBtn) contBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // Entrar como Dona Maria
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const enterBtn = btns.find(b => b.textContent && b.textContent.trim() === 'Entrar');
    if (enterBtn) enterBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // Clicar na aba "Família" na barra inferior
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const famBtn = btns.find(b => b.textContent && b.textContent.includes('Família'));
    if (famBtn) famBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Screenshot 1: Tela Família e médico (Dona Maria)
  await page.screenshot({ path: path.join(OUTPUT_DIR, '01_familia_dona_maria_393.png') });
  console.log('Saved 01_familia_dona_maria_393.png');

  // Clicar em "Enviar relatório ao médico" para abrir o bottom sheet de consentimento
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const sendBtn = btns.find(b => b.textContent && b.textContent.includes('Enviar relatório ao médico'));
    if (sendBtn) sendBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Screenshot 2: Bottom Sheet de Consentimento Aberto
  await page.screenshot({ path: path.join(OUTPUT_DIR, '02_consentimento_bottom_sheet_393.png') });
  console.log('Saved 02_consentimento_bottom_sheet_393.png');

  // Ativar o toggle "Autorizo o envio"
  await page.evaluate(() => {
    const toggle = document.querySelector('button[aria-label="Autorizo o envio do relatório"]');
    if (toggle) toggle.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // Clicar em "Enviar relatório" dentro do modal
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const confirmBtn = btns.find(b => b.textContent && b.textContent.trim() === 'Enviar relatório');
    if (confirmBtn) confirmBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // Screenshot 3: Modal de celebração com o mascote
  await page.screenshot({ path: path.join(OUTPUT_DIR, '03_feedback_mascote_enviado_393.png') });
  console.log('Saved 03_feedback_mascote_enviado_393.png');

  // Fechar o modal com "Entendi, obrigado!"
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const okBtn = btns.find(b => b.textContent && b.textContent.includes('Entendi, obrigado!'));
    if (okBtn) okBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // ========================================================
  // 2. FLUXO ANA (RESPONSÁVEL / CUIDADOR) (393x852)
  // ========================================================
  // Clicar em "Trocar perfil" no topo
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const changeBtn = btns.find(b => b.textContent && b.textContent.includes('Trocar perfil'));
    if (changeBtn) changeBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Selecionar o card "Sou responsável / cuidador"
  await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.profile-card, h2'));
    for (const el of cards) {
      if (el.textContent && el.textContent.includes('Sou responsável')) {
        el.click();
        break;
      }
    }
  });
  await new Promise(r => setTimeout(r, 400));

  // Clicar em "Continuar"
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const contBtn = btns.find(b => b.textContent && b.textContent.includes('Continuar'));
    if (contBtn) contBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // Clicar em "Entrar" como Ana
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const enterBtn = btns.find(b => b.textContent && b.textContent.trim() === 'Entrar');
    if (enterBtn) enterBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Na tela da Ana, clicar na aba "Família"
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const famBtn = btns.find(b => b.textContent && b.textContent.includes('Família'));
    if (famBtn) famBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Screenshot 4: Tela Família da Ana (Rede de apoio)
  await page.screenshot({ path: path.join(OUTPUT_DIR, '04_familia_ana_393.png') });
  console.log('Saved 04_familia_ana_393.png');

  // ========================================================
  // 3. FLUXO DRA. HELENA (MÉDICO) (393x852)
  // ========================================================
  // Clicar em "Trocar perfil" no topo
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const changeBtn = btns.find(b => b.textContent && b.textContent.includes('Trocar perfil'));
    if (changeBtn) changeBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Selecionar o card "Sou médico"
  await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.profile-card, h2'));
    for (const el of cards) {
      if (el.textContent && el.textContent.includes('Sou médico')) {
        el.click();
        break;
      }
    }
  });
  await new Promise(r => setTimeout(r, 400));

  // Clicar em "Continuar"
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const contBtn = btns.find(b => b.textContent && b.textContent.includes('Continuar'));
    if (contBtn) contBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // Clicar em "Entrar" como Dra. Helena
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const enterBtn = btns.find(b => b.textContent && b.textContent.trim() === 'Entrar');
    if (enterBtn) enterBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Na barra inferior, a aba agora se chama "Pacientes"! Clicar nela:
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const pacBtn = btns.find(b => b.textContent && b.textContent.includes('Pacientes'));
    if (pacBtn) pacBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Screenshot 5: Tela Pacientes da Dra. Helena (com o Novo relatório recebido!)
  await page.screenshot({ path: path.join(OUTPUT_DIR, '05_pacientes_dra_helena_393.png') });
  console.log('Saved 05_pacientes_dra_helena_393.png');

  // ========================================================
  // 4. TESTES RESPONSIVOS EM 360, 412 E DESKTOP
  // ========================================================
  // Voltar para Dona Maria
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const changeBtn = btns.find(b => b.textContent && b.textContent.includes('Trocar perfil'));
    if (changeBtn) changeBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.profile-card, h2'));
    for (const el of cards) {
      if (el.textContent && el.textContent.includes('Sou idoso')) {
        el.click();
        break;
      }
    }
  });
  await new Promise(r => setTimeout(r, 300));

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const contBtn = btns.find(b => b.textContent && b.textContent.includes('Continuar'));
    if (contBtn) contBtn.click();
  });
  await new Promise(r => setTimeout(r, 300));

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
  await new Promise(r => setTimeout(r, 400));

  // 360x800
  await page.setViewport({ width: 360, height: 800, deviceScaleFactor: 2, isMobile: true });
  await page.screenshot({ path: path.join(OUTPUT_DIR, '06_familia_360.png') });
  console.log('Saved 06_familia_360.png');

  // 412x915
  await page.setViewport({ width: 412, height: 915, deviceScaleFactor: 2, isMobile: true });
  await page.screenshot({ path: path.join(OUTPUT_DIR, '07_familia_412.png') });
  console.log('Saved 07_familia_412.png');

  // Desktop 1280x900 - Mantendo na tela de Família
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
  await page.screenshot({ path: path.join(OUTPUT_DIR, '08_familia_desktop.png') });
  console.log('Saved 08_familia_desktop.png');

  await browser.close();
  console.log('All verification screenshots captured successfully!');
}

run().catch(console.error);
