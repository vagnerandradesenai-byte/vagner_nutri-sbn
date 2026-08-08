import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { DashboardView } from './components/DashboardView';
import { PacientesView } from './components/PacientesView';
import { ConsultasView } from './components/ConsultasView';
import { PlanosView } from './components/PlanosView';
import { AuthService, DbService } from './lib/neon';
import { Nutricionista, Paciente, Consulta, PlanoAlimentar } from './types';

export const App: React.FC = () => {
  const [user, setUser] = useState<Nutricionista | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'pacientes' | 'consultas' | 'planos'>('dashboard');
  
  // App Data
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [planos, setPlanos] = useState<PlanoAlimentar[]>([]);
  const [showNovoPacienteModal, setShowNovoPacienteModal] = useState(false);

  useEffect(() => {
    // Carregar usuário ativo da sessão
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }

    // Carregar dados iniciais do banco Neon
    refreshData();
  }, []);

  const refreshData = () => {
    setPacientes(DbService.getPacientes());
    setConsultas(DbService.getConsultas());
    setPlanos(DbService.getPlanos());
  };

  const handleLoginSuccess = (nutricionista: Nutricionista) => {
    setUser(nutricionista);
  };

  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
  };

  const handleSavePaciente = (paciente: Omit<Paciente, 'id' | 'created_at'> & { id?: string }) => {
    DbService.savePaciente(paciente);
    refreshData();
  };

  const handleDeletePaciente = (id: string) => {
    if (window.confirm('Tem certeza que deseja remover este paciente do banco Neon?')) {
      DbService.deletePaciente(id);
      refreshData();
    }
  };

  const handleSaveConsulta = (consulta: Omit<Consulta, 'id' | 'created_at'>) => {
    DbService.saveConsulta(consulta);
    refreshData();
  };

  const handleSavePlano = (plano: Omit<PlanoAlimentar, 'id' | 'created_at'>) => {
    DbService.savePlano(plano);
    refreshData();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      <main style={{ flex: 1, maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '24px 16px' }}>
        {!user ? (
          <AuthModal onLoginSuccess={handleLoginSuccess} />
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <DashboardView
                pacientes={pacientes}
                consultas={consultas}
                planos={planos}
                onNavigate={setActiveTab}
                onOpenNovoPaciente={() => {
                  setActiveTab('pacientes');
                  setShowNovoPacienteModal(true);
                }}
              />
            )}

            {activeTab === 'pacientes' && (
              <PacientesView
                pacientes={pacientes}
                onSavePaciente={handleSavePaciente}
                onDeletePaciente={handleDeletePaciente}
                showModalInitially={showNovoPacienteModal}
                onCloseInitialModal={() => setShowNovoPacienteModal(false)}
              />
            )}

            {activeTab === 'consultas' && (
              <ConsultasView
                consultas={consultas}
                pacientes={pacientes}
                onSaveConsulta={handleSaveConsulta}
              />
            )}

            {activeTab === 'planos' && (
              <PlanosView
                planos={planos}
                pacientes={pacientes}
                onSavePlano={handleSavePlano}
              />
            )}
          </>
        )}
      </main>

      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '20px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
        Vagner Nutri &copy; {new Date().getFullYear()} — Conectado ao Neon Database (aws-sa-east-1). Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default App;
