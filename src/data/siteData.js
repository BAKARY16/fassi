// ============================================================
// FASSI CIDF - Données du site (à remplacer par API backend)
// ============================================================

export const siteConfig = {
  name: "FASSI CIDF",
  fullName: "Complexe Industriel de Détergent FASSI",
  tagline: "La Propreté, Notre Passion",
  description: "Spécialisée dans la fabrication de produits de nettoyage de haute qualité pour les particuliers et les professionnels au Burkina Faso et en Afrique.",
  address: "9FG4+Q55, Larlé, Ouagadougou, Burkina Faso",
  phone: ["+226 67 90 00 00", "+226 25 44 44 28", "+226 58 15 15 06"],
  email: "contact@cidf-bf.com",
  mapCoords: { lat: 12.3647, lng: -1.5332 },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61551171222145",
    instagram: "https://www.instagram.com/fassiflashaction/",
    twitter: "https://twitter.com/fassiflashaction",
    whatsapp: "https://wa.me/22667900000",
    youtube: "#",
  },
  hours: "Lun - Sam: 07h30 - 17h30",
}

export const stats = [
  { number: 6, suffix: "+", label: "Gammes de Produits", icon: "Package" },
  { number: 10, suffix: "+", label: "Années d'Expérience", icon: "Award" },
  { number: 5000, suffix: "+", label: "Clients Satisfaits", icon: "Users" },
  { number: 3, suffix: "", label: "Pays Couverts", icon: "Globe" },
]

export const products = [
  // {
  //   id: 1,
  //   name: "Fassi 15g",
  //   category: "Lessive",
  //   description: "Format pocket idéal pour une utilisation ponctuelle. Puissant sur les taches du quotidien.",
  //   price: "25 FCFA",
  //   weight: "15g",
  //   image: "/images/fassi15.jpeg",
  //   badge: "Bestseller",
  //   color: "#1A3A6B",
  //   features: ["Anti-taches", "Parfum frais", "Économique"],
  //   usage: "Lessive à la main",
  // },
  // {
  //   id: 2,
  //   name: "Fassi 30g",
  //   category: "Lessive",
  //   description: "Format compact parfait pour le linge délicat. Efficacité maximale, douceur assurée.",
  //   price: "50 FCFA",
  //   weight: "30g",
  //   image: "/logo.png",
  //   badge: null,
  //   color: "#2355A0",
  //   features: ["Doux sur les fibres", "Mousse abondante", "Économique"],
  //   usage: "Lessive à la main",
  // },
  {
    id: 3,
    name: "Fassi 100g",
    category: "Lessive",
    description: "Le format familial économique. Nettoyage en profondeur pour toute la famille.",
    price: "150 FCFA",
    weight: "100g",
    image: "/images/fassi15.jpeg",
    badge: "Populaire",
    color: "#CC1F1F",
    features: ["Famille", "Nettoyage profond", "Grande fraîcheur"],
    usage: "Lessive à la main / machine",
  },
  {
    id: 4,
    name: "Fassi 350g",
    category: "Lessive",
    description: "Format semi-professionnel. Idéal pour les grandes familles et une utilisation intensive.",
    price: "450 FCFA",
    weight: "350g",
    image: "/images/fassi350.jpeg",
    badge: null,
    color: "#1A3A6B",
    features: ["Semi-pro", "Longue durée", "Haute performance"],
    usage: "Lessive à la main / machine",
  },
  {
    id: 5,
    name: "Fassi 500g",
    category: "Lessive",
    description: "Pour les grandes quantités de linge. Résultats professionnels à la maison.",
    price: "600 FCFA",
    weight: "500g",
    image: "/images/fassi500.jpeg",
    badge: "Nouveau",
    color: "#D4A017",
    features: ["Grandes quantités", "Pro à domicile", "Économies d'échelle"],
    usage: "Machine recommandée",
  },
  {
    id: 6,
    name: "Fassi 1000g",
    category: "Lessive",
    description: "Le format professionnel par excellence. Pour blanchisseries, hôtels et professionnels.",
    price: "1100 FCFA",
    weight: "1000g",
    image: "/images/fassi1000.jpeg",
    badge: "Pro",
    color: "#0D1E3A",
    features: ["Volume industriel", "Meilleur rapport qualité/prix"],
    usage: "Usage professionnel",
  },
]

