import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/layout/Header';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Phone, Clock, AlertTriangle, CheckCircle2, Calendar, MessageSquare, Check, User, BellOff } from 'lucide-react';
import { ICON_TOKENS } from '../../constants/tokens';

export const CaregiverScreen = () => {
  const { data, showToast, calculatePercentage } = useApp();

  const anaCaregiver = data.caregivers?.find(c => c.id === 'c1');
  const isAnaActive = anaCaregiver ? anaCaregiver.active : true;

  // Verificar se há remédio pendente na hora do almoço (Metformina)
  const metformina = data.medicines.find(m => m.id === 'med-3');
  const isMetforminaTaken = metformina?.status === 'tomado';

  const weeklyPercentage = calculatePercentage(data.weeklyStats.dosesTaken, data.weeklyStats.dosesTotal);

  const handleCall = () => {
    showToast(`Ligando para Dona Maria: ${data.user.phone}...`);
  };

  const handleSendLovingReminder = () => {
    showToast('Lembrete carinhoso enviado para a tela da Dona Maria!');
  };

  return (
    <div className="flex-1 flex flex-col pb-28 text-slate-800">
      <Header />

      <div className="px-5 pt-1 space-y-4">
        {/* Cabeçalho do Painel da Filha com Caixa de 60px e Ícone de 30px */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Acompanhamento Familiar
            </span>
            <h1 className="text-2xl font-black text-[#1B2A4A] tracking-tight">
              Dona Maria <span className="text-[#785EDF]">hoje</span>
            </h1>
          </div>

          <div className={`${ICON_TOKENS.cardBox} rounded-2xl bg-[#E0F7FA] text-[#00838F] border-2 border-[#B2EBF2] shadow-xs flex items-center justify-center shrink-0`}>
            <User size={ICON_TOKENS.cardIconSize} strokeWidth={ICON_TOKENS.cardStroke} />
          </div>
        </div>

        {/* Banner se avisos estiverem desativados pela Dona Maria */}
        {!isAnaActive && (
          <div className="bg-slate-100 border-2 border-slate-300 rounded-3xl p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-600 flex items-center justify-center shrink-0">
              <BellOff size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-extrabold text-sm text-[#1B2A4A]">Você não recebe mais avisos da Dona Maria</h4>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">Os avisos automáticos de atraso foram pausados no perfil da paciente.</p>
            </div>
          </div>
        )}

        {/* Alerta de Atraso ou Status Positivo em Tempo Real (Sincronizado) */}
        {!isMetforminaTaken ? (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-4.5 shadow-sm">
            <div className="flex items-start gap-3.5">
              <div className={`${ICON_TOKENS.actionBox} rounded-2xl bg-amber-200/80 text-amber-800 flex items-center justify-center shrink-0 mt-0.5`}>
                <AlertTriangle size={ICON_TOKENS.actionIconSize} strokeWidth={2.5} className="text-amber-700" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-800">
                    Aviso em Tempo Real
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
                </div>
                <h3 className="font-extrabold text-base text-[#1B2A4A] mt-0.5">
                  Sem confirmação há 30 min
                </h3>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  A dose de <strong className="text-[#1B2A4A]">Metformina 850 mg (12:30)</strong> ainda não foi confirmada por Dona Maria.
                </p>

                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={handleCall}
                    className="flex items-center gap-1.5 bg-[#1B2A4A] text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs hover:bg-slate-800 active:scale-95"
                  >
                    <Phone size={16} />
                    <span>Ligar agora</span>
                  </button>
                  <button
                    onClick={handleSendLovingReminder}
                    className="flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-200/70 hover:bg-amber-200 px-3 py-2 rounded-xl active:scale-95"
                  >
                    <MessageSquare size={16} />
                    <span>Mandar lembrete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-3xl p-4.5 shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className={`${ICON_TOKENS.actionBox} rounded-2xl bg-emerald-200 text-emerald-800 flex items-center justify-center shrink-0`}>
                <CheckCircle2 size={ICON_TOKENS.actionIconSize} strokeWidth={2.5} className="text-emerald-700" />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
                  Tudo no Horário!
                </span>
                <h3 className="font-extrabold text-base text-[#1B2A4A]">
                  Dona Maria tomou a Metformina às 12:30
                </h3>
                <p className="text-sm text-slate-600 mt-0.5">
                  Confirmação recebida e sincronizada em tempo real.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Linha do Tempo de Doses (Hoje):
            Ícones de status de 28px; no centro 1ª linha nome, 2ª linha horário */}
        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Clock size={ICON_TOKENS.minIconSize} className="text-[#785EDF]" />
              Linha do Tempo de Doses (Hoje)
            </span>
            <span className="text-xs font-bold text-slate-600">
              {data.user.todayTakenCount} de {data.user.todayTotalCount} concluídas
            </span>
          </div>

          <div className="space-y-2.5">
            {data.medicines.map((med) => {
              const isTaken = med.status === 'tomado';
              const isDelayed = !isTaken && med.id === 'med-3';

              return (
                <Card key={med.id} className="p-3.5 bg-white">
                  <div className="flex items-center justify-between">
                    {/* Ícone de status de 28px */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div
                        className={`${ICON_TOKENS.statusBox} rounded-xl flex items-center justify-center shrink-0 font-bold ${
                          isTaken
                            ? 'bg-emerald-100 text-emerald-700'
                            : isDelayed
                            ? 'bg-amber-100 text-amber-700 animate-pulse'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {isTaken ? <Check size={16} strokeWidth={3} /> : '⏰'}
                      </div>

                      <div className="min-w-0 flex-1 pr-2">
                        <div className="font-extrabold text-sm text-[#1B2A4A] truncate">
                          {med.name} {med.dose}
                        </div>
                        <div className="text-xs text-slate-500 font-medium whitespace-nowrap mt-0.5">
                          {med.time} · {isTaken ? (med.takenAt ? `Confirmado às ${med.takenAt.replace('Hoje às ', '')}` : 'Confirmado') : isDelayed ? 'Aguardando confirmação' : 'Agendado'}
                        </div>
                      </div>
                    </div>

                    <div className="w-[84px] shrink-0 text-center">
                      {isTaken ? (
                        <span className="w-full inline-block text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 py-1 rounded-full">
                          Tomada
                        </span>
                      ) : isDelayed ? (
                        <span className="w-full inline-block text-xs font-black text-amber-700 bg-amber-50 border border-amber-300 py-1 rounded-full">
                          Atrasada
                        </span>
                      ) : (
                        <span className="w-full inline-block text-xs font-bold text-slate-500 bg-slate-100 py-1 rounded-full border border-slate-200">
                          Pendente
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Histórico da Semana */}
        <Card className="bg-white p-4">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <Calendar size={ICON_TOKENS.minIconSize} className="text-indigo-500" />
              <h3 className="font-extrabold text-sm text-[#1B2A4A]">
                Histórico da Semana
              </h3>
            </div>
            <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
              {weeklyPercentage}% de adesão
            </span>
          </div>

          <p className="text-xs text-slate-500 mb-3">
            Dona Maria tomou {data.weeklyStats.dosesTaken} das {data.weeklyStats.dosesTotal} doses previstas nesta semana.
          </p>

          <div className="grid grid-cols-7 gap-1.5 text-center">
            {data.weeklyStats.days.map((d, i) => (
              <div key={i} className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 block">{d.day}</span>
                <span className={`text-xs font-black mt-1 block ${d.status === 'complete' ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {d.taken}/{d.total}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Botão de Ação Rápida */}
        <div className="pt-1">
          <Button
            onClick={handleCall}
            size="lg"
            icon={Phone}
            variant="secondary"
            className="text-indigo-900 border-indigo-200 hover:bg-indigo-50/50 text-sm font-bold h-[52px]"
          >
            Ligar para a Dona Maria ({data.user.phone})
          </Button>
        </div>
      </div>
    </div>
  );
};
