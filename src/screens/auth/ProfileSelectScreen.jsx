import React from 'react';
import { useApp } from '../../context/AppContext';
import { User, Users, Stethoscope, Check } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const ProfileSelectScreen = () => {
  const { selectedAuthProfile, setSelectedAuthProfile, setCurrentScreen } = useApp();

  const profiles = [
    {
      id: 'idoso',
      title: 'Sou idoso',
      subtitle: 'Meus remédios',
      icon: User,
      iconBg: 'bg-[#E0F7FA] text-[#00838F]',
    },
    {
      id: 'responsavel',
      title: 'Sou responsável / cuidador',
      subtitle: 'Até 2 pessoas por idoso',
      icon: Users,
      iconBg: 'bg-[#F3F0FC] text-[#785EDF]',
    },
    {
      id: 'medico',
      title: 'Sou médico',
      subtitle: 'Meus pacientes',
      icon: Stethoscope,
      iconBg: 'bg-[#FDF2F8] text-[#BE185D]',
    }
  ];

  const handleContinue = () => {
    setCurrentScreen('login');
  };

  return (
    <div className="profile-screen-container flex-1 flex flex-col justify-between px-5 sm:px-6 pt-4 sm:pt-5 pb-5 sm:pb-6 bg-[#EEF0FA] text-slate-800 w-full min-h-full">
      {/* Topo: Título fluido e Círculo do mascote fluido (clamp 104px a 128px) */}
      <div className="flex items-center justify-between gap-3 shrink-0 mb-5">
        <div className="min-w-0 flex-1">
          <h1
            style={{ fontSize: 'clamp(28px, 8.5vw, 38px)' }}
            className="font-bold text-[#1B2A4A] leading-[1.08] tracking-tight"
          >
            Quem vai<br />
            <span className="text-[#785EDF]">entrar?</span>
          </h1>
        </div>

        {/* Círculo do mascote fluido: width de clamp(104px, 30vw, 128px) ocupando ~90% */}
        <div className="shrink-0 flex items-center justify-center">
          <div
            style={{
              width: 'clamp(104px, 30vw, 128px)',
              height: 'clamp(104px, 30vw, 128px)',
            }}
            className="rounded-full bg-gradient-to-tr from-[#E6EBF8] via-[#EDE9FE] to-[#FCE7F3] border-2 border-white shadow-[0_8px_24px_rgba(120,94,223,0.12)] flex items-center justify-center overflow-hidden"
          >
            <img
              src="/pulso-mascote.png"
              alt="Mascote Pulso"
              className="w-[90%] h-[90%] object-contain"
            />
          </div>
        </div>
      </div>

      {/* Bloco de Cards: flex-1 sem altura fixa, responsivo < 380px */}
      <div className="flex-1 flex flex-col justify-center space-y-3 sm:space-y-4 my-auto w-full">
        {profiles.map((p) => {
          const isSelected = selectedAuthProfile === p.id;
          const Icon = p.icon;

          return (
            <div
              key={p.id}
              onClick={() => setSelectedAuthProfile(p.id)}
              className={`
                profile-card relative rounded-[24px] cursor-pointer transition-all duration-200
                flex items-center justify-between w-full
                ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#EBF9FB] via-[#F0F8FE] to-[#F5FAFF] border-2 border-[#7FD8E6] shadow-[0_8px_24px_rgba(127,216,230,0.22)] scale-[1.01]'
                    : 'bg-white border-2 border-transparent hover:border-slate-200 shadow-[0_6px_20px_rgba(27,42,74,0.04)]'
                }
              `}
            >
              {/* Ícone e Textos: texto com flex-1 e min-w-0 */}
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 pr-2">
                <div className={`profile-card-icon-box rounded-2xl ${p.iconBg} flex items-center justify-center shrink-0 shadow-xs border border-white/60`}>
                  <Icon className="profile-card-icon" size={28} strokeWidth={2} />
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="profile-card-title font-bold text-[#1B2A4A] tracking-normal leading-tight">
                    {p.title}
                  </h2>
                  <p className="profile-card-sub text-slate-500 font-medium mt-0.5 leading-snug">
                    {p.subtitle}
                  </p>
                </div>
              </div>

              {/* Seletor Circular (Radio) */}
              <div className="shrink-0 ml-2">
                <div
                  className={`profile-card-radio rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-[#7FD8E6] text-[#1B2A4A] border-2 border-[#7FD8E6] shadow-xs'
                      : 'border-2 border-slate-300 bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contêiner do Botão: flex-col com items-stretch e w-full, botão w-full */}
      <div className="w-full flex flex-col items-stretch shrink-0 pt-3 space-y-3">
        <Button
          onClick={handleContinue}
          size="xl"
          fullWidth={true}
          className="h-[60px] min-h-[60px] text-[20px] font-bold shadow-pulso-btn w-full"
        >
          Continuar
        </Button>

        <div className="text-center pb-0.5">
          <p className="text-[15px] text-slate-600 font-medium">
            Primeiro acesso?{' '}
            <button
              type="button"
              onClick={() => {}}
              className="font-bold text-[#785EDF] hover:underline"
            >
              Criar conta
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
