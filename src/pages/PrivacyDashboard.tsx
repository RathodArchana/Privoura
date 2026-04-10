import React from 'react';
import { motion } from 'motion/react';
import { usePrivacy } from '../App';
import { Shield, Trash2, Activity, Zap, Info, Sparkles, Lock, Fingerprint, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../constants';

export default function PrivacyDashboard() {
  const { profile, clearData } = usePrivacy();

  const getProductName = (id: string) => PRODUCTS.find(p => p.id === id)?.name || 'Unknown Product';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-[1800px] mx-auto px-8 py-32"
    >
      <div className="text-center mb-48">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-4 px-8 py-3 rounded-full glass mb-12 border border-brand-gold/20"
        >
          <Shield className="w-4 h-4 text-brand-gold" />
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-brown/60">Privacy Protocol 2026</span>
        </motion.div>
        
        <h1 className="font-display text-8xl md:text-[12rem] mb-12 tracking-tighter leading-[0.8] text-brand-brown">Privacy <br /><span className="italic text-brand-gold">Center.</span></h1>
        <p className="text-2xl opacity-60 max-w-2xl mx-auto leading-relaxed font-light italic">
          Your data is encrypted, stored locally, and never shared with third parties. You have absolute sovereignty over your digital style profile.
        </p>
      </div>

      {/* How it Works Section */}
      <section className="mb-32">
        <div className="flex items-center gap-8 mb-16">
          <h2 className="font-display text-6xl italic tracking-tight text-brand-brown">How it Works.</h2>
          <div className="flex-grow h-[1px] bg-brand-brown/10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 rounded-[3rem] glass border border-brand-teal/10 relative group"
          >
            <div className="w-16 h-16 rounded-[1.5rem] bg-brand-teal/10 flex items-center justify-center mb-8">
              <Shield className="w-8 h-8 text-brand-teal" />
            </div>
            <h3 className="font-display text-3xl italic mb-4">Local Intelligence.</h3>
            <p className="text-sm opacity-60 leading-relaxed font-light">
              Our recommendation engine runs directly in your browser. Your clicks, views, and preferences are processed locally using edge computing, meaning your raw data never leaves your device.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-12 rounded-[3rem] glass border border-brand-gold/10 relative group"
          >
            <div className="w-16 h-16 rounded-[1.5rem] bg-brand-gold/10 flex items-center justify-center mb-8">
              <Lock className="w-8 h-8 text-brand-gold" />
            </div>
            <h3 className="font-display text-3xl italic mb-4">Zero Tracking.</h3>
            <p className="text-sm opacity-60 leading-relaxed font-light">
              We don't use third-party cookies or cross-site trackers. Your identity is decoupled from your shopping habits, ensuring a completely anonymous experience.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-12 rounded-[3rem] glass border border-brand-brown/10 relative group"
          >
            <div className="w-16 h-16 rounded-[1.5rem] bg-brand-brown/10 flex items-center justify-center mb-8">
              <Sparkles className="w-8 h-8 text-brand-brown" />
            </div>
            <h3 className="font-display text-3xl italic mb-4">Federated Learning.</h3>
            <p className="text-sm opacity-60 leading-relaxed font-light">
              We improve our models using federated learning. Only anonymized, aggregated insights are shared with our servers to refine the global model, never your individual data.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 mb-32">
        {/* Privacy Score Card */}
        <div className="p-16 rounded-[4rem] glass border border-brand-gold/20 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="relative z-10 text-center">
            <div className="relative w-48 h-48 flex items-center justify-center mb-8 mx-auto">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="90"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  className="text-brand-brown/5"
                />
                <motion.circle
                  cx="96"
                  cy="96"
                  r="90"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={565}
                  initial={{ strokeDashoffset: 565 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="text-brand-teal"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl font-display italic text-brand-brown">100</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-brown/40">Privacy Score</span>
              </div>
            </div>
            <h3 className="font-display text-4xl italic mb-4 text-brand-brown">Maximum Security.</h3>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-teal animate-pulse">All Protocols Active</p>
          </div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-teal/5 rounded-full blur-[100px]"></div>
        </div>

        {/* Local Profile */}
        <div className="p-16 rounded-[4rem] bg-white shadow-2xl border border-brand-brown/5 relative overflow-hidden group lg:col-span-1">
          <div className="relative z-10">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-16 h-16 rounded-[1.5rem] bg-brand-teal/10 flex items-center justify-center">
                <Fingerprint className="text-brand-teal w-8 h-8" />
              </div>
              <div>
                <h2 className="font-display text-5xl italic tracking-tight text-brand-brown">Edge Intelligence.</h2>
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-brown/30">On-Device Learning</p>
              </div>
            </div>
            
            <p className="text-lg opacity-60 mb-16 leading-relaxed font-light">
              Our proprietary algorithms analyze your behavior patterns locally to curate your unique style profile. <span className="text-brand-teal font-bold">Zero third-party sharing.</span>
            </p>
            
            <div className="space-y-12">
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-brown/40 mb-6 flex items-center gap-4">
                  <Lock className="w-3 h-3 text-brand-gold" />
                  Encrypted Preferences
                </h3>
                <div className="flex flex-wrap gap-3">
                  {profile.preferences.length > 0 ? (
                    profile.preferences.map(pref => (
                      <span key={pref} className="px-6 py-2.5 rounded-full bg-brand-brown/5 text-brand-brown text-[10px] font-bold uppercase tracking-[0.3em] border border-brand-brown/5">
                        {pref}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm italic opacity-40 font-light">Awaiting your first interaction...</span>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-brown/40 mb-6 flex items-center gap-4">
                  <Activity className="w-3 h-3 text-brand-red" />
                  Interaction Ledger
                </h3>
                <div className="max-h-80 overflow-y-auto space-y-4 pr-6 custom-scrollbar">
                  {profile.interactions.length > 0 ? (
                    profile.interactions.slice().reverse().map((int, i) => (
                      <div key={i} className="flex justify-between items-center p-5 rounded-2xl bg-brand-brown/5 border border-brand-brown/5 group/item hover:bg-white hover:shadow-xl transition-all">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-brown truncate max-w-[200px]">{getProductName(int.productId)}</span>
                        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-brown/30 italic">{int.type}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-sm italic opacity-40 font-light">No interactions recorded yet.</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-teal/5 rounded-full blur-[100px] group-hover:bg-brand-teal/10 transition-all duration-1000"></div>
        </div>

        {/* Federated Learning Info */}
        <div className="p-16 rounded-[4rem] bg-brand-brown text-brand-beige shadow-2xl relative overflow-hidden group lg:col-span-1">
          <div className="relative z-10">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-16 h-16 rounded-[1.5rem] bg-brand-gold/10 flex items-center justify-center">
                <Zap className="text-brand-gold w-8 h-8" />
              </div>
              <div>
                <h2 className="font-display text-5xl italic tracking-tight text-brand-beige">Secure Insights.</h2>
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-beige/30">Federated Protocol</p>
              </div>
            </div>
            
            <p className="text-lg opacity-80 mb-16 leading-relaxed font-light">
              We leverage <span className="font-bold text-brand-gold">Federated Learning</span> to refine our global aesthetic models. We only aggregate encrypted mathematical gradients, never raw data.
            </p>
            
            <div className="space-y-10 mb-20">
              {[
                { step: 1, text: "Local computation of model updates based on your unique style." },
                { step: 2, text: "End-to-end encryption of mathematical vectors." },
                { step: 3, text: "Global aggregation to improve collective intelligence." }
              ].map((item) => (
                <div key={item.step} className="flex gap-8 group/step">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex-shrink-0 flex items-center justify-center text-[10px] font-bold border border-white/10 group-hover/step:bg-brand-gold group-hover/step:text-brand-brown transition-all">
                    {item.step}
                  </div>
                  <span className="text-sm opacity-60 font-light leading-relaxed group-hover/step:opacity-100 transition-opacity">{item.text}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={async () => {
                const btn = document.activeElement as HTMLButtonElement;
                const originalText = btn.innerText;
                btn.innerText = "ENCRYPTING VECTORS...";
                btn.disabled = true;
                
                try {
                  await fetch('/api/learning/update', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ update: "anonymized_vector_" + Math.random().toString(36).substring(7) })
                  });
                  btn.innerText = "PROTOCOL SUCCESSFUL";
                  setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                  }, 2000);
                } catch (err) {
                  btn.innerText = "CONNECTION ERROR";
                  setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                  }, 2000);
                }
              }}
              className="w-full py-8 rounded-[2rem] bg-brand-gold text-brand-brown font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-brand-beige transition-all shadow-2xl flex items-center justify-center gap-4"
            >
              Simulate Federated Update
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px] group-hover:bg-brand-gold/10 transition-all duration-1000"></div>
        </div>
      </div>

      {/* Controls */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-16 rounded-[4rem] bg-brand-red/5 border border-brand-red/20 flex flex-col md:flex-row items-center justify-between gap-12"
      >
        <div className="flex items-center gap-8">
          <div className="w-20 h-20 rounded-[2rem] bg-brand-red/10 flex items-center justify-center">
            <Lock className="text-brand-red w-10 h-10" />
          </div>
          <div>
            <h4 className="font-display text-5xl italic text-brand-brown mb-4">Right to Erasure.</h4>
            <p className="text-lg opacity-60 max-w-xl leading-relaxed font-light">
              Permanently purge all locally stored interactions and preferences. This action is immediate, irreversible, and ensures your digital footprint is completely wiped.
            </p>
          </div>
        </div>
        <button 
          onClick={clearData}
          className="flex items-center gap-6 px-16 py-8 rounded-[2rem] bg-brand-red text-white font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-brand-brown transition-all shadow-2xl hover:scale-105 active:scale-95"
        >
          <Trash2 className="w-6 h-6" />
          Purge All My Data
        </button>
      </motion.div>
    </motion.div>
  );
}
