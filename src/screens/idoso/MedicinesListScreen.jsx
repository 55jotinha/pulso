import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/layout/Header';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Camera, Plus, Check, ChevronRight, Pill } from 'lucide-react';
import { ICON_TOKENS } from '../../constants/tokens';

export const MedicinesListScreen = () => {
  const { data, takeDose, setCurrentScreen } = useApp();
  const [filter, setFilter] = useState('Todos'); // 'Todos' | 'Manhã' | 'Tarde' | 'Noite'

  const filters = ['Todos', 'Manhã', 'Tarde', 'Noite'];

  const filteredMeds = data.medicines.filter((m) => {
    if (filter === 'Todos') return true;
    return m.timeSlot === filter;
  });

  const nextMed = data.medicines.find((m) => m.status === 'pendente' && m.isNext);

  return (
    <div className="flex-1 flex flex-col pb-28 text-slate-800">
      <Header
        title="Meus Remédios"
        rightAction={
          <button
            onClick={() => setCurrentScreen('add-medicine')}
            className="flex items-center gap-1.5 text-xs font-bold text-[#785EDF] bg-[#F3F0FC] hover:bg-[#EBE5FB] px-3.5 py-1.5 rounded-full transition-colors"
          >
            <Plus size={18} />
            <span>Novo</span>
          </button>
        }
      />

      <div className="px-5 pt-1 space-y-4">
        {/* Banner com Atalho de Câmera: caixa de 48px com ícone de 24px */}
        <div
          onClick={() => setCurrentScreen('add-medicine')}
          className="bg-gradient-to-r from-[#7FD8E6]/25 via-[#84C5F0]/20 to-[#785EDF]/15 border border-[#7FD8E6]/60 rounded-3xl p-4 cursor-pointer hover:shadow-md transition-all active:scale-[0.99] flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className={`${ICON_TOKENS.actionBox} rounded-2xl bg-white flex items-center justify-center text-[#785EDF] shadow-sm shrink-0`}>
              <Camera size={ICON_TOKENS.actionIconSize} strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#1B2A4A] leading-tight">
                Adicionar pela câmera
              </h3>
              <p className="text-sm text-slate-600 mt-0.5 font-medium">
                Aponte para a caixa da sua medicação
              </p>
            </div>
          </div>
          <ChevronRight size={24} className="text-slate-400 shrink-0" />
        </div>

        {/* Filtros em Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2.5 rounded-full text-sm font-extrabold transition-all shrink-0 select-none ${
                filter === f
                  ? 'bg-[#785EDF] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Seção Próximo Destaque */}
        {nextMed && (
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block px-1">
              Próximo do dia
            </span>
            <Card className="border-2 border-[#785EDF]/30 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h4 className="text-xl font-extrabold text-[#1B2A4A]">{nextMed.name}</h4>
                    <Badge variant="purple" size="sm">{nextMed.category}</Badge>
                  </div>
                  <p className="text-base font-bold text-[#785EDF]">
                    {nextMed.dose} · Horário: {nextMed.time} ({nextMed.timeSlot})
                  </p>
                  <p className="text-sm text-slate-600 mt-1 font-medium">
                    {nextMed.instruction}
                  </p>
                </div>

                {/* Selo no topo direito dentro do padding */}
                <div className="w-[88px] shrink-0 text-center">
                  <span className="w-full inline-block text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 py-1 rounded-full">
                    Pendente
                  </span>
                </div>
              </div>

              <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-end">
                <button
                  onClick={() => takeDose(nextMed.id)}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1B2A4A] bg-gradient-to-r from-[#7FD8E6] to-[#84C5F0] px-4 py-2 rounded-xl shadow-xs hover:brightness-105 active:scale-95"
                >
                  <Check size={18} strokeWidth={2.5} />
                  <span>Tomar agora</span>
                </button>
              </div>
            </Card>
          </div>
        )}

        {/* Lista completa de Remédios:
            Ícone em card de lista: caixa arredondada de 60px com ícone de 30px (stroke 2).
            linha 1 = nome + etiqueta com flex-wrap;
            linha 2 = dose e horário;
            linha 3 = orientação;
            selo de status no topo direito do card. */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block px-1">
            Todos os Remédios Cadastrados ({filteredMeds.length})
          </span>

          {filteredMeds.map((med) => {
            const isTaken = med.status === 'tomado';
            return (
              <Card key={med.id} className="p-4 bg-white relative">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    {/* Caixa arredondada de 60px com ícone de 30px (stroke 2) */}
                    <div
                      className={`${ICON_TOKENS.cardBox} rounded-2xl flex items-center justify-center shrink-0 ${
                        isTaken
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                          : 'bg-[#F3F0FC] text-[#785EDF] border border-purple-200'
                      }`}
                    >
                      <Pill size={ICON_TOKENS.cardIconSize} strokeWidth={ICON_TOKENS.cardStroke} />
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Linha 1 = Nome + Etiqueta com flex-wrap */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-extrabold text-[18px] text-[#1B2A4A]">
                          {med.name}
                        </h4>
                        <Badge
                          variant={med.category === 'Diabetes' ? 'cyan' : med.category === 'Pressão' ? 'purple' : 'default'}
                          size="sm"
                        >
                          {med.category}
                        </Badge>
                      </div>

                      {/* Linha 2 = Dose e Horário */}
                      <p className="text-base font-bold text-slate-600 mt-1 whitespace-nowrap">
                        {med.dose} · {med.time} ({med.timeSlot})
                      </p>

                      {/* Linha 3 = Orientação */}
                      <p className="text-sm text-slate-500 mt-1 font-medium">
                        {med.instruction}
                      </p>
                    </div>
                  </div>

                  {/* Selo de status no topo direito do card, dentro do padding */}
                  <div className="w-[88px] shrink-0 text-center">
                    {isTaken ? (
                      <span className="w-full inline-flex items-center justify-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100/90 py-1.5 rounded-full border border-emerald-200">
                        <Check size={16} strokeWidth={3} />
                        Tomado
                      </span>
                    ) : (
                      <button
                        onClick={() => takeDose(med.id)}
                        className="w-full text-xs font-bold text-[#1B2A4A] bg-[#7FD8E6] hover:bg-[#72cbdb] py-2 rounded-xl transition-all shadow-xs active:scale-95"
                      >
                        Tomar
                      </button>
                    )}
                  </div>
                </div>

                {isTaken && med.takenAt && (
                  <div className="mt-2.5 pt-2 border-t border-slate-100 text-xs text-slate-500 font-medium">
                    ✓ Confirmado: {med.takenAt}
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Botão para cadastrar */}
        <div className="pt-2">
          <Button
            onClick={() => setCurrentScreen('add-medicine')}
            variant="secondary"
            size="lg"
            icon={Plus}
          >
            Cadastrar outro remédio
          </Button>
        </div>
      </div>
    </div>
  );
};
