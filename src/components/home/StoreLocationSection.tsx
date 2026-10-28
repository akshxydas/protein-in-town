import React from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  MessageCircle, 
  Navigation, 
  ExternalLink, 
  Star, 
  Store,
  CheckCircle2
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { createStoreEnquiryWhatsAppMessage, createWhatsAppUrl } from '../../utils/formatters';
import storefrontImg from '../../assets/store_front.jpg';

export const StoreLocationSection: React.FC = () => {
  const { settings } = useStore();

  const handleWhatsAppClick = () => {
    const url = createWhatsAppUrl(settings.whatsapp, createStoreEnquiryWhatsAppMessage());
    window.open(url, '_blank');
  };

  const handleCallClick = () => {
    window.location.href = `tel:${settings.phone}`;
  };

  return (
    <section id="store-location" className="py-16 sm:py-24 bg-charcoal border-b border-graphite-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-graphite border border-graphite-border overflow-hidden shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Authentic Storefront Image */}
            <div className="lg:col-span-6 h-full min-h-[340px] sm:min-h-[460px] relative">
              <img
                src={storefrontImg}
                alt="PROTEIN IN TOWN Retail Store in Kakkanad, Kochi"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent lg:hidden" />
              
              {/* Badge on Storefront */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-charcoal/90 backdrop-blur-md border border-graphite-border p-3.5 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-lime text-charcoal flex items-center justify-center font-black shrink-0">
                  <Store className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-white font-extrabold text-xs uppercase block">
                    Verified Physical Retail Shop
                  </span>
                  <span className="text-[11px] text-coolgray-400">
                    Kusumagiri Jn, Kakkanad, Kochi
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Address and Actions */}
            <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 space-y-6">
              
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime/10 border border-lime/30 text-lime text-xs font-bold uppercase tracking-wider mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>LOCAL SHOP IN KAKKANAD</span>
                </div>

                <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight leading-tight">
                  YOUR LOCAL FITNESS <br />
                  <span className="text-lime">NUTRITION STORE</span>
                </h2>

                <p className="text-xs sm:text-sm text-coolgray-300 mt-3 leading-relaxed">
                  Visit PROTEIN IN TOWN in Kakkanad, Kochi, to explore sports nutrition and gym essentials in person. Experience knowledgeable staff, check hologram seals firsthand, and pick up your supplements on the spot.
                </p>
              </div>

              {/* Location Details Box */}
              <div className="space-y-4 p-5 rounded-2xl bg-charcoal border border-graphite-border text-xs sm:text-sm">
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-lime shrink-0 mt-0.5" />
                  <div>
                    <span className="text-coolgray-400 text-xs block font-semibold">Store Address:</span>
                    <strong className="text-white font-bold block mt-0.5 leading-snug">
                      {settings.address}, {settings.city}, {settings.state} {settings.pinCode}, India.
                    </strong>
                    <span className="text-[11px] text-lime mt-1 block">
                      Landmark: Ground Floor, near Kusumagiri Jn & Kuzhikkattumoola
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-graphite-border/70">
                  <Clock className="w-5 h-5 text-lime shrink-0 mt-0.5" />
                  <div>
                    <span className="text-coolgray-400 text-xs block font-semibold">Operating Hours:</span>
                    <strong className="text-white font-bold block mt-0.5">
                      {settings.openingHours}
                    </strong>
                    <span className="text-[11px] text-coolgray-400">
                      Open Mondays at 10:30 AM (confirm holiday hours before visiting)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-graphite-border/70">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0" />
                  <div>
                    <span className="text-white font-bold text-xs">
                      5.0 Stars (20+ Google Maps Reviews)
                    </span>
                    <span className="text-[11px] text-coolgray-400 block">
                      Category: Vitamin & Supplements Store
                    </span>
                  </div>
                </div>

              </div>

              {/* Buttons: Directions, Call, WhatsApp */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-xl bg-lime hover:bg-lime-hover text-charcoal font-black text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-lime-glow-sm transition-all"
                >
                  <Navigation className="w-4 h-4 fill-charcoal" />
                  <span>Get Directions</span>
                </a>

                <button
                  onClick={handleCallClick}
                  className="px-5 py-3 rounded-xl bg-charcoal hover:bg-charcoal-700 border border-graphite-border text-white font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-lime" />
                  <span>Call Store</span>
                </button>

                <button
                  onClick={handleWhatsAppClick}
                  className="px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp Shop</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
