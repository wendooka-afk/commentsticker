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
                    Back to home
                </button>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500">
                        <FileText className="w-6 h-6" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">Terms of Service</h1>
                </div>

                <div className={`prose prose-neutral ${darkMode ? 'prose-invert' : ''} max-w-none space-y-8 text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed`}>
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                            <Zap className="w-5 h-5 text-orange-500" />
                            1. Acceptance of Terms
                        </h2>
                        <p>
                            By accessing CommentSticker, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                            <Scale className="w-5 h-5 text-orange-500" />
                            2. Use License
                        </h2>
                        <p>
                            The tool is provided free of charge for both personal and commercial use. You are free to generate, download, and use the stickers for your own content on social media.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">3. Disclaimer</h2>
                        <p>
                            The materials on CommentSticker are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">4. Limitations</h2>
                        <p>
                            In no event shall CommentSticker or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the tools on CommentSticker's website.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}
