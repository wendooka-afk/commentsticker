import { ArrowLeft, Users, Heart, Target } from 'lucide-react';

interface LegalPageProps {
    darkMode: boolean;
    onNavigate: (page: any) => void;
}

export function AboutUs({ darkMode, onNavigate }: LegalPageProps) {
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
                    <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                        <Users className="w-6 h-6" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">About Us</h1>
                </div>

                <div className="space-y-12">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Target className="w-5 h-5 text-blue-500" />
                            Our Mission
                        </h2>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                            CommentSticker was created to simplify the lives of content creators. We believe creating viral content shouldn't be a complex technical task, but a smooth creative process.
                        </p>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-white shadow-sm'}`}>
                            <Heart className="w-8 h-8 text-pink-500 mb-4" />
                            <h3 className="text-xl font-black mb-2">Free & Open</h3>
                            <p className="text-sm text-neutral-500 font-medium">Our basic tools will always be free to help small creators grow.</p>
                        </div>
                        <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-white shadow-sm'}`}>
                            <Zap className="w-8 h-8 text-orange-500 mb-4" />
                            <h3 className="text-xl font-black mb-2">AI Performance</h3>
                            <p className="text-sm text-neutral-500 font-medium">We use the latest AI advances to offer you scripts that actually work.</p>
                        </div>
                    </section>

                    <section className="text-center py-12 border-t border-neutral-100 dark:border-neutral-900">
                        <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs mb-4">Join the adventure</p>
                        <h2 className="text-3xl font-black mb-6">Ready to create?</h2>
                        <button
                            onClick={() => onNavigate('generator')}
                            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-pink-500/20 hover:scale-105 transition-all"
                        >
                            Launch App
                        </button>
                    </section>
                </div>
            </main>
        </div>
    );
}

import { Zap } from 'lucide-react';
