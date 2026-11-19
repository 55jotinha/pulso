import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings } from 'lucide-react';

export const PresentationFloatingButton = () => {
  const { setIsPresentationModalOpen, isStandalone } = useApp();
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobileScreen(window.innerWidth < 500);
    };

    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Só aparece em telas estreitas (< 500px) ou quando em modo standalone (PWA instalado)
  if (!isMobileScreen && !isStandalone) {
    return null;
  }

  return (
    <button
      onClick={() => setIsPresentationModalOpen(true)}
      title="Abrir Modo Apresentação Acadêmica"
      aria-label="Modo apresentação acadêmica"
      className="fixed bottom-24 right-3 z-40 w-11 h-11 rounded-full bg-white/95 text-[#1B2A4A] shadow-[0_4px_16px_rgba(27,42,74,0.15)] border border-slate-200/90 flex items-center justify-center hover:scale-105 active:scale-95 transition-all group backdrop-blur-sm"
    >
      <Settings className="w-5 h-5 text-slate-700 group-hover:rotate-45 transition-transform duration-300" />
      <span className="sr-only">Modo apresentação</span>
    </button>
  );
};
