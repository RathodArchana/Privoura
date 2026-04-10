import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

interface AuthPageProps {
  onLogin: (user: any, token: string) => void;
}

export default function AuthPage({ onLogin }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const navigate = useNavigate();

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch('/api/health');
        if (res.ok) setServerStatus('online');
        else setServerStatus('offline');
      } catch (err) {
        console.error("Health check failed:", err);
        setServerStatus('offline');
      }
    };
    checkHealth();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const body = isLogin ? { email, password } : { email, password, name };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      let data;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(text || `Server returned ${res.status} ${res.statusText}`);
      }

      if (data.error) throw new Error(data.error);

      onLogin(data.user, data.token);
      navigate('/');
    } catch (err: any) {
      console.error("Auth Error:", err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[80vh] flex items-center justify-center px-4 py-12"
    >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-brand-brown/5">
          <div className="p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gold-gradient mb-4 shadow-lg">
                <ShieldCheck className="text-brand-brown w-8 h-8" />
              </div>
              <h2 className="font-display text-4xl mb-2">{isLogin ? 'Welcome Back' : 'Join PrivyRec'}</h2>
              <p className="text-sm opacity-60 mb-4">
                {isLogin ? 'Your private shopping experience awaits.' : 'Start your privacy-preserving shopping journey.'}
              </p>
              
              <div className="flex justify-center">
                <div className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2",
                  serverStatus === 'online' ? "bg-green-100 text-green-700" : 
                  serverStatus === 'offline' ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"
                )}>
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    serverStatus === 'online' ? "bg-green-500 animate-pulse" : 
                    serverStatus === 'offline' ? "bg-red-500" : "bg-gray-500"
                  )} />
                  Server: {serverStatus}
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-brand-brown/5 border border-transparent focus:border-brand-teal focus:bg-white transition-all outline-none"
                  />
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-brand-brown/5 border border-transparent focus:border-brand-teal focus:bg-white transition-all outline-none"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-brand-brown/5 border border-transparent focus:border-brand-teal focus:bg-white transition-all outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-brand-brown text-brand-beige font-bold uppercase tracking-widest hover:bg-brand-teal transition-all shadow-lg flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-8 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm font-medium text-brand-teal hover:underline"
              >
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
              </button>
            </div>
          </div>
          
          <div className="bg-brand-brown/5 p-6 text-center border-t border-brand-brown/5">
            <p className="text-[10px] uppercase tracking-widest opacity-40">
              Secure • Private • Sustainable
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
