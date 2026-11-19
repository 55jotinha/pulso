import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Flame, CheckCircle, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { ICON_TOKENS, MASCOT_TOKENS } from '../../constants/tokens';

export const ConfirmationScreen = () => {
  const { setCurrentScreen, lastConfirmedMed, data } = useApp();

  const medName = lastConfirmedMed?.name || 'Metformina';
  const medDose = lastConfirmedMed?.dose || '850 mg';
  const takenAt = lastConfirmedMed?.takenAt || 'Hoje às 12:30';

  // Buscar próximo remédio pendente
  const nextPending = data.medicines.find(m => m.status === 'pendente') || {
    name: 'Losartana',
    dose: '50 mg',
    time: '19:30'
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-6 pt-5 pb-8 bg-gradient-to-b from-[#EBF6FB] via-[#EEF0FA] to-[#EEF0FA] text-center text-slate-800">
      
      {/* Mascote de ~220px e Confirmação de Sucesso */}
      <div className="my-auto flex flex-col items-center">
        <div className="relative mb-2 flex items-center justify-center">
          <div className="absolute w-64 h-64 bg-[#7FD8E6]/30 rounded-full blur-2xl animate-pulse-slow"></div>
          <div className={`${MASCOT_TOKENS.alarmMascot} relative z-10 flex items-center justify-center animate-float`}>
            <img
              src="/pulso-mascote.png"
              alt="Mascote Pulso Comemorando"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-sm font-black mb-2 border border-emerald-300">
          <CheckCircle size={ICON_TOKENS.minIconSize} className="text-emerald-600" />
          <span>Dose Confirmada com Sucesso!</span>
        </div>

        <h1 className="text-[32px] font-black text-[#1B2A4A] tracking-tight leading-tight">
          Muito bem, <span className="text-[#785EDF]">Dona Maria!</span>
        </h1>
        <p className="text-base font-semibold text-slate-600 mt-1">
          {medName} {medDose} · {takenAt}
        </p>

        {/* Card de Conquista / 7 Dias Sem Esquecer */}
        <div className="w-full mt-4 space-y-3">
          <Card className="bg-gradient-to-br from-white to-[#FFFBEB] border border-amber-200/80 shadow-md p-4.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-left">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
                  <Flame size={26} className="text-amber-500 fill-amber-500" />
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Sequência Ativa</span>
                  <h3 className="text-lg font-black text-[#1B2A4A] leading-tight">
                    {data.user.streakDays} dias sem esquecer!
                  </h3>
                </div>
              </div>
              <Sparkles size={24} className="text-amber-400 shrink-0" />
            </div>
            <p className="text-sm text-slate-600 text-left mt-2.5 pt-2.5 border-t border-amber-100 font-medium">
              Você está mantendo sua saúde em dia. Sua filha Ana já recebeu a notificação!
            </p>
          </Card>

          {/* Próximo Lembrete */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between text-left">
            <div className="flex items-center gap-3">
              <div className={`${ICON_TOKENS.actionBox} rounded-xl bg-[#F3F0FC] text-[#785EDF] flex items-center justify-center shrink-0`}>
                <Clock size={ICON_TOKENS.actionIconSize} />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Próximo lembrete de hoje
                </span>
                <span className="font-extrabold text-base text-[#1B2A4A]">
                  {nextPending.name} {nextPending.dose} · {nextPending.time}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botão de Retorno */}
      <div className="pt-3 w-full flex flex-col items-stretch">
        <Button
          onClick={() => setCurrentScreen('home')}
          size="xl"
          fullWidth={true}
          icon={ArrowRight}
          className="h-[60px] min-h-[60px] text-[20px] font-bold w-full"
        >
          Voltar ao início
        </Button>
      </div>
    </div>
  );
};
