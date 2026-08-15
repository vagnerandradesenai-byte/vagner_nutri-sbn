import React, { useState } from 'react';
import { Paciente, Nutricionista } from '../types';
import { Users, Plus, Search, User, Phone, Mail, FileText, Trash2, Edit3, X, Check, Activity, Crown, Filter, Sparkles, Stethoscope } from 'lucide-react';
import { AuthService, DbService } from '../lib/neon';

interface PacientesViewProps {
  pacientes: Paciente[];
  user: Nutricionista | null;
  onSavePaciente: (paciente: Omit<Paciente, 'id' | 'created_at'> & { id?: string }) => void;
  onDeletePaciente: (id: string) => void;
  showModalInitially?: boolean;
  onCloseInitialModal?: () => void;
}

export const PacientesView: React.FC<PacientesViewProps> = ({
  pacientes,
  user,
  onSavePaciente,
  onDeletePaciente,
  showModalInitially = false,
  onCloseInitialModal,
}) => {
  const isMaster = AuthService.isMasterUser(user);
  const nutrisList = DbService.getNutricionistas();

  const [search, setSearch] = useState('');
  const [selectedNutriFilter, setSelectedNutriFilter] = useState<string>('all');
  const [selectedPaciente, setSelectedPaciente] = useState<Paciente | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(showModalInitially);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [sexo, setSexo] = useState('Feminino');
  const [pesoInicial, setPesoInicial] = useState<number | ''>('');
  const [altura, setAltura] = useState<number | ''>('');
  const [objetivosStr, setObjetivosStr] = useState('Emagrecimento');
  const [objetivoTexto, setObjetivoTexto] = useState('');
  const [nivelAtividade, setNivelAtividade] = useState('Moderadamente Ativo');
  const [patologiasStr, setPatologiasStr] = useState('');
  const [restricoesStr, setRestricoesStr] = useState('');
  const [alergiasStr, setAlergiasStr] = useState('');
  const [medicamentos, setMedicamentos] = useState('');
  const [suplementos, setSuplementos] = useState('');
  const [refeicoesPorDia, setRefeicoesPorDia] = useState<number | ''>(5);
  const [horarioAcorda, setHorarioAcorda] = useState('07:00');
  const [horarioDorme, setHorarioDorme] = useState('23:00');
  const [litrosAgua, setLitrosAgua] = useState<number | ''>(2.5);
  const [atividadeFisica, setAtividadeFisica] = useState(true);
  const [atividadeFisicaDesc, setAtividadeFisicaDesc] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [nutricionistaResponsavelId, setNutricionistaResponsavelId] = useState(user?.id || 'master-vagner-001');

  const openNewForm = () => {
    setEditingId(null);
    setNome('');
    setEmail('');
    setWhatsapp('');
    setDataNascimento('');
    setSexo('Feminino');
    setPesoInicial('');
    setAltura('');
    setObjetivosStr('Emagrecimento');
    setObjetivoTexto('');
    setNivelAtividade('Moderadamente Ativo');
    setPatologiasStr('');
    setRestricoesStr('');
    setAlergiasStr('');
    setMedicamentos('');
    setSuplementos('');
    setRefeicoesPorDia(5);
    setHorarioAcorda('07:00');
    setHorarioDorme('23:00');
    setLitrosAgua(2.5);
    setAtividadeFisica(true);
    setAtividadeFisicaDesc('');
    setObservacoes('');
    setNutricionistaResponsavelId(user?.id || 'master-vagner-001');
    setIsModalOpen(true);
  };

  const handleEdit = (p: Paciente) => {
    setEditingId(p.id);
    setNome(p.nome);
    setEmail(p.email || '');
    setWhatsapp(p.whatsapp || '');
    setDataNascimento(p.data_nascimento || '');
    setSexo(p.sexo || 'Feminino');
    setPesoInicial(p.peso_inicial || '');
    setAltura(p.altura || '');
    setObjetivosStr(p.objetivos?.join(', ') || 'Emagrecimento');
    setObjetivoTexto(p.objetivo_texto || '');
    setNivelAtividade(p.nivel_atividade || 'Moderadamente Ativo');
    setPatologiasStr(p.patologias?.join(', ') || '');
    setRestricoesStr(p.restricoes_alimentares?.join(', ') || '');
    setAlergiasStr(p.alergias?.join(', ') || '');
    setMedicamentos(p.medicamentos || '');
    setSuplementos(p.suplementos || '');
    setRefeicoesPorDia(p.refeicoes_por_dia || 5);
    setHorarioAcorda(p.horario_acorda || '07:00');
    setHorarioDorme(p.horario_dorme || '23:00');
    setLitrosAgua(p.litros_agua || 2.5);
    setAtividadeFisica(p.atividade_fisica ?? true);
    setAtividadeFisicaDesc(p.atividade_fisica_descricao || '');
    setObservacoes(p.observacoes || '');
    setNutricionistaResponsavelId(p.nutricionista_id || user?.id || 'master-vagner-001');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetNutri = nutrisList.find(n => n.id === nutricionistaResponsavelId) || user;

    onSavePaciente({
      id: editingId || undefined,
      nutricionista_id: targetNutri?.id || user?.id,
      nutricionista_nome: targetNutri?.nome || user?.nome || 'Dr. Vagner Andrade (Master)',
      nome,
      email,
      whatsapp,
      data_nascimento: dataNascimento,
      sexo,
      peso_inicial: pesoInicial !== '' ? Number(pesoInicial) : undefined,
      altura: altura !== '' ? Number(altura) : undefined,
      objetivos: objetivosStr ? objetivosStr.split(',').map((s) => s.trim()) : [],
      objetivo_texto: objetivoTexto,
      nivel_atividade: nivelAtividade,
      patologias: patologiasStr ? patologiasStr.split(',').map((s) => s.trim()) : [],
      restricoes_alimentares: restricoesStr ? restricoesStr.split(',').map((s) => s.trim()) : [],
      alergias: alergiasStr ? alergiasStr.split(',').map((s) => s.trim()) : [],
      medicamentos,
      suplementos,
      refeicoes_por_dia: refeicoesPorDia !== '' ? Number(refeicoesPorDia) : undefined,
      horario_acorda: horarioAcorda,
      horario_dorme: horarioDorme,
      litros_agua: litrosAgua !== '' ? Number(litrosAgua) : undefined,
      atividade_fisica: atividadeFisica,
      atividade_fisica_descricao: atividadeFisicaDesc,
      observacoes,
    });
    setIsModalOpen(false);
    if (onCloseInitialModal) onCloseInitialModal();
  };

  // Filtragem
  const filtered = pacientes.filter((p) => {
    const matchesSearch =
      p.nome.toLowerCase().includes(search.toLowerCase()) ||
      p.email?.toLowerCase().includes(search.toLowerCase()) ||
      p.whatsapp?.includes(search) ||
      p.nutricionista_nome?.toLowerCase().includes(search.toLowerCase());

    const matchesNutri =
      selectedNutriFilter === 'all' ||
      p.nutricionista_id === selectedNutriFilter ||
      p.nutricionista_nome?.toLowerCase().includes(selectedNutriFilter.toLowerCase());

    return matchesSearch && matchesNutri;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Master Banner / Status */}
      {isMaster && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(15, 23, 42, 0.8) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          borderRadius: '16px',
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ background: '#f59e0b', color: '#0f172a', padding: '10px', borderRadius: '12px', display: 'flex' }}>
              <Crown size={26} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fef08a', margin: 0 }}>
                  Visão Master Global — Todos os Pacientes
                </h3>
                <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>
                  Acesso Irrestrito
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', margin: '4px 0 0 0' }}>
                Você tem visualização completa de todos os <strong>{pacientes.length} pacientes</strong> cadastrados por todos os profissionais da clínica.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ textAlign: 'right', background: 'rgba(0,0,0,0.3)', padding: '8px 14px', borderRadius: '10px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block' }}>Total de Nutricionistas</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fbbf24' }}>{nutrisList.length}</span>
            </div>
            <div style={{ textAlign: 'right', background: 'rgba(0,0,0,0.3)', padding: '8px 14px', borderRadius: '10px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block' }}>Base Global de Pacientes</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399' }}>{pacientes.length}</span>
            </div>
          </div>
        </div>
      )}

      {/* Header Bar */}
      <div className="glass-panel" style={{ padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Gestão de Pacientes</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Anamnese completa e histórico dos pacientes no Neon Database</p>
        </div>

        <button onClick={openNewForm} className="btn-primary">
          <Plus size={18} /> Novo Paciente
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: '#64748b' }} />
          <input
            type="text"
            placeholder={isMaster ? "Buscar por paciente, e-mail ou nutricionista responsável..." : "Buscar por nome, e-mail ou WhatsApp..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input"
            style={{ width: '100%', paddingLeft: '46px', paddingRight: '16px', height: '46px', fontSize: '0.95rem' }}
          />
        </div>

        {isMaster && (
          <div style={{ minWidth: '220px', position: 'relative' }}>
            <select
              value={selectedNutriFilter}
              onChange={(e) => setSelectedNutriFilter(e.target.value)}
              className="form-input"
              style={{ height: '46px', fontSize: '0.9rem', paddingLeft: '14px', width: '100%', cursor: 'pointer' }}
            >
              <option value="all">👥 Todos os Nutricionistas ({pacientes.length})</option>
              {nutrisList.map((n) => {
                const count = pacientes.filter(p => p.nutricionista_id === n.id || p.nutricionista_nome === n.nome).length;
                return (
                  <option key={n.id} value={n.id}>
                    {n.nome} ({count})
                  </option>
                );
              })}
            </select>
          </div>
        )}
      </div>

      {/* Patient Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {filtered.map((paciente) => (
          <div key={paciente.id} className="glass-panel glass-panel-hover" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{paciente.nome}</h3>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{paciente.sexo || 'Gênero não informado'}</span>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => handleEdit(paciente)} className="btn-secondary" style={{ padding: '6px', borderRadius: '6px' }} title="Editar paciente">
                    <Edit3 size={14} />
                  </button>
                  <button onClick={() => onDeletePaciente(paciente.id)} className="btn-secondary" style={{ padding: '6px', borderRadius: '6px', color: '#f87171' }} title="Excluir paciente">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Master Tag: Nutricionista Responsável */}
              {isMaster && (
                <div style={{
                  background: 'rgba(30, 41, 59, 0.7)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.75rem',
                  color: '#38bdf8',
                  marginBottom: '14px'
                }}>
                  <Stethoscope size={13} />
                  <span>Resp: <strong>{paciente.nutricionista_nome || 'Dr. Vagner Andrade (Master)'}</strong></span>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={14} color="#38bdf8" /> {paciente.whatsapp || 'WhatsApp não informado'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={14} color="#38bdf8" /> {paciente.email || 'E-mail não informado'}
                </div>
              </div>

              {/* Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                {paciente.objetivos?.map((obj, i) => (
                  <span key={i} className="badge badge-emerald">{obj}</span>
                ))}
                {paciente.restricoes_alimentares?.map((rest, i) => (
                  <span key={i} className="badge badge-amber">{rest}</span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedPaciente(paciente)}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem', marginTop: '12px' }}
            >
              <FileText size={16} /> Ver Anamnese Completa
            </button>
          </div>
        ))}
      </div>

      {/* Modal Anamnese Completa */}
      {selectedPaciente && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99, padding: '20px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Ficha de Anamnese — {selectedPaciente.nome}</h3>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  <span className="badge badge-emerald">Neon PostgreSQL Record</span>
                  {selectedPaciente.nutricionista_nome && (
                    <span className="badge badge-cyan">Nutri: {selectedPaciente.nutricionista_nome}</span>
                  )}
                </div>
              </div>
              <button onClick={() => setSelectedPaciente(null)} className="btn-secondary" style={{ padding: '6px' }}><X size={18} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '0.9rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'rgba(15, 23, 42, 0.6)', padding: '16px', borderRadius: '12px' }}>
                <div><strong>Peso Inicial:</strong> {selectedPaciente.peso_inicial ? `${selectedPaciente.peso_inicial} kg` : 'N/I'}</div>
                <div><strong>Altura:</strong> {selectedPaciente.altura ? `${selectedPaciente.altura} m` : 'N/I'}</div>
                <div><strong>Refeições/dia:</strong> {selectedPaciente.refeicoes_por_dia || 'N/I'}</div>
                <div><strong>Ingestão de Água:</strong> {selectedPaciente.litros_agua ? `${selectedPaciente.litros_agua} L/dia` : 'N/I'}</div>
              </div>

              <div>
                <strong>Objetivos:</strong>
                <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>{selectedPaciente.objetivo_texto || selectedPaciente.objetivos?.join(', ') || 'Nenhum informado'}</p>
              </div>

              <div>
                <strong>Atividade Física:</strong>
                <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>{selectedPaciente.atividade_fisica ? `Sim (${selectedPaciente.atividade_fisica_descricao || 'Sem descrição'})` : 'Não pratica'}</p>
              </div>

              <div>
                <strong>Restrições & Alergias:</strong>
                <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                  {selectedPaciente.restricoes_alimentares?.length ? `Restrições: ${selectedPaciente.restricoes_alimentares.join(', ')}` : 'Sem restrições declaradas.'}
                </p>
              </div>

              <div>
                <strong>Observações Gerais:</strong>
                <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>{selectedPaciente.observacoes || 'Sem observações.'}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Cadastro/Edição de Paciente */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{editingId ? 'Editar Anamnese de Paciente' : 'Novo Paciente Vagner Nutri'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="btn-secondary" style={{ padding: '6px' }}><X size={18} /></button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {isMaster && (
                <div className="form-group" style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
                  <label className="form-label" style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Crown size={14} /> Nutricionista Responsável pelo Atendimento
                  </label>
                  <select
                    value={nutricionistaResponsavelId}
                    onChange={(e) => setNutricionistaResponsavelId(e.target.value)}
                    className="form-input"
                    style={{ width: '100%', marginTop: '4px' }}
                  >
                    {nutrisList.map(n => (
                      <option key={n.id} value={n.id}>{n.nome} ({n.crm || 'CRN'})</option>
                    ))}
                  </select>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Nome Completo *</label>
                  <input type="text" required value={nome} onChange={(e) => setNome(e.target.value)} className="form-input" placeholder="Ana Maria" />
                </div>
                <div className="form-group">
                  <label className="form-label">WhatsApp</label>
                  <input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="form-input" placeholder="(11) 99999-9999" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">E-mail</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" placeholder="paciente@email.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">Peso Inicial (kg)</label>
                  <input type="number" step="0.1" value={pesoInicial} onChange={(e) => setPesoInicial(e.target.value ? Number(e.target.value) : '')} className="form-input" placeholder="65.0" />
                </div>
                <div className="form-group">
                  <label className="form-label">Altura (m)</label>
                  <input type="number" step="0.01" value={altura} onChange={(e) => setAltura(e.target.value ? Number(e.target.value) : '')} className="form-input" placeholder="1.68" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Objetivos (separados por vírgula)</label>
                <input type="text" value={objetivosStr} onChange={(e) => setObjetivosStr(e.target.value)} className="form-input" placeholder="Emagrecimento, Ganho de Massa, Disposição" />
              </div>

              <div className="form-group">
                <label className="form-label">Restrições Alimentares / Intolerâncias</label>
                <input type="text" value={restricoesStr} onChange={(e) => setRestricoesStr(e.target.value)} className="form-input" placeholder="Lactose, Glúten, Vegetariano" />
              </div>

              <div className="form-group">
                <label className="form-label">Observações e Histórico Nutricional</label>
                <textarea rows={3} value={observacoes} onChange={(e) => setObservacoes(e.target.value)} className="form-input" placeholder="Preferências alimentares, hábitos..." />
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '12px', padding: '12px' }}>
                <Check size={18} /> Salvar no Banco Neon
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
