import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Clock, 
  ChevronRight, 
  ExternalLink,
  ShoppingBag,
  Trash2
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatINR, formatDate } from '../utils/formatters';

export const AccountPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'orders';

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'profile'>(
    (initialTab as any) || 'orders'
  );

  const { orders } = useOrders();
  const { wishlist, toggleWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  return (
    <div className="bg-charcoal min-h-screen py-10 sm:py-16 border-b border-graphite-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-lime/10 border border-lime/30 text-lime flex items-center justify-center font-black">
              <User className="w-7 h-7" />
            </div>
            <div>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                MY ACCOUNT & ORDERS
              </h1>
              <p className="text-xs text-coolgray-400 mt-0.5">
                Manage your orders, saved favorites, and local store preferences.
              </p>
            </div>
          </div>

          <Link
            to="/shop"
            className="px-5 py-2.5 rounded-xl bg-graphite border border-graphite-border hover:border-lime text-xs font-bold text-white uppercase tracking-wider inline-flex items-center gap-2 transition-colors self-start sm:self-auto"
          >
            <span>Browse Supplements</span>
            <ChevronRight className="w-4 h-4 text-lime" />
          </Link>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 border-b border-graphite-border pb-4 mb-8">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'orders'
                ? 'bg-lime text-charcoal shadow-lime-glow-sm'
                : 'bg-graphite text-coolgray-400 hover:text-white border border-graphite-border'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order History ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'wishlist'
                ? 'bg-lime text-charcoal shadow-lime-glow-sm'
                : 'bg-graphite text-coolgray-400 hover:text-white border border-graphite-border'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Wishlist ({wishlist.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'profile'
                ? 'bg-lime text-charcoal shadow-lime-glow-sm'
                : 'bg-graphite text-coolgray-400 hover:text-white border border-graphite-border'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Customer Profile</span>
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="py-16 text-center rounded-3xl bg-graphite border border-graphite-border p-8 space-y-4">
                <Package className="w-12 h-12 text-coolgray-500 mx-auto" />
                <h3 className="text-base font-bold text-white">No Orders Placed Yet</h3>
                <p className="text-xs text-coolgray-400 max-w-sm mx-auto">
                  When you place an order on PROTEIN IN TOWN, tracking and delivery updates will appear here.
                </p>
                <Link
                  to="/shop"
                  className="inline-block px-6 py-2.5 rounded-xl bg-lime text-charcoal font-bold text-xs uppercase"
                >
                  Shop Supplements
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div
                    key={order.id}
                    className="p-6 rounded-3xl bg-graphite border border-graphite-border hover:border-graphite-light transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-graphite-border gap-2">
                      <div>
                        <span className="text-xs text-coolgray-400">Order ID:</span>
                        <strong className="text-white text-sm font-mono ml-1.5">{order.orderNumber}</strong>
                        <span className="text-xs text-coolgray-500 ml-3">• {formatDate(order.date)}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2.5 py-1 rounded-md font-bold uppercase ${
                          order.orderStatus === 'Delivered'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : order.orderStatus === 'Shipped'
                            ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                            : 'bg-lime/10 text-lime border border-lime/20'
                        }`}>
                          {order.orderStatus}
                        </span>

                        <Link
                          to={`/order-confirmation/${order.orderNumber}`}
                          className="text-xs text-lime hover:underline font-bold flex items-center gap-1"
                        >
                          <span>Track Order</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-charcoal border border-graphite-border">
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-10 h-10 object-contain rounded-lg shrink-0"
                          />
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-white truncate">{item.productName}</h4>
                            <span className="text-[11px] text-coolgray-400 block">{item.variantName} × {item.quantity}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 text-xs">
                      <span className="text-coolgray-400">
                        Deliver to: <strong className="text-white">{order.shippingAddress.fullName}</strong> ({order.shippingAddress.city}, Kerala)
                      </span>
                      <span className="text-sm font-black text-white">
                        Total: <strong className="text-lime">{formatINR(order.total)}</strong>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Wishlist */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            {wishlist.length === 0 ? (
              <div className="py-16 text-center rounded-3xl bg-graphite border border-graphite-border p-8 space-y-4">
                <Heart className="w-12 h-12 text-coolgray-500 mx-auto" />
                <h3 className="text-base font-bold text-white">Your Wishlist is Empty</h3>
                <p className="text-xs text-coolgray-400 max-w-sm mx-auto">
                  Save products you like to easily purchase later or track availability at our Kakkanad store.
                </p>
                <Link
                  to="/shop"
                  className="inline-block px-6 py-2.5 rounded-xl bg-lime text-charcoal font-bold text-xs uppercase"
                >
                  Explore Store
                </Link>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-coolgray-400">
                    {wishlist.length} saved {wishlist.length === 1 ? 'item' : 'items'}
                  </span>
                  <button
                    onClick={clearWishlist}
                    className="text-xs text-rose-400 hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {wishlist.map(product => (
                    <div
                      key={product.id}
                      className="p-4 rounded-3xl bg-graphite border border-graphite-border flex flex-col justify-between"
                    >
                      <div className="aspect-square bg-charcoal rounded-2xl p-4 flex items-center justify-center relative mb-3">
                        <img
                          src={product.images[0] || '/src/assets/product_whey.jpg'}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-charcoal/80 text-rose-400 hover:bg-charcoal"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-lime uppercase">{product.brand}</span>
                        <Link to={`/product/${product.slug}`} className="hover:text-lime transition-colors">
                          <h4 className="text-xs font-bold text-white line-clamp-2 mt-0.5">{product.name}</h4>
                        </Link>
                        <span className="text-sm font-black text-white block mt-2">{formatINR(product.price)}</span>
                      </div>

                      <button
                        onClick={() => addItem(product, product.variants[0], 1)}
                        className="mt-4 w-full py-2.5 rounded-xl bg-lime text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-lime-hover flex items-center justify-center gap-1.5 shadow-lime-glow-sm"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Move to Cart</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Customer Profile */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl p-8 rounded-3xl bg-graphite border border-graphite-border space-y-6">
            <h3 className="font-display font-black text-white text-base uppercase">
              Customer Profile Information
            </h3>

            <div className="space-y-4 text-xs text-coolgray-300">
              <div className="p-4 rounded-2xl bg-charcoal border border-graphite-border space-y-2">
                <span className="text-[10px] text-lime font-bold uppercase tracking-wider block">
                  Active Guest / Customer Session
                </span>
                <p>Welcome to PROTEIN IN TOWN. In this release, your customer state, wishlist, cart, and simulated orders are safely persisted in your browser session storage.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-charcoal border border-graphite-border">
                  <span className="text-coolgray-400 block mb-1">Preferred Store:</span>
                  <strong className="text-white text-sm block">PROTEIN IN TOWN</strong>
                  <span className="text-coolgray-400">Ground Floor, Kusumagiri Jn, Kakkanad</span>
                </div>
                <div className="p-4 rounded-2xl bg-charcoal border border-graphite-border">
                  <span className="text-coolgray-400 block mb-1">Default Market:</span>
                  <strong className="text-white text-sm block">Kochi, Kerala (PIN 682030)</strong>
                  <span className="text-coolgray-400">Delivery & Store Pickup active</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
