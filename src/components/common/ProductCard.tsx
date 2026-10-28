import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Star, Zap } from 'lucide-react';
import { Product } from '../../types';
import { formatINR } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);
  const defaultVariant = product.variants[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.variants.length > 1 && onQuickView) {
      onQuickView(product);
    } else {
      addItem(product, defaultVariant, 1);
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="group relative bg-graphite rounded-2xl border border-graphite-border hover:border-lime/40 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      
      {/* Top Media & Badges Container */}
      <div className="relative aspect-square w-full bg-charcoal-800 overflow-hidden flex items-center justify-center p-4">
        
        {/* Floating Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {product.isBestseller && (
            <span className="bg-lime text-charcoal text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
              Bestseller
            </span>
          )}
          {discountPercent && (
            <span className="bg-rose-500 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 z-10 p-2 rounded-xl transition-all ${
            isFavorited
              ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30'
              : 'bg-charcoal/80 text-coolgray-400 hover:text-white border border-graphite-border hover:bg-charcoal'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Product Image */}
        <Link to={`/product/${product.slug}`} className="w-full h-full flex items-center justify-center">
          <img
            src={product.images[0] || '/src/assets/product_whey.jpg'}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain transform group-hover:scale-108 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Quick View Hover Button */}
        {onQuickView && (
          <div className="absolute inset-x-4 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleQuickView}
              className="w-full py-2 px-3 rounded-xl bg-charcoal/90 hover:bg-charcoal border border-graphite-border text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 backdrop-blur-sm transition-all"
            >
              <Eye className="w-3.5 h-3.5 text-lime" />
              <span>Quick View</span>
            </button>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="text-lime font-black uppercase tracking-wider">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-coolgray-500 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.slug}`} className="block group-hover:text-lime transition-colors">
            <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Variant Spec Hint */}
          <p className="text-[11px] text-coolgray-400 mt-1 line-clamp-1">
            {defaultVariant?.name || product.shortDescription}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-graphite-border flex items-center justify-between gap-2">
          
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-white tracking-tight">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-coolgray-500 line-through">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-lime font-semibold flex items-center gap-1">
              <Zap className="w-2.5 h-2.5" />
              In Stock at Kakkanad
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className="p-2.5 sm:px-3 sm:py-2.5 rounded-xl bg-charcoal hover:bg-lime hover:text-charcoal border border-graphite-border hover:border-lime text-lime font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline font-extrabold text-[11px]">ADD</span>
          </button>

        </div>

      </div>

    </div>
  );
};
