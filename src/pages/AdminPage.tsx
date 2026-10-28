import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Package, 
  ShoppingBag, 
  Settings, 
  DollarSign, 
  Users, 
  AlertTriangle, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  Save, 
  RotateCcw,
  Sparkles,
  Eye,
  Star
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useOrders } from '../context/OrderContext';
import { Product, OrderStatus } from '../types';
import { formatINR, formatDate } from '../utils/formatters';

export const AdminPage: React.FC = () => {
  const { settings, updateSettings, products, addProduct, updateProduct, deleteProduct, reviews, deleteReview, resetToDefaults } = useStore();
  const { orders, updateOrderStatus } = useOrders();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('pit_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Active Admin Section Tab
  const [adminTab, setAdminTab] = useState<'overview' | 'products' | 'orders' | 'settings' | 'reviews'>('overview');

  // Product Edit Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Store Settings Form State
  const [settingsForm, setSettingsForm] = useState(settings);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('pit_admin_auth', 'true');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('pit_admin_auth');
  };

  // Metrics Calculations
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter(o => o.orderStatus === 'Pending' || o.orderStatus === 'Confirmed');
  const lowStockProducts = products.filter(p => p.stock <= 15);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    setSaveSuccessMsg('Store settings updated and published live!');
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  const handleSaveProductEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct.id, editingProduct);
    setEditingProduct(null);
    setSaveSuccessMsg('Product details successfully updated!');
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-charcoal min-h-[75vh] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-graphite border border-graphite-border shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-lime/10 text-lime flex items-center justify-center mx-auto border border-lime/30 shadow-lime-glow-sm">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[10px] text-lime font-black uppercase tracking-widest block mb-1">
              RESTRICTED ACCESS
            </span>
            <h1 className="font-display font-black text-2xl text-white uppercase tracking-tight">
              Store Owner Admin Gate
            </h1>
            <p className="text-xs text-coolgray-400 mt-1">
              Enter staff passcode to manage PROTEIN IN TOWN products, orders, and store settings.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={pinInput}
                onChange={e => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="Enter Passcode (Default: admin123)"
                className="w-full bg-charcoal border border-graphite-border rounded-xl px-4 py-3 text-center text-sm text-white placeholder-coolgray-500 focus:outline-none focus:border-lime font-mono tracking-widest"
              />
              {pinError && (
                <p className="text-xs text-rose-400 mt-1.5">
                  Incorrect passcode. Use default: <code className="text-lime">admin123</code>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-lime hover:bg-lime-hover text-charcoal font-black text-xs uppercase tracking-wider shadow-lime-glow-sm transition-all"
            >
              Unlock Dashboard
            </button>
          </form>

          <div className="text-[11px] text-coolgray-500">
            PROTEIN IN TOWN • Kakkanad Store Administration
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-charcoal min-h-screen py-10 sm:py-14 border-b border-graphite-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-graphite border border-graphite-border shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-lime text-charcoal flex items-center justify-center font-black">
              <ShieldCheck className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                Store Admin Panel
              </h1>
              <p className="text-xs text-coolgray-400">
                PROTEIN IN TOWN • Kakkanad, Kochi (Logged in as Store Manager)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-charcoal hover:bg-charcoal-700 border border-graphite-border text-xs text-coolgray-300 font-bold uppercase tracking-wider transition-colors"
            >
              Lock Dashboard
            </button>
          </div>
        </div>

        {saveSuccessMsg && (
          <div className="p-4 rounded-2xl bg-lime/10 border border-lime/30 text-lime text-xs font-bold flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-graphite-border pb-4">
          {[
            { id: 'overview', label: 'Overview Metrics', icon: DollarSign },
            { id: 'products', label: `Products (${products.length})`, icon: Package },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'reviews', label: `Customer Reviews (${reviews.length})`, icon: Star },
            { id: 'settings', label: 'Store & Announcement Settings', icon: Settings },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  adminTab === tab.id
                    ? 'bg-lime text-charcoal shadow-lime-glow-sm'
                    : 'bg-graphite text-coolgray-400 hover:text-white border border-graphite-border'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {adminTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="p-6 rounded-3xl bg-graphite border border-graphite-border space-y-2">
                <span className="text-[11px] font-bold text-coolgray-400 uppercase tracking-wider">
                  Total Sales Volume
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-lime">
                  {formatINR(totalSales)}
                </h3>
                <span className="text-[11px] text-coolgray-500">Based on recorded customer orders</span>
              </div>

              <div className="p-6 rounded-3xl bg-graphite border border-graphite-border space-y-2">
                <span className="text-[11px] font-bold text-coolgray-400 uppercase tracking-wider">
                  Total Customer Orders
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {orders.length}
                </h3>
                <span className="text-[11px] text-coolgray-500">From Kakkanad and across Kerala</span>
              </div>

              <div className="p-6 rounded-3xl bg-graphite border border-graphite-border space-y-2">
                <span className="text-[11px] font-bold text-coolgray-400 uppercase tracking-wider">
                  Pending Fulfillment
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-amber-400">
                  {pendingOrders.length}
                </h3>
                <span className="text-[11px] text-coolgray-500">Orders requiring packing or delivery</span>
              </div>

              <div className="p-6 rounded-3xl bg-graphite border border-graphite-border space-y-2">
                <span className="text-[11px] font-bold text-coolgray-400 uppercase tracking-wider">
                  Low Stock Inventory
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-rose-400">
                  {lowStockProducts.length}
                </h3>
                <span className="text-[11px] text-coolgray-500">Items with &le; 15 units remaining</span>
              </div>

            </div>

            {/* Recent Orders Overview */}
            <div className="p-6 rounded-3xl bg-graphite border border-graphite-border space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-extrabold text-white text-base uppercase">
                  Recent Orders
                </h3>
                <button
                  onClick={() => setAdminTab('orders')}
                  className="text-xs text-lime hover:underline font-bold"
                >
                  View All Orders →
                </button>
              </div>

              <div className="divide-y divide-graphite-border/70">
                {orders.slice(0, 3).map(order => (
                  <div key={order.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-mono font-bold text-white">{order.orderNumber}</span>
                      <span className="text-coolgray-400 ml-2">by {order.shippingAddress.fullName}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-lime">{formatINR(order.total)}</span>
                      <span className="bg-charcoal px-2.5 py-1 rounded text-[11px] text-coolgray-300 border border-graphite-border">
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Product Management */}
        {adminTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-extrabold text-white text-base uppercase">
                  Catalogue Inventory Management
                </h3>
                <p className="text-xs text-coolgray-400">
                  Add, update prices, manage stock quantities, and feature products on homepage.
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-graphite border border-graphite-border overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-charcoal border-b border-graphite-border text-coolgray-400 uppercase tracking-wider">
                      <th className="py-3.5 px-4 font-bold">Product</th>
                      <th className="py-3.5 px-4 font-bold">Category</th>
                      <th className="py-3.5 px-4 font-bold">Price</th>
                      <th className="py-3.5 px-4 font-bold">Stock</th>
                      <th className="py-3.5 px-4 font-bold">Featured</th>
                      <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-graphite-border/60">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-charcoal/50 text-coolgray-200">
                        <td className="py-3.5 px-4 flex items-center gap-3">
                          <img
                            src={p.images[0] || '/src/assets/product_whey.jpg'}
                            alt={p.name}
                            className="w-9 h-9 object-contain rounded-lg bg-charcoal p-1 shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="text-[10px] text-lime font-bold uppercase">{p.brand}</span>
                            <span className="text-xs font-bold text-white block truncate max-w-xs">{p.name}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">{p.categoryName}</td>
                        <td className="py-3.5 px-4 font-black text-white">{formatINR(p.price)}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            p.stock <= 15 ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-lime/10 text-lime'
                          }`}>
                            {p.stock} units
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => updateProduct(p.id, { isFeatured: !p.isFeatured })}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase ${
                              p.isFeatured ? 'bg-lime text-charcoal' : 'bg-charcoal text-coolgray-500'
                            }`}
                          >
                            {p.isFeatured ? 'Yes' : 'No'}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingProduct(p)}
                              className="p-1.5 rounded-lg bg-charcoal hover:bg-charcoal-700 text-coolgray-300 hover:text-white"
                              title="Edit product"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteProduct(p.id)}
                              className="p-1.5 rounded-lg bg-charcoal hover:bg-rose-900/50 text-coolgray-400 hover:text-rose-400"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Order Management */}
        {adminTab === 'orders' && (
          <div className="space-y-6">
            <h3 className="font-display font-extrabold text-white text-base uppercase">
              Order Fulfillment & Management
            </h3>

            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="p-6 rounded-3xl bg-graphite border border-graphite-border space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-graphite-border gap-2">
                    <div>
                      <span className="font-mono font-black text-sm text-lime">{order.orderNumber}</span>
                      <span className="text-xs text-coolgray-400 ml-2">• Placed: {formatDate(order.date)}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-coolgray-400">Update Status:</span>
                      <select
                        value={order.orderStatus}
                        onChange={e => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className="bg-charcoal border border-graphite-border rounded-xl px-3 py-1.5 text-xs text-white font-bold focus:outline-none focus:border-lime"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-coolgray-400 block mb-1 font-semibold">Customer & Delivery:</span>
                      <strong className="text-white block">{order.shippingAddress.fullName} ({order.shippingAddress.phone})</strong>
                      <p className="text-coolgray-300 mt-0.5">{order.shippingAddress.addressLine}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pinCode}</p>
                    </div>

                    <div>
                      <span className="text-coolgray-400 block mb-1 font-semibold">Payment & Total:</span>
                      <p className="text-coolgray-300">Method: <strong className="text-white">{order.paymentMethod}</strong> ({order.paymentStatus})</p>
                      <p className="text-base font-black text-lime mt-1">Total: {formatINR(order.total)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Reviews Moderation */}
        {adminTab === 'reviews' && (
          <div className="space-y-6">
            <h3 className="font-display font-extrabold text-white text-base uppercase">
              Customer Reviews Moderation
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map(rev => (
                <div key={rev.id} className="p-5 rounded-2xl bg-graphite border border-graphite-border flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <button
                        onClick={() => deleteReview(rev.id)}
                        className="text-xs text-rose-400 hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                    <p className="text-xs text-coolgray-200 italic">&ldquo;{rev.comment}&rdquo;</p>
                  </div>

                  <div className="pt-2 border-t border-graphite-border text-[11px] text-coolgray-400">
                    By <strong className="text-white">{rev.author}</strong> ({rev.location}) on {formatDate(rev.date)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Store & Announcement Settings Editor */}
        {adminTab === 'settings' && (
          <div className="p-8 rounded-3xl bg-graphite border border-graphite-border max-w-3xl space-y-6">
            <div>
              <h3 className="font-display font-extrabold text-white text-lg uppercase">
                Storefront & Contact Configuration
              </h3>
              <p className="text-xs text-coolgray-400 mt-1">
                Edit physical store details, WhatsApp numbers, announcement messages, and free shipping limits.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-coolgray-300 uppercase tracking-wider mb-1">
                  Store Motto / Tagline
                </label>
                <input
                  type="text"
                  value={settingsForm.tagline}
                  onChange={e => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                  placeholder="e.g. The Complete Supplement Store"
                  className="w-full bg-charcoal border border-graphite-border rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-lime"
                />
              </div>

              <div>
                <label className="block font-bold text-coolgray-300 uppercase tracking-wider mb-1">
                  Announcement Bar Banner Text
                </label>
                <input
                  type="text"
                  value={settingsForm.announcementText}
                  onChange={e => setSettingsForm({ ...settingsForm, announcementText: e.target.value })}
                  className="w-full bg-charcoal border border-graphite-border rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-lime"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-coolgray-300 uppercase tracking-wider mb-1">
                    Store Phone Number
                  </label>
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={e => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    className="w-full bg-charcoal border border-graphite-border rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-lime"
                  />
                </div>

                <div>
                  <label className="block font-bold text-coolgray-300 uppercase tracking-wider mb-1">
                    Business WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={settingsForm.whatsapp}
                    onChange={e => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                    className="w-full bg-charcoal border border-graphite-border rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-lime"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-coolgray-300 uppercase tracking-wider mb-1">
                  Physical Store Address (Kakkanad)
                </label>
                <input
                  type="text"
                  value={settingsForm.address}
                  onChange={e => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="w-full bg-charcoal border border-graphite-border rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-lime"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-coolgray-300 uppercase tracking-wider mb-1">
                    Operating Hours
                  </label>
                  <input
                    type="text"
                    value={settingsForm.openingHours}
                    onChange={e => setSettingsForm({ ...settingsForm, openingHours: e.target.value })}
                    className="w-full bg-charcoal border border-graphite-border rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-lime"
                  />
                </div>

                <div>
                  <label className="block font-bold text-coolgray-300 uppercase tracking-wider mb-1">
                    Free Shipping Threshold (₹)
                  </label>
                  <input
                    type="number"
                    value={settingsForm.freeShippingThreshold}
                    onChange={e => setSettingsForm({ ...settingsForm, freeShippingThreshold: Number(e.target.value) })}
                    className="w-full bg-charcoal border border-graphite-border rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-lime"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-lime hover:bg-lime-hover text-charcoal font-black uppercase tracking-wider flex items-center gap-2 shadow-lime-glow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish Settings Live</span>
                </button>

                <button
                  type="button"
                  onClick={resetToDefaults}
                  className="px-4 py-3 rounded-xl bg-charcoal border border-graphite-border text-coolgray-400 hover:text-white uppercase font-bold text-xs"
                >
                  Reset To Factory Defaults
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Product Edit Modal */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setEditingProduct(null)} />
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative w-full max-w-lg rounded-3xl bg-graphite border border-graphite-border p-6 sm:p-8 space-y-4">
                <h3 className="font-display font-extrabold text-white text-base uppercase">
                  Edit Product: {editingProduct.name}
                </h3>

                <form onSubmit={handleSaveProductEdit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-coolgray-300 uppercase mb-1">Price (₹)</label>
                    <input
                      type="number"
                      value={editingProduct.price}
                      onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                      className="w-full bg-charcoal border border-graphite-border rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-coolgray-300 uppercase mb-1">Stock Quantity</label>
                    <input
                      type="number"
                      value={editingProduct.stock}
                      onChange={e => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                      className="w-full bg-charcoal border border-graphite-border rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-3 rounded-xl bg-lime text-charcoal font-black uppercase"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingProduct(null)}
                      className="px-4 py-3 rounded-xl bg-charcoal text-coolgray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
