import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Stethoscope, Check, ShieldCheck } from 'lucide-react';

export const ConsentBottomSheet = () => {
  const { 
    isConsentOpen, 
    setIsConsentOpen, 
    sendReportToDoctor, 
    data, 
    calculatePercentage 
  } = useApp();

  const [authorized, setAuthorized] = useState(false);

  if (!isConsentOpen) return null;

  const weeklyTaken = data.weeklyStats.dosesTaken;
  const weeklyTotal = data.weeklyStats.dosesTotal;
  const weeklyPercentage = calculatePercentage(weeklyTaken, weeklyTotal);

  const handleClose = () => {
    setIsConsentOpen(false);
    setAuthorized(false);
  };

  const handleSend = () => {
    sendReportToDoctor();
    setAuthorized(false);
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      {/* Bottom Sheet animado */}
      <div className="relative bg-white rounded-t-[32px] p-5 pb-6 shadow-2xl z-10 animate-in slide-in-from-bottom duration-300 max-h-[92%] overflow-y-auto border-t border-slate-100 flex flex-col">
        {/* Handle */}
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-2.5 shrink-0" />

        {/* Ícone médico em caixa rosa */}
        <div className="w-10 h-10 rounded-2xl bg-pink-100 text-pink-700 flex items-center justify-center mb-2 shrink-0">
          <Stethoscope size={22} strokeWidth={2.2} />
        </div>

        <h3 className="text-xl font-black text-[#1B2A4A] tracking-tight">
          Compartilhar com a Dra. Helena
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Autorização para envio de resumo clínico de adesão.
        </p>

        {/* Lista do que é compartilhado */}
        <div className="bg-[#EEF0FA]/70 rounded-2xl p-3.5 my-3 border border-slate-200/70 space-y-2">
          <p className="text-xs font-black uppercase tracking-wider text-slate-500">
            Dados incluídos no relatório:
          </p>
          <div className="flex items-start gap-2 text-xs sm:text-sm text-[#1B2A4A] font-semibold">
            <Check size={16} className="text-[#00838F] shrink-0 mt-0.5" strokeWidth={2.5} />
            <span><strong>Adesão semanal</strong> ({weeklyTaken} de {weeklyTotal} doses tomadas — {weeklyPercentage}%)</span>
          </div>
          <div className="flex items-start gap-2 text-xs sm:text-sm text-[#1B2A4A] font-semibold">
            <Check size={16} className="text-[#00838F] shrink-0 mt-0.5" strokeWidth={2.5} />
            <span><strong>Horários e confirmações</strong> dos remédios diários</span>
          </div>
          <div className="flex items-start gap-2 text-xs sm:text-sm text-[#1B2A4A] font-semibold">
            <Check size={16} className="text-[#00838F] shrink-0 mt-0.5" strokeWidth={2.5} />
            <span><strong>Doses atrasadas ou esquecidas</strong> para avaliação clínica</span>
          </div>
        </div>

        {/* Aviso legal / LGPD */}
        <div className="bg-[#F3F0FC] border border-[#E4DCF9] rounded-xl p-2.5 flex items-start gap-2 mb-3">
          <ShieldCheck size={16} className="text-[#785EDF] shrink-0 mt-0.5" />
          <p className="text-[11px] sm:text-xs text-[#5D46B8] leading-tight font-semibold">
            Você pode retirar a autorização a qualquer momento nas configurações do aplicativo.
          </p>
        </div>

        {/* Toggle "Autorizo o envio" (começa desligado) */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200 mb-4 shrink-0">
          <div>
            <span className="text-sm font-extrabold text-[#1B2A4A] block">
              Autorizo o envio
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              Concordo em compartilhar os dados acima com minha médica
            </span>
          </div>

          <button
            type="button"
            role="switch"
            aria-label="Autorizo o envio do relatório"
            aria-checked={authorized}
            onClick={() => setAuthorized(!authorized)}
            className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              authorized ? 'bg-gradient-to-r from-[#7FD8E6] to-[#84C5F0]' : 'bg-slate-300'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${
                authorized ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Dois botões em grid de 2 colunas: Cancelar e Enviar relatório */}
        <div className="grid grid-cols-2 gap-3 w-full shrink-0">
          <Button
            variant="secondary"
            onClick={handleClose}
            className="h-[50px] text-base font-bold"
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            disabled={!authorized}
            onClick={handleSend}
            className={`h-[50px] text-base font-extrabold ${
              !authorized ? 'opacity-40 cursor-not-allowed' : ''
            }`}
          >
            Enviar relatório
          </Button>
        </div>
      </div>
    </div>
  );
};

