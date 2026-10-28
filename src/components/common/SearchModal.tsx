import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ChevronRight, Zap, ArrowUpRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatINR } from '../../utils/formatters';
import { CATEGORIES } from '../../data/categories';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { products } = useStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = searchTerm.trim() === ''
    ? []
    : products.filter(p => {
        const query = searchTerm.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.categoryName.toLowerCase().includes(query) ||
          p.tags?.some(t => t.toLowerCase().includes(query))
        );
      });

  const handleSelectProduct = (slug: string) => {
    onClose();
    navigate(`/product/${slug}`);
  };

  const handleSelectCategory = (slug: string) => {
    onClose();
    navigate(`/category/${slug}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    onClose();
    navigate(`/shop?q=${encodeURIComponent(searchTerm.trim())}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-start justify-center pt-16 sm:pt-24 px-4 pb-12">
        <div className="relative w-full max-w-2xl rounded-3xl bg-graphite border border-graphite-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Search Header Form */}
          <form onSubmit={handleSearchSubmit} className="relative border-b border-graphite-border bg-charcoal p-4 flex items-center gap-3">
            <Search className="w-5 h-5 text-lime shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by product, brand (ON, Dymatize, MB), or category..."
              className="w-full bg-transparent text-sm sm:text-base text-white placeholder-coolgray-500 focus:outline-none"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="p-1 rounded-lg text-coolgray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold text-coolgray-400 hover:text-white px-2 py-1 rounded-lg hover:bg-graphite transition-colors"
            >
              ESC
            </button>
          </form>

          {/* Body */}
          <div className="p-5 max-h-[60vh] overflow-y-auto">
            
            {/* Live Search Results */}
            {searchTerm.trim() !== '' ? (
              <div>
                <div className="text-xs font-bold text-coolgray-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>Found {filteredProducts.length} results</span>
                  {filteredProducts.length > 0 && (
                    <button
                      onClick={handleSearchSubmit}
                      className="text-lime hover:underline flex items-center gap-1"
                    >
                      <span>View all in shop</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="py-12 text-center text-coolgray-400">
                    <p className="text-sm">No supplements found matching &ldquo;{searchTerm}&rdquo;.</p>
                    <p className="text-xs text-coolgray-500 mt-1">
                      Try searching for &ldquo;Whey&rdquo;, &ldquo;Creatine&rdquo;, &ldquo;Pre-Workout&rdquo;, or &ldquo;Optimum Nutrition&rdquo;.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-graphite-border/60">
                    {filteredProducts.map(p => (
                      <div
                        key={p.id}
                        onClick={() => handleSelectProduct(p.slug)}
                        className="py-3 px-3 rounded-2xl hover:bg-charcoal flex items-center justify-between gap-4 cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-12 h-12 rounded-xl bg-charcoal-700 p-1 flex items-center justify-center shrink-0">
                            <img
                              src={p.images[0] || '/src/assets/product_whey.jpg'}
                              alt={p.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold text-lime uppercase tracking-wider">
                              {p.brand}
                            </span>
                            <h4 className="text-xs font-bold text-white truncate group-hover:text-lime transition-colors">
                              {p.name}
                            </h4>
                            <span className="text-[10px] text-coolgray-400">
                              {p.categoryName}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-black text-white block">
                            {formatINR(p.price)}
                          </span>
                          <span className="text-[10px] text-lime flex items-center gap-0.5 justify-end">
                            <Zap className="w-2.5 h-2.5" />
                            Kakkanad
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Quick Suggestion Chips */
              <div className="space-y-6">
                <div>
                  <h4 className="text-[11px] font-bold text-coolgray-400 uppercase tracking-wider mb-2.5">
                    Popular Categories
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => handleSelectCategory(cat.slug)}
                        className="px-3 py-1.5 rounded-xl bg-charcoal hover:bg-charcoal-700 border border-graphite-border text-xs text-coolgray-200 hover:text-white transition-colors"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[11px] font-bold text-coolgray-400 uppercase tracking-wider mb-2.5">
                    Suggested Searches
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['Whey Isolate', 'German Creapure', 'MuscleBlaze Biozyme', 'C4 Pre-Workout', 'Omega-3', 'Shaker Bottle'].map(tag => (
                      <button
                        key={tag}
                        onClick={() => setSearchTerm(tag)}
                        className="px-3 py-1.5 rounded-xl bg-charcoal/60 hover:bg-lime hover:text-charcoal border border-graphite-border text-xs text-coolgray-400 transition-all font-medium"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-charcoal border border-graphite-border text-xs text-coolgray-400">
                  <span className="text-lime font-bold block mb-1">Local Store In Kakkanad:</span>
                  Looking for same-day local pickup? Contact our team directly on WhatsApp or visit Kusumagiri Jn.
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
