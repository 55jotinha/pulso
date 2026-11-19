import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Camera, Check } from 'lucide-react';

export const AddMedicineScreen = () => {
  const { addMedicine, setCurrentScreen, showToast } = useApp();

  const [name, setName] = useState('');
  const [dose, setDose] = useState('');
  const [selectedTime, setSelectedTime] = useState('08:00');
  const [customTime, setCustomTime] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Pressão');
  const [instruction, setInstruction] = useState('Tomar com água');

  const presetTimes = ['08:00', '12:30', '20:00'];
  const categories = ['Pressão', 'Diabetes', 'Coração', 'Suplemento', 'Outro'];

  // Simular escaneamento pela câmera
  const handleScanBox = () => {
    setName('Atenolol');
    setDose('25 mg');
    setSelectedCategory('Pressão');
    setSelectedTime('08:00');
    setInstruction('1 comprimido pela manhã com água');
    showToast('Caixa de Atenolol 25 mg reconhecida com sucesso!');
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Por favor, digite o nome do remédio.');
      return;
    }

    const time = customTime || selectedTime;
    let timeSlot = 'Manhã';
    const hour = parseInt(time.split(':')[0], 10);
    if (hour >= 12 && hour < 18) timeSlot = 'Tarde';
    else if (hour >= 18 || hour < 6) timeSlot = 'Noite';

    addMedicine({
      name: name.trim(),
      dose: dose.trim() || '1 comprimido',
      category: selectedCategory,
      timeSlot,
      time,
      instruction: instruction.trim() || 'Tomar com água'
    });
  };

  return (
    <div className="flex-1 flex flex-col pb-24 text-slate-800">
      <Header
        title="Novo Remédio"
        showBack={true}
        onBack={() => setCurrentScreen('medicines')}
      />

      <form onSubmit={handleSave} className="px-5 pt-1 space-y-4">
        {/* Banner "Escanear a caixa" (Visual) */}
        <div
          type="button"
          onClick={handleScanBox}
          className="bg-white border-2 border-dashed border-[#785EDF]/50 rounded-3xl p-4 text-center cursor-pointer hover:bg-[#F3F0FC]/40 transition-all active:scale-[0.99] shadow-xs"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#F3F0FC] text-[#785EDF] flex items-center justify-center mx-auto mb-2">
            <Camera className="w-6 h-6 stroke-[2.2]" />
          </div>
          <h3 className="font-extrabold text-base text-[#1B2A4A]">
            Escanear a caixa com a câmera
          </h3>
          <p className="text-sm text-slate-500 mt-0.5 font-medium">
            Toque para preencher automaticamente (demonstração)
          </p>
        </div>

        {/* Campos Nome e Dose */}
        <Card className="bg-white space-y-4 p-5">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              Nome do Remédio *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Losartana, Metformina..."
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-2xl px-4 py-3.5 text-base font-bold text-[#1B2A4A] placeholder-slate-400 focus:outline-none focus:border-[#785EDF] focus:ring-2 focus:ring-[#785EDF]/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              Dose / Dosagem
            </label>
            <input
              type="text"
              value={dose}
              onChange={(e) => setDose(e.target.value)}
              placeholder="Ex: 50 mg, 1 comprimido, 2 gotas..."
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-2xl px-4 py-3.5 text-base font-semibold text-[#1B2A4A] placeholder-slate-400 focus:outline-none focus:border-[#785EDF] focus:ring-2 focus:ring-[#785EDF]/20"
            />
          </div>

          {/* Horários com Chips (08:00, 20:00, + Outro) */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Horário da Dose
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {presetTimes.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => {
                    setSelectedTime(t);
                    setCustomTime('');
                  }}
                  className={`px-4 py-2.5 rounded-2xl text-base font-extrabold transition-all ${
                    selectedTime === t && !customTime
                      ? 'bg-[#785EDF] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
              <div className="flex items-center gap-1.5">
                <input
                  type="time"
                  value={customTime}
                  onChange={(e) => {
                    setCustomTime(e.target.value);
                    setSelectedTime(e.target.value);
                  }}
                  className="bg-slate-100 border border-slate-200 rounded-2xl px-3 py-2 text-sm font-bold text-slate-700 focus:outline-none focus:border-[#785EDF]"
                />
              </div>
            </div>
          </div>

          {/* Etiqueta / Categoria */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Etiqueta de Saúde
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#1B2A4A] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Instruções */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              Como tomar?
            </label>
            <input
              type="text"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Ex: Após o café, com um copo d'água..."
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-2xl px-4 py-3 text-base font-medium text-[#1B2A4A] placeholder-slate-400 focus:outline-none focus:border-[#785EDF]"
            />
          </div>
        </Card>

        {/* Botão Salvar Remédio */}
        <div className="pt-2">
          <Button type="submit" size="lg" icon={Check}>
            Salvar remédio
          </Button>
        </div>
      </form>
    </div>
  );
};
