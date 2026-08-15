import React from 'react';
import { Paciente, Consulta, PlanoAlimentar, Nutricionista } from '../types';
import { Users, Calendar, Utensils, Plus, Activity, CheckCircle2, TrendingUp, ShieldCheck, Crown, Sparkles, Stethoscope, UserCheck, Flame, HeartPulse, ChevronRight } from 'lucide-react';
import { AuthService, DbService } from '../lib/neon';

interface DashboardViewProps {
  user: Nutricionista | null;
  pacientes: Paciente[];
  consultas: Consulta[];
  planos: PlanoAlimentar[];
  onNavigate: (tab: 'pacientes' | 'consultas' | 'planos' | 'equipe') => void;
  onOpenNovoPaciente: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  pacientes,
  consultas,
  planos,
  onNavigate,
  onOpenNovoPaciente,
}) => {
  const isMaster = AuthService.isMasterUser(user);
  const nutrisList = DbService.getNutricionistas();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Welcome Banner with Tricolor Ambient Accents */}
      <div className="glass-panel" style={{ 
        padding: '28px 32px', 
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.85) 100%)', 
        borderLeft: isMaster ? '4px solid #f59e0b' : '4px solid #3b82f6',
        borderRight: '4px solid #10b981',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle decorative glow bar on top */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #3b82f6 0%, #10b981 50%, #ef4444 100%)'
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-green"><CheckCircle2 size={12} /> Neon PostgreSQL 18</span>
              <span className="badge badge-blue">aws-sa-east-1 (São Paulo)</span>
              {isMaster && (
                <span className="badge badge-amber" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Crown size={12} /> Painel Master Ativo
                </span>
              )}
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
              {isMaster ? 'Painel Executivo Master — Vagner Nutri' : `Painel Clínico — ${user?.nome || 'Vagner Nutri'}`}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              {isMaster 
                ? 'Supervisão centralizada de todos os pacientes, consultas e nutricionistas cadastrados no banco de dados Neon.' 
                : 'Gerencie suas consultas, acompanhe a evolução antropométrica e construa planos alimentares personalizados.'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button onClick={() => onNavigate('equipe')} className="btn-secondary">
              <Stethoscope size={16} color="#60a5fa" /> Escolher Nutricionista
            </button>
            <button onClick={onOpenNovoPaciente} className="btn-primary" style={{ padding: '12px 24px' }}>
              <Plus size={18} /> Cadastrar Paciente
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Cards: AZUL (Pacientes), VERDE (Consultas), VERMELHO (Planos/Metas), ÂMBAR (Equipe) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        
        {/* Card 1: AZUL (Pacientes) */}
        <div 
          className="glass-panel glass-panel-hover" 
          style={{ padding: '24px', cursor: 'pointer', borderTop: '3px solid #3b82f6' }} 
          onClick={() => onNavigate('pacientes')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#94a3b8' }}>
              {isMaster ? 'Pacientes (Base Global)' : 'Pacientes Ativos'}
            </span>
            <div style={{ background: 'rgba(37, 99, 235, 0.18)', color: '#60a5fa', padding: '10px', borderRadius: '12px', boxShadow: '0 0 12px rgba(37, 99, 235, 0.3)' }}>
              <Users size={22} />
            </div>
          </div>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#ffffff' }}>{pacientes.length}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#60a5fa', marginTop: '8px' }}>
            <TrendingUp size={14} /> Cadastrados no Neon DB
          </div>
        </div>

        {/* Card 2: VERDE (Consultas / Antropometria) */}
        <div 
          className="glass-panel glass-panel-hover" 
          style={{ padding: '24px', cursor: 'pointer', borderTop: '3px solid #10b981' }} 
          onClick={() => onNavigate('consultas')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#94a3b8' }}>Consultas Realizadas</span>
            <div style={{ background: 'rgba(16, 185, 129, 0.18)', color: '#34d399', padding: '10px', borderRadius: '12px', boxShadow: '0 0 12px rgba(16, 185, 129, 0.3)' }}>
              <Calendar size={22} />
            </div>
          </div>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#ffffff' }}>{consultas.length}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#34d399', marginTop: '8px' }}>
            <Activity size={14} /> Avaliação antropométrica
          </div>
        </div>

        {/* Card 3: VERMELHO (Planos & Energia / Dietas) */}
        <div 
          className="glass-panel glass-panel-hover" 
          style={{ padding: '24px', cursor: 'pointer', borderTop: '3px solid #ef4444' }} 
          onClick={() => onNavigate('planos')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#94a3b8' }}>Planos Alimentares</span>
            <div style={{ background: 'rgba(239, 68, 68, 0.18)', color: '#f87171', padding: '10px', borderRadius: '12px', boxShadow: '0 0 12px rgba(239, 68, 68, 0.3)' }}>
              <Flame size={22} />
            </div>
          </div>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#ffffff' }}>{planos.length}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#f87171', marginTop: '8px' }}>
            <Utensils size={14} /> Metas calóricas & macros
          </div>
        </div>

        {/* Card 4: Equipe Médica */}
        <div 
          className="glass-panel glass-panel-hover" 
          style={{ padding: '24px', cursor: 'pointer', borderTop: '3px solid #f59e0b' }} 
          onClick={() => onNavigate('equipe')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#94a3b8' }}>Corpo Clínico</span>
            <div style={{ background: 'rgba(245, 158, 11, 0.18)', color: '#fbbf24', padding: '10px', borderRadius: '12px', boxShadow: '0 0 12px rgba(245, 158, 11, 0.3)' }}>
              <Stethoscope size={22} />
            </div>
          </div>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fbbf24' }}>{nutrisList.length}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#fbbf24', marginTop: '8px' }}>
            <UserCheck size={14} /> Escolher nutricionista
          </div>
        </div>
      </div>

      {/* Master Team Breakdown */}
      <div className="glass-panel" style={{ padding: '28px', border: '1px solid rgba(59, 130, 246, 0.25)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'rgba(37, 99, 235, 0.2)', padding: '6px', borderRadius: '8px', color: '#60a5fa' }}>
              <Stethoscope size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Distribuição de Pacientes por Nutricionista</h3>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>Clique em qualquer profissional para ver detalhes ou trocar o perfil</p>
            </div>
          </div>
          <button onClick={() => onNavigate('equipe')} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
            Ver Todos os Nutricionistas
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {nutrisList.map((nutri, index) => {
            const nutrisPacientes = pacientes.filter(p => p.nutricionista_id === nutri.id || p.nutricionista_nome === nutri.nome);
            const percentage = pacientes.length > 0 ? Math.round((nutrisPacientes.length / pacientes.length) * 100) : 0;
            const isCurrent = user?.id === nutri.id;

            const gradList = [
              'linear-gradient(90deg, #f59e0b, #fbbf24)',
              'linear-gradient(90deg, #3b82f6, #60a5fa)',
              'linear-gradient(90deg, #10b981, #34d399)',
              'linear-gradient(90deg, #ef4444, #f87171)',
              'linear-gradient(90deg, #8b5cf6, #a78bfa)'
            ];
            const barGradient = gradList[index % gradList.length];

            return (
              <div 
                key={nutri.id} 
                onClick={() => onNavigate('equipe')}
                style={{ 
                  background: isCurrent ? 'rgba(37, 99, 235, 0.12)' : 'rgba(15, 23, 42, 0.6)', 
                  border: isCurrent ? '1px solid rgba(59, 130, 246, 0.5)' : '1px solid var(--border-color)', 
                  borderRadius: '12px', 
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: nutri.is_master ? '#fbbf24' : '#fff' }}>
                    {nutri.nome}
                  </div>
                  <span className={nutri.is_master ? "badge badge-amber" : "badge badge-blue"} style={{ fontSize: '0.7rem' }}>
                    {nutri.crm || 'CRN'}
                  </span>
                </div>

                <div style={{ fontSize: '0.75rem', color: '#60a5fa', marginBottom: '6px' }}>
                  {nutri.especialidade || 'Nutrição Clínica'}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px' }}>
                  <span>Pacientes ativos</span>
                  <strong style={{ color: '#fff' }}>{nutrisPacientes.length} ({percentage}%)</strong>
                </div>

                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: `${percentage}%`, height: '100%', background: barGradient }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Patients Section */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
            {isMaster ? 'Últimos Pacientes Cadastrados na Rede' : 'Últimos Pacientes Cadastrados'}
          </h3>
          <button onClick={() => onNavigate('pacientes')} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
            Ver Todos
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {pacientes.slice(0, 5).map((paciente) => (
            <div key={paciente.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: '#ffffff' }}>{paciente.nome}</div>
                  <span className="badge badge-blue" style={{ fontSize: '0.65rem' }}>
                    {paciente.nutricionista_nome || 'Dr. Vagner (Master)'}
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '12px', marginTop: '4px' }}>
                  <span>Objetivo: <strong style={{ color: '#34d399' }}>{paciente.objetivos?.join(', ') || 'Geral'}</strong></span>
                  <span>•</span>
                  <span>WhatsApp: {paciente.whatsapp || 'Não informado'}</span>
                </div>
              </div>
              <button onClick={() => onNavigate('pacientes')} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                Ver Ficha
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
