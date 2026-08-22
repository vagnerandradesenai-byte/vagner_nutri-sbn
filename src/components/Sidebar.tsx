import React, { useState, useRef, useEffect } from 'react';
import { Nutricionista } from '../types';
import { Activity, Users, Calendar, Utensils, Stethoscope, Crown, ShieldCheck, LogOut, ChevronDown, Check, LayoutDashboard, Menu, X, Download, Smartphone } from 'lucide-react';
import { AuthService, DbService } from '../lib/neon';
import { CorinthiansLogo } from './CorinthiansLogo';

interface SidebarProps {
  user: Nutricionista | null;
  activeTab: 'dashboard' | 'pacientes' | 'consultas' | 'planos' | 'equipe';
  setActiveTab: (tab: 'dashboard' | 'pacientes' | 'consultas' | 'planos' | 'equipe') => void;
  onLogout: () => void;
  onSwitchNutri: (nutri: Nutricionista) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  user,
  activeTab,
  setActiveTab,
  onLogout,
  onSwitchNutri,
}) => {
  const isMaster = AuthService.isMasterUser(user);
  const nutrisList = DbService.getNutricionistas();
  
  const [showSwitchMenu, setShowSwitchMenu] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalledPWA, setIsInstalledPWA] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsMobileOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowSwitchMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // PWA Install Event Handler
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalledPWA(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallPWA = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('PWA aceito pelo usuário!');
          setIsInstalledPWA(true);
        }
        setDeferredPrompt(null);
      });
    }
  };

  const handleTabClick = (tab: 'dashboard' | 'pacientes' | 'consultas' | 'planos' | 'equipe') => {
    setActiveTab(tab);
    if (isMobile) setIsMobileOpen(false);
  };

  if (!user) return null;

  return (
    <>
      {/* HEADER MOBILE (Visível apenas em telas menores que 768px) */}
      {isMobile && (
        <header
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '60px',
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(59, 130, 246, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            zIndex: 80,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => handleTabClick('dashboard')}>
            <CorinthiansLogo size={34} />
            <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
              <span style={{ color: '#60a5fa' }}>Vagner</span>
              <span style={{ color: '#34d399' }}>Nutri</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {deferredPrompt && !isInstalledPWA && (
              <button
                onClick={handleInstallPWA}
                className="btn-primary"
                style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '20px' }}
              >
                <Download size={14} /> Instalar
              </button>
            )}

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '8px',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Abrir Menu"
            >
              {isMobileOpen ? <X size={22} color="#f87171" /> : <Menu size={22} color="#60a5fa" />}
            </button>
          </div>
        </header>
      )}

      {/* OVERLAY MOBILE BACKDROP */}
      {isMobile && isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
            zIndex: 85,
          }}
        />
      )}

      {/* SIDEBAR CONTAINER (DESKTOP FIXO & MOBILE DRAWER) */}
      <aside
        className="glass-panel"
        style={{
          width: '260px',
          minHeight: '100vh',
          borderRadius: 0,
          borderTop: 0,
          borderBottom: 0,
          borderLeft: 0,
          borderRight: '1px solid rgba(59, 130, 246, 0.2)',
          padding: '24px 18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 90,
          background: 'rgba(15, 23, 42, 0.98)',
          backdropFilter: 'blur(16px)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isMobile ? (isMobileOpen ? 'translateX(0)' : 'translateX(-100%)') : 'none',
        }}
      >
        {/* Top Header & Logo */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
              paddingBottom: '16px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => handleTabClick('dashboard')}>
              <CorinthiansLogo size={40} />
              <div>
                <h1 style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
                  <span style={{ color: '#60a5fa' }}>Vagner</span>
                  <span style={{ color: '#34d399' }}>Nutri</span>
                  <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', marginLeft: '3px' }}></span>
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                  <span className="badge badge-red" style={{ padding: '1px 6px', fontSize: '0.6rem', background: 'rgba(220,38,38,0.2)', color: '#fca5a5' }}>
                    🦅 Timão
                  </span>
                  <span className="badge badge-green" style={{ padding: '1px 6px', fontSize: '0.6rem' }}>
                    PWA App
                  </span>
                </div>
              </div>
            </div>

            {isMobile && (
              <button onClick={() => setIsMobileOpen(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8' }}>
                <X size={20} />
              </button>
            )}
          </div>

          {/* Botão de Instalação PWA (se disponível no Desktop ou Celular) */}
          {deferredPrompt && !isInstalledPWA && (
            <div style={{ marginBottom: '16px' }}>
              <button
                onClick={handleInstallPWA}
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '10px',
                  fontSize: '0.85rem',
                  borderRadius: '10px',
                }}
              >
                <Smartphone size={16} /> Instalar Aplicativo PWA
              </button>
            </div>
          )}

          {/* Navigation Menu Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={() => handleTabClick('dashboard')}
              className={activeTab === 'dashboard' ? 'btn-blue' : 'btn-secondary'}
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                padding: '12px 16px',
                fontSize: '0.9rem',
                borderRadius: '10px',
                fontWeight: 700,
              }}
            >
              <LayoutDashboard size={18} /> Dashboard
            </button>

            <button
              onClick={() => handleTabClick('pacientes')}
              className={activeTab === 'pacientes' ? 'btn-green' : 'btn-secondary'}
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                padding: '12px 16px',
                fontSize: '0.9rem',
                borderRadius: '10px',
                fontWeight: 700,
              }}
            >
              <Users size={18} /> Pacientes
            </button>

            <button
              onClick={() => handleTabClick('consultas')}
              className={activeTab === 'consultas' ? 'btn-blue' : 'btn-secondary'}
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                padding: '12px 16px',
                fontSize: '0.9rem',
                borderRadius: '10px',
                fontWeight: 700,
              }}
            >
              <Calendar size={18} /> Consultas
            </button>

            <button
              onClick={() => handleTabClick('planos')}
              className={activeTab === 'planos' ? 'btn-red' : 'btn-secondary'}
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                padding: '12px 16px',
                fontSize: '0.9rem',
                borderRadius: '10px',
                fontWeight: 700,
              }}
            >
              <Utensils size={18} /> Dietas
            </button>

            <button
              onClick={() => handleTabClick('equipe')}
              className={activeTab === 'equipe' ? 'btn-primary' : 'btn-secondary'}
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                padding: '12px 16px',
                fontSize: '0.9rem',
                borderRadius: '10px',
                fontWeight: 700,
              }}
            >
              <Stethoscope size={18} /> Equipe
            </button>
          </nav>
        </div>

        {/* Bottom Profile Switcher & Logout */}
        <div style={{ position: 'relative', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }} ref={menuRef}>
          
          {/* Profile Card Button */}
          <div
            onClick={() => setShowSwitchMenu(!showSwitchMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: isMaster ? 'rgba(245, 158, 11, 0.12)' : 'rgba(37, 99, 235, 0.12)',
              padding: '10px 12px',
              borderRadius: '12px',
              border: isMaster ? '1px solid rgba(245, 158, 11, 0.35)' : '1px solid rgba(37, 99, 235, 0.35)',
              cursor: 'pointer',
              marginBottom: '10px',
            }}
            title="Clique para trocar de perfil de nutricionista"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  background: isMaster ? 'rgba(245, 158, 11, 0.25)' : 'rgba(37, 99, 235, 0.25)',
                  borderRadius: '50%',
                  padding: '6px',
                  color: isMaster ? '#fbbf24' : '#60a5fa',
                }}
              >
                {isMaster ? <Crown size={16} /> : <Stethoscope size={16} />}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: isMaster ? '#fef08a' : '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '130px' }}>
                  {user.nome}
                </span>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                  {user.crm || (isMaster ? 'Master' : 'CRN')}
                </span>
              </div>
            </div>
            <ChevronDown size={14} color="#94a3b8" />
          </div>

          {/* Dropdown Menu para Troca de Perfis */}
          {showSwitchMenu && (
            <div
              style={{
                position: 'absolute',
                bottom: '100%',
                left: 0,
                right: 0,
                marginBottom: '8px',
                background: '#0f172a',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                borderRadius: '12px',
                padding: '10px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.8)',
                zIndex: 100,
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', padding: '4px 8px', marginBottom: '6px' }}>
                Trocar Perfil no Neon DB:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '180px', overflowY: 'auto' }}>
                {nutrisList.map((n) => {
                  const isSelected = n.id === user.id;
                  return (
                    <button
                      key={n.id}
                      onClick={() => {
                        onSwitchNutri(n);
                        setShowSwitchMenu(false);
                        if (isMobile) setIsMobileOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: 'none',
                        background: isSelected ? 'rgba(37, 99, 235, 0.25)' : 'transparent',
                        color: isSelected ? '#60a5fa' : '#cbd5e1',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        textAlign: 'left',
                      }}
                    >
                      <span>{n.nome}</span>
                      {isSelected && <Check size={14} color="#34d399" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="btn-secondary"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '10px',
              fontSize: '0.85rem',
              color: '#f87171',
              borderColor: 'rgba(239, 68, 68, 0.3)',
            }}
          >
            <LogOut size={16} /> Sair do Sistema
          </button>
        </div>
      </aside>
    </>
  );
};
