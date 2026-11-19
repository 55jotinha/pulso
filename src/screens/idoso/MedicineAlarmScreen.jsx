import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { X, Clock, Check, BellRing } from 'lucide-react';
import { ICON_TOKENS, MASCOT_TOKENS } from '../../constants/tokens';

export const MedicineAlarmScreen = () => {
  const { nextMedicine, takeDose, snoozeDose, setCurrentScreen } = useApp();

  const med = nextMedicine || {
    id: 'med-3',
    name: 'Metformina',
    dose: '850 mg',
    category: 'Diabetes',
    time: '12:30',
    instruction: 'Após o almoço, não tomar em jejum'
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-6 pt-3 pb-5 bg-gradient-to-b from-[#E6EBF8] via-[#EEF0FA] to-[#EEF0FA] relative overflow-hidden text-slate-800 min-h-full">
      
      {/* Botão fechar no topo */}
      <div className="flex items-center justify-between z-10 shrink-0">
        <button
          onClick={() => setCurrentScreen('home')}
          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-600 hover:text-[#1B2A4A] shadow-xs active:scale-95 transition-all"
          aria-label="Voltar para o início"
        >
          <X size={22} strokeWidth={2.5} />
        </button>

        <div className="flex items-center gap-1.5 bg-white/90 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#785EDF] shadow-xs border border-purple-100">
          <BellRing size={ICON_TOKENS.minIconSize} className="animate-bounce text-[#785EDF]" />
          <span>Lembrete do Pulso</span>
        </div>
      </div>

      {/* Mascote de ~200-220px com Halos Concêntricos e animação suave de flutuar */}
      <div className="flex flex-col items-center text-center my-auto z-10 py-1">
        <div className="relative flex items-center justify-center mb-1">
          {/* Halo 1 Externo: Lilás de baixa opacidade */}
          <div className="absolute w-64 h-64 rounded-full bg-[#785EDF]/15 blur-2xl animate-pulse-slow"></div>
          
          {/* Halo 2 Interno: Ciano de baixa opacidade */}
          <div className="absolute w-52 h-52 rounded-full bg-[#7FD8E6]/30 blur-xl"></div>
          
          {/* Mascote de ~200-220px com animação suave de flutuar */}
          <div className="relative z-10 w-[200px] h-[200px] flex items-center justify-center animate-float">
            <img
              src="/pulso-mascote.png"
              alt="Mascote Pulso"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        <h1 className="text-[30px] font-black text-[#1B2A4A] tracking-tight leading-tight">
          Hora do <span className="text-[#785EDF]">remédio!</span>
        </h1>
        <p className="text-base text-slate-600 font-medium mt-0.5 max-w-[280px]">
          Olá, Dona Maria! Chegou o momento da sua medicação:
        </p>

        {/* Cartão do Remédio */}
        <div className="w-full mt-3">
          <Card className="text-left border-2 border-white bg-white/95 shadow-[0_12px_32px_rgba(27,42,74,0.08)] p-4.5">
            <div className="flex items-start justify-between mb-1.5">
              <Badge variant={med.category === 'Diabetes' ? 'cyan' : 'purple'} size="md">
                {med.category}
              </Badge>
              <span className="flex items-center gap-1.5 text-sm font-extrabold text-[#785EDF] bg-[#F3F0FC] px-3 py-1 rounded-full whitespace-nowrap">
                <Clock size={16} />
                {med.time}
              </span>
            </div>

            <h2 className="text-2xl font-black text-[#1B2A4A] tracking-tight">
              {med.name}
            </h2>
            <p className="text-lg font-extrabold text-[#785EDF] mt-0.5">
              {med.dose}
            </p>

            <div className="mt-2.5 pt-2.5 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Orientação:
              </p>
              <p className="text-sm font-semibold text-[#1B2A4A] bg-[#F8FAFC] p-2.5 rounded-xl border border-slate-100">
                💧 {med.instruction || 'Tomar com água após o almoço'}
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Botões de Ação - Ambos perfeitamente visíveis */}
      <div className="space-y-2.5 z-10 pt-2 shrink-0">
        <Button
          onClick={() => takeDose(med.id)}
          size="xl"
          icon={Check}
          className="h-[58px] min-h-[58px] text-[20px] font-black shadow-pulso-btn"
        >
          Já tomei
        </Button>

        <Button
          onClick={() => snoozeDose(med.id, 10)}
          variant="secondary"
          size="lg"
          className="h-[50px] min-h-[50px] text-slate-700 font-bold text-base"
        >
          Lembrar em 10 minutos
        </Button>
      </div>
    </div>
  );
};
