import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, ChevronRight, Star, Shield, Leaf, Heart, Zap, 
  Package, Award, Users, Globe, Phone, Mail, MapPin,
  Play, Download, ChevronLeft
} from 'lucide-react'
import { products, stats, values, news, partners } from '../data/siteData'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { usePageReady } from '../hooks/usePageReady'

// ——— Hero Slider data ———
const heroSlides = [
  {
    headline: "La Propreté,\nNotre Passion",
    sub: "Des produits de nettoyage haute qualité, fabriqués au cœur du Burkina Faso pour toute l'Afrique.",
    cta: "Découvrir nos produits",
    ctaLink: "/produits",
    bg: "from-fassi-dark/60 via-fassi-dark/30 to-transparent",
    accent: "Qualité · Efficacité · Accessibilité",
    image: "/images/Banner.jpeg",
  },
  {
    headline: "6 Formats\nPour Tous Vos Besoins",
    sub: "De 15g à 1000g — une gamme complète pour les particuliers comme pour les professionnels.",
    cta: "Voir la gamme",
    ctaLink: "/produits",
    bg: "from-[#0D1E3A]/65 via-[#1A3A6B]/35 to-transparent",
    accent: "Du Particulier au Professionnel",
    image: "/images/banner1.png",
  },
  {
    headline: "Partenaire de Votre Succès",
    sub: "Rejoignez notre réseau de distributeurs et profitez de nos conditions avantageuses en Afrique de l'Ouest.",
    cta: "Devenir partenaire",
    ctaLink: "/contact",
    bg: "from-[#0D1E3A]/65 via-[#1e3a5f]/35 to-transparent",
    accent: "Réseau Afrique de l'Ouest",
    image: "/images/Banner2.jpeg",
  },
]

// ——— Stat Card ———
function StatCard({ number, suffix, label, icon, visible }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!visible) return
    const duration = 1800
    const steps = 60
    const increment = number / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= number) { setCount(number); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, duration / steps)
    return () => clearInterval(timer)
  }, [visible, number])

  return (
    <div className="text-center px-4 py-6 group">
      <div className="text-4xl md:text-5xl font-display font-black text-fassi-blue mb-2 tabular-nums">
        {visible ? count : 0}{suffix}
      </div>
      <div className="w-8 h-0.5 bg-fassi-red mx-auto mb-3" />
      <div className="text-gray-500 text-sm font-medium tracking-wide">{label}</div>
    </div>
  )
}

