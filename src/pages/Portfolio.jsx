import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  Users,
  Target,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts'

const Portfolio = () => {
  // Dados para gráficos
  const dadosEtapas = [
    { etapa: 'Ideias', total: 15, aprovadas: 8, reprovadas: 4, aguardando: 3 },
    { etapa: 'Pré-Projetos', total: 8, aprovadas: 5, reprovadas: 1, aguardando: 2 },
    { etapa: 'Projetos', total: 5, concluidos: 1, andamento: 3, atrasados: 1 }
  ]

  const dadosInvestimento = [
    { mes: 'Jan', previsto: 120000, realizado: 115000 },
    { mes: 'Fev', previsto: 150000, realizado: 142000 },
    { mes: 'Mar', previsto: 180000, realizado: 175000 },
    { mes: 'Abr', previsto: 200000, realizado: 195000 },
    { mes: 'Mai', previsto: 220000, realizado: 210000 },
    { mes: 'Jun', previsto: 250000, realizado: 240000 }
  ]

  const dadosROI = [
    { name: 'ROI Positivo', value: 65, color: '#10B981' },
    { name: 'ROI Neutro', value: 20, color: '#F59E0B' },
    { name: 'ROI Negativo', value: 15, color: '#EF4444' }
  ]

  const projetosDestaque = [
    {
      nome: 'P&D PROJETO LASER HERA',
      etapa: 'Projeto',
      investimento: 280000,
      roi: 42,
      status: 'Em Andamento',
      progresso: 21
    },
    {
      nome: 'PROJETO BI - RECURSOS HUMANOS',
      etapa: 'Projeto',
      investimento: 150000,
      roi: 85,
      status: 'Concluído',
      progresso: 100
    },
    {
      nome: 'Plataforma E-learning Corporativo',
      etapa: 'Pré-Projeto',
      investimento: 200000,
      roi: 0,
      status: 'Em Análise',
      progresso: 0
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Portfólio</h2>
        <p className="text-muted-foreground">
          Visão executiva do portfólio de projetos e indicadores estratégicos
        </p>
      </div>

      {/* Métricas Principais */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Iniciativas</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investimento Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 2.4M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> aprovado para este ano
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42%</div>
            <p className="text-xs text-muted-foreground">
              Projetos concluídos
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Aprovação</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">
              Ideias → Projetos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos Principais */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Funil de Conversão */}
        <Card>
          <CardHeader>
            <CardTitle>Funil de Conversão por Etapa</CardTitle>
            <CardDescription>
              Distribuição de iniciativas por etapa do processo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosEtapas}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="etapa" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#3B82F6" name="Total" />
                <Bar dataKey="aprovadas" fill="#10B981" name="Aprovadas" />
                <Bar dataKey="aguardando" fill="#F59E0B" name="Aguardando" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Investimento Previsto vs Realizado */}
        <Card>
          <CardHeader>
            <CardTitle>Investimento Previsto vs Realizado</CardTitle>
            <CardDescription>
              Acompanhamento mensal do orçamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dadosInvestimento}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
                <Area 
                  type="monotone" 
                  dataKey="previsto" 
                  stackId="1" 
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.3}
                  name="Previsto"
                />
                <Area 
                  type="monotone" 
                  dataKey="realizado" 
                  stackId="2" 
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.3}
                  name="Realizado"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ROI e Projetos em Destaque */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Distribuição de ROI */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de ROI</CardTitle>
            <CardDescription>
              Performance dos projetos concluídos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={dadosROI}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {dadosROI.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {dadosROI.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Projetos em Destaque */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Projetos em Destaque</CardTitle>
            <CardDescription>
              Principais iniciativas do portfólio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projetosDestaque.map((projeto, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium">{projeto.nome}</h4>
                      <Badge variant="outline">{projeto.etapa}</Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Investimento: R$ {projeto.investimento.toLocaleString('pt-BR')}</span>
                      {projeto.roi > 0 && (
                        <span>ROI: {projeto.roi}%</span>
                      )}
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Progresso</span>
                        <span>{projeto.progresso}%</span>
                      </div>
                      <Progress value={projeto.progresso} className="h-2" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <Badge 
                      className={
                        projeto.status === 'Concluído' ? 'bg-green-100 text-green-800' :
                        projeto.status === 'Em Andamento' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }
                    >
                      {projeto.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas e Recomendações */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <span>Alertas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">3 projetos com atraso</p>
                  <p className="text-xs text-muted-foreground">
                    Revisar cronogramas e recursos
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Orçamento 15% acima do previsto</p>
                  <p className="text-xs text-muted-foreground">
                    Análise de custos necessária
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span>Recomendações</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Acelerar aprovação de pré-projetos</p>
                  <p className="text-xs text-muted-foreground">
                    2 iniciativas aguardando há mais de 30 dias
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <Target className="h-4 w-4 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Oportunidade de otimização</p>
                  <p className="text-xs text-muted-foreground">
                    Consolidar projetos similares para reduzir custos
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Portfolio

