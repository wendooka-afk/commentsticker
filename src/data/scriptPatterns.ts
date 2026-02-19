// Master prompts & viral patterns for script generation

export type ScriptFormat = 'direct' | 'story' | 'tutorial' | 'myth' | 'list' | 'avant-apres' | 'controverse';
export type ScriptTone = 'professional' | 'casual' | 'energetic';
export type ScriptLength = 'short' | 'medium' | 'long';
export type NicheKey = 'business' | 'fitness' | 'finance' | 'devperso' | 'contenu' | 'tech' | 'cuisine' | 'relations' | 'etudes' | 'voyage' | 'general';

export const formatLabels: Record<ScriptFormat, { name: string; desc: string; icon: string }> = {
    direct: { name: 'Réponse directe', desc: 'Réponse claire et concise', icon: '💬' },
    story: { name: 'Storytelling', desc: 'Raconte une histoire personnelle', icon: '📖' },
    tutorial: { name: 'Mini-tutoriel', desc: 'Explique étape par étape', icon: '🎓' },
    myth: { name: 'Débunkage', desc: 'Casse un mythe ou une idée reçue', icon: '🧨' },
    list: { name: 'Liste', desc: '3-5 points clés', icon: '📋' },
    'avant-apres': { name: 'Avant / Après', desc: 'Transformation personnelle', icon: '🔄' },
    controverse: { name: 'Controverse', desc: 'Opinion tranchée qui divise', icon: '⚡' },
};

export const toneLabels: Record<ScriptTone, string> = {
    professional: 'Professionnel',
    casual: 'Conversationnel',
    energetic: 'Énergique',
};

export const lengthLabels: Record<ScriptLength, { name: string; duration: string }> = {
    short: { name: 'Court', duration: '30s' },
    medium: { name: 'Moyen', duration: '60s' },
    long: { name: 'Long', duration: '90s' },
};

export const nicheLabels: Record<NicheKey, { name: string; icon: string }> = {
    business: { name: 'Business', icon: '💼' },
    fitness: { name: 'Fitness', icon: '💪' },
    finance: { name: 'Finance', icon: '💰' },
    devperso: { name: 'Dev. perso', icon: '🧠' },
    contenu: { name: 'Contenu', icon: '🎬' },
    tech: { name: 'Tech', icon: '💻' },
    cuisine: { name: 'Cuisine', icon: '🍳' },
    relations: { name: 'Relations', icon: '❤️' },
    etudes: { name: 'Études', icon: '📚' },
    voyage: { name: 'Voyage', icon: '✈️' },
    general: { name: 'Général', icon: '🌐' },
};

function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

