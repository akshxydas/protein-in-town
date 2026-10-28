import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { QuickViewModal } from '../common/QuickViewModal';

export const BestsellersSection: React.FC = () => {
  const { products } = useStore();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'whey-protein' | 'creatine' | 'pre-workout'>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const bestsellers = products.filter(p => p.isBestseller || p.isFeatured);

  const filteredProducts = selectedFilter === 'all'
    ? bestsellers.slice(0, 8)
    : bestsellers.filter(p => p.category === selectedFilter).slice(0, 8);

  return (
    <section className="py-16 sm:py-24 bg-graphite/40 border-b border-graphite-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-lime font-black uppercase tracking-widest text-xs mb-2">
              <Flame className="w-4 h-4 fill-lime" />
              <span>COMMUNITY FAVORITES</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
              BESTSELLERS
            </h2>
            <p className="text-xs sm:text-sm text-coolgray-400 mt-1 max-w-lg">
              Verified top-selling formulas backed by real customer reviews and 100% authentic importer verification codes.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Bestsellers' },
              { id: 'whey-protein', label: 'Whey Protein' },
              { id: 'creatine', label: 'Creatine' },
              { id: 'pre-workout', label: 'Pre-Workout' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedFilter === tab.id
                    ? 'bg-lime text-charcoal shadow-lime-glow-sm'
                    : 'bg-charcoal text-coolgray-400 hover:text-white border border-graphite-border'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={prod => setQuickViewProduct(prod)}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-charcoal hover:bg-charcoal-700 border border-graphite-border hover:border-lime text-white text-xs font-bold uppercase tracking-wider transition-all"
          >
            <span>VIEW ALL PRODUCTS</span>
            <ArrowRight className="w-4 h-4 text-lime" />
          </Link>
        </div>

      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
};
