import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Banknote, 
  MapPin, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  ShoppingBag,
  Store
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { CustomerAddress, PaymentMethod } from '../types';
import { formatINR } from '../utils/formatters';

export const CheckoutPage: React.FC = () => {
  const { items, subtotal, discount, discountCode, shippingFee, total } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();

  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Address Form State
  const [address, setAddress] = useState<CustomerAddress>({
    fullName: '',
    phone: '',
    email: '',
    addressLine: '',
    landmark: '',
    city: 'Kochi',
    state: 'Kerala',
    pinCode: '682030',
    instructions: '',
  });

  if (items.length === 0) {
    return (
      <div className="bg-charcoal min-h-[70vh] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center p-8 rounded-3xl bg-graphite border border-graphite-border space-y-4">
          <ShoppingBag className="w-12 h-12 text-coolgray-500 mx-auto" />
          <h2 className="text-xl font-bold text-white uppercase">Your cart is empty</h2>
          <p className="text-xs text-coolgray-400">Please add items to your cart before proceeding to checkout.</p>
          <Link
            to="/shop"
            className="inline-block px-6 py-2.5 rounded-xl bg-lime text-charcoal font-bold text-xs uppercase"
          >
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: keyof CustomerAddress, value: string) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!address.fullName.trim() || !address.phone.trim()) {
      setFormError('Please enter your full name and contact phone number.');
      return;
    }

    if (deliveryType === 'delivery' && (!address.addressLine.trim() || !address.pinCode.trim())) {
      setFormError('Please provide complete delivery street address and PIN code.');
      return;
    }

    if (!acceptedTerms) {
      setFormError('Please accept the Terms & Conditions to complete your order.');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderAddress: CustomerAddress = deliveryType === 'pickup' 
        ? {
            ...address,
            addressLine: 'Self Pickup: Ground Floor, 9/169, Kusumagiri Jn, Kakkanad Shop',
            instructions: 'Customer will collect directly in-store at Kakkanad.',
          }
        : address;

      const order = await placeOrder(orderAddress, paymentMethod);
      navigate(`/order-confirmation/${order.orderNumber}`);
    } catch (err) {
      setFormError('An error occurred while creating your order. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-charcoal min-h-screen py-8 sm:py-12 border-b border-graphite-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link to="/cart" className="inline-flex items-center gap-1.5 text-xs text-coolgray-400 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cart</span>
        </Link>

        <div className="mb-8">
          <h1 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
            CHECKOUT & DELIVERY
          </h1>
          <p className="text-xs sm:text-sm text-coolgray-400 mt-1">
            Complete your order for Kerala doorstep delivery or in-store Kakkanad pickup.
          </p>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Delivery & Payment Details */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Delivery Type Option */}
              <div className="p-6 rounded-3xl bg-graphite border border-graphite-border space-y-4">
                <h3 className="font-display font-black text-white text-sm uppercase tracking-wider">
                  1. Delivery or In-Store Pickup
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('delivery')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      deliveryType === 'delivery'
                        ? 'bg-charcoal border-lime shadow-lime-glow-sm'
                        : 'bg-charcoal/50 border-graphite-border text-coolgray-400 hover:border-coolgray-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs text-white uppercase">Doorstep Delivery</span>
                      {deliveryType === 'delivery' && <CheckCircle2 className="w-4 h-4 text-lime" />}
                    </div>
                    <p className="text-[11px] text-coolgray-400">
                      Express delivery to your doorstep across Kakkanad, Kochi & Kerala.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('pickup')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      deliveryType === 'pickup'
                        ? 'bg-charcoal border-lime shadow-lime-glow-sm'
                        : 'bg-charcoal/50 border-graphite-border text-coolgray-400 hover:border-coolgray-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs text-white uppercase flex items-center gap-1.5">
                        <Store className="w-3.5 h-3.5 text-lime" />
                        Kakkanad Store Pickup
                      </span>
                      {deliveryType === 'pickup' && <CheckCircle2 className="w-4 h-4 text-lime" />}
                    </div>
                    <p className="text-[11px] text-coolgray-400">
                      Ready in 15 mins at Kusumagiri Jn. Zero shipping fee.
                    </p>
                  </button>
                </div>
              </div>

              {/* Customer Contact & Address */}
              <div className="p-6 rounded-3xl bg-graphite border border-graphite-border space-y-4">
                <h3 className="font-display font-black text-white text-sm uppercase tracking-wider">
                  2. Contact & {deliveryType === 'pickup' ? 'Customer Details' : 'Shipping Address'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-coolgray-300 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={address.fullName}
                      onChange={e => handleInputChange('fullName', e.target.value)}
                      placeholder="e.g. Arun Kumar"
                      className="w-full bg-charcoal border border-graphite-border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-lime"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-coolgray-300 uppercase tracking-wider mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={address.phone}
                      onChange={e => handleInputChange('phone', e.target.value)}
                      placeholder="+91 98470 00000"
                      className="w-full bg-charcoal border border-graphite-border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-lime"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-coolgray-300 uppercase tracking-wider mb-1">
                    Email Address (For Invoice)
                  </label>
                  <input
                    type="email"
                    value={address.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    placeholder="arun@example.com"
                    className="w-full bg-charcoal border border-graphite-border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-lime"
                  />
                </div>

                {deliveryType === 'delivery' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-coolgray-300 uppercase tracking-wider mb-1">
                        Street Address / Flat / Building *
                      </label>
                      <input
                        type="text"
                        required
                        value={address.addressLine}
                        onChange={e => handleInputChange('addressLine', e.target.value)}
                        placeholder="House / Flat No, Street, Colony"
                        className="w-full bg-charcoal border border-graphite-border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-lime"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-coolgray-300 uppercase tracking-wider mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={address.city}
                          onChange={e => handleInputChange('city', e.target.value)}
                          className="w-full bg-charcoal border border-graphite-border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-lime"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-coolgray-300 uppercase tracking-wider mb-1">
                          State *
                        </label>
                        <select
                          value={address.state}
                          onChange={e => handleInputChange('state', e.target.value)}
                          className="w-full bg-charcoal border border-graphite-border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-lime"
                        >
                          <option value="Kerala">Kerala</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Other">Other (All India)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-coolgray-300 uppercase tracking-wider mb-1">
                          PIN Code *
                        </label>
                        <input
                          type="text"
                          required
                          value={address.pinCode}
                          onChange={e => handleInputChange('pinCode', e.target.value)}
                          placeholder="682030"
                          className="w-full bg-charcoal border border-graphite-border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-lime"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-coolgray-300 uppercase tracking-wider mb-1">
                        Delivery Instructions (Optional)
                      </label>
                      <input
                        type="text"
                        value={address.instructions || ''}
                        onChange={e => handleInputChange('instructions', e.target.value)}
                        placeholder="e.g. Leave with building security, call on arrival"
                        className="w-full bg-charcoal border border-graphite-border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-lime"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Payment Method Selector */}
              <div className="p-6 rounded-3xl bg-graphite border border-graphite-border space-y-4">
                <h3 className="font-display font-black text-white text-sm uppercase tracking-wider">
                  3. Payment Method
                </h3>

                <div className="space-y-3">
                  <label
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'UPI'
                        ? 'bg-charcoal border-lime shadow-lime-glow-sm'
                        : 'bg-charcoal/50 border-graphite-border hover:border-coolgray-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="UPI"
                        checked={paymentMethod === 'UPI'}
                        onChange={() => setPaymentMethod('UPI')}
                        className="accent-lime"
                      />
                      <div>
                        <span className="text-xs font-bold text-white block">
                          Instant UPI (GPay / PhonePe / Paytm / QR)
                        </span>
                        <span className="text-[11px] text-coolgray-400">
                          Fastest simulated checkout with instant order confirmation
                        </span>
                      </div>
                    </div>
                    <Smartphone className="w-5 h-5 text-lime" />
                  </label>

                  <label
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'Card'
                        ? 'bg-charcoal border-lime shadow-lime-glow-sm'
                        : 'bg-charcoal/50 border-graphite-border hover:border-coolgray-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="Card"
                        checked={paymentMethod === 'Card'}
                        onChange={() => setPaymentMethod('Card')}
                        className="accent-lime"
                      />
                      <div>
                        <span className="text-xs font-bold text-white block">
                          Credit / Debit Card (Visa, Mastercard, RuPay)
                        </span>
                        <span className="text-[11px] text-coolgray-400">
                          Encrypted simulated gateway processing
                        </span>
                      </div>
                    </div>
                    <CreditCard className="w-5 h-5 text-coolgray-400" />
                  </label>

                  <label
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'COD'
                        ? 'bg-charcoal border-lime shadow-lime-glow-sm'
                        : 'bg-charcoal/50 border-graphite-border hover:border-coolgray-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="COD"
                        checked={paymentMethod === 'COD'}
                        onChange={() => setPaymentMethod('COD')}
                        className="accent-lime"
                      />
                      <div>
                        <span className="text-xs font-bold text-white block">
                          {deliveryType === 'pickup' ? 'Pay In-Store on Pickup (Cash / UPI / Card)' : 'Cash On Delivery (COD)'}
                        </span>
                        <span className="text-[11px] text-coolgray-400">
                          Pay upon receiving or collecting your supplement parcel
                        </span>
                      </div>
                    </div>
                    <Banknote className="w-5 h-5 text-coolgray-400" />
                  </label>
                </div>

                {/* Demo Disclosure Box */}
                <div className="p-3.5 rounded-xl bg-charcoal border border-graphite-border text-[11px] text-coolgray-400 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-lime shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Demonstration Store Notice:</strong>
                    Live payment gateway integration (Razorpay / Cashfree) is ready to connect. In this demo release, test orders are created and logged to the store database without charging real cards.
                  </div>
                </div>

              </div>

            </div>

            {/* Right Column: Order Summary & Placement */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-graphite border border-graphite-border space-y-6">
              
              <h3 className="font-display font-extrabold text-white text-base uppercase">
                Order Review ({items.length} items)
              </h3>

              {/* Items List */}
              <div className="divide-y divide-graphite-border/70 max-h-72 overflow-y-auto pr-1 space-y-3">
                {items.map(item => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-charcoal p-1 shrink-0 flex items-center justify-center">
                        <img
                          src={item.product.images[0] || '/src/assets/product_whey.jpg'}
                          alt={item.product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-white font-bold block truncate">{item.product.name}</span>
                        <span className="text-coolgray-400 text-[11px] block">{item.selectedVariant.name} × {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-black text-white shrink-0">
                      {formatINR(item.selectedVariant.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 text-xs text-coolgray-300 pt-4 border-t border-graphite-border">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">{formatINR(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-lime">
                    <span>Discount ({discountCode})</span>
                    <span className="font-semibold">- {formatINR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="text-white font-semibold">
                    {deliveryType === 'pickup' || shippingFee === 0 ? (
                      <span className="text-lime">FREE</span>
                    ) : (
                      formatINR(shippingFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white pt-3 border-t border-graphite-border">
                  <span>Payable Amount</span>
                  <span className="text-lime text-xl font-black">
                    {formatINR(deliveryType === 'pickup' ? subtotal - discount : total)}
                  </span>
                </div>
              </div>

              {/* Terms Acceptance */}
              <label className="flex items-start gap-2.5 text-xs text-coolgray-400 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={e => setAcceptedTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded accent-lime"
                />
                <span>
                  I agree to the <Link to="/terms" className="text-lime underline">Terms of Service</Link> and <Link to="/shipping" className="text-lime underline">Return Policies</Link>.
                </span>
              </label>

              {formError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Place Order CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-4 rounded-xl bg-lime hover:bg-lime-hover text-charcoal font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lime-glow transition-all disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Processing Order...' : 'Place Order Now'}</span>
              </button>

              <div className="text-[11px] text-center text-coolgray-500">
                You will receive an order confirmation and reference code immediately.
              </div>

            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
