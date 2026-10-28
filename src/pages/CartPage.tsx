import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Tag, 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/formatters';

export const CartPage: React.FC = () => {
  const { 
    items, 
    subtotal, 
    discount, 
    discountCode, 
    shippingFee, 
    total, 
    freeShippingThreshold,
    amountNeededForFreeShipping,
    updateQuantity, 
    removeItem, 
    clearCart,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const freeShippingProgress = Math.min(
    100, 
    Math.round(((subtotal - discount) / freeShippingThreshold) * 100)
  );

  if (items.length === 0) {
    return (
      <div className="bg-charcoal min-h-[70vh] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center p-8 rounded-3xl bg-graphite border border-graphite-border space-y-4">
          <div className="w-16 h-16 rounded-full bg-charcoal flex items-center justify-center mx-auto text-coolgray-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-display font-black text-2xl text-white uppercase tracking-tight">
            Your Cart is Empty
          </h2>
          <p className="text-xs text-coolgray-400 max-w-sm mx-auto">
            You haven&apos;t added any sports nutrition supplements to your cart yet.
          </p>
          <Link
            to="/shop"
            className="inline-block px-8 py-3.5 rounded-xl bg-lime text-charcoal font-black text-xs uppercase tracking-wider hover:bg-lime-hover shadow-lime-glow-sm transition-all"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-charcoal min-h-screen py-10 sm:py-16 border-b border-graphite-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
            SHOPPING CART
          </h1>
          <p className="text-xs sm:text-sm text-coolgray-400 mt-1">
            Review your selected supplements and proceed to delivery details.
          </p>
        </div>

        {/* Free Shipping Notification */}
        <div className="mb-8 p-4 rounded-2xl bg-graphite border border-graphite-border">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="flex items-center gap-2 text-coolgray-200 font-semibold">
              <Truck className="w-4 h-4 text-lime" />
              {amountNeededForFreeShipping === 0 ? (
                <span className="text-lime font-bold">You qualify for FREE Kerala Delivery!</span>
              ) : (
                <span>
                  Add <strong className="text-lime">{formatINR(amountNeededForFreeShipping)}</strong> more to qualify for FREE delivery
                </span>
              )}
            </span>
            <span className="text-xs font-bold text-coolgray-400">{freeShippingProgress}%</span>
          </div>
          <div className="w-full bg-charcoal rounded-full h-2 overflow-hidden">
            <div 
              className="bg-lime h-full rounded-full transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Table / List */}
          <div className="lg:col-span-8 space-y-4">
            
            {items.map(item => (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-2xl bg-graphite border border-graphite-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-20 h-20 rounded-xl bg-charcoal p-2 flex items-center justify-center shrink-0">
                    <img
                      src={item.product.images[0] || '/src/assets/product_whey.jpg'}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-lime">
                      {item.product.brand}
                    </span>
                    <Link to={`/product/${item.product.slug}`} className="hover:text-lime transition-colors">
                      <h3 className="text-sm font-bold text-white leading-snug truncate">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-coolgray-400 mt-0.5">
                      {item.selectedVariant.name}
                    </p>
                    <span className="text-xs font-bold text-white sm:hidden mt-1 block">
                      {formatINR(item.selectedVariant.price)} each
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-graphite-border">
                  {/* Quantity Controls */}
                  <div className="flex items-center bg-charcoal border border-graphite-border rounded-xl p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded text-coolgray-400 hover:text-white"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded text-coolgray-400 hover:text-white"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <span className="text-sm font-black text-white min-w-[80px] text-right">
                    {formatINR(item.selectedVariant.price * item.quantity)}
                  </span>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-coolgray-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-2">
              <Link
                to="/shop"
                className="text-xs text-coolgray-400 hover:text-white font-semibold underline"
              >
                ← Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-xs text-rose-400 hover:underline font-semibold"
              >
                Clear Cart
              </button>
            </div>

          </div>

          {/* Right Summary Card */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-graphite border border-graphite-border space-y-6">
            
            <h3 className="font-display font-extrabold text-white text-base uppercase">
              Order Summary
            </h3>

            {/* Coupon Code Form */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputCoupon}
                  onChange={e => setInputCoupon(e.target.value)}
                  placeholder="Coupon code (e.g. PROTEIN10)"
                  className="flex-1 bg-charcoal border border-graphite-border rounded-xl px-3 py-2 text-xs text-white placeholder-coolgray-500 uppercase focus:outline-none focus:border-lime"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-charcoal-700 hover:bg-charcoal-600 border border-graphite-border rounded-xl text-xs font-bold text-white"
                >
                  Apply
                </button>
              </div>

              {couponSuccess && <p className="text-[11px] text-lime">{couponSuccess}</p>}
              {couponError && <p className="text-[11px] text-rose-400">{couponError}</p>}
              {discountCode && (
                <div className="flex items-center justify-between text-xs bg-lime/10 px-3 py-1.5 rounded-lg border border-lime/20 text-lime">
                  <span>Applied: <strong>{discountCode}</strong></span>
                  <button onClick={removeCoupon} className="text-[11px] underline">Remove</button>
                </div>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 text-xs text-coolgray-300 pt-4 border-t border-graphite-border">
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
                <span>Delivery Charge</span>
                <span className="text-white font-semibold">
                  {shippingFee === 0 ? <span className="text-lime">FREE</span> : formatINR(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-white pt-3 border-t border-graphite-border">
                <span>Total Payable</span>
                <span className="text-lime text-lg font-black">{formatINR(total)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 px-4 rounded-xl bg-lime hover:bg-lime-hover text-charcoal font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lime-glow transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[11px] text-coolgray-400 space-y-1.5 pt-2">
              <div className="flex items-center gap-2 text-coolgray-300">
                <ShieldCheck className="w-3.5 h-3.5 text-lime" />
                <span>100% Genuine batch verified products</span>
              </div>
              <div className="flex items-center gap-2 text-coolgray-300">
                <MapPin className="w-3.5 h-3.5 text-lime" />
                <span>Option for pickup at Kakkanad available at checkout</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
