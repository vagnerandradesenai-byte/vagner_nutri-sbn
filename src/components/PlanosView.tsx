import React, { useState } from 'react';
import { PlanoAlimentar, Paciente, ConteudoPlanoAlimentar, Refeicao, ProtocoloExercicio } from '../types';
import { Utensils, Plus, Eye, Check, X, Flame, ShieldCheck, Zap, Dumbbell, Activity, Trash2, Clock, Sparkles, HeartPulse, Bike, Waves, Compass, Filter, Users } from 'lucide-react';
import { EXERCICIOS_PRESETS } from '../lib/neon';

interface PlanosViewProps {
  planos: PlanoAlimentar[];
  pacientes: Paciente[];
  onSavePlano: (plano: Omit<PlanoAlimentar, 'id' | 'created_at'>) => void;
}

export const PlanosView: React.FC<PlanosViewProps> = ({ planos, pacientes, onSavePlano }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlano, setSelectedPlano] = useState<PlanoAlimentar | null>(null);
  const [modalActiveTab, setModalActiveTab] = useState<'dieta' | 'exercicios'>('dieta');
  const [selectedFilterPaciente, setSelectedFilterPaciente] = useState<string>('all');

  // Form State
  const [pacienteId, setPacienteId] = useState(pacientes[0]?.id || '');
  const [tituloPlano, setTituloPlano] = useState('Plano Alimentar & Protocolo de 3 Exercícios');
  const [metaCalorica, setMetaCalorica] = useState<number>(2000);
  const [macroProteinas, setMacroProteinas] = useState('130g (26%)');
  const [macroCarboidratos, setMacroCarboidratos] = useState('210g (42%)');
  const [macroGorduras, setMacroGorduras] = useState('70g (32%)');
  const [observacoesGerais, setObservacoesGerais] = useState('Ingerir 3L de água diariamente. Seguir os 3 treinos prescritos.');

  const [refeicoes, setRefeicoes] = useState<Refeicao[]>([
    {
      horario: '07:30',
      titulo: 'Café da Manhã',
      itens: [
        { alimento: 'Ovos cozidos ou mexidos', quantidade: '2 unidades' },
        { alimento: 'Pão de forma integral', quantidade: '2 fatias' },
        { alimento: 'Mamão papaia', quantidade: '1/2 unidade' },
      ],
    },
    {
      horario: '12:30',
      titulo: 'Almoço',
      itens: [
        { alimento: 'Peito de frango grelhado', quantidade: '140g' },
        { alimento: 'Arroz integral', quantidade: '120g' },
        { alimento: 'Feijão carioca', quantidade: '90g' },
        { alimento: 'Salada de alface e tomate', quantidade: 'À vontade' },
      ],
    },
    {
      horario: '16:00',
      titulo: 'Lanche da Tarde (Pré-Treino)',
      itens: [
        { alimento: 'Iogurte natural desnatado', quantidade: '170g' },
        { alimento: 'Whey Protein concentrado', quantidade: '1 scoop (30g)' },
        { alimento: 'Castanha de caju', quantidade: '4 unidades' },
      ],
    },
    {
      horario: '19:30',
      titulo: 'Jantar',
      itens: [
        { alimento: 'Filé de tilápia grelhado', quantidade: '150g' },
        { alimento: 'Batata inglesa cozida', quantidade: '120g' },
        { alimento: 'Brócolis e cenoura no vapor', quantidade: '100g' },
      ],
    },
  ]);

  // 3 Exercícios Físicos Padrão
  const [exercicios, setExercicios] = useState<ProtocoloExercicio[]>([
    {
      id: 'ex-1',
      nome: 'Musculação / Treino Resistido A/B/C',
      categoria: 'Musculação',
      frequencia_semanal: '4x por semana',
      duracao_minutos: 50,
      intensidade: 'Moderada',
      gasto_calorico_estimado: 350,
      orientacoes: 'Executar 1h após o lanche da tarde. Foco em execução controlada e progressão de carga.',
    },
    {
      id: 'ex-2',
      nome: 'Cardio LISS (Caminhada Inclinada na Esteira)',
      categoria: 'Cardio',
      frequencia_semanal: '3x por semana',
      duracao_minutos: 35,
      intensidade: 'Moderada',
      gasto_calorico_estimado: 220,
      orientacoes: 'Manter frequência cardíaca em Zona 2 (65-75% FCM) pós-musculação.',
    },
    {
      id: 'ex-3',
      nome: 'Treino Funcional HIIT & Mobilidade',
      categoria: 'Funcional',
      frequencia_semanal: '2x por semana',
      duracao_minutos: 25,
      intensidade: 'Alta',
      gasto_calorico_estimado: 260,
      orientacoes: 'Estímulos intervalados para quebra de homeostase e aumento do gasto diário.',
    },
  ]);

  const getPacienteNome = (id: string) => {
    return pacientes.find((p) => p.id === id)?.nome || 'Paciente não localizado';
  };

  const handleAddRefeicao = () => {
    setRefeicoes([
      ...refeicoes,
      {
        horario: '21:30',
        titulo: 'Ceia',
        itens: [{ alimento: 'Chá de camomila sem açúcar', quantidade: '200ml' }],
      },
    ]);
  };

  const handleAddPresetExercicio = (preset: ProtocoloExercicio) => {
    setExercicios([
      ...exercicios,
      {
        ...preset,
        id: crypto.randomUUID(),
      },
    ]);
  };

  const handleRemoveExercicio = (index: number) => {
    setExercicios(exercicios.filter((_, i) => i !== index));
  };

  const calculateTotalWeeklyBurn = (exList: ProtocoloExercicio[]) => {
    return exList.reduce((acc, curr) => {
      const match = curr.frequencia_semanal.match(/\d+/);
      const times = match ? Number(match[0]) : 3;
      const cal = curr.gasto_calorico_estimado || 250;
      return acc + (cal * times);
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pacienteId) return;

    const conteudo: ConteudoPlanoAlimentar = {
      titulo_plano: tituloPlano,
      meta_calorica: Number(metaCalorica),
      macro_proteinas: macroProteinas,
      macro_carboidratos: macroCarboidratos,
      macro_gorduras: macroGorduras,
      observacoes_gerais: observacoesGerais,
      refeicoes,
      exercicios,
    };

    onSavePlano({
      paciente_id: pacienteId,
      conteudo,
    });

    setIsModalOpen(false);
  };

  const filteredPlanos = selectedFilterPaciente === 'all' 
    ? planos 
    : planos.filter(p => p.paciente_id === selectedFilterPaciente);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Header */}
      <div className="glass-panel" style={{ padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderLeft: '4px solid #ef4444', borderRight: '4px solid #10b981' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Planos Alimentares & Exercícios Físicos</h2>
            <span className="badge badge-green"><Dumbbell size={12} /> 3 Exercícios por Paciente</span>
            <span className="badge badge-blue">Sinergia Calórica</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Prescrição personalizada de dietas com cálculo de macros e 3 protocolos de exercícios físicos complementares
          </p>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="btn-red">
          <Plus size={18} /> Criar Novo Plano & 3 Treinos
        </button>
      </div>

      {/* Filter by Patient */}
      <div className="glass-panel" style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#94a3b8' }}>
          <Filter size={16} color="#60a5fa" />
          <span>Filtrar por Paciente:</span>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedFilterPaciente('all')}
            className={selectedFilterPaciente === 'all' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
          >
            Todos os Pacientes ({planos.length})
          </button>
          {pacientes.map(p => {
            const count = planos.filter(pl => pl.paciente_id === p.id).length;
            if (count === 0) return null;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedFilterPaciente(p.id)}
                className={selectedFilterPaciente === p.id ? 'btn-primary' : 'btn-secondary'}
                style={{ fontSize: '0.8rem', padding: '6px 12px' }}
              >
                {p.nome.split(' ')[0]} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid-responsive-3">
        {filteredPlanos.map((plano) => {
          const exList = plano.conteudo.exercicios || [];
          const weeklyBurn = calculateTotalWeeklyBurn(exList);

          return (
            <div key={plano.id} className="glass-panel glass-panel-hover" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '3px solid #ef4444' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>{plano.conteudo.titulo_plano}</h3>
                  <span className="badge badge-red"><Flame size={12} /> {plano.conteudo.meta_calorica} kcal</span>
                </div>

                <div style={{ fontSize: '0.9rem', color: '#60a5fa', fontWeight: 600, marginBottom: '12px' }}>
                  Paciente: {getPacienteNome(plano.paciente_id)}
                </div>

                {/* Macros Breakdown */}
                <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ color: '#60a5fa' }}>🍗 Proteínas:</span>
                    <strong>{plano.conteudo.macro_proteinas}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ color: '#34d399' }}>🌾 Carboidratos:</span>
                    <strong>{plano.conteudo.macro_carboidratos}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#f87171' }}>🥑 Gorduras:</span>
                    <strong>{plano.conteudo.macro_gorduras}</strong>
                  </div>
                </div>

                {/* 3 Exercises Summary Box */}
                <div style={{ background: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(59, 130, 246, 0.25)', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Dumbbell size={14} /> {exList.length} Exercícios Prescritos
                    </span>
                    <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>
                      ~{weeklyBurn} kcal/sem
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {exList.slice(0, 3).map((ex, i) => (
                      <div key={i} style={{ fontSize: '0.75rem', color: '#cbd5e1', display: 'flex', justifyContent: 'space-between' }}>
                        <span>• {ex.nome.split(' (')[0]}</span>
                        <strong style={{ color: '#34d399' }}>{ex.frequencia_semanal}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button onClick={() => { setSelectedPlano(plano); setModalActiveTab('dieta'); }} className="btn-secondary" style={{ width: '100%', justifyContent: 'center', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                <Eye size={16} color="#f87171" /> Visualizar Dieta & 3 Exercícios
              </button>
            </div>
          );
        })}
      </div>

      {/* Visualizar Dieta & Exercícios Modal */}
      {selectedPlano && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', padding: '32px', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{selectedPlano.conteudo.titulo_plano}</h3>
                <span style={{ fontSize: '0.85rem', color: '#60a5fa', fontWeight: 600 }}>Paciente: {getPacienteNome(selectedPlano.paciente_id)}</span>
              </div>
              <button onClick={() => setSelectedPlano(null)} className="btn-secondary" style={{ padding: '6px' }}><X size={18} /></button>
            </div>

            {/* Modal Navigation Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', background: 'rgba(15, 23, 42, 0.7)', padding: '4px', borderRadius: '10px' }}>
              <button
                onClick={() => setModalActiveTab('dieta')}
                className={modalActiveTab === 'dieta' ? 'btn-red' : 'btn-secondary'}
                style={{ flex: 1, padding: '8px', fontSize: '0.85rem' }}
              >
                <Utensils size={15} /> Cardápio & Refeições ({selectedPlano.conteudo.refeicoes.length})
              </button>
              <button
                onClick={() => setModalActiveTab('exercicios')}
                className={modalActiveTab === 'exercicios' ? 'btn-blue' : 'btn-secondary'}
                style={{ flex: 1, padding: '8px', fontSize: '0.85rem' }}
              >
                <Dumbbell size={15} /> 3 Exercícios Físicos Complementares ({(selectedPlano.conteudo.exercicios || []).length})
              </button>
            </div>

            {/* TAB 1: DIETA */}
            {modalActiveTab === 'dieta' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <span className="badge badge-red" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>🔥 {selectedPlano.conteudo.meta_calorica} kcal / dia</span>
                  <span className="badge badge-blue" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>🍗 Prot: {selectedPlano.conteudo.macro_proteinas}</span>
                  <span className="badge badge-green" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>🌾 Carb: {selectedPlano.conteudo.macro_carboidratos}</span>
                  <span className="badge badge-amber" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>🥑 Gord: {selectedPlano.conteudo.macro_gorduras}</span>
                </div>

                <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '14px 18px', borderRadius: '10px', fontSize: '0.875rem', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <strong style={{ color: '#60a5fa' }}>Observações do Nutricionista:</strong>
                  <p style={{ marginTop: '4px', color: 'var(--text-muted)' }}>{selectedPlano.conteudo.observacoes_gerais}</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {selectedPlano.conteudo.refeicoes.map((ref, idx) => (
                    <div key={idx} style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <h4 style={{ fontWeight: 700, color: '#60a5fa' }}>{ref.titulo}</h4>
                        <span className="badge badge-blue">{ref.horario}</span>
                      </div>
                      <ul style={{ paddingLeft: '20px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        {ref.itens.map((item, itemIdx) => (
                          <li key={itemIdx} style={{ marginBottom: '4px' }}>
                            <strong style={{ color: '#fff' }}>{item.alimento}</strong> — <span style={{ color: '#34d399' }}>{item.quantidade}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: 3 EXERCÍCIOS FÍSICOS */}
            {modalActiveTab === 'exercicios' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Summary Banner */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(16, 185, 129, 0.12) 100%)',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  border: '1px solid rgba(59, 130, 246, 0.35)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                      Protocolo de 3 Atividades Físicas & Gasto Energético
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '2px 0 0 0' }}>
                      Planejado individualmente para este paciente com foco no balanço metabólico
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>Gasto Semanal Estimado</span>
                    <strong style={{ fontSize: '1.25rem', color: '#34d399' }}>
                      ~{calculateTotalWeeklyBurn(selectedPlano.conteudo.exercicios || [])} kcal
                    </strong>
                  </div>
                </div>

                {/* Exercises Cards List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {(selectedPlano.conteudo.exercicios || []).map((ex, idx) => {
                    const isHigh = ex.intensidade === 'Alta' || ex.intensidade === 'Intensa';
                    return (
                      <div key={idx} style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ background: 'rgba(37, 99, 235, 0.2)', padding: '8px', borderRadius: '10px', color: '#60a5fa' }}>
                              <Dumbbell size={18} />
                            </div>
                            <div>
                              <h4 style={{ fontWeight: 700, color: '#ffffff', fontSize: '1rem', margin: 0 }}>
                                {idx + 1}. {ex.nome}
                              </h4>
                              <span style={{ fontSize: '0.75rem', color: '#60a5fa' }}>{ex.categoria}</span>
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            <span className="badge badge-blue">
                              <Clock size={11} /> {ex.duracao_minutos} min
                            </span>
                            <span className="badge badge-green">
                              {ex.frequencia_semanal}
                            </span>
                            <span className={isHigh ? "badge badge-red" : "badge badge-amber"}>
                              Intensidade: {ex.intensidade}
                            </span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15, 23, 42, 0.5)', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', marginTop: '10px' }}>
                          <span style={{ color: '#94a3b8' }}>
                            {ex.orientacoes || 'Executar conforme orientações nutricionais e manter hidratação.'}
                          </span>
                          {ex.gasto_calorico_estimado && (
                            <strong style={{ color: '#f87171', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                              🔥 ~{ex.gasto_calorico_estimado} kcal/sessão
                            </strong>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal Criar Novo Plano com 3 Exercícios */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', padding: '32px', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Prescrever Novo Plano Alimentar & 3 Exercícios</h3>
                <span className="badge badge-green" style={{ marginTop: '4px' }}>Sinergia Metabólica & Calórica</span>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="btn-secondary" style={{ padding: '6px' }}><X size={18} /></button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Informações Básicas da Dieta */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', background: 'rgba(15, 23, 42, 0.6)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f87171', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Utensils size={16} /> 1. Parâmetros Nutricionais da Dieta
                </h4>

                <div className="form-group">
                  <label className="form-label">Paciente Destino *</label>
                  <select required value={pacienteId} onChange={(e) => setPacienteId(e.target.value)} className="form-input" style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                    {pacientes.map((p) => (
                      <option key={p.id} value={p.id}>{p.nome}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">Título do Plano</label>
                    <input type="text" required value={tituloPlano} onChange={(e) => setTituloPlano(e.target.value)} className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Meta Calórica (kcal)</label>
                    <input type="number" required value={metaCalorica} onChange={(e) => setMetaCalorica(Number(e.target.value))} className="form-input" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Proteínas</label>
                    <input type="text" value={macroProteinas} onChange={(e) => setMacroProteinas(e.target.value)} className="form-input" placeholder="130g (26%)" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Carboidratos</label>
                    <input type="text" value={macroCarboidratos} onChange={(e) => setMacroCarboidratos(e.target.value)} className="form-input" placeholder="210g (42%)" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Gorduras</label>
                    <input type="text" value={macroGorduras} onChange={(e) => setMacroGorduras(e.target.value)} className="form-input" placeholder="70g (32%)" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Orientações Nutricionais Gerais</label>
                  <textarea rows={2} value={observacoesGerais} onChange={(e) => setObservacoesGerais(e.target.value)} className="form-input" />
                </div>
              </div>

              {/* Refeições */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(15, 23, 42, 0.6)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontWeight: 700, color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Utensils size={16} /> 2. Refeições do Cardápio ({refeicoes.length})
                  </h4>
                  <button type="button" onClick={handleAddRefeicao} className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.8rem', color: '#60a5fa' }}>
                    + Adicionar Refeição
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {refeicoes.map((ref, idx) => (
                    <div key={idx} style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '8px' }}>
                        <input
                          type="text"
                          value={ref.horario}
                          onChange={(e) => {
                            const newRefs = [...refeicoes];
                            newRefs[idx].horario = e.target.value;
                            setRefeicoes(newRefs);
                          }}
                          className="form-input"
                          placeholder="Horário (ex: 08:00)"
                        />
                        <input
                          type="text"
                          value={ref.titulo}
                          onChange={(e) => {
                            const newRefs = [...refeicoes];
                            newRefs[idx].titulo = e.target.value;
                            setRefeicoes(newRefs);
                          }}
                          className="form-input"
                          placeholder="Título (ex: Almoço)"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 3: 3 EXERCÍCIOS FÍSICOS COMPLEMENTARES */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', background: 'rgba(37, 99, 235, 0.08)', padding: '18px', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.35)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <h4 style={{ fontWeight: 800, color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem', margin: 0 }}>
                      <Dumbbell size={18} /> 3. Protocolos de Exercícios Físicos ({exercicios.length})
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      Prescreva 3 opções de atividades para sinergia com a dieta
                    </span>
                  </div>
                  <span className="badge badge-green">
                    Gasto: ~{calculateTotalWeeklyBurn(exercicios)} kcal/sem
                  </span>
                </div>

                {/* Preset Fast Add Buttons */}
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#cbd5e1', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                    ⚡ Adicionar Sugestões Prontas com 1-Clique:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {EXERCICIOS_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleAddPresetExercicio(preset)}
                        className="btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '0.75rem', borderColor: 'rgba(59, 130, 246, 0.35)', background: 'rgba(15, 23, 42, 0.8)' }}
                      >
                        + {preset.categoria}: {preset.nome.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* List of active exercises in builder */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {exercicios.map((ex, idx) => (
                    <div key={idx} style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(59, 130, 246, 0.25)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <strong style={{ color: '#ffffff', fontSize: '0.9rem' }}>
                          Exercício {idx + 1}: {ex.nome}
                        </strong>
                        <button
                          type="button"
                          onClick={() => handleRemoveExercicio(idx)}
                          className="btn-secondary"
                          style={{ padding: '4px 8px', color: '#f87171', fontSize: '0.75rem' }}
                          title="Remover exercício"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                        <div>
                          <label style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>Frequência</label>
                          <input
                            type="text"
                            value={ex.frequencia_semanal}
                            onChange={(e) => {
                              const updated = [...exercicios];
                              updated[idx].frequencia_semanal = e.target.value;
                              setExercicios(updated);
                            }}
                            className="form-input"
                            style={{ fontSize: '0.8rem', padding: '6px 10px' }}
                            placeholder="4x por semana"
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>Duração (min)</label>
                          <input
                            type="number"
                            value={ex.duracao_minutos}
                            onChange={(e) => {
                              const updated = [...exercicios];
                              updated[idx].duracao_minutos = Number(e.target.value);
                              setExercicios(updated);
                            }}
                            className="form-input"
                            style={{ fontSize: '0.8rem', padding: '6px 10px' }}
                            placeholder="50"
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>Gasto (kcal/sessão)</label>
                          <input
                            type="number"
                            value={ex.gasto_calorico_estimado || ''}
                            onChange={(e) => {
                              const updated = [...exercicios];
                              updated[idx].gasto_calorico_estimado = Number(e.target.value);
                              setExercicios(updated);
                            }}
                            className="form-input"
                            style={{ fontSize: '0.8rem', padding: '6px 10px' }}
                            placeholder="350"
                          />
                        </div>
                      </div>

                      <div>
                        <input
                          type="text"
                          value={ex.orientacoes || ''}
                          onChange={(e) => {
                            const updated = [...exercicios];
                            updated[idx].orientacoes = e.target.value;
                            setExercicios(updated);
                          }}
                          className="form-input"
                          style={{ fontSize: '0.8rem', padding: '6px 10px', width: '100%' }}
                          placeholder="Orientações de execução ou nutrição pré/pós treino..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn-red" style={{ marginTop: '8px', padding: '14px', fontSize: '1rem' }}>
                <Check size={18} /> Salvar Plano Alimentar & 3 Exercícios no Neon DB
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
