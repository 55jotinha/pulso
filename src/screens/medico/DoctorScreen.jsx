import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/layout/Header';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { FileText, Info, Stethoscope, User } from 'lucide-react';
import { ICON_TOKENS } from '../../constants/tokens';

export const DoctorScreen = () => {
  const { data, showToast, calculatePercentage } = useApp();
  const [selectedPatientId, setSelectedPatientId] = useState('user-maria');

  const selectedPatient = data.doctorPatients.find(p => p.id === selectedPatientId) || data.doctorPatients[0];

  // Cálculo dinâmico das porcentagens a partir das contagens brutas
  const totalTaken = data.weeklyStats.dosesTaken;
  const totalExpected = data.weeklyStats.dosesTotal;
  const totalPercentage = calculatePercentage(totalTaken, totalExpected);
  const totalMissed = totalExpected - totalTaken;

  const handleExportPDF = () => {
    showToast('Download do Relatório Clínico em PDF iniciado.');
  };

  return (
    <div className="flex-1 flex flex-col pb-28 bg-gradient-to-b from-[#FFF5F8] via-[#EEF0FA] to-[#EEF0FA] text-slate-800">
      <Header />

      <div className="px-5 pt-1 space-y-4">
        {/* Cabeçalho do Médico com Caixa de 60px e Ícone de 30px */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-pink-700 bg-pink-100/80 px-2.5 py-0.5 rounded-full border border-pink-200">
              Acesso Clínico Autorizado
            </span>
            <h1 className="text-2xl font-black text-[#1B2A4A] tracking-tight mt-1">
              Painel da <span className="text-pink-600">Dra. Helena</span>
            </h1>
            <p className="text-xs text-slate-500 font-semibold">
              {data.doctorUser.specialty} · CRM {data.doctorUser.crm}
            </p>
          </div>

          <div className={`${ICON_TOKENS.cardBox} rounded-2xl bg-pink-100 text-pink-700 border-2 border-pink-200 shadow-xs flex items-center justify-center shrink-0`}>
            <Stethoscope size={ICON_TOKENS.cardIconSize} strokeWidth={ICON_TOKENS.cardStroke} />
          </div>
        </div>

        {/* Lista de Pacientes Autorizados */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block px-1">
            Pacientes Autorizados ({data.doctorPatients.length})
          </span>

          <div className="space-y-2">
            {data.doctorPatients.map((patient) => {
              const isSelected = patient.id === selectedPatientId;
              const patientAdherence = patient.id === 'user-maria' ? `${totalPercentage}%` : patient.adherenceRate;

              return (
                <div
                  key={patient.id}
                  onClick={() => setSelectedPatientId(patient.id)}
                  className={`p-3.5 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-white border-pink-400 ring-2 ring-pink-300/40 shadow-sm'
                      : 'bg-white/80 border-slate-200/80 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`${ICON_TOKENS.actionBox} rounded-xl bg-pink-50 text-pink-700 flex items-center justify-center shrink-0 border border-pink-200`}>
                        <User size={ICON_TOKENS.actionIconSize} strokeWidth={2.2} />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-[#1B2A4A]">
                          {patient.name} ({patient.age} anos)
                        </h4>
                        <p className="text-xs text-slate-500">
                          {patient.condition}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black text-pink-700 bg-pink-50 border border-pink-200 px-2.5 py-0.5 rounded-full">
                        {patientAdherence} adesão
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Relatório Semanal da Dona Maria - NÚMEROS CALCULADOS */}
        <Card className="bg-white border border-pink-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <FileText size={ICON_TOKENS.minIconSize} className="text-pink-600" />
              <h3 className="font-extrabold text-sm text-[#1B2A4A]">
                Relatório Semanal de Adesão
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              Últimos 7 dias
            </span>
          </div>

          {/* Doses Tomadas x Esquecidas */}
          <div className="grid grid-cols-2 gap-2 mb-3.5">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-2.5 text-center">
              <span className="text-[11px] font-bold text-emerald-800 uppercase block">
                Doses Tomadas
              </span>
              <span className="text-xl font-black text-emerald-700">
                {totalTaken} / {totalExpected}
              </span>
              <span className="text-[10px] text-emerald-600 block mt-0.5 font-bold">
                {totalPercentage}% de cumprimento
              </span>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-2.5 text-center">
              <span className="text-[11px] font-bold text-amber-800 uppercase block">
                Doses Atrasadas / Esquecidas
              </span>
              <span className="text-xl font-black text-amber-700">
                {totalMissed}
              </span>
              <span className="text-[10px] text-amber-800 block mt-0.5 font-medium leading-tight">
                {totalMissed > 0 
                  ? '1 Losartana (quinta à noite) e 1 Metformina (terça ao meio-dia)'
                  : 'Nenhuma dose pendente'}
              </span>
            </div>
          </div>

          {/* Adesão por Remédio (Cálculo Dinâmico por Item) */}
          <div>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">
              Adesão por Medicamento (Calculada)
            </span>

            <div className="space-y-2.5">
              {data.weeklyStats.adherenceByMed.map((med) => {
                const medPercentage = calculatePercentage(med.taken, med.total);
                return (
                  <div key={med.id || med.name} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-[#1B2A4A]">{med.name}</span>
                      <span className="text-pink-700">
                        {med.taken}/{med.total} ({medPercentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-pink-400 to-[#785EDF] h-full rounded-full transition-all duration-300"
                        style={{ width: `${medPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Última dose confirmada pela paciente */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 text-xs">
            <span className="font-semibold text-slate-500">Última confirmação: </span>
            <span className="font-bold text-[#1B2A4A]">{selectedPatient.lastConfirmedDose}</span>
          </div>
        </Card>

        {/* NOTA OBRIGATÓRIA CLÍNICA */}
        <div className="bg-pink-50/90 border border-pink-200 rounded-2xl p-3 flex items-start gap-2.5">
          <Info size={ICON_TOKENS.minIconSize} className="text-pink-700 shrink-0 mt-0.5" />
          <p className="text-xs text-pink-900 leading-snug font-medium">
            <strong>Aviso Clínico:</strong> Dados informados pela paciente. Não substituem avaliação clínica.
          </p>
        </div>

        {/* Botão de Exportar */}
        <div className="pt-1">
          <Button
            onClick={handleExportPDF}
            variant="pink"
            size="lg"
            icon={FileText}
          >
            Exportar Relatório Clínico (PDF)
          </Button>
        </div>
      </div>
    </div>
  );
};
