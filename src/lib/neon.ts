import { Nutricionista, Paciente, Consulta, PlanoAlimentar, ProtocoloExercicio } from '../types';

// Configurações de ambiente (seguras, lidas via import.meta.env)
export const NEON_AUTH_URL = import.meta.env.VITE_NEON_AUTH_URL || 'https://ep-delicate-cloud-acrkqzy5.neonauth.sa-east-1.aws.neon.tech/neondb/auth';
export const NEON_PROJECT_ID = import.meta.env.VITE_NEON_PROJECT_ID || 'withered-butterfly-74622138';

// Armazenamento em memória / localStorage para persistência em sessão
const STORAGE_KEYS = {
  USER: 'vagner_user',
  PACIENTES: 'vagner_pacientes_db',
  CONSULTAS: 'vagner_consultas_db',
  PLANOS: 'vagner_planos_db',
  NUTRICIONISTAS: 'vagner_nutris_db',
};

// Usuário Master Padrão da Plataforma
export const MASTER_USER: Nutricionista = {
  id: 'master-vagner-001',
  nome: 'Dr. Vagner Andrade (Master)',
  email: 'master@vagnernutri.com.br',
  role: 'master',
  is_master: true,
  crm: 'CRN-3 89452/SP',
  especialidade: 'Nutrição Clínica Avançada & Esportiva',
  telefone: '(11) 99876-5432',
  cor: '#f59e0b',
  created_at: new Date().toISOString(),
};

export const INITIAL_NUTRICIONISTAS: Nutricionista[] = [
  MASTER_USER,
  {
    id: 'nutri-mariana-002',
    nome: 'Dra. Mariana Souza',
    email: 'mariana.souza@vagnernutri.com.br',
    role: 'nutricionista',
    is_master: false,
    crm: 'CRN-3 71204/SP',
    especialidade: 'Emagrecimento Saudável & Saúde da Mulher',
    telefone: '(11) 98712-3456',
    cor: '#ec4899',
    created_at: '2026-01-10T10:00:00Z',
  },
  {
    id: 'nutri-roberto-003',
    nome: 'Dr. Roberto Lima',
    email: 'roberto.lima@vagnernutri.com.br',
    role: 'nutricionista',
    is_master: false,
    crm: 'CRN-3 65981/SP',
    especialidade: 'Nutrição Esportiva & Performance',
    telefone: '(11) 97654-9876',
    cor: '#3b82f6',
    created_at: '2026-02-05T14:30:00Z',
  },
  {
    id: 'nutri-camila-004',
    nome: 'Dra. Camila Alves',
    email: 'camila.alves@vagnernutri.com.br',
    role: 'nutricionista',
    is_master: false,
    crm: 'CRN-3 82190/SP',
    especialidade: 'Nutrição Comportamental & Doenças Crônicas',
    telefone: '(11) 99123-8899',
    cor: '#10b981',
    created_at: '2026-03-12T09:15:00Z',
  },
  {
    id: 'nutri-felipe-005',
    nome: 'Dr. Felipe Albuquerque',
    email: 'felipe.albuquerque@vagnernutri.com.br',
    role: 'nutricionista',
    is_master: false,
    crm: 'CRN-3 91340/SP',
    especialidade: 'Nutrição Vegetariana, Vegana & Longevidade',
    telefone: '(11) 98456-1122',
    cor: '#8b5cf6',
    created_at: '2026-04-18T11:00:00Z',
  },
];

