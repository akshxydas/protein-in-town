import React from 'react';
import { ShieldCheck, UserCheck, ShoppingBag, MapPin } from 'lucide-react';

const TRUST_ITEMS = [
  {
    title: 'Product Information You Can Check',
    description: 'Every supplement features verifiable manufacturer hologram seals, batch numbers, and importer scratch authentication panels.',
    icon: ShieldCheck,
  },
  {
    title: 'Helpful In-Store Guidance',
    description: 'No pressure sales or fake claims. Discuss your training routines with our experienced team to select suitable formulations.',
    icon: UserCheck,
  },
  {
    title: 'Convenient Shopping',
    description: 'Order online with fast delivery across Kerala, or pick up your order directly from our Kakkanad shop in just 15 minutes.',
    icon: ShoppingBag,
  },
  {
    title: 'Local Store in Kakkanad, Kochi',
    description: 'A genuine brick-and-mortar sports nutrition store located at Ground Floor, Kusumagiri Junction, Kakkanad.',
    icon: MapPin,
  },
];

export const TrustFeatures: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-graphite/40 border-b border-graphite-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-lime font-black uppercase tracking-widest text-xs block mb-2">
            RELIABLE FITNESS RETAIL
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
            WHY SHOP WITH US?
          </h2>
          <p className="text-xs sm:text-sm text-coolgray-400 mt-2">
            Built on genuine authenticity, verified inventory, and rooted in the local Kakkanad gym community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-graphite border border-graphite-border flex flex-col justify-between hover:border-lime/30 transition-all"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-charcoal border border-graphite-border flex items-center justify-center text-lime mb-5 shadow-sm">
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>

                  <h3 className="font-display font-bold text-base text-white mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-coolgray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-graphite-border/70 text-[10px] text-lime font-bold uppercase tracking-wider">
                  Guaranteed Standard
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
