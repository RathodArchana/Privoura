import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { usePrivacy } from '../App';
import { PRODUCTS } from '../constants';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, Check, Sparkles, ShieldCheck } from 'lucide-react';

export default function CartPage() {
  const { profile, removeFromCart, updateCartQuantity, clearData } = usePrivacy();
  const [checkingOut, setCheckingOut] = React.useState(false);
  const [checkedOut, setCheckedOut] = React.useState(false);

  const cartItems = (profile?.cart || []).map(item => {
    const product = PRODUCTS.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product !== undefined);

  const total = cartItems.reduce((acc, item) => acc + (item.product!.price * item.quantity), 0);

  const handleCheckout = () => {
    setCheckingOut(true);
    setTimeout(() => {
      setCheckingOut(false);
      setCheckedOut(true);
      clearData();
    }, 2000);
  };

  if (checkedOut) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-[1800px] mx-auto px-8 py-64 text-center"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12 }}
          className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-brand-gold/10 mb-12"
        >
          <Check className="w-12 h-12 text-brand-gold" />
        </motion.div>
        <h1 className="font-display text-8xl md:text-[10rem] mb-8 tracking-tighter leading-[0.8] text-brand-brown">Order <br /><span className="italic text-brand-gold">Secured.</span></h1>
        <p className="text-2xl opacity-60 mb-16 max-w-xl mx-auto font-light italic leading-relaxed">
          Thank you for choosing sustainable fashion. Your private order has been processed locally on your device.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-4 px-12 py-6 rounded-2xl bg-brand-brown text-brand-beige font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-brand-red transition-all shadow-2xl"
        >
          Return to Archive
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-[1800px] mx-auto px-8 py-64 text-center"
      >
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-brand-brown/5 mb-12">
          <ShoppingBag className="w-12 h-12 text-brand-brown/10" />
        </div>
        <h1 className="font-display text-8xl md:text-[10rem] mb-8 tracking-tighter leading-[0.8] text-brand-brown">Empty <br /><span className="italic text-brand-gold">Bag.</span></h1>
        <p className="text-2xl opacity-60 mb-16 max-w-xl mx-auto font-light italic leading-relaxed">
          Your collection is waiting to be curated. Explore our sustainable pieces.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-4 px-12 py-6 rounded-2xl bg-brand-brown text-brand-beige font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-brand-red transition-all shadow-2xl"
        >
          <ArrowLeft className="w-4 h-4" />
          Explore Collection
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-[1800px] mx-auto px-8 py-32"
    >
      <div className="flex flex-col md:flex-row items-end justify-between mb-32 gap-12">
        <div>
          <div className="flex items-center gap-6 mb-8">
            <div className="w-16 h-[1px] bg-brand-gold" />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold">Shopping Bag</span>
          </div>
          <h1 className="font-display text-8xl md:text-[12rem] tracking-tighter leading-[0.8] text-brand-brown">Your <br /><span className="italic text-brand-gold">Selection.</span></h1>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-brown/30 mb-4">Total Pieces</p>
          <p className="text-7xl font-display italic text-brand-brown">{cartItems.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-32">
        {/* Items List */}
        <div className="lg:col-span-7 space-y-24">
          <AnimatePresence mode="popLayout">
            {cartItems.map((item) => (
              <motion.div 
                key={item.productId}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col sm:flex-row items-start gap-12 pb-24 border-b border-brand-brown/10 group"
              >
                <div className="w-56 h-72 rounded-[3rem] overflow-hidden bg-brand-brown/5 flex-shrink-0 shadow-2xl relative">
                  <img 
                    src={item.product!.image} 
                    alt={item.product!.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-brown/0 group-hover:bg-brand-brown/10 transition-colors duration-700" />
                </div>
                
                <div className="flex-grow pt-4">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="font-display text-5xl mb-3 tracking-tight text-brand-brown group-hover:text-brand-gold transition-colors">{item.product!.name}</h3>
                      <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-brown/30">{item.product!.category}</p>
                    </div>
                    <div className="text-4xl font-display italic text-brand-brown/80">₹{item.product!.price}</div>
                  </div>

                  <div className="flex items-center justify-between mt-12">
                    <div className="flex items-center gap-8 px-6 py-3 rounded-full border border-brand-brown/10 glass">
                      <button 
                        onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-brand-brown hover:text-brand-beige transition-all"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-display text-xl italic w-6 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-brand-brown hover:text-brand-beige transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.productId)}
                      className="text-brand-red/40 hover:text-brand-red transition-colors flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em]"
                    >
                      <Trash2 className="w-5 h-5" />
                      Remove Piece
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="lg:col-span-5">
          <div className="p-16 rounded-[4rem] bg-brand-brown text-brand-beige sticky top-48 shadow-2xl overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-16">
                <Sparkles className="w-6 h-6 text-brand-gold" />
                <h3 className="font-display text-5xl italic tracking-tight">The Summary.</h3>
              </div>
              
              <div className="space-y-8 mb-16">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">
                  <span>Shipping</span>
                  <span className="text-brand-gold">Complimentary</span>
                </div>
                <div className="pt-12 border-t border-brand-beige/10 flex justify-between items-end">
                  <span className="font-bold uppercase tracking-[0.5em] text-[10px] text-brand-gold">Total</span>
                  <span className="text-7xl font-display italic text-brand-gold">₹{total}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={checkingOut}
                className="w-full py-8 rounded-[2rem] bg-brand-gold text-brand-brown font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-brand-beige transition-all shadow-2xl flex items-center justify-center gap-4 group disabled:opacity-50"
              >
                {checkingOut ? 'Processing Locally...' : 'Complete Purchase'}
                {!checkingOut && <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />}
              </button>

              <div className="mt-16 pt-12 border-t border-brand-beige/5 flex items-center gap-6">
                <ShieldCheck className="w-8 h-8 text-brand-teal opacity-60" />
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-30 leading-relaxed text-left">
                  Your purchase is processed entirely on your device. <br />
                  Privacy is our highest priority.
                </p>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-brand-gold/5 rounded-full blur-[100px]"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
