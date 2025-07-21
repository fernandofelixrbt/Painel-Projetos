import { useState } from 'react'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Ideias from './pages/Ideias'
import PreProjetos from './pages/PreProjetos'
import Projetos from './pages/Projetos'
import Portfolio from './pages/Portfolio'
import Administrador from './pages/Administrador'
import './App.css'
import './styles/rbt-theme.css'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'ideias':
        return <Ideias />
      case 'pre-projetos':
        return <PreProjetos />
      case 'projetos':
        return <Projetos />
      case 'portfolio':
        return <Portfolio />
      case 'administrador':
        return <Administrador />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="rbt-theme">
      <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
        {renderPage()}
      </Layout>
    </div>
  )
}

export default App
