# 🥗 Vagner Nutri — Plataforma de Gestão Nutricional & Clínica

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.1.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Neon PostgreSQL](https://img.shields.io/badge/Neon_Postgres-18-00E599?style=for-the-badge&logo=postgresql&logoColor=black)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**Plataforma moderna de atendimento clínico, acompanhamento antropométrico, prescrição de planos alimentares e gestão de equipe de nutricionistas com suporte a Acesso Master.**

[🌐 Demo Online](https://github.com/vagnerandradesenai-byte/vagner_nutri-sbn) • [📋 Funcionalidades](#-principais-funcionalidades) • [🚀 Como Executar](#-como-executar-o-projeto) • [🎨 Identidade Visual](#-identidade-visual--paleta-de-cores) • [☁️ Deploy](#-deploy-em-produção)

</div>

---

## 📌 Sobre o Projeto

O **Vagner Nutri** é um software web completo desenvolvido para clínicas de nutrição e consultórios individuais. O sistema permite o gerenciamento centralizado de pacientes, registro de anamnese com alertas de restrições e patologias, controle evolutivo de medidas antropométricas e elaboração de dietas calculadas com metas calóricas e distribuição de macronutrientes.

A aplicação conta com uma camada de persistência segura integrada ao banco de dados **Neon PostgreSQL (aws-sa-east-1)** e autenticação multi-profissional com perfis individualizados e **Acesso Master Geral**.

---

## ✨ Principais Funcionalidades

### 👑 1. Acesso Master & Supervisão Geral
- **Visão Global:** Supervisão centralizada de todos os pacientes e consultas cadastrados por toda a equipe da clínica.
- **Painel Executivo:** Métricas consolidadas e gráficos de distribuição de atendimentos por nutricionista.
- **Atribuição Flexível:** Possibilidade de reatribuir e transferir pacientes entre diferentes profissionais da equipe.

### 👨‍⚕️ 2. Escolha & Gestão de Nutricionistas
- **Seletor Visual na Tela Inicial:** Escolha do perfil profissional em 1-clique com nome, CRM, foto/avatar e especialidade clínica.
- **Troca Rápida de Perfil:** Menu suspenso na barra de navegação superior para alternar o nutricionista ativo instantaneamente sem necessidade de logout.
- **Gestão do Corpo Clínico:** Aba dedicada para cadastrar novos nutricionistas, definir especialidades e monitorar a carteira de pacientes de cada um.

### 📋 3. Gestão de Pacientes & Anamnese Clínica
- Cadastro detalhado com dados pessoais, WhatsApp, e-mail e dados biométricos iniciais.
- Histórico completo de estilo de vida: nível de atividade física, rotina de sono e consumo hídrico.
- Mapeamento em destaque de **Objetivos**, **Restrições Alimentares**, **Patologias** e **Alergias**.
- Busca inteligente por nome, contato ou nutricionista responsável.

### 📊 4. Consultas & Acompanhamento Antropométrico
- Registro periódico de pesagem, circunferência de cintura, quadril e percentual de gordura corporal (`% BF`).
- Histórico cronológico das consultas realizadas com cálculo de evolução.
- Agendamento de previsão de retorno com badges de status.

### 🥗 5. Prescrição de Planos Alimentares & Dietas
- Elaboração de dietas personalizadas estruturadas em formato `JSONB`.
- Cálculo de **Meta Calórica Diária (kcal)** e distribuição de **Macronutrientes** (Proteínas, Carboidratos e Gorduras).
- Divisão detalhada por refeições com horários, alimentos e porções prescritas.
- Modal de impressão/visualização completa para envio ao paciente.

### 🏋️ 6. Protocolo de Exercícios Físicos Complementares
- **Sinergia Nutrição + Treino:** Prescrição de atividades físicas integradas à meta calórica da dieta.
- **Modelos Rápidos (1-Clique):** Musculação/Hipertrofia, Cardio LISS, Treino Funcional HIIT, CrossFit, Natação, Ciclismo/Spinning e Yoga/Alongamento.
- **Estimativa de Gasto Energético:** Cálculo automático do gasto calórico por sessão e total semanal estimado (`kcal/sem`).
- **Orientações Específicas:** Recomendações de hidratação, intensidade (`Leve`, `Moderada`, `Alta`, `Intensa`) e refeições de pré e pós-treino.

---

## 🎨 Identidade Visual & Paleta de Cores

O design do sistema segue o conceito **Glassmorphism** moderno com iluminação tricolor de alto contraste:

| Cor | Hex / Gradiente | Aplicação no Sistema |
| :--- | :--- | :--- |
| 🔵 **Azul Cobalto** | `#2563eb` / `#3b82f6` | **Identidade & Clínica:** Logotipo, cartões de Pacientes, navegação ativa e botões primários. |
| 🟢 **Verde Esmeralda** | `#10b981` / `#34d399` | **Saúde & Nutrição:** Status online do banco Neon, metas nutricionais e avaliações corporais. |
| 🔴 **Vermelho Rubi** | `#ef4444` / `#f87171` | **Energia & Metas:** Planos alimentares, queima metabólica (`Flame/kcal`), alertas de alergias e restrições. |
| 👑 **Dourado Âmbar** | `#f59e0b` / `#fbbf24` | **Acesso Master:** Badges de supervisão executiva, diretoria e destaque da equipe clínica. |

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** [React 18](https://react.dev/) com [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server:** [Vite](https://vitejs.dev/)
- **Estilização:** CSS3 Vanilla moderno com Design Tokens, Flexbox/Grid e Glassmorphism
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Banco de Dados & Autenticação:** [Neon PostgreSQL](https://neon.tech/) com SSL (Região São Paulo: `aws-sa-east-1`)
- **Deploy & Roteamento SPA:** [Vercel](https://vercel.com/) com `vercel.json`

---

## 📁 Estrutura de Pastas

```
vagner-nutri/
├── _prompts/             # Documentação e diretrizes de desenvolvimento
├── dist/                 # Bundle otimizado gerado no build
├── src/
│   ├── components/       # Componentes modulares da interface
│   │   ├── AuthModal.tsx       # Tela de login e seletor de nutricionistas
│   │   ├── ConsultasView.tsx   # Tabela e cadastro de avaliações antropométricas
│   │   ├── DashboardView.tsx   # Painel executivo com métricas e distribuição
│   │   ├── EquipeView.tsx      # Gestão do corpo clínico de nutricionistas
│   │   ├── Navbar.tsx          # Barra de topo com switcher de perfil e badges
│   │   ├── PacientesView.tsx   # Fichas de anamnese e filtros por responsável
│   │   └── PlanosView.tsx      # Elaborador e visualizador de dietas/macros
│   ├── lib/
│   │   └── neon.ts             # Serviços de autenticação e persistência Neon DB
│   ├── types/
│   │   └── index.ts            # Interfaces TypeScript da aplicação
│   ├── App.tsx                 # Componente raiz e controle de estado global
│   ├── index.css               # Design System com tokens e temas de cores
│   └── main.tsx                # Ponto de entrada React
├── .env.example          # Exemplo de variáveis de ambiente
├── .gitignore            # Arquivos ignorados pelo Git
├── package.json          # Dependências e scripts do projeto
├── tsconfig.json         # Configuração do TypeScript
├── vercel.json           # Configuração de rewrites para deploy SPA na Vercel
└── vite.config.ts        # Configuração do Vite
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Git](https://git-scm.com/)

### 1. Clonar o Repositório
```bash
git clone https://github.com/vagnerandradesenai-byte/vagner_nutri-sbn.git
cd vagner_nutri-sbn
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente (Opcional)
Crie um arquivo `.env` a partir do exemplo:
```bash
cp .env.example .env
```
Conteúdo do `.env`:
```env
VITE_NEON_PROJECT_ID=withered-butterfly-74622138
VITE_NEON_AUTH_URL=https://ep-delicate-cloud-acrkqzy5.neonauth.sa-east-1.aws.neon.tech/neondb/auth
```

### 4. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```
Acesse no navegador: **`http://localhost:5173`**

### 5. Compilar para Produção (Build)
```bash
npm run build
```

---

## ☁️ Deploy em Produção

O projeto já inclui o arquivo [`vercel.json`](./vercel.json) configurado para suporte completo a roteamento SPA (*Single Page Application*).

### Publicação na Vercel:
1. Acesse [vercel.com/new](https://vercel.com/new) e conecte sua conta do GitHub.
2. Importe o repositório `vagnerandradesenai-byte/vagner_nutri-sbn`.
3. Clique em **Deploy** (o Vite detectará automaticamente as configurações de build).
4. Seu link público estará disponível em poucos segundos!

---

## 🔒 Segurança e Boas Práticas

- ✅ **Chaves de API Protegidas:** Nenhuma credencial administrativa sensível é exposta no código frontend.
- ✅ **Conexão Criptografada:** Comunicação com o Neon PostgreSQL via SSL 256-bit.
- ✅ **Fallback Resiliente:** Operação com persistência local caso ocorra indisponibilidade temporária de rede.
- ✅ **`.gitignore` Configurado:** Arquivos `.env`, `node_modules` e pastas de build não são versionados.

---

## 📄 Licença

Este projeto foi desenvolvido para fins profissionais e acadêmicos. Todos os direitos reservados à equipe **Vagner Nutri**.

---

<div align="center">
Desenvolvido com 💙, 💚 e ❤️ por <strong>Dr. Vagner Andrade</strong> & Equipe.
</div>
