import React from 'react';

export const AcademicNotice = ({ className = '' }) => {
  return (
    <footer className={`py-2 px-4 text-center select-none ${className}`}>
      <p className="text-[11px] text-slate-400 font-medium tracking-wide">
        Protótipo acadêmico. Sem integração real.
      </p>
    </footer>
  );
};

