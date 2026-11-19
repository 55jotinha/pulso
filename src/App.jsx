import React from 'react';
import { useApp } from './context/AppContext';
import { PhoneFrame } from './components/layout/PhoneFrame';
import { SwitcherBar } from './components/presentation/SwitcherBar';

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
  const { currentScreen } = useApp();

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
    <div className="h-screen max-h-screen overflow-hidden bg-[#E2E6F2] p-1 sm:p-3 flex flex-col items-center justify-between font-sans antialiased text-slate-800">
      {/* Barra de controle acadêmico superior (desktop) */}
      <div className="w-full shrink-0 mb-1.5 hidden sm:block">
        <SwitcherBar />
      </div>

      {/* Moldura de Smartphone centralizada (ocupa a altura disponível da janela sem scroll da página) */}
      <main className="flex-1 min-h-0 w-full flex items-center justify-center overflow-hidden">
        <PhoneFrame>
          {renderScreen()}
        </PhoneFrame>
      </main>
    </div>
  );
};

export default App;
