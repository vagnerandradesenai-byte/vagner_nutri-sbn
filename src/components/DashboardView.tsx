import React from 'react';
import { Paciente, Consulta, PlanoAlimentar } from '../types';
import { Users, Calendar, Utensils, Plus, Activity, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';

interface DashboardViewProps {
  pacientes: Paciente[];
  consultas: Consulta[];
  planos: PlanoAlimentar[];
  onNavigate: (tab: 'pacientes' | 'consultas' | 'planos') => void;
  onOpenNovoPaciente: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  pacientes,
  consultas,
  planos,
  onNavigate,
  onOpenNovoPaciente,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Welcome Banner */}
      <div className="glass-panel" style={{ padding: '28px 32px', background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)', borderLeft: '4px solid #10b981' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-emerald"><CheckCircle2 size={12} /> Neon PostgreSQL 18 Online</span>
              <span className="badge badge-cyan">aws-sa-east-1 (São Paulo)</span>
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
              Bem-vindo ao Painel Vagner Nutri
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Gerencie suas consultas, acompanhe a evolução de seus pacientes e construa planos alimentares personalizados.
            </p>
          </div>

          <button onClick={onOpenNovoPaciente} className="btn-primary">
            <Plus size={18} /> Cadastrar Paciente
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        <div className="glass-panel glass-panel-hover" style={{ padding: '24px', cursor: 'pointer' }} onClick={() => onNavigate('pacientes')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Pacientes Ativos</span>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '10px', borderRadius: '12px' }}>
              <Users size={22} />
            </div>
          </div>
          <div style={{ fontSize: '2.25rem', fontWeight: 800 }}>{pacientes.length}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#34d399', marginTop: '8px' }}>
            <TrendingUp size={14} /> Cadastrados no Neon DB
          </div>
        </div>

        <div className="glass-panel glass-panel-hover" style={{ padding: '24px', cursor: 'pointer' }} onClick={() => onNavigate('consultas')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Consultas Realizadas</span>
            <div style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#38bdf8', padding: '10px', borderRadius: '12px' }}>
              <Calendar size={22} />
            </div>
          </div>
          <div style={{ fontSize: '2.25rem', fontWeight: 800 }}>{consultas.length}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#38bdf8', marginTop: '8px' }}>
            <Activity size={14} /> Registro antropométrico
          </div>
        </div>

        <div className="glass-panel glass-panel-hover" style={{ padding: '24px', cursor: 'pointer' }} onClick={() => onNavigate('planos')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Planos Alimentares</span>
            <div style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', padding: '10px', borderRadius: '12px' }}>
              <Utensils size={22} />
            </div>
          </div>
          <div style={{ fontSize: '2.25rem', fontWeight: 800 }}>{planos.length}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#fbbf24', marginTop: '8px' }}>
            <Utensils size={14} /> Dietas personalizadas JSONB
          </div>
        </div>
      </div>

      {/* Recent Patients Section */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Últimos Pacientes Cadastrados</h3>
          <button onClick={() => onNavigate('pacientes')} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
            Ver Todos
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {pacientes.slice(0, 4).map((paciente) => (
            <div key={paciente.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '4px' }}>{paciente.nome}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '12px' }}>
                  <span>Objetivo: {paciente.objetivos?.join(', ') || 'Geral'}</span>
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
