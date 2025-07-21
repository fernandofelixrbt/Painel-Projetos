import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Switch } from '@/components/ui/switch.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Settings, 
  Shield, 
  Activity,
  Key,
  UserCheck,
  UserX,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react'

const Administrador = () => {
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nome: 'João Silva',
      email: 'joao.silva@empresa.com',
      cargo: 'Gerente de Projetos',
      departamento: 'TI',
      perfil: 'Gerente',
      status: 'Ativo',
      ultimoAcesso: '2024-07-18',
      permissoes: {
        funil: { visualizar: true, editar: true, excluir: false },
        concepcao: { visualizar: true, editar: true, excluir: true },
        desenvolvimento: { visualizar: true, editar: false, excluir: false },
        orcamento: { visualizar: true, editar: false, excluir: false },
        dashboard: { visualizar: true, editar: false, excluir: false },
        admin: { visualizar: false, editar: false, excluir: false }
      }
    },
    {
      id: 2,
      nome: 'Maria Santos',
      email: 'maria.santos@empresa.com',
      cargo: 'Diretora',
      departamento: 'Estratégia',
      perfil: 'Diretor',
      status: 'Ativo',
      ultimoAcesso: '2024-07-18',
      permissoes: {
        funil: { visualizar: true, editar: true, excluir: true },
        concepcao: { visualizar: true, editar: true, excluir: true },
        desenvolvimento: { visualizar: true, editar: true, excluir: false },
        orcamento: { visualizar: true, editar: true, excluir: false },
        dashboard: { visualizar: true, editar: false, excluir: false },
        admin: { visualizar: false, editar: false, excluir: false }
      }
    },
    {
      id: 3,
      nome: 'Carlos Admin',
      email: 'admin@empresa.com',
      cargo: 'Administrador do Sistema',
      departamento: 'TI',
      perfil: 'Administrador',
      status: 'Ativo',
      ultimoAcesso: '2024-07-18',
      permissoes: {
        funil: { visualizar: true, editar: true, excluir: true },
        concepcao: { visualizar: true, editar: true, excluir: true },
        desenvolvimento: { visualizar: true, editar: true, excluir: true },
        orcamento: { visualizar: true, editar: true, excluir: true },
        dashboard: { visualizar: true, editar: true, excluir: false },
        admin: { visualizar: true, editar: true, excluir: true }
      }
    }
  ])

  const [configuracoes, setConfiguracoes] = useState({
    premissasViabilidade: {
      alcadaDiretoria: 50000,
      alcadaCEO: 100000,
      faturamentoMinimo: 300000,
      margemMinimaAprovacao: 35
    },
    sistemaGeral: {
      nomeEmpresa: 'Empresa Inovadora Ltda',
      logoUrl: '',
      emailNotificacoes: 'notificacoes@empresa.com',
      backupAutomatico: true,
      logAuditoria: true,
      sessaoTimeout: 480 // minutos
    },
    notificacoes: {
      emailNovosProjetos: true,
      emailAprovacoes: true,
      emailAtrasos: true,
      emailRelatorios: false
    }
  })

  const [logsAuditoria] = useState([
    {
      id: 1,
      usuario: 'João Silva',
      acao: 'Criou projeto',
      modulo: 'Funil de Oportunidades',
      detalhes: 'Projeto: Plataforma E-learning Corporativo',
      timestamp: '2024-07-18 14:30:00',
      ip: '192.168.1.100'
    },
    {
      id: 2,
      usuario: 'Maria Santos',
      acao: 'Aprovou projeto',
      modulo: 'Concepção',
      detalhes: 'Projeto: Produto Inovador A - Aprovação Diretoria',
      timestamp: '2024-07-18 13:15:00',
      ip: '192.168.1.101'
    },
    {
      id: 3,
      usuario: 'Carlos Admin',
      acao: 'Alterou premissas',
      modulo: 'Administrador',
      detalhes: 'Alterou alçada CEO de R$ 80k para R$ 100k',
      timestamp: '2024-07-18 10:45:00',
      ip: '192.168.1.102'
    }
  ])

  const [dialogUsuarioOpen, setDialogUsuarioOpen] = useState(false)
  const [dialogConfigOpen, setDialogConfigOpen] = useState(false)
  const [editingUserId, setEditingUserId] = useState(null)
  const [formUsuario, setFormUsuario] = useState({
    nome: '',
    email: '',
    cargo: '',
    departamento: '',
    perfil: 'Usuario',
    status: 'Ativo'
  })

  const perfisDisponiveis = ['Usuario', 'Gerente', 'Diretor', 'Administrador']
  const departamentos = ['TI', 'Estratégia', 'Financeiro', 'RH', 'Comercial', 'Operações']
  const modulos = ['funil', 'concepcao', 'desenvolvimento', 'orcamento', 'dashboard', 'admin']
  const modulosNomes = {
    funil: 'Funil de Oportunidades',
    concepcao: 'Concepção',
    desenvolvimento: 'Desenvolvimento',
    orcamento: 'Orçamento',
    dashboard: 'Dashboard',
    admin: 'Administrador'
  }

  const handleUsuarioSubmit = (e) => {
    e.preventDefault()
    
    const permissoesDefault = getPermissoesPorPerfil(formUsuario.perfil)
    
    if (editingUserId) {
      setUsuarios(prev => prev.map(user => 
        user.id === editingUserId 
          ? { ...user, ...formUsuario, permissoes: permissoesDefault }
          : user
      ))
    } else {
      const novoUsuario = {
        id: Date.now(),
        ...formUsuario,
        ultimoAcesso: 'Nunca',
        permissoes: permissoesDefault
      }
      setUsuarios(prev => [...prev, novoUsuario])
    }
    
    resetFormUsuario()
  }

  const getPermissoesPorPerfil = (perfil) => {
    const permissoes = {
      funil: { visualizar: false, editar: false, excluir: false },
      concepcao: { visualizar: false, editar: false, excluir: false },
      desenvolvimento: { visualizar: false, editar: false, excluir: false },
      orcamento: { visualizar: false, editar: false, excluir: false },
      dashboard: { visualizar: false, editar: false, excluir: false },
      admin: { visualizar: false, editar: false, excluir: false }
    }

    switch (perfil) {
      case 'Usuario':
        permissoes.funil.visualizar = true
        permissoes.dashboard.visualizar = true
        break
      case 'Gerente':
        Object.keys(permissoes).forEach(modulo => {
          if (modulo !== 'admin') {
            permissoes[modulo].visualizar = true
            permissoes[modulo].editar = true
          }
        })
        break
      case 'Diretor':
        Object.keys(permissoes).forEach(modulo => {
          if (modulo !== 'admin') {
            permissoes[modulo].visualizar = true
            permissoes[modulo].editar = true
            if (modulo === 'funil' || modulo === 'concepcao') {
              permissoes[modulo].excluir = true
            }
          }
        })
        break
      case 'Administrador':
        Object.keys(permissoes).forEach(modulo => {
          permissoes[modulo].visualizar = true
          permissoes[modulo].editar = true
          permissoes[modulo].excluir = true
        })
        break
    }

    return permissoes
  }

  const resetFormUsuario = () => {
    setFormUsuario({
      nome: '',
      email: '',
      cargo: '',
      departamento: '',
      perfil: 'Usuario',
      status: 'Ativo'
    })
    setEditingUserId(null)
    setDialogUsuarioOpen(false)
  }

  const handleEditUsuario = (usuario) => {
    setFormUsuario({
      nome: usuario.nome,
      email: usuario.email,
      cargo: usuario.cargo,
      departamento: usuario.departamento,
      perfil: usuario.perfil,
      status: usuario.status
    })
    setEditingUserId(usuario.id)
    setDialogUsuarioOpen(true)
  }

  const handleDeleteUsuario = (id) => {
    setUsuarios(prev => prev.filter(user => user.id !== id))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ativo': return 'bg-green-100 text-green-800'
      case 'Inativo': return 'bg-red-100 text-red-800'
      case 'Suspenso': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPerfilColor = (perfil) => {
    switch (perfil) {
      case 'Administrador': return 'bg-purple-100 text-purple-800'
      case 'Diretor': return 'bg-blue-100 text-blue-800'
      case 'Gerente': return 'bg-green-100 text-green-800'
      case 'Usuario': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleConfigSubmit = (e) => {
    e.preventDefault()
    setDialogConfigOpen(false)
    // Aqui você salvaria as configurações
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Administração</h2>
          <p className="text-muted-foreground">
            Gerencie usuários, permissões e configurações do sistema
          </p>
        </div>
      </div>

      <Tabs defaultValue="usuarios" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="usuarios">Usuários</TabsTrigger>
          <TabsTrigger value="permissoes">Permissões</TabsTrigger>
          <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
          <TabsTrigger value="auditoria">Auditoria</TabsTrigger>
        </TabsList>

        {/* Aba Usuários */}
        <TabsContent value="usuarios" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Gestão de Usuários</h3>
            <Dialog open={dialogUsuarioOpen} onOpenChange={setDialogUsuarioOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => resetFormUsuario()}>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Usuário
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingUserId ? 'Editar Usuário' : 'Novo Usuário'}
                  </DialogTitle>
                  <DialogDescription>
                    Preencha os dados do usuário
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleUsuarioSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo *</Label>
                      <Input
                        id="nome"
                        value={formUsuario.nome}
                        onChange={(e) => setFormUsuario(prev => ({ ...prev, nome: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formUsuario.email}
                        onChange={(e) => setFormUsuario(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cargo">Cargo</Label>
                      <Input
                        id="cargo"
                        value={formUsuario.cargo}
                        onChange={(e) => setFormUsuario(prev => ({ ...prev, cargo: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="departamento">Departamento</Label>
                      <Select 
                        value={formUsuario.departamento} 
                        onValueChange={(value) => setFormUsuario(prev => ({ ...prev, departamento: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {departamentos.map(dept => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="perfil">Perfil de Acesso *</Label>
                      <Select 
                        value={formUsuario.perfil} 
                        onValueChange={(value) => setFormUsuario(prev => ({ ...prev, perfil: value }))}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {perfisDisponiveis.map(perfil => (
                            <SelectItem key={perfil} value={perfil}>{perfil}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select 
                        value={formUsuario.status} 
                        onValueChange={(value) => setFormUsuario(prev => ({ ...prev, status: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ativo">Ativo</SelectItem>
                          <SelectItem value="Inativo">Inativo</SelectItem>
                          <SelectItem value="Suspenso">Suspenso</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={resetFormUsuario}>
                      Cancelar
                    </Button>
                    <Button type="submit">
                      {editingUserId ? 'Atualizar' : 'Criar'} Usuário
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
                <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{usuarios.length}</div>
                <p className="text-xs text-muted-foreground">Cadastrados no sistema</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {usuarios.filter(u => u.status === 'Ativo').length}
                </div>
                <p className="text-xs text-muted-foreground">Com acesso liberado</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Administradores</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {usuarios.filter(u => u.perfil === 'Administrador').length}
                </div>
                <p className="text-xs text-muted-foreground">Acesso total</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Últimas 24h</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {usuarios.filter(u => u.ultimoAcesso === '2024-07-18').length}
                </div>
                <p className="text-xs text-muted-foreground">Acessos recentes</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabela de usuários */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Usuários</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Perfil</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Último Acesso</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usuarios.map((usuario) => (
                    <TableRow key={usuario.id}>
                      <TableCell className="font-medium">{usuario.nome}</TableCell>
                      <TableCell>{usuario.email}</TableCell>
                      <TableCell>{usuario.departamento}</TableCell>
                      <TableCell>
                        <Badge className={getPerfilColor(usuario.perfil)}>
                          {usuario.perfil}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(usuario.status)}>
                          {usuario.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{usuario.ultimoAcesso}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditUsuario(usuario)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteUsuario(usuario.id)}
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
        </TabsContent>

        {/* Aba Permissões */}
        <TabsContent value="permissoes" className="space-y-4">
          <h3 className="text-lg font-semibold">Matriz de Permissões por Perfil</h3>
          
          <div className="grid gap-4">
            {perfisDisponiveis.map(perfil => {
              const permissoes = getPermissoesPorPerfil(perfil)
              return (
                <Card key={perfil}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Badge className={getPerfilColor(perfil)}>{perfil}</Badge>
                      <span className="text-sm text-muted-foreground">
                        ({usuarios.filter(u => u.perfil === perfil).length} usuários)
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {modulos.map(modulo => (
                        <div key={modulo} className="space-y-2">
                          <h4 className="font-medium">{modulosNomes[modulo]}</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center space-x-2">
                              {permissoes[modulo].visualizar ? 
                                <CheckCircle className="h-4 w-4 text-green-600" /> : 
                                <XCircle className="h-4 w-4 text-red-600" />
                              }
                              <span>Visualizar</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              {permissoes[modulo].editar ? 
                                <CheckCircle className="h-4 w-4 text-green-600" /> : 
                                <XCircle className="h-4 w-4 text-red-600" />
                              }
                              <span>Editar</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              {permissoes[modulo].excluir ? 
                                <CheckCircle className="h-4 w-4 text-green-600" /> : 
                                <XCircle className="h-4 w-4 text-red-600" />
                              }
                              <span>Excluir</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Aba Configurações */}
        <TabsContent value="configuracoes" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Configurações do Sistema</h3>
            <Dialog open={dialogConfigOpen} onOpenChange={setDialogConfigOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Settings className="mr-2 h-4 w-4" />
                  Editar Configurações
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Configurações do Sistema</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleConfigSubmit} className="space-y-4">
                  <Tabs defaultValue="geral" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="geral">Geral</TabsTrigger>
                      <TabsTrigger value="premissas">Premissas</TabsTrigger>
                      <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="geral" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nome da Empresa</Label>
                          <Input
                            value={configuracoes.sistemaGeral.nomeEmpresa}
                            onChange={(e) => setConfiguracoes(prev => ({
                              ...prev,
                              sistemaGeral: { ...prev.sistemaGeral, nomeEmpresa: e.target.value }
                            }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>E-mail para Notificações</Label>
                          <Input
                            type="email"
                            value={configuracoes.sistemaGeral.emailNotificacoes}
                            onChange={(e) => setConfiguracoes(prev => ({
                              ...prev,
                              sistemaGeral: { ...prev.sistemaGeral, emailNotificacoes: e.target.value }
                            }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Timeout de Sessão (minutos)</Label>
                          <Input
                            type="number"
                            value={configuracoes.sistemaGeral.sessaoTimeout}
                            onChange={(e) => setConfiguracoes(prev => ({
                              ...prev,
                              sistemaGeral: { ...prev.sistemaGeral, sessaoTimeout: parseInt(e.target.value) }
                            }))}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Backup Automático</Label>
                            <p className="text-sm text-muted-foreground">Realizar backup diário dos dados</p>
                          </div>
                          <Switch
                            checked={configuracoes.sistemaGeral.backupAutomatico}
                            onCheckedChange={(checked) => setConfiguracoes(prev => ({
                              ...prev,
                              sistemaGeral: { ...prev.sistemaGeral, backupAutomatico: checked }
                            }))}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Log de Auditoria</Label>
                            <p className="text-sm text-muted-foreground">Registrar todas as ações dos usuários</p>
                          </div>
                          <Switch
                            checked={configuracoes.sistemaGeral.logAuditoria}
                            onCheckedChange={(checked) => setConfiguracoes(prev => ({
                              ...prev,
                              sistemaGeral: { ...prev.sistemaGeral, logAuditoria: checked }
                            }))}
                          />
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="premissas" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Alçada Diretoria (R$)</Label>
                          <Input
                            type="number"
                            value={configuracoes.premissasViabilidade.alcadaDiretoria}
                            onChange={(e) => setConfiguracoes(prev => ({
                              ...prev,
                              premissasViabilidade: { ...prev.premissasViabilidade, alcadaDiretoria: parseFloat(e.target.value) }
                            }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Alçada CEO (R$)</Label>
                          <Input
                            type="number"
                            value={configuracoes.premissasViabilidade.alcadaCEO}
                            onChange={(e) => setConfiguracoes(prev => ({
                              ...prev,
                              premissasViabilidade: { ...prev.premissasViabilidade, alcadaCEO: parseFloat(e.target.value) }
                            }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Faturamento Mínimo (R$)</Label>
                          <Input
                            type="number"
                            value={configuracoes.premissasViabilidade.faturamentoMinimo}
                            onChange={(e) => setConfiguracoes(prev => ({
                              ...prev,
                              premissasViabilidade: { ...prev.premissasViabilidade, faturamentoMinimo: parseFloat(e.target.value) }
                            }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Margem Mínima (%)</Label>
                          <Input
                            type="number"
                            value={configuracoes.premissasViabilidade.margemMinimaAprovacao}
                            onChange={(e) => setConfiguracoes(prev => ({
                              ...prev,
                              premissasViabilidade: { ...prev.premissasViabilidade, margemMinimaAprovacao: parseFloat(e.target.value) }
                            }))}
                          />
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="notificacoes" className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Novos Projetos</Label>
                            <p className="text-sm text-muted-foreground">Notificar sobre novos projetos criados</p>
                          </div>
                          <Switch
                            checked={configuracoes.notificacoes.emailNovosProjetos}
                            onCheckedChange={(checked) => setConfiguracoes(prev => ({
                              ...prev,
                              notificacoes: { ...prev.notificacoes, emailNovosProjetos: checked }
                            }))}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Aprovações</Label>
                            <p className="text-sm text-muted-foreground">Notificar sobre aprovações pendentes</p>
                          </div>
                          <Switch
                            checked={configuracoes.notificacoes.emailAprovacoes}
                            onCheckedChange={(checked) => setConfiguracoes(prev => ({
                              ...prev,
                              notificacoes: { ...prev.notificacoes, emailAprovacoes: checked }
                            }))}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Atrasos</Label>
                            <p className="text-sm text-muted-foreground">Notificar sobre projetos em atraso</p>
                          </div>
                          <Switch
                            checked={configuracoes.notificacoes.emailAtrasos}
                            onCheckedChange={(checked) => setConfiguracoes(prev => ({
                              ...prev,
                              notificacoes: { ...prev.notificacoes, emailAtrasos: checked }
                            }))}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Relatórios</Label>
                            <p className="text-sm text-muted-foreground">Enviar relatórios semanais</p>
                          </div>
                          <Switch
                            checked={configuracoes.notificacoes.emailRelatorios}
                            onCheckedChange={(checked) => setConfiguracoes(prev => ({
                              ...prev,
                              notificacoes: { ...prev.notificacoes, emailRelatorios: checked }
                            }))}
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setDialogConfigOpen(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit">Salvar Configurações</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Nome da Empresa:</span>
                  <span className="text-sm">{configuracoes.sistemaGeral.nomeEmpresa}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">E-mail Notificações:</span>
                  <span className="text-sm">{configuracoes.sistemaGeral.emailNotificacoes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Timeout Sessão:</span>
                  <span className="text-sm">{configuracoes.sistemaGeral.sessaoTimeout} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Backup Automático:</span>
                  <Badge className={configuracoes.sistemaGeral.backupAutomatico ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {configuracoes.sistemaGeral.backupAutomatico ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Log de Auditoria:</span>
                  <Badge className={configuracoes.sistemaGeral.logAuditoria ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {configuracoes.sistemaGeral.logAuditoria ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Premissas de Viabilidade</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Alçada Diretoria:</span>
                  <span className="text-sm">R$ {configuracoes.premissasViabilidade.alcadaDiretoria.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Alçada CEO:</span>
                  <span className="text-sm">R$ {configuracoes.premissasViabilidade.alcadaCEO.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Faturamento Mínimo:</span>
                  <span className="text-sm">R$ {configuracoes.premissasViabilidade.faturamentoMinimo.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Margem Mínima:</span>
                  <span className="text-sm">{configuracoes.premissasViabilidade.margemMinimaAprovacao}%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Aba Auditoria */}
        <TabsContent value="auditoria" className="space-y-4">
          <h3 className="text-lg font-semibold">Log de Auditoria</h3>
          
          <Card>
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
              <CardDescription>
                Registro de todas as ações realizadas no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Ação</TableHead>
                    <TableHead>Módulo</TableHead>
                    <TableHead>Detalhes</TableHead>
                    <TableHead>IP</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logsAuditoria.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                      <TableCell>{log.usuario}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.acao}</Badge>
                      </TableCell>
                      <TableCell>{log.modulo}</TableCell>
                      <TableCell className="max-w-xs truncate">{log.detalhes}</TableCell>
                      <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Administrador

