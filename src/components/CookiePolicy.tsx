import { Cookie } from 'lucide-react';
import { SEOHeader, SEOFooter } from './SEOLayout';

interface LegalPageProps {
    darkMode: boolean;
    onNavigate: (page: any) => void;
}

export function CookiePolicy({ darkMode, onNavigate }: LegalPageProps) {
    const dm = darkMode;
    const muted = dm ? 'text-neutral-400' : 'text-neutral-600';
    const card = dm ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm';

    return (
        <div className={`min-h-screen font-sans ${dm ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
            <SEOHeader onNavigate={onNavigate} darkMode={dm} />

            <main className="max-w-4xl mx-auto px-6 py-32">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
                        <Cookie className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase tracking-widest text-amber-500 mb-1">Legal</p>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight">Cookie Policy</h1>
                    </div>
                </div>
                <p className={`text-sm ${muted} mb-12`}>Last updated: April 18, 2026 &nbsp;·&nbsp; Effective date: April 18, 2026</p>

                <div className={`space-y-10 ${muted} font-medium leading-relaxed`}>

                    <section>
                        <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4">1. Introduction</h2>
                        <p>
                            This Cookie Policy explains how <strong>CommentSticker</strong> ("we", "us", or "our") uses cookies and similar tracking technologies on <strong>commentsticker.com</strong> (the "Service"). It should be read together with our{' '}
                            <button onClick={() => onNavigate('privacy')} className="text-pink-500 underline font-semibold hover:text-pink-400">Privacy Policy</button>
                            {' '}and{' '}
                            <button onClick={() => onNavigate('terms')} className="text-pink-500 underline font-semibold hover:text-pink-400">Terms of Service</button>.
                        </p>
                        <p className="mt-3">
                            By continuing to browse or use our Service, you agree to the use of cookies described in this policy. You can change your preferences at any time by clicking the "Decline" button in the cookie banner, adjusting your browser settings, or using the opt-out links provided in Section 6.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4">2. What Are Cookies?</h2>
                        <p>
                            Cookies are small text files that a website stores on your device (computer, tablet, or phone) when you visit. They allow the site to recognize your device, remember your preferences, and provide you with a better, more personalized experience. Cookies typically contain an anonymous identifier and do not directly identify you as an individual.
                        </p>
                        <p className="mt-3">
                            We also use similar tracking technologies, such as <strong>localStorage</strong> and <strong>sessionStorage</strong>, which function similarly to cookies but are stored in your browser's local storage. Throughout this policy, we use the word "cookies" to refer to all of these technologies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4">3. Types of Cookies We Use</h2>

                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">3.1 Strictly Necessary Cookies</h3>
                        <p>
                            These cookies are essential for the Service to function and cannot be disabled. They do not store any personally identifiable information.
                        </p>
                        <div className={`rounded-2xl border ${card} p-5 mt-4 overflow-x-auto`}>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className={`text-xs font-black uppercase tracking-wider ${dm ? 'text-neutral-500' : 'text-neutral-500'}`}>
                                        <th className="text-left pb-3 pr-4">Name</th>
                                        <th className="text-left pb-3 pr-4">Purpose</th>
                                        <th className="text-left pb-3">Duration</th>
                                    </tr>
                                </thead>
                                <tbody className={`divide-y ${dm ? 'divide-neutral-800' : 'divide-neutral-100'}`}>
                                    <tr><td className="py-3 pr-4 font-mono text-xs">cs_cookie_consent</td><td className="py-3 pr-4">Stores your cookie consent choice (accepted / declined).</td><td className="py-3">1 year</td></tr>
                                    <tr><td className="py-3 pr-4 font-mono text-xs">cs_dark</td><td className="py-3 pr-4">Remembers your dark-mode preference.</td><td className="py-3">1 year</td></tr>
                                    <tr><td className="py-3 pr-4 font-mono text-xs">cs_history</td><td className="py-3 pr-4">Stores your 8 most recent stickers (all local, never sent to our servers).</td><td className="py-3">1 year</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-8 mb-2">3.2 Analytics Cookies</h3>
                        <p>
                            These cookies help us understand how visitors use our Service so we can improve performance, fix bugs, and prioritize new features. They collect aggregated, anonymized information such as pages visited, time on page, device type, and approximate country.
                        </p>
                        <ul className="list-disc pl-6 mt-3 space-y-2">
                            <li><strong>Ahrefs Analytics</strong> — website traffic, search rankings, and engagement metrics. No personally identifiable data collected.</li>
                        </ul>

                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-8 mb-2">3.3 Advertising Cookies (Third-Party)</h3>
                        <p>
                            We use <strong>Google AdSense</strong> to display advertisements. Google and its partners use cookies to serve ads based on your prior visits to this and other websites. This enables Google and its partners to display personalized ads to our users. You can opt out of personalized advertising by visiting{' '}
                            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-pink-500 underline font-semibold hover:text-pink-400">Google Ads Settings</a>.
                        </p>
                        <ul className="list-disc pl-6 mt-3 space-y-2">
                            <li><strong>Google AdSense</strong> (publisher ID: ca-pub-4434058814138910) — ad delivery, frequency capping, and ad performance measurement.</li>
                            <li><strong>DoubleClick / Google Ad Manager</strong> — ad auction, bidding, and measurement.</li>
                        </ul>
                        <p className="mt-3 text-sm italic">
                            Third-party advertisers on our site may also use cookies. We do not control these cookies. For more information on how Google uses cookies and data, please see{' '}
                            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-pink-500 underline font-semibold hover:text-pink-400">Google's Advertising Privacy & Terms</a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4">4. Legal Basis (GDPR)</h2>
                        <p>
                            If you are located in the European Economic Area (EEA), the United Kingdom, or Switzerland, our legal basis for using cookies depends on the category:
                        </p>
                        <ul className="list-disc pl-6 mt-3 space-y-2">
                            <li><strong>Strictly Necessary cookies:</strong> our legitimate interest in providing a functional website.</li>
                            <li><strong>Analytics and Advertising cookies:</strong> your explicit consent, obtained through our cookie consent banner.</li>
                        </ul>
                        <p className="mt-3">
                            You can withdraw your consent at any time by clicking "Decline" in the cookie banner or clearing the <code className={`px-2 py-0.5 rounded ${dm ? 'bg-neutral-800' : 'bg-neutral-100'} text-xs font-mono`}>cs_cookie_consent</code> entry from your browser's localStorage.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4">5. How to Manage Cookies</h2>
                        <p>
                            You have several ways to control or disable cookies:
                        </p>
                        <ul className="list-disc pl-6 mt-3 space-y-2">
                            <li><strong>Cookie banner:</strong> choose "Accept" or "Decline" when the banner appears.</li>
                            <li><strong>Browser settings:</strong> most browsers allow you to refuse cookies, delete existing cookies, or notify you when a cookie is set. Look for "Privacy" or "Security" in your browser's settings.</li>
                            <li><strong>"Do Not Track" signals:</strong> we honor Global Privacy Control (GPC) signals where legally required.</li>
                        </ul>
                        <p className="mt-3">
                            Browser-specific guidance:
                        </p>
                        <ul className="list-disc pl-6 mt-3 space-y-2">
                            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-pink-500 underline font-semibold hover:text-pink-400">Google Chrome</a></li>
                            <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-pink-500 underline font-semibold hover:text-pink-400">Mozilla Firefox</a></li>
                            <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-pink-500 underline font-semibold hover:text-pink-400">Apple Safari</a></li>
                            <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-pink-500 underline font-semibold hover:text-pink-400">Microsoft Edge</a></li>
                        </ul>
                        <p className="mt-3 text-sm italic">
                            Please note: blocking all cookies may prevent certain parts of the Service from working properly (e.g., saving your dark-mode preference or recent stickers).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4">6. Opt-Out of Personalized Advertising</h2>
                        <p>
                            To opt out of personalized ads shown by Google and its partners across the web:
                        </p>
                        <ul className="list-disc pl-6 mt-3 space-y-2">
                            <li><a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-pink-500 underline font-semibold hover:text-pink-400">Google Ads Settings</a> — manage ad personalization across Google services.</li>
                            <li><a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-pink-500 underline font-semibold hover:text-pink-400">Digital Advertising Alliance (DAA) opt-out</a> — opt out of interest-based ads from participating companies.</li>
                            <li><a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-pink-500 underline font-semibold hover:text-pink-400">Your Online Choices (EU)</a> — European equivalent for EU residents.</li>
                            <li><a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-pink-500 underline font-semibold hover:text-pink-400">Network Advertising Initiative (NAI) opt-out</a> — opt out of targeted advertising from NAI member companies.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4">7. Changes to This Cookie Policy</h2>
                        <p>
                            We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business practices. The "Last updated" date at the top of this page indicates the most recent revision. We encourage you to review this policy periodically to stay informed about our use of cookies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4">8. Contact Us</h2>
                        <p>
                            If you have any questions about this Cookie Policy or our use of cookies, please contact us at:
                        </p>
                        <div className={`mt-4 rounded-2xl border ${card} p-5`}>
                            <p><strong>Email:</strong> <a href="mailto:support@commentsticker.com" className="text-pink-500 underline font-semibold hover:text-pink-400">support@commentsticker.com</a></p>
                            <p className="mt-2"><strong>Contact form:</strong> <button onClick={() => onNavigate('contact')} className="text-pink-500 underline font-semibold hover:text-pink-400">commentsticker.com/contact</button></p>
                        </div>
                    </section>
                </div>
            </main>

            <SEOFooter onNavigate={onNavigate} />
        </div>
    );
}
