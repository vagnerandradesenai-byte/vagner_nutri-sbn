import React from 'react';
import { Nutricionista } from '../types';
import { Activity, User, LogOut, Users, Calendar, Utensils, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  user: Nutricionista | null;
  activeTab: 'dashboard' | 'pacientes' | 'consultas' | 'planos';
  setActiveTab: (tab: 'dashboard' | 'pacientes' | 'consultas' | 'planos') => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, activeTab, setActiveTab, onLogout }) => {
  return (
    <header className="glass-panel" style={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0, padding: '14px 28px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setActiveTab('dashboard')}>
          <div style={{ background: 'var(--primary-gradient)', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 4px 14px rgba(16,185,129,0.3)' }}>
            <Activity size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(to right, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Feriani<span style={{ color: '#10b981', WebkitTextFillColor: '#10b981' }}>Nutri</span>
            </h1>
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
              <Users size={16} /> Pacientes
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255, 255, 255, 0.04)', padding: '6px 14px', borderRadius: '9999px', border: '1px solid var(--border-color)' }}>
              <div style={{ background: '#334155', borderRadius: '50%', padding: '6px', color: '#38bdf8' }}>
                <User size={16} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{user.nome}</span>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{user.email}</span>
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
