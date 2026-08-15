import React, { useState } from 'react';
import { AuthService } from '../lib/neon';
import { Nutricionista } from '../types';
import { Lock, Mail, User, ShieldCheck, ArrowRight, Activity, Crown, Sparkles, CheckCircle } from 'lucide-react';

interface AuthModalProps {
  onLoginSuccess: (user: Nutricionista) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleMasterDirectLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const masterUser = AuthService.loginMaster();
      onLoginSuccess(masterUser);
      setLoading(false);
    }, 400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        if (!nome) throw new Error('Por favor, informe seu nome completo.');
        const user = await AuthService.register(nome, email, password);
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
      <div className="glass-panel" style={{ width: '100%', maxWidth: '480px', padding: '36px 32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.12)' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'inline-flex', background: 'var(--primary-gradient)', padding: '14px', borderRadius: '16px', color: '#fff', marginBottom: '14px', boxShadow: '0 8px 24px rgba(16,185,129,0.35)' }}>
            <Activity size={32} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '6px', letterSpacing: '-0.02em' }}>
            {isRegister ? 'Criar Conta de Nutricionista' : 'Acessar Vagner Nutri'}
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            {isRegister ? 'Cadastre-se para gerenciar seus pacientes' : 'Plataforma integrada ao Neon PostgreSQL'}
          </p>
        </div>

        {/* Master Quick Access Highlight */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(217, 119, 6, 0.22) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.4)',
          borderRadius: '14px',
          padding: '16px',
          marginBottom: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ background: '#f59e0b', color: '#0f172a', padding: '4px', borderRadius: '8px', display: 'flex' }}>
                <Crown size={18} />
              </div>
              <div>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fbbf24' }}>Acesso Master Geral</span>
                <p style={{ fontSize: '0.75rem', color: '#e2e8f0', margin: 0 }}>Visão completa de todos os pacientes e nutricionistas</p>
              </div>
            </div>
            <span className="badge badge-amber" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>
              <Sparkles size={10} /> 1-Clique
            </span>
          </div>

          <button
            type="button"
            onClick={handleMasterDirectLogin}
            disabled={loading}
            style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: '#0f172a',
              fontWeight: 700,
              fontSize: '0.875rem',
              padding: '10px 16px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)'
            }}
          >
            <Crown size={16} /> Entrar como Master (Dr. Vagner)
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ou acesse com login individual</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#fca5a5', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {isRegister && (
            <div className="form-group">
              <label className="form-label">Nome Completo</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#64748b' }} />
                <input
                  type="text"
                  required
                  placeholder="Dr. Vagner Andrade"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '40px', width: '100%' }}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">E-mail Profissional</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#64748b' }} />
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
            <label className="form-label">Senha</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#64748b' }} />
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

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '12px', marginTop: '6px' }}>
            {loading ? (
              'Autenticando no Neon...'
            ) : (
              <>
                {isRegister ? 'Finalizar Cadastro' : 'Entrar no Sistema'}
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: '22px', paddingTop: '18px', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
            style={{ background: 'none', color: '#38bdf8', fontSize: '0.875rem', fontWeight: 500 }}
          >
            {isRegister ? 'Já possui uma conta? Faça login' : 'Não tem conta? Cadastre-se aqui'}
          </button>

          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.75rem', color: '#64748b' }}>
            <ShieldCheck size={14} color="#10b981" /> Conexão encriptada Neon Auth + Postgres SSL
          </div>
        </div>
      </div>
    </div>
  );
};
