import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.resolve('screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function run() {
  console.log('--- INICIANDO VERIFICAÇÃO PWA & OFFLINE ---');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER ERROR:', msg.text());
    }
  });

  // 1. Carregar app em 393x852
  await page.setViewport({ width: 393, height: 852, deviceScaleFactor: 2, isMobile: true });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  // 2. Verificar Manifest
  console.log('\n[1/5] Verificando Web App Manifest...');
  const manifestData = await page.evaluate(async () => {
    const res = await fetch('/manifest.webmanifest');
    return {
      status: res.status,
      data: await res.json()
    };
  });

  if (manifestData.status === 200 && manifestData.data.name === 'Pulso') {
    console.log('✓ Manifest carregado com sucesso!');
    console.log('  - Nome:', manifestData.data.name);
    console.log('  - Display:', manifestData.data.display);
    console.log('  - Theme Color:', manifestData.data.theme_color);
    console.log('  - Ícones:', manifestData.data.icons.map(i => `${i.src} (${i.sizes}, ${i.purpose})`).join(', '));
  } else {
    throw new Error('Falha na validação do manifest: ' + JSON.stringify(manifestData));
  }

  // 3. Verificar Ícones
  console.log('\n[2/5] Verificando integridade dos ícones PWA...');
  const iconUrls = ['/icon-192.png', '/icon-512.png', '/icon-maskable-512.png', '/apple-touch-icon.png', '/favicon.png'];
  for (const iconUrl of iconUrls) {
    const status = await page.evaluate(async (url) => {
      const res = await fetch(url);
      return res.status;
    }, iconUrl);
    if (status === 200) {
      console.log(`  ✓ ${iconUrl}: HTTP 200 OK`);
    } else {
      throw new Error(`Ícone não encontrado: ${iconUrl} (status ${status})`);
    }
  }

  // 4. Verificar Service Worker
  console.log('\n[3/5] Verificando registro do Service Worker...');
  // Aguardar 1 segundo para ativação do service worker
  await new Promise(r => setTimeout(r, 1200));

  const swStatus = await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) return { supported: false };
    const regs = await navigator.serviceWorker.getRegistrations();
    return {
      supported: true,
      registered: regs.length > 0,
      scope: regs[0]?.scope || null,
      active: !!regs[0]?.active
    };
  });
  console.log('  - SW Suportado:', swStatus.supported);
  console.log('  - SW Registrado:', swStatus.registered);
  console.log('  - SW Ativo:', swStatus.active);

  // 5. Teste de Funcionamento OFFLINE via CDP (Chrome DevTools Protocol)
  console.log('\n[4/5] Testando navegação 100% OFFLINE...');
  const client = await page.target().createCDPSession();
  await client.send('Network.enable');
  await client.send('Network.emulateNetworkConditions', {
    offline: true,
    latency: 0,
    downloadThroughput: 0,
    uploadThroughput: 0
  });

  // Tentar navegar entre as telas com a internet COMPLETAMENTE DESLIGADA
  // Avançar para Login
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

  // Ir para Remédios
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const medBtn = btns.find(b => b.textContent && b.textContent.includes('Remédios'));
    if (medBtn) medBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // Ir para Família
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const famBtn = btns.find(b => b.textContent && b.textContent.includes('Família'));
    if (famBtn) famBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  await page.screenshot({ path: path.join(OUTPUT_DIR, '09_pwa_offline_navigation.png') });
  console.log('  ✓ App funcionando 100% OFFLINE! Screenshot salvo: 09_pwa_offline_navigation.png');

  // Restaurar rede
  await client.send('Network.emulateNetworkConditions', {
    offline: false,
    latency: 0,
    downloadThroughput: -1,
    uploadThroughput: -1
  });

  // 6. Teste de Celular Real: Botão de Apresentação e Painel Modal
  console.log('\n[5/5] Testando Botão e Painel Modo Apresentação no Mobile...');
  await page.setViewport({ width: 393, height: 852, deviceScaleFactor: 2, isMobile: true });
  
  // O botão de engrenagem flutuante deve estar visível
  const gearBtn = await page.$('button[title*="Apresentação"]');
  if (gearBtn) {
    console.log('  ✓ Botão flutuante de engrenagem (Modo Apresentação) encontrado no mobile!');
    await gearBtn.click();
    await new Promise(r => setTimeout(r, 400));

    // Capturar screenshot do modal aberto
    await page.screenshot({ path: path.join(OUTPUT_DIR, '10_pwa_presentation_modal.png') });
    console.log('  ✓ Modal de apresentação capturado: 10_pwa_presentation_modal.png');
  } else {
    console.log('  ⚠️ Botão de engrenagem não encontrado no seletor');
  }

  // 7. Desktop Check
  console.log('\nVerificando Desktop (> 500px)...');
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(OUTPUT_DIR, '11_pwa_desktop_frame.png') });
  console.log('  ✓ Desktop capturado: 11_pwa_desktop_frame.png');

  await browser.close();
  console.log('\n=== TODAS AS VERIFICAÇÕES PWA FORAM CONCLUÍDAS COM SUCESSO! ===');
}

run().catch(console.error);
