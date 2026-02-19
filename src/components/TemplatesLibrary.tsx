import { useState } from 'react';
import { Copy, Check, ArrowRight, Search } from 'lucide-react';
import { commentTemplates, templateCategories } from '../data/templates';

interface TemplatesLibraryProps {
  darkMode: boolean;
  onSelectTemplate: (text: string) => void;
}

export function TemplatesLibrary({ darkMode, onSelectTemplate }: TemplatesLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredTemplates = commentTemplates.filter(t => {
    const matchesCategory = !selectedCategory || t.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      t.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un template..."
          className={`w-full pl-12 pr-4 py-4 rounded-xl border text-sm transition-colors ${
            darkMode 
              ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 focus:border-neutral-700' 
              : 'bg-white border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-neutral-300'
          } focus:outline-none`}
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedCategory === null
              ? darkMode ? 'bg-white text-neutral-900' : 'bg-neutral-900 text-white'
              : darkMode ? 'bg-neutral-900 text-neutral-500 hover:bg-neutral-800 border border-neutral-800' : 'bg-white text-neutral-500 hover:bg-neutral-100 border border-neutral-200'
          }`}
        >
          Tous
        </button>
        {templateCategories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === cat.name
                ? darkMode ? 'bg-white text-neutral-900' : 'bg-neutral-900 text-white'
                : darkMode ? 'bg-neutral-900 text-neutral-500 hover:bg-neutral-800 border border-neutral-800' : 'bg-white text-neutral-500 hover:bg-neutral-100 border border-neutral-200'
            }`}
          >
            <span>{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className={`rounded-xl p-5 border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
            {selectedCategory || 'Tous les templates'} ({filteredTemplates.length})
          </h3>
        </div>

        <div className="grid gap-2 max-h-[600px] overflow-y-auto pr-2">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className={`group p-4 rounded-lg transition-all ${
                darkMode ? 'bg-neutral-800 hover:bg-neutral-750' : 'bg-neutral-50 hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base">{template.icon}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      darkMode ? 'bg-neutral-700 text-neutral-400' : 'bg-neutral-200 text-neutral-500'
                    }`}>
                      {template.category}
                    </span>
                  </div>
                  <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-neutral-100' : 'text-neutral-900'}`}>
                    "{template.text}"
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                    {template.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleCopy(template.text, template.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      copiedId === template.id
                        ? 'bg-green-500 text-white'
                        : darkMode ? 'bg-neutral-700 hover:bg-neutral-600 text-neutral-400' : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-600'
                    }`}
                  >
                    {copiedId === template.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => onSelectTemplate(template.text)}
                    className={`flex items-center gap-1 px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                      darkMode ? 'bg-white text-neutral-900 hover:bg-neutral-100' : 'bg-neutral-900 text-white hover:bg-neutral-800'
                    }`}
                  >
                    Utiliser
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredTemplates.length === 0 && (
            <div className={`text-center py-12 ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
              <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Aucun template trouvé</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