export const news = [
  {
    id: 1,
    title: "inauguration d’une unité industrielle de détergent",
    excerpt: "Le Chef de l’État burkinabè, le Capitaine Ibrahim Traoré a inauguré, jeudi 6 mars 2025, le Complexe industriel de détergent « Fassi » (CIDF) dans la commune de Pabré, région du Centre.",
    content: "Le Burkina dispose désormais d’une unité industrielle spécialisée dans la fabrication des produits de nettoyage tels que les détergents en poudre, du savon liquide et solide. Réalisé à 4,5 milliards de FCFA, ce complexe industriel a une capacité de production de 300 tonnes par jour. Les produits « fassi » (net et sans tache en mororé) sont immédiatement mis sur la place du marché national et international.",
    date: "06 mars 2025",
    category: "Innovation",
    image: "https://fr.apanews.net/wp-content/uploads/sites/2/2025/03/image0-7-1024x683.jpeg",
    author: "Direction FASSI",
  },
  {
    id: 2,
    title: "FASSI au Salon de l'Entreprise de Ouagadougou 2026",
    excerpt: "Retrouvez-nous au Salon de l'Entreprise du 20 au 25 mars 2026 pour découvrir nos dernières innovations.",
    content: "FASSI sera présent au grand salon de l'entreprise...",
    date: "2026-03-10",
    category: "Événement",
    image: "/logo.png",
    author: "Communication FASSI",
  },
  {
    id: 3,
    title: "Extension de notre réseau de distribution en Afrique de l'Ouest",
    excerpt: "FASSI élargit son réseau avec de nouveaux partenaires distributeurs au Sénégal, au Mali et en Côte d'Ivoire.",
    content: "Notre expansion régionale continue...",
    date: "2026-02-28",
    category: "Développement",
    image: "/logo.png",
    author: "Direction Commerciale",
  },
  {
    id: 4,
    title: "Certification qualité ISO 9001 pour FASSI CIDF",
    excerpt: "Nous sommes fiers d'annoncer l'obtention de la certification ISO 9001, gage de notre engagement qualité.",
    content: "La certification ISO 9001 est une reconnaissance internationale...",
    date: "2026-02-10",
    category: "Qualité",
    image: "/logo.png",
    author: "Direction Qualité",
  },
  {
    id: 5,
    title: "FASSI s'engage pour la femme burkinabè",
    excerpt: "Programme d'autonomisation de 500 femmes entrepreneurs grâce à nos produits de nettoyage.",
    content: "Notre programme social pour les femmes entrepreneurs...",
    date: "2026-01-20",
    category: "Social",
    image: "/logo.png",
    author: "RSE FASSI",
  },
  {
    id: 6,
    title: "Nouvelle unité de production opérationnelle",
    excerpt: "FASSI double sa capacité de production avec une nouvelle ligne industrielle ultra-moderne.",
    content: "Notre nouvelle unité de production...",
    date: "2026-01-05",
    category: "Industrie",
    image: "/logo.png",
    author: "Direction Technique",
  },
]

export const team = [
  {
    id: 1,
    name: "Directeur Général",
    role: "Direction Générale",
    bio: "Vision stratégique et développement de l'entreprise depuis plus de 10 ans.",
    image: "/logo.png",
  },
  {
    id: 2,
    name: "Directrice Commerciale",
    role: "Commerce & Export",
    bio: "Développement des marchés domestiques et africains.",
    image: "/logo.png",
  },
  {
    id: 3,
    name: "Responsable R&D",
    role: "Recherche & Développement",
    bio: "Innovation produit et formulations écologiques nouvelle génération.",
    image: "/logo.png",
  },
  {
    id: 4,
    name: "Directeur Production",
    role: "Production Industrielle",
    bio: "Supervision des lignes de fabrication et contrôle qualité.",
    image: "/logo.png",
  },
]

export const partners = [
  { id: 1, name: "GIZ Burkina Faso", logo: null, type: "Institutionnel", country: "Burkina Faso" },
  { id: 2, name: "Chambre de Commerce BF", logo: null, type: "Institutionnel", country: "Burkina Faso" },
  { id: 3, name: "ONAC Burkina", logo: null, type: "Commerce", country: "Burkina Faso" },
  { id: 4, name: "Distributeur Mali", logo: null, type: "Distribution", country: "Mali" },
  // { id: 5, name: "Partenaire Sénégal", logo: null, type: "Distribution", country: "Sénégal" },
  // { id: 6, name: "Réseau Côte d'Ivoire", logo: null, type: "Distribution", country: "Côte d'Ivoire" },
  { id: 7, name: "APEX Burkina", logo: null, type: "Promotion", country: "Burkina Faso" },
  { id: 8, name: "Banque de l'Habitat BF", logo: null, type: "Finance", country: "Burkina Faso" },
]

