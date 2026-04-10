import React, { createContext, useContext, useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from './constants';
import { AuthState, LocalProfile, Product, User } from './types';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import ProductDetail from './pages/ProductDetail';
import PrivacyDashboard from './pages/PrivacyDashboard';
import CartPage from './pages/CartPage';
import { Search, X, ArrowRight, Shield, Leaf } from 'lucide-react';

// Privacy Context for Local Learning
interface PrivacyContextType {
  profile: LocalProfile;
  recordInteraction: (productId: string, type: 'view' | 'click' | 'cart') => void;
  getRecommendations: (limit?: number) => Product[];
  getWeatherRecommendations: (weather: string, limit?: number) => Product[];
  clearData: () => void;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
}

const PrivacyContext = createContext<PrivacyContextType | null>(null);

export const usePrivacy = () => {
  const context = useContext(PrivacyContext);
  if (!context) throw new Error('usePrivacy must be used within PrivacyProvider');
  return context;
};

export default function App() {
  const [authState, setAuthState] = useState<AuthState>({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
  });

  const [profile, setProfile] = useState<LocalProfile>(() => {
    const saved = localStorage.getItem('local_profile');
    const data = saved ? JSON.parse(saved) : {};
    return {
      interactions: data.interactions || [],
      preferences: data.preferences || [],
      cart: data.cart || [],
      lastViewed: data.lastViewed || []
    };
  });

  useEffect(() => {
    localStorage.setItem('local_profile', JSON.stringify(profile));
  }, [profile]);

  const recordInteraction = (productId: string, type: 'view' | 'click' | 'cart') => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    setProfile(prev => {
      const newInteractions = [...prev.interactions, { productId, type, timestamp: Date.now() }];
      // Keep only last 50 interactions for privacy/performance
      const trimmedInteractions = newInteractions.slice(-50);
      
      // Update lastViewed (keep last 10 unique products)
      let newLastViewed = prev.lastViewed || [];
      if (type === 'view') {
        newLastViewed = [productId, ...newLastViewed.filter(id => id !== productId)].slice(0, 10);
      }

      // Update preferences based on tags of interacted products
      const tagCounts: Record<string, number> = {};
      trimmedInteractions.forEach(interaction => {
        const p = PRODUCTS.find(prod => prod.id === interaction.productId);
        p?.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + (interaction.type === 'cart' ? 3 : 1);
        });
      });

      const topPreferences = Object.entries(tagCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([tag]) => tag);

      return {
        ...prev,
        interactions: trimmedInteractions,
        preferences: topPreferences,
        lastViewed: newLastViewed
      };
    });
  };

  const getRecommendations = (limit = 4) => {
    if (!profile?.preferences || profile.preferences.length === 0) {
      return PRODUCTS.slice(0, limit);
    }

    return PRODUCTS
      .map(p => {
        const score = p.tags.reduce((acc, tag) => acc + (profile.preferences.includes(tag) ? 1 : 0), 0);
        return { product: p, score };
      })
      .sort((a, b) => b.score - a.score)
      .map(item => item.product)
      .slice(0, limit);
  };

  const getWeatherRecommendations = (weather: string, limit = 4) => {
    return PRODUCTS
      .filter(p => p.climateContext.includes(weather.toLowerCase()))
      .slice(0, limit);
  };

  const clearData = () => {
    setProfile({ interactions: [], preferences: [], cart: [], lastViewed: [] });
    localStorage.removeItem('local_profile');
  };

  const addToCart = (productId: string) => {
    recordInteraction(productId, 'cart');
    setProfile(prev => {
      const existing = prev.cart.find(item => item.productId === productId);
      if (existing) {
        return {
          ...prev,
          cart: prev.cart.map(item => 
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      }
      return {
        ...prev,
        cart: [...prev.cart, { productId, quantity: 1 }]
      };
    });
  };

  const removeFromCart = (productId: string) => {
    setProfile(prev => ({
      ...prev,
      cart: prev.cart.filter(item => item.productId !== productId)
    }));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setProfile(prev => ({
      ...prev,
      cart: prev.cart.map(item => 
        item.productId === productId ? { ...item, quantity } : item
      )
    }));
  };

  const handleLogin = (user: User, token: string) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    setAuthState({ user, token, isAuthenticated: true });
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setAuthState({ user: null, token: null, isAuthenticated: false });
  };

  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <PrivacyContext.Provider value={{ 
      profile, 
      recordInteraction, 
      getRecommendations, 
      getWeatherRecommendations,
      clearData, 
      addToCart, 
      removeFromCart, 
      updateCartQuantity 
    }}>
      <div className="min-h-screen flex flex-col">
        <Navbar auth={authState} onLogout={handleLogout} onSearchClick={() => setIsSearchOpen(true)} />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<AuthPage onLogin={handleLogin} />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/privacy" element={<PrivacyDashboard />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AnimatePresence>
        </main>

        {/* Global Search Modal */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12"
            >
              <div className="absolute inset-0 bg-brand-brown/80 backdrop-blur-xl" onClick={() => setIsSearchOpen(false)} />
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-4xl bg-brand-beige rounded-[4rem] overflow-hidden shadow-2xl"
              >
                <div className="p-12 md:p-24">
                  <div className="flex items-center justify-between mb-16">
                    <h2 className="font-display text-6xl italic text-brand-brown tracking-tight">Search Collection.</h2>
                    <button 
                      onClick={() => setIsSearchOpen(false)}
                      className="w-16 h-16 rounded-full bg-brand-brown/5 flex items-center justify-center hover:bg-brand-gold hover:text-brand-brown transition-all duration-500 group"
                    >
                      <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-500" />
                    </button>
                  </div>
                  <div className="relative group mb-16">
                    <div className="absolute -inset-2 bg-brand-gold/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                    <div className="relative flex items-center bg-white/60 backdrop-blur-3xl rounded-[3rem] border border-brand-gold/20 overflow-hidden group-hover:bg-white transition-all duration-500">
                      <Search className="w-8 h-8 ml-12 text-brand-brown/20" />
                      <input 
                        autoFocus
                        type="text" 
                        placeholder="What are you looking for?"
                        className="w-full px-10 py-12 bg-transparent outline-none text-3xl font-display italic placeholder:text-brand-brown/10"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const query = (e.target as HTMLInputElement).value;
                            setIsSearchOpen(false);
                            navigate(`/?search=${encodeURIComponent(query)}`);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {['Ethnic', 'Western', 'Footwear', 'Accessories'].map(tag => (
                      <button 
                        key={tag}
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigate(`/?search=${encodeURIComponent(tag)}`);
                        }}
                        className="px-8 py-6 rounded-2xl bg-brand-brown/5 text-brand-brown text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-brand-gold hover:text-brand-brown transition-all duration-500 relative overflow-hidden group"
                      >
                        <span className="relative z-10">{tag}</span>
                        <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="bg-brand-brown text-brand-beige py-32 px-8 mt-32 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-brand-gold/20" />
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20 relative z-10">
              <div className="col-span-1 md:col-span-2">
                <h3 className="font-display text-5xl mb-8 text-brand-gold tracking-tight">PRIVOURA</h3>
                <p className="text-lg opacity-40 font-light leading-relaxed max-w-md mb-12">
                  The future of luxury is private. We combine high-end fashion with edge intelligence to protect your digital legacy.
                </p>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-gold transition-colors cursor-pointer group">
                    <Shield className="w-5 h-5 text-brand-gold group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-gold transition-colors cursor-pointer group">
                    <Leaf className="w-5 h-5 text-brand-green group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-brand-gold">Collection</h4>
                <ul className="space-y-6 text-sm opacity-40 font-light">
                  <li><a href="/" className="hover:text-brand-gold hover:opacity-100 transition-all">New Arrivals</a></li>
                  <li><a href="/" className="hover:text-brand-gold hover:opacity-100 transition-all">The Archive</a></li>
                  <li><a href="/privacy" className="hover:text-brand-gold hover:opacity-100 transition-all">Privacy Dashboard</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-brand-gold">Maison</h4>
                <ul className="space-y-6 text-sm opacity-40 font-light">
                  <li><a href="/" className="hover:text-brand-gold hover:opacity-100 transition-all">Our Story</a></li>
                  <li><a href="/" className="hover:text-brand-gold hover:opacity-100 transition-all">Sustainability</a></li>
                  <li><a href="/auth" className="hover:text-brand-gold hover:opacity-100 transition-all">Concierge</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] opacity-20">
              <span>© 2026 PRIVOURA. All rights reserved.</span>
              <div className="flex gap-12">
                <a href="/" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
                <a href="/" className="hover:text-brand-gold transition-colors">Terms of Service</a>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px]" />
          </footer>
    </div>
  </PrivacyContext.Provider>
);
}
