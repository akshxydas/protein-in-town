import React from 'react';

const DEMO_BRANDS = [
  { name: 'Optimum Nutrition', tag: 'USA • World Standard' },
  { name: 'Dymatize', tag: 'Hydrolyzed Isolates' },
  { name: 'MuscleBlaze', tag: 'Biozyme Series' },
  { name: 'Creapure®', tag: 'German Creatine' },
  { name: 'Cellucor', tag: 'C4 Series' },
  { name: 'Labrada Nutrition', tag: 'Mass Gainer Blends' },
  { name: 'Avvatar', tag: 'Fresh Grass-Fed Whey' },
  { name: 'Ghost', tag: 'Full Disclosure Formula' },
  { name: 'Fast&Up', tag: 'Swiss Effervescents' },
  { name: 'The Whole Truth', tag: 'Clean Protein Snacks' },
];

export const BrandScroll: React.FC = () => {
  return (
    <section className="py-14 bg-charcoal border-b border-graphite-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2">
          <span className="text-lime font-black uppercase tracking-widest text-xs">
            INDUSTRY LEADERS
          </span>
          <span className="text-[11px] text-coolgray-500">
            *Demo brand catalogue for development reference. Subject to store owner confirmation.
          </span>
        </div>
      </div>

      {/* Brands Horizontal Scroll */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x">
          {DEMO_BRANDS.map((brand, idx) => (
            <div
              key={idx}
              className="snap-start shrink-0 px-6 py-4 rounded-2xl bg-graphite border border-graphite-border hover:border-lime/40 transition-colors flex flex-col justify-center min-w-[200px]"
            >
              <span className="text-white font-extrabold text-sm uppercase tracking-wider block">
                {brand.name}
              </span>
              <span className="text-[11px] text-coolgray-400 font-medium mt-0.5">
                {brand.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
