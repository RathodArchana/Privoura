import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Cloud, Sun, Wind, Thermometer, RefreshCw, X, CloudRain } from 'lucide-react';
import { cn } from '../lib/utils';

interface AIFashionAdvisorProps {
  className?: string;
  climate?: 'sunny' | 'rainy' | 'cold' | 'humid';
}

export const AIFashionAdvisor: React.FC<AIFashionAdvisorProps> = ({ className, climate = 'sunny' }) => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchAIAdvice = async () => {
    setLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      
      // Simulate local context (in a real app, this would come from sensors or APIs)
      const mockContext = {
        weather: climate,
        temperature: climate === 'cold' ? '12°C' : climate === 'sunny' ? '32°C' : '24°C',
        location: "Mumbai, India",
        time: new Date().toLocaleTimeString(),
        sustainabilityFocus: "Organic Cotton & Recycled Polyester"
      };

      const prompt = `
        You are an elite AI Fashion Stylist for PrivyRec, a premium sustainable fashion brand.
        Current Context:
        - Weather: ${mockContext.weather}
        - Temperature: ${mockContext.temperature}
        - Location: ${mockContext.location}
        - Time: ${mockContext.time}
        - Sustainability Focus: ${mockContext.sustainabilityFocus}

        Provide a short, magnificent, and editorial-style fashion advice (max 3 sentences).
        Focus on how to stay stylish while being climate-conscious and sustainable in this specific ${climate} weather.
        Use a sophisticated, high-end tone.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setAdvice(response.text || "Elevate your style with conscious choices.");
    } catch (err) {
      console.error("AI Advisor Error:", err);
      setError("The stylist is currently unavailable. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && !advice) {
      fetchAIAdvice();
    }
  }, [isOpen]);

  const climateIcon = {
    sunny: <Sun className="text-yellow-500" />,
    rainy: <CloudRain className="text-blue-500" />,
    cold: <Thermometer className="text-cyan-500" />,
    humid: <Cloud className="text-gray-500" />
  };

  return (
    <div className={cn("fixed bottom-8 right-8 z-50", className)}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 md:w-96 p-8 rounded-[2.5rem] glass shadow-2xl border border-brand-gold/20"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-brand-gold/10">
                  <Sparkles className="w-4 h-4 text-brand-gold" />
                </div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-brown">AI Stylist</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-brand-brown/5 rounded-full transition-colors"
              >
                <X className="w-4 h-4 opacity-40" />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6 p-4 rounded-2xl bg-brand-brown/5 border border-brand-brown/5">
              <div className="flex flex-col items-center gap-1">
                {climate === 'sunny' && <Sun className="w-4 h-4 text-yellow-500" />}
                {climate === 'rainy' && <CloudRain className="w-4 h-4 text-blue-500" />}
                {climate === 'cold' && <Thermometer className="w-4 h-4 text-cyan-500" />}
                {climate === 'humid' && <Cloud className="w-4 h-4 text-gray-500" />}
                <span className="text-[8px] font-bold uppercase tracking-widest opacity-40">
                  {climate === 'cold' ? '12°C' : climate === 'sunny' ? '32°C' : '24°C'}
                </span>
              </div>
              <div className="h-8 w-[1px] bg-brand-brown/10" />
              <div className="flex-grow">
                <p className="text-[9px] font-bold uppercase tracking-widest opacity-60">Mumbai, India</p>
                <p className="text-[8px] opacity-40 capitalize">{climate} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>

            <div className="min-h-[100px] flex flex-col justify-center">
              {loading ? (
                <div className="flex flex-col items-center gap-4 py-8">
                  <RefreshCw className="w-6 h-6 text-brand-gold animate-spin" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 italic">Consulting the stars...</p>
                </div>
              ) : error ? (
                <p className="text-xs text-brand-red/60 italic text-center">{error}</p>
              ) : (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-lg font-display italic leading-relaxed text-brand-brown/80"
                >
                  "{advice}"
                </motion.p>
              )}
            </div>

            {!loading && advice && (
              <button 
                onClick={fetchAIAdvice}
                className="mt-8 w-full py-4 rounded-xl bg-brand-brown text-brand-beige text-[9px] font-bold uppercase tracking-[0.3em] hover:bg-brand-red transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3 h-3" />
                Refresh Advice
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-5 rounded-full shadow-2xl transition-all flex items-center justify-center group relative overflow-hidden",
          isOpen ? "bg-brand-red text-white" : "bg-brand-brown text-brand-gold"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <Sparkles className={cn("w-6 h-6 relative z-10 transition-transform", isOpen && "rotate-90")} />
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-red rounded-full border-2 border-brand-beige animate-pulse" />
        )}
      </motion.button>
    </div>
  );
};