// ——— Product Card Preview ———
function ProductCardPreview({ product }) {
  const colorMap = {
    '#1A3A6B': 'from-[#1A3A6B] to-[#2355A0]',
    '#2355A0': 'from-[#2355A0] to-[#3570C8]',
    '#CC1F1F': 'from-[#CC1F1F] to-[#e63333]',
    '#D4A017': 'from-[#D4A017] to-[#F0C842]',
    '#0D1E3A': 'from-[#0D1E3A] to-[#1A3A6B]',
  }
  const gradient = colorMap[product.color] || 'from-fassi-blue to-blue-600'

  return (
    <div className="product-card bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl group cursor-pointer">
      {/* Visual */}
      <div className={`relative bg-gradient-to-br ${gradient} overflow-hidden`} style={{ paddingTop: '75%' }}>
        {product.badge && (
          <span className="absolute top-4 right-4 z-10 bg-white text-fassi-blue text-xs font-bold px-3 py-1 rounded-full shadow-md">
            {product.badge}
          </span>
        )}
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-32 bg-white/20 rounded-2xl backdrop-blur-sm flex flex-col items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <div className="text-white font-display font-bold text-2xl">F</div>
              <div className="text-white/80 text-xs mt-1 font-semibold">{product.weight}</div>
            </div>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-5">
        <div className="text-xs text-fassi-blue font-semibold uppercase tracking-wider mb-1">{product.category}</div>
        <h3 className="font-display font-bold text-gray-900 text-lg mb-2">{product.name}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{product.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.features.map(f => (
            <span key={f} className="bg-blue-50 text-fassi-blue text-xs px-2 py-1 rounded-full">{f}</span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-fassi-blue font-bold text-sm">{product.price}</span>
          <Link to="/produits" className="flex items-center gap-1 text-fassi-red text-sm font-semibold hover:gap-2 transition-all">
            Détails <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}

// ——— News Card ———
function NewsCard({ article }) {
  const catColors = {
    Innovation: 'bg-purple-100 text-purple-700',
    Événement: 'bg-orange-100 text-orange-700',
    Développement: 'bg-green-100 text-green-700',
    Qualité: 'bg-blue-100 text-blue-700',
    Social: 'bg-pink-100 text-pink-700',
    Industrie: 'bg-gray-100 text-gray-700',
  }
  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group">
      <div className="h-44 bg-gradient-to-br from-fassi-blue/10 to-fassi-blue/5 flex items-center justify-center relative overflow-hidden">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="text-6xl opacity-10 font-display font-bold text-fassi-blue select-none">
            {article.category[0]}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full ${catColors[article.category] || 'bg-blue-100 text-blue-700'}`}>
          {article.category}
        </div>
      </div>
      <div className="p-5">
        <div className="text-xs text-gray-400 mb-2">
          {new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
        <h3 className="font-display font-bold text-gray-900 text-base mb-2 leading-snug group-hover:text-fassi-blue transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">{article.excerpt}</p>
        <Link to="/actualites" className="flex items-center gap-1 text-fassi-red text-sm font-semibold hover:gap-2 transition-all">
          Lire plus <ArrowRight size={13} />
        </Link>
      </div>
    </article>
  )
}

// ——— Value Card ———
function ValueCard({ v }) {
  const icons = { Shield, Leaf, Heart, Zap }
  const Icon = icons[v.icon]
  return (
    <div className="reveal bg-white rounded-2xl p-6 border border-gray-100 hover:border-fassi-blue/20 shadow-sm hover:shadow-lg transition-all duration-300 group text-center">
      <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform">
        {Icon && <Icon size={24} className="text-blue-950" />}
      </div>
      <h3 className="font-display font-bold text-blue-950 text-lg mb-2">{v.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{v.description}</p>
    </div>
  )
}

// ——— Main Home Page ———
export default function Home() {
  useScrollReveal()
  usePageReady()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef(null)

  // Auto slide
  useEffect(() => {
    const t = setInterval(() => setCurrentSlide(s => (s + 1) % heroSlides.length), 5000)
    return () => clearInterval(t)
  }, [])

  // Stats observer
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setStatsVisible(true)
    }, { threshold: 0.3 })
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  const slide = heroSlides[currentSlide]

  return (
    <div className="min-h-screen">

      {/* ——— HERO ——— */}
      <section className="relative min-h-[88vh] md:min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{
            backgroundImage: slide.image ? `url(${slide.image})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#0D1E3A',
          }}
        />
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg} transition-all duration-1000`} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/25 to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid lg:grid-cols-2 gap-10 items-center">
          {/* Left content */}
          <div className="text-white text-center lg:text-left" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.55)' }}>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 text-xs sm:text-sm mb-5 border border-white/20">
              {/* <span className="w-2 h-2 rounded-full bg-fassi-gold animate-pulse flex-shrink-0" /> */}
              {slide.accent}
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-5 whitespace-pre-line">
              {slide.headline}
            </h1>
            <p className="text-white/85 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              {slide.sub}
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Link to={slide.ctaLink} className="btn-red flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base shadow-">
                {slide.cta}
                <ArrowRight size={16} />
              </Link>
              <Link to="/a-propos" className="flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all">
                {/* <Play size={14} className="fill-white" /> */}
                Qui sommes-nous ?
              </Link>
            </div>
          </div>

          {/* Right - product showcase */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="float-anim">
              <div className="relative w-72 h-72">
                {/* Main product circle */}
                <div
                  className="w-72 h-72 rounded-full border-4 border-white/30 shadow-2xl"
                  style={{
                    backgroundImage: 'url(/images/header.jpeg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
                {/* Orbiting product badges */}
                {['15g', '100g', '350g', '1kg'].map((w, i) => {
                  const angle = (i / 4) * 2 * Math.PI - Math.PI / 4
                  const x = Math.cos(angle) * 145
                  const y = Math.sin(angle) * 145
                  return (
                    <div
                      key={w}
                      className="absolute w-14 h-14 rounded-full bg-white/90 shadow-lg flex items-center justify-center"
                      style={{ left: `calc(50% + ${x}px - 28px)`, top: `calc(50% + ${y}px - 28px)` }}
                    >
                      <span className="text-fassi-blue font-bold text-xs">{w}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`transition-all duration-300 rounded-full ${
                i === currentSlide ? 'w-8 h-3 bg-white' : 'w-3 h-3 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-[-6px] left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L1440 80L1440 30C1200 70 960 10 720 40C480 70 240 10 0 40L0 80Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ——— STATS ——— */}
      <section className="bg-white" ref={statsRef}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {stats.map((s, i) => (
              <StatCard key={i} {...s} visible={statsVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* ——— ABOUT STRIP ——— */}
      <section className="py-20 bg-fassi-light">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="reveal text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-fassi-blue/10 text-fassi-blue text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              A Propos de FASSI
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-fassi-dark leading-snug mb-6">
              Leader de la lessive au<br />
              <span className="text-red-600">Burkina Faso</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              Le Complexe Industriel de Détergent FASSI est une entreprise de production et de commercialisation spécialisée dans la fabrication de produits de nettoyage de haute qualité pour les particuliers et les professionnels.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Notre objectif principal est de fournir des produits efficaces, respectueux de l'environnement et abordables. Nous utilisons des formules innovantes et des ingrédients soigneusement sélectionnés pour garantir des résultats optimaux.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link to="/presentation" className="btn-primary px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
                En savoir plus <ArrowRight size={15} />
              </Link>
              <Link to="/contact" className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 border-fassi-blue text-fassi-blue hover:bg-fassi-blue hover:text-white transition-colors">
                Nous contacter
              </Link>
            </div>
          </div>
          {/* Right - visual blocks */}
          <div className="reveal grid grid-cols-2 gap-4">
            {/* Colonne gauche */}
            <div className="space-y-4">
              <div className="h-40 sm:h-44 md:h-48 bg-fassi-blue rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-sm">
                <span className="text-white/50 text-[10px] font-semibold uppercase tracking-widest">Gamme</span>
                <div>
                  <div className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white leading-none mb-1">6</div>
                  <div className="text-white/75 text-xs sm:text-sm">Formats disponibles</div>
                </div>
              </div>
              <div className="h-28 sm:h-32 md:h-36 bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-6 flex flex-col justify-between">
                <span className="text-gray-400 text-[10px] font-semibold uppercase tracking-widest">Certification</span>
                <div>
                  <div className="text-2xl sm:text-3xl font-display font-black text-fassi-blue leading-none mb-1">100%</div>
                  <div className="text-gray-500 text-xs sm:text-sm">Qualité certifiée</div>
                </div>
              </div>
            </div>
            {/* Colonne droite décalée */}
            <div className="space-y-4 mt-8">
              <div className="h-28 sm:h-32 md:h-36 bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-6 flex flex-col justify-between">
                <span className="text-gray-400 text-[10px] font-semibold uppercase tracking-widest">Présence</span>
                <div>
                  <div className="text-2xl sm:text-3xl font-display font-black text-fassi-red leading-none mb-1">3+</div>
                  <div className="text-gray-500 text-xs sm:text-sm">Pays couverts</div>
                </div>
              </div>
              <div className="h-40 sm:h-44 md:h-48 bg-fassi-dark rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-sm">
                <span className="text-white/50 text-[10px] font-semibold uppercase tracking-widest">Expérience</span>
                <div>
                  <div className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white leading-none mb-1">10+</div>
                  <div className="text-white/75 text-xs sm:text-sm">Ans d'expertise</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— VALUES ——— */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14 reveal">
            <div className="section-divider" />
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-fassi-dark mb-4">Nos Valeurs</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Les principes qui guident chaque produit que nous fabriquons et chaque relation que nous construisons.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => <ValueCard key={i} v={v} />)}
          </div>
        </div>
      </section>

      {/* ——— PRODUCTS ——— */}
      <section className="py-20 bg-fassi-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-14 reveal">
            <div className="text-center md:text-left w-full md:w-auto">
              <div className="inline-flex items-center gap-2 bg-fassi-blue/10 text-fassi-blue text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-3">
                Notre Gamme
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-fassi-dark">Nos Produits</h2>
            </div>
            <Link to="/produits" className="mt-4 md:mt-0 flex items-center gap-2 text-fassi-blue font-semibold hover:text-fassi-red transition-colors group">
              Voir tous les produits
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map(p => <ProductCardPreview key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ——— NEWS ——— */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-14 reveal">
            <div className="text-center md:text-left w-full md:w-auto">
              <div className="section-divider" style={{margin: '0 auto 1rem', width: 'fit-content'}} />
              <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-fassi-dark">Actualités</h2>
              <p className="text-gray-500 mt-2">Suivez nos dernières nouvelles et événements</p>
            </div>
            <Link to="/actualites" className="mt-4 md:mt-0 flex items-center gap-2 text-fassi-blue font-semibold hover:text-fassi-red transition-colors group">
              Toutes les actualités
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(0, 3).map(a => <NewsCard key={a.id} article={a} />)}
          </div>
        </div>
      </section>

      {/* ——— CTA BAND ——— */}
      <section className="py-20 blue-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 leading-snug">
            Prêt à rejoindre le<br />réseau <span className="gold-text">FASSI</span> ?
          </h2>
          <p className="text-blue-200 text-sm sm:text-base md:text-lg mb-10 max-w-2xl mx-auto">
            Devenez distributeur ou obtenez un devis personnalisé pour vos besoins professionnels.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-red px-8 py-4 rounded-xl font-bold text-base shadow-xl flex items-center justify-center gap-2">
              <Phone size={18} />
              Contactez-nous
            </Link>
            <Link to="/telechargements" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all">
              <Download size={18} />
              Télécharger notre catalogue
            </Link>
          </div>
        </div>
      </section>

      {/* ——— PARTNERS STRIP ——— */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-10 reveal text-center">
          <h2 className="font-display font-bold text-2xl text-fassi-dark">Nos Partenaires & Institutions</h2>
          <p className="text-gray-400 text-sm mt-2">Ils nous font confiance à travers l'Afrique</p>
        </div>
        <div className="relative overflow-hidden">
          {/* Dégradé bord gauche */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          {/* Dégradé bord droit */}
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div
            className="flex gap-4"
            style={{ width: 'max-content', animation: 'marquee 35s linear infinite' }}
            onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
            onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
          >
            {[...partners, ...partners].map((p, i) => (
              <div key={i} className="flex-shrink-0 px-6 py-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-fassi-blue/30 hover:bg-blue-50 transition-all group cursor-default">
                <div className="text-gray-600 font-semibold text-sm group-hover:text-fassi-blue transition-colors whitespace-nowrap">{p.name}</div>
                <div className="text-gray-400 text-xs mt-0.5 whitespace-nowrap">{p.country}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
