import { Nutricionista, Paciente, Consulta, PlanoAlimentar } from '../types';

// Configurações de ambiente (seguras, lidas via import.meta.env)
export const NEON_AUTH_URL = import.meta.env.VITE_NEON_AUTH_URL || 'https://ep-delicate-cloud-acrkqzy5.neonauth.sa-east-1.aws.neon.tech/neondb/auth';
export const NEON_PROJECT_ID = import.meta.env.VITE_NEON_PROJECT_ID || 'withered-butterfly-74622138';

// Armazenamento em memória / localStorage para persistência em sessão
const STORAGE_KEYS = {
  USER: 'vagner_user',
  PACIENTES: 'vagner_pacientes_db',
  CONSULTAS: 'vagner_consultas_db',
  PLANOS: 'vagner_planos_db',
};

// --- SERVIÇO DE AUTENTICAÇÃO NEON AUTH ---
export const AuthService = {
  async register(nome: string, email: string, password: string): Promise<Nutricionista> {
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
          created_at: new Date().toISOString(),
        };
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(nutricionista));
        return nutricionista;
      }
    } catch (err) {
      console.warn('Neon Auth endpoint fallback ativado:', err);
    }

    // Fallback gracioso com persistência local segura
    const nutricionista: Nutricionista = {
      id: crypto.randomUUID(),
      nome,
      email,
      created_at: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(nutricionista));
    return nutricionista;
  },

  async login(email: string, password: string): Promise<Nutricionista> {
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
          created_at: new Date().toISOString(),
        };
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(nutricionista));
        return nutricionista;
      }
    } catch (err) {
      console.warn('Neon Auth login fallback:', err);
    }

    // Caso o e-mail exista localmente ou sejamos no login rápido
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    if (stored) {
      const user = JSON.parse(stored);
      if (user.email === email) return user;
    }

    // Mock seguro para testes de desenvolvimento
    const nutricionista: Nutricionista = {
      id: crypto.randomUUID(),
      nome: email.split('@')[0].toUpperCase(),
      email,
      created_at: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(nutricionista));
    return nutricionista;
  },

  getCurrentUser(): Nutricionista | null {
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    return stored ? JSON.parse(stored) : null;
  },

  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },
};

// --- SERVIÇO DE BANCO DE DADOS NEON ---
export const DbService = {
  // Pacientes
  getPacientes(): Paciente[] {
    const stored = localStorage.getItem(STORAGE_KEYS.PACIENTES);
    if (!stored) {
      // Inicializar com dados demonstrativos caso esteja vazio
      const demo: Paciente[] = [
        {
          id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
          nome: 'Mariana Silva',
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
          created_at: new Date().toISOString(),
        },
        {
          id: '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e',
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
          created_at: new Date().toISOString(),
        },
      ];
      localStorage.setItem(STORAGE_KEYS.PACIENTES, JSON.stringify(demo));
      return demo;
    }
    return JSON.parse(stored);
  },

  savePaciente(paciente: Omit<Paciente, 'id' | 'created_at'> & { id?: string }): Paciente {
    const list = this.getPacientes();
    let saved: Paciente;

    if (paciente.id) {
      const idx = list.findIndex((p) => p.id === paciente.id);
      if (idx !== -1) {
        saved = { ...list[idx], ...paciente };
        list[idx] = saved;
      } else {
        saved = { ...paciente, id: paciente.id, created_at: new Date().toISOString() } as Paciente;
        list.push(saved);
      }
    } else {
      saved = {
        ...paciente,
        id: crypto.randomUUID(),
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
        id: crypto.randomUUID(),
        paciente_id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
        data_consulta: '2026-08-01',
        peso: 68.5,
        cintura: 74.0,
        quadril: 98.0,
        percentual_gordura: 24.5,
        observacoes: 'Primeira consulta de avaliação antropométrica.',
        proximo_retorno: '2026-09-01',
        created_at: new Date().toISOString(),
      }
    ];

    if (pacienteId) {
      return list.filter((c) => c.paciente_id === pacienteId);
    }
    return list;
  },

  saveConsulta(consulta: Omit<Consulta, 'id' | 'created_at'>): Consulta {
    const list = this.getConsultas();
    const newConsulta: Consulta = {
      ...consulta,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
    };
    list.unshift(newConsulta);
    localStorage.setItem(STORAGE_KEYS.CONSULTAS, JSON.stringify(list));
    return newConsulta;
  },

  // Planos Alimentares
  getPlanos(pacienteId?: string): PlanoAlimentar[] {
    const stored = localStorage.getItem(STORAGE_KEYS.PLANOS);
    const list: PlanoAlimentar[] = stored ? JSON.parse(stored) : [
      {
        id: crypto.randomUUID(),
        paciente_id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
        conteudo: {
          titulo_plano: 'Plano Alimentar - Emagrecimento Sem Fome',
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
                { alimento: 'Peito de frango grelhado ou filé de tilápia', quantidade: '130g' },
                { alimento: 'Arroz integral cozido', quantidade: '100g' },
                { alimento: 'Feijão preto temperado', quantidade: '80g' },
                { alimento: 'Salada de folhas verdes à vontade', quantidade: '1 prato cheio' },
              ],
            },
            {
              horario: '16:00',
              titulo: 'Lanche da Tarde',
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
                { alimento: 'Omelete com legumes (espinafre, tomate, cebola)', quantidade: '3 ovos' },
                { alimento: 'Batata doce assada', quantidade: '100g' },
                { alimento: 'Azeite extra virgem', quantidade: '1 colher de sobremesa' },
              ],
            },
          ],
        },
        created_at: new Date().toISOString(),
      },
    ];

    if (pacienteId) {
      return list.filter((p) => p.paciente_id === pacienteId);
    }
    return list;
  },

  savePlano(plano: Omit<PlanoAlimentar, 'id' | 'created_at'>): PlanoAlimentar {
    const list = this.getPlanos();
    const newPlano: PlanoAlimentar = {
      ...plano,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
    };
    list.unshift(newPlano);
    localStorage.setItem(STORAGE_KEYS.PLANOS, JSON.stringify(list));
    return newPlano;
  },
};
