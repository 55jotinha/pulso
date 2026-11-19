import React from 'react';
import { ArrowLeft, User, HeartHandshake, Stethoscope } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header = ({ title, showBack = false, onBack, rightAction }) => {
  const { activeProfile, setCurrentScreen } = useApp();

  const getProfileConfig = () => {
    switch (activeProfile) {
      case 'responsavel':
        return {
          name: 'Ana',
          label: 'Filha',
          icon: HeartHandshake,
          badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          iconBg: 'bg-indigo-100 text-indigo-700'
        };
      case 'medico':
        return {
          name: 'Dra. Helena',
          label: 'Médica',
          icon: Stethoscope,
          badgeColor: 'bg-pink-50 text-pink-700 border-pink-200',
          iconBg: 'bg-pink-100 text-pink-700'
        };
      default:
        return {
          name: 'Dona Maria',
          label: 'Idoso',
          icon: User,
          badgeColor: 'bg-[#F3F0FC] text-[#785EDF] border-[#DDD6FE]',
          iconBg: 'bg-[#E0F7FA] text-[#00838F]'
        };
    }
  };

  const config = getProfileConfig();
  const Icon = config.icon;

  return (
    <header className="px-5 pt-[max(12px,env(safe-area-inset-top))] pb-2 flex items-center justify-between z-20 shrink-0 select-none">
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        {showBack ? (
          <button
            onClick={onBack || (() => setCurrentScreen('home'))}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1B2A4A] shadow-xs border border-slate-200/80 hover:bg-slate-50 active:scale-95 transition-all shrink-0"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
        ) : title ? (
          <button
            onClick={() => setCurrentScreen('select-profile')}
            title="Alternar Perfil"
            className={`w-9 h-9 rounded-full ${config.iconBg} flex items-center justify-center shrink-0 border border-slate-200/60 shadow-xs hover:scale-105 transition-all`}
          >
            <Icon className="w-5 h-5 stroke-[2.2]" />
          </button>
        ) : (
          <button
            onClick={() => setCurrentScreen('select-profile')}
            title="Alternar Perfil"
            className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-200/70 shadow-xs hover:border-[#785EDF]/50 transition-all text-left shrink-0"
          >
            <div className={`w-6 h-6 rounded-full ${config.iconBg} flex items-center justify-center shrink-0`}>
              <Icon className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <span className="text-xs font-bold text-[#1B2A4A] max-w-[90px] truncate">
              {config.name}
            </span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${config.badgeColor}`}>
              {config.label}
            </span>
          </button>
        )}

        {title && (
          <h2 className="text-xl font-black text-[#1B2A4A] truncate leading-tight">
            {title}
          </h2>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0 ml-2">
        {rightAction || (
          <button
            onClick={() => setCurrentScreen('select-profile')}
            className="text-xs font-bold text-[#785EDF] bg-[#F3F0FC] hover:bg-[#EAE4FB] px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
          >
            Trocar perfil
          </button>
        )}
      </div>
    </header>
  );
};
