// Design Tokens de Escala para Ícones e Mascote (Referência iPhone 16: 393 x 852)

export const ICON_TOKENS = {
  // Ícone em card de lista/perfil: caixa arredondada de 60px com ícone de 30px (stroke 2)
  cardBox: 'w-[60px] h-[60px]',
  cardIconSize: 30,
  cardStroke: 2,

  // Ícone de ação em linha (pílula, câmera, relógio): caixa de 48px com ícone de 24px
  actionBox: 'w-[48px] h-[48px]',
  actionIconSize: 24,

  // Barra de navegação inferior: altura total 76px, ícone de 28px, rótulo 13px, botão mascote 60px
  navBarHeight: 'h-[76px]',
  navIconSize: 28,
  navLabelSize: 'text-[13px]',
  navMascotBtn: 'w-[60px] h-[60px]',

  // Ícones de status (check de tomada, radio de seleção): 28px
  statusBox: 'w-[28px] h-[28px]',
  statusIconSize: 28,

  // Mínimo para ícones secundários
  minIconSize: 20,
};

export const MASCOT_TOKENS = {
  // Tela "Quem vai entrar?" e login: círculo de 128px com o mascote de ~116px (ocupando ~90% do círculo)
  authCircle: 'w-[128px] h-[128px]',
  authMascotImg: 'w-[116px] h-[116px]',

  // Tela inicial do idoso, card do próximo remédio: mascote de ~96px sobrepondo parcialmente a borda
  homeCardMascot: 'w-[96px] h-[96px]',

  // Hora do remédio e Confirmação: mascote de ~220px (cerca de 55-60% da largura de 393px)
  alarmMascot: 'w-[220px] h-[220px]',

  // Botão do mascote na barra inferior: 60px com mascote preenchendo o círculo (~54px)
  navMascot: 'w-[54px] h-[54px]',
};