// ─── MASTER HOOKS (niche-aware) ─────────────────────────────
const nicheHooks: Record<NicheKey, string[]> = {
    business: [
        "Si tu lances un business en {year}, tu DOIS savoir ça...",
        "L'erreur #1 qui tue 90% des entrepreneurs...",
        "Ce que personne ne te dit sur le freelance...",
        "J'ai perdu des milliers d'euros avant de comprendre ça...",
        "Le secret des entrepreneurs qui réussissent en silence...",
    ],
    fitness: [
        "Si tu fais cette erreur au sport, tu perds ton temps...",
        "3 mois de transformation, voilà ce qui a changé...",
        "Ce que ton coach ne te dira jamais...",
        "J'ai testé pendant 90 jours, voilà les résultats...",
        "Arrête cet exercice, il te détruit les articulations...",
    ],
    finance: [
        "Si tu n'investis pas encore, regarde ça...",
        "L'erreur qui te coûte des milliers chaque année...",
        "Comment j'ai doublé mon épargne en 6 mois...",
        "Ce que la banque ne veut pas que tu saches...",
        "3 investissements que j'aurais dû faire plus tôt...",
    ],
    devperso: [
        "Le déclic qui a radicalement changé ma vie...",
        "Arrête de faire ça chaque matin, ça te ruine...",
        "La routine qui m'a rendu 10x plus productif...",
        "Ce que j'aurais aimé me dire il y a 5 ans...",
        "Le mensonge le plus répandu en développement personnel...",
    ],
    contenu: [
        "Comment j'ai explosé de 0 à 100K abonnés...",
        "L'algorithme favorise CE type de contenu...",
        "Le secret des vidéos à 1M+ de vues...",
        "Arrête de poster à cette heure-là...",
        "Ce que les gros créateurs ne te montrent pas...",
    ],
    tech: [
        "Ce langage va dominer en {year}...",
        "L'outil qui m'a fait gagner 10h par semaine...",
        "Comment devenir dev en 6 mois sans diplôme...",
        "L'erreur #1 des développeurs débutants...",
        "L'IA va remplacer les devs ? Ma réponse honnête...",
    ],
    cuisine: [
        "Cette recette a changé mes dîners pour toujours...",
        "L'erreur que 90% des gens font en cuisine...",
        "Repas healthy pour toute la semaine en 1h...",
        "L'ingrédient secret que personne n'utilise...",
        "Comment manger sain sans se ruiner...",
    ],
    relations: [
        "Le signe #1 que ta relation est en danger...",
        "Ce que j'aurais aimé savoir avant mon couple...",
        "La phrase qui a sauvé notre relation...",
        "Arrête de faire ça, ça tue ton couple...",
        "Comment savoir si c'est la bonne personne...",
    ],
    etudes: [
        "La méthode de révision qui a doublé mes notes...",
        "Ce que l'école ne t'apprend pas...",
        "Comment réussir ses exams sans bachoter...",
        "L'outil qui a changé ma façon de réviser...",
        "3 erreurs fatales pendant les exams...",
    ],
    voyage: [
        "Comment je voyage 6 mois par an sans être riche...",
        "L'erreur #1 des voyageurs débutants...",
        "Ce pays coûte 15€/jour tout compris...",
        "Le secret pour voyager en première à prix réduit...",
        "Comment travailler et voyager en même temps...",
    ],
    general: [
        "Personne ne te dira ça mais...",
        "J'aurais aimé savoir ça plus tôt...",
        "Ce que 99% des gens ne comprennent pas...",
        "Le secret que personne ne veut te dire...",
        "3 choses que j'aurais aimé savoir avant...",
    ],
};

// ─── TRANSITIONS ─────────────────────────────
const transitions: Record<ScriptTone, string[]> = {
    professional: [
        "Et voici ce que vous devez retenir.",
        "Permettez-moi de vous expliquer.",
        "Voici la réponse que j'aurais aimé recevoir.",
        "Les données parlent d'elles-mêmes.",
        "Et la réponse va peut-être vous surprendre.",
    ],
    casual: [
        "Laisse-moi t'expliquer.",
        "Et franchement, c'est plus simple que tu crois.",
        "OK, voilà le truc.",
        "Et c'est là que ça devient intéressant.",
        "Écoute bien, c'est important.",
    ],
    energetic: [
        "Et je vais te donner LA réponse !",
        "ATTENTION, ça va changer ta vision !",
        "Et crois-moi, tu vas pas en revenir !",
        "Accroche-toi, c'est du LOURD !",
        "Et là, GAME CHANGER !",
    ],
};

// ─── CTAs ─────────────────────────────
const ctas: Record<ScriptTone, string[]> = {
    professional: [
        "Partagez votre expérience en commentaire.",
        "Si ce contenu vous a été utile, enregistrez-le.",
        "Quel point vous a le plus interpellé ?",
        "Indiquez-moi vos questions en commentaire.",
    ],
    casual: [
        "Dis-moi en commentaire ta question !",
        "Like si t'as appris un truc.",
        "Sauvegarde cette vidéo pour plus tard.",
        "Tag quelqu'un qui a besoin de voir ça.",
        "C'est lequel ton préféré ? Dis-le en com.",
    ],
    energetic: [
        "LIKE si ça t'a aidé et PARTAGE !",
        "Commente '🔥' si tu veux la partie 2 !",
        "SAUVEGARDE ça MAINTENANT !",
        "Tu veux que je développe ? DIS-LE !",
        "Partage à quelqu'un qui DOIT voir ça !",
    ],
};

