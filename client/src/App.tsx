import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { CatalogPage } from './pages/CatalogPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { AboutPage } from './pages/AboutPage'
import { ContactsPage } from './pages/ContactsPage'
import { CartPage } from './pages/CartPage'
import { HomePage } from './pages/HomePage'
import { ProductPage } from './pages/ProductPage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<HomePage />} />
        <Route path="/catalog.html" element={<CatalogPage />} />
        <Route path="/about.html" element={<AboutPage />} />
        <Route path="/contacts.html" element={<ContactsPage />} />
        <Route path="/cart.html" element={<CartPage />} />
        <Route path="/catalog/:id" element={<ProductPage/>} />
      </Route>
      <Route path="/404.html" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
