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
import { Plus, Edit, Trash2, Eye } from 'lucide-react'

const Ideias = () => {
  const [oportunidades, setOportunidades] = useState([
    {
      id: 1,
      nome: 'Produto Inovador A',
      descricao: 'Desenvolvimento de produto revolucionário para o mercado de tecnologia',
      arena: 'Tecnologia',
      tipoProjeto: 'Produto de Marca Própria',
      status: 'Aprovada',
      observacaoStatus: 'Aprovado pela diretoria com investimento inicial de R$ 45.000',
      dataCriacao: '2024-01-15'
    },
    {
      id: 2,
      nome: 'Aquisição StartupTech',
      descricao: 'Aquisição de startup especializada em IA para expandir portfólio',
      arena: 'Inteligência Artificial',
      tipoProjeto: 'Aquisição de Empresa',
      status: 'Aguardando',
      observacaoStatus: 'Aguardando análise financeira detalhada',
      dataCriacao: '2024-02-10'
    },
    {
      id: 3,
      nome: 'Sistema CRM Interno',
      descricao: 'Desenvolvimento de sistema CRM customizado para necessidades internas',
      arena: 'Sistemas Internos',
      tipoProjeto: 'Desenvolvimento Solução Interna',
      status: 'Reprovada',
      observacaoStatus: 'Custo muito elevado para o ROI esperado',
      dataCriacao: '2024-01-28'
    }
  ])

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    arena: '',
    tipoProjeto: '',
    status: 'Aguardando',
    observacaoStatus: ''
  })

  const tiposProjeto = [
    'Produto de Marca Própria',
    'Produto de Revenda',
    'Aquisição de Linhas',
    'Aquisição de Empresa',
    'Desenvolvimento Solução Interna'
  ]

  const statusOptions = ['Aprovada', 'Aguardando', 'Reprovada']

  const arenas = [
    'Tecnologia',
    'Inteligência Artificial',
    'Sistemas Internos',
    'E-commerce',
    'Saúde',
    'Educação',
    'Financeiro',
    'Varejo'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingId) {
      setOportunidades(prev => prev.map(item => 
        item.id === editingId 
          ? { ...item, ...formData }
          : item
      ))
    } else {
      const newOportunidade = {
        id: Date.now(),
        ...formData,
        dataCriacao: new Date().toISOString().split('T')[0]
      }
      setOportunidades(prev => [...prev, newOportunidade])
    }
    
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      nome: '',
      descricao: '',
      arena: '',
      tipoProjeto: '',
      status: 'Aguardando',
      observacaoStatus: ''
    })
    setEditingId(null)
    setDialogOpen(false)
  }

  const handleEdit = (oportunidade) => {
    setFormData({
      nome: oportunidade.nome,
      descricao: oportunidade.descricao,
      arena: oportunidade.arena,
      tipoProjeto: oportunidade.tipoProjeto,
      status: oportunidade.status,
      observacaoStatus: oportunidade.observacaoStatus
    })
    setEditingId(oportunidade.id)
    setDialogOpen(true)
  }

  const handleDelete = (id) => {
    setOportunidades(prev => prev.filter(item => item.id !== id))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Aprovada': return 'bg-green-100 text-green-800'
      case 'Aguardando': return 'bg-yellow-100 text-yellow-800'
      case 'Reprovada': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusCount = (status) => {
    return oportunidades.filter(op => op.status === status).length
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Ideias</h2>
          <p className="text-muted-foreground">
            Capture e avalie ideias para inovação
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="mr-2 h-4 w-4" />
              Nova Oportunidade
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingId ? 'Editar Oportunidade' : 'Nova Oportunidade'}
              </DialogTitle>
              <DialogDescription>
                Preencha os dados da oportunidade de projeto
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                    placeholder="Identificação da ideia"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="arena">Arena *</Label>
                  <Select 
                    value={formData.arena} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, arena: value }))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a arena" />
                    </SelectTrigger>
                    <SelectContent>
                      {arenas.map(arena => (
                        <SelectItem key={arena} value={arena}>{arena}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição *</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
                  placeholder="Resumo da ideia"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipoProjeto">Tipo de Projeto *</Label>
                <Select 
                  value={formData.tipoProjeto} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, tipoProjeto: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposProjeto.map(tipo => (
                      <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacaoStatus">Observação do Status</Label>
                <Textarea
                  id="observacaoStatus"
                  value={formData.observacaoStatus}
                  onChange={(e) => setFormData(prev => ({ ...prev, observacaoStatus: e.target.value }))}
                  placeholder="Comentário sobre o status para referência futura"
                  rows={2}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingId ? 'Atualizar' : 'Criar'} Oportunidade
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards de resumo */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{oportunidades.length}</div>
            <p className="text-xs text-muted-foreground">Oportunidades cadastradas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprovadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{getStatusCount('Aprovada')}</div>
            <p className="text-xs text-muted-foreground">Prontas para concepção</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aguardando</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{getStatusCount('Aguardando')}</div>
            <p className="text-xs text-muted-foreground">Em análise</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reprovadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{getStatusCount('Reprovada')}</div>
            <p className="text-xs text-muted-foreground">Não aprovadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de oportunidades */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Oportunidades</CardTitle>
          <CardDescription>
            Todas as ideias cadastradas no funil
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Arena</TableHead>
                <TableHead>Tipo de Projeto</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data Criação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {oportunidades.map((oportunidade) => (
                <TableRow key={oportunidade.id}>
                  <TableCell className="font-medium">{oportunidade.nome}</TableCell>
                  <TableCell>{oportunidade.arena}</TableCell>
                  <TableCell>{oportunidade.tipoProjeto}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(oportunidade.status)}>
                      {oportunidade.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(oportunidade.dataCriacao).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(oportunidade)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(oportunidade.id)}
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

export default Ideias

