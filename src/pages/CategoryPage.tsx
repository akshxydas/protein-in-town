import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { Product } from '../types';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { products } = useStore();
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const category = CATEGORIES.find(c => c.slug === slug) || CATEGORIES[0];

  const categoryProducts = useMemo(() => {
    return products
      .filter(p => p.category === category.id)
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.reviewCount - a.reviewCount;
      });
  }, [products, category.id, sortBy]);

  return (
    <div className="bg-charcoal min-h-screen py-8 sm:py-12 border-b border-graphite-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-coolgray-400 mb-6">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-coolgray-600" />
          <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5 text-coolgray-600" />
          <span className="text-lime font-bold">{category.name}</span>
        </div>

        {/* Category Header Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-graphite border border-graphite-border p-8 sm:p-12 mb-10 shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-lime/10 blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="text-lime font-black uppercase tracking-widest text-xs flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COLLECTION</span>
            </span>

            <h1 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight leading-none">
              {category.name}
            </h1>

            <p className="text-sm text-coolgray-300 leading-relaxed pt-1">
              {category.tagline} {category.shortDesc}. Sourced with verifiable importer barcodes directly for our Kakkanad store.
            </p>
          </div>
        </div>

        {/* Control Bar: Product Count & Sort */}
        <div className="p-4 rounded-2xl bg-graphite border border-graphite-border flex items-center justify-between gap-4 mb-8">
          <span className="text-xs text-coolgray-400 font-semibold">
            Showing {categoryProducts.length} products in this category
          </span>

          <div className="flex items-center gap-2">
            <span className="text-xs text-coolgray-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-charcoal border border-graphite-border rounded-xl px-3 py-1.5 text-xs text-white font-semibold focus:outline-none focus:border-lime"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {categoryProducts.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-graphite border border-graphite-border p-8 space-y-4">
            <h3 className="text-lg font-bold text-white">No products currently in this category</h3>
            <p className="text-xs text-coolgray-400">
              New shipments arrive weekly at our Kakkanad store. Check back soon or message us on WhatsApp!
            </p>
            <Link
              to="/shop"
              className="inline-block px-6 py-2.5 rounded-xl bg-lime text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-lime-hover shadow-lime-glow-sm"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={prod => setQuickViewProduct(prod)}
              />
            ))}
          </div>
        )}

      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
