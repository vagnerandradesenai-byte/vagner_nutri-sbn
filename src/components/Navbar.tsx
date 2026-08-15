import React from 'react';
import { Nutricionista } from '../types';
import { Activity, User, LogOut, Users, Calendar, Utensils, ShieldCheck, Crown, Sparkles } from 'lucide-react';
import { AuthService } from '../lib/neon';

interface NavbarProps {
  user: Nutricionista | null;
  activeTab: 'dashboard' | 'pacientes' | 'consultas' | 'planos';
  setActiveTab: (tab: 'dashboard' | 'pacientes' | 'consultas' | 'planos') => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, activeTab, setActiveTab, onLogout }) => {
  const isMaster = AuthService.isMasterUser(user);

  return (
    <header className="glass-panel" style={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0, padding: '14px 28px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setActiveTab('dashboard')}>
          <div style={{ background: isMaster ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'var(--primary-gradient)', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isMaster ? '#0f172a' : '#fff', boxShadow: isMaster ? '0 4px 16px rgba(245,158,11,0.4)' : '0 4px 14px rgba(16,185,129,0.3)' }}>
            {isMaster ? <Crown size={24} /> : <Activity size={24} />}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(to right, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
                Vagner<span style={{ color: isMaster ? '#fbbf24' : '#10b981', WebkitTextFillColor: isMaster ? '#fbbf24' : '#10b981' }}>Nutri</span>
              </h1>
              {isMaster && (
                <span className="badge badge-amber" style={{ fontSize: '0.65rem', padding: '2px 8px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Crown size={10} /> ACESSO MASTER
                </span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#94a3b8' }}>
              <span className="badge badge-emerald" style={{ padding: '2px 6px', fontSize: '0.65rem' }}>
                <ShieldCheck size={10} /> Neon Connected
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        {user && (
          <nav style={{ display: 'flex', gap: '8px', background: 'rgba(15, 23, 42, 0.6)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={activeTab === 'dashboard' ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '8px 16px', fontSize: '0.875rem' }}
            >
              <Activity size={16} /> Painel
            </button>
            <button
              onClick={() => setActiveTab('pacientes')}
              className={activeTab === 'pacientes' ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '8px 16px', fontSize: '0.875rem' }}
            >
              <Users size={16} /> {isMaster ? 'Todos os Pacientes' : 'Pacientes'}
            </button>
            <button
              onClick={() => setActiveTab('consultas')}
              className={activeTab === 'consultas' ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '8px 16px', fontSize: '0.875rem' }}
            >
              <Calendar size={16} /> Consultas
            </button>
            <button
              onClick={() => setActiveTab('planos')}
              className={activeTab === 'planos' ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '8px 16px', fontSize: '0.875rem' }}
            >
              <Utensils size={16} /> Planos Alimentares
            </button>
          </nav>
        )}

        {/* User Info & Actions */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              background: isMaster ? 'rgba(245, 158, 11, 0.08)' : 'rgba(255, 255, 255, 0.04)', 
              padding: '6px 14px', 
              borderRadius: '9999px', 
              border: isMaster ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid var(--border-color)' 
            }}>
              <div style={{ 
                background: isMaster ? 'rgba(245, 158, 11, 0.2)' : '#334155', 
                borderRadius: '50%', 
                padding: '6px', 
                color: isMaster ? '#fbbf24' : '#38bdf8' 
              }}>
                {isMaster ? <Crown size={16} /> : <User size={16} />}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: isMaster ? '#fef08a' : '#f8fafc' }}>
                  {user.nome}
                </span>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                  {isMaster ? 'Diretor Técnico / Master' : user.email}
                </span>
              </div>
            </div>

            <button onClick={onLogout} className="btn-secondary" style={{ padding: '8px 12px', color: '#f87171' }} title="Sair do sistema">
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <span className="badge badge-cyan">Sessão Segura Neon Auth</span>
        )}
      </div>
    </header>
  );
};
