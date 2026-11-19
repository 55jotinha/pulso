import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { SearchBar } from '../../components/common/SearchBar';
import { Header } from '../../components/layout/Header';
import { Check, Clock, Flame, ChevronRight } from 'lucide-react';
import { ICON_TOKENS, MASCOT_TOKENS } from '../../constants/tokens';

export const HomeScreen = () => {
  const { data, takeDose, snoozeDose, setCurrentScreen, nextMedicine } = useApp();

  const isNextAlreadyTaken = nextMedicine?.status === 'tomado';

  return (
    <div className="flex-1 flex flex-col pb-28 text-slate-800">
      {/* Header com perfil */}
      <Header />

      <div className="px-5 pt-1 space-y-4">
        {/* Título Principal */}
        <div>
          <h1 className="text-[28px] font-extrabold text-[#1B2A4A] leading-tight tracking-tight">
            <span>Seu dia, </span><span className="text-[#785EDF]">tudo no horário.</span>
          </h1>
          <p className="text-base text-slate-600 mt-1 font-medium">
            Tudo tranquilo por aqui. Veja suas doses de hoje:
          </p>
        </div>

        {/* Campo "Pergunte ao Pulso..." */}
        <SearchBar />

        {/* Card do Próximo Remédio com Mascote de ~96px sobrepondo parcialmente a borda direita */}
        <div className="relative pt-1">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Clock size={ICON_TOKENS.minIconSize} className="text-[#785EDF]" />
              Próximo remédio
            </span>
            <span className="text-sm font-extrabold text-[#785EDF] bg-[#F3F0FC] px-3 py-0.5 rounded-full whitespace-nowrap">
              {nextMedicine.time}
            </span>
          </div>

          <Card className="relative overflow-visible border-2 border-white/90 bg-gradient-to-br from-white via-white to-[#F6F8FD] p-5 shadow-[0_10px_28px_rgba(27,42,74,0.07)]">
            <div className="flex items-start justify-between relative z-10">
              <div className="flex-1 pr-20 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <Badge variant={nextMedicine.category === 'Diabetes' ? 'cyan' : 'purple'} size="sm">
                    {nextMedicine.category}
                  </Badge>
                  <span className="text-sm font-semibold text-slate-500">
                    {nextMedicine.timeSlot}
                  </span>
                </div>

                <h2 className="text-[26px] font-black text-[#1B2A4A] tracking-tight leading-tight">
                  {nextMedicine.name}
                </h2>
                <p className="text-lg font-bold text-[#785EDF] mt-0.5">
                  {nextMedicine.dose}
                </p>

                <p className="text-sm text-slate-600 mt-2 font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-100 inline-block leading-relaxed">
                  👉 {nextMedicine.instruction}
                </p>
              </div>

              {/* Mascote de ~96px parcialmente sobrepondo a borda direita do card */}
              <div
                onClick={() => setCurrentScreen('alarm')}
                className="absolute -right-2 -top-3 cursor-pointer group flex flex-col items-center shrink-0 z-20"
                title="Abrir tela Hora do Remédio"
              >
                <div className={`${MASCOT_TOKENS.homeCardMascot} flex items-center justify-center transform group-hover:scale-105 transition-transform drop-shadow-md`}>
                  <img
                    src="/pulso-mascote.png"
                    alt="Mascote Pulso"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[11px] font-extrabold text-[#785EDF] bg-white/95 px-2 py-0.5 rounded-full shadow-xs border border-purple-100 -mt-2 group-hover:underline">
                  Ver aviso
                </span>
              </div>
            </div>

            {/* Ações: "Já tomei" e "Adiar" */}
            <div className="mt-4 pt-3.5 border-t border-slate-100">
              {isNextAlreadyTaken ? (
                <div className="w-full py-3 bg-emerald-50 text-emerald-800 rounded-2xl font-bold text-center flex items-center justify-center gap-2 border border-emerald-200 text-base">
                  <Check size={ICON_TOKENS.minIconSize} className="text-emerald-600 stroke-[3]" />
                  <span>Dose das {nextMedicine.time} já tomada!</span>
                </div>
              ) : (
                <div className="grid grid-cols-[1fr_auto] gap-2.5 w-full items-center">
                  <Button
                    onClick={() => takeDose(nextMedicine.id)}
                    size="lg"
                    className="w-full"
                    icon={Check}
                  >
                    Já tomei
                  </Button>
                  <Button
                    onClick={() => snoozeDose(nextMedicine.id, 10)}
                    variant="secondary"
                    size="lg"
                    className="w-24 text-slate-700 text-base font-bold shrink-0"
                  >
                    Adiar
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Resumo do Dia (2 de 4 tomados; 7 dias sem esquecer) */}
        <Card className="bg-white p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-extrabold text-lg text-[#1B2A4A] tracking-tight">
                Resumo do seu dia
              </h3>
              <p className="text-base text-slate-600 font-medium">
                {data.user.todayTakenCount} de {data.user.todayTotalCount} remédios tomados hoje
              </p>
            </div>

            {/* Badge de Sequência */}
            <div className="flex items-center gap-1.5 bg-[#FFF7ED] text-[#EA580C] px-3.5 py-1.5 rounded-full border border-[#FED7AA] shadow-xs">
              <Flame size={ICON_TOKENS.minIconSize} className="fill-orange-500 text-orange-500 shrink-0" />
              <span className="text-xs font-black tracking-normal whitespace-nowrap">
                {data.user.streakDays} dias sem esquecer!
              </span>
            </div>
          </div>

          {/* Barra de Progresso Suave */}
          <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden p-0.5 mb-3.5">
            <div
              className="bg-gradient-to-r from-[#7FD8E6] via-[#81D1EC] to-[#785EDF] h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.round((data.user.todayTakenCount / data.user.todayTotalCount) * 100)}%`
              }}
            ></div>
          </div>

          {/* Linha do tempo de doses */}
          <div className="space-y-2.5 pt-1">
            {data.medicines.map((med) => {
              const isTaken = med.status === 'tomado';
              return (
                <div
                  key={med.id}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                    isTaken
                      ? 'bg-emerald-50/50 border-emerald-100 text-slate-800'
                      : med.isNext
                      ? 'bg-blue-50/50 border-blue-200 text-[#1B2A4A]'
                      : 'bg-slate-50/70 border-slate-100 text-slate-600'
                  }`}
                >
                  {/* Ícone de status de 28px à esquerda */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className={`${ICON_TOKENS.statusBox} rounded-full flex items-center justify-center shrink-0 ${
                        isTaken
                          ? 'bg-emerald-500 text-white'
                          : 'border-2 border-slate-300 text-transparent'
                      }`}
                    >
                      <Check size={16} strokeWidth={3.5} />
                    </div>

                    {/* Centro: Linha 1 = Nome e Dose, Linha 2 = "08:00 · Confirmado às 08:05" */}
                    <div className="min-w-0 flex-1 pr-2">
                      <div className="font-extrabold text-base text-[#1B2A4A] truncate">
                        {med.name} {med.dose}
                      </div>
                      <div className="text-xs text-slate-500 font-medium whitespace-nowrap mt-0.5">
                        {med.time} · {isTaken ? (med.takenAt ? `Confirmado às ${med.takenAt.replace('Hoje às ', '')}` : 'Confirmado') : (med.isNext ? 'Aguardando confirmação' : 'Agendado')}
                      </div>
                    </div>
                  </div>

                  {/* Selo de status à direita com largura fixa (w-[84px]) */}
                  <div className="w-[84px] shrink-0 text-center">
                    {isTaken ? (
                      <span className="w-full inline-block text-xs font-bold text-emerald-700 bg-emerald-100/90 py-1 rounded-full border border-emerald-200">
                        Tomado
                      </span>
                    ) : (
                      <span className="w-full inline-block text-xs font-bold text-slate-500 bg-slate-100 py-1 rounded-full border border-slate-200">
                        Pendente
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3.5 text-center">
            <button
              onClick={() => setCurrentScreen('medicines')}
              className="inline-flex items-center text-sm font-bold text-[#785EDF] hover:underline"
            >
              Ver todos os remédios detalhados
              <ChevronRight size={18} className="ml-0.5" />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
