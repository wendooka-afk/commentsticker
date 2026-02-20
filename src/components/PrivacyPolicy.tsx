import { ArrowLeft, Shield } from 'lucide-react';

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
                    Back to home
                </button>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-500">
                        <Shield className="w-6 h-6" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">Privacy Policy</h1>
                </div>

                <div className={`prose prose-neutral ${darkMode ? 'prose-invert' : ''} max-w-none space-y-8 text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed`}>
                    <section>
                        <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">1. Data Collection</h2>
                            <p className="leading-relaxed">
                                CommentSticker does not collect any personally identifiable information without your explicit consent. The images you upload to generate stickers are processed locally in your browser and are never stored on our servers.
                            </p>
                        </div>
                    </section>

                    <section>
                        <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">2. Cookies & Advertising</h2>
                            <p className="leading-relaxed">
                                We use cookies to improve your experience and serve relevant ads via Google AdSense. Google uses cookies to serve ads based on your prior visits to our site or other websites.
                            </p>
                            <p className="leading-relaxed">
                                Users may opt out of personalized advertising by visiting the <a href="https://www.google.com/settings/ads" target="_blank" className="text-pink-500 underline">Google Ads Settings</a>.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">3. Google AdSense</h3>
                        <p>
                            As a third-party vendor, Google uses cookies to serve ads on this site. Google's use of the DART cookie enables it to serve ads to users based on their visit to this site and other sites on the Internet.
                        </p>
                    </section>

                    <section>
                        <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">4. Tool Usage</h2>
                            <p className="leading-relaxed">
                                The fake notification and comment generation tool is intended for creative and entertainment use. You are fully responsible for the content you generate and how you use it.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">5. Contact</h2>
                        <p>
                            If you have any questions regarding this privacy policy, please contact us at: support@commentsticker.com
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}
