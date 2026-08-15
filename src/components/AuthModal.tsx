import React, { useState } from 'react';
import { AuthService, DbService } from '../lib/neon';
import { Nutricionista } from '../types';
import { Lock, Mail, User, ShieldCheck, ArrowRight, HeartPulse, Crown, Sparkles, CheckCircle, Stethoscope, ChevronRight, UserCheck } from 'lucide-react';

interface AuthModalProps {
  onLoginSuccess: (user: Nutricionista) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onLoginSuccess }) => {
  const [activeMode, setActiveMode] = useState<'picker' | 'login' | 'register'>('picker');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [crm, setCrm] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const nutrisList = DbService.getNutricionistas();

  const handleSelectNutri = (nutri: Nutricionista) => {
    setLoading(true);
    setTimeout(() => {
      AuthService.selectNutricionista(nutri.id);
      onLoginSuccess(nutri);
      setLoading(false);
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (activeMode === 'register') {
        if (!nome) throw new Error('Por favor, informe seu nome completo.');
        const user = await AuthService.register(nome, email, password, crm, especialidade);
        onLoginSuccess(user);
      } else {
        const user = await AuthService.login(email, password);
        onLoginSuccess(user);
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao realizar autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '580px', padding: '36px 32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)', border: '1px solid rgba(59, 130, 246, 0.25)' }}>
        
        {/* Header with Tricolor Icon */}
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <div style={{ display: 'inline-flex', background: 'linear-gradient(135deg, #2563eb 0%, #10b981 100%)', padding: '14px', borderRadius: '16px', color: '#fff', marginBottom: '14px', boxShadow: '0 8px 24px rgba(37,99,235,0.4)' }}>
            <HeartPulse size={32} />
          </div>
          <h2 style={{ fontSize: '1.7rem', fontWeight: 800, marginBottom: '6px', letterSpacing: '-0.02em' }}>
            <span style={{ color: '#60a5fa' }}>Vagner</span><span style={{ color: '#34d399' }}>Nutri</span>
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Selecione seu perfil de nutricionista ou entre com suas credenciais Neon
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div style={{ display: 'flex', gap: '6px', background: 'rgba(15, 23, 42, 0.7)', padding: '4px', borderRadius: '12px', marginBottom: '22px', border: '1px solid var(--border-color)' }}>
          <button
            type="button"
            onClick={() => setActiveMode('picker')}
            className={activeMode === 'picker' ? 'btn-primary' : 'btn-secondary'}
            style={{ flex: 1, padding: '8px 12px', fontSize: '0.85rem' }}
          >
            <Stethoscope size={16} /> Escolher Nutricionista
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('login')}
            className={activeMode === 'login' ? 'btn-blue' : 'btn-secondary'}
            style={{ flex: 1, padding: '8px 12px', fontSize: '0.85rem' }}
          >
            <Lock size={16} /> Login por E-mail
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('register')}
            className={activeMode === 'register' ? 'btn-green' : 'btn-secondary'}
            style={{ flex: 1, padding: '8px 12px', fontSize: '0.85rem' }}
          >
            <User size={16} /> Novo Cadastro
          </button>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#fca5a5', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        {/* 1. PICKER MODE: Direct List of Nutritionists */}
        {activeMode === 'picker' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Clique para entrar no perfil desejado:
              </span>
              <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>
                {nutrisList.length} Ativos
              </span>
            </div>

            {nutrisList.map((nutri) => (
              <div
                key={nutri.id}
                onClick={() => !loading && handleSelectNutri(nutri)}
                className="glass-panel glass-panel-hover"
                style={{
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  borderLeft: nutri.is_master ? '4px solid #f59e0b' : '4px solid #3b82f6',
                  transition: 'all 0.2s ease',
                  opacity: loading ? 0.6 : 1
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    background: nutri.is_master ? 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)' : 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff'
                  }}>
                    {nutri.is_master ? <Crown size={20} /> : <Stethoscope size={20} />}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem', color: nutri.is_master ? '#fef08a' : '#fff' }}>
                        {nutri.nome}
                      </span>
                      {nutri.is_master && (
                        <span className="badge badge-amber" style={{ fontSize: '0.6rem', padding: '1px 6px' }}>Master</span>
                      )}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      {nutri.especialidade || 'Nutrição Clínica'} • <strong style={{ color: '#60a5fa' }}>{nutri.crm || 'CRN'}</strong>
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#60a5fa', fontSize: '0.8rem', fontWeight: 600 }}>
                  <span>Acessar</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. LOGIN / REGISTER FORM */}
        {(activeMode === 'login' || activeMode === 'register') && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {activeMode === 'register' && (
              <>
                <div className="form-group">
                  <label className="form-label">Nome Completo do Nutricionista *</label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#60a5fa' }} />
                    <input
                      type="text"
                      required
                      placeholder="Dr. Carlos Eduardo"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="form-input"
                      style={{ paddingLeft: '40px', width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Registro Profissional (CRN)</label>
                    <input
                      type="text"
                      placeholder="CRN-3 12345/SP"
                      value={crm}
                      onChange={(e) => setCrm(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Especialidade</label>
                    <input
                      type="text"
                      placeholder="Nutrição Esportiva"
                      value={especialidade}
                      onChange={(e) => setEspecialidade(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="form-group">
              <label className="form-label">E-mail Profissional</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#60a5fa' }} />
                <input
                  type="email"
                  required
                  placeholder="nutri@vagnernutri.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '40px', width: '100%' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Senha de Acesso</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#60a5fa' }} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '40px', width: '100%' }}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className={activeMode === 'register' ? 'btn-green' : 'btn-blue'} 
              style={{ width: '100%', padding: '12px', marginTop: '6px' }}
            >
              {loading ? (
                'Autenticando no Neon...'
              ) : (
                <>
                  {activeMode === 'register' ? 'Concluir Cadastro de Nutricionista' : 'Entrar no Sistema'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        )}

        <div style={{ marginTop: '22px', paddingTop: '18px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#64748b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={14} color="#10b981" /> Neon Auth + PostgreSQL 18 SSL
          </div>
          <span style={{ color: '#94a3b8' }}>Multi-Profissional</span>
        </div>
      </div>
    </div>
  );
};
