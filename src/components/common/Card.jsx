import React from 'react';

export const Card = ({
  children,
  className = '',
  onClick,
  interactive = false,
  highlight = false,
  pinkBorder = false
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-[24px] p-5
        shadow-[0_8px_24px_rgba(27,42,74,0.06)]
        border transition-all duration-200
        ${highlight ? 'border-[#785EDF] ring-2 ring-[#785EDF]/20' : pinkBorder ? 'border-pink-200' : 'border-slate-100/80'}
        ${interactive ? 'cursor-pointer hover:shadow-[0_12px_28px_rgba(27,42,74,0.10)] active:scale-[0.99]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

