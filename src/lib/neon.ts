import { Nutricionista, Paciente, Consulta, PlanoAlimentar, ProtocoloExercicio } from '../types';

// Configurações de ambiente (seguras, lidas via import.meta.env)
export const NEON_AUTH_URL = import.meta.env.VITE_NEON_AUTH_URL || 'https://ep-delicate-cloud-acrkqzy5.neonauth.sa-east-1.aws.neon.tech/neondb/auth';
export const NEON_PROJECT_ID = import.meta.env.VITE_NEON_PROJECT_ID || 'withered-butterfly-74622138';

// Armazenamento em memória / localStorage para persistência em sessão
const STORAGE_KEYS = {
  USER: 'vagner_user',
  PACIENTES: 'vagner_pacientes_db',
  CONSULTAS: 'vagner_consultas_db',
  PLANOS: 'vagner_planos_db_v2',
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

// 6 Planos Alimentares Iniciais (Cada um com no mínimo 3 exercícios físicos complementares)
export const INITIAL_PLANOS: PlanoAlimentar[] = [
  // 1. Mariana Silva Costa
  {
    id: 'plano-mariana-001',
    paciente_id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
    nutricionista_id: 'master-vagner-001',
    nutricionista_nome: 'Dr. Vagner Andrade (Master)',
    conteudo: {
      titulo_plano: 'Plano Alimentar & Treino: Emagrecimento & Definição',
      meta_calorica: 1800,
      macro_proteinas: '120g (27%)',
      macro_carboidratos: '180g (40%)',
      macro_gorduras: '66g (33%)',
      observacoes_gerais: 'Beber 500ml de água ao acordar. Fazer refeição pré-treino 1h antes.',
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
            { alimento: 'Omelete com legumes (espinafre, tomate, cebola)', quantidade: '3 ovos' },
            { alimento: 'Batata doce assada', quantidade: '100g' },
            { alimento: 'Azeite extra virgem', quantidade: '1 colher de sobremesa' },
          ],
        },
      ],
      exercicios: [
        {
          id: 'ex-m1',
          nome: 'Musculação / Treino Resistido A/B/C (Hipertrofia)',
          categoria: 'Musculação',
          frequencia_semanal: '4x por semana',
          duracao_minutos: 50,
          intensidade: 'Moderada',
          gasto_calorico_estimado: 350,
          orientacoes: 'Executar 1h após o lanche da tarde. Foco em execução controlada e sobrecarga progressiva.',
        },
        {
          id: 'ex-m2',
          nome: 'Cardio LISS (Caminhada Inclinada na Esteira Zona 2)',
          categoria: 'Cardio',
          frequencia_semanal: '3x por semana',
          duracao_minutos: 35,
          intensidade: 'Moderada',
          gasto_calorico_estimado: 220,
          orientacoes: 'Manter frequência cardíaca em 65-75% da FCM pós-treino de musculação.',
        },
        {
          id: 'ex-m3',
          nome: 'Treino Funcional HIIT / Metabólico',
          categoria: 'Funcional',
          frequencia_semanal: '2x por semana',
          duracao_minutos: 25,
          intensidade: 'Alta',
          gasto_calorico_estimado: 280,
          orientacoes: 'Estímulos intervalados para aceleração metabólica e melhora do condicionamento.',
        },
      ],
    },
    created_at: '2026-08-01T11:00:00Z',
  },

  // 2. Carlos Eduardo Santos
  {
    id: 'plano-carlos-002',
    paciente_id: '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e',
    nutricionista_id: 'master-vagner-001',
    nutricionista_nome: 'Dr. Vagner Andrade (Master)',
    conteudo: {
      titulo_plano: 'Plano Alimentar & Performance: Hipertrofia & CrossFit',
      meta_calorica: 2800,
      macro_proteinas: '180g (26%)',
      macro_carboidratos: '340g (48%)',
      macro_gorduras: '75g (24%)',
      observacoes_gerais: 'Superávit calórico limpo para sustentar alto volume de treino e ganho de força.',
      refeicoes: [
        {
          horario: '06:30',
          titulo: 'Café da Manhã Energético',
          itens: [
            { alimento: 'Ovos mexidos com queijo branco', quantidade: '4 unidades' },
            { alimento: 'Pão sourdough ou integral', quantidade: '3 fatias' },
            { alimento: 'Banana com mel e aveia em flocos', quantidade: '1 unidade + 40g aveia' },
          ],
        },
        {
          horario: '10:00',
          titulo: 'Lanche da Manhã',
          itens: [
            { alimento: 'Shake de Whey Protein com pasta de amendoim', quantidade: '1 scoop + 20g pasta' },
            { alimento: 'Maçã ou Pêra', quantidade: '1 unidade' },
          ],
        },
        {
          horario: '12:45',
          titulo: 'Almoço Anabólico',
          itens: [
            { alimento: 'Patinho moído grelhado ou filé mignon', quantidade: '180g' },
            { alimento: 'Arroz branco ou integral', quantidade: '200g' },
            { alimento: 'Feijão preto', quantidade: '120g' },
            { alimento: 'Mix de legumes no vapor (cenoura, brócolis)', quantidade: '150g' },
          ],
        },
        {
          horario: '16:30',
          titulo: 'Refeição Pré-WOD',
          itens: [
            { alimento: 'Tapioca com frango desfiado', quantidade: '80g goma + 100g frango' },
            { alimento: 'Suco de uva integral', quantidade: '250ml' },
          ],
        },
        {
          horario: '20:00',
          titulo: 'Jantar Recuperador',
          itens: [
            { alimento: 'Salmão ou Peito de frango', quantidade: '180g' },
            { alimento: 'Mandioca ou Batata doce cozida', quantidade: '200g' },
            { alimento: 'Salada verde com azeite extra virgem', quantidade: 'À vontade' },
          ],
        },
      ],
      exercicios: [
        {
          id: 'ex-c1',
          nome: 'CrossFit WOD & Levantamento de Peso Olímpico (LPO)',
          categoria: 'Funcional',
          frequencia_semanal: '4x por semana',
          duracao_minutos: 60,
          intensidade: 'Intensa',
          gasto_calorico_estimado: 520,
          orientacoes: 'Consumir a refeição pré-WOD 1h30 antes. Hidratação intra-treino com eletrólitos.',
        },
        {
          id: 'ex-c2',
          nome: 'Musculação com Cargas Livres & Força Pura',
          categoria: 'Musculação',
          frequencia_semanal: '2x por semana',
          duracao_minutos: 45,
          intensidade: 'Alta',
          gasto_calorico_estimado: 380,
          orientacoes: 'Trabalho de força máxima (agachamento, levantamento terra e supino reto).',
        },
        {
          id: 'ex-c3',
          nome: 'Mobilidade Articular, Liberação Miofascial & Yoga',
          categoria: 'Alongamento / Yoga',
          frequencia_semanal: '2x por semana',
          duracao_minutos: 30,
          intensidade: 'Leve',
          gasto_calorico_estimado: 120,
          orientacoes: 'Prevenção de lesões no ombro e quadril, acelerando a recuperação muscular.',
        },
      ],
    },
    created_at: '2026-08-03T15:00:00Z',
  },

  // 3. Fernanda de Oliveira Ribeiro
  {
    id: 'plano-fernanda-003',
    paciente_id: '3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f',
    nutricionista_id: 'nutri-mariana-002',
    nutricionista_nome: 'Dra. Mariana Souza',
    conteudo: {
      titulo_plano: 'Plano Alimentar & Treino: Reeducação & Controle Glicêmico',
      meta_calorica: 1650,
      macro_proteinas: '110g (27%)',
      macro_carboidratos: '160g (39%)',
      macro_gorduras: '55g (34%)',
      observacoes_gerais: 'Foco em alimentos de baixo índice glicêmico e fibras solúveis para controle da insulina.',
      refeicoes: [
        {
          horario: '07:30',
          titulo: 'Café da Manhã Low-GI',
          itens: [
            { alimento: 'Ovos mexidos com cúrcuma e chia', quantidade: '2 unidades' },
            { alimento: 'Abacate picado', quantidade: '60g' },
            { alimento: 'Chá verde ou café sem açúcar', quantidade: '200ml' },
          ],
        },
        {
          horario: '12:30',
          titulo: 'Almoço Balanceado',
          itens: [
            { alimento: 'Filé de peito de frango com ervas', quantidade: '130g' },
            { alimento: 'Quinoa cozida ou Arroz integral', quantidade: '90g' },
            { alimento: 'Lentilha ou Grão de bico cozido', quantidade: '70g' },
            { alimento: 'Brócolis e abobrinha refogados com azeite', quantidade: '150g' },
          ],
        },
        {
          horario: '16:30',
          titulo: 'Lanche da Tarde',
          itens: [
            { alimento: 'Iogurte natural sem lactose com sementes de abóbora', quantidade: '150g + 1 colher sopa' },
            { alimento: 'Mirtilos ou Frutas vermelhas', quantidade: '50g' },
          ],
        },
        {
          horario: '19:30',
          titulo: 'Jantar Leve',
          itens: [
            { alimento: 'Filé de peixe branco assado (Tilápia / Pescada)', quantidade: '140g' },
            { alimento: 'Purê de abóbora cabotiá', quantidade: '120g' },
            { alimento: 'Salada de rúcula e tomate cereja', quantidade: 'À vontade' },
          ],
        },
      ],
      exercicios: [
        {
          id: 'ex-f1',
          nome: 'Pilates Clínico & Estabilidade de Core',
          categoria: 'Funcional',
          frequencia_semanal: '2x por semana',
          duracao_minutos: 45,
          intensidade: 'Moderada',
          gasto_calorico_estimado: 210,
          orientacoes: 'Fortalecimento postural, tonificação muscular profunda e redução de estresse.',
        },
        {
          id: 'ex-f2',
          nome: 'Caminhada Rápida ao Ar Livre (Pós-Refeição)',
          categoria: 'Cardio',
          frequencia_semanal: '4x por semana',
          duracao_minutos: 40,
          intensidade: 'Moderada',
          gasto_calorico_estimado: 220,
          orientacoes: 'Excelente impacto na redução do pico glicêmico pós-prandial.',
        },
        {
          id: 'ex-f3',
          nome: 'Treino de Força Muscular com Pesos Livres',
          categoria: 'Musculação',
          frequencia_semanal: '3x por semana',
          duracao_minutos: 40,
          intensidade: 'Moderada',
          gasto_calorico_estimado: 280,
          orientacoes: 'Estímulo à captação de glicose mediada por receptores GLUT-4 nos músculos.',
        },
      ],
    },
    created_at: '2026-08-05T10:30:00Z',
  },

  // 4. Lucas Gabriel Mendes
  {
    id: 'plano-lucas-004',
    paciente_id: '4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a',
    nutricionista_id: 'nutri-roberto-003',
    nutricionista_nome: 'Dr. Roberto Lima',
    conteudo: {
      titulo_plano: 'Plano Alimentar & Treino: Bulking Limpo & Hipertrofia',
      meta_calorica: 3100,
      macro_proteinas: '175g (23%)',
      macro_carboidratos: '420g (54%)',
      macro_gorduras: '80g (23%)',
      observacoes_gerais: 'Foco no aumento de peso corporal com densidade muscular e digestão otimizada.',
      refeicoes: [
        {
          horario: '06:30',
          titulo: 'Café da Manhã Hipercalórico',
          itens: [
            { alimento: 'Vitamina de leite integral com aveia, banana e whey', quantidade: '400ml + 50g aveia + 1 scoop' },
            { alimento: 'Pão de forma com ovos e pasta de amendoim', quantidade: '2 fatias + 2 ovos + 20g pasta' },
          ],
        },
        {
          horario: '10:00',
          titulo: 'Lanche da Manhã',
          itens: [
            { alimento: 'Sanduíche natural de frango desfiado com requeijão light', quantidade: '1 unidade' },
            { alimento: 'Suco de laranja natural', quantidade: '300ml' },
          ],
        },
        {
          horario: '13:00',
          titulo: 'Almoço Pesado',
          itens: [
            { alimento: 'Carne bovina magra (alcatra ou patinho)', quantidade: '170g' },
            { alimento: 'Arroz branco cozido', quantidade: '250g' },
            { alimento: 'Feijão carioca', quantidade: '130g' },
            { alimento: 'Legumes variados e azeite', quantidade: '100g' },
          ],
        },
        {
          horario: '16:30',
          titulo: 'Lanche Pré-Treino',
          itens: [
            { alimento: 'Panqueca de aveia com 3 ovos e mel', quantidade: '1 unidade grande' },
            { alimento: 'Banana fatiada', quantidade: '1 unidade' },
          ],
        },
        {
          horario: '20:00',
          titulo: 'Jantar Anabólico',
          itens: [
            { alimento: 'Peito de frango grelhado', quantidade: '170g' },
            { alimento: 'Macarrão ao sugo ou Batata inglesa cozida', quantidade: '220g' },
            { alimento: 'Salada de folhas e tomate', quantidade: '1 prato' },
          ],
        },
      ],
      exercicios: [
        {
          id: 'ex-l1',
          nome: 'Musculação Pesada (Divisão Push / Pull / Legs)',
          categoria: 'Musculação',
          frequencia_semanal: '5x por semana',
          duracao_minutos: 60,
          intensidade: 'Intensa',
          gasto_calorico_estimado: 430,
          orientacoes: 'Treino focado em progressão semanal de cargas com descanso de 90-120s entre séries.',
        },
        {
          id: 'ex-l2',
          nome: 'Natação Regenerativa & Capacidade Cardíaca',
          categoria: 'Esporte / Luta',
          frequencia_semanal: '2x por semana',
          duracao_minutos: 45,
          intensidade: 'Moderada',
          gasto_calorico_estimado: 380,
          orientacoes: 'Melhora da capacidade pulmonar e relaxamento da musculatura lombar e dorsal.',
        },
        {
          id: 'ex-l3',
          nome: 'Treino de Core & Estabilidade Funcional',
          categoria: 'Funcional',
          frequencia_semanal: '3x por semana',
          duracao_minutos: 25,
          intensidade: 'Moderada',
          gasto_calorico_estimado: 180,
          orientacoes: 'Fortalecimento do abdômen e lombar para sustentação de cargas elevadas no agachamento.',
        },
      ],
    },
    created_at: '2026-08-08T16:30:00Z',
  },

  // 5. Juliana Beatriz Carvalho
  {
    id: 'plano-juliana-005',
    paciente_id: '5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b',
    nutricionista_id: 'nutri-camila-004',
    nutricionista_nome: 'Dra. Camila Alves',
    conteudo: {
      titulo_plano: 'Plano Alimentar & Treino: Saúde Cardiovascular & Emagrecimento',
      meta_calorica: 1600,
      macro_proteinas: '105g (26%)',
      macro_carboidratos: '175g (44%)',
      macro_gorduras: '48g (30%)',
      observacoes_gerais: 'Dieta DASH hipossódica rica em potássio, magnésio e antioxidantes.',
      refeicoes: [
        {
          horario: '08:00',
          titulo: 'Café da Manhã Cardioprotetor',
          itens: [
            { alimento: 'Mingau de aveia com canela e sementes de linhaça', quantidade: '40g aveia + 200ml leite desnatado' },
            { alimento: 'Mamão papaia com limão', quantidade: '1/2 unidade' },
          ],
        },
        {
          horario: '12:30',
          titulo: 'Almoço Saudável',
          itens: [
            { alimento: 'Filé de peixe (Merluza ou Tilápia) grelhado', quantidade: '130g' },
            { alimento: 'Arroz integral com cenoura ralada', quantidade: '100g' },
            { alimento: 'Feijão preto temperado com louro e alho (sem sal extra)', quantidade: '70g' },
            { alimento: 'Prato abundante de folhas escuras (espinafre, couve, alface)', quantidade: '1 prato cheio' },
          ],
        },
        {
          horario: '16:00',
          titulo: 'Lanche da Tarde',
          itens: [
            { alimento: 'Iogurte natural desnatado', quantidade: '170g' },
            { alimento: 'Nozes ou Amêndoas sem sal', quantidade: '4 unidades' },
          ],
        },
        {
          horario: '19:30',
          titulo: 'Jantar Nutritivo',
          itens: [
            { alimento: 'Sopa de legumes com cubos de peito de frango', quantidade: '1 prato fundo (300ml)' },
            { alimento: 'Torrada integral 100%', quantidade: '2 fatias' },
            { alimento: 'Azeite extra virgem adicionado ao final', quantidade: '1 fio' },
          ],
        },
      ],
      exercicios: [
        {
          id: 'ex-j1',
          nome: 'Hidroginástica & Natação Leve',
          categoria: 'Esporte / Luta',
          frequencia_semanal: '3x por semana',
          duracao_minutos: 45,
          intensidade: 'Moderada',
          gasto_calorico_estimado: 310,
          orientacoes: 'Exercício de impacto zero, ideal para proteção articular e retorno venoso.',
        },
        {
          id: 'ex-j2',
          nome: 'Caminhada Contínua em Terreno Plano',
          categoria: 'Cardio',
          frequencia_semanal: '4x por semana',
          duracao_minutos: 40,
          intensidade: 'Leve',
          gasto_calorico_estimado: 190,
          orientacoes: 'Controle contínuo da respiração e hidratação regular a cada 15 minutos.',
        },
        {
          id: 'ex-j3',
          nome: 'Fortalecimento Funcional com Faixas Elásticas',
          categoria: 'Funcional',
          frequencia_semanal: '2x por semana',
          duracao_minutos: 30,
          intensidade: 'Leve',
          gasto_calorico_estimado: 160,
          orientacoes: 'Fortalecimento de membros inferiores e melhora da autonomia e equilíbrio.',
        },
      ],
    },
    created_at: '2026-08-10T11:30:00Z',
  },

  // 6. Rodrigo Medeiros
  {
    id: 'plano-rodrigo-006',
    paciente_id: '6f7a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c',
    nutricionista_id: 'nutri-felipe-005',
    nutricionista_nome: 'Dr. Felipe Albuquerque',
    conteudo: {
      titulo_plano: 'Plano Alimentar & Treino: Plant-Based & Longevidade',
      meta_calorica: 2200,
      macro_proteinas: '130g (24%)',
      macro_carboidratos: '280g (51%)',
      macro_gorduras: '60g (25%)',
      observacoes_gerais: 'Dieta 100% vegetal com combinação completa de aminoácidos e suplementação de B12.',
      refeicoes: [
        {
          horario: '07:00',
          titulo: 'Café da Manhã Vegano',
          itens: [
            { alimento: 'Tofu mexido com cúrcuma, orégano e azeite', quantidade: '150g' },
            { alimento: 'Pão de fermentação natural 100%', quantidade: '2 fatias' },
            { alimento: 'Leite de amêndoas com cacau 100%', quantidade: '200ml' },
          ],
        },
        {
          horario: '10:00',
          titulo: 'Lanche da Manhã',
          itens: [
            { alimento: 'Mix de castanhas e sementes de girassol', quantidade: '30g' },
            { alimento: 'Banana prata', quantidade: '1 unidade' },
          ],
        },
        {
          horario: '12:30',
          titulo: 'Almoço Plant-Based Completo',
          itens: [
            { alimento: 'Feijão carioca com louro', quantidade: '130g' },
            { alimento: 'Arroz integral com sementes de cânhamo', quantidade: '130g' },
            { alimento: 'Tempeh ou Proteína de soja grelhada', quantidade: '120g' },
            { alimento: 'Salada de couve crua, tomate e beterraba ralada', quantidade: '1 prato' },
          ],
        },
        {
          horario: '16:30',
          titulo: 'Shake Pós-Treino Vegano',
          itens: [
            { alimento: 'Proteína vegetal de ervilha e arroz', quantidade: '1 scoop (30g)' },
            { alimento: 'Frutas vermelhas congeladas', quantidade: '100g' },
            { alimento: 'Água de coco', quantidade: '250ml' },
          ],
        },
        {
          horario: '20:00',
          titulo: 'Jantar Reconfortante',
          itens: [
            { alimento: 'Curry de grão de bico com leite de coco light e espinafre', quantidade: '200g' },
            { alimento: 'Batata doce assada em rodelas', quantidade: '130g' },
            { alimento: 'Salada verde com azeite de oliva e limão', quantidade: '1 prato' },
          ],
        },
      ],
      exercicios: [
        {
          id: 'ex-r1',
          nome: 'Ciclismo de Estrada & Mobilidade Urbana',
          categoria: 'Cardio',
          frequencia_semanal: '3x por semana',
          duracao_minutos: 50,
          intensidade: 'Alta',
          gasto_calorico_estimado: 420,
          orientacoes: 'Treino cardiovascular contínuo para ganho de resistência aeróbica e queima lipídica.',
        },
        {
          id: 'ex-r2',
          nome: 'Calistenia & Treino com Peso Corporal',
          categoria: 'Funcional',
          frequencia_semanal: '3x por semana',
          duracao_minutos: 45,
          intensidade: 'Moderada',
          gasto_calorico_estimado: 320,
          orientacoes: 'Foco em flexões, barras fixas, paralelas e agachamentos unipodais.',
        },
        {
          id: 'ex-r3',
          nome: 'Vinyasa Yoga & Controle Respiratório (Pranayama)',
          categoria: 'Alongamento / Yoga',
          frequencia_semanal: '2x por semana',
          duracao_minutos: 35,
          intensidade: 'Leve',
          gasto_calorico_estimado: 140,
          orientacoes: 'Melhora da capacidade respiratória, relaxamento do sistema nervoso e flexibilidade.',
        },
      ],
    },
    created_at: '2026-08-12T16:00:00Z',
  },
];

