export const initialMockData = {
  // Usuária principal (Idosa)
  user: {
    id: 'user-maria',
    name: 'Dona Maria Souza',
    age: 72,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    streakDays: 7,
    todayTakenCount: 2,
    todayTotalCount: 4,
    phone: '(11) 98765-4321',
    authorizedDate: '02/11/2026',
  },

  // Perfil Responsável / Cuidador
  caregiverUser: {
    id: 'caregiver-ana',
    name: 'Ana Souza',
    roleLabel: 'Filha da Dona Maria',
    email: 'ana.souza@email.com',
    phone: '(11) 97123-4567',
  },

  // Perfil Médico
  doctorUser: {
    id: 'doctor-helena',
    name: 'Dra. Helena Martins',
    specialty: 'Cardiologista',
    crm: '123456-SP',
    email: 'dra.helena@clinica.com.br',
    clinic: 'Instituto do Coração & Longevidade',
    lastReportDate: 'Ontem às 18:30',
  },
  // Alias doctor para compatibilidade
  doctor: {
    id: 'doctor-helena',
    name: 'Dra. Helena Martins',
    specialty: 'Cardiologista',
    crm: '123456-SP',
    email: 'dra.helena@clinica.com.br',
    clinic: 'Instituto do Coração & Longevidade',
    lastReportDate: 'Ontem às 18:30',
  },

  // Cuidadores vinculados à Dona Maria (máx 2)
  caregivers: [
    {
      id: 'c1',
      name: 'Ana',
      relation: 'filha',
      initialLetter: 'A',
      colorTheme: 'purple', // avatar lilás
      active: true,
      alertMinutes: 30, // 15 | 30 | 60
      phone: '(11) 97123-4567',
      isPrimary: true,
      receivesAlerts: true
    },
    {
      id: 'c2',
      name: 'Pedro',
      relation: 'neto',
      initialLetter: 'P',
      colorTheme: 'teal', // avatar verde-água
      active: true,
      alertMinutes: 30,
      phone: '(11) 96543-2109',
      isPrimary: false,
      receivesAlerts: true
    }
  ],

  // Relatórios recebidos pela Dra. Helena
  doctorReports: [
    {
      id: 'rep-prev',
      patientId: 'user-maria',
      patientName: 'Dona Maria Souza',
      date: '02/11/2026 às 18:00',
      isNew: false,
      title: 'Relatório Semanal de Adesão',
      adherenceRate: '93%',
      dosesTaken: 26,
      dosesTotal: 28,
    }
  ],

  // Remédios cadastrados - Estado Inicial Estrito: 2 de 4 tomadas
  medicines: [
    {
      id: 'med-1',
      name: 'Losartana',
      dose: '50 mg',
      category: 'Pressão',
      timeSlot: 'Manhã',
      time: '08:00',
      instruction: 'Tomar pela manhã com um copo de água',
      status: 'tomado', // Tomado às 08:05
      takenAt: 'Hoje às 08:05',
      snoozedMinutes: 0,
      active: true,
      isNext: false,
    },
    {
      id: 'med-2',
      name: 'Vitamina D',
      dose: '1 gota (5.000 UI)',
      category: 'Suplemento',
      timeSlot: 'Manhã',
      time: '09:00',
      instruction: 'Após o café da manhã',
      status: 'tomado', // Tomado às 09:12
      takenAt: 'Hoje às 09:12',
      snoozedMinutes: 0,
      active: true,
      isNext: false,
    },
    {
      id: 'med-3',
      name: 'Metformina',
      dose: '850 mg',
      category: 'Diabetes',
      timeSlot: 'Tarde',
      time: '12:30',
      instruction: 'Após o almoço, não tomar em jejum',
      status: 'pendente', // Pendente (Próximo)
      takenAt: null,
      snoozedMinutes: 0,
      active: true,
      isNext: true,
    },
    {
      id: 'med-4',
      name: 'Losartana',
      dose: '50 mg',
      category: 'Pressão',
      timeSlot: 'Noite',
      time: '19:30',
      instruction: 'Antes do jantar',
      status: 'pendente', // Pendente
      takenAt: null,
      snoozedMinutes: 0,
      active: true,
      isNext: false,
    }
  ],

  // Relatório semanal (contagens brutas - porcentagens sempre calculadas dinamicamente)
  weeklyStats: {
    dosesTaken: 26,
    dosesTotal: 28,
    missedReason: '1 Losartana (quinta à noite) e 1 Metformina (terça ao meio-dia)',
    // 7 marcadores em forma de gota (S T Q Q S S D)
    // Na referência, o quarto marcador (quinta) é rosa (dose esquecida)
    days: [
      { day: 'S', dayFull: 'Segunda', taken: 4, total: 4, status: 'complete' }, // Ciano com check
      { day: 'T', dayFull: 'Terça', taken: 4, total: 4, status: 'complete' },   // Ciano com check
      { day: 'Q', dayFull: 'Quarta', taken: 4, total: 4, status: 'complete' },  // Ciano com check
      { day: 'Q', dayFull: 'Quinta', taken: 3, total: 4, status: 'missed' },    // Rosa sem check
      { day: 'S', dayFull: 'Sexta', taken: 4, total: 4, status: 'complete' },   // Ciano com check
      { day: 'S', dayFull: 'Sábado', taken: 4, total: 4, status: 'complete' },  // Ciano com check
      { day: 'D', dayFull: 'Domingo', taken: 3, total: 4, status: 'in-progress' }, // Ciano ou atual
    ],
    adherenceByMed: [
      { id: 'losartana', name: 'Losartana 50 mg', taken: 13, total: 14, category: 'Pressão' },
      { id: 'metformina', name: 'Metformina 850 mg', taken: 6, total: 7, category: 'Diabetes' },
      { id: 'vitamina-d', name: 'Vitamina D', taken: 7, total: 7, category: 'Suplemento' },
    ]
  },

  // Pacientes autorizados da Dra. Helena
  doctorPatients: [
    {
      id: 'user-maria',
      name: 'Dona Maria Souza',
      age: 72,
      condition: 'Hipertensão arterial e Diabetes tipo 2',
      authorizedDate: 'Autorizado pela paciente em 02/11/2026',
      activeMedicines: 3,
      lastConfirmedDose: 'Hoje às 09:12 (Vitamina D)',
      nextDose: '12:30 (Metformina 850 mg)',
      status: 'Acompanhamento normal',
      recentAlert: 'Sem confirmação da dose das 12:30 há 30 min'
    },
    {
      id: 'patient-jose',
      name: 'Seu José Silveira',
      age: 78,
      condition: 'Insuficiência cardíaca',
      authorizedDate: 'Autorizado pelo paciente em 15/10/2026',
      activeMedicines: 4,
      lastConfirmedDose: 'Hoje às 08:30 (Carvedilol)',
      nextDose: '14:00 (Furosemida)',
      status: 'Acompanhamento normal',
      recentAlert: null
    }
  ]
};
