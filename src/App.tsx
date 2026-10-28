import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { CartDrawer } from './components/common/CartDrawer';
import { SearchModal } from './components/common/SearchModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AccountPage } from './pages/AccountPage';
import { OffersPage } from './pages/OffersPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { AdminPage } from './pages/AdminPage';

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// 404 Not Found Component
const NotFoundPage: React.FC = () => (
  <div className="bg-charcoal min-h-[70vh] flex items-center justify-center py-20 px-4">
    <div className="max-w-md w-full text-center p-8 rounded-3xl bg-graphite border border-graphite-border space-y-4">
      <span className="text-lime font-black text-6xl block">404</span>
      <h2 className="text-xl font-bold text-white uppercase">Page Not Found</h2>
      <p className="text-xs text-coolgray-400">
        The supplement or page you are looking for does not exist or has been relocated.
      </p>
      <Link
        to="/shop"
        className="inline-block px-6 py-2.5 rounded-xl bg-lime text-charcoal font-black text-xs uppercase tracking-wider hover:bg-lime-hover shadow-lime-glow-sm"
      >
        Return to Shop
      </Link>
    </div>
  </div>
);

export const App: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-charcoal text-white selection:bg-lime selection:text-charcoal">
        <AnnouncementBar />
        <Header onOpenSearch={() => setIsSearchOpen(true)} />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:slug" element={<ProductDetailPage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/shipping" element={<LegalPage initialType="shipping" />} />
            <Route path="/privacy" element={<LegalPage initialType="privacy" />} />
            <Route path="/terms" element={<LegalPage initialType="terms" />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
        <FloatingWhatsApp />
        <CartDrawer />
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </div>
    </BrowserRouter>
  );
};
