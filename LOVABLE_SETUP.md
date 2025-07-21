# Painel Projetos RBT - Setup para Lovable

## 📋 Visão Geral

Este é um sistema completo de gestão de projetos desenvolvido para a RBT Group, com identidade visual personalizada e funcionalidades avançadas.

## 🚀 Como Importar para o Lovable

### Opção 1: Via GitHub (Recomendada)

1. **Faça fork ou clone deste repositório**
2. **No Lovable, use a integração GitHub:**
   - Acesse seu projeto no Lovable
   - Vá em "Import from GitHub"
   - Conecte este repositório
   - O Lovable importará automaticamente

### Opção 2: Via Upload Manual

1. **Baixe todos os arquivos do projeto**
2. **No Lovable, crie um novo projeto React**
3. **Substitua os arquivos padrão pelos arquivos deste projeto**

## 📁 Estrutura do Projeto

```
src/
├── components/
│   └── Layout.jsx              # Layout principal com sidebar
├── pages/
│   ├── Dashboard.jsx           # Dashboard principal
│   ├── Ideias.jsx             # Funil de oportunidades
│   ├── PreProjetos.jsx        # Módulo de concepção
│   ├── Projetos.jsx           # Lista de projetos
│   ├── Portfolio.jsx          # Painel executivo
│   └── Administrador.jsx      # Gestão administrativa
├── styles/
│   └── rbt-theme.css          # Tema personalizado RBT
├── App.jsx                    # Componente principal
└── main.jsx                   # Ponto de entrada

public/
└── logo-rbt.png              # Logo da RBT Group
```

## 🎨 Identidade Visual RBT

### Cores Principais
- **Azul Turquesa**: #00B4D8 (cor principal)
- **Azul Claro**: #90E0EF (secundária)
- **Azul Escuro**: #0077B6 (destaque)
- **Azul Médio**: #48CAE4 (gradientes)

### Elementos Visuais
- Logo RBT Group no header
- Sidebar branca com itens ativos em gradiente azul
- Tema CSS personalizado em `src/styles/rbt-theme.css`

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework principal
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes de interface
- **Lucide React** - Ícones
- **Recharts** - Gráficos e visualizações
- **Vite** - Build tool

## 📦 Dependências Principais

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "tailwindcss": "^3.4.0",
  "lucide-react": "^0.263.1",
  "recharts": "^2.8.0"
}
```

## 🔧 Comandos de Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 📋 Funcionalidades Implementadas

### ✅ Módulos Completos

1. **Dashboard**
   - Visão geral do portfólio
   - Métricas principais
   - Gráficos de status e progresso

2. **Ideias (Funil de Oportunidades)**
   - Cadastro de ideias
   - Sistema de aprovação
   - Métricas de conversão

3. **Pré-Projetos (Concepção)**
   - Análise de viabilidade
   - Sistema de premissas automáticas
   - Aprovação por alçadas

4. **Projetos**
   - Lista de projetos em execução
   - Métricas de performance
   - Status visual com percentuais

5. **Portfólio**
   - Painel executivo
   - Análise de ROI
   - Alertas e recomendações

6. **Administrador**
   - Gestão de usuários
   - Controle de permissões
   - Configurações do sistema
   - Log de auditoria

### 🔄 Próximas Funcionalidades

1. **Cronograma Detalhado**
   - Gestão de tarefas por projeto
   - Timeline visual (Gantt-like)
   - Controle de dependências

2. **Orçamento por Projeto**
   - Controle financeiro detalhado
   - Previsto vs Realizado
   - Análise de custos

3. **Relatórios Avançados**
   - Exportação de dados
   - Dashboards personalizáveis
   - Análises preditivas

## 🎯 Fluxo de Trabalho

```
Ideias → Aprovação → Pré-Projetos → Análise → Projetos → Execução
```

1. **Ideias** são capturadas no funil
2. **Aprovadas** se tornam **Pré-Projetos**
3. **Pré-Projetos** passam por análise de viabilidade
4. **Aprovados** se tornam **Projetos** em execução

## 🔐 Sistema de Permissões

- **Usuário**: Visualização básica
- **Gerente**: Edição de projetos
- **Diretor**: Aprovação de investimentos
- **Administrador**: Controle total

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- Desktop (1920px+)
- Tablet (768px - 1919px)
- Mobile (320px - 767px)

## 🚀 Deploy no Lovable

Após importar o projeto:

1. **Verifique as dependências** - todas devem ser instaladas automaticamente
2. **Teste a aplicação** - execute `npm run dev` para verificar
3. **Customize conforme necessário** - ajuste cores, textos, etc.
4. **Deploy** - use o sistema de deploy do Lovable

## 📞 Suporte

Para dúvidas sobre implementação ou customização:
- Consulte a documentação do Lovable
- Verifique os comentários no código
- Analise a estrutura de componentes

## 📄 Licença

Projeto desenvolvido para RBT Group - Todos os direitos reservados.

