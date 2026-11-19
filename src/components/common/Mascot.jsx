import React from 'react';

export const Mascot = ({
  size = 'md',
  className = '',
  animated = false, // Animação sutil de flutuar apenas nas telas grandes
  alt = 'Pulso Mascote'
}) => {
  const sizeClasses = {
    nav: 'w-[54px] h-[54px]',
    sm: 'w-[48px] h-[48px]',
    md: 'w-[72px] h-[72px]',
    'home-card': 'w-[96px] h-[96px]',
    auth: 'w-[116px] h-[116px]',
    lg: 'w-[160px] h-[160px]',
    alarm: 'w-[220px] h-[220px]',
    huge: 'w-[220px] h-[220px]',
  };

  return (
    <div
      className={`inline-flex items-center justify-center select-none ${
        animated ? 'animate-float' : ''
      } ${className}`}
    >
      <img
        src="/pulso-mascote.png"
        alt={alt}
        className={`${sizeClasses[size] || sizeClasses.md} object-contain filter drop-shadow-md`}
        draggable="false"
      />
    </div>
  );
};
