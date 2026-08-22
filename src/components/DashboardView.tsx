import React, { useState } from 'react';
import { Paciente, Consulta, PlanoAlimentar, Nutricionista } from '../types';
import { Users, Calendar, Utensils, Plus, Activity, CheckCircle2, TrendingUp, ShieldCheck, Crown, Sparkles, Stethoscope, UserCheck, Flame, HeartPulse, ChevronRight, Scale, Clock, PieChart, BarChart3, ArrowUpRight, Filter, AlertCircle } from 'lucide-react';
import { AuthService, DbService } from '../lib/neon';
import { calcularIMC } from '../lib/imc';
import { CorinthiansLogo } from './CorinthiansLogo';

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

  const [selectedNutriFilter, setSelectedNutriFilter] = useState<string>('all');

  // Filtragem de atendimentos
  const filteredConsultas = consultas.filter((c) => {
    if (selectedNutriFilter === 'all') return true;
    return c.nutricionista_id === selectedNutriFilter;
  });

  // Estatísticas de Atendimentos
  const totalConsultas = filteredConsultas.length;
  const pacientesUnicosAtendidos = new Set(filteredConsultas.map(c => c.paciente_id)).size;
  const retornosAgendados = filteredConsultas.filter(c => Boolean(c.proximo_retorno)).length;
  
  // Cálculo Média IMC dos Atendimentos
  const imcsCalculados = filteredConsultas.map(c => {
    const p = pacientes.find(pac => pac.id === c.paciente_id);
    return calcularIMC(c.peso || p?.peso_inicial, p?.altura).imc;
  }).filter((v): v is number => v !== null);

  const mediaImcAtendimentos = imcsCalculados.length > 0 
    ? (imcsCalculados.reduce((a, b) => a + b, 0) / imcsCalculados.length).toFixed(1) 
    : 'N/A';

  // Categorização de IMC da OMS
  const imcCategorias = {
    magreza: 0,
    eutrofia: 0,
    sobrepeso: 0,
    obesidade: 0,
  };

  imcsCalculados.forEach(val => {
    if (val < 18.5) imcCategorias.magreza++;
    else if (val < 25) imcCategorias.eutrofia++;
    else if (val < 30) imcCategorias.sobrepeso++;
    else imcCategorias.obesidade++;
  });

  const totalImcs = imcsCalculados.length || 1;

  // --- PROMPT 3 CALCULATIONS (Scoped to logged-in user) ---
  const meusPacientes = pacientes.filter(p => p.nutricionista_id === user?.id || p.nutricionista_nome === user?.nome || isMaster);
  const minhasConsultas = consultas.filter(c => c.nutricionista_id === user?.id || meusPacientes.some(p => p.id === c.paciente_id));

  // Card 1: Total de pacientes ativos cadastrados pelo nutricionista logado
  const totalPacientesAtivos = meusPacientes.length;

  // Card 2: Consultas da semana atual
  const agora = new Date();
  const inicioSemana = new Date(agora);
  const diaSemana = agora.getDay();
  inicioSemana.setDate(agora.getDate() - diaSemana);
  inicioSemana.setHours(0, 0, 0, 0);

  const fimSemana = new Date(inicioSemana);
  fimSemana.setDate(inicioSemana.getDate() + 6);
  fimSemana.setHours(23, 59, 59, 999);

  const consultasDaSemana = minhasConsultas.filter(c => {
    if (!c.data_consulta) return false;
    const d = new Date(c.data_consulta + 'T00:00:00');
    return d >= inicioSemana && d <= fimSemana;
  }).length;

  // Card 3: Pacientes sem retorno (> 30 dias sem consulta e sem próximo retorno agendado)
  const pacientesSemRetorno = meusPacientes.filter(p => {
    const pConsultas = minhasConsultas.filter(c => c.paciente_id === p.id);
    
    const temProximoRetorno = pConsultas.some(c => {
      if (!c.proximo_retorno) return false;
      const dRetorno = new Date(c.proximo_retorno + 'T00:00:00');
      return dRetorno >= agora;
    });

    if (temProximoRetorno) return false;

    let ultimaDataStr = p.created_at || '2026-07-01';
    if (pConsultas.length > 0) {
      const sorted = [...pConsultas].sort((a, b) => new Date(b.data_consulta).getTime() - new Date(a.data_consulta).getTime());
      ultimaDataStr = sorted[0].data_consulta;
    }

    const ultimaData = new Date(ultimaDataStr);
    const diffDias = Math.floor((agora.getTime() - ultimaData.getTime()) / (1000 * 60 * 60 * 24));

    return diffDias >= 20 || diffDias > 30;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '100%' }}>
      
      {/* Welcome Banner with Tricolor Ambient Accents */}
      <div className="glass-panel dashboard-banner" style={{ 
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

        <div className="dashboard-banner-left">
          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '16px', border: '1px solid rgba(239,68,68,0.3)', boxShadow: '0 8px 20px rgba(0,0,0,0.5)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <CorinthiansLogo size={52} showText={true} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="banner-badges-container" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-red" style={{ background: 'rgba(220,38,38,0.2)', border: '1px solid rgba(220,38,38,0.4)', color: '#fca5a5' }}>
                🦅 S.C. Corinthians Paulista
              </span>
              <span className="badge badge-green"><CheckCircle2 size={12} /> Neon PostgreSQL 18</span>
              <span className="badge badge-blue">aws-sa-east-1 (São Paulo)</span>
              {isMaster && (
                <span className="badge badge-amber" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Crown size={12} /> Painel Master Ativo
                </span>
              )}
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px', wordBreak: 'break-word' }}>
              {isMaster ? 'Painel Executivo Master — Vagner Nutri' : `Painel Clínico — ${user?.nome || 'Vagner Nutri'}`}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.4' }}>
              {isMaster 
                ? 'Supervisão centralizada de todos os pacientes, consultas e nutricionistas cadastrados no banco de dados Neon.' 
                : 'Gerencie suas consultas, acompanhe a evolução antropométrica e construa planos alimentares personalizados.'}
            </p>
          </div>
        </div>

        <div className="dashboard-banner-actions">
          <button onClick={() => onNavigate('equipe')} className="btn-secondary">
            <Stethoscope size={16} color="#60a5fa" /> Escolher Nutricionista
          </button>
          <button onClick={onOpenNovoPaciente} className="btn-primary">
            <Plus size={18} /> Cadastrar Paciente
          </button>
        </div>
      </div>

      {/* --- PROMPT 3: CARDS DE INFORMAÇÃO PRINCIPAIS --- */}
      <div className="grid-responsive-3">
        
        {/* Card 1 — Total de pacientes ativos */}
        <div 
          className="glass-panel glass-panel-hover" 
          style={{ padding: '24px', cursor: 'pointer', borderTop: '4px solid #3b82f6', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} 
          onClick={() => onNavigate('pacientes')}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#94a3b8' }}>
                Total de Pacientes Ativos
              </span>
              <div style={{ background: 'rgba(37, 99, 235, 0.18)', color: '#60a5fa', padding: '10px', borderRadius: '12px', boxShadow: '0 0 12px rgba(37, 99, 235, 0.3)' }}>
                <Users size={24} />
              </div>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff' }}>{totalPacientesAtivos}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#60a5fa', marginTop: '12px' }}>
            <TrendingUp size={14} /> Cadastrados por {user?.nome || 'Nutricionista Logado'}
          </div>
        </div>

        {/* Card 2 — Consultas da semana */}
        <div 
          className="glass-panel glass-panel-hover" 
          style={{ padding: '24px', cursor: 'pointer', borderTop: '4px solid #10b981', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} 
          onClick={() => onNavigate('consultas')}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#94a3b8' }}>Consultas da Semana</span>
              <div style={{ background: 'rgba(16, 185, 129, 0.18)', color: '#34d399', padding: '10px', borderRadius: '12px', boxShadow: '0 0 12px rgba(16, 185, 129, 0.3)' }}>
                <Calendar size={24} />
              </div>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff' }}>{consultasDaSemana}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#34d399', marginTop: '12px' }}>
            <Activity size={14} /> Registradas na semana atual
          </div>
        </div>

        {/* Card 3 — Pacientes sem retorno */}
        <div 
          className="glass-panel" 
          style={{ padding: '24px', borderTop: '4px solid #ef4444', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} 
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f87171', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertCircle size={18} /> Pacientes sem Retorno (&gt; 30 dias)
              </span>
              <span className="badge badge-red" style={{ fontSize: '0.75rem', fontWeight: 800 }}>
                {pacientesSemRetorno.length}
              </span>
            </div>

            {pacientesSemRetorno.length === 0 ? (
              <div style={{ padding: '16px 0', color: '#94a3b8', fontSize: '0.85rem', fontStyle: 'italic', textAlign: 'center' }}>
                Nenhum paciente sem retorno no momento
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '140px', overflowY: 'auto' }}>
                {pacientesSemRetorno.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => onNavigate('pacientes')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.25)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    className="glass-panel-hover"
                    title="Clique para abrir o perfil do paciente"
                  >
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
                      {p.nome}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Ver Perfil <ChevronRight size={14} />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '12px' }}>
            * Pacientes cuja última consulta foi há mais de 30 dias e sem próximo retorno agendado
          </div>
        </div>

      </div>

      {/* DASHBOARD ANALÍTICO DE TODOS OS ATENDIMENTOS (NOVO) */}
      <div className="glass-panel" style={{ padding: '28px', borderTop: '4px solid #10b981', background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.7) 100%)' }}>
        
        {/* Header do Dashboard de Atendimentos */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '8px', borderRadius: '10px', color: '#34d399', display: 'flex' }}>
                <BarChart3 size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                  Dashboard Analítico de Todos os Atendimentos
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '2px 0 0 0' }}>
                  Indicadores de consultas clínicas, acompanhamento de retornos e perfil nutricional antropométrico
                </p>
              </div>
            </div>
          </div>

          {/* Filtro por Nutricionista */}
          {isMaster && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Filter size={16} color="#60a5fa" />
              <select
                value={selectedNutriFilter}
                onChange={(e) => setSelectedNutriFilter(e.target.value)}
                className="form-input"
                style={{ height: '40px', fontSize: '0.85rem', paddingLeft: '12px', width: '220px', cursor: 'pointer', borderColor: 'rgba(16, 185, 129, 0.4)' }}
              >
                <option value="all">👥 Todos os Atendimentos ({consultas.length})</option>
                {nutrisList.map(n => {
                  const count = consultas.filter(c => c.nutricionista_id === n.id).length;
                  return (
                    <option key={n.id} value={n.id}>{n.nome} ({count})</option>
                  );
                })}
              </select>
            </div>
          )}
        </div>

        {/* 4 KPIs dos Atendimentos */}
        <div className="grid-responsive-4" style={{ marginBottom: '24px' }}>
          
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '18px', borderRadius: '14px' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', fontWeight: 600 }}>Total de Consultas</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>{totalConsultas}</div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginTop: '4px' }}>
              Histórico no Neon PostgreSQL
            </span>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '18px', borderRadius: '14px' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', fontWeight: 600 }}>Pacientes Atendidos</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#60a5fa', marginTop: '4px' }}>{pacientesUnicosAtendidos}</div>
            <span style={{ fontSize: '0.75rem', color: '#60a5fa', display: 'block', marginTop: '4px' }}>
              {Math.round((pacientesUnicosAtendidos / (pacientes.length || 1)) * 100)}% da base total cadastrada
            </span>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '18px', borderRadius: '14px' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', fontWeight: 600 }}>Retornos Programados</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fbbf24', marginTop: '4px' }}>{retornosAgendados}</div>
            <span style={{ fontSize: '0.75rem', color: '#fbbf24', display: 'block', marginTop: '4px' }}>
              Próximas sessões agendadas
            </span>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '18px', borderRadius: '14px' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', fontWeight: 600 }}>IMC Médio dos Atendimentos</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f87171', marginTop: '4px' }}>{mediaImcAtendimentos} <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>kg/m²</span></div>
            <span style={{ fontSize: '0.75rem', color: '#f87171', display: 'block', marginTop: '4px' }}>
              Classificação Média OMS
            </span>
          </div>
        </div>

        {/* Grade de Análise: Categorização de IMC OMS & Volume por Nutricionista */}
        <div className="grid-responsive-2">
          
          {/* Distribuição por Perfil de IMC (OMS) */}
          <div style={{ background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '20px', borderRadius: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Scale size={18} color="#34d399" />
              <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Perfil Nutricional por IMC (OMS)</h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Eutrofia */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                  <span style={{ color: '#34d399', fontWeight: 600 }}>Peso Normal (Eutrofia)</span>
                  <strong style={{ color: '#fff' }}>{imcCategorias.eutrofia} ({Math.round((imcCategorias.eutrofia / totalImcs) * 100)}%)</strong>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: `${(imcCategorias.eutrofia / totalImcs) * 100}%`, height: '100%', background: '#10b981' }}></div>
                </div>
              </div>

              {/* Sobrepeso */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                  <span style={{ color: '#fbbf24', fontWeight: 600 }}>Sobrepeso (Pré-obesidade)</span>
                  <strong style={{ color: '#fff' }}>{imcCategorias.sobrepeso} ({Math.round((imcCategorias.sobrepeso / totalImcs) * 100)}%)</strong>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: `${(imcCategorias.sobrepeso / totalImcs) * 100}%`, height: '100%', background: '#f59e0b' }}></div>
                </div>
              </div>

              {/* Obesidade */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                  <span style={{ color: '#f87171', fontWeight: 600 }}>Obesidade (Grau I, II e III)</span>
                  <strong style={{ color: '#fff' }}>{imcCategorias.obesidade} ({Math.round((imcCategorias.obesidade / totalImcs) * 100)}%)</strong>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: `${(imcCategorias.obesidade / totalImcs) * 100}%`, height: '100%', background: '#ef4444' }}></div>
                </div>
              </div>

              {/* Magreza */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                  <span style={{ color: '#60a5fa', fontWeight: 600 }}>Abaixo do Peso (Magreza)</span>
                  <strong style={{ color: '#fff' }}>{imcCategorias.magreza} ({Math.round((imcCategorias.magreza / totalImcs) * 100)}%)</strong>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: `${(imcCategorias.magreza / totalImcs) * 100}%`, height: '100%', background: '#3b82f6' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Atendimentos Recentes & Próximos Retornos */}
          <div style={{ background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '20px', borderRadius: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} color="#60a5fa" />
                <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Histórico Recente de Atendimentos</h4>
              </div>
              <button onClick={() => onNavigate('consultas')} className="btn-secondary" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
                Ver Todos <ArrowUpRight size={12} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredConsultas.slice(0, 4).map((c) => {
                const pac = pacientes.find(p => p.id === c.paciente_id);
                const imcRes = calcularIMC(c.peso || pac?.peso_inicial, pac?.altura);
                return (
                  <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#ffffff' }}>{pac?.nome || 'Paciente'}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
                        Data: {c.data_consulta} • Peso: {c.peso ? `${c.peso} kg` : 'N/I'}
                      </div>
                    </div>
                    {imcRes.imc ? (
                      <span className="badge" style={{ background: imcRes.corBg, color: imcRes.corTexto, border: `1px solid ${imcRes.corBorder}`, fontSize: '0.7rem', fontWeight: 700 }}>
                        IMC: {imcRes.imc}
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>-</span>
                    )}
                  </div>
                );
              })}
            </div>
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

        <div className="grid-responsive-4">
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
          {pacientes.slice(0, 5).map((paciente) => {
            const imcRes = calcularIMC(paciente.peso_inicial, paciente.altura);
            return (
              <div key={paciente.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '12px', border: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: '#ffffff' }}>{paciente.nome}</div>
                    <span className="badge badge-blue" style={{ fontSize: '0.65rem' }}>
                      {paciente.nutricionista_nome || 'Dr. Vagner (Master)'}
                    </span>
                    {imcRes.imc && (
                      <span className="badge" style={{ background: imcRes.corBg, color: imcRes.corTexto, border: `1px solid ${imcRes.corBorder}`, fontSize: '0.7rem', fontWeight: 700 }}>
                        IMC: {imcRes.imc} ({imcRes.classificacao})
                      </span>
                    )}
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
            );
          })}
        </div>
      </div>
    </div>
  );
};
