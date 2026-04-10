import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, Heart, Leaf, Shield, Cloud, Plus, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { usePrivacy } from '../App';
import { cn } from '../lib/utils';

interface ProductCardProps {
  product: Product;
  index: number;
  [key: string]: any;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { recordInteraction, addToCart } = usePrivacy();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className="group"
    >
      <Link 
        to={`/product/${product.id}`}
        onClick={() => recordInteraction(product.id, 'click')}
        className="block"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-10 bg-brand-ivory premium-border shadow-2xl group-hover:shadow-brand-gold/10 transition-all duration-700">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 brightness-95 group-hover:brightness-100"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-brown/0 group-hover:bg-brand-brown/5 transition-colors duration-700" />
          
          {/* Floating Badges */}
          <div className="absolute top-8 left-8 flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-[-10px] group-hover:translate-x-0">
            <div className="glass p-3 rounded-full shadow-xl">
              <Leaf className="w-4 h-4 text-green-700" />
            </div>
            <div className="glass p-3 rounded-full shadow-xl">
              <Shield className="w-4 h-4 text-brand-teal" />
            </div>
          </div>

          <div className="absolute top-8 right-8">
            <button className="w-14 h-14 rounded-full glass flex items-center justify-center shadow-xl hover:bg-brand-red hover:text-white transition-all duration-500 hover:scale-110">
              <Heart className="w-6 h-6" />
            </button>
          </div>

          {/* Quick Add Overlay */}
          <div className="absolute inset-x-10 bottom-10 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[0.22, 1, 0.36, 1]">
            <button 
              onClick={handleQuickAdd}
              className="w-full py-6 rounded-2xl bg-brand-brown text-brand-beige text-[10px] font-bold uppercase tracking-[0.4em] shadow-2xl hover:bg-brand-gold hover:text-brand-brown transition-all duration-500 flex items-center justify-center gap-4"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Bag
            </button>
          </div>
        </div>
        
        <div className="px-4">
          <div className="flex justify-between items-center mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-brown/30">{product.category}</span>
            <div className="flex items-center gap-2">
              <Star className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
              <span className="text-[11px] font-bold text-brand-brown/60 tracking-widest">{product.rating}</span>
            </div>
          </div>
          
          <h3 className="font-display text-4xl mb-6 group-hover:text-brand-gold transition-colors duration-500 tracking-tight leading-tight">{product.name}</h3>
          
          <div className="flex items-center justify-between mb-6">
            <span className="text-3xl font-display italic text-brand-brown/80">₹{product.price}</span>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-brand-teal/10">
                <Shield className="w-3 h-3 text-brand-teal" />
                <span className="text-[9px] font-bold text-brand-teal uppercase tracking-widest">Secure</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-green-100">
                <Leaf className="w-3 h-3 text-green-600" />
                <span className="text-[9px] font-bold text-green-600 uppercase tracking-widest">{product.sustainabilityScore}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="w-full h-[1px] bg-brand-brown/5 group-hover:bg-brand-gold/20 transition-colors duration-700" />
            <div className="w-12 h-12 rounded-full border border-brand-brown/10 flex items-center justify-center group-hover:bg-brand-brown group-hover:text-brand-beige transition-all duration-500 shrink-0 ml-6 group-hover:rotate-90">
              <Plus className="w-5 h-5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
