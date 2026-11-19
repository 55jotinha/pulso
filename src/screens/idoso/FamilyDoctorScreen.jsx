import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/layout/Header';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { 
  Users, 
  Stethoscope, 
  Check, 
  Phone, 
  Share2, 
  ShieldCheck, 
  AlertTriangle, 
  BellOff, 
  Info, 
  User, 
  FileText,
  Clock
} from 'lucide-react';
import { ICON_TOKENS } from '../../constants/tokens';

// Componente para o Marcador em forma de Gota dos dias da semana
const DropletDayMarker = ({ day, status, dayFull }) => {
  const isMissed = status === 'missed';
  const textFill = isMissed ? '#BE185D' : '#006064';

  return (
    <div className="flex flex-col items-center">
      {/* Gota SVG */}
      <svg
        viewBox="0 0 34 42"
        className="w-[34px] h-[42px] transition-transform duration-200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={`${dayFull}: ${isMissed ? 'Dose esquecida' : 'Doses completas'}`}
      >
        <path
          d="M17 2.5C17 2.5 3.5 18.5 3.5 28C3.5 35.4558 9.54416 41.5 17 41.5C24.4558 41.5 30.5 35.4558 30.5 28C30.5 18.5 17 2.5 17 2.5Z"
          className={isMissed ? 'fill-pink-100 stroke-pink-300' : 'fill-[#E0F7FA] stroke-[#80DEEA]'}
          strokeWidth="1.5"
        />
        <text
          x="17"
          y="29"
          textAnchor="middle"
          fill={textFill}
          fontSize="13"
          fontWeight="800"
          className="select-none font-sans"
        >
          {day}
        </text>
      </svg>

      {/* Check sob o marcador para dias normais; quinta (quarto marcador) sem check */}
      <div className="h-5 flex items-center justify-center mt-1">
        {!isMissed ? (
          <Check size={16} strokeWidth={3} className="text-[#00838F]" />
        ) : (
          <span className="w-4 h-4 inline-block" />
        )}
      </div>
    </div>
  );
};

