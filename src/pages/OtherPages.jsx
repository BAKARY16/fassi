import { useState } from 'react'
import { Link } from 'react-router-dom'
import { X, ChevronLeft, ChevronRight, Filter, Download, FileText, Calendar, Tag, User, Clock, ArrowRight, Globe, Award, Handshake, Factory, Truck, Microscope, BookOpen, Shield, Leaf, Heart, Zap, Check } from 'lucide-react'
import { news, galleryImages, partners, downloads, team, values } from '../data/siteData'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { usePageReady } from '../hooks/usePageReady'

// ——— Shared Banner ———
function PageBanner({ title, subtitle, image }) {
  return (
    <div className="blue-gradient min-h-[220px] sm:min-h-[300px] py-10 sm:py-14 md:py-20 relative overflow-hidden flex items-center">
      {image && (
        <img
          src={image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
      )}
      <div className="absolute inset-0 bg-fassi-blue/70" />
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 text-blue-300 text-sm mb-4">
          <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
          <ChevronRight size={14} />
          <span className="text-white">{title}</span>
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4">{title}</h1>
        {subtitle && <p className="text-blue-200 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl">{subtitle}</p>}
      </div>
    </div>
  )
}

// ——— GALLERY PAGE ———
export function Gallery() {
  useScrollReveal()
  usePageReady()
  const [lightbox, setLightbox] = useState(null)
  const [activeFilter, setActiveFilter] = useState('Tous')

  const categories = ['Tous', ...new Set(galleryImages.map(g => g.category))]
  const filtered = activeFilter === 'Tous' ? galleryImages : galleryImages.filter(g => g.category === activeFilter)

  const bgColors = [
    'from-fassi-blue/20 to-fassi-blue/5',
    'from-fassi-red/20 to-fassi-red/5',
    'from-fassi-gold/30 to-fassi-gold/10',
    'from-purple-500/20 to-purple-500/5',
    'from-green-500/20 to-green-500/5',
    'from-orange-500/20 to-orange-500/5',
    'from-teal-500/20 to-teal-500/5',
    'from-pink-500/20 to-pink-500/5',
    'from-indigo-500/20 to-indigo-500/5',
  ]

  return (
    <div>
      <PageBanner
        title="Galerie"
        subtitle="Découvrez FASSI en images : notre usine, nos produits et nos équipes."
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlgIZkWJgyrVBrYatBXp_6cqRYL7o2OjgWpw&s"
      />
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-10 justify-center reveal">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeFilter === cat ? 'blue-gradient text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-fassi-blue'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((img, i) => (
              <div
                key={img.id}
                className={`reveal relative group cursor-pointer rounded-xl overflow-hidden bg-gradient-to-br ${bgColors[i % bgColors.length]} aspect-square flex items-center justify-center border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]`}
                onClick={() => setLightbox(i)}
              >
                {img.src ? (
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4">
                    <div className="text-3xl mb-2 opacity-20 font-display font-bold text-fassi-blue select-none">
                      {img.category[0]}
                    </div>
                    <p className="text-gray-500 text-xs font-medium">{img.alt}</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-fassi-blue/0 group-hover:bg-fassi-blue/10 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full px-4 py-2 text-xs font-bold text-fassi-blue shadow-lg">
                    Voir
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                  <p className="text-white text-xs font-semibold truncate">{img.alt}</p>
                  <p className="text-white/70 text-[10px]">{img.category}</p>
                </div>
                <div className="absolute top-2 right-2 bg-white/90 text-fassi-blue text-xs font-bold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  {img.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 lightbox-overlay flex items-center justify-center p-4">
          <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white">
            <X size={20} />
          </button>
          <button
            onClick={() => setLightbox((lightbox - 1 + filtered.length) % filtered.length)}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="max-w-2xl w-full">
            <div className={`aspect-square bg-gradient-to-br ${bgColors[lightbox % bgColors.length]} rounded-2xl overflow-hidden flex items-center justify-center relative`}>
              {filtered[lightbox]?.src ? (
                <img
                  src={filtered[lightbox].src}
                  alt={filtered[lightbox].alt}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              ) : (
                <div className="text-center text-white">
                  <div className="text-6xl font-display font-bold opacity-30">{filtered[lightbox]?.category[0]}</div>
                  <p className="text-lg font-semibold opacity-80 mt-4">{filtered[lightbox]?.alt}</p>
                </div>
              )}
            </div>
            <div className="text-center mt-3">
              <p className="text-white font-semibold text-sm">{filtered[lightbox]?.alt}</p>
              <p className="text-white/50 text-xs mt-0.5">{filtered[lightbox]?.category} · {lightbox + 1} / {filtered.length}</p>
            </div>
          </div>
          <button
            onClick={() => setLightbox((lightbox + 1) % filtered.length)}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  )
}

// ——— NEWS PAGE ———
const catColors = {
  Innovation: 'bg-purple-100 text-purple-700',
  Événement: 'bg-orange-100 text-orange-700',
  Développement: 'bg-green-100 text-green-700',
  Qualité: 'bg-blue-100 text-blue-700',
  Social: 'bg-pink-100 text-pink-700',
  Industrie: 'bg-gray-100 text-gray-700',
}

export function News() {
  useScrollReveal()
  usePageReady()
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('Tous')
  
  const categories = ['Tous', ...new Set(news.map(n => n.category))]
  const filtered = filter === 'Tous' ? news : news.filter(n => n.category === filter)

  return (
    <div>
      <PageBanner
        title="Actualités"
        subtitle="Les dernières nouvelles, événements et innovations de FASSI CIDF."
        image="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80"
      />
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 mb-10 justify-center reveal">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  filter === cat ? 'blue-gradient text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-fassi-blue'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((article, i) => (
              <article
                key={article.id}
                className="reveal bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => setSelected(article)}
              >
                <div className="h-48 bg-gradient-to-br from-fassi-blue/10 to-fassi-blue/5 flex items-center justify-center relative overflow-hidden">
                  {article.image ? (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="text-6xl opacity-10 font-display font-bold text-fassi-blue">{article.category[0]}</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full ${catColors[article.category] || 'bg-blue-100 text-blue-700'}`}>
                    {article.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    <span className="flex items-center gap-1"><User size={11} /> {article.author}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-gray-900 mb-2 group-hover:text-fassi-blue transition-colors leading-snug">{article.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">{article.excerpt}</p>
                  <button className="flex items-center gap-1 text-fassi-red text-sm font-semibold hover:gap-2 transition-all">
                    Lire l'article <ArrowRight size={13} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Article Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 lightbox-overlay flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="h-48 bg-gradient-to-br from-fassi-blue to-blue-700 flex items-center justify-center relative overflow-hidden">
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white z-10">
                <X size={16} />
              </button>
              <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white z-10`}>
                {selected.category}
              </span>
              {selected.image ? (
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="text-6xl opacity-20 font-display font-bold text-white">{selected.category[0]}</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                <span>{new Date(selected.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                <span>•</span>
                <span>{selected.author}</span>
              </div>
              <h2 className="font-display font-bold text-2xl text-fassi-dark mb-4">{selected.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{selected.excerpt}</p>
              <p className="text-gray-500 leading-relaxed">{selected.content}</p>
              <div className="mt-8 pt-6 border-t border-gray-100 flex gap-3">
                <Link to="/contact" className="btn-primary px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 text-sm" onClick={() => setSelected(null)}>
                  Nous contacter <ArrowRight size={14} />
                </Link>
                <button onClick={() => setSelected(null)} className="px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-fassi-blue hover:text-fassi-blue transition-colors">
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ——— PARTNERS PAGE ———
export function Partners() {
  useScrollReveal()
  usePageReady()
  const types = ['Tous', ...new Set(partners.map(p => p.type))]
  const [filter, setFilter] = useState('Tous')
  const filtered = filter === 'Tous' ? partners : partners.filter(p => p.type === filter)

  return (
    <div>
      <PageBanner
        title="Partenaires"
        subtitle="FASSI s'appuie sur un réseau solide de partenaires institutionnels et commerciaux à travers l'Afrique."
        image="https://www.hirondelle.org/wp-content/uploads/2025/01/banner-partenaires-new-2.jpg"
      />
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 mb-12 justify-center reveal">
            {types.map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  filter === t ? 'blue-gradient text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-fassi-blue'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map(p => (
              <div key={p.id} className="reveal bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-fassi-blue/20 transition-all group text-center">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-fassi-blue/10 to-fassi-blue/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Handshake size={24} className="text-fassi-blue" />
                </div>
                <h3 className="font-display font-bold text-gray-900 text-base mb-1">{p.name}</h3>
                <p className="text-gray-400 text-xs mb-3">{p.country}</p>
                <span className="inline-block bg-blue-50 text-fassi-blue text-xs font-semibold px-3 py-1 rounded-full">{p.type}</span>
              </div>
            ))}
          </div>

          {/* Become partner CTA */}
          <div className="mt-16 reveal blue-gradient rounded-3xl p-10 text-center text-white">
            <Globe size={40} className="mx-auto mb-4 opacity-60" />
            <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl mb-4">Devenez Partenaire FASSI</h2>
            <p className="text-blue-200 max-w-xl mx-auto mb-8">Rejoignez notre réseau de distribution et bénéficiez de conditions préférentielles, d'un support dédié et des meilleures marges du marché.</p>
            <Link to="/contact" className="btn-red inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base">
              Soumettre ma candidature <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// ——— ABOUT PAGE ———
export function About() {
  useScrollReveal()
  usePageReady()
  return (
    <div>
      <PageBanner
        title="À Propos de FASSI"
        subtitle="Notre histoire, notre mission et les valeurs qui font de FASSI le leader de la lessive au Burkina Faso."
        image="https://cidf-bf.com/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-04-at-07.34.57-4-2.jpeg"
      />

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 bg-fassi-blue/10 text-fassi-blue text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">Notre Mission</div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-fassi-dark mb-6 leading-snug">
              Propreté, Qualité &<br /><span className="gold-text">Accessibilité</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Le Complexe Industriel de Détergent FASSI (CIDF) a été fondé avec une vision claire : rendre les produits de nettoyage de haute qualité accessibles à toutes les familles africaines, à des prix abordables.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Notre objectif principal est de fournir des produits efficaces, respectueux de l'environnement et abordables. Nous utilisons des formules innovantes et des ingrédients soigneusement sélectionnés pour garantir des résultats optimaux tout en minimisant notre impact sur la planète.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Basés à Ouagadougou, au cœur du Burkina Faso, nous rayonnons aujourd'hui sur plus de 8 pays d'Afrique de l'Ouest grâce à notre réseau de distributeurs partenaires.
            </p>
          </div>
          <div className="reveal grid grid-cols-2 gap-4">
            {[
              { n: '10+', l: "Années d'excellence", c: 'blue-gradient' },
              { n: '6', l: 'Formats de produits', c: 'bg-fassi-red' },
              { n: '3+', l: 'Pays couverts', c: 'bg-fassi-gold' },
              { n: '5000+', l: 'Clients fidèles', c: 'bg-fassi-dark' },
            ].map(({ n, l, c }) => (
              <div key={l} className={`${c} rounded-2xl p-6 text-center text-white shadow-lg`}>
                <div className="font-display font-bold text-3xl mb-1">{n}</div>
                <div className="text-xs opacity-80">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-fassi-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <div className="section-divider" />
            <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-fassi-dark mb-3">Nos Valeurs Fondamentales</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = [Shield, Leaf, Heart, Zap][i] || Shield
              return (
                <div key={i} className="reveal bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg hover:border-fassi-blue/20 transition-all group">
                  <div className="w-14 h-14 rounded-xl bg-fassi-blue/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon size={24} className="text-fassi-blue" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-fassi-dark mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <div className="section-divider" />
            <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-fassi-dark mb-3">Notre Équipe de Direction</h2>
            <p className="text-gray-500">Des professionnels passionnés au service de l'excellence FASSI</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={member.id} className="reveal bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg hover:border-fassi-blue/20 transition-all group">
                <div className="w-20 h-20 rounded-full blue-gradient flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-105 transition-transform">
                  <span className="font-display font-bold text-2xl text-white">{member.name[0]}</span>
                </div>
                <h3 className="font-display font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-fassi-blue text-sm font-semibold mb-3">{member.role}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-fassi-light">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <div className="section-divider" />
            <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-fassi-dark mb-3">Notre Parcours</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-fassi-blue via-fassi-red to-fassi-gold -translate-x-1/2" />
            {[
              { year: '2013', title: 'Fondation de FASSI', desc: 'Création du Complexe Industriel de Détergent FASSI à Ouagadougou.' },
              { year: '2015', title: 'Lancement de la gamme', desc: 'Première gamme complète de produits de 15g à 1000g sur le marché.' },
              { year: '2018', title: 'Expansion régionale', desc: 'Début de la distribution dans les pays voisins (Mali, Niger).' },
              { year: '2021', title: 'Nouvelle unité de production', desc: 'Doublement des capacités industrielles pour répondre à la demande.' },
              { year: '2024', title: 'Certification qualité', desc: 'Obtention de la certification ISO pour l\'ensemble de nos processus.' },
              { year: '2026', title: 'Vision Afrique', desc: 'Présence dans 8+ pays africains et lancement de la gamme éco-responsable.' },
            ].map((item, i) => (
              <div key={i} className={`reveal relative flex gap-8 mb-8 items-start ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className="bg-white rounded-xl p-5 inline-block shadow-sm border border-gray-100 hover:shadow-md transition-all max-w-xs">
                    <div className="text-fassi-blue font-bold text-sm mb-1">{item.year}</div>
                    <div className="font-display font-bold text-gray-900 mb-1">{item.title}</div>
                    <div className="text-gray-500 text-sm">{item.desc}</div>
                  </div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full blue-gradient border-4 border-white shadow-md z-10 top-4" />
                <div className="w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// ——— PRESENTATION PAGE ———
export function Presentation() {
  useScrollReveal()
  usePageReady()
  return (
    <div>
      <PageBanner
        title="Présentation"
        subtitle="Découvrez l'identité, la structure et l'ambition du Complexe Industriel de Détergent FASSI."
        image="https://an.bf/storage/articles/119/aPKFKLBvK5ZZOVaxc4EvkknUpSjBaeI2VlwVkzOV.jpg"
      />
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div className="reveal">
                <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-fassi-dark mb-5">Qui sommes-nous ?</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Le Complexe Industriel de Détergent FASSI (CIDF) est une entreprise de production et de commercialisation spécialisée dans la fabrication de produits de nettoyage de haute qualité pour les particuliers et les professionnels.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Nous sommes fiers de notre engagement envers la qualité et l'innovation. Chaque produit FASSI est le résultat d'années de recherche et développement, utilisant des formules exclusives adaptées aux besoins du marché africain.
                </p>
              </div>
              <div className="reveal">
                <h2 className="font-display font-bold text-2xl text-fassi-dark mb-4">Notre Activité</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: 'Production', desc: 'Fabrication de détergents selon les normes internationales dans notre usine moderne.', Icon: Factory },
                    { title: 'Distribution', desc: 'Réseau de distribution couvrant le Burkina Faso et l\'Afrique de l\'Ouest.', Icon: Truck },
                    { title: 'Recherche & Dev.', desc: 'Investissement continu dans l\'innovation et l\'amélioration des formules.', Icon: Microscope },
                    { title: 'Formation', desc: 'Programme de formation pour nos partenaires et distributeurs.', Icon: BookOpen },
                  ].map(({ title, desc, Icon }) => (
                    <div key={title} className="bg-fassi-light rounded-xl p-5">
                      <div className="w-10 h-10 rounded-lg bg-fassi-blue/10 flex items-center justify-center mb-3">
                        <Icon size={20} className="text-fassi-blue" />
                      </div>
                      <h3 className="font-semibold text-fassi-dark mb-1">{title}</h3>
                      <p className="text-gray-500 text-sm">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="reveal">
                <h2 className="font-display font-bold text-2xl text-fassi-dark mb-4">Notre Vision 2030</h2>
                <p className="text-gray-600 leading-relaxed">
                  Devenir le leader africain des produits d'entretien ménager abordables et écologiques, en couvrant 15 pays africains d'ici 2030, tout en créant des emplois locaux et en préservant l'environnement.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="reveal blue-gradient rounded-2xl p-6 text-white">
                <Award size={32} className="mb-4 opacity-70" />
                <h3 className="font-display font-bold text-xl mb-3">Certifications</h3>
                <ul className="space-y-2.5 text-blue-200 text-sm">
                  {['Normes AFNOR', 'Contrôle qualité ISO', 'Certification ONAC-BF', 'Registre du Commerce BF'].map(cert => (
                    <li key={cert} className="flex items-center gap-2">
                      <Check size={14} className="text-fassi-gold flex-shrink-0" />
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="reveal bg-fassi-light rounded-2xl p-6">
                <h3 className="font-display font-bold text-xl text-fassi-dark mb-4">Informations Légales</h3>
                <div className="space-y-3 text-sm">
                  <div><span className="text-gray-400">Forme juridique</span><br /><span className="font-semibold text-gray-700">SARL</span></div>
                  <div><span className="text-gray-400">Siège social</span><br /><span className="font-semibold text-gray-700">Ouagadougou, Burkina Faso</span></div>
                  <div><span className="text-gray-400">Secteur</span><br /><span className="font-semibold text-gray-700">Industrie chimique / Détergents</span></div>
                  <div><span className="text-gray-400">Contact</span><br /><a href="mailto:contact@cidf-bf.com" className="font-semibold text-fassi-blue hover:underline">contact@cidf-bf.com</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// ——— DOWNLOADS PAGE ———
export function Downloads() {
  useScrollReveal()
  usePageReady()
  return (
    <div>
      <PageBanner
        title="Téléchargements"
        subtitle="Téléchargez nos catalogues, fiches techniques et documents officiels."
      />
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            {downloads.map(d => (
              <div key={d.id} className="reveal bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-fassi-blue/20 transition-all flex items-center gap-5 group">
                <div className="w-14 h-14 bg-fassi-red/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-fassi-red/20 transition-colors">
                  <FileText size={24} className="text-fassi-red" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-fassi-blue transition-colors">{d.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>{d.type}</span>
                    <span>•</span>
                    <span>{d.size}</span>
                    <span>•</span>
                    <span>{new Date(d.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
                <button
                  onClick={() => alert(`Téléchargement de "${d.name}" — Fichier disponible après connexion backend.`)}
                  className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
                >
                  <Download size={15} />
                  <span className="hidden sm:inline">Télécharger</span>
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 reveal bg-fassi-light rounded-2xl p-8 text-center">
            <h3 className="font-display font-bold text-xl text-fassi-dark mb-3">Vous ne trouvez pas ce que vous cherchez ?</h3>
            <p className="text-gray-500 mb-6">Contactez notre équipe pour obtenir des documents spécifiques ou des informations personnalisées.</p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold">
              Nous contacter <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
