import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import heroImg from '../../assets/hero_supplements.jpg';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-charcoal pt-8 pb-16 sm:py-20 lg:py-28 border-b border-graphite-border">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-lime/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Top Pill Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-graphite border border-lime/30 text-xs font-bold text-coolgray-200 shadow-lime-glow-sm">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              <span className="text-lime uppercase tracking-wider font-extrabold text-[11px]">
                THE COMPLETE SUPPLEMENT STORE
              </span>
              <span className="text-coolgray-500">•</span>
              <span className="text-coolgray-300 text-[11px] hidden sm:inline">Kakkanad, Kochi</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tighter text-white uppercase leading-[0.95]">
              FUEL YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime via-lime-light to-white">
                NEXT LEVEL.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-lg text-coolgray-300 max-w-xl font-normal leading-relaxed">
              Welcome to <span className="text-white font-bold">The Complete Supplement Store</span> in Kakkanad, Kochi. Your premier destination for 100% authentic whey protein, creatine, pre-workouts, and gym essentials with verified importer seals.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <Link
                to="/shop"
                className="px-8 py-4 rounded-2xl bg-lime hover:bg-lime-hover text-charcoal font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lime-glow transition-all transform hover:scale-[1.02] active:scale-95"
              >
                <span>SHOP SUPPLEMENTS</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </Link>

              <a
                href="#categories-section"
                className="px-8 py-4 rounded-2xl bg-graphite hover:bg-graphite-light border border-graphite-border hover:border-lime/50 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <span>EXPLORE CATEGORIES</span>
              </a>
            </div>

            {/* Key Trust Checkmarks */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full border-t border-graphite-border/70 text-xs text-coolgray-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-lime shrink-0" />
                <span>100% Importer Authenticity</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-lime shrink-0" />
                <span>Local Kakkanad Store</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-lime shrink-0" />
                <span>Zero Fake Guarantee</span>
              </div>
            </div>

          </div>

          {/* Right Column: High Quality Product Stack Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Product Visual Frame */}
              <div className="relative rounded-3xl overflow-hidden border border-graphite-border/80 shadow-2xl bg-graphite p-2 sm:p-3 group">
                <img
                  src={heroImg}
                  alt="PROTEIN IN TOWN Sports Nutrition Stack"
                  className="w-full h-auto rounded-2xl object-cover transform group-hover:scale-103 transition-transform duration-700"
                />

                {/* Floating Badge 1: 5.0 Star Rating */}
                <div className="absolute top-6 left-6 bg-charcoal/90 backdrop-blur-md border border-graphite-border p-3 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-lime/20 text-lime flex items-center justify-center font-black">
                    <Sparkles className="w-5 h-5 fill-lime" />
                  </div>
                  <div>
                    <span className="text-[10px] text-coolgray-400 font-bold uppercase tracking-wider block">
                      Google Review Rating
                    </span>
                    <span className="text-sm font-black text-white flex items-center gap-1">
                      5.0 ★ <span className="text-coolgray-400 font-normal text-xs">(20+ Reviews)</span>
                    </span>
                  </div>
                </div>

                {/* Floating Badge 2: Local Pickup */}
                <div className="absolute bottom-6 right-6 bg-charcoal/90 backdrop-blur-md border border-lime/30 p-3 rounded-2xl shadow-xl flex items-center gap-2.5">
                  <Zap className="w-5 h-5 text-lime animate-pulse" />
                  <div className="text-left">
                    <span className="text-xs font-black text-white uppercase block">
                      Fast Kakkanad Pickup
                    </span>
                    <span className="text-[10px] text-coolgray-400">
                      Ground Floor, Kusumagiri Jn
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
