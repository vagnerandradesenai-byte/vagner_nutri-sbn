import React, { useState, useRef, useEffect } from 'react';
import { Nutricionista } from '../types';
import { Activity, User, LogOut, Users, Calendar, Utensils, ShieldCheck, Crown, Sparkles, Flame, HeartPulse, Stethoscope, ChevronDown, Check, UserCheck } from 'lucide-react';
import { AuthService, DbService } from '../lib/neon';

interface NavbarProps {
  user: Nutricionista | null;
  activeTab: 'dashboard' | 'pacientes' | 'consultas' | 'planos' | 'equipe';
  setActiveTab: (tab: 'dashboard' | 'pacientes' | 'consultas' | 'planos' | 'equipe') => void;
  onLogout: () => void;
  onSwitchNutri: (nutri: Nutricionista) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, activeTab, setActiveTab, onLogout, onSwitchNutri }) => {
  const isMaster = AuthService.isMasterUser(user);
  const nutrisList = DbService.getNutricionistas();
  const [showSwitchMenu, setShowSwitchMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowSwitchMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="glass-panel" style={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0, padding: '14px 28px', borderBottom: '1px solid rgba(59, 130, 246, 0.2)', position: 'relative', zIndex: 50 }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Logo with Triad (Blue, Green, Red) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setActiveTab('dashboard')}>
          <div style={{ 
            background: isMaster ? 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)' : 'linear-gradient(135deg, #2563eb 0%, #10b981 100%)', 
            padding: '10px', 
            borderRadius: '12px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#fff', 
            boxShadow: isMaster ? '0 4px 16px rgba(239, 68, 68, 0.4)' : '0 4px 14px rgba(37, 99, 235, 0.35)' 
          }}>
            {isMaster ? <Crown size={24} /> : <HeartPulse size={24} />}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
                <span style={{ color: '#60a5fa' }}>Vagner</span>
                <span style={{ color: '#34d399' }}>Nutri</span>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', marginLeft: '4px', boxShadow: '0 0 8px #ef4444' }}></span>
              </h1>
              {isMaster && (
                <span className="badge badge-amber" style={{ fontSize: '0.65rem', padding: '2px 8px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Crown size={10} /> MASTER
                </span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', marginTop: '2px' }}>
              <span className="badge badge-green" style={{ padding: '2px 6px', fontSize: '0.65rem' }}>
                <ShieldCheck size={10} /> Neon DB
              </span>
              <span className="badge badge-blue" style={{ padding: '2px 6px', fontSize: '0.65rem' }}>
                {nutrisList.length} Nutris
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        {user && (
          <nav style={{ display: 'flex', gap: '6px', background: 'rgba(15, 23, 42, 0.7)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={activeTab === 'dashboard' ? 'btn-blue' : 'btn-secondary'}
              style={{ padding: '8px 14px', fontSize: '0.85rem' }}
            >
              <Activity size={16} /> Painel
            </button>
            <button
              onClick={() => setActiveTab('pacientes')}
              className={activeTab === 'pacientes' ? 'btn-green' : 'btn-secondary'}
              style={{ padding: '8px 14px', fontSize: '0.85rem' }}
            >
              <Users size={16} /> Pacientes
            </button>
            <button
              onClick={() => setActiveTab('consultas')}
              className={activeTab === 'consultas' ? 'btn-blue' : 'btn-secondary'}
              style={{ padding: '8px 14px', fontSize: '0.85rem' }}
            >
              <Calendar size={16} /> Consultas
            </button>
            <button
              onClick={() => setActiveTab('planos')}
              className={activeTab === 'planos' ? 'btn-red' : 'btn-secondary'}
              style={{ padding: '8px 14px', fontSize: '0.85rem' }}
            >
              <Utensils size={16} /> Dietas
            </button>
            <button
              onClick={() => setActiveTab('equipe')}
              className={activeTab === 'equipe' ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '8px 14px', fontSize: '0.85rem' }}
            >
              <Stethoscope size={16} /> Equipe
            </button>
          </nav>
        )}

        {/* User Info & Switch Profile Dropdown */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }} ref={menuRef}>
            
            {/* Clickable Profile Switcher Button */}
            <div 
              onClick={() => setShowSwitchMenu(!showSwitchMenu)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                background: isMaster ? 'rgba(245, 158, 11, 0.12)' : 'rgba(37, 99, 235, 0.12)', 
                padding: '6px 14px', 
                borderRadius: '9999px', 
                border: isMaster ? '1px solid rgba(245, 158, 11, 0.35)' : '1px solid rgba(37, 99, 235, 0.35)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title="Clique para trocar de nutricionista"
            >
              <div style={{ 
                background: isMaster ? 'rgba(245, 158, 11, 0.25)' : 'rgba(37, 99, 235, 0.25)', 
                borderRadius: '50%', 
                padding: '6px', 
                color: isMaster ? '#fbbf24' : '#60a5fa' 
              }}>
                {isMaster ? <Crown size={16} /> : <Stethoscope size={16} />}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: isMaster ? '#fef08a' : '#f8fafc' }}>
                  {user.nome}
                </span>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                  {user.crm || (isMaster ? 'Master' : 'CRN')} • Trocar ▾
                </span>
              </div>
              <ChevronDown size={14} color="#94a3b8" />
            </div>

            {/* Switch Nutricionista Dropdown Menu */}
            {showSwitchMenu && (
              <div className="glass-panel" style={{
                position: 'absolute',
                top: '50px',
                right: 0,
                width: '300px',
                padding: '12px',
                zIndex: 100,
                boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                borderRadius: '14px',
                background: 'rgba(15, 23, 42, 0.96)',
                backdropFilter: 'blur(16px)'
              }}>
                <div style={{ padding: '6px 8px 10px', borderBottom: '1px solid var(--border-color)', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Trocar Nutricionista Ativo:
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '280px', overflowY: 'auto' }}>
                  {nutrisList.map((n) => {
                    const isCurrent = n.id === user.id;
                    return (
                      <div
                        key={n.id}
                        onClick={() => {
                          onSwitchNutri(n);
                          setShowSwitchMenu(false);
                        }}
                        style={{
                          padding: '10px 12px',
                          borderRadius: '8px',
                          background: isCurrent ? 'rgba(37, 99, 235, 0.2)' : 'transparent',
                          border: isCurrent ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          transition: 'all 0.15s'
                        }}
                        onMouseEnter={(e) => {
                          if (!isCurrent) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        }}
                        onMouseLeave={(e) => {
                          if (!isCurrent) e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ color: n.is_master ? '#fbbf24' : '#60a5fa' }}>
                            {n.is_master ? <Crown size={15} /> : <Stethoscope size={15} />}
                          </div>
                          <div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: isCurrent ? '#60a5fa' : '#fff' }}>
                              {n.nome}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                              {n.especialidade || 'Nutrição Clínica'}
                            </div>
                          </div>
                        </div>

                        {isCurrent && <Check size={14} color="#34d399" />}
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--border-color)' }}>
                  <button
                    onClick={() => {
                      setActiveTab('equipe');
                      setShowSwitchMenu(false);
                    }}
                    className="btn-secondary"
                    style={{ width: '100%', fontSize: '0.75rem', padding: '6px', justifyContent: 'center' }}
                  >
                    Gerenciar Corpo Clínico
                  </button>
                </div>
              </div>
            )}

            {/* Logout Button */}
            <button 
              onClick={onLogout} 
              className="btn-secondary" 
              style={{ padding: '8px 12px', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)' }} 
              title="Sair do sistema"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '6px' }}>
            <span className="badge badge-blue">Neon Auth</span>
            <span className="badge badge-green">SSL 256-bit</span>
          </div>
        )}
      </div>
    </header>
  );
};