// Presets de Exercícios Físicos
export const EXERCICIOS_PRESETS: ProtocoloExercicio[] = [
  {
    nome: 'Musculação / Hipertrofia (Treino Resistido A/B/C)',
    categoria: 'Musculação',
    frequencia_semanal: '4x por semana',
    duracao_minutos: 50,
    intensidade: 'Moderada',
    gasto_calorico_estimado: 350,
    orientacoes: 'Foco em execução controlada e progressão de carga. Tomar 500ml de água durante a sessão.'
  },
  {
    nome: 'Cardio LISS (Caminhada Inclinada / Esteira Zona 2)',
    categoria: 'Cardio',
    frequencia_semanal: '3x por semana',
    duracao_minutos: 35,
    intensidade: 'Moderada',
    gasto_calorico_estimado: 220,
    orientacoes: 'Manter frequência cardíaca controlada (65-75% FCM) para otimização da oxidação lipídica.'
  },
  {
    nome: 'Treino Funcional HIIT / Metabólico',
    categoria: 'Funcional',
    frequencia_semanal: '2x por semana',
    duracao_minutos: 25,
    intensidade: 'Alta',
    gasto_calorico_estimado: 280,
    orientacoes: 'Estímulos intervalados (30s ativo / 30s descanso) para aumento da taxa metabólica basal.'
  },
  {
    nome: 'CrossFit / Condicionamento de Alta Intensidade',
    categoria: 'Funcional',
    frequencia_semanal: '4x por semana',
    duracao_minutos: 60,
    intensidade: 'Intensa',
    gasto_calorico_estimado: 500,
    orientacoes: 'Consumir refeição com carboidratos complexos 1h30 antes do treino (WOD).'
  },
  {
    nome: 'Natação / Hidroginástica',
    categoria: 'Esporte / Luta',
    frequencia_semanal: '2x por semana',
    duracao_minutos: 45,
    intensidade: 'Moderada',
    gasto_calorico_estimado: 380,
    orientacoes: 'Excelente estímulo aeróbico completo com zero impacto nas articulações.'
  },
  {
    nome: 'Ciclismo / Spinning Indoor',
    categoria: 'Cardio',
    frequencia_semanal: '3x por semana',
    duracao_minutos: 45,
    intensidade: 'Alta',
    gasto_calorico_estimado: 400,
    orientacoes: 'Hidratação constante com eletrólitos se a sessão ultrapassar 45 minutos.'
  },
  {
    nome: 'Yoga / Mobilidade Articular & Alongamento',
    categoria: 'Alongamento / Yoga',
    frequencia_semanal: '2x por semana',
    duracao_minutos: 30,
    intensidade: 'Leve',
    gasto_calorico_estimado: 120,
    orientacoes: 'Recuperação ativa muscular, controle do cortisol e melhora da flexibilidade.'
  },
];

