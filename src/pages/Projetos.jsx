import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Calendar,
  User,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'

const Projetos = () => {
  const [projetos] = useState([
    {
      id: 1,
      nome: 'LÂMINA DE SHAVER',
      coordenador: 'João P',
      previsaoInicio: '26/05/2025',
      previsaoFim: '31/07/2025',
      dataInicio: '26/05/2025',
      dataFim: '',
      percentual: 35,
      status: 'em_andamento',
      prioridade: 'alta'
    },
    {
      id: 2,
      nome: 'P&D PROJETO LASER HERA',
      coordenador: 'Mauricio T',
      previsaoInicio: '12/11/2024',
      previsaoFim: '25/01/2027',
      dataInicio: '12/11/2024',
      dataFim: '',
      percentual: 21,
      status: 'atrasado',
      prioridade: 'alta'
    },
    {
      id: 3,
      nome: 'P&D PROJETO PINÇA BIPOLAR 0.2MM',
      coordenador: 'Mauricio T',
      previsaoInicio: '29/01/2025',
      previsaoFim: '25/04/2025',
      dataInicio: '29/01/2025',
      dataFim: '',
      percentual: 80,
      status: 'atrasado',
      prioridade: 'alta'
    },
    {
      id: 4,
      nome: 'P&D PROJETO PROTÓTIPO ELETRODOS RF',
      coordenador: 'João P',
      previsaoInicio: '13/09/2023',
      previsaoFim: '30/08/2025',
      dataInicio: '13/09/2023',
      dataFim: '',
      percentual: 50,
      status: 'em_andamento',
      prioridade: 'media'
    },
    {
      id: 5,
      nome: 'P&D PROJETO RF',
      coordenador: 'Davi R',
      previsaoInicio: '13/04/2023',
      previsaoFim: '12/02/2027',
      dataInicio: '13/04/2023',
      dataFim: '',
      percentual: 45,
      status: 'atrasado',
      prioridade: 'alta'
    },
    {
      id: 6,
      nome: 'PROJETO BI - RECURSOS HUMANOS',
      coordenador: 'Fernando F',
      previsaoInicio: '09/04/2025',
      previsaoFim: '08/05/2025',
      dataInicio: '08/04/2025',
      dataFim: '11/06/2025',
      percentual: 100,
      status: 'concluido',
      prioridade: 'baixa'
    },
    {
      id: 7,
      nome: 'PROJETO DESENVOLVIMENTO DE APLICAÇÃO - AT',
      coordenador: 'Fernando F',
      previsaoInicio: '10/03/2025',
      previsaoFim: '23/09/2025',
      dataInicio: '10/03/2025',
      dataFim: '',
      percentual: 58,
      status: 'em_andamento',
      prioridade: 'media'
    },
    {
      id: 8,
      nome: 'PROJETO MAPEAMENTO E MELHORIA DE PROCESSOS',
      coordenador: 'Fernando F',
      previsaoInicio: '16/09/2024',
      previsaoFim: '20/03/2026',
      dataInicio: '16/09/2024',
      dataFim: '',
      percentual: 58,
      status: 'em_andamento',
      prioridade: 'media'
    },
    {
      id: 9,
      nome: 'PROJETO POLÍTICAS DE GOVERNANÇA',
      coordenador: 'Fernando F',
      previsaoInicio: '01/04/2025',
      previsaoFim: '30/04/2025',
      dataInicio: '01/04/2025',
      dataFim: '',
      percentual: 0,
      status: 'nao_iniciado',
      prioridade: 'baixa'
    },
    {
      id: 10,
      nome: 'PROJETO READINESS ASSESSMENT',
      coordenador: 'Fernando F',
      previsaoInicio: '01/01/2025',
      previsaoFim: '30/06/2025',
      dataInicio: '01/01/2025',
      dataFim: '',
      percentual: 20,
      status: 'em_andamento',
      prioridade: 'media'
    }
  ])

  const [filtro, setFiltro] = useState('')

  const projetosFiltrados = projetos.filter(projeto =>
    projeto.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    projeto.coordenador.toLowerCase().includes(filtro.toLowerCase())
  )

  const getStatusColor = (status) => {
    switch (status) {
      case 'concluido': return 'bg-green-500'
      case 'em_andamento': return 'bg-blue-500'
      case 'atrasado': return 'bg-red-500'
      case 'nao_iniciado': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'concluido': return 'Concluído'
      case 'em_andamento': return 'Em Andamento'
      case 'atrasado': return 'Atrasado'
      case 'nao_iniciado': return 'Não Iniciado'
      default: return 'Indefinido'
    }
  }

  const getPrioridadeIcon = (prioridade) => {
    switch (prioridade) {
      case 'alta': return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'media': return <Clock className="h-4 w-4 text-yellow-500" />
      case 'baixa': return <Target className="h-4 w-4 text-green-500" />
      default: return null
    }
  }

  // Dados para o gráfico de pizza
  const dadosGrafico = [
    { name: 'Não iniciado', value: projetos.filter(p => p.status === 'nao_iniciado').length, color: '#FEF3C7' },
    { name: 'Início atrasado', value: 0, color: '#FEE2E2' },
    { name: 'Andamento no prazo', value: projetos.filter(p => p.status === 'em_andamento').length, color: '#D1FAE5' },
    { name: 'Fim atrasado', value: projetos.filter(p => p.status === 'atrasado').length, color: '#FECACA' },
    { name: 'Concluído total', value: projetos.filter(p => p.status === 'concluido').length, color: '#3B82F6' },
    { name: 'Concluído parcial', value: 0, color: '#1F2937' },
    { name: 'Cancelado', value: 0, color: '#6B7280' }
  ]

  const totalProjetos = projetos.length
  const projetosEmAndamento = projetos.filter(p => p.status === 'em_andamento' || p.status === 'atrasado').length
  const mediaDuracao = 65 // Exemplo
  const saldoPrevisto = -35 // Exemplo

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Projetos</h2>
          <p className="text-muted-foreground">
            Gerencie projetos em execução com cronograma e orçamento
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Projeto
        </Button>
      </div>

      {/* Métricas do Header */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de projetos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjetos}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projetos filtrados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projetosFiltrados.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média de duração</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mediaDuracao} Dias</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo previsto e realizado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{saldoPrevisto} Dias</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar projetos..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
      </div>

      {/* Tabela de Projetos */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Projetos</TableHead>
                <TableHead>Coordenador</TableHead>
                <TableHead>Previsão início</TableHead>
                <TableHead>Previsão fim</TableHead>
                <TableHead>Data início</TableHead>
                <TableHead>Data fim</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projetosFiltrados.map((projeto) => (
                <TableRow key={projeto.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(projeto.status)}`}></div>
                      <span className="text-sm font-medium">{projeto.percentual}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{projeto.nome}</span>
                      {getPrioridadeIcon(projeto.prioridade)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{projeto.coordenador}</span>
                    </div>
                  </TableCell>
                  <TableCell>{projeto.previsaoInicio}</TableCell>
                  <TableCell>{projeto.previsaoFim}</TableCell>
                  <TableCell>{projeto.dataInicio}</TableCell>
                  <TableCell>{projeto.dataFim || '-'}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dashboard Inferior */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Projetos por iniciar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Projetos por iniciar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold">0</div>
              <div className="text-sm text-muted-foreground">0,0 %</div>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de Status */}
        <Card>
          <CardContent className="p-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={dadosGrafico}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {dadosGrafico.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  iconType="circle"
                  wrapperStyle={{ fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Projetos em andamento */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Projetos em andamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold">{projetosEmAndamento}</div>
              <div className="text-sm text-muted-foreground">100,0 %</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Projetos

