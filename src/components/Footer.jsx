import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube, MessageCircle, ArrowRight, ChevronRight } from 'lucide-react'
import { siteConfig } from '../data/siteData'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-fassi-dark text-white">

      {/* Newsletter */}
      <div className="bg-fassi-blue py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-shrink-0">
            <h3 className="font-display font-bold text-lg sm:text-xl text-white">Restez informé</h3>
            <p className="text-blue-200 text-xs sm:text-sm mt-1">Recevez nos actualités et offres exclusives.</p>
          </div>
          <form
            className="flex w-full sm:w-auto gap-2"
            onSubmit={e => { e.preventDefault(); alert('Merci pour votre inscription !') }}
          >
            <input
              type="email"
              placeholder="Votre adresse email"
              required
              className="form-input flex-1 sm:w-64 bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-white text-sm"
            />
            <button type="submit" className="btn-red px-4 py-2.5 rounded-xl font-semibold flex items-center gap-1.5 text-sm whitespace-nowrap flex-shrink-0">
              S'inscrire <ArrowRight size={13} />
            </button>
          </form>
        </div>
      </div>

      {/* Main grid:
          mobile  : Brand (pleine largeur) -> [Nav | Produits] 2 col -> Contact (pleine largeur)
          desktop : 4 colonnes égales
      */}
      <div className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">

          {/* Brand — pleine largeur sur mobile */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
                {/* <span className="text-white font-display font-bold text-base sm:text-lg">F</span> */}
                <img src="/logo.png" alt="Logo FASSI" className="w-8 sm:w-7" />
              </div>
              <div>
                <div className="font-display font-bold text-white text-lg sm:text-xl leading-tight">FASSI</div>
                <div className="text-[10px] text-blue-300 uppercase tracking-widest">CIDF Burkina Faso</div>
              </div>
            </Link>
            <p className="text-blue-200 text-xs sm:text-sm leading-relaxed mb-5 max-w-sm">
              Le Complexe Industriel de Détergent FASSI (CIDF) est un leader dans la fabrication de produits de nettoyage de haute qualité au Burkina Faso.
            </p>
            <div className="flex items-center gap-2 sm:gap-3">
              {[
                { href: siteConfig.social.facebook,  Icon: Facebook,      hover: 'hover:bg-blue-600'  },
                { href: siteConfig.social.instagram, Icon: Instagram,     hover: 'hover:bg-pink-600'  },
                { href: siteConfig.social.twitter,   Icon: Twitter,       hover: 'hover:bg-sky-500'   },
                { href: siteConfig.social.whatsapp,  Icon: MessageCircle, hover: 'hover:bg-green-600' },
                { href: siteConfig.social.youtube,   Icon: Youtube,       hover: 'hover:bg-red-600'   },
              ].map(({ href, Icon, hover }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/10 flex items-center justify-center ${hover} transition-colors`}>
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation — demi-largeur sur mobile */}
          <div className="col-span-1">
            <h4 className="font-display font-bold text-white text-sm sm:text-base mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[
                ['Accueil', '/'],
                ['Présentation', '/presentation'],
                ['Nos Produits', '/produits'],
                ['Actualités', '/actualites'],
                ['Galerie', '/galerie'],
                ['Partenaires', '/partenaires'],
                ['A Propos', '/a-propos'],
                ['Contact', '/contact'],
              ].map(([label, path]) => (
                <li key={path}>
                  <Link to={path} className="flex items-center gap-1.5 text-blue-200 hover:text-fassi-gold transition-colors text-xs sm:text-sm group">
                    <ChevronRight size={11} className="group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Produits — demi-largeur sur mobile */}
          <div className="col-span-1">
            <h4 className="font-display font-bold text-white text-sm sm:text-base mb-4">Nos Produits</h4>
            <ul className="space-y-2">
              {['Fassi 15g', 'Fassi 30g', 'Fassi 100g', 'Fassi 350g', 'Fassi 500g', 'Fassi 1000g'].map(p => (
                <li key={p}>
                  <Link to="/produits" className="flex items-center gap-1.5 text-blue-200 hover:text-fassi-gold transition-colors text-xs sm:text-sm group">
                    <ChevronRight size={11} className="group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <h4 className="font-display font-bold text-white text-sm sm:text-base mb-2.5">Téléchargements</h4>
              <Link to="/telechargements" className="inline-flex items-center gap-1.5 text-fassi-gold hover:text-yellow-300 transition-colors text-xs sm:text-sm">
                <ArrowRight size={12} />
                Catalogue &amp; Brochures
              </Link>
            </div>
          </div>

          {/* Contact — pleine largeur sur mobile, 1 col sur desktop */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="font-display font-bold text-white text-sm sm:text-base mb-4">Contact</h4>
            {/*
              mobile/tablette (col-span-2 = pleine largeur) :
                ligne 1 : Adresse          (col-span-2, texte long)
                ligne 2 : Téléphones | Email  (1 col chacun)
                ligne 3 : Horaires         (col-span-2, texte long)
              desktop (col-span-1, colonne étroite) :
                tout en 1 colonne
            */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-3">

              {/* Adresse — pleine largeur hors desktop */}
              <div className="col-span-2 lg:col-span-1 flex gap-2.5 items-start">
                <MapPin size={14} className="text-fassi-gold flex-shrink-0 mt-0.5" />
                <span className="text-blue-200 text-xs sm:text-sm leading-relaxed">{siteConfig.address}</span>
              </div>

              {/* Téléphones — demi-largeur mobile/tablette */}
              <div className="space-y-2">
                {siteConfig.phone.map(p => (
                  <div key={p} className="flex gap-2 items-center">
                    <Phone size={14} className="text-fassi-gold flex-shrink-0" />
                    <a href={`tel:${p}`} className="text-blue-200 hover:text-white transition-colors text-xs sm:text-sm">{p}</a>
                  </div>
                ))}
              </div>

              {/* Email — demi-largeur mobile/tablette */}
              <div className="flex gap-2 items-start">
                <Mail size={14} className="text-fassi-gold flex-shrink-0 mt-0.5" />
                <a href={`mailto:${siteConfig.email}`} className="text-blue-200 hover:text-white transition-colors text-xs sm:text-sm break-all">{siteConfig.email}</a>
              </div>

              {/* Horaires — pleine largeur hors desktop */}
              <div className="col-span-2 lg:col-span-1 flex gap-2 items-center">
                <Clock size={14} className="text-fassi-gold flex-shrink-0" />
                <span className="text-blue-200 text-xs sm:text-sm">{siteConfig.hours}</span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-blue-300">
          <p className="text-center sm:text-left">© {year} FASSI CIDF — Tous droits réservés.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            <span className="opacity-40 hidden sm:inline">|</span>
            <Link to="/politique-confidentialite" className="hover:text-white transition-colors">Confidentialité</Link>
            <span className="opacity-40 hidden sm:inline">|</span>
            <Link to="/admin" className="hover:text-fassi-gold transition-colors">Admin</Link>
          </div>
        </div>
      </div>

    </footer>
  )
}
