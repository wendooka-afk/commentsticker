import { useState, useMemo } from 'react';
import { Search, Shuffle, ArrowRight, Copy, Check, ChevronDown } from 'lucide-react';
import { nicheData, trendingKeywords, questionStarters } from '../data/questions';
import { AdSense } from './AdSense';

interface QuestionFinderProps {
  darkMode: boolean;
  onSelectQuestion: (question: string) => void;
}

export function QuestionFinder({ darkMode, onSelectQuestion }: QuestionFinderProps) {
  const [selectedNiche, setSelectedNiche] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showAllNiches, setShowAllNiches] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<'tiktok' | 'youtube' | 'instagram'>('tiktok');
  const [filterStarter, setFilterStarter] = useState<string | null>(null);

  const currentNiche = selectedNiche ? nicheData.find(n => n.niche === selectedNiche) : null;

  const filteredQuestions = useMemo(() => {
    if (!currentNiche) return [];

    let questions = currentNiche.questions;

    if (searchQuery) {
      questions = questions.filter(q =>
        q.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterStarter) {
      questions = questions.filter(q =>
        q.toLowerCase().startsWith(filterStarter.toLowerCase())
      );
    }

    return questions;
  }, [currentNiche, searchQuery, filterStarter]);

  const allQuestions = useMemo(() => {
    if (selectedNiche) return [];

    let questions = nicheData.flatMap(n =>
      n.questions.map(q => ({ question: q, niche: n.niche, icon: n.icon }))
    );

    if (searchQuery) {
      questions = questions.filter(q =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.niche.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return questions.slice(0, 30);
  }, [selectedNiche, searchQuery]);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleRandomQuestion = () => {
    const allQ = nicheData.flatMap(n => n.questions);
    const randomQ = allQ[Math.floor(Math.random() * allQ.length)];
    onSelectQuestion(randomQ);
  };

  const displayedNiches = showAllNiches ? nicheData : nicheData.slice(0, 6);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a question or niche..."
          className={`w-full pl-12 pr-4 py-4 rounded-xl border text-sm transition-colors ${darkMode
            ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 focus:border-neutral-700'
            : 'bg-white border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-neutral-300'
            } focus:outline-none`}
        />
      </div>

      {/* Niche Selector */}
      <div className={`rounded-xl p-5 border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
            Choose your niche
          </h3>
          {selectedNiche && (
            <button
              onClick={() => setSelectedNiche(null)}
              className={`text-xs font-medium ${darkMode ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              View all
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {displayedNiches.map((niche) => (
            <button
              key={niche.niche}
              onClick={() => setSelectedNiche(selectedNiche === niche.niche ? null : niche.niche)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg text-left transition-all ${selectedNiche === niche.niche
                ? darkMode ? 'bg-white text-neutral-900' : 'bg-neutral-900 text-white'
                : darkMode
                  ? 'bg-neutral-800 hover:bg-neutral-750 text-neutral-300'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
            >
              <span className="text-lg">{niche.icon}</span>
              <span className="text-sm font-medium truncate">{niche.niche.split(' / ')[0]}</span>
            </button>
          ))}
        </div>

        {!showAllNiches && nicheData.length > 6 && (
          <button
            onClick={() => setShowAllNiches(true)}
            className={`mt-3 flex items-center gap-1 text-xs font-medium ${darkMode ? 'text-neutral-500 hover:text-neutral-300' : 'text-neutral-400 hover:text-neutral-600'}`}
          >
            <ChevronDown className="w-4 h-4" />
            View more ({nicheData.length - 6})
          </button>
        )}
      </div>

      {/* Trending Keywords */}
      <div className={`rounded-xl p-5 border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
            Trending keywords
          </h3>
          <div className="flex gap-1">
            {(['tiktok', 'youtube', 'instagram'] as const).map((platform) => (
              <button
                key={platform}
                onClick={() => setSelectedPlatform(platform)}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${selectedPlatform === platform
                  ? darkMode ? 'bg-white text-neutral-900' : 'bg-neutral-900 text-white'
                  : darkMode ? 'bg-neutral-800 text-neutral-500' : 'bg-neutral-100 text-neutral-500'
                  }`}
              >
                {platform === 'tiktok' ? 'TikTok' : platform === 'youtube' ? 'YouTube' : 'IG'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {trendingKeywords[selectedPlatform].slice(0, 12).map((keyword) => (
            <span
              key={keyword}
              className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full ${darkMode ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-100 text-neutral-600'
                }`}
            >
              #{keyword}
            </span>
          ))}
        </div>
      </div>

      {/* Question Starters Filter */}
      {selectedNiche && (
        <div className={`rounded-xl p-5 border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
          <h3 className={`text-xs font-semibold uppercase tracking-wide mb-4 ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
            Filter by type
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterStarter(null)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${filterStarter === null
                ? darkMode ? 'bg-white text-neutral-900' : 'bg-neutral-900 text-white'
                : darkMode ? 'bg-neutral-800 text-neutral-500 hover:bg-neutral-700' : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                }`}
            >
              All
            </button>
            {questionStarters.slice(0, 8).map((starter) => (
              <button
                key={starter}
                onClick={() => setFilterStarter(filterStarter === starter ? null : starter)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${filterStarter === starter
                  ? darkMode ? 'bg-white text-neutral-900' : 'bg-neutral-900 text-white'
                  : darkMode ? 'bg-neutral-800 text-neutral-500 hover:bg-neutral-700' : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                  }`}
              >
                {starter}...
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className={`rounded-xl p-5 border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
            {selectedNiche ? `Questions — ${selectedNiche.split(' / ')[0]}` : 'Popular questions'}
          </h3>
          <button
            onClick={handleRandomQuestion}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${darkMode ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
          >
            <Shuffle className="w-3.5 h-3.5" />
            Random
          </button>
        </div>

        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
          {selectedNiche ? (
            filteredQuestions.length > 0 ? (
              filteredQuestions.map((question, i) => (
                <div
                  key={i}
                  className={`group flex items-center justify-between gap-3 p-4 rounded-lg transition-all ${darkMode ? 'bg-neutral-800 hover:bg-neutral-750' : 'bg-neutral-50 hover:bg-neutral-100'
                    }`}
                >
                  <p className={`flex-1 text-sm ${darkMode ? 'text-neutral-200' : 'text-neutral-800'}`}>
                    {question}
                  </p>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleCopy(question, i)}
                      className={`p-2 rounded-lg transition-colors ${copiedIndex === i
                        ? 'bg-green-500 text-white'
                        : darkMode ? 'bg-neutral-700 hover:bg-neutral-600 text-neutral-400' : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-600'
                        }`}
                    >
                      {copiedIndex === i ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => onSelectQuestion(question)}
                      className={`flex items-center gap-1 px-3 py-2 text-xs font-medium rounded-lg transition-all ${darkMode ? 'bg-white text-neutral-900 hover:bg-neutral-100' : 'bg-neutral-900 text-white hover:bg-neutral-800'
                        }`}
                    >
                      Use
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className={`text-center py-12 ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No questions found</p>
              </div>
            )
          ) : (
            allQuestions.length > 0 ? (
              allQuestions.map((item, i) => (
                <div
                  key={i}
                  className={`group flex items-center justify-between gap-3 p-4 rounded-lg transition-all ${darkMode ? 'bg-neutral-800 hover:bg-neutral-750' : 'bg-neutral-50 hover:bg-neutral-100'
                    }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm">{item.icon}</span>
                      <span className={`text-xs ${darkMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                        {item.niche.split(' / ')[0]}
                      </span>
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-neutral-200' : 'text-neutral-800'}`}>
                      {item.question}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <button
                      onClick={() => handleCopy(item.question, i)}
                      className={`p-2 rounded-lg transition-colors ${copiedIndex === i
                        ? 'bg-green-500 text-white'
                        : darkMode ? 'bg-neutral-700 hover:bg-neutral-600 text-neutral-400' : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-600'
                        }`}
                    >
                      {copiedIndex === i ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => onSelectQuestion(item.question)}
                      className={`flex items-center gap-1 px-3 py-2 text-xs font-medium rounded-lg transition-all ${darkMode ? 'bg-white text-neutral-900 hover:bg-neutral-100' : 'bg-neutral-900 text-white hover:bg-neutral-800'
                        }`}
                    >
                      Use
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className={`text-center py-12 ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                <p className="text-sm">Select a niche or search for a keyword</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Tip */}
      <div className={`rounded-xl p-5 border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-100 border-neutral-200'}`}>
        <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
          <span className="font-semibold">Tip:</span> "Replying to a subscriber" videos create a direct connection with your audience.
          Use these questions as visual hooks for your videos.
        </p>
      </div>

      {/* --- EDITORIAL CONTENT SECTION (AdSense Compliance) --- */}
      <div className="mt-10 space-y-8 border-t border-neutral-100 dark:border-neutral-800 pt-8">

        {/* Why Questions Work */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black">Why Comment Questions Are the #1 TikTok Hook</h2>
          <p className={`text-sm font-medium leading-relaxed ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            The comment-reply video format has become one of the highest-performing content strategies on TikTok, Instagram Reels, and YouTube Shorts. When a viewer sees a creator responding to a specific comment, the brain immediately processes it as social proof — proof that real people asked this question, and that the answer matters. This creates an immediate curiosity loop that significantly improves watch time and saves rates, two of the most important signals for algorithm distribution.
          </p>
          <p className={`text-sm font-medium leading-relaxed ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Our Question Finder database contains hundreds of battle-tested, high-engagement questions across all major niches. These questions are based on real comment patterns observed in top-performing short-form content, categorized by niche so you can instantly find the most relevant hook for your next video.
          </p>
        </section>

        {/* Strategies */}
        <section className={`p-6 rounded-2xl border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
          <h3 className="font-black text-lg mb-4">3 Strategies to Use These Questions Effectively</h3>
          <div className="space-y-4">
            {[
              { num: "01", title: "Use as a Video Hook", desc: "Start your video with the generated comment sticker visible on screen for the first 3-5 seconds. This immediately communicates the topic of your video and gives the viewer a reason to keep watching to hear your answer." },
              { num: "02", title: "Script the Answer Before Recording", desc: "Use our AI Script Generator to turn any question into a full, structured video script. This saves time and ensures your videos always follow a proven narrative structure that retains viewers to the end." },
              { num: "03", title: "A/B Test Different Questions", desc: "Test two different questions as hooks for the same core piece of content. The one with higher watch-time wins. Over time, this data reveals exactly which pain points resonate most with your specific audience." },
            ].map((s) => (
              <div key={s.num} className="flex gap-4">
                <div className={`text-2xl font-black shrink-0 ${darkMode ? 'text-neutral-700' : 'text-neutral-200'}`}>{s.num}</div>
                <div>
                  <h4 className="font-black mb-1">{s.title}</h4>
                  <p className={`text-sm font-medium leading-relaxed ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AdSense */}
        <div className="pt-4">
          <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${darkMode ? 'text-neutral-600' : 'text-neutral-400'}`}>Sponsored</p>
          <AdSense adSlot="2233445566" />
        </div>
      </div>
    </div>
  );
}

