import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialMockData } from '../data/mock';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Estado geral do aplicativo iniciado a partir de deep clone do mock
  const [data, setData] = useState(() => JSON.parse(JSON.stringify(initialMockData)));
  
  // Perfil ativo atual: 'idoso' | 'responsavel' | 'medico'
  const [activeProfile, setActiveProfile] = useState('idoso');
  
  // Perfil temporariamente selecionado na tela de seleção ("Quem vai entrar?")
  const [selectedAuthProfile, setSelectedAuthProfile] = useState('idoso');
  
  // Tela atual de navegação:
  // 'select-profile' | 'login' | 'home' | 'alarm' | 'confirmation' | 'medicines' | 'add-medicine' | 'family-doctor' | 'caregiver' | 'doctor'
  const [currentScreen, setCurrentScreen] = useState('select-profile');
  
  // Última dose confirmada (para a tela de confirmação)
  const [lastConfirmedMed, setLastConfirmedMed] = useState(null);

  // Toast / feedback global visual
  const [toastMessage, setToastMessage] = useState(null);

  // Modais de Consentimento e Feedback de Envio
  const [isConsentOpen, setIsConsentOpen] = useState(false);
  const [sentSuccessModal, setSentSuccessModal] = useState(false);

  // Modo Apresentação em Celular Real / Standalone
  const [isPresentationModalOpen, setIsPresentationModalOpen] = useState(false);

  // Estados PWA
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);

  useEffect(() => {
    // Detectar modo standalone (já instalado como PWA)
    const checkStandalone = () => {
      const standaloneQuery = window.matchMedia('(display-mode: standalone)').matches;
      const navStandalone = window.navigator.standalone === true;
      return standaloneQuery || navStandalone;
    };

    const standaloneActive = checkStandalone();
    setIsStandalone(standaloneActive);

    // Capturar evento beforeinstallprompt (Android / Chrome)
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    window.addEventListener('appinstalled', () => {
      setIsInstalledState();
    });

    const setIsInstalledState = () => {
      setIsStandalone(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      showToast('Pulso instalado com sucesso na sua tela de início!');
    };

    // Detectar iOS Safari (para dica única de instalação)
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    const isSafari = isIOSDevice && userAgent.includes('safari') && !userAgent.includes('crios') && !userAgent.includes('fxios');

    if (isSafari && !standaloneActive) {
      try {
        const hintSeen = localStorage.getItem('pulso_ios_pwa_hint');
        if (!hintSeen) {
          const timer = setTimeout(() => {
            setShowIOSPrompt(true);
          }, 2500);
          return () => clearTimeout(timer);
        }
      } catch (err) {
        console.warn('LocalStorage error:', err);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  // Disparar prompt de instalação no Android/Chrome
  const triggerPWAInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
      setIsStandalone(true);
      showToast('Obrigado por instalar o Pulso!');
    }
    setDeferredPrompt(null);
  };

  // Dispensar dica do iOS e registrar em localStorage
  const dismissIOSPrompt = () => {
    setShowIOSPrompt(false);
    try {
      localStorage.setItem('pulso_ios_pwa_hint', 'true');
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Função utilitária para calcular porcentagem dinâmica sem valor fixo
  const calculatePercentage = (taken, total) => {
    if (!total || total === 0) return 0;
    return Math.min(100, Math.round((taken / total) * 100));
  };

  // Marcar remédio como tomado
  const takeDose = (medId) => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const takenTimeString = `Hoje às ${formattedTime}`;

    let confirmedItem = null;

    setData(prev => {
      const updatedMeds = prev.medicines.map(med => {
        if (med.id === medId) {
          confirmedItem = {
            ...med,
            status: 'tomado',
            takenAt: takenTimeString,
            isNext: false
          };
          return confirmedItem;
        }
        return med;
      });

      // Recalcular quem é o próximo remédio pendente do dia
      const nextPending = updatedMeds.find(m => m.status === 'pendente');
      if (nextPending) {
        nextPending.isNext = true;
      }

      // Atualizar contadores do dia
      const newTakenCount = updatedMeds.filter(m => m.status === 'tomado').length;
      const newTotalCount = updatedMeds.length;

      // Atualizar contagens da semana por medicamento (Dra. Helena)
      const updatedAdherenceByMed = prev.weeklyStats.adherenceByMed.map(item => {
        if (confirmedItem) {
          const medNameLower = confirmedItem.name.toLowerCase();
          const itemNameLower = item.name.toLowerCase();
          if (medNameLower.includes('metformina') && itemNameLower.includes('metformina')) {
            return { ...item, taken: Math.min(item.total, item.taken + 1) };
          }
          if (medNameLower.includes('losartana') && itemNameLower.includes('losartana')) {
            return { ...item, taken: Math.min(item.total, item.taken + 1) };
          }
          if (medNameLower.includes('vitamina') && itemNameLower.includes('vitamina')) {
            return { ...item, taken: Math.min(item.total, item.taken + 1) };
          }
        }
        return item;
      });

      const newWeeklyDosesTaken = prev.weeklyStats.dosesTaken + 1;

      // Atualizar lista da Dra. Helena (Ana e Dra. Helena sincronizam imediatamente)
      const updatedPatients = prev.doctorPatients.map(p => {
        if (p.id === 'user-maria') {
          return {
            ...p,
            lastConfirmedDose: `${takenTimeString} (${confirmedItem ? confirmedItem.name : 'Remédio'})`,
            nextDose: nextPending ? `${nextPending.time} (${nextPending.name} ${nextPending.dose})` : 'Todas as doses de hoje tomadas!',
            recentAlert: null // O alerta de atraso é desativado na hora!
          };
        }
        return p;
      });

      return {
        ...prev,
        medicines: updatedMeds,
        user: {
          ...prev.user,
          todayTakenCount: newTakenCount,
          todayTotalCount: newTotalCount
        },
        weeklyStats: {
          ...prev.weeklyStats,
          dosesTaken: newWeeklyDosesTaken,
          adherenceByMed: updatedAdherenceByMed
        },
        doctorPatients: updatedPatients
      };
    });

    setLastConfirmedMed(confirmedItem || { name: 'Metformina', dose: '850 mg', time: '12:30' });
    setCurrentScreen('confirmation');
  };

  // Adiar remédio (lembrar em 10 minutos)
  const snoozeDose = (medId, minutes = 10) => {
    setData(prev => ({
      ...prev,
      medicines: prev.medicines.map(med => {
        if (med.id === medId) {
          return {
            ...med,
            snoozedMinutes: (med.snoozedMinutes || 0) + minutes
          };
        }
        return med;
      })
    }));
    showToast(`Pulso lembrará você novamente em ${minutes} minutos.`);
    setCurrentScreen('home');
  };

  // Adicionar novo remédio
  const addMedicine = (newMed) => {
    const createdMed = {
      id: `med-${Date.now()}`,
      name: newMed.name,
      dose: newMed.dose,
      category: newMed.category || 'Geral',
      timeSlot: newMed.timeSlot || 'Manhã',
      time: newMed.time || '08:00',
      instruction: newMed.instruction || 'Tomar com água',
      status: 'pendente',
      takenAt: null,
      snoozedMinutes: 0,
      active: true,
      isNext: false
    };

    setData(prev => ({
      ...prev,
      medicines: [...prev.medicines, createdMed],
      user: {
        ...prev.user,
        todayTotalCount: prev.user.todayTotalCount + 1
      },
      weeklyStats: {
        ...prev.weeklyStats,
        dosesTotal: prev.weeklyStats.dosesTotal + 7,
        adherenceByMed: [
          ...prev.weeklyStats.adherenceByMed,
          {
            id: `med-adh-${Date.now()}`,
            name: `${newMed.name} ${newMed.dose}`,
            taken: 0,
            total: 7,
            category: newMed.category || 'Geral'
          }
        ]
      }
    }));

    showToast(`Remédio ${newMed.name} salvo com sucesso!`);
    setCurrentScreen('medicines');
  };

  // Alternar tempo de atraso que dispara o aviso (15 min -> 30 min -> 60 min)
  const cycleCaregiverAlert = (caregiverId) => {
    setData(prev => {
      let caregiverName = '';
      let newMinutes = 30;
      const updated = prev.caregivers.map(c => {
        if (c.id === caregiverId) {
          caregiverName = c.name;
          newMinutes = c.alertMinutes === 15 ? 30 : c.alertMinutes === 30 ? 60 : 15;
          return { ...c, alertMinutes: newMinutes };
        }
        return c;
      });
      showToast(`Avisos para ${caregiverName} agora disparam após ${newMinutes} min.`);
      return {
        ...prev,
        caregivers: updated
      };
    });
  };

  // Ativar / Desativar cuidador (limite de 2)
  const toggleCaregiver = (caregiverId) => {
    setData(prev => {
      const target = prev.caregivers.find(c => c.id === caregiverId);
      const activeCount = prev.caregivers.filter(c => c.active).length;

      // Se estiver tentando ativar e já tiver 2 ativos
      if (!target.active && activeCount >= 2) {
        showToast('Limite máximo de 2 cuidadores atingido.');
        return prev;
      }

      let caregiverName = target?.name || 'Responsável';
      let willBeActive = !target.active;

      const updated = prev.caregivers.map(c => {
        if (c.id === caregiverId) {
          return { ...c, active: !c.active, receivesAlerts: !c.active };
        }
        return c;
      });

      showToast(`${caregiverName}: avisos ${willBeActive ? 'ativados' : 'desativados'}.`);

      return {
        ...prev,
        caregivers: updated
      };
    });
  };

  // Enviar relatório ao médico (adiciona à lista de relatórios da Dra. Helena com selo "Novo")
  const sendReportToDoctor = () => {
    const now = new Date();
    const formatted = `Hoje às ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const calculatedRate = `${calculatePercentage(data.weeklyStats.dosesTaken, data.weeklyStats.dosesTotal)}%`;

    const newReport = {
      id: `rep-${Date.now()}`,
      patientId: 'user-maria',
      patientName: 'Dona Maria Souza',
      date: formatted,
      isNew: true,
      title: 'Relatório Semanal de Adesão',
      adherenceRate: calculatedRate,
      dosesTaken: data.weeklyStats.dosesTaken,
      dosesTotal: data.weeklyStats.dosesTotal,
    };

    setData(prev => ({
      ...prev,
      doctorReports: [newReport, ...(prev.doctorReports || []).map(r => ({ ...r, isNew: false }))],
      doctor: {
        ...prev.doctor,
        lastReportDate: formatted
      },
      doctorUser: {
        ...prev.doctorUser,
        lastReportDate: formatted
      }
    }));

    setIsConsentOpen(false);
    setSentSuccessModal(true);
  };

  // Resetar dados estritamente para o estado inicial da demonstração:
  // Losartana 08:00 tomada (08:05), Vitamina D 09:00 tomada (09:12), Metformina 12:30 pendente, Losartana 19:30 pendente (2 de 4 tomadas)
  const resetDemoData = () => {
    setData(JSON.parse(JSON.stringify(initialMockData)));
    setActiveProfile('idoso');
    setSelectedAuthProfile('idoso');
    setCurrentScreen('select-profile');
    setLastConfirmedMed(null);
    setIsConsentOpen(false);
    setSentSuccessModal(false);
    showToast('Dados reiniciados: 2 de 4 doses tomadas!');
  };

  // Login fictício
  const handleLogin = (profileKey) => {
    const targetProfile = profileKey || selectedAuthProfile;
    setActiveProfile(targetProfile);
    
    if (targetProfile === 'idoso') {
      setCurrentScreen('home');
    } else if (targetProfile === 'responsavel') {
      setCurrentScreen('caregiver');
    } else if (targetProfile === 'medico') {
      setCurrentScreen('doctor');
    }
  };

  // Próximo remédio a tomar
  const nextMedicine = data.medicines.find(m => m.isNext) || 
                       data.medicines.find(m => m.status === 'pendente' || m.status === 'proximo') ||
                       data.medicines[0];

  return (
    <AppContext.Provider
      value={{
        data,
        activeProfile,
        setActiveProfile,
        selectedAuthProfile,
        setSelectedAuthProfile,
        currentScreen,
        setCurrentScreen,
        lastConfirmedMed,
        toastMessage,
        showToast,
        isConsentOpen,
        setIsConsentOpen,
        sentSuccessModal,
        setSentSuccessModal,
        isPresentationModalOpen,
        setIsPresentationModalOpen,
        isInstallable,
        isStandalone,
        triggerPWAInstall,
        showIOSPrompt,
        dismissIOSPrompt,
        cycleCaregiverAlert,
        takeDose,
        snoozeDose,
        addMedicine,
        toggleCaregiver,
        sendReportToDoctor,
        resetDemoData,
        handleLogin,
        nextMedicine,
        calculatePercentage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  }
  return context;
};
