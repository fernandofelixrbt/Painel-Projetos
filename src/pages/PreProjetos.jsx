import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { Plus, Edit, Trash2, FileText, Upload, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

const PreProjetos = () => {
  const [projetos, setProjetos] = useState([
    {
      id: 1,
      nome: 'Produto Inovador A',
      descricao: 'Desenvolvimento de produto revolucionário para o mercado de tecnologia',
      investimento: 45000,
      faturamentoProjetado: 350000,
      margemBruta: 40,
      custoOperacional: 15000,
      tempoRetorno: 18,
      mercadoAlvo: 'Empresas de médio porte',
      concorrentes: 'Empresa X, Empresa Y',
      riscos: 'Mudanças tecnológicas rápidas, concorrência acirrada',
      status: 'Aprovado - Diretoria',
      classificacao: 'Aprovado',
      justificativa: 'Projeto dentro das premissas de viabilidade',
      documentos: ['business_plan.pdf', 'analise_mercado.xlsx'],
      dataCriacao: '2024-01-15'
    },
    {
      id: 2,
      nome: 'Aquisição StartupTech',
      descricao: 'Aquisição de startup especializada em IA',
      investimento: 120000,
      faturamentoProjetado: 280000,
      margemBruta: 32,
      custoOperacional: 25000,
      tempoRetorno: 24,
      mercadoAlvo: 'Empresas de tecnologia',
      concorrentes: 'Grandes players do mercado',
      riscos: 'Integração complexa, retenção de talentos',
      status: 'Aguardando - Conselho',
      classificacao: 'Requer Aprovação Conselho',
      justificativa: 'Faturamento abaixo de R$ 300k, mas estratégico para expansão',
      documentos: ['due_diligence.pdf'],
      dataCriacao: '2024-02-10'
    }
  ])

  const [premissas, setPremissas] = useState({
    alcadaDiretoria: 50000,
    alcadaCEO: 100000,
    faturamentoMinimo: 300000,
    margemMinimaAprovacao: 35
  })

  const [dialogOpen, setDialogOpen] = useState(false)
  const [premissasDialogOpen, setPremissasDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    investimento: '',
    faturamentoProjetado: '',
    margemBruta: '',
    custoOperacional: '',
    tempoRetorno: '',
    mercadoAlvo: '',
    concorrentes: '',
    riscos: '',
    documentos: []
  })

  const calcularClassificacao = (dados) => {
    const investimento = parseFloat(dados.investimento) || 0
    const faturamento = parseFloat(dados.faturamentoProjetado) || 0
    const margem = parseFloat(dados.margemBruta) || 0

    // Verificar premissas de aprovação
    const faturamentoOk = faturamento >= premissas.faturamentoMinimo
    const margemOk = margem >= premissas.margemMinimaAprovacao

    if (faturamentoOk && margemOk) {
      // Determinar alçada baseada no investimento
      if (investimento <= premissas.alcadaDiretoria) {
        return {
          status: 'Aprovado - Diretoria',
          classificacao: 'Aprovado',
          justificativa: 'Projeto dentro das premissas de viabilidade - Alçada Diretoria'
        }
      } else if (investimento <= premissas.alcadaCEO) {
        return {
          status: 'Aprovado - CEO',
          classificacao: 'Aprovado',
          justificativa: 'Projeto dentro das premissas de viabilidade - Alçada CEO'
        }
      } else {
        return {
          status: 'Aprovado - Conselho',
          classificacao: 'Aprovado',
          justificativa: 'Projeto dentro das premissas de viabilidade - Alçada Conselho'
        }
      }
    } else {
      return {
        status: 'Aguardando - Conselho',
        classificacao: 'Requer Aprovação Conselho',
        justificativa: `Projeto fora das premissas: ${!faturamentoOk ? 'Faturamento abaixo de R$ 300k' : ''} ${!margemOk ? 'Margem abaixo de 35%' : ''}. Requer justificativa estratégica.`
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const classificacao = calcularClassificacao(formData)
    
    if (editingId) {
      setProjetos(prev => prev.map(item => 
        item.id === editingId 
          ? { ...item, ...formData, ...classificacao }
          : item
      ))
    } else {
      const novoProjeto = {
        id: Date.now(),
        ...formData,
        ...classificacao,
        dataCriacao: new Date().toISOString().split('T')[0]
      }
      setProjetos(prev => [...prev, novoProjeto])
    }
    
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      nome: '',
      descricao: '',
      investimento: '',
      faturamentoProjetado: '',
      margemBruta: '',
      custoOperacional: '',
      tempoRetorno: '',
      mercadoAlvo: '',
      concorrentes: '',
      riscos: '',
      documentos: []
    })
    setEditingId(null)
    setDialogOpen(false)
  }

  const handleEdit = (projeto) => {
    setFormData({
      nome: projeto.nome,
      descricao: projeto.descricao,
      investimento: projeto.investimento.toString(),
      faturamentoProjetado: projeto.faturamentoProjetado.toString(),
      margemBruta: projeto.margemBruta.toString(),
      custoOperacional: projeto.custoOperacional.toString(),
      tempoRetorno: projeto.tempoRetorno.toString(),
      mercadoAlvo: projeto.mercadoAlvo,
      concorrentes: projeto.concorrentes,
      riscos: projeto.riscos,
      documentos: projeto.documentos || []
    })
    setEditingId(projeto.id)
    setDialogOpen(true)
  }

  const handleDelete = (id) => {
    setProjetos(prev => prev.filter(item => item.id !== id))
  }

  const getStatusColor = (classificacao) => {
    switch (classificacao) {
      case 'Aprovado': return 'bg-green-100 text-green-800'
      case 'Requer Aprovação Conselho': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (classificacao) => {
    switch (classificacao) {
      case 'Aprovado': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'Requer Aprovação Conselho': return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default: return <XCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const handlePremissasSubmit = (e) => {
    e.preventDefault()
    // Recalcular classificação de todos os projetos
    setProjetos(prev => prev.map(projeto => {
      const novaClassificacao = calcularClassificacao(projeto)
      return { ...projeto, ...novaClassificacao }
    }))
    setPremissasDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pré-Projetos</h2>
          <p className="text-muted-foreground">
            Aprove ideias com análise de viabilidade
          </p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={premissasDialogOpen} onOpenChange={setPremissasDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                Configurar Premissas
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Premissas de Viabilidade</DialogTitle>
                <DialogDescription>
                  Configure os critérios para aprovação automática de projetos
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handlePremissasSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Alçada Diretoria (R$)</Label>
                    <Input
                      type="number"
                      value={premissas.alcadaDiretoria}
                      onChange={(e) => setPremissas(prev => ({ ...prev, alcadaDiretoria: parseFloat(e.target.value) }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Alçada CEO (R$)</Label>
                    <Input
                      type="number"
                      value={premissas.alcadaCEO}
                      onChange={(e) => setPremissas(prev => ({ ...prev, alcadaCEO: parseFloat(e.target.value) }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Faturamento Mínimo (R$)</Label>
                    <Input
                      type="number"
                      value={premissas.faturamentoMinimo}
                      onChange={(e) => setPremissas(prev => ({ ...prev, faturamentoMinimo: parseFloat(e.target.value) }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Margem Mínima (%)</Label>
                    <Input
                      type="number"
                      value={premissas.margemMinimaAprovacao}
                      onChange={(e) => setPremissas(prev => ({ ...prev, margemMinimaAprovacao: parseFloat(e.target.value) }))}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setPremissasDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Salvar Premissas</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="mr-2 h-4 w-4" />
                Novo Projeto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? 'Editar Projeto' : 'Novo Projeto em Concepção'}
                </DialogTitle>
                <DialogDescription>
                  Preencha os dados detalhados do projeto para análise de viabilidade
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Tabs defaultValue="basico" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basico">Dados Básicos</TabsTrigger>
                    <TabsTrigger value="financeiro">Análise Financeira</TabsTrigger>
                    <TabsTrigger value="mercado">Mercado & Riscos</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basico" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome do Projeto *</Label>
                        <Input
                          id="nome"
                          value={formData.nome}
                          onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                          placeholder="Nome do projeto"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="descricao">Descrição Detalhada *</Label>
                      <Textarea
                        id="descricao"
                        value={formData.descricao}
                        onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
                        placeholder="Descrição completa do projeto, objetivos e escopo"
                        rows={4}
                        required
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="financeiro" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="investimento">Investimento Inicial (R$) *</Label>
                        <Input
                          id="investimento"
                          type="number"
                          value={formData.investimento}
                          onChange={(e) => setFormData(prev => ({ ...prev, investimento: e.target.value }))}
                          placeholder="0"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="faturamentoProjetado">Faturamento Projetado (R$) *</Label>
                        <Input
                          id="faturamentoProjetado"
                          type="number"
                          value={formData.faturamentoProjetado}
                          onChange={(e) => setFormData(prev => ({ ...prev, faturamentoProjetado: e.target.value }))}
                          placeholder="0"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="margemBruta">Margem Bruta (%) *</Label>
                        <Input
                          id="margemBruta"
                          type="number"
                          value={formData.margemBruta}
                          onChange={(e) => setFormData(prev => ({ ...prev, margemBruta: e.target.value }))}
                          placeholder="0"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="custoOperacional">Custo Operacional Mensal (R$)</Label>
                        <Input
                          id="custoOperacional"
                          type="number"
                          value={formData.custoOperacional}
                          onChange={(e) => setFormData(prev => ({ ...prev, custoOperacional: e.target.value }))}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tempoRetorno">Tempo de Retorno (meses)</Label>
                        <Input
                          id="tempoRetorno"
                          type="number"
                          value={formData.tempoRetorno}
                          onChange={(e) => setFormData(prev => ({ ...prev, tempoRetorno: e.target.value }))}
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="mercado" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="mercadoAlvo">Mercado Alvo</Label>
                      <Textarea
                        id="mercadoAlvo"
                        value={formData.mercadoAlvo}
                        onChange={(e) => setFormData(prev => ({ ...prev, mercadoAlvo: e.target.value }))}
                        placeholder="Descrição do mercado alvo e público-alvo"
                        rows={2}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="concorrentes">Análise de Concorrentes</Label>
                      <Textarea
                        id="concorrentes"
                        value={formData.concorrentes}
                        onChange={(e) => setFormData(prev => ({ ...prev, concorrentes: e.target.value }))}
                        placeholder="Principais concorrentes e diferenciais competitivos"
                        rows={2}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="riscos">Análise de Riscos</Label>
                      <Textarea
                        id="riscos"
                        value={formData.riscos}
                        onChange={(e) => setFormData(prev => ({ ...prev, riscos: e.target.value }))}
                        placeholder="Principais riscos identificados e planos de mitigação"
                        rows={3}
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {editingId ? 'Atualizar' : 'Criar'} Projeto
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Cards de resumo */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Projetos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projetos.length}</div>
            <p className="text-xs text-muted-foreground">Em concepção</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprovados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {projetos.filter(p => p.classificacao === 'Aprovado').length}
            </div>
            <p className="text-xs text-muted-foreground">Dentro das premissas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aguardando Conselho</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {projetos.filter(p => p.classificacao === 'Requer Aprovação Conselho').length}
            </div>
            <p className="text-xs text-muted-foreground">Fora das premissas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investimento Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {projetos.reduce((acc, p) => acc + p.investimento, 0).toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground">Valor total planejado</p>
          </CardContent>
        </Card>
      </div>

      {/* Premissas atuais */}
      <Card>
        <CardHeader>
          <CardTitle>Premissas de Viabilidade Atuais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label className="text-sm font-medium">Alçada Diretoria</Label>
              <p className="text-lg font-bold">R$ {premissas.alcadaDiretoria.toLocaleString('pt-BR')}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Alçada CEO</Label>
              <p className="text-lg font-bold">R$ {premissas.alcadaCEO.toLocaleString('pt-BR')}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Faturamento Mínimo</Label>
              <p className="text-lg font-bold">R$ {premissas.faturamentoMinimo.toLocaleString('pt-BR')}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Margem Mínima</Label>
              <p className="text-lg font-bold">{premissas.margemMinimaAprovacao}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de projetos */}
      <Card>
        <CardHeader>
          <CardTitle>Projetos em Concepção</CardTitle>
          <CardDescription>
            Análise detalhada de viabilidade dos projetos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Projeto</TableHead>
                <TableHead>Investimento</TableHead>
                <TableHead>Faturamento</TableHead>
                <TableHead>Margem</TableHead>
                <TableHead>Classificação</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projetos.map((projeto) => (
                <TableRow key={projeto.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{projeto.nome}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {projeto.descricao}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>R$ {projeto.investimento.toLocaleString('pt-BR')}</TableCell>
                  <TableCell>R$ {projeto.faturamentoProjetado.toLocaleString('pt-BR')}</TableCell>
                  <TableCell>{projeto.margemBruta}%</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(projeto.classificacao)}
                      <Badge className={getStatusColor(projeto.classificacao)}>
                        {projeto.classificacao}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {projeto.status}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(projeto)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(projeto.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default PreProjetos

