import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Dumbbell, 
  ShieldCheck, 
  PhoneCall, 
  MapPin, 
  User,
  Sparkles,
  Flame,
  ArrowRight,
  Clock
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/categories';

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const { itemCount, setDrawerOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { settings } = useStore();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsShopDropdownOpen(false);
  }, [location.pathname]);

  // Keyboard shortcut (⌘K or Ctrl+K) to trigger search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenSearch]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled ? 'glass-header-scrolled' : 'glass-header'
      }`}
    >
      {/* Top Ambient Specular Light Beam */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-lime/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16 sm:h-[72px]' : 'h-20'}`}>
          
          {/* Brand Logo with Beveled Glass Shield */}
          <Link to="/" className="flex items-center gap-3.5 group focus:outline-none shrink-0">
            <div className="relative">
              {/* Radiant ambient glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-lime/50 to-lime/10 rounded-2xl blur-md opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-b from-white/[0.16] to-white/[0.04] p-[1px] shadow-lg shadow-black/40">
                <div className="w-full h-full rounded-[15px] bg-[#101317]/95 backdrop-blur-md flex items-center justify-center border border-white/[0.08] group-hover:border-lime/60 transition-colors">
                  <Dumbbell className="w-5 h-5 text-lime transform group-hover:rotate-[-12deg] group-hover:scale-110 transition-transform duration-300 stroke-[2.3]" />
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-display font-black text-xl sm:text-2xl tracking-tighter text-white uppercase flex items-center gap-1.5 leading-none">
                PROTEIN <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime via-lime-light to-white">IN TOWN</span>
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] tracking-widest uppercase text-coolgray-400 font-extrabold">
                  The Complete Supplement Store
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links — Floating Glass Pill Dock */}
          <nav className="hidden lg:flex items-center p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-md shadow-inner gap-1">
            
            {/* Home */}
            <Link 
              to="/" 
              className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
                isActive('/') 
                  ? 'bg-white/[0.1] text-white shadow-sm border border-white/[0.1]' 
                  : 'text-coolgray-300 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              HOME
            </Link>

            {/* Shop Dropdown with Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={() => setIsShopDropdownOpen(true)}
              onMouseLeave={() => setIsShopDropdownOpen(false)}
            >
              <Link 
                to="/shop" 
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
                  isActive('/shop') 
                    ? 'bg-white/[0.1] text-white shadow-sm border border-white/[0.1]' 
                    : 'text-coolgray-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <span>SHOP</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isShopDropdownOpen ? 'rotate-180 text-lime' : 'text-coolgray-400'}`} />
              </Link>

              {/* Luxury Glass Mega Menu Dropdown */}
              {isShopDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="w-[540px] glass-dropdown rounded-3xl p-5 animate-in fade-in slide-in-from-top-2 duration-200 text-left">
                    
                    {/* Header line */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08]">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-lime" />
                        <span className="text-[11px] font-black uppercase tracking-widest text-coolgray-300">
                          Supplement Categories
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-coolgray-400">
                        100% Genuine Importer Stock
                      </span>
                    </div>

                    {/* 2-Column Category Grid */}
                    <div className="grid grid-cols-2 gap-2">
                      {CATEGORIES.slice(0, 6).map(category => (
                        <Link
                          key={category.id}
                          to={`/category/${category.slug}`}
                          className="flex flex-col p-2.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.04] hover:border-lime/40 transition-all group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white group-hover:text-lime transition-colors">
                              {category.name}
                            </span>
                            <ArrowRight className="w-3 h-3 text-coolgray-500 group-hover:text-lime group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                          </div>
                          <span className="text-[10px] text-coolgray-400 line-clamp-1 mt-0.5 font-normal">
                            {category.shortDesc}
                          </span>
                        </Link>
                      ))}
                    </div>

                    {/* Kakkanad Store Highlight Card inside Dropdown */}
                    <div className="mt-3 pt-3 border-t border-white/[0.08] flex items-center justify-between bg-white/[0.02] p-3 rounded-2xl border border-white/[0.04]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-lime/10 flex items-center justify-center text-lime shrink-0">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Physical Store in Kakkanad</div>
                          <div className="text-[10px] text-coolgray-400">Kusumagiri Jn • In-person pickup & verification</div>
                        </div>
                      </div>

                      <Link
                        to="/shop"
                        className="px-3.5 py-1.5 rounded-xl bg-lime hover:bg-lime-hover text-white font-extrabold text-[11px] uppercase tracking-wider shadow-lime-glow-sm transition-all"
                      >
                        All (50+)
                      </Link>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* Direct Category Shortcuts */}
            <Link 
              to="/category/whey-protein" 
              className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
                location.pathname === '/category/whey-protein' 
                  ? 'bg-white/[0.1] text-white shadow-sm border border-white/[0.1]' 
                  : 'text-coolgray-300 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              WHEY
            </Link>

            <Link 
              to="/category/creatine" 
              className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
                location.pathname === '/category/creatine' 
                  ? 'bg-white/[0.1] text-white shadow-sm border border-white/[0.1]' 
                  : 'text-coolgray-300 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              CREATINE
            </Link>

            <Link 
              to="/category/pre-workout" 
              className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
                location.pathname === '/category/pre-workout' 
                  ? 'bg-white/[0.1] text-white shadow-sm border border-white/[0.1]' 
                  : 'text-coolgray-300 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              PRE-WORKOUT
            </Link>

            {/* Glowing Offers Tag */}
            <Link 
              to="/offers" 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black tracking-wider uppercase transition-all ${
                location.pathname === '/offers'
                  ? 'bg-lime text-white shadow-lime-glow-sm'
                  : 'text-lime bg-lime/10 hover:bg-lime/20 border border-lime/30 shadow-[0_0_12px_rgba(255,42,58,0.2)]'
              }`}
            >
              <Flame className="w-3.5 h-3.5 animate-pulse" />
              <span>OFFERS</span>
            </Link>

            <Link 
              to="/about" 
              className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
                location.pathname === '/about' 
                  ? 'bg-white/[0.1] text-white shadow-sm border border-white/[0.1]' 
                  : 'text-coolgray-300 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              ABOUT
            </Link>

            <Link 
              to="/contact" 
              className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
                location.pathname === '/contact' 
                  ? 'bg-white/[0.1] text-white shadow-sm border border-white/[0.1]' 
                  : 'text-coolgray-300 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              STORE
            </Link>

          </nav>

          {/* Right Action Icons & Luxury Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Glass Search Trigger with ⌘K Badge */}
            <button
              onClick={onOpenSearch}
              aria-label="Search supplements (Ctrl+K or ⌘K)"
              className="glass-pill glass-pill-hover flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-coolgray-300 hover:text-white transition-all shadow-inner group"
            >
              <Search className="w-4 h-4 text-coolgray-400 group-hover:text-lime transition-colors" />
              <span className="hidden xl:inline text-xs text-coolgray-400 font-medium">Search...</span>
              <kbd className="hidden xl:inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.08] text-coolgray-400">
                ⌘K
              </kbd>
            </button>

            {/* Frosted Wishlist Button */}
            <Link
              to="/account?tab=wishlist"
              aria-label="Wishlist"
              className="glass-pill glass-pill-hover relative p-2.5 rounded-xl text-coolgray-300 hover:text-white transition-all group"
            >
              <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-lime text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-lime-glow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Frosted Account Button */}
            <Link
              to="/account"
              aria-label="My Account"
              className="glass-pill glass-pill-hover p-2.5 rounded-xl text-coolgray-300 hover:text-white transition-all hidden sm:flex group"
            >
              <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </Link>

            {/* Luxury Radiant Red Cart Pill */}
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Shopping Cart"
              className="relative overflow-hidden group flex items-center gap-2.5 px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-lime to-[#D11A30] hover:from-[#FF4D5D] hover:to-lime text-white font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,42,58,0.4)] hover:shadow-[0_0_28px_rgba(255,42,58,0.65)] transition-all transform hover:scale-[1.02] active:scale-95 border border-white/20"
            >
              {/* Shimmer sweep effect */}
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />

              <div className="relative">
                <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="hidden sm:inline">CART</span>
              <span className="px-1.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-black font-mono border border-white/20">
                {itemCount}
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="glass-pill glass-pill-hover p-2.5 rounded-xl text-coolgray-300 hover:text-white transition-all lg:hidden"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-lime" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Luxury Glass Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass-dropdown border-t border-b border-white/[0.1] px-5 pt-4 pb-6 animate-in slide-in-from-top-3 duration-200">
          
          {/* Quick Search Trigger Inside Mobile Menu */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-xs text-coolgray-400 mb-4"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-lime" />
              Search supplements, whey, creatine...
            </span>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-coolgray-400">⌘K</kbd>
          </button>

          <div className="flex flex-col gap-1.5">
            <Link
              to="/"
              className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                location.pathname === '/' ? 'bg-white/[0.08] text-white border border-white/[0.1]' : 'text-coolgray-300 hover:bg-white/[0.04]'
              }`}
            >
              Home
            </Link>

            <Link
              to="/shop"
              className="px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider text-lime bg-lime/10 border border-lime/20 flex items-center justify-between"
            >
              <span>Shop All Products</span>
              <span className="text-[10px] bg-lime text-white px-2 py-0.5 rounded-md font-extrabold">50+ Items</span>
            </Link>

            <div className="pt-3 pb-1 px-4 text-[10px] font-black text-coolgray-400 uppercase tracking-widest">
              Popular Categories
            </div>
            <div className="grid grid-cols-2 gap-2 px-1">
              {CATEGORIES.slice(0, 6).map(category => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="px-3.5 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-xs font-bold text-coolgray-200 border border-white/[0.05] hover:border-lime/40 transition-all"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <div className="my-2 border-t border-white/[0.08]"></div>

            <Link
              to="/offers"
              className="px-4 py-2.5 rounded-xl text-xs font-black text-lime hover:bg-white/[0.04] flex items-center gap-2"
            >
              <Flame className="w-4 h-4 text-lime" />
              <span>Current Deals & Coupon Codes (RED15)</span>
            </Link>
            
            <Link
              to="/about"
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-coolgray-300 hover:bg-white/[0.04]"
            >
              About Protein In Town
            </Link>
            
            <Link
              to="/contact"
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-coolgray-300 hover:bg-white/[0.04]"
            >
              Store Locator & Kakkanad Map
            </Link>

            <Link
              to="/account"
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-coolgray-300 hover:bg-white/[0.04] flex items-center justify-between"
            >
              <span>My Account & Orders</span>
              <User className="w-4 h-4 text-coolgray-400" />
            </Link>

            <Link
              to="/admin"
              className="px-4 py-2 rounded-xl text-[11px] font-bold text-coolgray-400 hover:text-white flex items-center gap-2"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-lime" />
              Store Manager Portal
            </Link>
          </div>

          {/* Quick Kakkanad Store Contact Cards */}
          <div className="mt-4 pt-4 border-t border-white/[0.08] flex flex-col gap-2.5 text-xs">
            <div className="flex items-center gap-2.5 text-coolgray-300 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <MapPin className="w-4 h-4 text-lime shrink-0" />
              <span className="text-[11px]">Kusumagiri Jn, Kakkanad, Kochi</span>
            </div>
            <a 
              href={`tel:${settings.phone}`}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white font-bold text-xs"
            >
              <PhoneCall className="w-3.5 h-3.5 text-lime" />
              <span>Call Store: {settings.phone}</span>
            </a>
          </div>

        </div>
      )}
    </header>
  );
};
