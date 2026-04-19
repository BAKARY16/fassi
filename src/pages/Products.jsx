import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Package, Star, Check, ArrowRight, X, ChevronRight, Scale, Thermometer, Droplets } from 'lucide-react'
import { products } from '../data/siteData'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { usePageReady } from '../hooks/usePageReady'

function PageBanner({ title, subtitle, image }) {
  return (
    <div className="blue-gradient py-10 sm:py-14 md:py-20 relative overflow-hidden">
      {image && (
        <div
          className="absolute inset-0"
          style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
      )}
      <div className="absolute inset-0 bg-fassi-blue/70" />
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4">
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

export default function Products() {
  useScrollReveal()
  usePageReady()
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('Tous')

  const filters = ['Tous', 'Particulier', 'Familial', 'Professionnel']
  const categoryMap = {
    1: 'Particulier', 2: 'Particulier', 3: 'Familial',
    4: 'Familial', 5: 'Professionnel', 6: 'Professionnel'
  }

  const filtered = products.filter(p => filter === 'Tous' || categoryMap[p.id] === filter)

  const colorGradients = {
    '#1A3A6B': 'from-[#1A3A6B] to-[#2355A0]',
    '#2355A0': 'from-[#2355A0] to-[#3570C8]',
    '#CC1F1F': 'from-[#CC1F1F] to-[#e63333]',
    '#D4A017': 'from-[#D4A017] to-[#F0C842]',
    '#0D1E3A': 'from-[#0D1E3A] to-[#1A3A6B]',
  }

  return (
    <div>
      <PageBanner
        title="Nos Produits"
        subtitle="Une gamme complète de 6 formats pour répondre à tous vos besoins, des particuliers aux professionnels."
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr3ENNrlhbjVLweHI-IdGRs5a25OtVOqZXaw&s"
      />

      <section className="py-16 bg-fassi-light">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center reveal">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  filter === f
                    ? 'blue-gradient text-white shadow-lg shadow-blue-900/20'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-fassi-blue hover:text-fassi-blue'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className="reveal bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer"
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => setSelected(product)}
              >
                <div className={`relative bg-gradient-to-br ${colorGradients[product.color] || 'from-fassi-blue to-blue-600'} overflow-hidden`} style={{ paddingTop: '75%' }}>
                  {product.badge && (
                    <span className="absolute top-4 right-4 z-10 bg-white text-fassi-blue text-xs font-bold px-3 py-1 rounded-full shadow">
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
                      <div className="float-anim w-28 h-36 bg-white/20 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center shadow-2xl group-hover:scale-105 transition-transform">
                        <span className="font-display font-bold text-white text-3xl">F</span>
                        <span className="text-white/80 text-sm font-bold mt-1">{product.weight}</span>
                        <span className="text-white/60 text-xs mt-0.5">FASSI</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-fassi-blue font-bold uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full">{categoryMap[product.id]}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />)}
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-xl text-gray-900 mb-2 group-hover:text-fassi-blue transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {product.features.map(f => (
                      <span key={f} className="flex items-center gap-1 bg-blue-50 text-fassi-blue text-xs px-2 py-1 rounded-full">
                        <Check size={10} /> {f}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="font-bold text-fassi-blue">{product.price}</span>
                    <button className="flex items-center gap-1 text-fassi-red text-sm font-semibold hover:gap-2 transition-all">
                      Voir détails <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(13,30,58,0.55)' }}
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
            style={{ maxHeight: '90vh' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header image */}
            <div className={`relative h-52 bg-gradient-to-br ${colorGradients[selected.color] || 'from-fassi-blue to-blue-600'} overflow-hidden flex-shrink-0`}>
              {selected.image ? (
                <img src={selected.image} alt={selected.name} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-28 h-36 bg-white/20 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center shadow-2xl">
                    <span className="font-display font-bold text-white text-4xl">F</span>
                    <span className="text-white/80 text-base font-bold mt-1">{selected.weight}</span>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-colors z-10"
              >
                <X size={16} />
              </button>
              {selected.badge && (
                <span className="absolute top-3 left-3 bg-fassi-red text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  {selected.badge}
                </span>
              )}
              <div className="absolute bottom-4 left-5 z-10">
                <h2 className="font-display font-bold text-2xl text-white leading-tight">{selected.name}</h2>
                <span className="text-white/70 text-sm">{selected.category} · {selected.weight}</span>
              </div>
            </div>

            {/* Body scrollable */}
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 208px)' }}>
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{selected.description}</p>

                {/* Infos grid */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { label: 'Poids',        value: selected.weight   },
                    { label: 'Usage',        value: selected.usage    },
                    { label: 'Prix indicatif', value: selected.price  },
                    { label: 'Catégorie',    value: selected.category },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-gray-50 rounded-xl p-3">
                      <div className="text-xs text-gray-400 mb-0.5">{label}</div>
                      <div className="font-bold text-fassi-blue text-sm">{value}</div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selected.features.map(f => (
                    <span key={f} className="flex items-center gap-1 bg-blue-50 text-fassi-blue text-xs px-2.5 py-1.5 rounded-full font-medium">
                      <Check size={11} /> {f}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Link
                    to="/contact"
                    className="btn-primary flex-1 py-3 rounded-xl font-semibold text-center text-sm"
                    onClick={() => setSelected(null)}
                  >
                    Commander / Devis
                  </Link>
                  <button
                    onClick={() => setSelected(null)}
                    className="px-5 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-fassi-blue hover:text-fassi-blue transition-colors"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Usage guide */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <div className="section-divider" />
            <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-fassi-dark mb-3">Guide d'utilisation</h2>
            <p className="text-gray-500">Comment utiliser nos produits pour des résultats optimaux</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Dosage adapté', desc: 'Utilisez la quantité recommandée selon le volume de linge et le niveau de salissures.', Icon: Scale },
              { step: '02', title: 'Température idéale', desc: "Eau tiède à froide pour préserver les couleurs et économiser l'énergie.", Icon: Thermometer },
              { step: '03', title: 'Rinçage complet', desc: 'Bien rincer le linge pour éliminer tous les résidus de détergent.', Icon: Droplets },
            ].map((g, i) => (
              <div key={i} className="reveal text-center p-8 rounded-2xl bg-fassi-light border border-gray-100">
                <div className="w-14 h-14 rounded-xl bg-fassi-blue/10 flex items-center justify-center mx-auto mb-4">
                  <g.Icon size={24} className="text-fassi-blue" />
                </div>
                <div className="text-6xl font-display font-bold text-fassi-blue/10 mb-2">{g.step}</div>
                <h3 className="font-display font-bold text-xl text-fassi-dark mb-3">{g.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
