import React, { useState } from 'react';
import { Consulta, Paciente } from '../types';
import { Calendar, Plus, Scale, Activity, TrendingDown, Check, X, BarChart3, ListFilter, Users, Clock, ShieldCheck } from 'lucide-react';
import { calcularIMC } from '../lib/imc';

interface ConsultasViewProps {
  consultas: Consulta[];
  pacientes: Paciente[];
  onSaveConsulta: (consulta: Omit<Consulta, 'id' | 'created_at'>) => void;
}

export const ConsultasView: React.FC<ConsultasViewProps> = ({ consultas, pacientes, onSaveConsulta }) => {
  const [viewMode, setViewMode] = useState<'table' | 'dashboard'>('table');
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
    setCintura('');
    setQuadril('');
    setPercentualGordura('');
    setObservacoes('');
  };

  const getPacienteNome = (id: string) => {
    return pacientes.find((p) => p.id === id)?.nome || 'Paciente não localizado';
  };

  // KPIs de Atendimento
  const totalConsultas = consultas.length;
  const retornosProgramados = consultas.filter(c => Boolean(c.proximo_retorno)).length;
  const pacientesComConsulta = new Set(consultas.map(c => c.paciente_id)).size;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header */}
      <div className="glass-panel" style={{ padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderLeft: '4px solid #3b82f6' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Consultas & Dashboard de Atendimentos</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Acompanhamento da evolução de medidas, peso, IMC e retornos clínicos</p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {/* Toggle View Mode */}
          <div style={{ display: 'flex', background: 'rgba(15, 23, 42, 0.6)', padding: '4px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <button
              onClick={() => setViewMode('table')}
              className={viewMode === 'table' ? 'btn-blue' : 'btn-secondary'}
              style={{ padding: '6px 12px', fontSize: '0.8rem' }}
            >
              <ListFilter size={14} /> Tabela de Consultas
            </button>
            <button
              onClick={() => setViewMode('dashboard')}
              className={viewMode === 'dashboard' ? 'btn-green' : 'btn-secondary'}
              style={{ padding: '6px 12px', fontSize: '0.8rem' }}
            >
              <BarChart3 size={14} /> Dashboard Analítico
            </button>
          </div>

          <button onClick={() => setIsModalOpen(true)} className="btn-blue">
            <Plus size={18} /> Nova Consulta
          </button>
        </div>
      </div>

      {/* CONDITIONAL VIEW: TABLE OR ANALYTICS DASHBOARD */}
      {viewMode === 'dashboard' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Top KPI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '20px', borderRadius: '14px' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>Total de Consultas</span>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#60a5fa', marginTop: '4px' }}>{totalConsultas}</div>
              <span style={{ fontSize: '0.75rem', color: '#60a5fa', display: 'block', marginTop: '4px' }}>Registradas no sistema</span>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '20px', borderRadius: '14px' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>Pacientes em Acompanhamento</span>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>{pacientesComConsulta}</div>
              <span style={{ fontSize: '0.75rem', color: '#34d399', display: 'block', marginTop: '4px' }}>Com no mínimo 1 consulta</span>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '20px', borderRadius: '14px' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>Retornos Agendados</span>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fbbf24', marginTop: '4px' }}>{retornosProgramados}</div>
              <span style={{ fontSize: '0.75rem', color: '#fbbf24', display: 'block', marginTop: '4px' }}>Sessões de acompanhamento</span>
            </div>
          </div>

          {/* Detailed Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
            
            {/* Próximos Retornos Programados */}
            <div className="glass-panel" style={{ padding: '24px', borderTop: '3px solid #f59e0b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                <Clock size={20} color="#fbbf24" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>Agenda de Próximos Retornos</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {consultas.filter(c => Boolean(c.proximo_retorno)).map(c => {
                  const p = pacientes.find(pac => pac.id === c.paciente_id);
                  return (
                    <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div>
                        <strong style={{ fontSize: '0.95rem', color: '#ffffff', display: 'block' }}>{p?.nome || 'Paciente'}</strong>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Última consulta: {c.data_consulta}</span>
                      </div>
                      <span className="badge badge-amber" style={{ fontWeight: 700 }}>
                        📅 Retorno: {c.proximo_retorno}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Evolução dos Pacientes */}
            <div className="glass-panel" style={{ padding: '24px', borderTop: '3px solid #3b82f6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                <Activity size={20} color="#60a5fa" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>Evolução de Peso & Composição</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {pacientes.map(p => {
                  const pConsultas = consultas.filter(c => c.paciente_id === p.id);
                  const imcRes = calcularIMC(p.peso_inicial, p.altura);
                  return (
                    <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div>
                        <strong style={{ fontSize: '0.95rem', color: '#ffffff', display: 'block' }}>{p.nome}</strong>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                          Peso: {p.peso_inicial ? `${p.peso_inicial} kg` : 'N/I'} • Altura: {p.altura ? `${p.altura} m` : 'N/I'}
                        </span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span className="badge" style={{ background: imcRes.corBg, color: imcRes.corTexto, border: `1px solid ${imcRes.corBorder}`, fontWeight: 700, fontSize: '0.75rem' }}>
                          IMC: {imcRes.imc ? `${imcRes.imc}` : 'N/I'} ({imcRes.classificacao})
                        </span>
                        <span style={{ fontSize: '0.7rem', color: '#60a5fa', display: 'block', marginTop: '2px' }}>
                          {pConsultas.length} consulta(s)
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* Consultations Table */
        <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto', borderTop: '3px solid #10b981' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px 16px' }}>Data</th>
                <th style={{ padding: '12px 16px' }}>Paciente</th>
                <th style={{ padding: '12px 16px' }}>Peso (kg)</th>
                <th style={{ padding: '12px 16px' }}>IMC (kg/m²)</th>
                <th style={{ padding: '12px 16px' }}>Cintura (cm)</th>
                <th style={{ padding: '12px 16px' }}>Quadril (cm)</th>
                <th style={{ padding: '12px 16px' }}>% Gordura</th>
                <th style={{ padding: '12px 16px' }}>Próximo Retorno</th>
              </tr>
            </thead>
            <tbody>
              {consultas.map((consulta) => {
                const paciente = pacientes.find((p) => p.id === consulta.paciente_id);
                const imcRes = calcularIMC(consulta.peso || paciente?.peso_inicial, paciente?.altura);
                return (
                  <tr key={consulta.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 600 }}>{consulta.data_consulta}</td>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#60a5fa' }}>{getPacienteNome(consulta.paciente_id)}</td>
                    <td style={{ padding: '14px 16px', color: '#ffffff' }}>{consulta.peso ? `${consulta.peso} kg` : '-'}</td>
                    <td style={{ padding: '14px 16px' }}>
                      {imcRes.imc ? (
                        <span className="badge" style={{ background: imcRes.corBg, color: imcRes.corTexto, border: `1px solid ${imcRes.corBorder}`, fontWeight: 700 }}>
                          {imcRes.imc} ({imcRes.classificacao})
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
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
                );
              })}
            </tbody>
          </table>
        </div>
      )}

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

              {/* Preview do IMC na Consulta */}
              {(() => {
                const targetPac = pacientes.find(p => p.id === pacienteId);
                const cImcRes = calcularIMC(peso !== '' ? Number(peso) : targetPac?.peso_inicial, targetPac?.altura);
                return (
                  <div style={{
                    background: cImcRes.corBg,
                    border: `1px solid ${cImcRes.corBorder}`,
                    padding: '10px 14px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Scale size={16} color={cImcRes.corTexto} />
                      <span>IMC Calculado: <strong style={{ color: cImcRes.corTexto }}>{cImcRes.imc ? `${cImcRes.imc} kg/m²` : 'N/I'}</strong></span>
                    </div>
                    <span style={{ fontWeight: 700, color: cImcRes.corTexto }}>
                      {cImcRes.classificacao}
                    </span>
                  </div>
                );
              })()}

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
