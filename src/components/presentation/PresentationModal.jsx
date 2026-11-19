import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { User, HeartHandshake, Stethoscope, RotateCcw, Download, CheckCircle2, X, SlidersHorizontal } from 'lucide-react';

export const PresentationModal = () => {
  const {
    isPresentationModalOpen,
    setIsPresentationModalOpen,
    activeProfile,
    handleLogin,
    resetDemoData,
    isInstallable,
    isStandalone,
    triggerPWAInstall
  } = useApp();

  if (!isPresentationModalOpen) return null;

  const profiles = [
    {
      key: 'idoso',
      label: 'Dona Maria',
      subtitle: 'Idoso (Remédios e Lembretes)',
      icon: User,
      activeClass: 'bg-[#785EDF] text-white shadow-md'
    },
    {
      key: 'responsavel',
      label: 'Ana',
      subtitle: 'Filha / Cuidadora (Acompanhamento)',
      icon: HeartHandshake,
      activeClass: 'bg-indigo-600 text-white shadow-md'
    },
    {
      key: 'medico',
      label: 'Dra. Helena',
      subtitle: 'Médica Cardiologista (Prontuário)',
      icon: Stethoscope,
      activeClass: 'bg-pink-600 text-white shadow-md'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-5 shadow-2xl w-full max-w-sm border border-slate-100 flex flex-col max-h-[90vh] overflow-y-auto">
        {/* Topo do modal */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7FD8E6] to-[#785EDF] flex items-center justify-center text-white shadow-xs">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-[#1B2A4A] text-base leading-tight">
                Modo Apresentação
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Controles rápidos da banca acadêmica
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsPresentationModalOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Alternar Perfil */}
        <div className="my-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2 px-1">
            Alternar Perfil
          </span>

          <div className="space-y-2">
            {profiles.map((p) => {
              const Icon = p.icon;
              const isActive = activeProfile === p.key;

              return (
                <button
                  key={p.key}
                  onClick={() => {
                    handleLogin(p.key);
                    setIsPresentationModalOpen(false);
                  }}
                  className={`w-full p-3 rounded-2xl flex items-center gap-3 transition-all text-left ${
                    isActive
                      ? p.activeClass
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-white/20 text-white' : 'bg-white text-slate-700 shadow-xs'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-extrabold text-sm block leading-tight">
                      {p.label}
                    </span>
                    <span className={`text-[11px] font-medium block mt-0.5 truncate ${
                      isActive ? 'text-white/80' : 'text-slate-500'
                    }`}>
                      {p.subtitle}
                    </span>
                  </div>
                  {isActive && <CheckCircle2 size={18} className="text-white shrink-0 ml-1" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Instalar PWA se disponível */}
        {isInstallable && !isStandalone && (
          <div className="mb-4 pt-1">
            <Button
              variant="primary"
              fullWidth={true}
              icon={Download}
              onClick={() => {
                triggerPWAInstall();
                setIsPresentationModalOpen(false);
              }}
              className="h-[48px] text-sm font-black shadow-md"
            >
              Instalar o Pulso no celular
            </Button>
          </div>
        )}

        {isStandalone && (
          <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-2xl p-2.5 flex items-center gap-2 text-xs font-bold text-emerald-800">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>PWA Instalado (Modo Standalone Ativo)</span>
          </div>
        )}

        {/* Reiniciar Dados da Demonstração */}
        <div className="pt-2 border-t border-slate-100">
          <Button
            variant="secondary"
            fullWidth={true}
            icon={RotateCcw}
            onClick={() => {
              resetDemoData();
              setIsPresentationModalOpen(false);
            }}
            className="h-[48px] text-sm font-bold text-slate-700 hover:text-slate-900 border-slate-200"
          >
            Reiniciar Dados da Demo
          </Button>
        </div>
      </div>
    </div>
  );
};