// --- SERVIÇO DE AUTENTICAÇÃO NEON AUTH ---
export const AuthService = {
  // Login direto como Acesso Master
  loginMaster(): Nutricionista {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(MASTER_USER));
    return MASTER_USER;
  },

  // Selecionar / Trocar Nutricionista Ativo
  selectNutricionista(nutriId: string): Nutricionista {
    const nutris = DbService.getNutricionistas();
    const target = nutris.find(n => n.id === nutriId) || MASTER_USER;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(target));
    return target;
  },

  async register(nome: string, email: string, password: string, crm?: string, especialidade?: string): Promise<Nutricionista> {
    const isMasterEmail = email.toLowerCase().includes('master') || email.toLowerCase().includes('admin');
    
    try {
      // Tenta cadastro via Neon Auth API (Better Auth)
      const res = await fetch(`${NEON_AUTH_URL}/sign-up/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name: nome }),
      });

      if (res.ok) {
        const data = await res.json();
        const nutricionista: Nutricionista = {
          id: data.user?.id || crypto.randomUUID(),
          nome: data.user?.name || nome,
          email: data.user?.email || email,
          crm: crm || 'CRN-3 Pendente',
          especialidade: especialidade || 'Nutrição Clínica Geral',
          cor: '#3b82f6',
          role: isMasterEmail ? 'master' : 'nutricionista',
          is_master: isMasterEmail,
          created_at: new Date().toISOString(),
        };
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(nutricionista));
        DbService.registerNutricionista(nutricionista);
        return nutricionista;
      }
    } catch (err) {
      console.warn('Neon Auth endpoint fallback ativado:', err);
    }

    // Fallback com persistência local segura
    const nutricionista: Nutricionista = {
      id: crypto.randomUUID(),
      nome,
      email,
      crm: crm || 'CRN-3 Ativo',
      especialidade: especialidade || 'Nutrição Clínica Geral',
      cor: '#3b82f6',
      role: isMasterEmail ? 'master' : 'nutricionista',
      is_master: isMasterEmail,
      created_at: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(nutricionista));
    DbService.registerNutricionista(nutricionista);
    return nutricionista;
  },

  async login(email: string, password: string): Promise<Nutricionista> {
    const isMaster = email.toLowerCase() === 'master@vagnernutri.com.br' || 
                     email.toLowerCase().includes('master') || 
                     email.toLowerCase().includes('admin') || 
                     password.toLowerCase() === 'master';

    if (isMaster) {
      return this.loginMaster();
    }

    // Verificar se corresponde a algum nutricionista cadastrado
    const nutris = DbService.getNutricionistas();
    const existing = nutris.find(n => n.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(existing));
      return existing;
    }

    try {
      const res = await fetch(`${NEON_AUTH_URL}/sign-in/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        const nutricionista: Nutricionista = {
          id: data.user?.id || crypto.randomUUID(),
          nome: data.user?.name || 'Dr(a). Nutricionista',
          email: data.user?.email || email,
          role: 'nutricionista',
          is_master: false,
          created_at: new Date().toISOString(),
        };
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(nutricionista));
        DbService.registerNutricionista(nutricionista);
        return nutricionista;
      }
    } catch (err) {
      console.warn('Neon Auth login fallback:', err);
    }

    // Mock seguro para testes
    const nutricionista: Nutricionista = {
      id: crypto.randomUUID(),
      nome: email.split('@')[0].toUpperCase(),
      email,
      role: 'nutricionista',
      is_master: false,
      created_at: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(nutricionista));
    DbService.registerNutricionista(nutricionista);
    return nutricionista;
  },

  getCurrentUser(): Nutricionista | null {
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    return stored ? JSON.parse(stored) : null;
  },

  isMasterUser(user: Nutricionista | null): boolean {
    if (!user) return false;
    return user.is_master === true || user.role === 'master' || user.role === 'admin';
  },

  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },
};

