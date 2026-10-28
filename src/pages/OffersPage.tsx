import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, Sparkles, Copy, Check, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

const OFFERS = [
  {
    code: 'PROTEIN10',
    title: '10% Welcome Discount',
    description: 'Get an instant 10% off your entire cart order on sports nutrition, whey isolate, and creatine.',
    minOrder: 'No minimum order required',
    validity: 'Active today',
  },
  {
    code: 'TOWN5',
    title: '5% Kakkanad Store Promo',
    description: 'Celebration discount for athletes picking up at our Kusumagiri Junction store or ordering across Kochi.',
    minOrder: 'Valid on all catalog items',
    validity: 'Active today',
  },
  {
    code: 'RED15',
    title: '15% Fitness Community Offer',
    description: 'Exclusive bundle code for gyms and crossfit athletes building their monthly supplement stacks.',
    minOrder: 'Orders above ₹3,000',
    validity: 'Active today',
  },
];

export const OffersPage: React.FC = () => {
  const { applyCoupon, setDrawerOpen } = useCart();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const handleCopyAndApply = (code: string) => {
    navigator.clipboard.writeText(code);
    applyCoupon(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="bg-charcoal min-h-screen py-10 sm:py-16 border-b border-graphite-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime/10 border border-lime/30 text-lime text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SPECIAL PROMOTIONS</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            OFFERS & DISCOUNTS
          </h1>
          <p className="text-xs sm:text-sm text-coolgray-400 mt-2">
            Enjoy verified store coupons and promotions across genuine sports nutrition products.
          </p>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {OFFERS.map(offer => (
            <div
              key={offer.code}
              className="p-6 rounded-3xl bg-graphite border border-graphite-border hover:border-lime/40 transition-all flex flex-col justify-between space-y-6 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-lime/10 text-lime flex items-center justify-center">
                    <Tag className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-lime uppercase tracking-wider bg-lime/10 px-2.5 py-1 rounded-md">
                    {offer.validity}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-lg text-white mb-2">
                  {offer.title}
                </h3>

                <p className="text-xs text-coolgray-300 leading-relaxed">
                  {offer.description}
                </p>

                <div className="text-[11px] text-coolgray-500 mt-3">
                  {offer.minOrder}
                </div>
              </div>

              {/* Coupon Box */}
              <div className="pt-4 border-t border-graphite-border">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-charcoal border border-graphite-border">
                  <span className="font-mono font-black text-lime text-sm tracking-wider">
                    {offer.code}
                  </span>

                  <button
                    onClick={() => handleCopyAndApply(offer.code)}
                    className="px-3 py-1.5 rounded-xl bg-lime/20 hover:bg-lime text-lime hover:text-charcoal font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
                  >
                    {copiedCode === offer.code ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Applied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Apply</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Free Shipping Highlight Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-charcoal-950 via-graphite to-charcoal border border-graphite-border flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-lime/10 text-lime flex items-center justify-center shrink-0">
              <Truck className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-display font-black text-xl text-white uppercase tracking-tight">
                FREE Delivery Across Kerala Over ₹1,999
              </h3>
              <p className="text-xs text-coolgray-400 mt-1">
                No coupon required. Free doorstep shipping automatically applies to eligible cart totals at checkout.
              </p>
            </div>
          </div>

          <Link
            to="/shop"
            className="px-6 py-3.5 rounded-xl bg-lime text-charcoal font-black text-xs uppercase tracking-wider shrink-0 shadow-lime-glow-sm hover:bg-lime-hover transition-all"
          >
            Shop Now
          </Link>
        </div>

      </div>
    </div>
  );
};
