import { ArrowLeft, FileText, Scale, Zap, ShieldCheck, AlertTriangle } from 'lucide-react';

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

                <p className={`text-sm font-medium mb-10 ${darkMode ? 'text-neutral-500' : 'text-neutral-500'}`}>Last updated: 16 May 2026</p>

                <div className={`prose prose-neutral ${darkMode ? 'prose-invert' : ''} max-w-none space-y-10 text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed`}>
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                            <Zap className="w-5 h-5 text-orange-500" />
                            1. Acceptance of Terms
                        </h2>
                        <p>
                            By accessing or using CommentSticker ("the Service"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                            <Scale className="w-5 h-5 text-orange-500" />
                            2. License Granted
                        </h2>
                        <p>
                            CommentSticker grants you a worldwide, royalty-free, non-exclusive license to use the Service and the assets it generates (transparent PNG and JPEG comment mockup overlays, hashtag lists, captions, hook variants and other content output) for personal and commercial purposes, subject to the Acceptable Use policy below.
                        </p>
                        <p>
                            You retain all rights to the text, avatar and other inputs you submit to the generator. Mockup generation runs client-side in your browser; we do not store, transmit or claim ownership of your inputs.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-emerald-500" />
                            3. Acceptable Use Policy
                        </h2>
                        <p>
                            CommentSticker is intended for <strong className="text-neutral-900 dark:text-white">creative and illustrative purposes</strong> — UGC ad creatives, content tutorials, demo videos, slide presentations, blog illustrations, creator portfolios, storyboards and educational materials. Comment mockup overlays are a documented creative pattern in the short-form video advertising industry.
                        </p>

                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-6">3.1 Permitted uses</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Building hook overlays for UGC ad creatives where the comment text is authored by you as a creative illustration.</li>
                            <li>Illustrating content tutorials, courses or YouTube walkthroughs on UGC strategy and short-form copywriting.</li>
                            <li>Producing creator portfolio examples, agency pitch decks, internal storyboards and concept boards.</li>
                            <li>Generating blog illustrations and presentation slides that visualize the comment-UI pattern.</li>
                        </ul>

                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-6 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500" />
                            3.2 Prohibited uses
                        </h3>
                        <p>You agree not to use the Service to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong className="text-neutral-900 dark:text-white">Impersonate a real person</strong> by combining their name, handle, photo or likeness with a comment they did not write.</li>
                            <li><strong className="text-neutral-900 dark:text-white">Fabricate evidence</strong> for use in any legal, financial, employment, journalistic or interpersonal dispute, or to create the appearance of a real conversation that did not occur.</li>
                            <li><strong className="text-neutral-900 dark:text-white">Present a mockup as a real comment</strong> — for example by posting a screenshot of a mockup as if it were a real screenshot of a third-party social media comment.</li>
                            <li><strong className="text-neutral-900 dark:text-white">Mislead consumers</strong> about a product's qualities, endorsement status, customer reviews, or testimonial authenticity in violation of consumer-protection law (including but not limited to the FTC Endorsement Guides in the United States, the ASA CAP Code in the United Kingdom, and equivalent national rules in your jurisdiction).</li>
                            <li><strong className="text-neutral-900 dark:text-white">Violate any social media platform's Terms of Service</strong> or community guidelines, including but not limited to TikTok, Instagram, YouTube, Twitter/X, Facebook, Threads, Snapchat, Discord and LinkedIn.</li>
                            <li><strong className="text-neutral-900 dark:text-white">Defame, harass, threaten or discriminate against</strong> any individual or group.</li>
                            <li><strong className="text-neutral-900 dark:text-white">Generate content that depicts</strong> minors in any sexualized context, illegal activity, hate speech, or content that violates applicable law.</li>
                            <li><strong className="text-neutral-900 dark:text-white">Circumvent or interfere</strong> with the technical operation of the Service, scrape it at unreasonable rates, or resell access to it.</li>
                        </ul>

                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-6">3.3 Required disclosures when advertising</h3>
                        <p>
                            Where you use a comment mockup overlay inside paid advertising, you are responsible for following your jurisdiction's disclosure rules for advertising, endorsements and testimonials. In particular, do not represent a mockup as a real customer testimonial. If your ad's narrative depends on the appearance of a real third-party comment, you must use an actual screenshot of that comment with the commenter's consent and the platform's authorization — not a mockup.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">4. Editorial Standards</h2>
                        <p>
                            The blog, guides and industry-context sections of CommentSticker are produced by our editorial team. Content is sourced from platform-published documentation, independent performance-marketing research and direct platform observation. Every guide is date-stamped and reviewed quarterly. Reader-flagged factual errors are corrected within seven business days; the correction is logged at the bottom of the affected page. Read the full editorial standards on our <button onClick={() => onNavigate('about')} className="underline text-pink-500 font-bold">About page</button>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">5. Disclaimer</h2>
                        <p>
                            The Service is provided on an "as is" and "as available" basis. CommentSticker makes no warranties, expressed or implied, and disclaims all warranties including, without limitation, implied warranties of merchantability, fitness for a particular purpose, non-infringement and accuracy of content. CommentSticker is not affiliated with TikTok, Meta Platforms, YouTube, Twitter/X, Snap, Discord or any other social-media platform whose UI is replicated by the generator. Platform names, logos and UI elements are the property of their respective owners.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">6. Limitation of Liability</h2>
                        <p>
                            In no event shall CommentSticker, its operators or its suppliers be liable for any damages (including, without limitation, damages for loss of data, loss of profit, business interruption, or any indirect or consequential damages) arising out of or in connection with the use or inability to use the Service, even if CommentSticker has been notified of the possibility of such damages.
                        </p>
                        <p>
                            You are solely responsible for the content you create using the Service and for ensuring that your use complies with applicable law and the Acceptable Use policy above. CommentSticker is not liable for any consequence of a user's violation of the Acceptable Use policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">7. Enforcement</h2>
                        <p>
                            CommentSticker reserves the right to refuse service, block IP addresses, and cooperate with law enforcement in response to use of the Service that violates the Acceptable Use policy or applicable law. Notify us at <a href="mailto:contact@commentsticker.com" className="underline text-pink-500 font-bold">contact@commentsticker.com</a> if you become aware of any violation.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">8. Changes to these Terms</h2>
                        <p>
                            We may update these Terms from time to time to reflect changes in our service, applicable law or industry practice. The "Last updated" date at the top of this page reflects the most recent revision. Continued use of the Service after a revision constitutes acceptance of the revised Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">9. Contact</h2>
                        <p>
                            For questions about these Terms, the Acceptable Use policy or any related matter, contact us via the <button onClick={() => onNavigate('contact')} className="underline text-pink-500 font-bold">Contact page</button> or at <a href="mailto:contact@commentsticker.com" className="underline text-pink-500 font-bold">contact@commentsticker.com</a>.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}