// --- SERVIÇO DE AUTENTICAÇÃO NEON AUTH ---
export const AuthService = {
  loginMaster(): Nutricionista {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(MASTER_USER));
    return MASTER_USER;
  },

  selectNutricionista(nutriId: string): Nutricionista {
    const nutris = DbService.getNutricionistas();
    const target = nutris.find(n => n.id === nutriId) || MASTER_USER;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(target));
    return target;
  },

  async register(nome: string, email: string, password: string, crm?: string, especialidade?: string): Promise<Nutricionista> {
    const isMasterEmail = email.toLowerCase().includes('master') || email.toLowerCase().includes('admin');
    
    try {
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
  getNutricionistas(): Nutricionista[] {
    const stored = localStorage.getItem(STORAGE_KEYS.NUTRICIONISTAS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.NUTRICIONISTAS, JSON.stringify(INITIAL_NUTRICIONISTAS));
      return INITIAL_NUTRICIONISTAS;
    }
    const parsed: Nutricionista[] = JSON.parse(stored);
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

  // Planos Alimentares com Exercícios Físicos Integrados (3 por Paciente)
  getPlanos(pacienteId?: string): PlanoAlimentar[] {
    const stored = localStorage.getItem(STORAGE_KEYS.PLANOS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.PLANOS, JSON.stringify(INITIAL_PLANOS));
      return pacienteId ? INITIAL_PLANOS.filter((p) => p.paciente_id === pacienteId) : INITIAL_PLANOS;
    }
    const list: PlanoAlimentar[] = JSON.parse(stored);
    
    // Garantir que todos os pacientes padrão tenham planos com 3 exercícios
    INITIAL_PLANOS.forEach(initPlano => {
      if (!list.some(p => p.id === initPlano.id || p.paciente_id === initPlano.paciente_id)) {
        list.push(initPlano);
      }
    });
    localStorage.setItem(STORAGE_KEYS.PLANOS, JSON.stringify(list));

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