// Switch de toggle reutilizável
const ToggleSwitch = ({ checked, onChange, disabled = false, ariaLabel = "Alternar aviso" }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-label={ariaLabel}
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className={`relative inline-flex h-8 w-14 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${
        checked
          ? 'bg-gradient-to-r from-[#7FD8E6] to-[#84C5F0]'
          : 'bg-slate-200'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${
          checked ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

export const FamilyDoctorScreen = () => {
  const { 
    data, 
    activeProfile, 
    toggleCaregiver, 
    cycleCaregiverAlert,
    isConsentOpen, 
    setIsConsentOpen,
    sentSuccessModal,
    setSentSuccessModal,
    sendReportToDoctor,
    calculatePercentage,
    showToast
  } = useApp();

  const [authorizedConsent, setAuthorizedConsent] = useState(false);

  // Cuidadores
  const caregivers = data.caregivers || [];
  const c1 = caregivers.find(c => c.id === 'c1') || caregivers[0];
  const c2 = caregivers.find(c => c.id === 'c2') || caregivers[1];

  const activeCaregiversCount = caregivers.filter(c => c.active).length;
  const weeklyTaken = data.weeklyStats.dosesTaken;
  const weeklyTotal = data.weeklyStats.dosesTotal;
  const weeklyPercentage = calculatePercentage(weeklyTaken, weeklyTotal);

  // ----------------------------------------------------
  // VISÃO 1: DONA MARIA (IDOSO)
  // ----------------------------------------------------
  if (activeProfile === 'idoso') {
    return (
      <div className="flex-1 flex flex-col pb-28 text-slate-800 relative">
        <Header />

        <div className="px-5 pt-1 space-y-4">
          {/* Título: "Família" em azul-marinho e "e médico" em roxo */}
          <div>
            <h1 className="text-[32px] font-black text-[#1B2A4A] tracking-tight leading-tight">
              Família
            </h1>
            <h2 className="text-[32px] font-black text-[#785EDF] tracking-tight leading-tight">
              e médico
            </h2>
          </div>

          {/* Seção Responsáveis com selo lilás "2 de 2" */}
          <div>
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Responsáveis
              </span>
              <span className="text-xs font-black text-[#785EDF] bg-[#F3F0FC] border border-[#E4DCF9] px-2.5 py-0.5 rounded-full">
                {activeCaregiversCount} de 2
              </span>
            </div>

            <div className="space-y-3">
              {/* Card Ana · filha */}
              {c1 && (
                <Card className="p-4 bg-white shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Avatar circular com a inicial "A" (lilás) */}
                      <div
                        className={`${ICON_TOKENS.cardBox} rounded-2xl flex items-center justify-center font-black text-2xl shrink-0 transition-all duration-200 ${
                          c1.active
                            ? 'bg-[#EBE7FC] text-[#785EDF] border-2 border-[#D9D1F7]'
                            : 'bg-slate-100 text-slate-400 border-2 border-slate-200 opacity-60'
                        }`}
                      >
                        {c1.initialLetter || 'A'}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="font-extrabold text-[18px] text-[#1B2A4A]">
                            {c1.name}
                          </h4>
                          <span className="text-sm font-bold text-slate-400">
                            · {c1.relation}
                          </span>
                        </div>
                        {c1.active ? (
                          <button
                            type="button"
                            onClick={() => cycleCaregiverAlert(c1.id)}
                            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#785EDF] transition-colors mt-0.5 text-left group whitespace-nowrap"
                            title="Toque para alternar o tempo de aviso (15, 30 ou 60 min)"
                          >
                            <span>Avisa após <strong>{c1.alertMinutes || 30} min</strong></span>
                            <span className="text-[10px] text-slate-400 group-hover:text-[#785EDF] font-bold bg-slate-100 group-hover:bg-[#F3F0FC] px-1 py-0.2 rounded transition-colors">
                              ↻
                            </span>
                          </button>
                        ) : (
                          <span className="text-xs sm:text-sm font-semibold text-slate-400 mt-0.5 block whitespace-nowrap">
                            Avisos desativados
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Toggle ciano à direita */}
                    <ToggleSwitch
                      checked={c1.active}
                      onChange={() => toggleCaregiver(c1.id)}
                      ariaLabel="Ativar avisos para Ana"
                    />
                  </div>
                </Card>
              )}

              {/* Card Pedro · neto */}
              {c2 && (
                <Card className="p-4 bg-white shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Avatar com a inicial "P" (verde-água) */}
                      <div
                        className={`${ICON_TOKENS.cardBox} rounded-2xl flex items-center justify-center font-black text-2xl shrink-0 transition-all duration-200 ${
                          c2.active
                            ? 'bg-[#E0F7FA] text-[#00838F] border-2 border-[#B2EBF2]'
                            : 'bg-slate-100 text-slate-400 border-2 border-slate-200 opacity-60'
                        }`}
                      >
                        {c2.initialLetter || 'P'}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="font-extrabold text-[18px] text-[#1B2A4A]">
                            {c2.name}
                          </h4>
                          <span className="text-sm font-bold text-slate-400">
                            · {c2.relation}
                          </span>
                        </div>
                        {c2.active ? (
                          <button
                            type="button"
                            onClick={() => cycleCaregiverAlert(c2.id)}
                            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#785EDF] transition-colors mt-0.5 text-left group whitespace-nowrap"
                            title="Toque para alternar o tempo de aviso (15, 30 ou 60 min)"
                          >
                            <span>Avisa após <strong>{c2.alertMinutes || 30} min</strong></span>
                            <span className="text-[10px] text-slate-400 group-hover:text-[#785EDF] font-bold bg-slate-100 group-hover:bg-[#F3F0FC] px-1 py-0.2 rounded transition-colors">
                              ↻
                            </span>
                          </button>
                        ) : (
                          <span className="text-xs sm:text-sm font-semibold text-slate-400 mt-0.5 block whitespace-nowrap">
                            Avisos desativados
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Toggle ciano à direita */}
                    <ToggleSwitch
                      checked={c2.active}
                      onChange={() => toggleCaregiver(c2.id)}
                      ariaLabel="Ativar avisos para Pedro"
                    />
                  </div>
                </Card>
              )}
            </div>

            {/* Legenda pequena centralizada abaixo dos dois */}
            <p className="text-xs text-slate-400 font-semibold text-center mt-2.5">
              Limite de 2 responsáveis por idoso
            </p>
          </div>

          {/* Card Dra. Helena (exclusivo rosa do médico) */}
          <Card className="bg-gradient-to-br from-[#FFF5F8] to-white border-2 border-pink-200/90 shadow-sm p-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`${ICON_TOKENS.cardBox} rounded-2xl bg-pink-100 text-pink-700 border border-pink-200 shrink-0 flex items-center justify-center`}>
                  <Stethoscope size={ICON_TOKENS.cardIconSize} strokeWidth={ICON_TOKENS.cardStroke} />
                </div>
                <div className="min-w-0">
                  <h4 className="font-extrabold text-[18px] text-[#1B2A4A]">
                    Dra. Helena
                  </h4>
                  <p className="text-xs sm:text-sm font-bold text-pink-700 mt-0.5">
                    Cardiologista · relatório semanal
                  </p>
                </div>
              </div>

              <span className="text-xs font-black text-pink-700 bg-pink-50 border border-pink-200 px-2.5 py-1 rounded-full shrink-0">
                Autorizado
              </span>
            </div>
          </Card>

          {/* Card "Esta semana" com gotas estilizadas */}
          <Card className="bg-white p-4.5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="font-black text-base text-[#1B2A4A]">
                Esta semana
              </h3>
              <span className="font-extrabold text-sm text-[#785EDF]">
                {weeklyTaken} de {weeklyTotal} doses
              </span>
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {data.weeklyStats.days.map((dayItem, idx) => (
                <DropletDayMarker
                  key={idx}
                  day={dayItem.day}
                  status={dayItem.status}
                  dayFull={dayItem.dayFull}
                />
              ))}
            </div>
          </Card>

          {/* Botão principal "Enviar relatório ao médico" em largura total com degradê ciano */}
          <div className="pt-1">
            <Button
              variant="primary"
              size="lg"
              fullWidth={true}
              onClick={() => setIsConsentOpen(true)}
              icon={Share2}
              className="h-[56px] text-lg font-black"
            >
              Enviar relatório ao médico
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // VISÃO 2: ANA (CUIDADOR / RESPONSÁVEL)
  // ----------------------------------------------------
  if (activeProfile === 'responsavel') {
    const isAnaActive = c1?.active ?? true;

    return (
      <div className="flex-1 flex flex-col pb-28 text-slate-800">
        <Header />

        <div className="px-5 pt-1 space-y-4">
          {/* Título: "Rede" em azul-marinho e "de apoio" em roxo */}
          <div>
            <h1 className="text-[32px] font-black text-[#1B2A4A] tracking-tight leading-tight">
              Rede
            </h1>
            <h2 className="text-[32px] font-black text-[#785EDF] tracking-tight leading-tight">
              de apoio
            </h2>
          </div>

          {/* Aviso compartilhado se a Dona Maria desligou os avisos da Ana */}
          {!isAnaActive && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-4 shadow-sm flex items-start gap-3">
              <BellOff size={22} className="text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-sm text-[#1B2A4A]">
                  Você não recebe mais avisos da Dona Maria
                </h4>
                <p className="text-xs text-slate-600 mt-0.5 font-medium leading-relaxed">
                  Os avisos automáticos de atraso foram pausados no perfil da paciente. Você pode reativar o seu alerta abaixo.
                </p>
              </div>
            </div>
          )}

          {/* Lista de pessoas da rede de apoio */}
          <div>
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Pessoas de Apoio
              </span>
              <span className="text-xs font-bold text-slate-400">
                Acompanhamento familiar
              </span>
            </div>

            <div className="space-y-3">
              {/* Card da própria Ana (com toggle do seu aviso) */}
              {c1 && (
                <Card className="p-4 bg-white shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`${ICON_TOKENS.cardBox} rounded-2xl flex items-center justify-center font-black text-2xl shrink-0 transition-all duration-200 ${
                          c1.active
                            ? 'bg-[#EBE7FC] text-[#785EDF] border-2 border-[#D9D1F7]'
                            : 'bg-slate-100 text-slate-400 border-2 border-slate-200 opacity-60'
                        }`}
                      >
                        {c1.initialLetter || 'A'}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="font-extrabold text-[18px] text-[#1B2A4A]">
                            {c1.name} (Você)
                          </h4>
                          <span className="text-sm font-bold text-slate-400">
                            · {c1.relation}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-500 mt-0.5">
                          {c1.active ? `Avisa após ${c1.alertMinutes || 30} min` : 'Avisos desativados'}
                        </p>
                      </div>
                    </div>

                    <ToggleSwitch
                      checked={c1.active}
                      onChange={() => toggleCaregiver(c1.id)}
                      ariaLabel="Alternar meu aviso de atraso"
                    />
                  </div>
                </Card>
              )}

              {/* Card Pedro (apenas leitura para Ana) */}
              {c2 && (
                <Card className="p-4 bg-white/90 shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`${ICON_TOKENS.cardBox} rounded-2xl bg-[#E0F7FA] text-[#00838F] border-2 border-[#B2EBF2] flex items-center justify-center font-black text-2xl shrink-0`}>
                        {c2.initialLetter || 'P'}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="font-extrabold text-[18px] text-[#1B2A4A]">
                            {c2.name}
                          </h4>
                          <span className="text-sm font-bold text-slate-400">
                            · {c2.relation}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-500 mt-0.5">
                          {c2.active ? `Avisa após ${c2.alertMinutes || 30} min` : 'Avisos desativados'}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200 shrink-0">
                      Apenas leitura
                    </span>
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Card Dra. Helena */}
          <Card className="bg-gradient-to-br from-[#FFF5F8] to-white border-2 border-pink-200/90 shadow-sm p-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`${ICON_TOKENS.cardBox} rounded-2xl bg-pink-100 text-pink-700 border border-pink-200 shrink-0 flex items-center justify-center`}>
                  <Stethoscope size={ICON_TOKENS.cardIconSize} strokeWidth={ICON_TOKENS.cardStroke} />
                </div>
                <div className="min-w-0">
                  <h4 className="font-extrabold text-[18px] text-[#1B2A4A]">
                    Dra. Helena
                  </h4>
                  <p className="text-xs sm:text-sm font-bold text-pink-700 mt-0.5">
                    Cardiologista · relatório semanal
                  </p>
                </div>
              </div>

              <span className="text-xs font-black text-pink-700 bg-pink-50 border border-pink-200 px-2.5 py-1 rounded-full shrink-0">
                Autorizado
              </span>
            </div>
          </Card>

          {/* Card "Esta semana" (mesmo card com dados calculados) */}
          <Card className="bg-white p-4.5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="font-black text-base text-[#1B2A4A]">
                Esta semana
              </h3>
              <span className="font-extrabold text-sm text-[#785EDF]">
                {weeklyTaken} de {weeklyTotal} doses
              </span>
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {data.weeklyStats.days.map((dayItem, idx) => (
                <DropletDayMarker
                  key={idx}
                  day={dayItem.day}
                  status={dayItem.status}
                  dayFull={dayItem.dayFull}
                />
              ))}
            </div>
          </Card>

          {/* Botão: Ligar para a Dona Maria */}
          <div className="pt-1">
            <Button
              variant="secondary"
              size="lg"
              fullWidth={true}
              onClick={() => showToast(`Ligando para Dona Maria: ${data.user.phone}...`)}
              icon={Phone}
              className="h-[56px] text-base font-extrabold text-[#1B2A4A] border-slate-300 hover:bg-slate-50"
            >
              Ligar para a Dona Maria ({data.user.phone})
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // VISÃO 3: DRA. HELENA (MÉDICO) — ABA "PACIENTES"
  // ----------------------------------------------------
  if (activeProfile === 'medico') {
    const doctorReports = data.doctorReports || [];

    return (
      <div className="flex-1 flex flex-col pb-28 text-slate-800">
        <Header />

        <div className="px-5 pt-1 space-y-4">
          {/* Título: "Pacientes" em azul-marinho e "autorizados" em rosa/roxo */}
          <div>
            <h1 className="text-[32px] font-black text-[#1B2A4A] tracking-tight leading-tight">
              Pacientes
            </h1>
            <h2 className="text-[32px] font-black text-pink-600 tracking-tight leading-tight">
              autorizados
            </h2>
          </div>

          {/* Pacientes Autorizados */}
          <div>
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Acesso Clínico Autorizado
              </span>
              <span className="text-xs font-black text-pink-700 bg-pink-50 border border-pink-200 px-2.5 py-0.5 rounded-full">
                {data.doctorPatients.length} pacientes
              </span>
            </div>

            <div className="space-y-3">
              {/* Card Dona Maria Souza */}
              <Card className="p-4 bg-white border border-pink-100 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3.5">
                    <div className={`${ICON_TOKENS.cardBox} rounded-2xl bg-pink-50 text-pink-700 border border-pink-200 flex items-center justify-center shrink-0`}>
                      <User size={ICON_TOKENS.cardIconSize} strokeWidth={ICON_TOKENS.cardStroke} />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[18px] text-[#1B2A4A]">
                        {data.user.name} ({data.user.age} anos)
                      </h4>
                      <p className="text-xs text-slate-500 font-semibold mt-0.5">
                        Hipertensão arterial e Diabetes tipo 2
                      </p>
                      <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 w-fit">
                        <ShieldCheck size={14} />
                        <span>Autorizado pela paciente em {data.user.authorizedDate || '02/11/2026'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">3 medicamentos ativos</span>
                  <span className="font-black text-pink-700 bg-pink-50 px-2 py-0.5 rounded-md">
                    {weeklyPercentage}% de adesão semanal
                  </span>
                </div>
              </Card>

              {/* Card Seu José Silveira */}
              <Card className="p-4 bg-white/80 border border-slate-200 shadow-xs">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3.5">
                    <div className={`${ICON_TOKENS.cardBox} rounded-2xl bg-slate-100 text-slate-600 border border-slate-200 flex items-center justify-center shrink-0`}>
                      <User size={ICON_TOKENS.cardIconSize} strokeWidth={ICON_TOKENS.cardStroke} />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[18px] text-[#1B2A4A]">
                        Seu José Silveira (78 anos)
                      </h4>
                      <p className="text-xs text-slate-500 font-semibold mt-0.5">
                        Insuficiência cardíaca
                      </p>
                      <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 w-fit">
                        <ShieldCheck size={14} />
                        <span>Autorizado pelo paciente em 15/10/2026</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Lista de Relatórios Recebidos */}
          <div>
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <FileText size={16} className="text-pink-600" />
                Relatórios Recebidos ({doctorReports.length})
              </span>
            </div>

            <div className="space-y-2.5">
              {doctorReports.map((report) => (
                <Card 
                  key={report.id} 
                  className={`p-3.5 ${
                    report.isNew 
                      ? 'bg-gradient-to-r from-emerald-50/90 to-teal-50/80 border-2 border-emerald-300 shadow-sm' 
                      : 'bg-white border border-slate-200/90'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        report.isNew ? 'bg-emerald-200 text-emerald-800' : 'bg-pink-100 text-pink-700'
                      }`}>
                        <FileText size={20} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-black text-sm text-[#1B2A4A] truncate">
                            {report.title}
                          </h4>
                          {report.isNew && (
                            <span className="text-[11px] font-black uppercase text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full animate-pulse">
                              Novo
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 font-medium mt-0.5">
                          {report.patientName} · {report.date}
                        </p>
                        <p className="text-xs font-bold text-[#785EDF] mt-1">
                          {report.dosesTaken} de {report.dosesTotal} doses tomadas ({report.adherenceRate})
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* AVISO CLÍNICO OBRIGATÓRIO */}
          <div className="bg-pink-50/90 border border-pink-200 rounded-2xl p-3.5 flex items-start gap-2.5">
            <Info size={20} className="text-pink-700 shrink-0 mt-0.5" />
            <p className="text-xs text-pink-900 leading-snug font-medium">
              <strong>Aviso Clínico:</strong> Dados informados pela paciente. Não substituem avaliação clínica.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default FamilyDoctorScreen;
