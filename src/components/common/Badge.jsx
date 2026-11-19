import React from 'react';

export const Badge = ({
  children,
  variant = 'default', // 'success' | 'warning' | 'purple' | 'cyan' | 'pink' | 'default'
  size = 'md',
  className = ''
}) => {
  const styles = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    success: 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]',
    warning: 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]',
    purple: 'bg-[#F3F0FC] text-[#5B39C6] border-[#DDD6FE]',
    cyan: 'bg-[#E0F7FA] text-[#006064] border-[#B2EBF2]',
    pink: 'bg-[#FDF2F8] text-[#9D174D] border-[#FBCFE8]',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-0.5 font-medium',
    md: 'text-[13px] px-3 py-1 font-semibold',
    lg: 'text-sm px-3.5 py-1.5 font-bold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border ${styles[variant] || styles.default} ${sizes[size] || sizes.md} ${className}`}
    >
      {children}
    </span>
  );
};

