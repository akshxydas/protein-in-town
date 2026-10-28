import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  X, 
  ShoppingBag, 
  Zap, 
  Star, 
  Check, 
  Plus, 
  Minus, 
  MessageCircle, 
  ExternalLink 
} from 'lucide-react';
import { Product, ProductVariant } from '../../types';
import { formatINR, createProductWhatsAppMessage, createWhatsAppUrl } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addItem } = useCart();
  const { settings } = useStore();
  const navigate = useNavigate();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product?.variants[0] || null
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const currentVariant = selectedVariant || product.variants[0];

  const handleAddToCart = () => {
    addItem(product, currentVariant, quantity);
    onClose();
  };

  const handleBuyNow = () => {
    addItem(product, currentVariant, quantity);
    onClose();
    navigate('/checkout');
  };

  const handleWhatsAppEnquiry = () => {
    const message = createProductWhatsAppMessage(
      product.name,
      currentVariant.name,
      currentVariant.price
    );
    const url = createWhatsAppUrl(settings.whatsapp, message);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-3xl rounded-3xl bg-graphite border border-graphite-border shadow-2xl overflow-hidden p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 p-2 rounded-xl text-coolgray-400 hover:text-white hover:bg-charcoal transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Image Gallery Showcase */}
            <div className="aspect-square bg-charcoal-800 rounded-2xl p-6 flex items-center justify-center border border-graphite-border">
              <img
                src={product.images[0] || '/src/assets/product_whey.jpg'}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Info & Options */}
            <div className="flex flex-col justify-between space-y-4">
              
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-lime font-black uppercase tracking-wider">
                    {product.brand}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-coolgray-500 font-normal">({product.reviewCount} reviews)</span>
                  </div>
                </div>

                <h2 className="text-lg sm:text-xl font-display font-extrabold text-white leading-tight">
                  {product.name}
                </h2>

                <p className="text-xs text-coolgray-400 mt-2 line-clamp-3 leading-relaxed">
                  {product.shortDescription || product.description}
                </p>
              </div>

              {/* Price Details */}
              <div className="p-3.5 rounded-xl bg-charcoal border border-graphite-border flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white">
                      {formatINR(currentVariant.price)}
                    </span>
                    {currentVariant.originalPrice && currentVariant.originalPrice > currentVariant.price && (
                      <span className="text-xs text-coolgray-500 line-through">
                        {formatINR(currentVariant.originalPrice)}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-lime font-semibold flex items-center gap-1 mt-0.5">
                    <Zap className="w-3 h-3" />
                    Verified stock available in Kakkanad
                  </span>
                </div>

                <span className="text-[10px] text-coolgray-400 uppercase tracking-wider bg-graphite px-2 py-1 rounded">
                  SKU: {product.sku}
                </span>
              </div>

              {/* Variants Selector */}
              {product.variants.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-coolgray-300 uppercase tracking-wider mb-2">
                    Select Variant / Size:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map(variant => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                          currentVariant.id === variant.id
                            ? 'bg-lime text-charcoal border-lime font-bold shadow-lime-glow-sm'
                            : 'bg-charcoal text-coolgray-300 border-graphite-border hover:border-coolgray-500'
                        }`}
                      >
                        {currentVariant.id === variant.id && <Check className="w-3 h-3 stroke-[3]" />}
                        <span>{variant.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 pt-1">
                <span className="text-xs font-bold text-coolgray-300 uppercase tracking-wider">
                  Quantity:
                </span>
                <div className="flex items-center bg-charcoal border border-graphite-border rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 rounded text-coolgray-400 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 rounded text-coolgray-400 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="py-3 px-4 rounded-xl bg-lime hover:bg-lime-hover text-charcoal font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lime-glow-sm transition-all"
                >
                  <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                  <span>Add To Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3 px-4 rounded-xl bg-white hover:bg-coolgray-200 text-charcoal font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <Zap className="w-4 h-4 fill-charcoal" />
                  <span>Buy Now</span>
                </button>
              </div>

              {/* WhatsApp Enquiry & Link */}
              <div className="flex items-center justify-between pt-2 border-t border-graphite-border text-xs">
                <button
                  onClick={handleWhatsAppEnquiry}
                  className="text-coolgray-300 hover:text-lime flex items-center gap-1.5 transition-colors font-medium"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp Enquiry</span>
                </button>

                <Link
                  to={`/product/${product.slug}`}
                  onClick={onClose}
                  className="text-lime hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>View Full Details</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
