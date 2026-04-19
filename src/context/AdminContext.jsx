import { createContext, useState, useEffect } from 'react'
import { products as initialProducts, news as initialNews, partners as initialPartners } from '../data/siteData'

const AdminContext = createContext(null)
export { AdminContext }

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminUser, setAdminUser] = useState(null)
  const [products, setProducts] = useState(initialProducts)
  const [news, setNews] = useState(initialNews)
  const [partners, setPartners] = useState(initialPartners)
  const [contacts, setContacts] = useState([
    { id: 1, name: "Amadou Traoré", email: "amadou@gmail.com", subject: "Commande en gros", message: "Je souhaite commander 500 sachets...", date: "2026-03-15", status: "nouveau", phone: "+226 70 12 34 56" },
    { id: 2, name: "Fatima Ouédraogo", email: "fatima@shop.bf", subject: "Partenariat distribution", message: "Intéressée par votre programme distributeur...", date: "2026-03-14", status: "lu", phone: "+226 76 54 32 10" },
    { id: 3, name: "Jean-Baptiste Kaboré", email: "jb@hotel.bf", subject: "Tarif professionnel", message: "Nous gérons 3 hôtels...", date: "2026-03-12", status: "répondu", phone: "+226 65 78 90 12" },
  ])
  const [siteSettings, setSiteSettings] = useState({
    maintenance: false,
    heroTitle: "La Propreté, Notre Passion",
    heroSubtitle: "Produits de nettoyage de haute qualité pour les particuliers et les professionnels.",
    bannerText: "",
    bannerActive: false,
  })

  // Simulate persisted login
  useEffect(() => {
    const saved = localStorage.getItem('fassi_admin')
    if (saved) {
      const data = JSON.parse(saved)
      if (data.exp > Date.now()) {
        setIsAuthenticated(true)
        setAdminUser(data.user)
      }
    }
  }, [])

  const login = (email, password) => {
    // Mock auth - replace with real backend
    if (email === 'admin@cidf-bf.com' && password === 'Fassi2026!') {
      const user = { name: 'Administrateur FASSI', email, role: 'superadmin', avatar: null }
      setIsAuthenticated(true)
      setAdminUser(user)
      localStorage.setItem('fassi_admin', JSON.stringify({ user, exp: Date.now() + 86400000 }))
      return { success: true }
    }
    return { success: false, error: 'Identifiants incorrects' }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setAdminUser(null)
    localStorage.removeItem('fassi_admin')
  }

  const addContact = (contact) => {
    setContacts(prev => [{ ...contact, id: Date.now(), date: new Date().toISOString().split('T')[0], status: 'nouveau' }, ...prev])
  }

  const updateContactStatus = (id, status) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, status } : c))
  }

  const addNews = (article) => {
    setNews(prev => [{ ...article, id: Date.now(), date: new Date().toISOString().split('T')[0] }, ...prev])
  }

  const updateNews = (id, data) => {
    setNews(prev => prev.map(n => n.id === id ? { ...n, ...data } : n))
  }

  const deleteNews = (id) => {
    setNews(prev => prev.filter(n => n.id !== id))
  }

  const updateProduct = (id, data) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p))
  }

  return (
    <AdminContext.Provider value={{
      isAuthenticated, adminUser, login, logout,
      products, setProducts, updateProduct,
      news, addNews, updateNews, deleteNews,
      partners, setPartners,
      contacts, addContact, updateContactStatus,
      siteSettings, setSiteSettings,
    }}>
      {children}
    </AdminContext.Provider>
  )
}
