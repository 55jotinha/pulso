import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/common/Button';
import { Fingerprint, ArrowLeft, Lock, Mail, CreditCard, Stethoscope, User, Users } from 'lucide-react';
import { ICON_TOKENS, MASCOT_TOKENS } from '../../constants/tokens';

export const LoginScreen = () => {
  const { selectedAuthProfile, setCurrentScreen, handleLogin, data } = useApp();

  const getProfileConfig = () => {
    switch (selectedAuthProfile) {
      case 'responsavel':
        return {
          title: 'Entrar como Responsável',
          name: data.caregiverUser.name,
          role: data.caregiverUser.roleLabel,
          icon: Users,
          iconBg: 'bg-[#F3F0FC] text-[#785EDF]',
          loginLabel: 'E-mail cadastrado',
          loginValue: data.caregiverUser.email,
          loginIcon: Mail,
        };
      case 'medico':
        return {
          title: 'Entrar como Médico',
          name: data.doctorUser.name,
          role: `${data.doctorUser.specialty} · CRM ${data.doctorUser.crm}`,
          icon: Stethoscope,
          iconBg: 'bg-[#FDF2F8] text-[#BE185D]',
          loginLabel: 'CRM / Estado',
          loginValue: data.doctorUser.crm,
          loginIcon: Stethoscope,
        };
      default:
        return {
          title: 'Entrar no Pulso',
          name: data.user.name,
          role: 'Meus remédios e lembretes',
          icon: User,
          iconBg: 'bg-[#E0F7FA] text-[#00838F]',
          loginLabel: 'CPF cadastrado',
          loginValue: '123.456.789-00',
          loginIcon: CreditCard,
        };
    }
  };

  const config = getProfileConfig();

  const onEnter = () => {
    handleLogin(selectedAuthProfile);
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-5 sm:px-6 pt-4 pb-6 bg-[#EEF0FA] text-slate-800 w-full min-h-full">
      <div>
        {/* Topo com botão voltar */}
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => setCurrentScreen('select-profile')}
            className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#1B2A4A] shadow-xs border border-slate-200/80 hover:bg-slate-50 active:scale-95 transition-all"
            aria-label="Voltar para seleção de perfil"
          >
            <ArrowLeft size={24} strokeWidth={2.5} />
          </button>
          <span className="text-xs font-bold text-[#785EDF] bg-[#F3F0FC] px-3.5 py-1.5 rounded-full border border-purple-100">
            Acesso Rápido
          </span>
        </div>

        {/* Topo: Nome à esquerda e Mascote no canto superior direito */}
        <div className="flex items-center justify-between gap-3 mt-2 mb-4">
          <div className="flex-1 pr-2 min-w-0">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Identificação
            </span>
            <h1 className="text-3xl font-extrabold text-[#1B2A4A] tracking-tight mt-0.5 leading-tight">
              Olá, <span className="text-[#785EDF]">{config.name}</span>
            </h1>
            <p className="text-[15px] text-slate-600 font-medium mt-1">
              {config.role}
            </p>
          </div>

          {/* Círculo do mascote */}
          <div className="shrink-0 flex items-center justify-center">
            <div
              style={{
                width: 'clamp(96px, 26vw, 128px)',
                height: 'clamp(96px, 26vw, 128px)',
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

        {/* Card com campos pré-preenchidos */}
        <div className="bg-white rounded-3xl p-5 shadow-[0_8px_24px_rgba(27,42,74,0.06)] border border-slate-100 mt-2 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              {config.loginLabel}
            </label>
            <div className="flex items-center bg-[#F8FAFC] rounded-2xl px-4 py-3.5 border border-slate-200">
              <config.loginIcon size={24} className="text-slate-400 mr-3 shrink-0" />
              <input
                type="text"
                readOnly
                value={config.loginValue}
                className="w-full bg-transparent text-[#1B2A4A] font-bold text-base outline-none cursor-default"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Senha de acesso
            </label>
            <div className="flex items-center bg-[#F8FAFC] rounded-2xl px-4 py-3.5 border border-slate-200">
              <Lock size={24} className="text-slate-400 mr-3 shrink-0" />
              <input
                type="password"
                readOnly
                value="••••••••••••"
                className="w-full bg-transparent text-[#1B2A4A] font-bold text-xl outline-none tracking-widest cursor-default"
              />
            </div>
          </div>

          <div className="flex justify-end pt-0.5">
            <button
              type="button"
              className="text-sm font-semibold text-[#785EDF] hover:underline"
              onClick={() => {}}
            >
              Esqueci minha senha
            </button>
          </div>
        </div>
      </div>

      {/* Botões de Ação com w-full em items-stretch */}
      <div className="mt-6 space-y-3 shrink-0 w-full flex flex-col items-stretch">
        <Button
          onClick={onEnter}
          size="xl"
          fullWidth={true}
          className="h-[60px] min-h-[60px] text-[20px] font-bold shadow-pulso-btn w-full"
        >
          Entrar
        </Button>

        <Button
          onClick={onEnter}
          variant="secondary"
          size="lg"
          fullWidth={true}
          icon={Fingerprint}
          className="h-[54px] min-h-[54px] text-[17px] font-bold text-[#1B2A4A] w-full"
        >
          Entrar com digital
        </Button>

        <div className="text-center pt-1 pb-1">
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
