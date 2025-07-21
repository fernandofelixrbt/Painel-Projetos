# Sistema de Gestão de Projetos

Sistema completo de gestão de projetos desenvolvido em React com Tailwind CSS e shadcn/ui.

## 🚀 Funcionalidades Implementadas

### ✅ Dashboard Principal
- Visão geral do portfólio de projetos
- Métricas e indicadores
- Gráficos interativos (Recharts)
- Projetos recentes

### ✅ Funil de Oportunidades
- Cadastro de ideias para inovação
- Campos: Nome, Descrição, Arena, Tipo de Projeto, Status, Observação
- Tipos: Produto de Marca Própria, Produto de Revenda, Aquisição de Linhas, Aquisição de Empresa, Desenvolvimento Solução Interna
- Status: Aprovada, Aguardando, Reprovada
- Interface completa com formulários e listagem

### ✅ Módulo de Concepção
- Análise detalhada de viabilidade de projetos
- Sistema de premissas configuráveis
- Classificação automática baseada em critérios:
  - Alçadas: Diretoria (R$ 50k), CEO (R$ 100k), Conselho (acima R$ 100k)
  - Faturamento mínimo: R$ 300k
  - Margem bruta mínima: 35%
- Formulário com abas: Dados Básicos, Análise Financeira, Mercado & Riscos
- Justificativas automáticas para aprovação/rejeição

### 🔄 Em Desenvolvimento
- Módulo de Desenvolvimento/Cronograma
- Módulo de Orçamento
- Painel de Acompanhamento Executivo

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework principal
- **Vite** - Build tool
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI
- **Lucide React** - Ícones
- **Recharts** - Gráficos e visualizações
- **Framer Motion** - Animações

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── ui/              # Componentes shadcn/ui
│   └── Layout.jsx       # Layout principal com sidebar
├── pages/
│   ├── Dashboard.jsx    # Dashboard principal
│   ├── FunilOportunidades.jsx  # Módulo funil
│   └── Concepcao.jsx    # Módulo concepção
├── App.jsx              # Componente principal
├── App.css              # Estilos globais
└── main.jsx             # Entry point
```

## 🚀 Como Executar

```bash
# Instalar dependências
pnpm install

# Executar em desenvolvimento
pnpm run dev

# Build para produção
pnpm run build
```

## 📋 Próximos Módulos

1. **Desenvolvimento/Cronograma**
   - Lista de tarefas com responsáveis
   - Datas previstas vs realizadas
   - Status automático baseado em prazos
   - Controle de predecessoras

2. **Orçamento**
   - Controle financeiro previsto vs realizado
   - Integração com custos das tarefas

3. **Painel de Acompanhamento**
   - Dashboard executivo
   - Indicadores de portfólio
   - Relatórios gerenciais

## 🎯 Para Usar no Lovable

Este projeto está pronto para ser importado no Lovable via:

1. **GitHub Integration** (recomendado)
2. **Cópia direta do código**

Todos os componentes são compatíveis com o ambiente Lovable (React + Vite + Tailwind + shadcn/ui).

