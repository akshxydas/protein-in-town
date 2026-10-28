import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Package, 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  ArrowRight, 
  ShieldCheck, 
  Truck
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useStore } from '../context/StoreContext';
import { formatINR, formatDate, createWhatsAppUrl } from '../utils/formatters';

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrderById, recentOrder, orders } = useOrders();
  const { settings } = useStore();

  const order = (orderId ? getOrderById(orderId) : null) || recentOrder || orders[0];

  if (!order) {
    return (
      <div className="bg-charcoal min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md text-center p-8 rounded-3xl bg-graphite border border-graphite-border space-y-4">
          <h2 className="text-xl font-bold text-white">Order Not Found</h2>
          <p className="text-xs text-coolgray-400">We couldn&apos;t find this order reference. Please check your order ID or contact store support.</p>
          <Link to="/shop" className="inline-block px-6 py-2.5 rounded-xl bg-lime text-charcoal font-bold text-xs uppercase">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const handleWhatsAppEnquiry = () => {
    const msg = `Hello PROTEIN IN TOWN, I would like to inquire about the status of my order #${order.orderNumber}.`;
    const url = createWhatsAppUrl(settings.whatsapp, msg);
    window.open(url, '_blank');
  };

  return (
    <div className="bg-charcoal min-h-screen py-10 sm:py-16 border-b border-graphite-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Success Header Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-graphite border border-graphite-border text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-lime/10 text-lime flex items-center justify-center mx-auto shadow-lime-glow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-widest text-lime block mb-1">
              ORDER CONFIRMED
            </span>
            <h1 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
              Thank You For Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-coolgray-300 mt-2 max-w-lg mx-auto">
              Your supplement order has been received and logged to our Kakkanad store fulfillment system.
            </p>
          </div>

          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-charcoal border border-graphite-border text-xs">
            <span className="text-coolgray-400 font-semibold">Order Reference:</span>
            <span className="text-lime font-mono font-black text-sm tracking-wider">
              {order.orderNumber}
            </span>
          </div>
        </div>

        {/* Timeline Status */}
        <div className="p-6 rounded-3xl bg-graphite border border-graphite-border space-y-4">
          <h3 className="font-display font-black text-white text-sm uppercase tracking-wider">
            Order Status & Progress
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { label: 'Confirmed', done: true, current: order.orderStatus === 'Confirmed' },
              { label: 'Processing', done: ['Processing', 'Shipped', 'Delivered'].includes(order.orderStatus), current: order.orderStatus === 'Processing' },
              { label: 'Shipped', done: ['Shipped', 'Delivered'].includes(order.orderStatus), current: order.orderStatus === 'Shipped' },
              { label: 'Delivered', done: order.orderStatus === 'Delivered', current: order.orderStatus === 'Delivered' },
            ].map((step, idx) => (
              <div 
                key={idx} 
                className={`p-3.5 rounded-2xl border transition-all ${
                  step.done 
                    ? 'bg-charcoal border-lime/40 text-white' 
                    : 'bg-charcoal/40 border-graphite-border text-coolgray-500'
                }`}
              >
                <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${step.done ? 'bg-lime' : 'bg-coolgray-600'}`} />
                <span className="text-xs font-bold block">{step.label}</span>
                {step.current && (
                  <span className="text-[10px] text-lime font-bold mt-1 block">Active</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Order Details & Items */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Items List */}
          <div className="md:col-span-7 p-6 rounded-3xl bg-graphite border border-graphite-border space-y-4">
            <h3 className="font-display font-black text-white text-sm uppercase tracking-wider">
              Ordered Supplements ({order.items.length})
            </h3>

            <div className="divide-y divide-graphite-border/70">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3.5 first:pt-0 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-14 h-14 rounded-xl bg-charcoal p-1.5 shrink-0 flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-lime uppercase">{item.brand}</span>
                      <h4 className="text-xs font-bold text-white truncate">{item.productName}</h4>
                      <p className="text-[11px] text-coolgray-400">{item.variantName} × {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-white shrink-0">
                    {formatINR(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-graphite-border space-y-1.5 text-xs text-coolgray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-semibold">{formatINR(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-lime">
                  <span>Discount</span>
                  <span className="font-semibold">- {formatINR(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="text-white font-semibold">
                  {order.shippingFee === 0 ? <span className="text-lime">FREE</span> : formatINR(order.shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-graphite-border">
                <span>Total Paid / Payable</span>
                <span className="text-lime text-base font-black">{formatINR(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Delivery & Contact Sidebar */}
          <div className="md:col-span-5 space-y-6">
            
            <div className="p-6 rounded-3xl bg-graphite border border-graphite-border space-y-3 text-xs">
              <h3 className="font-display font-black text-white text-sm uppercase tracking-wider mb-2">
                Delivery Details
              </h3>

              <div className="space-y-1 text-coolgray-300">
                <strong className="text-white font-bold block">{order.shippingAddress.fullName}</strong>
                <p>{order.shippingAddress.phone}</p>
                {order.shippingAddress.email && <p>{order.shippingAddress.email}</p>}
                <p className="pt-2 text-coolgray-400 leading-relaxed">
                  {order.shippingAddress.addressLine}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pinCode}
                </p>
                {order.shippingAddress.instructions && (
                  <p className="text-[11px] text-lime pt-1">
                    Note: {order.shippingAddress.instructions}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-graphite-border text-[11px] text-coolgray-400 space-y-1">
                <div>Payment Method: <strong className="text-white">{order.paymentMethod}</strong></div>
                <div>Payment Status: <strong className="text-lime">{order.paymentStatus}</strong></div>
              </div>
            </div>

            {/* Direct WhatsApp Contact Button */}
            <button
              onClick={handleWhatsAppEnquiry}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Query This Order On WhatsApp</span>
            </button>

            <Link
              to="/shop"
              className="w-full py-3 px-4 rounded-2xl bg-charcoal hover:bg-charcoal-700 border border-graphite-border text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-3.5 h-3.5 text-lime" />
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
};
