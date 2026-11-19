import React, { useState } from 'react';
import { Search, Mic } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { showToast } = useApp();

  const handleMicClick = () => {
    showToast('Ouvindo: "Qual é o meu próximo remédio?"');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      showToast(`Pulso: O próximo remédio é Metformina 850 mg às 12:30.`);
      setQuery('');
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center w-full bg-white rounded-full px-4 py-3 shadow-[0_4px_16px_rgba(27,42,74,0.04)] border border-slate-200/80 transition-all focus-within:border-[#785EDF] focus-within:ring-2 focus-within:ring-[#785EDF]/20">
        <Search className="w-5 h-5 text-slate-400 shrink-0 mr-2.5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Pergunte ao Pulso..."
          className="w-full bg-transparent text-[#1B2A4A] placeholder-slate-400 text-base focus:outline-none"
        />
        <button
          type="button"
          onClick={handleMicClick}
          title="Falar por voz"
          className="shrink-0 p-1.5 rounded-full bg-[#F3F0FC] text-[#785EDF] hover:bg-[#EBE5FB] transition-colors active:scale-95 ml-2"
        >
          <Mic className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