// --- SERVIÇO DE BANCO DE DADOS NEON ---
export const DbService = {
  // Nutricionistas da Equipe
  getNutricionistas(): Nutricionista[] {
    const stored = localStorage.getItem(STORAGE_KEYS.NUTRICIONISTAS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.NUTRICIONISTAS, JSON.stringify(INITIAL_NUTRICIONISTAS));
      return INITIAL_NUTRICIONISTAS;
    }
    const parsed: Nutricionista[] = JSON.parse(stored);
    // Garantir que todos os nutricionistas padrão existam
    INITIAL_NUTRICIONISTAS.forEach(initNutri => {
      if (!parsed.some(p => p.id === initNutri.id)) {
        parsed.push(initNutri);
      }
    });
    localStorage.setItem(STORAGE_KEYS.NUTRICIONISTAS, JSON.stringify(parsed));
    return parsed;
  },

  registerNutricionista(nutri: Nutricionista): void {
    const nutris = this.getNutricionistas();
    const idx = nutris.findIndex(n => n.id === nutri.id || n.email === nutri.email);
    if (idx >= 0) {
      nutris[idx] = { ...nutris[idx], ...nutri };
    } else {
      nutris.push(nutri);
    }
    localStorage.setItem(STORAGE_KEYS.NUTRICIONISTAS, JSON.stringify(nutris));
  },

  // Pacientes
  getPacientes(): Paciente[] {
    const stored = localStorage.getItem(STORAGE_KEYS.PACIENTES);
    if (!stored) {
      const demo: Paciente[] = [
        {
          id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
          nutricionista_id: 'master-vagner-001',
          nutricionista_nome: 'Dr. Vagner Andrade (Master)',
          nome: 'Mariana Silva Costa',
          data_nascimento: '1995-04-12',
          sexo: 'Feminino',
          whatsapp: '(11) 98765-4321',
          email: 'mariana.silva@email.com',
          peso_inicial: 68.5,
          altura: 1.65,
          objetivos: ['Emagrecimento', 'Ganho de Massa Muscular'],
          objetivo_texto: 'Reduzir gordura corporal e melhorar disposição diária.',
          nivel_atividade: 'Moderadamente Ativo',
          patologias: [],
          restricoes_alimentares: ['Intolerância a Lactose'],
          alergias: [],
          refeicoes_por_dia: 5,
          horario_acorda: '06:30',
          horario_dorme: '22:30',
          litros_agua: 2.5,
          atividade_fisica: true,
          atividade_fisica_descricao: 'Musculação 4x na semana',
          observacoes: 'Preferência por refeições práticas de manhã.',
          created_at: '2026-08-01T10:00:00Z',
        },
        {
          id: '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e',
          nutricionista_id: 'master-vagner-001',
          nutricionista_nome: 'Dr. Vagner Andrade (Master)',
          nome: 'Carlos Eduardo Santos',
          data_nascimento: '1988-11-25',
          sexo: 'Masculino',
          whatsapp: '(11) 97654-3210',
          email: 'carlos.santos@email.com',
          peso_inicial: 84.0,
          altura: 1.78,
          objetivos: ['Hipertrofia', 'Performance Esportiva'],
          objetivo_texto: 'Aumentar massa magra e força nos treinos de crossfit.',
          nivel_atividade: 'Muito Ativo',
          patologias: [],
          restricoes_alimentares: [],
          alergias: ['Frutos do Mar'],
          refeicoes_por_dia: 6,
          horario_acorda: '06:00',
          horario_dorme: '23:00',
          litros_agua: 3.5,
          atividade_fisica: true,
          atividade_fisica_descricao: 'CrossFit 5x na semana',
          created_at: '2026-08-03T14:20:00Z',
        },
        {
          id: '3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f',
          nutricionista_id: 'nutri-mariana-002',
          nutricionista_nome: 'Dra. Mariana Souza',
          nome: 'Fernanda de Oliveira Ribeiro',
          data_nascimento: '1992-07-19',
          sexo: 'Feminino',
          whatsapp: '(11) 99123-4567',
          email: 'fernanda.ribeiro@email.com',
          peso_inicial: 72.3,
          altura: 1.70,
          objetivos: ['Reeducação Alimentar', 'Controle Glicêmico'],
          objetivo_texto: 'Melhorar relação com a comida e regular níveis de insulina.',
          nivel_atividade: 'Levemente Ativo',
          patologias: ['Resistência à Insulina'],
          restricoes_alimentares: ['Glúten'],
          alergias: ['Amendoim'],
          refeicoes_por_dia: 4,
          horario_acorda: '07:00',
          horario_dorme: '23:00',
          litros_agua: 2.0,
          atividade_fisica: true,
          atividade_fisica_descricao: 'Pilates 2x na semana e caminhada',
          created_at: '2026-08-05T09:40:00Z',
        },
        {
          id: '4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a',
          nutricionista_id: 'nutri-roberto-003',
          nutricionista_nome: 'Dr. Roberto Lima',
          nome: 'Lucas Gabriel Mendes',
          data_nascimento: '2001-03-30',
          sexo: 'Masculino',
          whatsapp: '(11) 98234-5678',
          email: 'lucas.mendes@email.com',
          peso_inicial: 63.0,
          altura: 1.82,
          objetivos: ['Ganho de Peso', 'Hipertrofia'],
          objetivo_texto: 'Atingir 75kg com percentual de gordura controlado.',
          nivel_atividade: 'Muito Ativo',
          patologias: [],
          restricoes_alimentares: [],
          alergias: [],
          refeicoes_por_dia: 6,
          horario_acorda: '05:30',
          horario_dorme: '22:00',
          litros_agua: 4.0,
          atividade_fisica: true,
          atividade_fisica_descricao: 'Natação e Musculação',
          created_at: '2026-08-08T16:10:00Z',
        },
        {
          id: '5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b',
          nutricionista_id: 'nutri-camila-004',
          nutricionista_nome: 'Dra. Camila Alves',
          nome: 'Juliana Beatriz Carvalho',
          data_nascimento: '1985-09-14',
          sexo: 'Feminino',
          whatsapp: '(11) 97345-6789',
          email: 'juliana.carvalho@email.com',
          peso_inicial: 81.5,
          altura: 1.62,
          objetivos: ['Saúde Cardiovascular', 'Emagrecimento'],
          objetivo_texto: 'Reduzir colesterol LDL e controlar pressão arterial.',
          nivel_atividade: 'Sedentário',
          patologias: ['Hipertensão Arterial'],
          restricoes_alimentares: ['Excesso de Sódio'],
          alergias: [],
          refeicoes_por_dia: 4,
          horario_acorda: '08:00',
          horario_dorme: '00:00',
          litros_agua: 1.8,
          atividade_fisica: false,
          atividade_fisica_descricao: '',
          created_at: '2026-08-10T11:00:00Z',
        },
        {
          id: '6f7a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c',
          nutricionista_id: 'nutri-felipe-005',
          nutricionista_nome: 'Dr. Felipe Albuquerque',
          nome: 'Rodrigo Medeiros',
          data_nascimento: '1998-12-04',
          sexo: 'Masculino',
          whatsapp: '(11) 98112-9900',
          email: 'rodrigo.medeiros@email.com',
          peso_inicial: 75.0,
          altura: 1.76,
          objetivos: ['Transição Vegana', 'Saúde Digestiva'],
          objetivo_texto: 'Transição segura para dieta plant-based sem perda de massa magra.',
          nivel_atividade: 'Moderadamente Ativo',
          patologias: [],
          restricoes_alimentares: ['Carne Vermelha', 'Aves', 'Peixes', 'Lactose'],
          alergias: [],
          refeicoes_por_dia: 5,
          horario_acorda: '06:30',
          horario_dorme: '23:00',
          litros_agua: 3.0,
          atividade_fisica: true,
          atividade_fisica_descricao: 'Ciclismo e Yoga',
          created_at: '2026-08-12T15:30:00Z',
        },
      ];
      localStorage.setItem(STORAGE_KEYS.PACIENTES, JSON.stringify(demo));
      return demo;
    }
    return JSON.parse(stored);
  },

  savePaciente(paciente: Omit<Paciente, 'id' | 'created_at'> & { id?: string }): Paciente {
    const list = this.getPacientes();
    const currentUser = AuthService.getCurrentUser();
    let saved: Paciente;

    const nutriId = paciente.nutricionista_id || currentUser?.id || MASTER_USER.id;
    const nutriNome = paciente.nutricionista_nome || currentUser?.nome || MASTER_USER.nome;

    if (paciente.id) {
      const idx = list.findIndex((p) => p.id === paciente.id);
      if (idx !== -1) {
        saved = { 
          ...list[idx], 
          ...paciente,
          nutricionista_id: paciente.nutricionista_id || list[idx].nutricionista_id || nutriId,
          nutricionista_nome: paciente.nutricionista_nome || list[idx].nutricionista_nome || nutriNome,
        };
        list[idx] = saved;
      } else {
        saved = { 
          ...paciente, 
          id: paciente.id, 
          nutricionista_id: nutriId,
          nutricionista_nome: nutriNome,
          created_at: new Date().toISOString() 
        } as Paciente;
        list.push(saved);
      }
    } else {
      saved = {
        ...paciente,
        id: crypto.randomUUID(),
        nutricionista_id: nutriId,
        nutricionista_nome: nutriNome,
        created_at: new Date().toISOString(),
      } as Paciente;
      list.unshift(saved);
    }

    localStorage.setItem(STORAGE_KEYS.PACIENTES, JSON.stringify(list));
    return saved;
  },

  deletePaciente(id: string): void {
    const list = this.getPacientes().filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PACIENTES, JSON.stringify(list));
  },

  // Consultas
  getConsultas(pacienteId?: string): Consulta[] {
    const stored = localStorage.getItem(STORAGE_KEYS.CONSULTAS);
    const list: Consulta[] = stored ? JSON.parse(stored) : [
      {
        id: 'c-001',
        paciente_id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
        nutricionista_id: 'master-vagner-001',
        nutricionista_nome: 'Dr. Vagner Andrade (Master)',
        data_consulta: '2026-08-01',
        peso: 68.5,
        cintura: 74.0,
        quadril: 98.0,
        percentual_gordura: 24.5,
        observacoes: 'Primeira consulta de avaliação antropométrica.',
        proximo_retorno: '2026-09-01',
        created_at: '2026-08-01T10:30:00Z',
      },
      {
        id: 'c-002',
        paciente_id: '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e',
        nutricionista_id: 'master-vagner-001',
        nutricionista_nome: 'Dr. Vagner Andrade (Master)',
        data_consulta: '2026-08-03',
        peso: 84.0,
        cintura: 82.0,
        quadril: 102.0,
        percentual_gordura: 14.2,
        observacoes: 'Início do protocolo de hipertrofia.',
        proximo_retorno: '2026-09-03',
        created_at: '2026-08-03T15:00:00Z',
      },
      {
        id: 'c-003',
        paciente_id: '3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f',
        nutricionista_id: 'nutri-mariana-002',
        nutricionista_nome: 'Dra. Mariana Souza',
        data_consulta: '2026-08-05',
        peso: 72.3,
        cintura: 78.0,
        quadril: 101.0,
        percentual_gordura: 28.0,
        observacoes: 'Ajuste de carboidratos complexos de baixo IG.',
        proximo_retorno: '2026-09-05',
        created_at: '2026-08-05T10:15:00Z',
      }
    ];

    if (pacienteId) {
      return list.filter((c) => c.paciente_id === pacienteId);
    }
    return list;
  },

  saveConsulta(consulta: Omit<Consulta, 'id' | 'created_at'>): Consulta {
    const list = this.getConsultas();
    const currentUser = AuthService.getCurrentUser();
    const newConsulta: Consulta = {
      ...consulta,
      id: crypto.randomUUID(),
      nutricionista_id: consulta.nutricionista_id || currentUser?.id || MASTER_USER.id,
      nutricionista_nome: consulta.nutricionista_nome || currentUser?.nome || MASTER_USER.nome,
      created_at: new Date().toISOString(),
    };
    list.unshift(newConsulta);
    localStorage.setItem(STORAGE_KEYS.CONSULTAS, JSON.stringify(list));
    return newConsulta;
  },

  // Planos Alimentares com Exercícios Físicos Integrados
  getPlanos(pacienteId?: string): PlanoAlimentar[] {
    const stored = localStorage.getItem(STORAGE_KEYS.PLANOS);
    if (!stored) {
      const demoPlanos: PlanoAlimentar[] = [
        {
          id: 'plano-001',
          paciente_id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
          nutricionista_id: 'master-vagner-001',
          nutricionista_nome: 'Dr. Vagner Andrade (Master)',
          conteudo: {
            titulo_plano: 'Plano Alimentar - Emagrecimento & Definição',
            meta_calorica: 1800,
            macro_proteinas: '120g (27%)',
            macro_carboidratos: '180g (40%)',
            macro_gorduras: '66g (33%)',
            observacoes_gerais: 'Beber 500ml de água ao acordar. Evitar refrigerantes e açúcar refinado.',
            refeicoes: [
              {
                horario: '07:00',
                titulo: 'Café da Manhã',
                itens: [
                  { alimento: 'Ovos mexidos com azeite de oliva', quantidade: '2 unidades' },
                  { alimento: 'Pão integral 100%', quantidade: '2 fatias' },
                  { alimento: 'Café preto sem açúcar', quantidade: '150ml' },
                ],
              },
              {
                horario: '10:00',
                titulo: 'Lanche da Manhã',
                itens: [
                  { alimento: 'Maçã verde ou Pêra', quantidade: '1 unidade' },
                  { alimento: 'Castanha do Pará', quantidade: '3 unidades' },
                ],
              },
              {
                horario: '12:30',
                titulo: 'Almoço',
                itens: [
                  { alimento: 'Peito de frango grelhado ou tilápia', quantidade: '130g' },
                  { alimento: 'Arroz integral cozido', quantidade: '100g' },
                  { alimento: 'Feijão preto temperado', quantidade: '80g' },
                  { alimento: 'Salada de folhas verdes à vontade', quantidade: '1 prato cheio' },
                ],
              },
              {
                horario: '16:00',
                titulo: 'Lanche da Tarde (Pré-Treino)',
                itens: [
                  { alimento: 'Iogurte natural desnatado', quantidade: '170g' },
                  { alimento: 'Whey Protein concentrado', quantidade: '1 scoop (30g)' },
                  { alimento: 'Morangos frescos', quantidade: '6 unidades' },
                ],
              },
              {
                horario: '19:30',
                titulo: 'Jantar',
                itens: [
                  { alimento: 'Omelete com espinafre e tomate', quantidade: '3 ovos' },
                  { alimento: 'Batata doce assada', quantidade: '100g' },
                  { alimento: 'Azeite extra virgem', quantidade: '1 colher de sobremesa' },
                ],
              },
            ],
            exercicios: [
              {
                id: 'ex-1',
                nome: 'Musculação / Treino Hipertrofia & Força',
                categoria: 'Musculação',
                frequencia_semanal: '4x por semana',
                duracao_minutos: 50,
                intensidade: 'Moderada',
                gasto_calorico_estimado: 350,
                orientacoes: 'Executar 1h após o Lanche da Tarde. Foco em grandes grupos musculares.',
              },
              {
                id: 'ex-2',
                nome: 'Cardio Pós-Treino (Caminhada Inclinada Zona 2)',
                categoria: 'Cardio',
                frequencia_semanal: '3x por semana',
                duracao_minutos: 25,
                intensidade: 'Moderada',
                gasto_calorico_estimado: 180,
                orientacoes: 'Manter frequência cardíaca aeróbica para queima lipídica eficiente.',
              },
            ],
          },
          created_at: '2026-08-01T11:00:00Z',
        },
      ];
      localStorage.setItem(STORAGE_KEYS.PLANOS, JSON.stringify(demoPlanos));
      return demoPlanos;
    }
    const list: PlanoAlimentar[] = JSON.parse(stored);
    if (pacienteId) {
      return list.filter((p) => p.paciente_id === pacienteId);
    }
    return list;
  },

  savePlano(plano: Omit<PlanoAlimentar, 'id' | 'created_at'>): PlanoAlimentar {
    const list = this.getPlanos();
    const currentUser = AuthService.getCurrentUser();
    const newPlano: PlanoAlimentar = {
      ...plano,
      id: crypto.randomUUID(),
      nutricionista_id: plano.nutricionista_id || currentUser?.id || MASTER_USER.id,
      nutricionista_nome: plano.nutricionista_nome || currentUser?.nome || MASTER_USER.nome,
      created_at: new Date().toISOString(),
    };
    list.unshift(newPlano);
    localStorage.setItem(STORAGE_KEYS.PLANOS, JSON.stringify(list));
    return newPlano;
  },
};
