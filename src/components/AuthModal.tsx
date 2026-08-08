import React, { useState } from 'react';
import { AuthService } from '../lib/neon';
import { Nutricionista } from '../types';
import { Lock, Mail, User, ShieldCheck, ArrowRight, Activity } from 'lucide-react';

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
      <div className="glass-panel" style={{ width: '100%', maxWidth: '440px', padding: '36px 32px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ display: 'inline-flex', background: 'var(--primary-gradient)', padding: '14px', borderRadius: '16px', color: '#fff', marginBottom: '14px', boxShadow: '0 8px 20px rgba(16,185,129,0.3)' }}>
            <Activity size={32} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '6px' }}>
            {isRegister ? 'Criar Conta de Nutricionista' : 'Acessar Feriani Nutri'}
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            {isRegister ? 'Cadastre-se para gerenciar seus pacientes' : 'Entre com suas credenciais do banco Neon'}
          </p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#fca5a5', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {isRegister && (
            <div className="form-group">
              <label className="form-label">Nome Completo</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#64748b' }} />
                <input
                  type="text"
                  required
                  placeholder="Dra. Vanessa Feriani"
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
                placeholder="nutri@ferianinutri.com.br"
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

        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
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
