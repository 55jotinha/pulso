import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';
import { AcademicNotice } from './AcademicNotice';
import { BottomNav } from './BottomNav';
import { ConsentBottomSheet } from '../modals/ConsentBottomSheet';
import { SentSuccessModal } from '../modals/SentSuccessModal';
import { useApp } from '../../context/AppContext';

export const PhoneFrame = ({ children }) => {
  const { toastMessage } = useApp();

  return (
    <div className="relative w-full sm:max-w-[393px] h-full sm:max-h-[852px] bg-[#EEF0FA] sm:rounded-[48px] sm:shadow-[0_25px_60px_-15px_rgba(27,42,74,0.25),0_0_0_10px_#1B2A4A] overflow-hidden flex flex-col sm:border-[4px] sm:border-[#0F172A] transition-all">
      
      {/* Dynamic Island / Notch e Status Bar */}
      <div className="pt-3 px-7 pb-1 flex items-center justify-between z-30 shrink-0 text-slate-800 select-none">
        <span className="text-[14px] font-bold tracking-normal">9:41</span>
        
        {/* Dynamic Island Pill */}
        <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1e293b] mr-2"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500/70 animate-pulse"></div>
        </div>

        <div className="flex items-center gap-1.5 text-slate-800">
          <Signal className="w-4 h-4" strokeWidth={2.5} />
          <Wifi className="w-4 h-4" strokeWidth={2.5} />
          <Battery className="w-4.5 h-4.5" strokeWidth={2.5} />
        </div>
      </div>

      {/* Conteúdo interno da tela (APENAS ESTA ÁREA ROLA) */}
      <div className="relative flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col">
        {children}

        {/* Notificação Toast flutuante */}
        {toastMessage && (
          <div className="sticky top-2 left-4 right-4 mx-4 z-50 animate-bounce">
            <div className="bg-[#1B2A4A] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white/10">
              <div className="w-2.5 h-2.5 rounded-full bg-[#7FD8E6] shrink-0 animate-ping"></div>
              <p className="text-sm font-semibold leading-tight">{toastMessage}</p>
            </div>
          </div>
        )}
      </div>

      {/* Barra de navegação inferior flutuante */}
      <BottomNav />

      {/* Modais de consentimento e feedback com o mascote */}
      <ConsentBottomSheet />
      <SentSuccessModal />

      {/* Rodapé acadêmico discreto - fixo fora da rolagem, nunca cobre botões */}
      <div className="shrink-0 bg-[#EEF0FA] pt-1 pb-1.5 z-20">
        <AcademicNotice />
        <div className="w-32 h-1 bg-slate-400/60 rounded-full mx-auto mb-1 shrink-0"></div>
      </div>
    </div>
  );
};
