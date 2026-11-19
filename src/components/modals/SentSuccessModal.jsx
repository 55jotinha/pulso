import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';

export const SentSuccessModal = () => {
  const { sentSuccessModal, setSentSuccessModal } = useApp();

  if (!sentSuccessModal) return null;

  return (
    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-[340px] text-center flex flex-col items-center">
        <div className="relative mb-3">
          <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-[#7FD8E6]/40 to-[#785EDF]/20 blur-md animate-pulse" />
          <img
            src="/pulso-mascote.png"
            alt="Mascote Pulso"
            className="w-24 h-24 object-contain relative z-10 animate-bounce"
            style={{ animationDuration: '2s' }}
          />
        </div>

        <h3 className="text-xl font-black text-[#1B2A4A] mt-2">
          Relatório enviado à Dra. Helena
        </h3>
        <p className="text-sm text-slate-600 mt-2 font-medium leading-relaxed">
          Os dados de adesão semanal e horários foram compartilhados com segurança com o consultório.
        </p>

        <div className="mt-5 w-full">
          <Button
            variant="primary"
            fullWidth={true}
            onClick={() => setSentSuccessModal(false)}
            className="h-[52px] text-base font-black"
          >
            Entendi, obrigado!
          </Button>
        </div>
      </div>
    </div>
  );
};

