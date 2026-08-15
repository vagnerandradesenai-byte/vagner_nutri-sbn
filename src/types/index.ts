export interface Nutricionista {
  id: string;
  nome: string;
  email: string;
  role?: 'master' | 'admin' | 'nutricionista';
  is_master?: boolean;
  crm?: string;
  especialidade?: string;
  avatar?: string;
  telefone?: string;
  cor?: string;
  created_at?: string;
}

export interface Paciente {
  id: string;
  nutricionista_id?: string;
  nutricionista_nome?: string;
  nome: string;
  data_nascimento?: string;
  sexo?: string;
  whatsapp?: string;
  email?: string;
  peso_inicial?: number;
  altura?: number;
  objetivos?: string[];
  objetivo_texto?: string;
  nivel_atividade?: string;
  patologias?: string[];
  restricoes_alimentares?: string[];
  alergias?: string[];
  medicamentos?: string;
  suplementos?: string;
  refeicoes_por_dia?: number;
  horario_acorda?: string;
  horario_dorme?: string;
  litros_agua?: number;
  atividade_fisica?: boolean;
  atividade_fisica_descricao?: string;
  observacoes?: string;
  created_at?: string;
}

export interface Consulta {
  id: string;
  paciente_id: string;
  nutricionista_id?: string;
  nutricionista_nome?: string;
  data_consulta: string;
  peso?: number;
  cintura?: number;
  quadril?: number;
  percentual_gordura?: number;
  observacoes?: string;
  proximo_retorno?: string;
  created_at?: string;
}

export interface RefeicaoItem {
  alimento: string;
  quantidade: string;
  calorias?: number;
  proteinas?: string;
  carboidratos?: string;
  gorduras?: string;
}

export interface Refeicao {
  horario: string;
  titulo: string;
  itens: RefeicaoItem[];
}

export interface ProtocoloExercicio {
  id?: string;
  nome: string;
  categoria: 'Musculação' | 'Cardio' | 'Funcional' | 'Alongamento / Yoga' | 'Esporte / Luta' | 'Outro';
  frequencia_semanal: string;
  duracao_minutos: number;
  intensidade: 'Leve' | 'Moderada' | 'Alta' | 'Intensa';
  gasto_calorico_estimado?: number;
  orientacoes?: string;
}

export interface ConteudoPlanoAlimentar {
  titulo_plano: string;
  meta_calorica: number;
  macro_proteinas: string;
  macro_carboidratos: string;
  macro_gorduras: string;
  observacoes_gerais: string;
  refeicoes: Refeicao[];
  exercicios?: ProtocoloExercicio[];
}

export interface PlanoAlimentar {
  id: string;
  paciente_id: string;
  nutricionista_id?: string;
  nutricionista_nome?: string;
  conteudo: ConteudoPlanoAlimentar;
  created_at?: string;
}
