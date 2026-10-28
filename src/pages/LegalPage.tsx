import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Truck, FileText, ChevronRight } from 'lucide-react';

interface LegalPageProps {
  initialType?: 'privacy' | 'terms' | 'shipping';
}

export const LegalPage: React.FC<LegalPageProps> = ({ initialType }) => {
  const location = useLocation();

  const currentType = initialType || (
    location.pathname.includes('privacy')
      ? 'privacy'
      : location.pathname.includes('terms')
      ? 'terms'
      : 'shipping'
  );

  return (
    <div className="bg-charcoal min-h-screen py-10 sm:py-16 border-b border-graphite-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-graphite-border pb-4">
          <Link
            to="/shipping"
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              currentType === 'shipping'
                ? 'bg-lime text-charcoal shadow-lime-glow-sm'
                : 'bg-graphite text-coolgray-400 hover:text-white border border-graphite-border'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Shipping & Returns</span>
          </Link>

          <Link
            to="/privacy"
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              currentType === 'privacy'
                ? 'bg-lime text-charcoal shadow-lime-glow-sm'
                : 'bg-graphite text-coolgray-400 hover:text-white border border-graphite-border'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Privacy Policy</span>
          </Link>

          <Link
            to="/terms"
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              currentType === 'terms'
                ? 'bg-lime text-charcoal shadow-lime-glow-sm'
                : 'bg-graphite text-coolgray-400 hover:text-white border border-graphite-border'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Terms & Conditions</span>
          </Link>
        </div>

        {/* Content Container */}
        <div className="p-8 sm:p-12 rounded-3xl bg-graphite border border-graphite-border shadow-xl space-y-8 text-xs sm:text-sm text-coolgray-300 leading-relaxed">
          
          {currentType === 'shipping' && (
            <div className="space-y-6">
              <h1 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                Shipping, Delivery & Return Policy
              </h1>

              <section className="space-y-2">
                <h2 className="text-white font-bold text-base uppercase text-lime">1. Store Pickup in Kakkanad</h2>
                <p>
                  Customers in Kochi may choose <strong>Self-Pickup</strong> at checkout. Orders are packed and ready within 15 minutes during normal operating hours (10:30 AM - 9:30 PM) at our physical store: Ground Floor, 9/169, Kusumagiri Junction, Kakkanad.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-white font-bold text-base uppercase text-lime">2. Doorstep Shipping Across Kerala & India</h2>
                <p>
                  We provide prompt dispatch for all supplement orders. Orders within Ernakulam/Kochi are typically delivered within 24 to 48 hours. Orders across Kerala arrive within 2 to 3 working days. All India orders are delivered within 4 to 6 working days via tracked express couriers.
                </p>
                <p>
                  <strong>Shipping Fee:</strong> Free delivery applies automatically to all orders with payable totals of ₹1,999 and above. A flat standard delivery fee of ₹99 applies to orders below this threshold.
                </p>
              </section>

              <section className="space-y-2" id="returns">
                <h2 className="text-white font-bold text-base uppercase text-lime">3. Return, Replacement & Refund Policy</h2>
                <p>
                  Due to health and food supplement safety regulations, products can only be returned if they are:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-coolgray-400">
                  <li>Unopened with intact outer shrink seal, factory neck seal, and scratch panel untampered.</li>
                  <li>Damaged in transit or incorrect product variant received.</li>
                  <li>Reported to our store team via phone or WhatsApp within 7 days of delivery.</li>
                </ul>
                <p className="pt-2">
                  Once the return is received and verified at our Kakkanad store, replacements or full refunds to your original payment method will be issued within 3-5 business days.
                </p>
              </section>
            </div>
          )}

          {currentType === 'privacy' && (
            <div className="space-y-6">
              <h1 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                Privacy Policy
              </h1>

              <section className="space-y-2">
                <h2 className="text-white font-bold text-base uppercase text-lime">1. Information We Collect</h2>
                <p>
                  PROTEIN IN TOWN collects customer information solely to fulfill product orders, coordinate delivery across Kerala, and respond to inquiries via WhatsApp or phone. This includes customer name, delivery street address, phone number, and email.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-white font-bold text-base uppercase text-lime">2. Data Security & Storage</h2>
                <p>
                  We never sell, rent, or trade your personal contact details to external marketing agencies. Payment information is processed exclusively through certified secure payment providers and never stored on our local servers.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-white font-bold text-base uppercase text-lime">3. WhatsApp Communications</h2>
                <p>
                  When you reach out via our floating WhatsApp button or request order updates, your phone number is used strictly for transactional status updates and personalized product guidance.
                </p>
              </section>
            </div>
          )}

          {currentType === 'terms' && (
            <div className="space-y-6">
              <h1 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                Terms & Conditions
              </h1>

              <section className="space-y-2">
                <h2 className="text-white font-bold text-base uppercase text-lime">1. Genuine Product Representation</h2>
                <p>
                  All products available at PROTEIN IN TOWN are genuine sports nutrition supplements sourced through verified Indian authorized importers and certified manufacturers. Product descriptions, serving sizes, and directions are provided as manufacturer information.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-white font-bold text-base uppercase text-lime">2. Non-Medical Advisory Notice</h2>
                <p>
                  Dietary supplements sold on this platform are intended to support athletic exercise and healthy diets. They are not intended to diagnose, treat, cure, or prevent any illness or disease. Individuals with existing medical conditions should consult a registered doctor or healthcare professional before taking supplements.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-white font-bold text-base uppercase text-lime">3. Pricing & Taxes</h2>
                <p>
                  All prices listed on this website are in Indian Rupees (₹ INR) and include all applicable GST taxes. We reserve the right to correct typographical pricing discrepancies or update inventory availability without prior notice.
                </p>
              </section>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
