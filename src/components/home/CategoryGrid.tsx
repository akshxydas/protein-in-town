import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

export const CategoryGrid: React.FC = () => {
  return (
    <section id="categories-section" className="py-16 sm:py-24 bg-charcoal border-b border-graphite-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-lime font-black uppercase tracking-widest text-xs block mb-2">
              TARGETED SUPPLEMENTATION
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
              SHOP BY CATEGORY
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold text-coolgray-300 hover:text-lime uppercase tracking-wider flex items-center gap-1.5 transition-colors"
          >
            <span>View Full Catalogue</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid (4 per row desktop, 2 per row mobile) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group relative rounded-3xl overflow-hidden bg-graphite border border-graphite-border hover:border-lime/50 transition-all duration-300 flex flex-col justify-end min-h-[220px] sm:min-h-[260px] p-5 hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Background Image with Dark Vignette */}
              <div className="absolute inset-0 z-0">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500 opacity-40 group-hover:opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent" />
              </div>

              {/* Card Content */}
              <div className="relative z-10">
                <div className="w-8 h-8 rounded-full bg-charcoal/80 border border-graphite-border flex items-center justify-center text-coolgray-400 group-hover:text-lime group-hover:border-lime mb-3 transition-colors">
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <h3 className="font-display font-extrabold text-base sm:text-lg text-white group-hover:text-lime transition-colors leading-snug">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-coolgray-400 mt-1 line-clamp-1">
                  {cat.shortDesc}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
