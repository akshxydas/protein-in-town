import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Filter, 
  Search, 
  SlidersHorizontal, 
  Grid, 
  List, 
  X, 
  RotateCcw, 
  Check, 
  ChevronDown 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, ProductCategory } from '../types';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { formatINR } from '../utils/formatters';

export const ShopPage: React.FC = () => {
  const { products } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search parameter sync
  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || 'all';

  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync state if URL changes
  useEffect(() => {
    if (queryParam) setSearchTerm(queryParam);
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [queryParam, categoryParam]);

  // Extract unique brands from catalogue
  const availableBrands = useMemo(() => {
    const brandsSet = new Set(products.map(p => p.brand));
    return Array.from(brandsSet).sort();
  }, [products]);

  // Max product price calculation
  const highestPrice = useMemo(() => {
    return Math.max(...products.map(p => p.price), 10000);
  }, [products]);

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Search text
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesCat = p.categoryName.toLowerCase().includes(q);
        const matchesTags = p.tags?.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesBrand && !matchesCat && !matchesTags) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Brand
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) {
        return false;
      }

      // In stock
      if (inStockOnly && p.stock <= 0) {
        return false;
      }

      // Price limit
      if (p.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: featured first, then review count
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.reviewCount - a.reviewCount;
    });
  }, [products, searchTerm, selectedCategory, selectedBrand, inStockOnly, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setInStockOnly(false);
    setMaxPrice(highestPrice);
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters = 
    searchTerm !== '' || 
    selectedCategory !== 'all' || 
    selectedBrand !== 'all' || 
    inStockOnly || 
    maxPrice < highestPrice;

  return (
    <div className="bg-charcoal min-h-screen py-8 sm:py-12 border-b border-graphite-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Breadcrumb & Header */}
        <div className="mb-8">
          <div className="text-xs text-coolgray-400 mb-2">
            Home / <span className="text-lime font-bold">Shop Catalogue</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                ALL SUPPLEMENTS
              </h1>
              <p className="text-xs sm:text-sm text-coolgray-400 mt-1">
                Showing {filteredProducts.length} authentic sports nutrition products available in Kakkanad.
              </p>
            </div>

            {/* Mobile Filter Button */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="flex-1 py-3 px-4 rounded-xl bg-graphite border border-graphite-border text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4 text-lime" />
                <span>Filters {hasActiveFilters && '• Active'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar Filters + Main Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="p-6 rounded-3xl bg-graphite border border-graphite-border space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-graphite-border">
                <span className="font-display font-black text-white text-sm uppercase tracking-wider flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-lime" />
                  Filters
                </span>
                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[11px] text-lime hover:underline flex items-center gap-1 font-semibold"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                )}
              </div>

              {/* Keyword Search Field */}
              <div>
                <label className="block text-xs font-bold text-coolgray-300 uppercase tracking-wider mb-2">
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search titles, brands..."
                    className="w-full bg-charcoal border border-graphite-border rounded-xl px-3 py-2.5 text-xs text-white placeholder-coolgray-500 focus:outline-none focus:border-lime"
                  />
                  {searchTerm ? (
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-2.5 text-coolgray-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <Search className="w-3.5 h-3.5 text-coolgray-500 absolute right-3 top-3" />
                  )}
                </div>
              </div>

              {/* Categories Filter */}
              <div>
                <label className="block text-xs font-bold text-coolgray-300 uppercase tracking-wider mb-2">
                  Category
                </label>
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-lime text-charcoal font-bold'
                        : 'text-coolgray-300 hover:bg-charcoal hover:text-white'
                    }`}
                  >
                    <span>All Categories</span>
                    <span>{products.length}</span>
                  </button>
                  {CATEGORIES.map(cat => {
                    const count = products.filter(p => p.category === cat.id).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                          selectedCategory === cat.id
                            ? 'bg-lime text-charcoal font-bold'
                            : 'text-coolgray-300 hover:bg-charcoal hover:text-white'
                        }`}
                      >
                        <span className="truncate">{cat.name}</span>
                        <span className="text-[10px] opacity-70">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brands Filter */}
              <div>
                <label className="block text-xs font-bold text-coolgray-300 uppercase tracking-wider mb-2">
                  Brand
                </label>
                <select
                  value={selectedBrand}
                  onChange={e => setSelectedBrand(e.target.value)}
                  className="w-full bg-charcoal border border-graphite-border rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-lime"
                >
                  <option value="all">All Brands</option>
                  {availableBrands.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Max Price Range Slider */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <label className="font-bold text-coolgray-300 uppercase tracking-wider">
                    Max Price
                  </label>
                  <span className="text-lime font-black">{formatINR(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max={highestPrice}
                  step="100"
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-lime cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-coolgray-500 mt-1">
                  <span>₹300</span>
                  <span>{formatINR(highestPrice)}</span>
                </div>
              </div>

              {/* In Stock Only Checkbox */}
              <div className="pt-2 border-t border-graphite-border">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={e => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded accent-lime"
                  />
                  <span className="text-xs font-semibold text-coolgray-300">
                    In Stock at Kakkanad Only
                  </span>
                </label>
              </div>

            </div>
          </aside>

          {/* Main Product Showcase */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Control Bar: Sorting and View Toggle */}
            <div className="p-4 rounded-2xl bg-graphite border border-graphite-border flex flex-wrap items-center justify-between gap-4">
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-coolgray-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="bg-charcoal border border-graphite-border rounded-xl px-3 py-1.5 text-xs text-white font-semibold focus:outline-none focus:border-lime"
                >
                  <option value="featured">Featured & Best Reviewed</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated (5.0★)</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-coolgray-400 hidden sm:inline">
                  {filteredProducts.length} items
                </span>
                <div className="flex bg-charcoal border border-graphite-border rounded-xl p-0.5">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-graphite text-lime' : 'text-coolgray-500 hover:text-white'
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-graphite text-lime' : 'text-coolgray-500 hover:text-white'
                    }`}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Active Filter Chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-coolgray-400 font-semibold">Active:</span>
                {searchTerm && (
                  <span className="px-3 py-1 rounded-full bg-graphite border border-graphite-border text-xs text-white flex items-center gap-1.5">
                    Search: &ldquo;{searchTerm}&rdquo;
                    <button onClick={() => setSearchTerm('')}><X className="w-3 h-3 text-coolgray-400" /></button>
                  </span>
                )}
                {selectedCategory !== 'all' && (
                  <span className="px-3 py-1 rounded-full bg-graphite border border-graphite-border text-xs text-white flex items-center gap-1.5">
                    Category: {CATEGORIES.find(c => c.id === selectedCategory)?.name}
                    <button onClick={() => setSelectedCategory('all')}><X className="w-3 h-3 text-coolgray-400" /></button>
                  </span>
                )}
                {selectedBrand !== 'all' && (
                  <span className="px-3 py-1 rounded-full bg-graphite border border-graphite-border text-xs text-white flex items-center gap-1.5">
                    Brand: {selectedBrand}
                    <button onClick={() => setSelectedBrand('all')}><X className="w-3 h-3 text-coolgray-400" /></button>
                  </span>
                )}
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-lime hover:underline font-bold ml-2"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Product Cards Listing */}
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center rounded-3xl bg-graphite border border-graphite-border p-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-charcoal flex items-center justify-center mx-auto text-coolgray-500">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white">No products found</h3>
                <p className="text-xs text-coolgray-400 max-w-sm mx-auto">
                  We couldn&apos;t find any supplements matching your selected filters. Try broadening your price range or clearing keyword filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-xl bg-lime text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-lime-hover shadow-lime-glow-sm transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className={
                viewMode === 'grid'
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "grid grid-cols-1 gap-4"
              }>
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={prod => setQuickViewProduct(prod)}
                  />
                ))}
              </div>
            )}

          </main>

        </div>

      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-graphite border-l border-graphite-border p-6 overflow-y-auto space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-graphite-border">
                <h3 className="font-display font-extrabold text-white text-base uppercase">
                  Filters
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 text-coolgray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-coolgray-300 uppercase tracking-wider mb-2">
                  Category
                </label>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex justify-between ${
                      selectedCategory === 'all' ? 'bg-lime text-charcoal font-bold' : 'text-coolgray-300'
                    }`}
                  >
                    <span>All</span>
                    <span>{products.length}</span>
                  </button>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex justify-between ${
                        selectedCategory === cat.id ? 'bg-lime text-charcoal font-bold' : 'text-coolgray-300'
                      }`}
                    >
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-coolgray-300 uppercase tracking-wider mb-2">
                  Brand
                </label>
                <select
                  value={selectedBrand}
                  onChange={e => setSelectedBrand(e.target.value)}
                  className="w-full bg-charcoal border border-graphite-border rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="all">All Brands</option>
                  {availableBrands.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 border-t border-graphite-border space-y-3">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 rounded-xl bg-lime text-charcoal font-black text-xs uppercase tracking-wider shadow-lime-glow-sm"
                >
                  Apply Filters
                </button>
                <button
                  onClick={handleResetFilters}
                  className="w-full py-2 text-center text-xs text-coolgray-400 hover:text-white"
                >
                  Reset All
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
