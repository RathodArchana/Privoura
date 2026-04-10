import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { usePrivacy } from '../App';
import { Product } from '../types';
import { Cloud, Sun, CloudRain, Thermometer, Shield, ArrowRight, Search, Sparkles, Wind, Leaf, Zap, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { AIFashionAdvisor } from '../components/AIFashionAdvisor';

export default function Home() {
  const location = useLocation();
  const { getRecommendations, getWeatherRecommendations, profile } = usePrivacy();
  const [climate, setClimate] = useState<'sunny' | 'rainy' | 'cold' | 'humid'>('sunny');
  const [category, setCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle search query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    if (search) {
      setSearchQuery(decodeURIComponent(search));
      // Scroll to search results if needed
      const element = document.getElementById('collection-grid');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.search]);

  const categories = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

  // Simulated Climate Detection (Context Aware)
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours > 18 || hours < 6) setClimate('cold');
    else if (Math.random() > 0.7) setClimate('rainy');
    else setClimate('sunny');
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = category === 'All' || p.category === category;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [category, searchQuery]);

  const personalized = getRecommendations(4);
  const weatherPicks = getWeatherRecommendations(climate, 4);
  const lastViewedProducts = (profile?.lastViewed || [])
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter((p): p is Product => !!p);

  const climateIcon = {
    sunny: <Sun className="text-yellow-500" />,
    rainy: <CloudRain className="text-blue-500" />,
    cold: <Thermometer className="text-cyan-500" />,
    humid: <Cloud className="text-gray-500" />
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-24"
    >
      {/* AI Fashion Advisor */}
      <AIFashionAdvisor climate={climate} />

      {/* Hero Section - Editorial Style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 mb-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-luxury-mesh opacity-50" />
          <motion.div 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full"
          >
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
              alt="Editorial Fashion"
              className="w-full h-full object-cover opacity-10 grayscale contrast-125 scale-110"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          {/* Animated Gradient Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-beige/0 via-brand-beige/20 to-brand-beige" />
          <motion.div 
            animate={{ 
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="inline-flex items-center gap-4 px-10 py-3 rounded-full glass mb-16 premium-border group"
          >
            <Sparkles className="w-4 h-4 text-brand-gold group-hover:rotate-12 transition-transform duration-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-brand-brown/60">Privoura Collection 2026</span>
          </motion.div>

          <div className="relative mb-20">
            <motion.h1 
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[12vw] md:text-[16vw] leading-[0.75] tracking-tight text-brand-brown relative z-10"
            >
              Prestige.
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.5, duration: 2, ease: "easeInOut" }}
              className="absolute bottom-0 left-0 h-[1px] bg-brand-gold/30"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-xl md:text-2xl font-light text-brand-brown/60 mb-20 max-w-2xl mx-auto tracking-wide leading-relaxed"
          >
            Private Luxury Commerce. <br />
            <span className="italic font-display text-brand-gold">Redefining the art of personal style.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="flex flex-col items-center mb-24"
          >
            <div className="relative w-40 h-40 flex items-center justify-center group cursor-help">
              <div className="absolute inset-0 rounded-full border border-brand-gold/10 group-hover:border-brand-gold/30 transition-colors duration-700" />
              <svg className="w-full h-full transform -rotate-90">
                <motion.circle
                  cx="80"
                  cy="80"
                  r="76"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="transparent"
                  strokeDasharray={477}
                  initial={{ strokeDashoffset: 477 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 3, ease: "easeInOut", delay: 1.8 }}
                  className="text-brand-gold"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                  className="text-4xl font-display italic text-brand-brown"
                >
                  100
                </motion.span>
                <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-brand-brown/40">Privacy</span>
              </div>
              
              {/* Floating recommendation card hint */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-24 top-0 glass px-4 py-2 rounded-xl border border-brand-gold/20 shadow-xl hidden md:block"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-3 h-3 text-brand-teal" />
                  <span className="text-[8px] font-bold uppercase tracking-widest text-brand-teal">Local AI Active</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="max-w-3xl mx-auto relative group"
          >
            <div className="absolute -inset-4 bg-brand-gold/5 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative flex items-center bg-white/40 backdrop-blur-3xl rounded-[4rem] border border-white/60 shadow-2xl overflow-hidden group-hover:bg-white/60 transition-all duration-500">
              <Search className="w-6 h-6 ml-12 text-brand-brown/30" />
              <input 
                type="text" 
                placeholder="Search the private collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-10 py-12 bg-transparent outline-none text-2xl font-display italic placeholder:text-brand-brown/20"
              />
              <button className="mr-8 p-6 rounded-full bg-brand-brown text-brand-beige hover:bg-brand-gold hover:text-brand-brown transition-all duration-500 shadow-2xl group-hover:scale-105">
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute bottom-20 left-20 hidden lg:flex flex-col gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.4, x: 0 }}
            transition={{ delay: 2 }}
            className="flex items-center gap-8 text-[10px] font-medium uppercase tracking-[0.6em]"
          >
            <div className="w-24 h-[1px] bg-brand-brown" />
            <span>Exclusivity</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.4, x: 0 }}
            transition={{ delay: 2.2 }}
            className="flex items-center gap-8 text-[10px] font-medium uppercase tracking-[0.6em]"
          >
            <div className="w-24 h-[1px] bg-brand-brown" />
            <span>Discretion</span>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        {/* Context Aware Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 p-12 rounded-[4rem] glass border border-brand-gold/20 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/5 via-transparent to-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="flex items-center gap-10 relative z-10">
            <div className="w-20 h-20 rounded-[2rem] bg-white flex items-center justify-center shadow-2xl border border-brand-gold/10 group-hover:scale-110 transition-transform duration-500">
              {climateIcon[climate]}
            </div>
            <div>
              <h3 className="font-display text-4xl italic tracking-tight mb-2">Climate Match.</h3>
              <p className="text-sm opacity-60 uppercase tracking-[0.3em] text-[10px] font-bold">It's {climate} in your location. Curated for the moment.</p>
            </div>
          </div>
          <div className="flex gap-4 relative z-10">
            <span className="px-6 py-3 rounded-full bg-brand-teal/5 text-brand-teal text-[10px] font-bold uppercase tracking-widest border border-brand-teal/10 hover:bg-brand-teal hover:text-white transition-all duration-500 cursor-default">Sustainable Picks</span>
            <span className="px-6 py-3 rounded-full bg-brand-gold/5 text-brand-gold text-[10px] font-bold uppercase tracking-widest border border-brand-gold/10 hover:bg-brand-gold hover:text-brand-brown transition-all duration-500 cursor-default">Privacy Verified</span>
          </div>
        </motion.div>

        {/* Features Pillars */}
        <section className="mb-64">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="p-16 rounded-[4rem] bg-white border border-brand-gold/10 shadow-2xl hover:shadow-brand-gold/10 transition-all duration-700 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
              <div className="w-20 h-20 rounded-[2rem] bg-brand-teal/5 flex items-center justify-center mb-12 group-hover:scale-110 group-hover:bg-brand-teal/10 transition-all duration-500">
                <Shield className="w-10 h-10 text-brand-teal" />
              </div>
              <h3 className="font-display text-5xl italic mb-8 tracking-tight">Edge Privacy.</h3>
              <p className="text-lg opacity-50 leading-relaxed font-light">
                Your data never leaves your device. We use <span className="text-brand-teal font-medium">Edge Intelligence</span> to process your style profile locally, ensuring 100% anonymity.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="p-16 rounded-[4rem] bg-white border border-brand-gold/10 shadow-2xl hover:shadow-brand-gold/10 transition-all duration-700 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
              <div className="w-20 h-20 rounded-[2rem] bg-green-50 flex items-center justify-center mb-12 group-hover:scale-110 group-hover:bg-green-100 transition-all duration-500">
                <Leaf className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="font-display text-5xl italic mb-8 tracking-tight">Eco-Conscious.</h3>
              <p className="text-lg opacity-50 leading-relaxed font-light">
                Every piece is scored for sustainability. We prioritize organic materials, ethical labor, and low-impact production for the modern connoisseur.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.4 }}
              className="p-16 rounded-[4rem] bg-white border border-brand-gold/10 shadow-2xl hover:shadow-brand-gold/10 transition-all duration-700 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
              <div className="w-20 h-20 rounded-[2rem] bg-brand-gold/5 flex items-center justify-center mb-12 group-hover:scale-110 group-hover:bg-brand-gold/10 transition-all duration-500">
                <Zap className="w-10 h-10 text-brand-gold" />
              </div>
              <h3 className="font-display text-5xl italic mb-8 tracking-tight">AI Intelligence.</h3>
              <p className="text-lg opacity-50 leading-relaxed font-light">
                Smart recommendations that adapt to your local weather, current trends, and personal aesthetic in real-time, powered by local neural networks.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Weather Recommendations */}
        {weatherPicks.length > 0 && (
          <section className="mb-32">
            <div className="flex items-center gap-8 mb-16">
              <h2 className="font-display text-6xl italic tracking-tight">Weather Picks.</h2>
              <div className="flex-grow h-[1px] bg-brand-brown/10" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {weatherPicks.map((product, idx) => (
                <ProductCard key={`weather-${product.id}`} product={product} index={idx} />
              ))}
            </div>
          </section>
        )}

        {/* AI Style Recommendations */}
        {personalized.length > 0 && (
          <section className="mb-32">
            <div className="p-16 rounded-[4rem] bg-brand-brown text-brand-beige relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-8 mb-16">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-gold/20 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-brand-gold" />
                    </div>
                    <h2 className="font-display text-6xl italic tracking-tight">AI Style Picks.</h2>
                  </div>
                  <div className="flex-grow h-[1px] bg-brand-beige/10" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">Personalized for you</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                  {personalized.map((product, idx) => (
                    <ProductCard key={`ai-${product.id}`} product={product} index={idx} />
                  ))}
                </div>
              </div>
              <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px] group-hover:bg-brand-gold/10 transition-all duration-1000"></div>
            </div>
          </section>
        )}

        {/* Last Viewed Section */}
        {lastViewedProducts.length > 0 && (
          <section className="mb-32">
            <div className="flex items-center gap-8 mb-16">
              <h2 className="font-display text-6xl italic tracking-tight">Recently Viewed.</h2>
              <div className="flex-grow h-[1px] bg-brand-brown/10" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {lastViewedProducts.map((product, idx) => (
                <ProductCard key={`last-${product.id}`} product={product} index={idx} />
              ))}
            </div>
          </section>
        )}

        {/* Sustainability Spotlight */}
        <section className="mb-32">
          <div className="relative p-24 rounded-[5rem] bg-brand-teal/5 border border-brand-teal/10 overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <div className="flex items-center gap-6 mb-12">
                  <div className="w-12 h-12 rounded-2xl bg-brand-teal/10 flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-brand-teal" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-teal">Sustainability Spotlight</span>
                </div>
                <h2 className="font-display text-7xl italic mb-12 tracking-tight">The Eco-Score <br />Revolution.</h2>
                <p className="text-xl opacity-60 font-light leading-relaxed mb-12 max-w-lg">
                  We've analyzed thousands of data points to bring you the most transparent sustainability scoring in the industry. Every product is vetted for its environmental footprint.
                </p>
                <div className="flex gap-12">
                  <div>
                    <p className="text-4xl font-display italic text-brand-teal mb-2">92%</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest opacity-40">Average Score</p>
                  </div>
                  <div className="w-[1px] h-12 bg-brand-teal/20" />
                  <div>
                    <p className="text-4xl font-display italic text-brand-teal mb-2">100%</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest opacity-40">Ethical Sourcing</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                {PRODUCTS.filter(p => p.sustainabilityScore > 90).slice(0, 2).map((product, idx) => (
                  <ProductCard key={`spotlight-${product.id}`} product={product} index={idx} />
                ))}
              </div>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-teal/5 to-transparent pointer-events-none" />
          </div>
        </section>

        {/* Trending Now */}
        <section className="mb-32">
          <div className="flex items-center gap-8 mb-16">
            <h2 className="font-display text-6xl italic tracking-tight">Trending Now.</h2>
            <div className="flex-grow h-[1px] bg-brand-brown/10" />
            <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-brand-red/5 border border-brand-red/10">
              <Activity className="w-3 h-3 text-brand-red animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-brand-red">Live Insights</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {PRODUCTS.slice(4, 8).map((product, idx) => (
              <ProductCard key={`trending-${product.id}`} product={product} index={idx} />
            ))}
          </div>
        </section>

        {/* Category Filters */}
        <div id="collection-grid" className="flex flex-wrap items-center justify-between gap-12 mb-32 border-b border-brand-brown/10 pb-16">
          <div className="flex items-center gap-16 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`text-[11px] font-bold uppercase tracking-[0.4em] transition-all relative py-3 whitespace-nowrap ${
                  category === cat ? 'text-brand-brown' : 'text-brand-brown/30 hover:text-brand-brown/60'
                }`}
              >
                {cat}
                {category === cat && (
                  <motion.div 
                    layoutId="activeCategory"
                    className="absolute -bottom-[17px] left-0 right-0 h-[3px] bg-brand-brown rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-32">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-64 bg-brand-brown/5 rounded-[4rem] border border-dashed border-brand-brown/20"
          >
            <h3 className="font-display text-5xl italic mb-6">No pieces found.</h3>
            <p className="text-brand-brown/40 uppercase tracking-[0.2em] text-[10px] mb-12 font-bold">Try refining your search or filters</p>
            <button 
              onClick={() => { setSearchQuery(''); setCategory('All'); }}
              className="px-12 py-5 rounded-2xl bg-brand-brown text-brand-beige hover:bg-brand-red transition-all text-[10px] font-bold uppercase tracking-[0.3em] shadow-xl"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </div>

      {/* Climate & Sustainability Context */}
      <section className="mt-64 bg-brand-brown text-brand-beige py-48 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-6 mb-16">
                <div className="w-16 h-[1px] bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold">Climate Context</span>
              </div>
              <h2 className="font-display text-7xl md:text-9xl mb-16 tracking-tighter leading-[0.8]">
                Fashion that <br />
                <span className="italic text-brand-gold">Breathes</span> with <br />
                the Planet.
              </h2>
              <p className="text-2xl opacity-60 font-light leading-relaxed mb-16 max-w-xl">
                Our AI-driven recommendations adapt to your local weather and environmental conditions, ensuring you're always perfectly styled for the moment.
              </p>
              <div className="grid grid-cols-2 gap-12">
                <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                  <Sun className="w-10 h-10 text-brand-gold mb-8 group-hover:scale-110 transition-transform" />
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Solar Optimized</h4>
                  <p className="text-[10px] opacity-40 leading-relaxed uppercase tracking-tighter">Materials selected for UV protection and breathability.</p>
                </div>
                <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                  <Wind className="w-10 h-10 text-brand-teal mb-8 group-hover:scale-110 transition-transform" />
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Wind Resistant</h4>
                  <p className="text-[10px] opacity-40 leading-relaxed uppercase tracking-tighter">Aerodynamic silhouettes crafted from recycled fibers.</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[5rem] overflow-hidden shadow-2xl border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=1000" 
                  alt="Sustainable Fashion"
                  className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-16 -left-16 p-16 rounded-[4rem] glass shadow-2xl max-w-sm border border-brand-gold/20">
                <Leaf className="w-10 h-10 text-brand-green mb-8" />
                <p className="text-2xl font-display italic text-brand-brown mb-6 leading-relaxed">"Sustainability is not a trend, it's our legacy."</p>
                <div className="w-16 h-[1px] bg-brand-brown/20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
