import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Facebook, Instagram, Twitter, MessageCircle, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { siteConfig, faqs } from '../data/siteData'
import { useAdmin } from '../context/useAdmin'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { usePageReady } from '../hooks/usePageReady'

function PageBanner({ title, subtitle }) {
  return (
    <div className="blue-gradient py-10 sm:py-14 md:py-20 relative overflow-hidden">
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

export default function Contact() {
  useScrollReveal()
  usePageReady()
  const { addContact } = useAdmin()
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', type: 'général', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Nom requis'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Email invalide'
    if (!form.subject.trim()) e.subject = 'Sujet requis'
    if (!form.message.trim() || form.message.length < 10) e.message = 'Message trop court (min. 10 caractères)'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200)) // simulate API
    addContact(form)
    setLoading(false)
    setSent(true)
  }

  return (
    <div>
      <PageBanner
        title="Contactez-nous"
        subtitle="Notre équipe est disponible pour répondre à toutes vos questions, commandes et demandes de partenariat."
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-12">
          
          {/* Contact info */}
          <div className="space-y-6">
            <div className="reveal">
              <h2 className="font-display font-bold text-2xl text-fassi-dark mb-6">Nos Coordonnées</h2>
              <div className="space-y-5">
                {[
                  { icon: MapPin, label: 'Adresse', value: siteConfig.address, color: 'text-fassi-red' },
                  { icon: Clock, label: 'Horaires', value: siteConfig.hours, color: 'text-fassi-gold' },
                  { icon: Mail, label: 'Email', value: siteConfig.email, color: 'text-fassi-blue', link: `mailto:${siteConfig.email}` },
                ].map(({ icon: Icon, label, value, color, link }) => (
                  <div key={label} className="flex gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 ${color}`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-medium mb-0.5">{label}</div>
                      {link
                        ? <a href={link} className={`text-sm font-semibold ${color} hover:opacity-80 transition-opacity`}>{value}</a>
                        : <div className="text-sm text-gray-700">{value}</div>
                      }
                    </div>
                  </div>
                ))}
                {siteConfig.phone.map((p, i) => (
                  <div key={p} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 text-fassi-blue">
                      <Phone size={18} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-medium mb-0.5">Téléphone {i + 1}</div>
                      <a href={`tel:${p}`} className="text-sm font-semibold text-fassi-blue hover:text-fassi-red transition-colors">{p}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="reveal bg-fassi-light rounded-2xl p-6">
              <h3 className="font-display font-bold text-lg text-fassi-dark mb-4">Réseaux Sociaux</h3>
              <div className="space-y-3">
                {[
                  { icon: Facebook, label: 'Facebook', url: siteConfig.social.facebook, color: 'text-blue-600 bg-blue-50' },
                  { icon: Instagram, label: 'Instagram', url: siteConfig.social.instagram, color: 'text-pink-600 bg-pink-50' },
                  { icon: Twitter, label: 'Twitter', url: siteConfig.social.twitter, color: 'text-sky-500 bg-sky-50' },
                  { icon: MessageCircle, label: 'WhatsApp', url: siteConfig.social.whatsapp, color: 'text-green-600 bg-green-50' },
                ].map(({ icon: Icon, label, url, color }) => (
                  <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 group hover:translate-x-1 transition-transform">
                    <div className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center`}>
                      <Icon size={16} />
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-fassi-blue transition-colors">{label}</span>
                    <ChevronRight size={14} className="text-gray-400 ml-auto" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="reveal bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-green-500" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-fassi-dark mb-3">Message envoyé !</h3>
                  <p className="text-gray-500 mb-6">Merci pour votre message. Notre équipe vous répondra dans les 24 à 48 heures.</p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', type: 'général', message: '' }) }}
                    className="btn-primary px-6 py-3 rounded-xl font-semibold"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-display font-bold text-2xl text-fassi-dark mb-6">Envoyez-nous un message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nom complet *</label>
                        <input
                          type="text"
                          placeholder="Votre nom"
                          value={form.name}
                          onChange={e => setForm({...form, name: e.target.value})}
                          className={`form-input ${errors.name ? 'border-red-400' : ''}`}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
                        <input
                          type="email"
                          placeholder="votre@email.com"
                          value={form.email}
                          onChange={e => setForm({...form, email: e.target.value})}
                          className={`form-input ${errors.email ? 'border-red-400' : ''}`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Téléphone</label>
                        <input
                          type="tel"
                          placeholder="+226 XX XX XX XX"
                          value={form.phone}
                          onChange={e => setForm({...form, phone: e.target.value})}
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Type de demande</label>
                        <select
                          value={form.type}
                          onChange={e => setForm({...form, type: e.target.value})}
                          className="form-input"
                        >
                          <option value="général">Renseignement général</option>
                          <option value="commande">Commande / Devis</option>
                          <option value="partenariat">Partenariat / Distribution</option>
                          <option value="réclamation">Réclamation</option>
                          <option value="autre">Autre</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Sujet *</label>
                      <input
                        type="text"
                        placeholder="Objet de votre message"
                        value={form.subject}
                        onChange={e => setForm({...form, subject: e.target.value})}
                        className={`form-input ${errors.subject ? 'border-red-400' : ''}`}
                      />
                      {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message *</label>
                      <textarea
                        rows={5}
                        placeholder="Décrivez votre demande en détail..."
                        value={form.message}
                        onChange={e => setForm({...form, message: e.target.value})}
                        className={`form-input resize-none ${errors.message ? 'border-red-400' : ''}`}
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Envoyer le message
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-96">
            <iframe
              title="FASSI CIDF Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3897.5!2d-1.5332!3d12.3647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDIxJzUyLjkiTiAxwrAzMicwMC41Ilc!5e0!3m2!1sfr!2sbf!4v1000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-fassi-light">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <div className="section-divider" />
            <h2 className="font-display font-bold text-3xl text-fassi-dark mb-3">Questions Fréquentes</h2>
            <p className="text-gray-500">Retrouvez les réponses aux questions les plus posées</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="reveal bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-gray-800 pr-4">{faq.question}</span>
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-fassi-blue/10 flex items-center justify-center transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>
                    <ChevronRight size={12} className="text-fassi-blue rotate-90" />
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
