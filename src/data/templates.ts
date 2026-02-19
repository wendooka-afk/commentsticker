// Templates de commentaires prêts à l'emploi
export interface CommentTemplate {
  id: string;
  category: string;
  icon: string;
  text: string;
  description: string;
}

export const commentTemplates: CommentTemplate[] = [
  // Questions virales
  { id: '1', category: 'Questions virales', icon: '🔥', text: "Attends, c'est vraiment possible ça ?!", description: "Hook d'incrédulité" },
  { id: '2', category: 'Questions virales', icon: '🔥', text: "Comment t'as fait ça ? Je veux savoir !", description: "Demande de tutoriel" },
  { id: '3', category: 'Questions virales', icon: '🔥', text: "J'ai la même question depuis des années...", description: "Relatabilité" },
  { id: '4', category: 'Questions virales', icon: '🔥', text: "ENFIN quelqu'un qui en parle !", description: "Validation sociale" },
  { id: '5', category: 'Questions virales', icon: '🔥', text: "Tu peux faire une partie 2 stp ?", description: "Engagement suite" },

  // Débutants
  { id: '6', category: 'Débutants', icon: '🌱', text: "Je débute, par où commencer ?", description: "Question de départ" },
  { id: '7', category: 'Débutants', icon: '🌱', text: "C'est adapté pour les débutants ?", description: "Niveau requis" },
  { id: '8', category: 'Débutants', icon: '🌱', text: "J'ai 0 expérience, c'est grave ?", description: "Rassurance" },
  { id: '9', category: 'Débutants', icon: '🌱', text: "Quel est le premier pas à faire ?", description: "Action immédiate" },
  { id: '10', category: 'Débutants', icon: '🌱', text: "Tu aurais des conseils pour quelqu'un qui commence ?", description: "Conseils personnalisés" },

  // Sceptiques
  { id: '11', category: 'Sceptiques', icon: '🤔', text: "C'est vraiment efficace ou c'est du bullsh*t ?", description: "Doute direct" },
  { id: '12', category: 'Sceptiques', icon: '🤔', text: "Et ça marche vraiment ? J'ai du mal à y croire...", description: "Scepticisme poli" },
  { id: '13', category: 'Sceptiques', icon: '🤔', text: "Prouve-le avec des résultats concrets", description: "Demande de preuve" },
  { id: '14', category: 'Sceptiques', icon: '🤔', text: "C'est pas trop beau pour être vrai ?", description: "Méfiance" },
  { id: '15', category: 'Sceptiques', icon: '🤔', text: "Y'a pas un piège quelque part ?", description: "Recherche de catch" },

  // Motivation
  { id: '16', category: 'Motivation', icon: '💪', text: "Comment tu restes motivé tous les jours ?", description: "Routine motivation" },
  { id: '17', category: 'Motivation', icon: '💪', text: "J'ai envie d'abandonner, que faire ?", description: "Moment de doute" },
  { id: '18', category: 'Motivation', icon: '💪', text: "Comment tu gères les jours sans motivation ?", description: "Gestion bas moments" },
  { id: '19', category: 'Motivation', icon: '💪', text: "Quel déclic t'as eu pour te lancer ?", description: "Histoire origine" },
  { id: '20', category: 'Motivation', icon: '💪', text: "Comment tu as surmonté l'échec ?", description: "Résilience" },

  // Argent
  { id: '21', category: 'Argent', icon: '💰', text: "Combien ça coûte vraiment ?", description: "Budget réel" },
  { id: '22', category: 'Argent', icon: '💰', text: "Tu gagnes combien avec ça ?", description: "Revenus directs" },
  { id: '23', category: 'Argent', icon: '💰', text: "C'est possible sans investir au début ?", description: "Démarrage 0€" },
  { id: '24', category: 'Argent', icon: '💰', text: "Comment tu as financé le début ?", description: "Financement initial" },
  { id: '25', category: 'Argent', icon: '💰', text: "C'est rentable au bout de combien de temps ?", description: "ROI timeline" },

  // Temps
  { id: '26', category: 'Temps', icon: '⏰', text: "Ça prend combien de temps par jour ?", description: "Investissement quotidien" },
  { id: '27', category: 'Temps', icon: '⏰', text: "Combien de temps avant les premiers résultats ?", description: "Timeline résultats" },
  { id: '28', category: 'Temps', icon: '⏰', text: "C'est compatible avec un travail à temps plein ?", description: "Side hustle" },
  { id: '29', category: 'Temps', icon: '⏰', text: "Comment tu gères ton temps ?", description: "Organisation" },
  { id: '30', category: 'Temps', icon: '⏰', text: "C'est faisable en 1h par jour ?", description: "Temps limité" },

  // Outils
  { id: '31', category: 'Outils', icon: '🛠️', text: "Tu utilises quoi comme outils ?", description: "Stack technique" },
  { id: '32', category: 'Outils', icon: '🛠️', text: "C'est quoi ton setup ?", description: "Configuration" },
  { id: '33', category: 'Outils', icon: '🛠️', text: "Tu recommandes quelle app ?", description: "Recommandation" },
  { id: '34', category: 'Outils', icon: '🛠️', text: "Quel logiciel tu utilises pour ça ?", description: "Software spécifique" },
  { id: '35', category: 'Outils', icon: '🛠️', text: "C'est gratuit ou payant ?", description: "Prix outil" },

  // Erreurs
  { id: '36', category: 'Erreurs', icon: '❌', text: "Quelles erreurs tu as faites au début ?", description: "Apprentissage" },
  { id: '37', category: 'Erreurs', icon: '❌', text: "C'est quoi les pièges à éviter ?", description: "Red flags" },
  { id: '38', category: 'Erreurs', icon: '❌', text: "Tu regrettes quelque chose ?", description: "Regrets" },
  { id: '39', category: 'Erreurs', icon: '❌', text: "Qu'est-ce que t'aurais fait différemment ?", description: "Hindsight" },
  { id: '40', category: 'Erreurs', icon: '❌', text: "C'est quoi la plus grosse erreur des débutants ?", description: "Erreur commune" },
  { id: '41', category: 'E-commerce', icon: '🛒', text: "C'est quoi les délais de livraison ?", description: "Logistique" },
  { id: '42', category: 'E-commerce', icon: '🛒', text: "Y'a un code promo pour la première commande ?", description: "Promotion" },
  { id: '43', category: 'E-commerce', icon: '🛒', text: "C'est satisfait ou remboursé ?", description: "Confiance" },
  { id: '44', category: 'E-commerce', icon: '🛒', text: "Vous livrez en Belgique / Suisse ?", description: "Géographie" },
  { id: '45', category: 'E-commerce', icon: '🛒', text: "J'ai reçu ma commande, c'est incroyable !", description: "Avis client" },
  { id: '46', category: 'Viral', icon: '✨', text: "J'ai testé et ça marche vraiment 🤯", description: "Validation" },
  { id: '47', category: 'Viral', icon: '✨', text: "Le hack à la fin est dément !", description: "Curiosité" },
  { id: '48', category: 'Viral', icon: '✨', text: "Regarde ça @ami", description: "Mention ami" },
];

