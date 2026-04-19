import { Routes, Route, useLocation, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { AdminProvider } from './context/AdminContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageLoader from './components/PageLoader'
import Home from './pages/Home'
import Products from './pages/Products'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import { Gallery, News, Partners, About, Presentation, Downloads } from './pages/OtherPages'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <AdminProvider>
      <PageLoader />
      <ScrollToTop />
      <Routes>
        {/* Admin — no navbar/footer */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/*" element={<Admin />} />

        {/* Public pages */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/presentation" element={<Layout><Presentation /></Layout>} />
        <Route path="/produits" element={<Layout><Products /></Layout>} />
        <Route path="/actualites" element={<Layout><News /></Layout>} />
        <Route path="/galerie" element={<Layout><Gallery /></Layout>} />
        <Route path="/partenaires" element={<Layout><Partners /></Layout>} />
        <Route path="/a-propos" element={<Layout><About /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/telechargements" element={<Layout><Downloads /></Layout>} />

        {/* 404 */}
        <Route path="*" element={
          <Layout>
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <div className="font-display font-bold text-8xl text-fassi-blue/10 mb-4">404</div>
                <h1 className="font-display font-bold text-3xl text-fassi-dark mb-3">Page introuvable</h1>
                <p className="text-gray-500 mb-6">La page que vous cherchez n'existe pas.</p>
                <Link to="/" className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold">
                  Retour à l'accueil
                </Link>
              </div>
            </div>
          </Layout>
        } />
      </Routes>
    </AdminProvider>
  )
}
