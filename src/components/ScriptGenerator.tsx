import { useState, useEffect } from 'react';
import { FileText, Copy, Check, Clock, RefreshCw, ChevronDown, Sparkles, BookOpen, Lightbulb, ShieldCheck } from 'lucide-react';
import {
  generateScript,
  formatLabels,
  toneLabels,
  lengthLabels,
  nicheLabels,
  type ScriptFormat,
  type ScriptTone,
  type ScriptLength,
  type NicheKey,
} from '../data/scriptPatterns';
import { AdSense } from './AdSense';

interface ScriptGeneratorProps {
  darkMode: boolean;
  initialQuestion?: string;
}

export function ScriptGenerator({ darkMode, initialQuestion = '' }: ScriptGeneratorProps) {
  const [question, setQuestion] = useState(initialQuestion);
  const [niche, setNiche] = useState<NicheKey>('general');
  const [format, setFormat] = useState<ScriptFormat>('direct');
  const [tone, setTone] = useState<ScriptTone>('casual');
  const [length, setLength] = useState<ScriptLength>('medium');
  const [generatedScript, setGeneratedScript] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    if (initialQuestion) setQuestion(initialQuestion);
  }, [initialQuestion]);

  const handleGenerate = () => {
    setGeneratedScript(generateScript(question, format, tone, length, niche));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Configuration */}
        <div className="space-y-4">
          <div className={`rounded-xl p-5 border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
            <h2 className={`text-sm font-semibold uppercase tracking-wide mb-4 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Script Configuration
            </h2>

            <div className="space-y-4">
              {/* Question */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  Comment Question
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ex: How did you start your business?"
                  rows={2}
                  className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors resize-none ${darkMode
                    ? 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 focus:border-neutral-600'
                    : 'bg-neutral-50 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-neutral-300'
                    } focus:outline-none`}
                />
              </div>

              {/* Niche Selector */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  <Sparkles className="w-3.5 h-3.5 inline mr-1.5" />
                  Niche (adapts vocabulary and hooks)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                  {(Object.keys(nicheLabels) as NicheKey[]).map((n) => (
                    <button
                      key={n}
                      onClick={() => setNiche(n)}
                      className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${niche === n
                        ? darkMode ? 'bg-white text-neutral-900' : 'bg-neutral-900 text-white'
                        : darkMode ? 'bg-neutral-800 text-neutral-400 hover:bg-neutral-750' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }`}
                    >
                      <span>{nicheLabels[n].icon}</span>
                      {nicheLabels[n].name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Format Selection */}
          <div className={`rounded-xl p-5 border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
            <h3 className={`text-sm font-semibold uppercase tracking-wide mb-4 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Video Format
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {(Object.keys(formatLabels) as ScriptFormat[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${format === f
                    ? darkMode ? 'bg-white text-neutral-900' : 'bg-neutral-900 text-white'
                    : darkMode ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-750' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{formatLabels[f].icon}</span>
                    <div>
                      <p className="font-medium text-sm">{formatLabels[f].name}</p>
                      <p className={`text-xs mt-0.5 ${format === f ? 'opacity-70' : darkMode ? 'text-neutral-500' : 'text-neutral-500'}`}>
                        {formatLabels[f].desc}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Options */}
          <div className={`rounded-xl border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <span className={`text-sm font-semibold uppercase tracking-wide ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Advanced Options
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''} ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`} />
            </button>

            {showAdvanced && (
              <div className="px-5 pb-5 space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>Tone</label>
                  <div className="flex gap-2">
                    {(Object.keys(toneLabels) as ScriptTone[]).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTone(t)}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${tone === t
                          ? darkMode ? 'bg-white text-neutral-900' : 'bg-neutral-900 text-white'
                          : darkMode ? 'bg-neutral-800 text-neutral-400 hover:bg-neutral-750' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                          }`}
                      >
                        {toneLabels[t]}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>Duration</label>
                  <div className="flex gap-2">
                    {(Object.keys(lengthLabels) as ScriptLength[]).map((l) => (
                      <button
                        key={l}
                        onClick={() => setLength(l)}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${length === l
                          ? darkMode ? 'bg-white text-neutral-900' : 'bg-neutral-900 text-white'
                          : darkMode ? 'bg-neutral-800 text-neutral-400 hover:bg-neutral-750' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                          }`}
                      >
                        <span>{lengthLabels[l].name}</span>
                        <span className="opacity-60 ml-1">({lengthLabels[l].duration})</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm transition-all ${darkMode
              ? 'bg-white text-neutral-900 hover:bg-neutral-100'
              : 'bg-neutral-900 text-white hover:bg-neutral-800'
              }`}
          >
            <FileText className="w-5 h-5" />
            Generate script
          </button>
        </div>

        {/* Right: Generated Script */}
        <div className={`rounded-xl border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
          <div className={`flex items-center justify-between px-5 py-4 border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
            <div className="flex items-center gap-3">
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                Generated script
              </h3>
              {generatedScript && (
                <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-100 text-neutral-500'}`}>
                  <Clock className="w-3 h-3 inline mr-1" />
                  {lengthLabels[length].duration}
                </span>
              )}
            </div>
            {generatedScript && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleGenerate}
                  className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-neutral-100 text-neutral-500'}`}
                  title="Regenerate (new random content)"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${copied
                    ? 'bg-green-500 text-white'
                    : darkMode ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            )}
          </div>

          <div className="p-5 max-h-[600px] overflow-y-auto">
            {generatedScript ? (
              <pre className={`text-sm whitespace-pre-wrap font-sans leading-relaxed ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                {generatedScript}
              </pre>
            ) : (
              <div className={`text-center py-16 ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="font-medium">No script generated</p>
                <p className="text-sm mt-1">Choose your niche, format and click "Generate"</p>
                <p className="text-xs mt-3 opacity-60">💡 Each generation produces a unique result</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- EDITORIAL CONTENT SECTION (AdSense Compliance) --- */}
      <div className="space-y-12 border-t border-neutral-100 dark:border-neutral-800 pt-12">

        {/* Storytelling Secrets */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <BookOpen className={`w-7 h-7 ${darkMode ? 'text-pink-500' : 'text-pink-600'}`} />
            <h2 className="text-3xl font-black">Mastering the Art of the 15-Second Response</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "The Hook (0-3s)",
                desc: "Your hook is the absolute most important part of your video. By starting with a comment sticker and a direct answer, you stop the scroll and establish a clear reason to watch."
              },
              {
                title: "The Value (3-12s)",
                desc: "Don't ramble. Give the viewer exactly what they asked for in the comment. Be concise, energetic, and use visual aids or screen recordings to support your point."
              },
              {
                title: "The CTA (12-15s)",
                desc: "Never end a video without telling the viewer what to do next. Whether it's 'check the link in bio' or 'follow for more tips', a clear call to action doubles conversion rates."
              }
            ].map((box, i) => (
              <div key={i} className={`p-6 rounded-3xl border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                <h3 className="font-black text-lg mb-3">{box.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">{box.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AdSense slot */}
        <div className="py-6 border-y border-neutral-100 dark:border-neutral-900">
          <p className={`text-[10px] font-black uppercase tracking-widest mb-4 text-center ${darkMode ? 'text-neutral-600' : 'text-neutral-400'}`}>Professional Insights</p>
          <AdSense adSlot="4455667788" />
        </div>

        {/* Best Practices */}
        <section className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-black">UGC Scripting Best Practices</h2>
            </div>
            <ul className="space-y-4">
              {[
                "Keep your sentences short and punchy.",
                "Use high-energy delivery for the first 3 seconds.",
                "Ensure your audio quality is crisp (use a mic!).",
                "Address the persona behind the comment directly.",
                "End with a clear, single call to action."
              ].map((tip, i) => (
                <li key={i} className="flex gap-3 text-sm font-medium text-neutral-500">
                  <div className="w-5 h-5 rounded-full bg-pink-500/10 text-pink-500 flex items-center justify-center shrink-0 font-bold text-[10px]">{i + 1}</div>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
          <div className={`p-8 rounded-[2rem] space-y-4 ${darkMode ? 'bg-neutral-900' : 'bg-neutral-50'}`}>
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
              <h3 className="text-xl font-black">Quality Guarantee</h3>
            </div>
            <p className="text-sm text-neutral-500 leading-relaxed font-medium">
              Our AI script generator uses proven direct-response marketing formulas (AIDA, PAS, Hook-Value-CTA) to ensure that every script generated is optimized for social media engagement. While the AI provides a solid foundation, we always recommend adding your personal touch and unique brand voice to every video you create.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