export const templateCategories = [
  { name: 'Questions virales', icon: '🔥', color: 'from-orange-500 to-red-500' },
  { name: 'Débutants', icon: '🌱', color: 'from-green-500 to-emerald-500' },
  { name: 'Sceptiques', icon: '🤔', color: 'from-yellow-500 to-amber-500' },
  { name: 'Motivation', icon: '💪', color: 'from-blue-500 to-indigo-500' },
  { name: 'Argent', icon: '💰', color: 'from-yellow-400 to-yellow-600' },
  { name: 'Temps', icon: '⏰', color: 'from-purple-500 to-violet-500' },
  { name: 'Outils', icon: '🛠️', color: 'from-gray-500 to-gray-700' },
  { name: 'Erreurs', icon: '❌', color: 'from-red-500 to-rose-500' },
  { name: 'E-commerce', icon: '🛒', color: 'from-blue-400 to-cyan-500' },
  { name: 'Viral', icon: '✨', color: 'from-purple-400 to-pink-500' },
];

// Scripts de vidéos prêts à l'emploi
export interface VideoScript {
  id: string;
  type: string;
  icon: string;
  name: string;
  duration: string;
  structure: {
    section: string;
    content: string;
    duration: string;
  }[];
}

export const videoScriptTemplates: VideoScript[] = [
  {
    id: 'reply-basic',
    type: 'Réponse simple',
    icon: '💬',
    name: 'Je réponds à un abonné',
    duration: '30-60s',
    structure: [
      { section: 'Hook', content: '[Montre le commentaire] "Quelqu\'un m\'a posé cette question..."', duration: '3s' },
      { section: 'Transition', content: '"Et c\'est une super question parce que..."', duration: '5s' },
      { section: 'Réponse principale', content: '[Ta réponse en 3 points max]', duration: '30-40s' },
      { section: 'CTA', content: '"Et toi, t\'as d\'autres questions ? Dis-le moi en commentaire"', duration: '5s' },
    ]
  },
  {
    id: 'reply-story',
    type: 'Storytelling',
    icon: '📖',
    name: 'Mon histoire personnelle',
    duration: '60-90s',
    structure: [
      { section: 'Hook', content: '[Commentaire] "Tu veux savoir comment j\'ai fait ?"', duration: '3s' },
      { section: 'Le problème', content: '"Il y a [temps], j\'étais exactement comme toi..."', duration: '15s' },
      { section: 'Le déclic', content: '"Et puis un jour, j\'ai compris que..."', duration: '15s' },
      { section: 'La solution', content: '"Voilà ce que j\'ai fait..."', duration: '20s' },
      { section: 'Le résultat', content: '"Aujourd\'hui, [résultat concret]..."', duration: '10s' },
      { section: 'CTA', content: '"Si tu veux que je t\'explique en détail, like cette vidéo"', duration: '5s' },
    ]
  },
  {
    id: 'reply-myth',
    type: 'Myth Buster',
    icon: '🧨',
    name: 'Je casse un mythe',
    duration: '30-45s',
    structure: [
      { section: 'Hook', content: '[Commentaire sceptique] "Beaucoup pensent ça..."', duration: '3s' },
      { section: 'Le mythe', content: '"On entend souvent que [croyance répandue]..."', duration: '5s' },
      { section: 'La vérité', content: '"Mais en réalité, c\'est faux parce que..."', duration: '15s' },
      { section: 'La preuve', content: '"La preuve : [fait/stat/expérience]..."', duration: '10s' },
      { section: 'CTA', content: '"Partage si tu connaissais pas ça !"', duration: '3s' },
    ]
  },
  {
    id: 'reply-tutorial',
    type: 'Mini-tuto',
    icon: '🎓',
    name: 'Tuto rapide étape par étape',
    duration: '45-60s',
    structure: [
      { section: 'Hook', content: '[Commentaire] "Tu veux savoir comment faire ?"', duration: '3s' },
      { section: 'Étape 1', content: '"Première chose : [action 1]..."', duration: '10s' },
      { section: 'Étape 2', content: '"Ensuite : [action 2]..."', duration: '10s' },
      { section: 'Étape 3', content: '"Et enfin : [action 3]..."', duration: '10s' },
      { section: 'Résultat', content: '"Et voilà le résultat !"', duration: '5s' },
      { section: 'CTA', content: '"Sauvegarde cette vidéo pour plus tard"', duration: '3s' },
    ]
  },
  {
    id: 'reply-controversial',
    type: 'Opinion tranchée',
    icon: '🔥',
    name: 'Mon avis impopulaire',
    duration: '30-45s',
    structure: [
      { section: 'Hook', content: '[Commentaire] "Attention, ça va pas plaire à tout le monde..."', duration: '3s' },
      { section: 'Opinion', content: '"Je pense que [opinion tranchée]..."', duration: '10s' },
      { section: 'Argument 1', content: '"Et voilà pourquoi : [raison 1]..."', duration: '10s' },
      { section: 'Argument 2', content: '"En plus : [raison 2]..."', duration: '10s' },
      { section: 'CTA', content: '"T\'es d\'accord ? Dis-le moi en commentaire"', duration: '5s' },
    ]
  },
];

// Hooks d'accroche populaires
export const popularHooks = [
  "Personne ne te dira ça mais...",
  "J'aurais aimé savoir ça plus tôt...",
  "Arrête de faire cette erreur !",
  "Ce que 99% des gens ne savent pas...",
  "La vérité qu'on te cache sur...",
  "Comment j'ai [résultat] en [temps]...",
  "3 choses que j'aurais aimé savoir avant...",
  "Le secret que personne ne veut te dire...",
  "Pourquoi tu n'arrives pas à [objectif]...",
  "La méthode que j'utilise pour...",
  "Ce qui m'a pris [x ans] à comprendre...",
  "L'erreur #1 que font les débutants...",
];

// Call-to-actions efficaces
export const effectiveCTAs = [
  "Like si t'as appris quelque chose !",
  "Sauvegarde cette vidéo pour plus tard",
  "Partage à quelqu'un qui en a besoin",
  "Commente '🔥' si tu veux la partie 2",
  "Abonne-toi pour plus de conseils comme ça",
  "Dis-moi en commentaire ta question",
  "Tag quelqu'un qui doit voir ça",
  "Follow pour ne rien rater",
  "Quel point t'a le plus marqué ?",
  "T'es d'accord ? Dis-le moi en commentaire",
];
