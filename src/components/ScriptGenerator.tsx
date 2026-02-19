import { useState, useEffect } from 'react';
import { FileText, Copy, Check, Clock, RefreshCw, ChevronDown, Sparkles } from 'lucide-react';
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
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Left: Configuration */}
      <div className="space-y-4">
        <div className={`rounded-xl p-5 border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
          <h2 className={`text-sm font-semibold uppercase tracking-wide mb-4 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Configuration du script
          </h2>

          <div className="space-y-4">
            {/* Question */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                Question du commentaire
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ex: Comment tu as commencé ton business ?"
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
                Niche (adapte le vocabulaire et les hooks)
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
            Format de la vidéo
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
              Options avancées
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''} ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`} />
          </button>

          {showAdvanced && (
            <div className="px-5 pb-5 space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>Ton</label>
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
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>Durée</label>
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
          Générer le script
        </button>
      </div>

      {/* Right: Generated Script */}
      <div className={`rounded-xl border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
        <div className={`flex items-center justify-between px-5 py-4 border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
          <div className="flex items-center gap-3">
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
              Script généré
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
                title="Régénérer (nouveau contenu aléatoire)"
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
                {copied ? 'Copié' : 'Copier'}
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
              <p className="font-medium">Aucun script généré</p>
              <p className="text-sm mt-1">Choisis ta niche, ton format et clique sur "Générer"</p>
              <p className="text-xs mt-3 opacity-60">💡 Chaque génération produit un résultat unique</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
