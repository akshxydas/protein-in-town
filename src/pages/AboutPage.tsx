import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Dumbbell, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Users, 
  Heart, 
  ArrowRight,
  CheckCircle2 
} from 'lucide-react';
import storefrontImg from '../assets/store_front.jpg';
import { useStore } from '../context/StoreContext';

export const AboutPage: React.FC = () => {
  const { settings } = useStore();

  return (
    <div className="bg-charcoal min-h-screen py-10 sm:py-16 border-b border-graphite-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-graphite border border-lime/30 text-xs font-bold text-coolgray-200 shadow-lime-glow-sm">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              <span className="text-lime uppercase tracking-wider font-extrabold text-[11px]">
                OUR STORY & MISSION
              </span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-tight">
              COMMITTED TO <br />
              <span className="text-lime">AUTHENTIC FITNESS.</span>
            </h1>

            <p className="text-sm sm:text-base text-coolgray-300 leading-relaxed max-w-xl">
              PROTEIN IN TOWN was founded as <strong className="text-white font-bold">The Complete Supplement Store</strong> with a singular conviction: every fitness enthusiast, athlete, and bodybuilder in Kakkanad and Kochi deserves guaranteed authentic sports nutrition without middlemen doubts or counterfeit risks.
            </p>

            <p className="text-xs sm:text-sm text-coolgray-400 leading-relaxed max-w-xl">
              Located on the Ground Floor at Kusumagiri Junction, Kakkanad, we provide an honest, athlete-first environment where you can consult knowledgeable staff, verify hologram importer seals on the spot, and acquire the exact fuel your physique demands.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="px-6 py-3.5 rounded-xl bg-lime hover:bg-lime-hover text-charcoal font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lime-glow-sm transition-all"
              >
                <span>Visit Our Kakkanad Store</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </Link>
              <Link
                to="/shop"
                className="px-6 py-3.5 rounded-xl bg-graphite hover:bg-charcoal border border-graphite-border text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <span>Browse Catalogue</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-graphite-border shadow-2xl bg-graphite p-2 sm:p-3">
              <img
                src={storefrontImg}
                alt="PROTEIN IN TOWN Storefront in Kakkanad"
                className="w-full h-auto rounded-2xl object-cover"
              />
              <div className="p-4 bg-charcoal/90 rounded-2xl border border-graphite-border mt-3 text-xs">
                <span className="text-lime font-bold block mb-1">Our Physical Retail Home</span>
                <p className="text-coolgray-400">
                  {settings.address}, Kakkanad, Kochi, Kerala. Rated 5.0 on Google Maps by local lifters.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-lime font-black uppercase tracking-widest text-xs block mb-2">
              FOUNDATIONAL ETHOS
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
              WHAT DEFINES PROTEIN IN TOWN
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-graphite border border-graphite-border space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-lime/10 text-lime flex items-center justify-center font-black">
                <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="font-display font-extrabold text-lg text-white uppercase">
                100% Importer Authenticity
              </h3>
              <p className="text-xs sm:text-sm text-coolgray-400 leading-relaxed">
                We partner only with official authorized national brand distributors and Indian manufacturers. Every tub carries a verifiable scratch code, importer hologram, and batch certificate.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-graphite border border-graphite-border space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-lime/10 text-lime flex items-center justify-center font-black">
                <Users className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="font-display font-extrabold text-lg text-white uppercase">
                Zero High-Pressure Sales
              </h3>
              <p className="text-xs sm:text-sm text-coolgray-400 leading-relaxed">
                Whether you are a newcomer starting your gym journey or a competitive powerlifter, we recommend products that align with your fitness goals and budget without pushing unnecessary stacks.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-graphite border border-graphite-border space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-lime/10 text-lime flex items-center justify-center font-black">
                <MapPin className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="font-display font-extrabold text-lg text-white uppercase">
                Proudly Rooted in Kakkanad
              </h3>
              <p className="text-xs sm:text-sm text-coolgray-400 leading-relaxed">
                Conveniently located near Infopark and Kusumagiri Jn, offering fast 15-minute in-store order pickups and prompt delivery across the Ernakulam district and Kerala.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
