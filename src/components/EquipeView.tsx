import React, { useState } from 'react';
import { Nutricionista, Paciente } from '../types';
import { Stethoscope, UserCheck, Plus, Crown, Phone, Mail, Award, CheckCircle, ArrowRight, X, Check, Users } from 'lucide-react';
import { DbService, AuthService } from '../lib/neon';

interface EquipeViewProps {
  currentUser: Nutricionista | null;
  pacientes: Paciente[];
  onSelectNutri: (nutri: Nutricionista) => void;
  onNavigateToPacientes: (nutriId?: string) => void;
}

export const EquipeView: React.FC<EquipeViewProps> = ({
  currentUser,
  pacientes,
  onSelectNutri,
  onNavigateToPacientes,
}) => {
  const [nutris, setNutris] = useState<Nutricionista[]>(DbService.getNutricionistas());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [crm, setCrm] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [telefone, setTelefone] = useState('');

  const refreshNutris = () => {
    setNutris(DbService.getNutricionistas());
  };

  const handleCreateNutri = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !email) return;

    const newNutri: Nutricionista = {
      id: crypto.randomUUID(),
      nome,
      email,
      crm: crm || 'CRN-3 Ativo',
      especialidade: especialidade || 'Nutrição Clínica Geral',
      telefone: telefone || '(11) 99999-0000',
      cor: '#3b82f6',
      role: 'nutricionista',
      is_master: false,
      created_at: new Date().toISOString(),
    };

    DbService.registerNutricionista(newNutri);
    refreshNutris();
    setIsModalOpen(false);
    setNome('');
    setEmail('');
    setCrm('');
    setEspecialidade('');
    setTelefone('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Bar */}
      <div className="glass-panel" style={{ padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderLeft: '4px solid #3b82f6', borderRight: '4px solid #10b981' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Corpo Clínico & Nutricionistas</h2>
            <span className="badge badge-blue">Neon PostgreSQL Multi-Tenant</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Selecione qualquer nutricionista da equipe para alternar a sessão ativa ou gerenciar seus pacientes
          </p>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="btn-blue">
          <Plus size={18} /> Cadastrar Nutricionista
        </button>
      </div>

      {/* Grid of Nutritionists */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {nutris.map((nutri) => {
          const isSelected = currentUser?.id === nutri.id;
          const nutrisPacientes = pacientes.filter(p => p.nutricionista_id === nutri.id || p.nutricionista_nome === nutri.nome);

          return (
            <div 
              key={nutri.id} 
              className="glass-panel glass-panel-hover" 
              style={{ 
                padding: '24px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                border: isSelected ? '2px solid #34d399' : '1px solid var(--border-color)',
                boxShadow: isSelected ? '0 0 20px rgba(16, 185, 129, 0.25)' : undefined,
                position: 'relative'
              }}
            >
              <div>
                {/* Top status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ 
                      background: nutri.is_master ? 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)' : 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)', 
                      width: '46px', 
                      height: '46px', 
                      borderRadius: '14px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      color: '#fff',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                    }}>
                      {nutri.is_master ? <Crown size={24} /> : <Stethoscope size={24} />}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: nutri.is_master ? '#fef08a' : '#fff' }}>
                        {nutri.nome}
                      </h3>
                      <span className="badge badge-green" style={{ fontSize: '0.7rem', marginTop: '2px' }}>
                        {nutri.crm || 'CRN Ativo'}
                      </span>
                    </div>
                  </div>

                  {isSelected ? (
                    <span className="badge badge-emerald" style={{ fontWeight: 700, padding: '4px 10px' }}>
                      <CheckCircle size={12} /> Ativo Agora
                    </span>
                  ) : nutri.is_master ? (
                    <span className="badge badge-amber" style={{ fontSize: '0.65rem' }}>
                      👑 Master
                    </span>
                  ) : null}
                </div>

                {/* Specialty */}
                <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '10px 14px', borderRadius: '10px', marginBottom: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block' }}>Especialidade Clínica</span>
                  <strong style={{ fontSize: '0.85rem', color: '#60a5fa' }}>{nutri.especialidade || 'Nutrição Clínica'}</strong>
                </div>

                {/* Contact info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={14} color="#60a5fa" /> {nutri.email}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Phone size={14} color="#34d399" /> {nutri.telefone || '(11) 98000-0000'}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Users size={14} color="#f87171" /> <strong>{nutrisPacientes.length}</strong> pacientes sob acompanhamento
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button
                  onClick={() => onSelectNutri(nutri)}
                  className={isSelected ? "btn-green" : "btn-primary"}
                  style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}
                >
                  {isSelected ? <><Check size={16} /> Perfil Ativo</> : <><UserCheck size={16} /> Acessar Perfil</>}
                </button>

                <button
                  onClick={() => onNavigateToPacientes(nutri.id)}
                  className="btn-secondary"
                  style={{ padding: '10px 14px', fontSize: '0.85rem' }}
                  title="Ver pacientes deste nutricionista"
                >
                  <Users size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Cadastro de Novo Nutricionista */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '560px', padding: '32px', border: '1px solid rgba(59, 130, 246, 0.4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: '#2563eb', padding: '8px', borderRadius: '10px', color: '#fff' }}>
                  <Stethoscope size={20} />
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Novo Nutricionista da Equipe</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="btn-secondary" style={{ padding: '6px' }}><X size={18} /></button>
            </div>

            <form onSubmit={handleCreateNutri} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Nome Completo do Nutricionista *</label>
                <input 
                  type="text" 
                  required 
                  value={nome} 
                  onChange={(e) => setNome(e.target.value)} 
                  className="form-input" 
                  placeholder="Ex: Dra. Beatriz Mendes" 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">E-mail Profissional *</label>
                  <input 
                    type="email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="form-input" 
                    placeholder="beatriz@vagnernutri.com.br" 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Registro Profissional (CRN) *</label>
                  <input 
                    type="text" 
                    required 
                    value={crm} 
                    onChange={(e) => setCrm(e.target.value)} 
                    className="form-input" 
                    placeholder="CRN-3 94520/SP" 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Especialidade Clínica</label>
                  <input 
                    type="text" 
                    value={especialidade} 
                    onChange={(e) => setEspecialidade(e.target.value)} 
                    className="form-input" 
                    placeholder="Ex: Nutrição Esportiva & Hipertrofia" 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Telefone / WhatsApp</label>
                  <input 
                    type="text" 
                    value={telefone} 
                    onChange={(e) => setTelefone(e.target.value)} 
                    className="form-input" 
                    placeholder="(11) 98888-7777" 
                  />
                </div>
              </div>

              <button type="submit" className="btn-blue" style={{ marginTop: '12px', padding: '12px' }}>
                <Check size={18} /> Salvar Nutricionista no Neon DB
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
