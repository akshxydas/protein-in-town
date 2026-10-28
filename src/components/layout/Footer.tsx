import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Dumbbell, 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  Award,
  Lock
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/categories';
import { createStoreEnquiryWhatsAppMessage, createWhatsAppUrl } from '../../utils/formatters';

export const Footer: React.FC = () => {
  const { settings } = useStore();

  const handleWhatsAppClick = () => {
    const url = createWhatsAppUrl(settings.whatsapp, createStoreEnquiryWhatsAppMessage());
    window.open(url, '_blank');
  };

  return (
    <footer className="bg-charcoal-950 border-t border-graphite-border text-coolgray-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 mb-12 border-b border-graphite-border">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-graphite/60 border border-graphite-border/70">
            <div className="w-12 h-12 rounded-xl bg-lime/10 text-lime flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">100% Genuine Seals</h4>
              <p className="text-xs text-coolgray-400">Direct authorized importer stock with verification scratch codes.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-graphite/60 border border-graphite-border/70">
            <div className="w-12 h-12 rounded-xl bg-lime/10 text-lime flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Physical Kakkanad Store</h4>
              <p className="text-xs text-coolgray-400">Walk in to Kusumagiri Jn for instant in-person pickup.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-graphite/60 border border-graphite-border/70">
            <div className="w-12 h-12 rounded-xl bg-lime/10 text-lime flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">5.0 Star Rated</h4>
              <p className="text-xs text-coolgray-400">Rated 5.0 on Google by Kochi athletes and fitness lifters.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-graphite/60 border border-graphite-border/70">
            <div className="w-12 h-12 rounded-xl bg-lime/10 text-lime flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Direct WhatsApp Support</h4>
              <p className="text-xs text-coolgray-400">Verify stock or get recommendations before ordering.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          
          {/* Brand & Store Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-lime flex items-center justify-center text-charcoal font-black">
                <Dumbbell className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-xl text-white tracking-tight uppercase leading-none">
                  PROTEIN <span className="text-lime">IN TOWN</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase text-coolgray-400 font-extrabold mt-1">
                  The Complete Supplement Store
                </span>
              </div>
            </Link>

            <p className="text-sm text-coolgray-400 leading-relaxed max-w-sm">
              <strong className="text-white">The Complete Supplement Store</strong> in Kakkanad, Kochi. We specialize in 100% authentic sports nutrition, whey protein, gainers, creatine, and gym training essentials with verified importer seals.
            </p>

            <div className="flex flex-col gap-2.5 text-xs text-coolgray-300 mt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-lime shrink-0 mt-0.5" />
                <span>
                  {settings.address}, {settings.city}, {settings.state} - {settings.pinCode}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-lime shrink-0" />
                <span>{settings.openingHours}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-lime shrink-0" />
                <span>Call: {settings.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-graphite hover:bg-graphite-light border border-graphite-border text-xs font-semibold text-white transition-colors"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-lime" />
              </a>

              <button
                onClick={handleWhatsAppClick}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-lime hover:bg-lime-hover text-charcoal text-xs font-bold transition-all shadow-lime-glow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-charcoal" />
                <span>WhatsApp Store</span>
              </button>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h5 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Categories
            </h5>
            <ul className="flex flex-col gap-2.5 text-xs">
              {CATEGORIES.slice(0, 7).map(cat => (
                <li key={cat.id}>
                  <Link 
                    to={`/category/${cat.slug}`}
                    className="hover:text-lime transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-coolgray-500" />
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Quick Links
            </h5>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li>
                <Link to="/shop" className="hover:text-lime transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-coolgray-500" />
                  <span>Shop All Products</span>
                </Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-lime transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-coolgray-500" />
                  <span>Promotions & Deals</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-lime transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-coolgray-500" />
                  <span>About Our Store</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-lime transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-coolgray-500" />
                  <span>Store Directions</span>
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-lime transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-coolgray-500" />
                  <span>My Account & Orders</span>
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-lime transition-colors flex items-center gap-1.5 text-coolgray-400">
                  <Lock className="w-3 h-3 text-lime" />
                  <span>Staff / Admin Login</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies & Compliance */}
          <div>
            <h5 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Policies
            </h5>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li>
                <Link to="/shipping" className="hover:text-lime transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-coolgray-500" />
                  <span>Shipping & Delivery Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/shipping#returns" className="hover:text-lime transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-coolgray-500" />
                  <span>Returns & Refunds</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-lime transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-coolgray-500" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-lime transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-coolgray-500" />
                  <span>Terms & Conditions</span>
                </Link>
              </li>
            </ul>

            <div className="mt-6 p-3 rounded-xl bg-graphite border border-graphite-border text-[11px] text-coolgray-400">
              <span className="text-lime font-bold block mb-1">Local Pickup in Kakkanad:</span>
              Ready in 15 minutes for in-store pickup during regular shop hours.
            </div>
          </div>
        </div>

        {/* Regulatory & Fitness Disclaimer */}
        <div className="pt-8 border-t border-graphite-border/70 text-[11px] text-coolgray-500 leading-relaxed space-y-2">
          <p>
            <strong className="text-coolgray-400">Health & Dietary Compliance Notice:</strong> The nutritional supplements and fitness products featured on this website are dietary food supplements designed to support healthy physical exercise regimens. They are not intended to diagnose, treat, cure, or prevent any disease. Do not exceed the recommended daily allowance. Please consult a qualified medical professional or registered dietitian prior to beginning any supplementation program.
          </p>
          <p>
            <strong className="text-coolgray-400">Authenticity Guarantee:</strong> All products supplied by PROTEIN IN TOWN are sourced strictly through authorized national brand importers and certified Indian manufacturers with verifiable holographic seals, batch codes, and scratch-off authentication tags.
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-6 border-t border-graphite-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-coolgray-400">
          <p>© {new Date().getFullYear()} PROTEIN IN TOWN. All rights reserved. Kakkanad, Kochi, Kerala.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Ground Floor, 9/169, Kusumagiri Jn</span>
            <span>•</span>
            <span className="text-lime font-medium">Made for Kerala Fitness</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
