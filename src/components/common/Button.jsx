import React from 'react';

export const Button = ({
  children,
  onClick,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'purple' | 'pink' | 'ghost'
  size = 'lg',
  fullWidth = true,
  disabled = false,
  className = '',
  icon: Icon,
  type = 'button'
}) => {
  const baseStyles = 'relative flex items-center justify-center font-bold tracking-normal rounded-2xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] select-none text-center';

  const sizeStyles = {
    md: 'min-h-[48px] px-4 py-2.5 text-base',
    lg: 'min-h-[52px] px-5 py-3 text-base sm:text-[17px]',
    xl: 'min-h-[60px] px-6 py-4 text-[20px] font-bold',
  };

  const variants = {
    // Degradê ciano/turquesa com texto escuro
    primary: 'bg-gradient-to-r from-[#7FD8E6] via-[#81D1EC] to-[#84C5F0] text-[#1B2A4A] shadow-pulso-btn hover:brightness-105 active:shadow-sm border border-white/40',
    // Roxo/Lilás para destaques
    purple: 'bg-[#785EDF] text-white shadow-pulso-purple hover:bg-[#6A4FD6] active:shadow-sm',
    // Secundário suave em branco
    secondary: 'bg-white text-[#1B2A4A] border border-[#CBD5E1] hover:bg-[#F8FAFC] shadow-sm',
    // Outline roxo suave
    outline: 'bg-white/80 text-[#785EDF] border-2 border-[#785EDF] hover:bg-[#F3F0FC]',
    // Rosa suave exclusivo para telas médicas
    pink: 'bg-gradient-to-r from-[#FCE7F3] to-[#FBCFE8] text-[#9D174D] border border-[#F472B6]/40 hover:bg-[#FCE7F3] shadow-sm',
    // Ghost
    ghost: 'bg-transparent text-[#64748B] hover:text-[#1B2A4A] hover:bg-slate-100',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${sizeStyles[size] || sizeStyles.lg}
        ${variants[variant] || variants.primary}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {Icon && <Icon className="w-5 h-5 mr-2 shrink-0" strokeWidth={2.4} />}
      <span className="truncate">{children}</span>
    </button>
  );
};
