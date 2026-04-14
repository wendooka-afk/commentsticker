import { ArrowLeft, Shield } from 'lucide-react';
import { SEOHeader, SEOFooter } from './SEOLayout';

interface LegalPageProps {
    darkMode: boolean;
    onNavigate: (page: any) => void;
}

export function PrivacyPolicy({ darkMode, onNavigate }: LegalPageProps) {
    const dm = darkMode;
    const muted = dm ? 'text-neutral-400' : 'text-neutral-600';
    const card = dm ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm';

    return (
        <div className={`min-h-screen font-sans ${dm ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
            <SEOHeader onNavigate={onNavigate} darkMode={dm} />

            <main className="max-w-4xl mx-auto px-6 py-32">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-500">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase tracking-widest text-pink-500 mb-1">Legal</p>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight">Privacy Policy</h1>
                    </div>
                </div>
                <p className={`text-sm ${muted} mb-12`}>Last updated: April 14, 2026 &nbsp;·&nbsp; Effective date: April 14, 2026</p>

                <div className={`space-y-10 ${muted} font-medium leading-relaxed`}>

                    <section>
                        <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4">1. Introduction</h2>
                        <p>
                            CommentSticker ("we", "us", or "our") operates the website <strong>commentsticker.com</strong> (the "Service"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this policy carefully. If you do not agree with its terms, please stop using the Service.
                        </p>
                        <p className="mt-3">
                            We are committed to protecting your personal information and your right to privacy in compliance with applicable laws, including the General Data Protection Regulation (GDPR) for users in the European Economic Area (EEA), the California Consumer Privacy Act (CCPA) for California residents, and other applicable data protection laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4">2. Information We Collect</h2>
                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">2.1 Information You Provide Directly</h3>
                        <p>
                            We only collect information you voluntarily provide. This includes information submitted through our Contact form (name, email address, message content). We do not require account registration to use our core tools.
                        </p>
                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-5 mb-2">2.2 Automatically Collected Information</h3>
                        <p>
                            When you visit the Service, certain information is automatically collected by our servers and third-party analytics providers, including:
                        </p>
                        <ul className="list-disc pl-6 mt-3 space-y-2">
                            <li><strong>Usage data:</strong> pages visited, time spent, referral source, clicks, and scroll depth.</li>
                            <li><strong>Device information:</strong> browser type and version, operating system, screen resolution, and device type.</li>
                            <li><strong>IP address:</strong> used to derive approximate geographic location (country/region level only).</li>
                            <li><strong>Cookies and similar technologies:</strong> small text files stored on your device (see Section 4 for details).</li>
                        </ul>
                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-5 mb-2">2.3 Information We Do NOT Collect</h3>
                        <p>
                            All images you upload to generate stickers are processed entirely within your browser using client-side JavaScript. No images, usernames, or comment text you enter into our tools are ever transmitted to or stored on our servers. We do not collect any biometric data, financial data, or sensitive personal data.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4">3. How We Use Your Information</h2>
                        <p>We use the information we collect for the following purposes:</p>
                        <ul className="list-disc pl-6 mt-3 space-y-2">
                            <li><strong>To operate and improve the Service:</strong> analyzing usage patterns to improve tool performance, fix bugs, and prioritize new features.</li>
                            <li><strong>To respond to your inquiries:</strong> if you contact us via the contact form, we use your email and message to reply.</li>
                            <li><strong>To serve relevant advertising:</strong> we use Google AdSense to display advertisements on the Service. This requires sharing certain data with Google (see Section 5).</li>
                            <li><strong>To ensure security:</strong> detecting and preventing fraudulent traffic, scraping, or abuse of our tools.</li>
                            <li><strong>To comply with legal obligations:</strong> responding to lawful requests from authorities where required by applicable law.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4">4. Cookies and Tracking Technologies</h2>
                        <p>
                            We use cookies and similar tracking technologies to collect and store certain information. Cookies are small data files placed on your device.
                        </p>
                        <div className={`mt-4 rounded-2xl border p-5 ${card}`}>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left">
                                        <th className="pb-3 font-black text-xs uppercase tracking-widest">Type</th>
                                        <th className="pb-3 font-black text-xs uppercase tracking-widest">Purpose</th>
                                        <th className="pb-3 font-black text-xs uppercase tracking-widest">Provider</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                                    <tr>
                                        <td className="py-3 font-semibold">Essential</td>
                                        <td className="py-3">Cookie consent preferences, dark mode preference (localStorage)</td>
                                        <td className="py-3">CommentSticker</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 font-semibold">Analytics</td>
                                        <td className="py-3">Visitor counts, page views, traffic sources</td>
                                        <td className="py-3">Google Analytics</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 font-semibold">Advertising</td>
                                        <td className="py-3">Personalized ad targeting, frequency capping</td>
                                        <td className="py-3">Google AdSense</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-4">
                            You can control and manage cookies through your browser settings. You may also opt out of personalized advertising by visiting the <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline font-semibold">Google Ads Settings</a> or by using the <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline font-semibold">NAI Opt-Out Tool</a>. Note that disabling cookies may affect the functionality of the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4">5. Google AdSense and the DART Cookie</h2>
                        <p>
                            CommentSticker uses Google AdSense, a third-party advertising service provided by Google LLC. Google AdSense uses the DART cookie to serve ads to users based on their visit to our site and other sites on the Internet.
                        </p>
                        <p className="mt-3">
                            Google's use of advertising cookies enables it and its partners to serve ads based on users' visits to this site and/or other sites on the Internet. Google may use data collected to personalize ads shown to you across different websites. This is governed by <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline font-semibold">Google's Privacy Policy</a>.
                        </p>
                        <p className="mt-3">
                            We have implemented the following AdSense features on this site: Interest-based advertising. You may opt out of personalized advertising at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline font-semibold">google.com/settings/ads</a>.
                        </p>
                        <p className="mt-3">
                            For EEA users, we obtain your consent before displaying personalized ads in accordance with the EU User Consent Policy. Non-personalized ads may still be shown without consent.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4">6. Third-Party Services</h2>
                        <p>We use the following third-party services that may collect data independently:</p>
                        <ul className="list-disc pl-6 mt-3 space-y-2">
                            <li><strong>Google Analytics:</strong> for website traffic analysis. Data is anonymized where possible. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">Privacy Policy</a>.</li>
                            <li><strong>Google AdSense:</strong> for advertising. Subject to Google's advertising policies. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">Privacy Policy</a>.</li>
                            <li><strong>Unsplash:</strong> some guide pages display images served from Unsplash's CDN. <a href="https://unsplash.com/privacy" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">Privacy Policy</a>.</li>
                            <li><strong>Hostinger:</strong> our web hosting provider. Server access logs may be retained for up to 30 days. <a href="https://www.hostinger.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">Privacy Policy</a>.</li>
                        </ul>
                        <p className="mt-4">
                            We are not responsible for the privacy practices of these third parties. We encourage you to review their respective privacy policies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4">7. Data Retention</h2>
                        <p>
                            We retain personal data only for as long as necessary to fulfill the purposes outlined in this policy:
                        </p>
                        <ul className="list-disc pl-6 mt-3 space-y-2">
                            <li><strong>Contact form submissions:</strong> retained for up to 12 months, then deleted.</li>
                            <li><strong>Analytics data:</strong> retained for 26 months in Google Analytics (standard retention period), then automatically deleted.</li>
                            <li><strong>Server access logs:</strong> retained for up to 30 days by our hosting provider.</li>
                            <li><strong>LocalStorage data</strong> (dark mode preference, generator history): stored only on your device. You can clear it at any time via your browser settings.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4">8. Your Rights (GDPR &amp; CCPA)</h2>
                        <p>Depending on your location, you may have the following rights regarding your personal data:</p>
                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                            {[
                                { right: "Right of Access", desc: "Request a copy of the personal data we hold about you." },
                                { right: "Right to Rectification", desc: "Request correction of inaccurate or incomplete data." },
                                { right: "Right to Erasure", desc: "Request deletion of your personal data ('right to be forgotten')." },
                                { right: "Right to Restriction", desc: "Request that we restrict processing of your data." },
                                { right: "Right to Portability", desc: "Request your data in a structured, machine-readable format." },
                                { right: "Right to Object", desc: "Object to processing based on legitimate interests or for direct marketing." },
                                { right: "Right to Opt Out (CCPA)", desc: "California residents may opt out of the sale of personal information. We do not sell personal information." },
                                { right: "Right to Non-Discrimination", desc: "We will not discriminate against you for exercising any privacy rights." },
                            ].map((item, i) => (
                                <div key={i} className={`p-4 rounded-xl border ${card}`}>
                                    <p className="font-black text-neutral-900 dark:text-white text-sm mb-1">{item.right}</p>
                                    <p className="text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-5">
                            To exercise any of these rights, please contact us at <a href="mailto:support@commentsticker.com" className="text-pink-500 hover:underline font-semibold">support@commentsticker.com</a>. We will respond within 30 days (GDPR) or 45 days (CCPA) of receiving your request.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4">9. Children's Privacy</h2>
                        <p>
                            The Service is not directed to children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us at <a href="mailto:support@commentsticker.com" className="text-pink-500 hover:underline font-semibold">support@commentsticker.com</a> and we will delete such information promptly.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4">10. International Data Transfers</h2>
                        <p>
                            Your information may be transferred to and processed in countries outside your country of residence, including the United States, where our third-party service providers (Google, Hostinger) operate. When transferring data from the EEA, we ensure appropriate safeguards are in place, including Standard Contractual Clauses (SCCs) as approved by the European Commission.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4">11. Security</h2>
                        <p>
                            We implement reasonable technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security, and we encourage you to use strong passwords and be cautious about what information you share online.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4">12. Changes to This Privacy Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the "Last updated" date at the top of this page. We encourage you to review this policy periodically. Your continued use of the Service after any changes constitutes your acceptance of the new policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4">13. Contact Us</h2>
                        <p>
                            If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                        </p>
                        <div className={`mt-4 p-6 rounded-2xl border ${card}`}>
                            <p className="font-black text-neutral-900 dark:text-white mb-1">CommentSticker</p>
                            <p>Email: <a href="mailto:support@commentsticker.com" className="text-pink-500 hover:underline font-semibold">support@commentsticker.com</a></p>
                            <p className="mt-2">Website: <a href="https://commentsticker.com" className="text-pink-500 hover:underline font-semibold">commentsticker.com</a></p>
                            <p className="mt-3 text-sm">
                                If you are located in the EEA and believe we have not adequately addressed your concerns, you have the right to lodge a complaint with your local data protection supervisory authority.
                            </p>
                        </div>
                    </section>

                </div>
            </main>

            <SEOFooter onNavigate={onNavigate} />
        </div>
    );
}
