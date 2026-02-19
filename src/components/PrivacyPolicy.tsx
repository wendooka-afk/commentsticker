import { ArrowLeft, Shield, Lock, Eye } from 'lucide-react';

interface LegalPageProps {
    darkMode: boolean;
    onNavigate: (page: any) => void;
}

export function PrivacyPolicy({ darkMode, onNavigate }: LegalPageProps) {
    return (
        <div className={`min-h-screen font-sans ${darkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
            <nav className="p-6">
                <button
                    onClick={() => onNavigate('home')}
                    className="flex items-center gap-2 text-sm font-bold hover:text-pink-500 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Retour à l'accueil
                </button>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-500">
                        <Shield className="w-6 h-6" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">Politique de Confidentialité</h1>
                </div>

                <div className={`prose prose-neutral ${darkMode ? 'prose-invert' : ''} max-w-none space-y-8 text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed`}>
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                            <Lock className="w-5 h-5 text-pink-500" />
                            1. Collecte des données
                        </h2>
                        <p>
                            CommentSticker ne collecte aucune donnée personnelle identifiable sans votre consentement explicite. Les images que vous uploadez pour générer des stickers sont traitées localement dans votre navigateur et ne sont jamais stockées sur nos serveurs.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                            <Eye className="w-5 h-5 text-pink-500" />
                            2. Cookies & Publicités
                        </h2>
                        <p>
                            Nous utilisons des cookies pour améliorer votre expérience et diffuser des publicités pertinentes via Google AdSense. Google utilise des cookies pour diffuser des annonces basées sur vos visites antérieures sur notre site ou sur d'autres sites Web.
                        </p>
                        <p>
                            Les utilisateurs peuvent choisir de désactiver la publicité personnalisée en consultant les <a href="https://www.google.com/settings/ads" target="_blank" className="text-pink-500 underline">Paramètres des annonces Google</a>.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">3. Google AdSense</h3>
                        <p>
                            En tant que fournisseur tiers, Google utilise des cookies pour diffuser des annonces sur ce site. L'utilisation du cookie DART par Google lui permet de diffuser des annonces aux utilisateurs en fonction de leur visite sur ce site et d'autres sites sur Internet.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">4. Contact</h2>
                        <p>
                            Pour toute question concernant cette politique, vous pouvez nous contacter à l'adresse suivante : support@commentsticker.com
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}
