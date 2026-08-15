import React from 'react';
import { Paciente, Consulta, PlanoAlimentar, Nutricionista } from '../types';
import { Users, Calendar, Utensils, Plus, Activity, CheckCircle2, TrendingUp, ShieldCheck, Crown, Sparkles, Stethoscope, UserCheck } from 'lucide-react';
import { AuthService, DbService } from '../lib/neon';

interface DashboardViewProps {
  user: Nutricionista | null;
  pacientes: Paciente[];
  consultas: Consulta[];
  planos: PlanoAlimentar[];
  onNavigate: (tab: 'pacientes' | 'consultas' | 'planos') => void;
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
      
      {/* Welcome Banner */}
      <div className="glass-panel" style={{ 
        padding: '28px 32px', 
        background: isMaster 
          ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(20, 29, 47, 0.95) 100%)' 
          : 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)', 
        borderLeft: isMaster ? '4px solid #f59e0b' : '4px solid #10b981' 
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-emerald"><CheckCircle2 size={12} /> Neon PostgreSQL 18 Online</span>
              <span className="badge badge-cyan">aws-sa-east-1 (São Paulo)</span>
              {isMaster && (
                <span className="badge badge-amber" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Crown size={12} /> Painel Master Ativo
                </span>
              )}
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
              {isMaster ? 'Painel Executivo Master — Vagner Nutri' : 'Bem-vindo ao Painel Vagner Nutri'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              {isMaster 
                ? 'Supervisão centralizada de todos os pacientes, consultas e nutricionistas cadastrados no banco de dados Neon.' 
                : 'Gerencie suas consultas, acompanhe a evolução de seus pacientes e construa planos alimentares personalizados.'}
            </p>
          </div>

          <button onClick={onOpenNovoPaciente} className="btn-primary">
            <Plus size={18} /> Cadastrar Paciente
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <div className="glass-panel glass-panel-hover" style={{ padding: '24px', cursor: 'pointer' }} onClick={() => onNavigate('pacientes')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              {isMaster ? 'Total de Pacientes (Global)' : 'Pacientes Ativos'}
            </span>
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
            <Utensils size={14} /> Dietas personalizadas
          </div>
        </div>

        {isMaster && (
          <div className="glass-panel glass-panel-hover" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Nutricionistas na Rede</span>
              <div style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', padding: '10px', borderRadius: '12px' }}>
                <Stethoscope size={22} />
              </div>
            </div>
            <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#fbbf24' }}>{nutrisList.length}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#fbbf24', marginTop: '8px' }}>
              <UserCheck size={14} /> Equipe clínica ativa
            </div>
          </div>
        )}
      </div>

      {/* Master Team Breakdown */}
      {isMaster && (
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Crown size={20} color="#fbbf24" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Distribuição de Pacientes por Nutricionista</h3>
            </div>
            <span className="badge badge-amber">Visão Administrativa</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {nutrisList.map((nutri) => {
              const nutrisPacientes = pacientes.filter(p => p.nutricionista_id === nutri.id || p.nutricionista_nome === nutri.nome);
              const percentage = pacientes.length > 0 ? Math.round((nutrisPacientes.length / pacientes.length) * 100) : 0;

              return (
                <div key={nutri.id} style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: nutri.is_master ? '#fbbf24' : '#fff' }}>
                      {nutri.nome}
                    </div>
                    <span className={nutri.is_master ? "badge badge-amber" : "badge badge-cyan"} style={{ fontSize: '0.7rem' }}>
                      {nutri.crm || (nutri.is_master ? 'Master' : 'CRN')}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px' }}>
                    <span>Pacientes atribuídos</span>
                    <strong>{nutrisPacientes.length} ({percentage}%)</strong>
                  </div>

                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ width: `${percentage}%`, height: '100%', background: nutri.is_master ? 'linear-gradient(90deg, #f59e0b, #fbbf24)' : 'linear-gradient(90deg, #10b981, #38bdf8)' }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Patients Section */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
            {isMaster ? 'Últimos Pacientes Cadastrados na Rede' : 'Últimos Pacientes Cadastrados'}
          </h3>
          <button onClick={() => onNavigate('pacientes')} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
            Ver Todos
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {pacientes.slice(0, 5).map((paciente) => (
            <div key={paciente.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ fontWeight: 700, fontSize: '1rem' }}>{paciente.nome}</div>
                  {isMaster && (
                    <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                      {paciente.nutricionista_nome || 'Dr. Vagner (Master)'}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '12px', marginTop: '4px' }}>
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