export const values = [
  {
    icon: "Shield",
    title: "Qualité",
    description: "Chaque produit FASSI est soumis à des contrôles rigoureux pour garantir les meilleurs résultats."
  },
  {
    icon: "Leaf",
    title: "Écologie",
    description: "Nos formules respectent l'environnement et minimisent l'impact sur notre planète."
  },
  {
    icon: "Heart",
    title: "Accessibilité",
    description: "Des produits efficaces et abordables pour tous les foyers africains."
  },
  {
    icon: "Zap",
    title: "Innovation",
    description: "Nous investissons constamment dans la recherche pour des formules toujours plus performantes."
  },
]

export const galleryImages = [
  { id: 1, src: "https://cidf-bf.com/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-04-at-07.33.18-17.jpeg", alt: "Usine FASSI", category: "Production" },
  { id: 2, src: "https://cidf-bf.com/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-04-at-07.33.18-17.jpeg", alt: "Gamme de produits", category: "Produits" },
  { id: 3, src: "https://cidf-bf.com/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-04-at-07.33.18-17.jpeg", alt: "Équipe FASSI", category: "Équipe" },
  { id: 4, src: "https://cidf-bf.com/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-04-at-07.33.18-17.jpeg", alt: "Distribution", category: "Distribution" },
  { id: 5, src: "https://cidf-bf.com/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-04-at-07.33.18-17.jpeg", alt: "Contrôle qualité", category: "Qualité" },
  { id: 6, src: "https://cidf-bf.com/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-04-at-07.33.18-17.jpeg", alt: "Packaging", category: "Produits" },
  { id: 7, src: "https://cidf-bf.com/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-04-at-07.33.18-17.jpeg", alt: "Salon professionnel", category: "Événements" },
  { id: 8, src: "https://cidf-bf.com/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-04-at-07.33.18-17.jpeg", alt: "Livraison", category: "Distribution" },
  { id: 9, src: "https://cidf-bf.com/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-04-at-07.33.18-17.jpeg", alt: "Laboratoire R&D", category: "Innovation" },
]

export const faqs = [
  {
    question: "Comment passer une commande en gros ?",
    answer: "Contactez notre service commercial au +226 67 90 00 00 ou par email à contact@cidf-bf.com pour discuter de vos besoins."
  },
  {
    question: "Livrez-vous en dehors du Burkina Faso ?",
    answer: "Oui, nous livrons dans plusieurs pays d'Afrique de l'Ouest. Contactez-nous pour connaître les conditions de livraison internationale."
  },
  {
    question: "Vos produits sont-ils biodégradables ?",
    answer: "Nous travaillons activement sur des formules éco-responsables. Notre nouvelle gamme verte est 100% biodégradable."
  },
  {
    question: "Proposez-vous des formations ?",
    answer: "Oui, nous proposons des formations pour nos distributeurs et partenaires sur l'utilisation et la revente de nos produits."
  },
  {
    question: "Comment devenir distributeur FASSI ?",
    answer: "Remplissez notre formulaire de contact en précisant votre intérêt pour la distribution. Notre équipe vous contactera sous 48h."
  },
]

export const downloads = [
  { id: 1, name: "Catalogue Produits 2026", size: "2.4 MB", type: "PDF", date: "2026-01-01", icon: "FileText" },
  { id: 2, name: "Fiche Technique - Gamme Lessive", size: "1.1 MB", type: "PDF", date: "2026-01-15", icon: "FileText" },
  { id: 3, name: "Brochure Institutionnelle", size: "3.8 MB", type: "PDF", date: "2026-02-01", icon: "FileText" },
  { id: 4, name: "Formulaire Partenariat", size: "0.5 MB", type: "PDF", date: "2026-01-01", icon: "FileText" },
  { id: 5, name: "Conditions Générales de Vente", size: "0.8 MB", type: "PDF", date: "2025-12-01", icon: "FileText" },
]
