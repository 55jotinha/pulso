import React from 'react';
import { useApp } from '../../context/AppContext';
import { Share, PlusSquare, X } from 'lucide-react';
import { Button } from '../common/Button';

export const IOSInstallPrompt = () => {
  const { showIOSPrompt, dismissIOSPrompt } = useApp();

  if (!showIOSPrompt) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-300">
      <div className="bg-white rounded-t-[32px] p-6 pb-8 shadow-2xl border-t border-slate-100 flex flex-col animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#E0F7FA] text-[#00838F] flex items-center justify-center font-bold">
              <img src="/favicon.png" alt="Pulso" className="w-6 h-6 object-contain" />
            </div>
            <div>
              <h3 className="font-extrabold text-[#1B2A4A] text-base leading-tight">
                Instale o Pulso no seu iPhone
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Acesse rápido direto da sua Tela de Início
              </p>
            </div>
          </div>

          <button
            onClick={dismissIOSPrompt}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="bg-[#EEF0FA]/70 rounded-2xl p-4 my-2 border border-slate-200/80 space-y-2.5">
          <div className="flex items-center gap-3 text-sm text-[#1B2A4A] font-semibold">
            <div className="w-7 h-7 rounded-lg bg-white shadow-xs flex items-center justify-center text-blue-600 shrink-0">
              <Share size={18} />
            </div>
            <span>1. Toque no botão <strong>Compartilhar</strong> na barra do Safari</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-[#1B2A4A] font-semibold">
            <div className="w-7 h-7 rounded-lg bg-white shadow-xs flex items-center justify-center text-slate-800 shrink-0">
              <PlusSquare size={18} />
            </div>
            <span>2. Role e selecione <strong>Adicionar à Tela de Início</strong></span>
          </div>
        </div>

        <div className="mt-3">
          <Button
            variant="primary"
            fullWidth={true}
            onClick={dismissIOSPrompt}
            className="h-[48px] text-sm font-black"
          >
            Entendi, obrigado!
          </Button>
        </div>
      </div>
    </div>
  );
};