// ─── NICHE VOCABULARY ─────────────────────────────
const nicheVocab: Record<NicheKey, { metrics: string[]; actions: string[]; results: string[] }> = {
    business: { metrics: ["chiffre d'affaires", "clients", "revenus", "marge"], actions: ["closer", "prospecter", "scaler", "automatiser"], results: ["10K/mois", "liberté financière", "indépendance", "croissance"] },
    fitness: { metrics: ["reps", "séries", "macros", "poids de corps"], actions: ["s'entraîner", "tracker", "récupérer", "progresser"], results: ["transformation physique", "perte de gras", "prise de muscle", "confiance en soi"] },
    finance: { metrics: ["rendement", "portefeuille", "dividendes", "épargne"], actions: ["investir", "diversifier", "épargner", "analyser"], results: ["indépendance financière", "revenus passifs", "patrimoine", "liberté"] },
    devperso: { metrics: ["productivité", "habitudes", "objectifs", "mindset"], actions: ["méditer", "journaliser", "visualiser", "prioriser"], results: ["clarté mentale", "confiance", "sérénité", "accomplissement"] },
    contenu: { metrics: ["vues", "abonnés", "engagement", "watch time"], actions: ["poster", "scripter", "filmer", "monter"], results: ["viralité", "communauté", "monétisation", "impact"] },
    tech: { metrics: ["lignes de code", "projets", "contributions", "repos"], actions: ["coder", "déployer", "debugger", "apprendre"], results: ["premier emploi", "remote", "freelance", "side project rentable"] },
    cuisine: { metrics: ["calories", "budget repas", "temps prep", "portions"], actions: ["préparer", "cuisiner", "organiser", "goûter"], results: ["repas sains", "économies", "plaisir", "gain de temps"] },
    relations: { metrics: ["communication", "confiance", "qualité du temps", "compromis"], actions: ["écouter", "communiquer", "surprendre", "grandir ensemble"], results: ["couple solide", "complicité", "épanouissement", "bonheur"] },
    etudes: { metrics: ["notes", "heures étudiées", "fiches", "examens réussis"], actions: ["réviser", "organiser", "pratiquer", "mémoriser"], results: ["mention", "diplôme", "compréhension", "confiance"] },
    voyage: { metrics: ["budget/jour", "pays visités", "km parcourus", "jours de voyage"], actions: ["réserver", "explorer", "photographier", "s'adapter"], results: ["liberté", "découverte", "souvenirs", "ouverture d'esprit"] },
    general: { metrics: ["résultats", "progrès", "objectifs", "étapes"], actions: ["commencer", "persévérer", "ajuster", "mesurer"], results: ["réussite", "transformation", "croissance", "accomplissement"] },
};

