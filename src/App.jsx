import React, { useState, useEffect } from 'react';
import { useApp } from './context/AppContext';
import { PhoneFrame } from './components/layout/PhoneFrame';
import { SwitcherBar } from './components/presentation/SwitcherBar';
import { PresentationFloatingButton } from './components/presentation/PresentationFloatingButton';
import { PresentationModal } from './components/presentation/PresentationModal';
import { IOSInstallPrompt } from './components/modals/IOSInstallPrompt';

// Telas de Autenticação e Perfis
import { ProfileSelectScreen } from './screens/auth/ProfileSelectScreen';
import { LoginScreen } from './screens/auth/LoginScreen';

// Telas do Idoso (Dona Maria)
import { HomeScreen } from './screens/idoso/HomeScreen';
import { MedicineAlarmScreen } from './screens/idoso/MedicineAlarmScreen';
import { ConfirmationScreen } from './screens/idoso/ConfirmationScreen';
import { MedicinesListScreen } from './screens/idoso/MedicinesListScreen';
import { AddMedicineScreen } from './screens/idoso/AddMedicineScreen';
import { FamilyDoctorScreen } from './screens/idoso/FamilyDoctorScreen';

// Telas dos Novos Perfis
import { CaregiverScreen } from './screens/responsavel/CaregiverScreen';
import { DoctorScreen } from './screens/medico/DoctorScreen';

export const App = () => {
  const { currentScreen, isStandalone } = useApp();
  const [isNarrowScreen, setIsNarrowScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsNarrowScreen(window.innerWidth < 500);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isRealMobile = isNarrowScreen || isStandalone;

  const renderScreen = () => {
    switch (currentScreen) {
      case 'select-profile':
        return <ProfileSelectScreen />;
      case 'login':
        return <LoginScreen />;
      case 'home':
        return <HomeScreen />;
      case 'alarm':
        return <MedicineAlarmScreen />;
      case 'confirmation':
        return <ConfirmationScreen />;
      case 'medicines':
        return <MedicinesListScreen />;
      case 'add-medicine':
        return <AddMedicineScreen />;
      case 'family-doctor':
        return <FamilyDoctorScreen />;
      case 'caregiver':
        return <CaregiverScreen />;
      case 'doctor':
        return <DoctorScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div
      className={`h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col items-center justify-between font-sans antialiased text-slate-800 ${
        isRealMobile
          ? 'bg-[#EEF0FA] p-0'
          : 'bg-[#E2E6F2] p-1 sm:p-3'
      }`}
    >
      {/* Barra de controle acadêmico superior (apenas em desktop > 500px e não-standalone) */}
      {!isRealMobile && (
        <div className="w-full shrink-0 mb-1.5 hidden sm:block">
          <SwitcherBar />
        </div>
      )}

      {/* Conteúdo central (no desktop moldura 393x852; no celular real tela inteira) */}
      <main className="flex-1 min-h-0 w-full flex items-center justify-center overflow-hidden">
        <PhoneFrame>
          {renderScreen()}
        </PhoneFrame>
      </main>

      {/* Botão flutuante de modo apresentação (aparece apenas em celular real / standalone) */}
      <PresentationFloatingButton />

      {/* Modal de controle acadêmico e instalação PWA */}
      <PresentationModal />

      {/* Dica de instalação para iOS Safari */}
      <IOSInstallPrompt />
    </div>
  );
};

export default App;
