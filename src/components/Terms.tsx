import { ArrowLeft, FileText, Scale, Zap } from 'lucide-react';

interface LegalPageProps {
    darkMode: boolean;
    onNavigate: (page: any) => void;
}

export function TermsOfService({ darkMode, onNavigate }: LegalPageProps) {
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
                    <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500">
                        <FileText className="w-6 h-6" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">Conditions d'Utilisation</h1>
                </div>

                <div className={`prose prose-neutral ${darkMode ? 'prose-invert' : ''} max-w-none space-y-8 text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed`}>
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                            <Zap className="w-5 h-5 text-orange-500" />
                            1. Acceptation des conditions
                        </h2>
                        <p>
                            En accédant à CommentSticker, vous acceptez d'être lié par ces conditions d'utilisation et par toutes les lois et réglementations applicables. Si vous n'acceptez pas ces conditions, il vous est interdit d'utiliser ce site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                            <Scale className="w-5 h-5 text-orange-500" />
                            2. Licence d'utilisation
                        </h2>
                        <p>
                            L'outil est fourni gratuitement pour un usage personnel et commercial. Vous êtes libre de générer, télécharger et utiliser les stickers pour vos propres contenus sur les réseaux sociaux.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">3. Clause de non-responsabilité</h2>
                        <p>
                            Les outils de CommentSticker sont fournis "en l'état". Nous ne donnons aucune garantie, expresse ou implicite, et déclinons par la présente toute autre garantie, y compris, sans limitation, les garanties implicites de qualité marchande ou d'adéquation à un usage particulier.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">4. Limitations</h2>
                        <p>
                            En aucun cas CommentSticker ou ses fournisseurs ne pourront être tenus responsables de tout dommage (y compris, sans limitation, les dommages pour perte de données ou de profit, ou en raison d'une interruption d'activité) découlant de l'utilisation ou de l'impossibilité d'utiliser les outils.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}
