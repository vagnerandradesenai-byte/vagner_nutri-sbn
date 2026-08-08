import React, { useState } from 'react';
import { PlanoAlimentar, Paciente, ConteudoPlanoAlimentar, Refeicao } from '../types';
import { Utensils, Plus, Eye, Check, X, Flame, ShieldCheck } from 'lucide-react';

interface PlanosViewProps {
  planos: PlanoAlimentar[];
  pacientes: Paciente[];
  onSavePlano: (plano: Omit<PlanoAlimentar, 'id' | 'created_at'>) => void;
}

export const PlanosView: React.FC<PlanosViewProps> = ({ planos, pacientes, onSavePlano }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlano, setSelectedPlano] = useState<PlanoAlimentar | null>(null);

  // Form State
  const [pacienteId, setPacienteId] = useState(pacientes[0]?.id || '');
  const [tituloPlano, setTituloPlano] = useState('Plano Alimentar Personalizado');
  const [metaCalorica, setMetaCalorica] = useState<number>(2000);
  const [macroProteinas, setMacroProteinas] = useState('130g (26%)');
  const [macroCarboidratos, setMacroCarboidratos] = useState('210g (42%)');
  const [macroGorduras, setMacroGorduras] = useState('70g (32%)');
  const [observacoesGerais, setObservacoesGerais] = useState('Ingerir 3L de água diariamente. Não pular refeições.');

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
      titulo: 'Lanche da Tarde',
      itens: [
        { alimento: 'Iogurte natural desnatado', quantidade: '170g' },
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
    };

    onSavePlano({
      paciente_id: pacienteId,
      conteudo,
    });

    setIsModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Header */}
      <div className="glass-panel" style={{ padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Planos Alimentares & Dietas</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Criação e prescrição de dietas personalizadas armazenadas em formato JSONB no Neon DB</p>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
          <Plus size={18} /> Criar Plano Alimentar
        </button>
      </div>

      {/* Plan Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {planos.map((plano) => (
          <div key={plano.id} className="glass-panel glass-panel-hover" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{plano.conteudo.titulo_plano}</h3>
                <span className="badge badge-emerald"><Flame size={12} /> {plano.conteudo.meta_calorica} kcal</span>
              </div>

              <div style={{ fontSize: '0.9rem', color: '#38bdf8', fontWeight: 600, marginBottom: '12px' }}>
                Paciente: {getPacienteNome(plano.paciente_id)}
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '12px', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                <div><strong>Proteínas:</strong> {plano.conteudo.macro_proteinas}</div>
                <div><strong>Carboidratos:</strong> {plano.conteudo.macro_carboidratos}</div>
                <div><strong>Gorduras:</strong> {plano.conteudo.macro_gorduras}</div>
              </div>
            </div>

            <button onClick={() => setSelectedPlano(plano)} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
              <Eye size={16} /> Visualizar Dieta Completa
            </button>
          </div>
        ))}
      </div>

      {/* Visualizar Dieta Modal */}
      {selectedPlano && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{selectedPlano.conteudo.titulo_plano}</h3>
                <span style={{ fontSize: '0.85rem', color: '#38bdf8' }}>Paciente: {getPacienteNome(selectedPlano.paciente_id)}</span>
              </div>
              <button onClick={() => setSelectedPlano(null)} className="btn-secondary" style={{ padding: '6px' }}><X size={18} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <span className="badge badge-emerald" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>🔥 {selectedPlano.conteudo.meta_calorica} kcal / dia</span>
                <span className="badge badge-cyan" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>🍗 Prot: {selectedPlano.conteudo.macro_proteinas}</span>
                <span className="badge badge-amber" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>🥑 Gord: {selectedPlano.conteudo.macro_gorduras}</span>
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '14px 18px', borderRadius: '10px', fontSize: '0.875rem', color: '#e2e8f0' }}>
                <strong>Observações Gerais do Nutricionista:</strong>
                <p style={{ marginTop: '4px', color: 'var(--text-muted)' }}>{selectedPlano.conteudo.observacoes_gerais}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {selectedPlano.conteudo.refeicoes.map((ref, idx) => (
                  <div key={idx} style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <h4 style={{ fontWeight: 700, color: '#38bdf8' }}>{ref.titulo}</h4>
                      <span className="badge badge-cyan">{ref.horario}</span>
                    </div>
                    <ul style={{ paddingLeft: '20px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      {ref.itens.map((item, itemIdx) => (
                        <li key={itemIdx} style={{ marginBottom: '4px' }}>
                          <strong style={{ color: '#fff' }}>{item.alimento}</strong> — {item.quantidade}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Criar Plano */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Prescrever Novo Plano Alimentar</h3>
              <button onClick={() => setIsModalOpen(false)} className="btn-secondary" style={{ padding: '6px' }}><X size={18} /></button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Paciente Destino *</label>
                <select required value={pacienteId} onChange={(e) => setPacienteId(e.target.value)} className="form-input">
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

              <div className="form-group">
                <label className="form-label">Orientações do Nutricionista</label>
                <textarea rows={2} value={observacoesGerais} onChange={(e) => setObservacoesGerais(e.target.value)} className="form-input" />
              </div>

              <div style={{ marginTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ fontWeight: 700 }}>Refeições do Plano</h4>
                  <button type="button" onClick={handleAddRefeicao} className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.8rem' }}>
                    + Adicionar Refeição
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {refeicoes.map((ref, idx) => (
                    <div key={idx} style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '8px', marginBottom: '8px' }}>
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

              <button type="submit" className="btn-primary" style={{ marginTop: '14px', padding: '12px' }}>
                <Check size={18} /> Salvar Plano Alimentar no Neon DB
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