// ─── SCRIPT GENERATION ENGINE ─────────────────────────────
export function generateScript(
    question: string,
    format: ScriptFormat,
    tone: ScriptTone,
    length: ScriptLength,
    niche: NicheKey,
): string {
    const q = question || `Comment réussir en ${nicheLabels[niche].name.toLowerCase()}`;
    const year = new Date().getFullYear();
    const hook = pick(nicheHooks[niche]).replace('{year}', String(year));
    const transition = pick(transitions[tone]);
    const cta = pick(ctas[tone]);
    const vocab = nicheVocab[niche];
    const metric = pick(vocab.metrics);
    const action = pick(vocab.actions);
    const result = pick(vocab.results);

    const g = tone === 'energetic' ? 'STOP ! ' : tone === 'casual' ? '' : '';
    const cas = tone === 'casual';
    const ene = tone === 'energetic';
    const pro = tone === 'professional';

    const sections: string[] = [];

    // Helper to add a section
    const add = (label: string, dur: string, ...lines: string[]) => {
        sections.push(`[${label} — ${dur}]\n${lines.filter(Boolean).join('\n')}`);
    };

    if (format === 'direct') {
        add('HOOK', '3s', `${g}"${q}"`, hook);
        add('TRANSITION', '5s', transition);
        if (length !== 'short') add('CONTEXTE', '10s',
            `${cas ? 'En fait, ' : ''}cette question revient tout le temps.`,
            `${ene ? 'Et la réponse va te SURPRENDRE ! ' : ''}C'est un sujet qui touche beaucoup de monde.`
        );
        add('RÉPONSE', length === 'short' ? '20s' : '30s',
            `${cas ? 'Voilà le truc : ' : 'Voici ma réponse : '}il y a ${length === 'long' ? 'quatre' : 'trois'} éléments essentiels.`,
            `\nPremièrement, ${ene ? 'et c\'est CRUCIAL : ' : ''}${action}. C'est la base pour atteindre ${result}.`,
            `\nDeuxièmement, mesure ton ${metric}. ${cas ? 'Ce qui se mesure s\'améliore.' : 'La mesure permet l\'optimisation.'}`,
            `\nTroisièmement, sois régulier. ${ene ? 'La CONSTANCE bat le talent !' : 'La régularité prime sur l\'intensité.'}`
        );
        if (length === 'long') add('APPROFONDISSEMENT', '20s',
            `${cas ? 'Et le point bonus : ' : 'Quatrième élément : '}entoure-toi des bonnes personnes.`,
            `Ton environnement détermine tes ${metric}. ${ene ? 'C\'est NON-NÉGOCIABLE !' : ''}`
        );
        add('CALL-TO-ACTION', '5s', cta);
    }

    else if (format === 'story') {
        add('HOOK', '3s', `${g}"${q}" — Cette question me ramène à un moment précis.`);
        add('SITUATION', length === 'short' ? '10s' : '15s',
            `${cas ? 'Figure-toi qu\'' : ''}il y a quelques années, j'étais dans une situation compliquée.`,
            `${ene ? 'Genre VRAIMENT dans le dur ! ' : ''}Je me posais exactement cette question.`,
            length !== 'short' ? `J'avais tout essayé. ${cas ? 'Rien marchait.' : 'Sans résultat probant.'}` : ''
        );
        if (length !== 'short') add('DÉCLIC', '15s',
            `Et puis un jour, quelqu'un m'a dit : "${cas ? 'Arrête de chercher la perfection.' : 'Cessez d\'attendre les conditions idéales.'}"`,
            `${ene ? 'Et là, DÉCLIC ! ' : ''}J'ai compris que je devais ${action} immédiatement.`
        );
        add('RÉSULTAT', length === 'short' ? '10s' : '15s',
            `${cas ? 'Et devinez quoi ? ' : ''}Les résultats ont suivi. ${result}.`,
            `${ene ? 'Et crois-moi, ça en valait TELLEMENT la peine !' : ''}`,
            `Ce que j'ai appris : ${cas ? 'fais le premier pas, même si c\'est imparfait.' : 'l\'action imparfaite bat l\'inaction parfaite.'}`
        );
        add('CALL-TO-ACTION', '5s', cta);
    }

    else if (format === 'tutorial') {
        add('HOOK', '3s', `${g}"${q}" — ${cas ? 'Je te montre étape par étape.' : 'Voici la méthode.'}`);
        if (length !== 'short') add('INTRO', '8s',
            `${cas ? 'Rien de compliqué, tu vas voir.' : 'C\'est plus simple qu\'il n\'y paraît.'}`,
            `${ene ? 'Prends des notes, c\'est du LOURD !' : ''}`
        );
        add('ÉTAPE 1', '10s', `Première étape : ${action}.`, `${cas ? 'C\'est la base, commence par là.' : 'C\'est le fondement de la méthode.'}`);
        add('ÉTAPE 2', '10s', `Deuxième étape : mesure ton ${metric} régulièrement.`, `${ene ? 'Ce qui se mesure s\'AMÉLIORE !' : ''}`);
        add('ÉTAPE 3', '10s', `Troisième étape : ajuste en fonction des résultats.`, `${cas ? 'C\'est normal si c\'est pas parfait du premier coup.' : ''}`);
        if (length === 'long') add('ÉTAPE 4', '10s', `Quatrième étape : optimise pour ${result}.`, `C'est là que tu passes au niveau supérieur.`);
        add('CALL-TO-ACTION', '5s', cta);
    }

    else if (format === 'myth') {
        add('HOOK', '3s', `${g}"${q}" — ${ene ? 'Il faut qu\'on parle de ce MYTHE !' : 'Déconstruisons cette croyance.'}`);
        add('LE MYTHE', '10s',
            `Beaucoup pensent qu'il faut ${pick(['des années d\'expérience', 'un gros budget', 'des contacts', 'un diplôme'])} pour réussir.`,
            `${cas ? 'C\'est une croyance qui bloque énormément de monde.' : 'Cette croyance est limitante.'}`
        );
        add('LA VÉRITÉ', length === 'short' ? '15s' : '25s',
            `${ene ? 'La VÉRITÉ : ' : 'En réalité, '}c'est faux.`,
            `Ce qui compte vraiment : ${action} et mesurer son ${metric}.`,
            `${cas ? 'J\'ai vu des gens atteindre ' : 'Des personnes ont atteint '}${result} en partant de zéro.`,
            length !== 'short' ? `Les conditions parfaites n'existent pas. ${ene ? 'Arrête d\'attendre !' : ''}` : ''
        );
        if (length === 'long') add('LA PREUVE', '15s',
            `${cas ? 'Regarde ' : 'Observez '}les success stories. ${ene ? 'AUCUNE ' : 'Aucune '}n'a commencé avec tout.`,
            `Le point commun : passer à l'action malgré les doutes.`
        );
        add('CALL-TO-ACTION', '5s', cta);
    }

    else if (format === 'list') {
        const count = length === 'short' ? 3 : length === 'medium' ? 5 : 7;
        add('HOOK', '3s', `${g}${count} vérités sur "${q}"`);
        const points = [
            `Commence là où tu es. ${ene ? 'Pas demain, MAINTENANT !' : ''}`,
            `Mesure ton ${metric}. ${cas ? 'Ce qui se mesure s\'améliore.' : ''}`,
            `${pick(['Sois régulier.', 'La constance > l\'intensité.'])} ${ene ? 'C\'est CRUCIAL !' : ''}`,
            `Entoure-toi des bonnes personnes. ${cas ? 'Ton environnement te définit.' : ''}`,
            `Apprends en faisant. ${ene ? 'L\'action bat la théorie !' : ''}`,
            `Investis en toi. ${cas ? 'Ton meilleur investissement.' : ''}`,
            `Commence avant d'être prêt. ${ene ? 'Le moment parfait n\'existe PAS !' : ''}`,
        ];
        for (let i = 0; i < count; i++) {
            add(`POINT ${i + 1}`, length === 'short' ? '8s' : '10s', points[i]);
        }
        add('CALL-TO-ACTION', '5s', cta);
    }

    else if (format === 'avant-apres') {
        add('HOOK', '3s', `${g}"${q}" — Ma transformation en quelques mois.`);
        add('AVANT', length === 'short' ? '12s' : '20s',
            `${cas ? 'Avant, ' : 'Il y a quelques mois, '}j'étais bloqué. Mon ${metric} était au plus bas.`,
            `${ene ? 'Genre ZÉRO résultat !' : ''}`,
            length !== 'short' ? `Je faisais les mauvaises choses. ${cas ? 'Je perdais mon temps sans le savoir.' : ''}` : ''
        );
        add('LE CHANGEMENT', length === 'short' ? '8s' : '15s',
            `J'ai décidé de ${action}. De tout repenser.`,
            `${ene ? 'Et là, TOUT a changé !' : 'Les résultats ont commencé à arriver.'}`
        );
        add('APRÈS', length === 'short' ? '10s' : '20s',
            `Aujourd'hui : ${result}.`,
            `Mon ${metric} a complètement changé.`,
            `${cas ? 'Et le plus fou ?' : ''} C'était pas aussi compliqué que je le pensais.`
        );
        if (length === 'long') add('LEÇON', '10s',
            `La leçon : ${cas ? 'faut juste commencer.' : 'l\'action est le seul chemin.'}`,
            `${ene ? 'Chaque jour compte !' : ''}`
        );
        add('CALL-TO-ACTION', '5s', cta);
    }

    else if (format === 'controverse') {
        add('HOOK', '3s', `${g}"${q}" — ${ene ? 'Attention, ça va diviser !' : 'Mon avis va surprendre.'}`);
        add('OPINION', length === 'short' ? '10s' : '15s',
            `${cas ? 'Je pense que ' : 'Mon opinion : '}${pick([
                `la majorité se trompe sur ce sujet.`,
                `on fait tout à l'envers.`,
                `le conseil le plus répandu est faux.`,
            ])}`,
            `${ene ? 'Et je vais vous le PROUVER !' : ''}`
        );
        add('ARGUMENT 1', '12s',
            `Premier argument : les résultats parlent.`,
            `Ceux qui ${action} obtiennent ${result}. ${cas ? 'C\'est un fait.' : ''}`
        );
        if (length !== 'short') add('ARGUMENT 2', '12s',
            `Deuxième argument : le ${metric} ne ment pas.`,
            `${ene ? 'Les CHIFFRES prouvent que j\'ai raison !' : 'Les données confirment cette approche.'}`
        );
        if (length === 'long') add('NUANCE', '10s',
            `${cas ? 'Bon, je nuance quand même : ' : 'Cependant, '}chaque situation est unique.`,
            `Mais le principe reste valable dans ${pro ? 'la grande majorité des cas.' : '90% des cas.'}`
        );
        add('CALL-TO-ACTION', '5s', `${cas ? 'T\'es d\'accord ? ' : 'Quel est votre avis ? '}${cta}`);
    }

    return sections.join('\n\n');
}
