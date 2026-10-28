import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import heroImg from '../../assets/hero_supplements.jpg';

export const PromoBanner: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-charcoal-950 via-graphite to-charcoal border border-graphite-border shadow-2xl">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-lime/10 blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-16">
            
            <div className="lg:col-span-7 space-y-6 text-left relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime/10 border border-lime/30 text-lime text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ESSENTIAL TRAINING COMBOS</span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight leading-none">
                BUILD YOUR <br />
                <span className="text-lime">PERFECT STACK.</span>
              </h2>

              <p className="text-sm sm:text-base text-coolgray-300 max-w-lg leading-relaxed">
                Combine premium ultra-filtered whey protein, micronized German Creapure, and high-intensity pre-workouts for an uncompromising training protocol.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/shop"
                  className="px-8 py-3.5 rounded-xl bg-lime hover:bg-lime-hover text-charcoal font-black text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-lime-glow transition-all"
                >
                  <span>SHOP NOW</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </Link>

                <Link
                  to="/offers"
                  className="px-6 py-3.5 rounded-xl bg-charcoal hover:bg-charcoal-700 border border-graphite-border text-white font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center transition-colors"
                >
                  <span>VIEW CURRENT OFFERS</span>
                </Link>
              </div>
            </div>

            {/* Right stack visual preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-graphite-border shadow-2xl">
                <img
                  src={heroImg}
                  alt="Build your supplement stack"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
