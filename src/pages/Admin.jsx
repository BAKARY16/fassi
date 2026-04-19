import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Package, Newspaper, Users, Mail, Settings, LogOut,
  TrendingUp, Eye, MessageSquare, Bell, Search, Plus, Edit, Trash2,
  ChevronRight, Check, X, ArrowLeft, Globe, Shield, BarChart2,
  Download, Upload, Menu, CheckCircle, Clock, AlertCircle
} from 'lucide-react'
import { useAdmin } from '../context/useAdmin'

// ——— Login Screen ———
function AdminLogin() {
  const { login } = useAdmin()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 800))
    const result = login(form.email, form.password)
    if (!result.success) {
      setError(result.error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen blue-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <span className="font-display font-bold text-4xl text-white">F</span>
          </div>
          <h1 className="font-display font-bold text-3xl text-white">FASSI Admin</h1>
          <p className="text-blue-200 mt-2">Accès réservé aux administrateurs</p>
        </div>

        <div className="glass-card rounded-2xl p-8 shadow-2xl">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-5 flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                placeholder="admin@cidf-bf.com"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                className="form-input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mot de passe</label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({...form, password: e.target.value})}
                className="form-input"
                required
              />
            </div>
            <div className="bg-blue-50 rounded-xl p-3 text-xs text-blue-700">
              <strong>Démo:</strong> admin@cidf-bf.com / Fassi2026!
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-3"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Shield size={18} />}
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-fassi-blue hover:text-fassi-red transition-colors flex items-center justify-center gap-1">
              <ArrowLeft size={14} /> Retour au site
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// ——— Stat Widget ———
function StatWidget({ icon: Icon, label, value, change, color }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center shadow-sm`}>
          <Icon size={20} className="text-white" />
        </div>
        {change && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            change > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
          }`}>
            {change > 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
      <div className="font-display font-bold text-2xl text-fassi-dark mb-1">{value}</div>
      <div className="text-gray-500 text-sm">{label}</div>
    </div>
  )
}

// ——— Dashboard View ———
function Dashboard({ contacts, news, products }) {
  const newContacts = contacts.filter(c => c.status === 'nouveau').length
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-fassi-dark">Tableau de Bord</h1>
        <p className="text-gray-500 text-sm mt-1">Vue d'ensemble de votre plateforme FASSI</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatWidget icon={Package} label="Produits actifs" value={products.length} change={0} color="blue-gradient" />
        <StatWidget icon={Newspaper} label="Actualités" value={news.length} change={8} color="bg-fassi-red" />
        <StatWidget icon={Mail} label="Nouveaux messages" value={newContacts} change={newContacts} color="bg-fassi-gold" />
        <StatWidget icon={Eye} label="Visites ce mois" value="2,847" change={12} color="bg-purple-500" />
      </div>

      {/* Recent contacts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900">Derniers Messages</h2>
            <span className="bg-fassi-red/10 text-fassi-red text-xs font-bold px-2.5 py-1 rounded-full">{newContacts} nouveaux</span>
          </div>
          <div className="divide-y divide-gray-50">
            {contacts.slice(0, 4).map(c => (
              <div key={c.id} className="p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors">
                <div className="w-9 h-9 rounded-full blue-gradient flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">{c.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-sm text-gray-900 truncate">{c.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                      c.status === 'nouveau' ? 'bg-blue-100 text-blue-700' :
                      c.status === 'lu' ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'
                    }`}>{c.status}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{c.subject}</p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">{c.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick stats */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Performance Mensuelle</h2>
          <div className="space-y-4">
            {[
              { label: 'Visibilité Google', val: 78, color: 'bg-fassi-blue' },
              { label: 'Engagement Réseaux', val: 64, color: 'bg-fassi-red' },
              { label: 'Taux de conversion', val: 42, color: 'bg-fassi-gold' },
              { label: 'Satisfaction clients', val: 91, color: 'bg-green-500' },
            ].map(m => (
              <div key={m.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-600">{m.label}</span>
                  <span className="font-bold text-gray-900">{m.val}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${m.color} rounded-full transition-all duration-1000`} style={{ width: `${m.val}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ——— Contacts View ———
function ContactsView({ contacts, updateContactStatus }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('tous')

  const filtered = contacts.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.subject.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'tous' || c.status === filter
    return matchSearch && matchFilter
  })

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-fassi-dark">Messages & Contacts</h1>
          <p className="text-gray-500 text-sm">{contacts.filter(c => c.status === 'nouveau').length} non lus</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-fassi-blue" />
          </div>
          <div className="flex gap-2">
            {['tous', 'nouveau', 'lu', 'répondu'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${filter === f ? 'blue-gradient text-white' : 'bg-gray-100 text-gray-600 hover:bg-blue-50'}`}>{f}</button>
            ))}
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          {filtered.map(c => (
            <div key={c.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full blue-gradient flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">{c.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{c.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      c.status === 'nouveau' ? 'bg-blue-100 text-blue-700' :
                      c.status === 'lu' ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'
                    }`}>{c.status}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-700 mb-1">{c.subject}</div>
                  <p className="text-xs text-gray-500 line-clamp-1">{c.message}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-400">
                    <span>{c.email}</span>
                    {c.phone && <span>{c.phone}</span>}
                    <span>{c.date}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {c.status !== 'répondu' && (
                    <button
                      onClick={() => updateContactStatus(c.id, 'répondu')}
                      className="w-8 h-8 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors flex items-center justify-center"
                      title="Marquer comme répondu"
                    >
                      <Check size={14} />
                    </button>
                  )}
                  {c.status === 'nouveau' && (
                    <button
                      onClick={() => updateContactStatus(c.id, 'lu')}
                      className="w-8 h-8 rounded-lg bg-blue-50 text-fassi-blue hover:bg-blue-100 transition-colors flex items-center justify-center"
                      title="Marquer comme lu"
                    >
                      <Eye size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="p-12 text-center text-gray-400">
              <Mail size={32} className="mx-auto mb-3 opacity-30" />
              <p>Aucun message trouvé</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ——— News Manager ———
function NewsManager({ news, addNews, updateNews, deleteNews }) {
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', category: 'Innovation', author: '' })
  const [confirmDelete, setConfirmDelete] = useState(null)

  const handleSave = () => {
    if (!form.title || !form.excerpt) return
    if (editItem) {
      updateNews(editItem.id, form)
    } else {
      addNews(form)
    }
    setShowForm(false)
    setEditItem(null)
    setForm({ title: '', excerpt: '', content: '', category: 'Innovation', author: '' })
  }

  const startEdit = (item) => {
    setEditItem(item)
    setForm({ title: item.title, excerpt: item.excerpt, content: item.content, category: item.category, author: item.author })
    setShowForm(true)
  }

  const catColors = { Innovation: 'bg-purple-100 text-purple-700', Événement: 'bg-orange-100 text-orange-700', Développement: 'bg-green-100 text-green-700', Qualité: 'bg-blue-100 text-blue-700', Social: 'bg-pink-100 text-pink-700', Industrie: 'bg-gray-100 text-gray-700' }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-fassi-dark">Actualités</h1>
          <p className="text-gray-500 text-sm">{news.length} articles publiés</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditItem(null); setForm({ title: '', excerpt: '', content: '', category: 'Innovation', author: '' }) }}
          className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm"
        >
          <Plus size={16} /> Nouvel article
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-semibold text-gray-900">{editItem ? 'Modifier l\'article' : 'Nouvel article'}</h2>
            <button onClick={() => { setShowForm(false); setEditItem(null) }} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Titre *</label>
              <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="form-input" placeholder="Titre de l'article" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Catégorie</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="form-input">
                {['Innovation', 'Événement', 'Développement', 'Qualité', 'Social', 'Industrie'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Auteur</label>
              <input type="text" value={form.author} onChange={e => setForm({...form, author: e.target.value})} className="form-input" placeholder="Nom de l'auteur" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Résumé *</label>
              <textarea rows={2} value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} className="form-input resize-none" placeholder="Court résumé de l'article..." />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Contenu</label>
              <textarea rows={4} value={form.content} onChange={e => setForm({...form, content: e.target.value})} className="form-input resize-none" placeholder="Contenu complet de l'article..." />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm">
              <Check size={15} /> {editItem ? 'Enregistrer' : 'Publier'}
            </button>
            <button onClick={() => { setShowForm(false); setEditItem(null) }} className="px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-fassi-blue transition-colors">
              Annuler
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-50">
          {news.map(article => (
            <div key={article.id} className="p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold ${catColors[article.category] || 'bg-blue-100 text-blue-700'}`}>
                {article.category[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">{article.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${catColors[article.category]}`}>{article.category}</span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-1">{article.excerpt}</p>
                <p className="text-xs text-gray-400 mt-1">{article.date} · {article.author}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => startEdit(article)} className="w-8 h-8 rounded-lg bg-blue-50 text-fassi-blue hover:bg-blue-100 flex items-center justify-center transition-colors">
                  <Edit size={14} />
                </button>
                {confirmDelete === article.id ? (
                  <div className="flex gap-1">
                    <button onClick={() => { deleteNews(article.id); setConfirmDelete(null) }} className="w-8 h-8 rounded-lg bg-red-500 text-white flex items-center justify-center">
                      <Check size={14} />
                    </button>
                    <button onClick={() => setConfirmDelete(null)} className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmDelete(article.id)} className="w-8 h-8 rounded-lg bg-red-50 text-fassi-red hover:bg-red-100 flex items-center justify-center transition-colors">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ——— Settings ———
function SettingsView({ settings, setSiteSettings, adminUser, logout }) {
  const [form, setForm] = useState(settings)
  const [saved, setSaved] = useState(false)

  const save = () => {
    setSiteSettings(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-fassi-dark mb-8">Paramètres du Site</h1>
      
      {/* Admin profile */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users size={18} className="text-fassi-blue" /> Profil Administrateur
        </h2>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full blue-gradient flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xl">{adminUser?.name?.[0] || 'A'}</span>
          </div>
          <div>
            <div className="font-semibold text-gray-900">{adminUser?.name}</div>
            <div className="text-sm text-gray-500">{adminUser?.email}</div>
            <div className="text-xs bg-fassi-blue/10 text-fassi-blue px-2 py-0.5 rounded-full mt-1 inline-block font-semibold">{adminUser?.role}</div>
          </div>
        </div>
      </div>

      {/* Site settings */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-5 flex items-center gap-2">
          <Globe size={18} className="text-fassi-blue" /> Configuration Générale
        </h2>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Titre du héros</label>
            <input type="text" value={form.heroTitle} onChange={e => setForm({...form, heroTitle: e.target.value})} className="form-input" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Sous-titre du héros</label>
            <textarea rows={2} value={form.heroSubtitle} onChange={e => setForm({...form, heroSubtitle: e.target.value})} className="form-input resize-none" />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <div className="font-semibold text-sm text-gray-900">Mode maintenance</div>
              <div className="text-xs text-gray-500">Affiche une page de maintenance aux visiteurs</div>
            </div>
            <button
              onClick={() => setForm({...form, maintenance: !form.maintenance})}
              className={`w-12 h-6 rounded-full transition-all duration-300 relative ${form.maintenance ? 'bg-fassi-red' : 'bg-gray-200'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-all duration-300 ${form.maintenance ? 'left-6.5' : 'left-0.5'}`} style={{ left: form.maintenance ? '26px' : '2px' }} />
            </button>
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={save} className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm">
            {saved ? <><CheckCircle size={15} /> Enregistré !</> : <><Check size={15} /> Enregistrer</>}
          </button>
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
        <h2 className="font-semibold text-fassi-red mb-4 flex items-center gap-2">
          <AlertCircle size={18} /> Zone Danger
        </h2>
        <button
          onClick={logout}
          className="btn-red flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm"
        >
          <LogOut size={15} /> Se déconnecter
        </button>
      </div>
    </div>
  )
}

// ——— Main Admin Component ———
export default function Admin() {
  const { isAuthenticated, adminUser, logout, contacts, updateContactStatus, news, addNews, updateNews, deleteNews, products, siteSettings, setSiteSettings } = useAdmin()
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!isAuthenticated) return <AdminLogin />

  const navItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'contacts', label: 'Messages', icon: Mail, badge: contacts.filter(c => c.status === 'nouveau').length },
    { id: 'news', label: 'Actualités', icon: Newspaper },
    { id: 'products', label: 'Produits', icon: Package },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return <Dashboard contacts={contacts} news={news} products={products} />
      case 'contacts': return <ContactsView contacts={contacts} updateContactStatus={updateContactStatus} />
      case 'news': return <NewsManager news={news} addNews={addNews} updateNews={updateNews} deleteNews={deleteNews} />
      case 'products': return (
        <div>
          <h1 className="font-display font-bold text-2xl text-fassi-dark mb-6">Gestion des Produits</h1>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {products.map(p => (
              <div key={p.id} className="p-4 border-b border-gray-50 last:border-0 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 blue-gradient rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">F</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{p.name}</div>
                  <div className="text-sm text-gray-500">{p.weight} · {p.price}</div>
                </div>
                {p.badge && <span className="bg-fassi-red/10 text-fassi-red text-xs font-bold px-2 py-0.5 rounded-full">{p.badge}</span>}
                <button className="w-8 h-8 rounded-lg bg-blue-50 text-fassi-blue hover:bg-blue-100 flex items-center justify-center transition-colors">
                  <Edit size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )
      case 'settings': return <SettingsView settings={siteSettings} setSiteSettings={setSiteSettings} adminUser={adminUser} logout={logout} />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`admin-sidebar w-64 flex-shrink-0 fixed lg:static inset-y-0 left-0 z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col`}>
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <span className="font-display font-bold text-white text-lg">F</span>
            </div>
            <div>
              <div className="font-display font-bold text-white text-base">FASSI Admin</div>
              <div className="text-blue-300 text-xs">Panneau de gestion</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                activeSection === item.id
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-blue-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon size={18} className={activeSection === item.id ? 'text-fassi-gold' : ''} />
              <span>{item.label}</span>
              {item.badge > 0 && (
                <span className="ml-auto bg-fassi-red text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User footer */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-sm">{adminUser?.name?.[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-semibold truncate">{adminUser?.name}</div>
              <div className="text-blue-300 text-xs truncate">{adminUser?.role}</div>
            </div>
            <button onClick={logout} className="text-blue-300 hover:text-white transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <Menu size={20} />
            </button>
            <div>
              <span className="text-gray-400 text-sm">FASSI Admin</span>
              <span className="text-gray-300 mx-2">/</span>
              <span className="text-gray-900 font-semibold text-sm capitalize">{activeSection}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-fassi-blue transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
              <ArrowLeft size={13} /> Voir le site
            </Link>
            <div className="relative">
              <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
                <Bell size={18} />
                {contacts.filter(c => c.status === 'nouveau').length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-fassi-red rounded-full" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
