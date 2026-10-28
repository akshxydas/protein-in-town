import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  ShoppingBag, 
  Zap, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  MapPin, 
  Check, 
  Plus, 
  Minus, 
  MessageCircle, 
  ChevronRight, 
  Share2, 
  AlertTriangle,
  Info
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductVariant, Product } from '../types';
import { formatINR, createProductWhatsAppMessage, createWhatsAppUrl } from '../utils/formatters';
import { ProductCard } from '../components/common/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { products, settings } = useStore();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  // Find product by slug or fallback
  const product = products.find(p => p.slug === slug) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'nutrition' | 'directions' | 'compliance'>('desc');
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync selected variant when product changes
  useEffect(() => {
    if (product && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
      setActiveImageIndex(0);
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [product]);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
  };

  const handleBuyNow = () => {
    addItem(product, selectedVariant, quantity);
    navigate('/checkout');
  };

  const handleWhatsAppInquiry = () => {
    const message = createProductWhatsAppMessage(
      product.name,
      selectedVariant.name,
      selectedVariant.price,
      window.location.href
    );
    const url = createWhatsAppUrl(settings.whatsapp, message);
    window.open(url, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} at PROTEIN IN TOWN Kakkanad!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Related products from same category
  const relatedProducts = useMemo(() => {
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [products, product]);

  const discountPercent = selectedVariant.originalPrice && selectedVariant.originalPrice > selectedVariant.price
    ? Math.round(((selectedVariant.originalPrice - selectedVariant.price) / selectedVariant.originalPrice) * 100)
    : null;

  return (
    <div className="bg-charcoal min-h-screen py-8 sm:py-12 border-b border-graphite-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Bar */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-coolgray-400 mb-8">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-coolgray-600" />
          <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5 text-coolgray-600" />
          <Link to={`/category/${product.category}`} className="hover:text-white transition-colors">
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-coolgray-600" />
          <span className="text-lime font-bold truncate max-w-xs">{product.name}</span>
        </div>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Main Featured Image */}
            <div className="relative aspect-square w-full rounded-3xl bg-graphite border border-graphite-border p-8 flex items-center justify-center overflow-hidden group shadow-2xl">
              
              {/* Floating Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
                {product.isBestseller && (
                  <span className="bg-lime text-charcoal text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                    Bestseller
                  </span>
                )}
                {discountPercent && (
                  <span className="bg-rose-500 text-white text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Action Buttons: Wishlist & Share */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                <button
                  onClick={handleShare}
                  aria-label="Share product"
                  className="p-2.5 rounded-xl bg-charcoal/80 hover:bg-charcoal text-coolgray-300 hover:text-white border border-graphite-border backdrop-blur-sm transition-all"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
                  className={`p-2.5 rounded-xl border backdrop-blur-sm transition-all ${
                    isFavorited
                      ? 'bg-rose-500/20 text-rose-500 border-rose-500/30'
                      : 'bg-charcoal/80 text-coolgray-300 hover:text-white border-graphite-border hover:bg-charcoal'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              <img
                src={product.images[activeImageIndex] || product.images[0] || '/src/assets/product_whey.jpg'}
                alt={product.name}
                className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
              />

              {copiedLink && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-charcoal text-lime text-xs font-bold px-3 py-1.5 rounded-lg border border-lime/30 shadow-lg">
                  Link copied to clipboard!
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-2xl bg-graphite border p-2 shrink-0 transition-all ${
                      activeImageIndex === idx
                        ? 'border-lime shadow-lime-glow-sm'
                        : 'border-graphite-border hover:border-coolgray-500'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* In-Store Pickup Banner */}
            <div className="p-4 rounded-2xl bg-graphite/60 border border-graphite-border flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-lime/10 text-lime flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-white font-bold text-xs block">
                    Same-Day Pickup at Kakkanad
                  </span>
                  <span className="text-[11px] text-coolgray-400">
                    Ready within 15 minutes at Ground Floor, Kusumagiri Jn
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-lime uppercase bg-lime/10 px-2.5 py-1 rounded-md border border-lime/20">
                Ready In-Store
              </span>
            </div>

          </div>

          {/* Right Column: Purchasing & Specifications */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-lime font-black uppercase tracking-widest text-xs">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-coolgray-500">({product.reviewCount} customer reviews)</span>
                </div>
              </div>

              <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight leading-tight">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-coolgray-300 mt-3 leading-relaxed">
                {product.shortDescription || product.description}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-5 rounded-2xl bg-graphite border border-graphite-border space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
                  {formatINR(selectedVariant.price)}
                </span>
                {selectedVariant.originalPrice && selectedVariant.originalPrice > selectedVariant.price && (
                  <span className="text-base text-coolgray-500 line-through">
                    {formatINR(selectedVariant.originalPrice)}
                  </span>
                )}
                {discountPercent && (
                  <span className="text-xs font-black text-lime uppercase tracking-wider bg-lime/10 px-2 py-0.5 rounded">
                    Save {discountPercent}%
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-coolgray-400 pt-1">
                <span className="flex items-center gap-1 text-lime font-semibold">
                  <Zap className="w-3.5 h-3.5" />
                  Verified in stock: {selectedVariant.stockCount} units
                </span>
                <span>•</span>
                <span>SKU: {product.sku}</span>
                <span>•</span>
                <span>Includes all GST taxes</span>
              </div>
            </div>

            {/* Variant Selector */}
            {product.variants.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-coolgray-300 uppercase tracking-wider">
                    Select Size / Flavour:
                  </label>
                  <span className="text-xs text-lime font-semibold">
                    {selectedVariant.name}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.variants.map(variant => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        selectedVariant.id === variant.id
                          ? 'bg-charcoal border-lime text-white shadow-lime-glow-sm'
                          : 'bg-graphite text-coolgray-300 border-graphite-border hover:border-coolgray-500'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <span className="text-xs font-bold block truncate">
                          {variant.name}
                        </span>
                        <span className="text-[11px] text-coolgray-400 block mt-0.5">
                          {variant.inStock ? 'Ready to ship' : 'Out of stock'}
                        </span>
                      </div>
                      <span className="text-xs font-black text-lime shrink-0">
                        {formatINR(variant.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Purchase Actions */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-coolgray-300 uppercase tracking-wider">
                  Quantity:
                </span>
                <div className="flex items-center bg-graphite border border-graphite-border rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 rounded text-coolgray-400 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(selectedVariant.stockCount, quantity + 1))}
                    className="p-2 rounded text-coolgray-400 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons: Add to Cart, Buy Now, WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="py-4 px-6 rounded-2xl bg-lime hover:bg-lime-hover text-charcoal font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lime-glow transition-all"
                >
                  <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                  <span>Add To Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-4 px-6 rounded-2xl bg-white hover:bg-coolgray-200 text-charcoal font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <Zap className="w-4 h-4 fill-charcoal" />
                  <span>Buy Now (Instant Checkout)</span>
                </button>
              </div>

              {/* WhatsApp Direct Product Inquiry Button */}
              <button
                onClick={handleWhatsAppInquiry}
                className="w-full py-3.5 px-4 rounded-2xl bg-graphite hover:bg-charcoal border border-[#25D366]/40 hover:border-[#25D366] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all group"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform" />
                <span>Ask Kakkanad Store About This Product On WhatsApp</span>
              </button>
            </div>

            {/* Quick Reassurance List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-graphite-border text-xs text-coolgray-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-lime shrink-0" />
                <span>100% Importer Authenticity</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-lime shrink-0" />
                <span>Free Kerala Shipping Over ₹1,999</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-lime shrink-0" />
                <span>Easy 7-Day Sealed Return Policy</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-lime shrink-0" />
                <span>Visit Us at Kusumagiri Jn</span>
              </div>
            </div>

          </div>

        </div>

        {/* Tabbed Specifications: Description, Nutrition, Directions, Compliance */}
        <div className="mt-16 pt-10 border-t border-graphite-border">
          
          {/* Tab Selector */}
          <div className="flex flex-wrap items-center gap-2 border-b border-graphite-border pb-4 mb-8">
            {[
              { id: 'desc', label: 'Product Details' },
              { id: 'nutrition', label: 'Nutrition Facts & Ingredients' },
              { id: 'directions', label: 'Usage & Warnings' },
              { id: 'compliance', label: 'Authenticity & Compliance' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab.id
                    ? 'bg-lime text-charcoal shadow-lime-glow-sm'
                    : 'bg-graphite text-coolgray-400 hover:text-white border border-graphite-border'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Description */}
          {activeTab === 'desc' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-graphite border border-graphite-border space-y-4 max-w-4xl">
              <h3 className="font-display font-extrabold text-white text-lg uppercase">
                About {product.name}
              </h3>
              <p className="text-sm text-coolgray-300 leading-relaxed">
                {product.description}
              </p>
              {product.tags && (
                <div className="pt-4 flex flex-wrap gap-2">
                  {product.tags.map(t => (
                    <span key={t} className="text-xs bg-charcoal px-3 py-1 rounded-lg text-coolgray-400 border border-graphite-border">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Nutrition Facts & Ingredients */}
          {activeTab === 'nutrition' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-graphite border border-graphite-border space-y-6 max-w-4xl">
              <div>
                <h3 className="font-display font-extrabold text-white text-lg uppercase mb-1">
                  Nutrition Information
                </h3>
                {product.servingSize && (
                  <p className="text-xs text-coolgray-400">
                    Serving Size: {product.servingSize} • Servings Per Tub: ~{product.servingsPerContainer}
                  </p>
                )}
              </div>

              {product.nutritionFacts && product.nutritionFacts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-graphite-border text-coolgray-400 uppercase tracking-wider">
                        <th className="py-2.5 font-bold">Nutritional Parameter</th>
                        <th className="py-2.5 font-bold">Per Serving</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-graphite-border/60">
                      {product.nutritionFacts.map((row, i) => (
                        <tr key={i} className="text-coolgray-200">
                          <td className="py-2.5 font-medium">{row.label}</td>
                          <td className="py-2.5 text-lime font-bold">{row.perServing}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-xs text-coolgray-400">
                  Detailed nutritional values provided on product container label.
                </p>
              )}

              {product.ingredients && product.ingredients.length > 0 && (
                <div className="pt-4 border-t border-graphite-border space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Ingredients Composition:
                  </h4>
                  <p className="text-xs text-coolgray-300 leading-relaxed">
                    {product.ingredients.join(', ')}
                  </p>
                </div>
              )}

              {product.allergens && (
                <div className="p-3.5 rounded-xl bg-charcoal border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                  <span><strong>Allergen Warning:</strong> {product.allergens}</span>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Usage Directions & Warnings */}
          {activeTab === 'directions' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-graphite border border-graphite-border space-y-6 max-w-4xl">
              <div>
                <h3 className="font-display font-extrabold text-white text-lg uppercase mb-2">
                  Recommended Usage Directions
                </h3>
                <p className="text-sm text-coolgray-300 leading-relaxed">
                  {product.directions || 'Mix with cold water or milk as directed by the manufacturer label. Consume post-workout or as advised by your fitness coach.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-charcoal border border-graphite-border space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-lime" />
                  <span>Manufacturer Safety Advisory</span>
                </h4>
                <p className="text-xs text-coolgray-400 leading-relaxed">
                  {product.warnings || 'Store in a cool dry place away from direct sunlight. Not for medicinal use. Consult your healthcare provider before use.'}
                </p>
              </div>
            </div>
          )}

          {/* Tab 4: Authenticity & Importer Compliance */}
          {activeTab === 'compliance' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-graphite border border-graphite-border space-y-4 max-w-4xl">
              <h3 className="font-display font-extrabold text-white text-lg uppercase">
                Authenticity & Importer Verification
              </h3>
              <p className="text-sm text-coolgray-300 leading-relaxed">
                {product.complianceNote || 'Every tub sold at PROTEIN IN TOWN features an importer authentication hologram and unique scratch panel code to verify legitimacy with the official Indian brand importer.'}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-lime font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Genuine Importer Seal Guaranteed or Full Refund</span>
              </div>
            </div>
          )}

        </div>

        {/* Related Products Shelf */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-graphite-border">
            <div className="mb-8 flex items-baseline justify-between">
              <div>
                <span className="text-lime font-black uppercase tracking-widest text-xs block mb-1">
                  YOU MAY ALSO LIKE
                </span>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                  RELATED SUPPLEMENTS
                </h2>
              </div>
              <Link to={`/category/${product.category}`} className="text-xs text-lime hover:underline font-bold">
                View All {product.categoryName} →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
