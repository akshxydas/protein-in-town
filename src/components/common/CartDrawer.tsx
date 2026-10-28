import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle2, 
  Tag, 
  Truck
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../utils/formatters';

export const CartDrawer: React.FC = () => {
  const { 
    items, 
    itemCount, 
    subtotal, 
    discount, 
    discountCode, 
    shippingFee, 
    total, 
    freeShippingThreshold,
    amountNeededForFreeShipping,
    isDrawerOpen, 
    setDrawerOpen, 
    updateQuantity, 
    removeItem,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  if (!isDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    if (res.success) {
      setCouponSuccess(res.message);
      setCouponError(null);
      setInputCoupon('');
    } else {
      setCouponError(res.message);
      setCouponSuccess(null);
    }
  };

  const handleCheckoutClick = () => {
    setDrawerOpen(false);
    navigate('/checkout');
  };

  const freeShippingProgress = Math.min(
    100, 
    Math.round(((subtotal - discount) / freeShippingThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-graphite border-l border-graphite-border shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-graphite-border flex items-center justify-between bg-charcoal">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-lime/10 text-lime flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-white text-base uppercase tracking-tight">
                  Your Cart
                </h3>
                <p className="text-xs text-coolgray-400">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <button
              onClick={() => setDrawerOpen(false)}
              className="p-2 rounded-xl text-coolgray-400 hover:text-white hover:bg-graphite transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-5 py-3.5 bg-charcoal-800 border-b border-graphite-border">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="flex items-center gap-1.5 text-coolgray-200 font-semibold">
                <Truck className="w-4 h-4 text-lime" />
                {amountNeededForFreeShipping === 0 ? (
                  <span className="text-lime font-bold">You qualify for FREE Delivery!</span>
                ) : (
                  <span>
                    Add <strong className="text-lime">{formatINR(amountNeededForFreeShipping)}</strong> more for FREE delivery
                  </span>
                )}
              </span>
              <span className="text-[11px] text-coolgray-400">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-graphite rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-lime h-full rounded-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-charcoal-700 flex items-center justify-center text-coolgray-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base">Your cart is empty</h4>
                  <p className="text-xs text-coolgray-400 mt-1 max-w-xs">
                    Browse our high-grade protein powders, pre-workouts, and workout essentials.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    navigate('/shop');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-lime text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-lime-hover shadow-lime-glow-sm transition-all"
                >
                  Explore Store
                </button>
              </div>
            ) : (
              items.map(item => (
                <div 
                  key={item.id} 
                  className="flex gap-4 p-3.5 rounded-2xl bg-charcoal border border-graphite-border hover:border-graphite-light transition-all"
                >
                  {/* Item Image */}
                  <div className="w-20 h-20 rounded-xl bg-graphite shrink-0 overflow-hidden p-1 flex items-center justify-center">
                    <img
                      src={item.product.images[0] || '/src/assets/product_whey.jpg'}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Item Info */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-lime">
                        {item.product.brand}
                      </span>
                      <h4 className="text-xs font-bold text-white truncate leading-snug">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-coolgray-400 mt-0.5 truncate">
                        {item.selectedVariant.name}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm font-extrabold text-white">
                        {formatINR(item.selectedVariant.price * item.quantity)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5 bg-graphite border border-graphite-border rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded text-coolgray-300 hover:text-white hover:bg-charcoal transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded text-coolgray-300 hover:text-white hover:bg-charcoal transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-coolgray-500 hover:text-rose-400 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Totals */}
          {items.length > 0 && (
            <div className="p-5 bg-charcoal border-t border-graphite-border space-y-4">
              
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={e => setInputCoupon(e.target.value)}
                    placeholder="Enter Coupon (e.g. PROTEIN10)"
                    className="w-full bg-graphite border border-graphite-border rounded-xl px-3 py-2 text-xs text-white placeholder-coolgray-500 uppercase tracking-wider focus:outline-none focus:border-lime"
                  />
                  <Tag className="w-3.5 h-3.5 text-coolgray-400 absolute right-3 top-2.5" />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-graphite-light hover:bg-charcoal-600 border border-graphite-border rounded-xl text-xs font-bold text-white transition-colors"
                >
                  Apply
                </button>
              </form>

              {couponSuccess && (
                <p className="text-[11px] text-lime flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {couponSuccess}
                </p>
              )}
              {couponError && (
                <p className="text-[11px] text-rose-400">
                  {couponError}
                </p>
              )}

              {discountCode && (
                <div className="flex items-center justify-between text-xs bg-lime/10 px-3 py-1.5 rounded-lg border border-lime/20 text-lime font-medium">
                  <span>Code Applied: <strong>{discountCode}</strong></span>
                  <button 
                    onClick={removeCoupon}
                    className="text-[11px] underline hover:text-white"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Price Calculation Details */}
              <div className="space-y-1.5 text-xs text-coolgray-300 pt-2 border-t border-graphite-border/70">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">{formatINR(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-lime">
                    <span>Discount</span>
                    <span className="font-semibold">- {formatINR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-white font-semibold">
                    {shippingFee === 0 ? <span className="text-lime">FREE</span> : formatINR(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-graphite-border">
                  <span>Payable Amount</span>
                  <span className="text-lime text-base font-black">{formatINR(total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 px-4 rounded-xl bg-lime hover:bg-lime-hover text-charcoal font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lime-glow transition-all transform hover:scale-[1.01]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-full py-2.5 px-4 rounded-xl bg-transparent hover:bg-graphite text-coolgray-400 hover:text-white text-xs font-semibold transition-colors"
                >
                  Continue Shopping
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
