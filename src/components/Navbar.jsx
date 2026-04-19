import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, ChevronDown, Search } from 'lucide-react'
import { siteConfig } from '../data/siteData'

const navLinks = [
  { label: 'Accueil', path: '/' },
  { label: 'Présentation', path: '/presentation' },
  { 
    label: 'Produits', 
    path: '/produits',
    children: [
      { label: 'Toute la gamme', path: '/produits' },
      { label: 'Fassi 15g', path: '/produits?id=1' },
      { label: 'Fassi 30g', path: '/produits?id=2' },
      { label: 'Fassi 100g', path: '/produits?id=3' },
      { label: 'Fassi 350g', path: '/produits?id=4' },
      { label: 'Fassi 500g', path: '/produits?id=5' },
      { label: 'Fassi 1000g', path: '/produits?id=6' },
    ]
  },
  { label: 'Actualités', path: '/actualites' },
  { label: 'Galerie', path: '/galerie' },
  { label: 'Partenaires', path: '/partenaires' },
  { label: 'À Propos', path: '/a-propos' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setOpenDropdown(null)
  }, [location])

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Top bar */}
      <div className="bg-fassi-dark text-white text-xs py-1.5 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 opacity-80">
              <Phone size={11} />
              {siteConfig.phone[0]}
            </span>
            <span className="opacity-40">|</span>
            <span className="opacity-80">{siteConfig.hours}</span>
          </div>
          <div className="flex items-center gap-4 opacity-80">
            <span>{siteConfig.email}</span>
            <span className="opacity-40">|</span>
            <Link to="/admin" className="hover:text-fassi-gold transition-colors">Espace Admin</Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-lg shadow-blue-900/10 py-2' 
          : 'bg-white/98 backdrop-blur py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img src="/logo.png" alt="Fassi Flash Action" className="h-12 w-auto object-contain" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden xl:flex items-center gap-0.5">
            {navLinks.map(link => (
              <div key={link.path} className="relative group">
                {link.children ? (
                  <button
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 nav-link
                      ${isActive(link.path) 
                        ? 'text-fassi-blue bg-blue-100' 
                        : 'text-gray-700 hover:text-fassi-blue hover:bg-blue-50'
                      }`}
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {link.label}
                    <ChevronDown size={13} className="group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 nav-link
                      ${isActive(link.path) 
                        ? 'text-fassi-blue bg-blue-50 active' 
                        : 'text-gray-700 hover:text-fassi-blue hover:bg-blue-50'
                      }`}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Dropdown */}
                {link.children && (
                  <div
                    className={`absolute top-full left-0 mt-1 bg-white rounded-xl shadow-2xl border border-gray-100 min-w-[200px] overflow-hidden transition-all duration-200 ${
                      openDropdown === link.label ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                    }`}
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {link.children.map(child => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-fassi-blue transition-colors border-b border-gray-50 last:border-0"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden lg:flex btn-primary text-sm px-5 py-2.5 rounded-xl font-semibold items-center gap-2"
            >
              <Phone size={14} />
              Nous contacter
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden p-2 rounded-lg text-fassi-blue hover:bg-blue-50 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="xl:hidden mobile-menu-enter border-t border-gray-100 bg-white shadow-xl">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <div key={link.path}>
                  <Link
                    to={link.path}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors
                      ${isActive(link.path)
                        ? 'bg-fassi-blue text-white'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-fassi-blue'
                      }`}
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
              <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                <a href={`tel:${siteConfig.phone[0]}`} className="btn-primary flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold">
                  <Phone size={14} />
                  {siteConfig.phone[0]}
                </a>
                <Link to="/admin" className="border-2 border-fassi-blue text-fassi-blue flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-fassi-blue hover:text-white transition-colors">
                  Espace Admin
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
