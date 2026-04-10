import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { PRODUCTS } from '../constants';
import { usePrivacy } from '../App';
import { Product } from '../types';
import { Star, ShoppingCart, ExternalLink, Shield, Leaf, ArrowLeft, Check, Heart, Cloud, MessageSquare, Send, ArrowRight, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { cn } from '../lib/utils';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ProductDetail() {
  const { id } = useParams();
  const { recordInteraction, getRecommendations, addToCart } = usePrivacy();
  const [added, setAdded] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ userName: '', rating: 5, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const product = PRODUCTS.find(p => p.id === id);
  
  useEffect(() => {
    if (id) {
      recordInteraction(id, 'view');
      const savedReviews = localStorage.getItem(`reviews_${id}`);
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews));
      } else {
        const initialReviews: Review[] = [
          { id: '1', userName: 'Ananya S.', rating: 5, comment: 'Absolutely love the quality and the sustainable approach!', date: '2026-03-15' },
          { id: '2', userName: 'Rahul M.', rating: 4, comment: 'Great fit and very comfortable. Highly recommend.', date: '2026-03-20' }
        ];
        setReviews(initialReviews);
      }
    }
    window.scrollTo(0, 0);
  }, [id]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.userName || !newReview.comment) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      const review: Review = {
        id: Date.now().toString(),
        ...newReview,
        date: new Date().toISOString().split('T')[0]
      };

      const updatedReviews = [review, ...reviews];
      setReviews(updatedReviews);
      localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
      setNewReview({ userName: '', rating: 5, comment: '' });
      setIsSubmitting(false);
    }, 800);
  };

  if (!product) return <div className="p-20 text-center font-display text-4xl italic">Piece not found</div>;

  const handleAddToCart = () => {
    addToCart(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const similar = PRODUCTS.filter(p => 
    p.id !== product.id && p.tags.some(t => product.tags.includes(t))
  ).slice(0, 4);

  const { profile } = usePrivacy();
  const lastViewedProducts = (profile?.lastViewed || [])
    .filter(id => id !== product.id)
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter((p): p is Product => !!p)
    .slice(0, 4);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-[1800px] mx-auto px-8 py-24"
    >
      <Link to="/" className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.5em] mb-24 hover:text-brand-gold transition-colors group">
        <div className="w-10 h-10 rounded-full border border-brand-brown/10 flex items-center justify-center group-hover:bg-brand-brown group-hover:text-brand-beige transition-all">
          <ArrowLeft className="w-4 h-4" />
        </div>
        Back to Archive
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 mb-64">
        {/* Image Gallery */}
        <motion.div 
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="lg:col-span-7 relative"
        >
          <div className="sticky top-32">
            <div className="aspect-[4/5] rounded-[5rem] overflow-hidden bg-brand-brown/5 shadow-2xl relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute top-12 left-12 flex flex-col gap-4">
                <div className="glass px-6 py-3 rounded-2xl flex items-center gap-4 border border-white/20 shadow-xl">
                  <Leaf className="w-4 h-4 text-brand-green" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Ethically Sourced</span>
                </div>
                <div className="glass px-6 py-3 rounded-2xl flex items-center gap-4 border border-white/20 shadow-xl">
                  <Shield className="w-4 h-4 text-brand-teal" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Privacy Verified</span>
                </div>
                <div className="glass px-6 py-3 rounded-2xl flex items-center gap-4 border border-white/20 shadow-xl">
                  <Cloud className="w-4 h-4 text-brand-red/60" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Climate Match</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info */}
        <motion.div 
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="lg:col-span-5 flex flex-col justify-center"
        >
          <div className="flex items-center gap-6 mb-12">
            <div className="w-16 h-[1px] bg-brand-gold" />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold">{product.category}</span>
          </div>

          <h1 className="font-display text-8xl md:text-[10rem] mb-12 tracking-tighter leading-[0.8] text-brand-brown">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-12">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn("w-4 h-4", i < Math.floor(product.rating) ? "fill-brand-gold text-brand-gold" : "text-brand-brown/10")} />
              ))}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-brown/40">{product.rating} / 5.0</span>
          </div>

          <p className="text-3xl opacity-60 mb-16 leading-relaxed font-light italic">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-20">
            <div className="text-7xl font-display italic text-brand-brown">
              ₹{product.price}
            </div>
            <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-green-50 border border-green-100">
              <Leaf className="w-4 h-4 text-green-600" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-green-600">Eco {product.sustainabilityScore}/100</span>
            </div>
          </div>

          <div className="flex flex-col gap-6 mb-24">
            <div className="flex gap-6">
              <button 
                onClick={handleAddToCart}
                className={cn(
                  "flex-grow py-8 rounded-[2rem] font-bold uppercase tracking-[0.4em] text-[10px] transition-all shadow-2xl flex items-center justify-center gap-4",
                  added ? "bg-brand-teal text-white" : "bg-brand-brown text-brand-beige hover:bg-brand-red"
                )}
              >
                {added ? <Check className="w-6 h-6" /> : <ShoppingCart className="w-6 h-6" />}
                {added ? 'Added to Bag' : 'Add to Bag'}
              </button>
              <button className="w-24 h-24 rounded-[2rem] border border-brand-brown/10 hover:bg-brand-brown/5 transition-all flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </button>
            </div>
            
            {added && (
              <Link 
                to="/cart"
                className="w-full py-8 rounded-[2rem] bg-brand-gold text-brand-brown font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-brand-beige transition-all shadow-2xl flex items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4"
              >
                View Bag
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
          </div>

          {/* Multi-Platform Matching */}
          <div className="p-16 rounded-[4rem] glass border border-brand-gold/10 mb-12">
            <div className="flex items-center gap-4 mb-12">
              <Sparkles className="w-5 h-5 text-brand-gold" />
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-brown/60">Multi-Platform Matching</h3>
            </div>
            <div className="space-y-4">
              {product.links.map((link, i) => (
                <a 
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-6 rounded-3xl bg-white/50 border border-brand-brown/5 hover:border-brand-gold hover:bg-white transition-all group"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-brand-brown/5 flex items-center justify-center font-display text-xl italic text-brand-brown group-hover:bg-brand-gold group-hover:text-brand-brown transition-colors">
                      {link.platform[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-brand-brown">{link.platform}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-brand-gold text-brand-gold" />
                          <span className="text-[10px] font-bold text-brand-brown/60">{link.rating}</span>
                        </div>
                        <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Eco {link.sustainabilityScore}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-display italic text-brand-brown">₹{link.price}</p>
                    <p className="text-[8px] font-bold uppercase tracking-widest text-brand-gold group-hover:translate-x-1 transition-transform">View Deal →</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Outfit Builder */}
          {product.outfitPicks && product.outfitPicks.length > 0 && (
            <div className="p-16 rounded-[4rem] bg-brand-teal/5 border border-brand-teal/10">
              <div className="flex items-center gap-4 mb-12">
                <Shield className="w-5 h-5 text-brand-teal" />
                <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-brown/60">Complete The Look</h3>
              </div>
              <div className="grid grid-cols-2 gap-8">
                {product.outfitPicks.map(pickId => {
                  const pick = PRODUCTS.find(p => p.id === pickId);
                  if (!pick) return null;
                  return (
                    <Link 
                      key={pickId}
                      to={`/product/${pickId}`}
                      className="group"
                    >
                      <div className="aspect-square rounded-3xl overflow-hidden mb-4 bg-brand-brown/5">
                        <img 
                          src={pick.image} 
                          alt={pick.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-brown/80 truncate">{pick.name}</p>
                      <p className="text-sm font-display italic text-brand-gold">₹{pick.price}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* User Reviews Section */}
      <section className="mb-64">
        <div className="flex items-center gap-8 mb-24">
          <div className="w-24 h-[1px] bg-brand-brown/10" />
          <h3 className="font-display text-7xl italic tracking-tight">The Community.</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-32">
          {/* Review Form */}
          <div className="lg:col-span-5">
            <form onSubmit={handleReviewSubmit} className="p-16 rounded-[4rem] bg-brand-brown text-brand-beige shadow-2xl sticky top-48">
              <div className="flex items-center gap-4 mb-12">
                <MessageSquare className="w-6 h-6 text-brand-gold" />
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">Share Your Experience</h4>
              </div>
              <div className="space-y-10 mb-12">
                <div className="space-y-4">
                  <label className="text-[9px] uppercase tracking-[0.4em] opacity-40 ml-4 font-bold">Name</label>
                  <input 
                    type="text" 
                    placeholder="Your Name"
                    required
                    value={newReview.userName}
                    onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                    className="w-full px-8 py-6 rounded-2xl bg-white/5 border border-white/10 focus:border-brand-gold outline-none transition-all text-sm font-light"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[9px] uppercase tracking-[0.4em] opacity-40 ml-4 font-bold">Rating</label>
                  <div className="flex gap-4 px-8 py-6 rounded-2xl bg-white/5 border border-white/10">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="transition-transform hover:scale-125"
                      >
                        <Star className={cn("w-6 h-6", star <= newReview.rating ? "fill-brand-gold text-brand-gold" : "text-white/10")} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[9px] uppercase tracking-[0.4em] opacity-40 ml-4 font-bold">Comment</label>
                  <textarea 
                    placeholder="Tell us what you think..."
                    required
                    rows={4}
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full px-8 py-6 rounded-2xl bg-white/5 border border-white/10 focus:border-brand-gold outline-none transition-all text-sm font-light resize-none"
                  />
                </div>
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-8 rounded-[2rem] bg-brand-gold text-brand-brown font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-brand-beige transition-all shadow-2xl flex items-center justify-center gap-4 disabled:opacity-50"
              >
                {isSubmitting ? 'Posting...' : 'Post Review'}
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-7 space-y-24">
            {reviews.map((review) => (
              <motion.div 
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="pb-24 border-b border-brand-brown/10"
              >
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h5 className="font-display text-5xl mb-3 tracking-tight text-brand-brown">{review.userName}</h5>
                    <p className="text-[9px] opacity-40 uppercase tracking-[0.5em] font-bold">{review.date}</p>
                  </div>
                  <div className="flex gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("w-4 h-4", i < review.rating ? "fill-brand-gold text-brand-gold" : "text-brand-brown/10")} />
                    ))}
                  </div>
                </div>
                <p className="text-3xl opacity-60 leading-relaxed font-light italic text-brand-brown/80">"{review.comment}"</p>
              </motion.div>
            ))}
            {reviews.length === 0 && (
              <div className="text-center py-48 bg-brand-brown/5 rounded-[5rem] border border-dashed border-brand-brown/20">
                <p className="font-display text-3xl opacity-30 italic">No stories shared yet. Be the first.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="mb-32">
        <div className="flex items-center gap-8 mb-24">
          <h2 className="font-display text-7xl italic tracking-tight">Similar Styles.</h2>
          <div className="flex-grow h-[1px] bg-brand-brown/10" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
          {similar.map((p, idx) => (
            <ProductCard key={p.id} product={p} index={idx} />
          ))}
        </div>
      </section>

      {/* Recently Viewed */}
      {lastViewedProducts.length > 0 && (
        <section>
          <div className="flex items-center gap-8 mb-24">
            <h2 className="font-display text-7xl italic tracking-tight">Recently Viewed.</h2>
            <div className="flex-grow h-[1px] bg-brand-brown/10" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
            {lastViewedProducts.map((p, idx) => (
              <ProductCard key={`last-${p.id}`} product={p} index={idx} />
            ))}
          </div>
        </section>
      )}
    </motion.div>
  );
}
