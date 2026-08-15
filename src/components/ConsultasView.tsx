import React, { useState } from 'react';
import { Consulta, Paciente } from '../types';
import { Calendar, Plus, Scale, Activity, TrendingDown, Check, X } from 'lucide-react';

interface ConsultasViewProps {
  consultas: Consulta[];
  pacientes: Paciente[];
  onSaveConsulta: (consulta: Omit<Consulta, 'id' | 'created_at'>) => void;
}

export const ConsultasView: React.FC<ConsultasViewProps> = ({ consultas, pacientes, onSaveConsulta }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pacienteId, setPacienteId] = useState(pacientes[0]?.id || '');
  const [dataConsulta, setDataConsulta] = useState(new Date().toISOString().split('T')[0]);
  const [peso, setPeso] = useState<number | ''>('');
  const [cintura, setCintura] = useState<number | ''>('');
  const [quadril, setQuadril] = useState<number | ''>('');
  const [percentualGordura, setPercentualGordura] = useState<number | ''>('');
  const [observacoes, setObservacoes] = useState('');
  const [proximoRetorno, setProximoRetorno] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pacienteId) return;

    onSaveConsulta({
      paciente_id: pacienteId,
      data_consulta: dataConsulta,
      peso: peso !== '' ? Number(peso) : undefined,
      cintura: cintura !== '' ? Number(cintura) : undefined,
      quadril: quadril !== '' ? Number(quadril) : undefined,
      percentual_gordura: percentualGordura !== '' ? Number(percentualGordura) : undefined,
      observacoes,
      proximo_retorno: proximoRetorno || undefined,
    });

    setIsModalOpen(false);
    setPeso('');
    setCintura('');
    setQuadril('');
    setPercentualGordura('');
    setObservacoes('');
  };

  const getPacienteNome = (id: string) => {
    return pacientes.find((p) => p.id === id)?.nome || 'Paciente não localizado';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header */}
      <div className="glass-panel" style={{ padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderLeft: '4px solid #3b82f6' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Consultas & Avaliação Antropométrica</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Acompanhamento da evolução de medidas, peso e composição corporal</p>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="btn-blue">
          <Plus size={18} /> Nova Consulta
        </button>
      </div>

      {/* Consultations Table */}
      <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto', borderTop: '3px solid #10b981' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 16px' }}>Data</th>
              <th style={{ padding: '12px 16px' }}>Paciente</th>
              <th style={{ padding: '12px 16px' }}>Peso (kg)</th>
              <th style={{ padding: '12px 16px' }}>Cintura (cm)</th>
              <th style={{ padding: '12px 16px' }}>Quadril (cm)</th>
              <th style={{ padding: '12px 16px' }}>% Gordura</th>
              <th style={{ padding: '12px 16px' }}>Próximo Retorno</th>
            </tr>
          </thead>
          <tbody>
            {consultas.map((consulta) => (
              <tr key={consulta.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '14px 16px', fontWeight: 600 }}>{consulta.data_consulta}</td>
                <td style={{ padding: '14px 16px', fontWeight: 700, color: '#60a5fa' }}>{getPacienteNome(consulta.paciente_id)}</td>
                <td style={{ padding: '14px 16px', color: '#ffffff' }}>{consulta.peso ? `${consulta.peso} kg` : '-'}</td>
                <td style={{ padding: '14px 16px' }}>{consulta.cintura ? `${consulta.cintura} cm` : '-'}</td>
                <td style={{ padding: '14px 16px' }}>{consulta.quadril ? `${consulta.quadril} cm` : '-'}</td>
                <td style={{ padding: '14px 16px' }}>
                  {consulta.percentual_gordura ? (
                    <span className="badge badge-green">{consulta.percentual_gordura}%</span>
                  ) : (
                    '-'
                  )}
                </td>
                <td style={{ padding: '14px 16px' }}>
                  {consulta.proximo_retorno ? (
                    <span className="badge badge-blue">{consulta.proximo_retorno}</span>
                  ) : (
                    <span style={{ color: '#94a3b8' }}>A agendar</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Nova Consulta */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', padding: '32px', border: '1px solid rgba(59, 130, 246, 0.4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Registrar Nova Consulta Antropométrica</h3>
              <button onClick={() => setIsModalOpen(false)} className="btn-secondary" style={{ padding: '6px' }}><X size={18} /></button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Selecione o Paciente *</label>
                <select required value={pacienteId} onChange={(e) => setPacienteId(e.target.value)} className="form-input" style={{ borderColor: 'rgba(59, 130, 246, 0.4)' }}>
                  {pacientes.map((p) => (
                    <option key={p.id} value={p.id}>{p.nome}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Data da Consulta *</label>
                  <input type="date" required value={dataConsulta} onChange={(e) => setDataConsulta(e.target.value)} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Peso Atual (kg)</label>
                  <input type="number" step="0.1" value={peso} onChange={(e) => setPeso(e.target.value ? Number(e.target.value) : '')} className="form-input" placeholder="67.2" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Cintura (cm)</label>
                  <input type="number" step="0.1" value={cintura} onChange={(e) => setCintura(e.target.value ? Number(e.target.value) : '')} className="form-input" placeholder="73.5" />
                </div>
                <div className="form-group">
                  <label className="form-label">Quadril (cm)</label>
                  <input type="number" step="0.1" value={quadril} onChange={(e) => setQuadril(e.target.value ? Number(e.target.value) : '')} className="form-input" placeholder="97.0" />
                </div>
                <div className="form-group">
                  <label className="form-label">% Gordura</label>
                  <input type="number" step="0.1" value={percentualGordura} onChange={(e) => setPercentualGordura(e.target.value ? Number(e.target.value) : '')} className="form-input" placeholder="23.0" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Data Prevista para Próximo Retorno</label>
                <input type="date" value={proximoRetorno} onChange={(e) => setProximoRetorno(e.target.value)} className="form-input" />
              </div>

              <div className="form-group">
                <label className="form-label">Observações da Consulta</label>
                <textarea rows={3} value={observacoes} onChange={(e) => setObservacoes(e.target.value)} className="form-input" placeholder="Evolução boa, adesão ao plano de 90%..." />
              </div>

              <button type="submit" className="btn-blue" style={{ marginTop: '8px', padding: '12px' }}>
                <Check size={18} /> Salvar Avaliação no Neon DB
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
