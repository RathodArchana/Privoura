import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Shield, LogOut, Menu, ShoppingCart, Search } from 'lucide-react';
import { AuthState } from '../types';
import { cn } from '../lib/utils';
import { usePrivacy } from '../App';

interface NavbarProps {
  auth: AuthState;
  onLogout: () => void;
  onSearchClick: () => void;
}

export default function Navbar({ auth, onLogout, onSearchClick }: NavbarProps) {
  const navigate = useNavigate();
  const { profile } = usePrivacy();

  const cartCount = (profile?.cart || []).reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-brand-beige/60 backdrop-blur-xl border-b border-brand-gold/10 px-8 py-4 transition-all duration-500">
      <div className="max-w-[1800px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-16">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="font-display text-4xl font-medium tracking-tight text-brand-brown group-hover:text-brand-gold transition-colors duration-500">
              PRIVOURA
            </span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-12 text-[10px] font-medium uppercase tracking-[0.4em] text-brand-brown/60">
            <Link to="/" className="relative group py-2">
              <span className="group-hover:text-brand-brown transition-colors">Collection</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-500 group-hover:w-full" />
            </Link>
            <Link to="/privacy" className="relative group py-2">
              <span className="group-hover:text-brand-brown transition-colors">Privacy</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-500 group-hover:w-full" />
            </Link>
            <Link to="/cart" className="relative group py-2">
              <span className="group-hover:text-brand-brown transition-colors">Archive</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-500 group-hover:w-full" />
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-12">
          <div className="hidden md:flex items-center gap-10">
            <button 
              onClick={onSearchClick}
              className="text-brand-brown/60 hover:text-brand-gold transition-all duration-300 hover:scale-110"
            >
              <Search className="w-4 h-4" />
            </button>
            
            {auth.isAuthenticated ? (
              <div className="flex items-center gap-8">
                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-brand-brown/80">Hi, {auth.user?.name}</span>
                <button 
                  onClick={onLogout}
                  className="text-brand-brown/60 hover:text-brand-red transition-all duration-300 hover:scale-110"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="text-[10px] font-medium uppercase tracking-[0.3em] text-brand-brown/80 hover:text-brand-gold transition-all duration-300"
              >
                Sign In
              </Link>
            )}
          </div>

          <Link 
            to="/cart" 
            className="relative group flex items-center gap-4 px-8 py-3 rounded-full bg-brand-brown text-brand-beige hover:bg-brand-gold hover:text-brand-brown transition-all duration-500 shadow-xl hover:shadow-brand-gold/20"
          >
            <ShoppingCart className="w-4 h-4 group-hover:rotate-12 transition-transform duration-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Bag</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 bg-brand-gold text-brand-brown text-[9px] font-bold flex items-center justify-center rounded-full group-hover:bg-brand-brown group-hover:text-brand-beige transition-colors">
                {cartCount}
              </span>
            )}
          </Link>

          <button className="lg:hidden p-2 text-brand-brown hover:text-brand-gold transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
