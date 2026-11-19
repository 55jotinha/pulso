import React from 'react';
import { Home, Pill, Users, Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ICON_TOKENS, MASCOT_TOKENS } from '../../constants/tokens';

export const BottomNav = () => {
  const { currentScreen, setCurrentScreen, activeProfile, isConsentOpen, sentSuccessModal } = useApp();

  // Se estiver em telas de autenticação, alarme de tela cheia ou com modais abertos, não exibe a barra inferior
  if (['select-profile', 'login', 'alarm', 'confirmation'].includes(currentScreen) || isConsentOpen || sentSuccessModal) {
    return null;
  }

  const navItems = [
    {
      id: 'home',
      label: 'Início',
      icon: Home,
      screen: activeProfile === 'idoso' ? 'home' : activeProfile === 'responsavel' ? 'caregiver' : 'doctor',
      isActive: currentScreen === 'home' || currentScreen === 'caregiver' || currentScreen === 'doctor'
    },
    {
      id: 'medicines',
      label: 'Remédios',
      icon: Pill,
      screen: 'medicines',
      isActive: currentScreen === 'medicines' || currentScreen === 'add-medicine'
    },
    {
      id: 'family-doctor',
      label: activeProfile === 'medico' ? 'Pacientes' : 'Família',
      icon: Users,
      screen: 'family-doctor',
      isActive: currentScreen === 'family-doctor'
    },
    {
      id: 'alarm-trigger',
      label: 'Lembretes',
      icon: Bell,
      screen: 'alarm',
      isActive: currentScreen === 'alarm'
    }
  ];

  return (
    <div className="absolute bottom-2 left-0 right-0 px-3.5 pointer-events-none z-30">
      <nav className={`pointer-events-auto bg-white/95 backdrop-blur-md rounded-full px-3 shadow-[0_10px_30px_rgba(27,42,74,0.14)] border border-white/80 flex items-center justify-between ${ICON_TOKENS.navBarHeight}`}>
        <div className="flex items-center space-x-1 sm:space-x-1.5 flex-1 justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.isActive;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.screen)}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-full transition-all duration-200 ${
                  active
                    ? 'text-[#785EDF] bg-[#F3F0FC]'
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
                title={item.label}
              >
                <Icon size={ICON_TOKENS.navIconSize} strokeWidth={active ? 2.5 : 2} />
                <span className={`${ICON_TOKENS.navLabelSize} font-bold mt-0.5 leading-none`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Botão do mascote destacado à direita (60px) com o mascote preenchendo o círculo (~54px) */}
        <button
          onClick={() => setCurrentScreen('alarm')}
          title="Falar com o Pulso / Hora do Remédio"
          className={`relative group shrink-0 rounded-full bg-gradient-to-tr from-[#7FD8E6] via-[#81D1EC] to-[#84C5F0] shadow-md hover:shadow-lg transition-transform active:scale-95 flex items-center justify-center p-0.5 ml-1 ${ICON_TOKENS.navMascotBtn}`}
        >
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-white">
            <img
              src="/pulso-mascote.png"
              alt="Mascote Pulso"
              className={`${MASCOT_TOKENS.navMascot} object-contain transform group-hover:scale-110 transition-transform`}
            />
          </div>
          <span className="absolute top-0 right-0 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#785EDF] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#785EDF] border-2 border-white"></span>
          </span>
        </button>
      </nav>
    </div>
  );
};
