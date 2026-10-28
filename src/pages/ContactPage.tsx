import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  MessageCircle, 
  Navigation, 
  CheckCircle2, 
  Send,
  Star
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { createStoreEnquiryWhatsAppMessage, createWhatsAppUrl } from '../utils/formatters';

export const ContactPage: React.FC = () => {
  const { settings } = useStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  const handleWhatsAppClick = () => {
    const url = createWhatsAppUrl(settings.whatsapp, createStoreEnquiryWhatsAppMessage());
    window.open(url, '_blank');
  };

  return (
    <div className="bg-charcoal min-h-screen py-10 sm:py-16 border-b border-graphite-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime/10 border border-lime/30 text-lime text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>VISIT OR CONNECT</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            CONTACT & STORE LOCATOR
          </h1>
          <p className="text-xs sm:text-sm text-coolgray-400 mt-2">
            Visit our Kakkanad physical retail outlet or get in touch for stock enquiries and sports nutrition advice.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-graphite border border-graphite-border space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-lime/10 text-lime flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-white uppercase">Physical Store</h3>
            <p className="text-xs text-coolgray-300 leading-relaxed">
              {settings.address}, {settings.city}, {settings.state} - {settings.pinCode}, India.
            </p>
            <span className="text-[11px] text-lime font-semibold block">
              Landmark: Kusumagiri Jn, near Kuzhikkattumoola
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-graphite border border-graphite-border space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-lime/10 text-lime flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-white uppercase">Operating Hours</h3>
            <p className="text-xs text-coolgray-300 leading-relaxed">
              {settings.openingHours}
            </p>
            <span className="text-[11px] text-coolgray-400 block">
              Opens Mondays from 10:30 AM
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-graphite border border-graphite-border space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-lime/10 text-lime flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-white uppercase">Instant Support</h3>
            <p className="text-xs text-coolgray-300 leading-relaxed">
              Phone: {settings.phone} <br />
              Email: {settings.email}
            </p>
            <button
              onClick={handleWhatsAppClick}
              className="text-xs text-lime hover:underline font-bold flex items-center gap-1"
            >
              <span>Chat on WhatsApp →</span>
            </button>
          </div>
        </div>

        {/* Map & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Map & Directions Preview */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-graphite border border-graphite-border space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-black text-white text-lg uppercase">
                  Store Location Map
                </h3>
                <p className="text-xs text-coolgray-400 mt-0.5">
                  Conveniently situated in Kusumagiri Jn, Kakkanad.
                </p>
              </div>

              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-lime text-charcoal font-black text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-lime-hover shadow-lime-glow-sm transition-all"
              >
                <Navigation className="w-3.5 h-3.5 fill-charcoal" />
                <span>Open Google Maps</span>
              </a>
            </div>

            {/* Simulated Google Map Viewport */}
            <div className="relative aspect-video rounded-2xl bg-charcoal-800 border border-graphite-border overflow-hidden flex items-center justify-center p-6 text-center">
              <div className="space-y-3 max-w-sm">
                <div className="w-12 h-12 rounded-full bg-lime/20 text-lime flex items-center justify-center mx-auto animate-bounce">
                  <MapPin className="w-6 h-6 fill-lime" />
                </div>
                <h4 className="font-display font-extrabold text-white text-base">
                  PROTEIN IN TOWN
                </h4>
                <p className="text-xs text-coolgray-300">
                  Ground Floor, 9/169, P O, Kuzhikkattumoola, Kusumagiri, Jn, Kakkanad, Kochi, Kerala 682030
                </p>
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-xs font-bold text-lime underline"
                >
                  Click to launch interactive navigation on device →
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-coolgray-400">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-white font-semibold">5.0 Star Rated (20 Google Reviews)</span>
              <span>•</span>
              <span>Near Infopark Kochi corridor</span>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-graphite border border-graphite-border space-y-6">
            <div>
              <h3 className="font-display font-black text-white text-lg uppercase">
                Send an Enquiry
              </h3>
              <p className="text-xs text-coolgray-400 mt-1">
                Have a question about product stock or diet advice? Message our Kakkanad shop staff.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-charcoal border border-lime/30 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-lime mx-auto" />
                <h4 className="font-bold text-white text-sm">Enquiry Sent Successfully!</h4>
                <p className="text-xs text-coolgray-300">
                  Our store team will reach out to your phone number shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-lime underline font-semibold"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-coolgray-300 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full bg-charcoal border border-graphite-border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-lime"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-coolgray-300 uppercase tracking-wider mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+91 98470 00000"
                    className="w-full bg-charcoal border border-graphite-border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-lime"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-coolgray-300 uppercase tracking-wider mb-1">
                    Message / Product Enquiry *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Tell us what product, flavour, or guidance you're looking for..."
                    className="w-full bg-charcoal border border-graphite-border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-lime"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-lime hover:bg-lime-hover text-charcoal font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lime-glow-sm transition-all"
                >
                  <Send className="w-4 h-4 stroke-[2.5]" />
                  <span>Send Message</span>
                </button>
              </form>
            )}

            <div className="pt-2 text-center">
              <span className="text-xs text-coolgray-400">Prefer instant messaging? </span>
              <button
                onClick={handleWhatsAppClick}
                className="text-xs text-lime hover:underline font-bold"
              >
                Open WhatsApp Chat →
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
