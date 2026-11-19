import React from 'react';
import { useApp } from '../../context/AppContext';
import { User, HeartHandshake, Stethoscope, RotateCcw, Smartphone } from 'lucide-react';

export const SwitcherBar = () => {
  const { activeProfile, handleLogin, resetDemoData, currentScreen } = useApp();

  const profiles = [
    {
      key: 'idoso',
      label: 'Dona Maria',
      subtitle: 'Idoso',
      icon: User,
      activeClass: 'bg-[#785EDF] text-white shadow-sm'
    },
    {
      key: 'responsavel',
      label: 'Ana',
      subtitle: 'Filha',
      icon: HeartHandshake,
      activeClass: 'bg-indigo-600 text-white shadow-sm'
    },
    {
      key: 'medico',
      label: 'Dra. Helena',
      subtitle: 'Médica',
      icon: Stethoscope,
      activeClass: 'bg-pink-600 text-white shadow-sm'
    }
  ];

  return (
    <aside className="w-full max-w-2xl mx-auto px-4 py-2 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-2 shrink-0 select-none">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#7FD8E6] to-[#785EDF] flex items-center justify-center text-white shadow-xs">
          <Smartphone className="w-3.5 h-3.5" />
        </div>
        <span className="font-extrabold text-[#1B2A4A] tracking-normal text-sm">PULSO</span>
      </div>

      {/* Seletor rápido de perfis para demonstração acadêmica */}
      <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl">
        {profiles.map((p) => {
          const Icon = p.icon;
          const isActive = activeProfile === p.key && currentScreen !== 'select-profile' && currentScreen !== 'login';
          return (
            <button
              key={p.key}
              onClick={() => handleLogin(p.key)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 ${
                isActive ? p.activeClass : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{p.label}</span>
            </button>
          );
        })}
      </div>

      {/* Botão de reset dos dados mock */}
      <button
        onClick={resetDemoData}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-[#1B2A4A] hover:bg-slate-100 transition-colors"
        title="Reiniciar dados da demonstração (2 de 4 doses)"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Reiniciar</span>
      </button>
    </aside>
  );
};
