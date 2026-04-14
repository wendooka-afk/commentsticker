import { Mail, MessageCircle, Send } from 'lucide-react';
import { SEOHeader, SEOFooter } from './SEOLayout';

interface LegalPageProps {
    darkMode: boolean;
    onNavigate: (page: any) => void;
}

export function Contact({ darkMode, onNavigate }: LegalPageProps) {
    return (
        <div className={`min-h-screen font-sans ${darkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
            <SEOHeader onNavigate={onNavigate} darkMode={darkMode} />

            <main className="max-w-4xl mx-auto px-6 py-32">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500">
                        <Mail className="w-6 h-6" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">Contact</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 font-medium">
                            A question, suggestion or bug to report? Our team is listening.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-neutral-500" />
                                </div>
                                <div>
                                    <div className="text-xs font-black uppercase text-neutral-400 tracking-widest">Email</div>
                                    <div className="font-bold">support@commentsticker.com</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                                    <MessageCircle className="w-5 h-5 text-neutral-500" />
                                </div>
                                <div>
                                    <div className="text-xs font-black uppercase text-neutral-400 tracking-widest">Discord</div>
                                    <div className="font-bold">Join the community</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form className={`p-8 rounded-[2.5rem] border space-y-4 ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-white shadow-xl shadow-black/5'}`} onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-neutral-400">Name</label>
                            <input type="text" className={`w-full px-4 py-3 rounded-xl border ${darkMode ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-100'}`} placeholder="Your name" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-neutral-400">Email</label>
                            <input type="email" className={`w-full px-4 py-3 rounded-xl border ${darkMode ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-100'}`} placeholder="your@email.com" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-neutral-400">Message</label>
                            <textarea rows={4} className={`w-full px-4 py-3 rounded-xl border ${darkMode ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-100'}`} placeholder="How can we help you?"></textarea>
                        </div>
                        <button className="w-full py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-2xl font-black transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                            Send
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </main>

            <SEOFooter onNavigate={onNavigate} />
        </div>
    );
}
