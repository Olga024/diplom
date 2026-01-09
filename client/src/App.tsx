import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { CatalogPage } from './pages/CatalogPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { AboutPage } from './pages/AboutPage'
import { ContactsPage } from './pages/ContactsPage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/catalog.html" element={<CatalogPage />} />
      <Route path="/about.html" element={<AboutPage />} />
      <Route path="/contacts.html" element={<ContactsPage />} />
      <Route path="/cart.html" element={<>CartPage</>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
