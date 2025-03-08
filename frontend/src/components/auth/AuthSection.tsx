
import React, { useState, useEffect } from 'react';
import { LogIn, UserPlus, Users, TrendingUp, Shield } from 'lucide-react';

interface AuthSectionProps {
  onShowLogin: () => void;
  onShowSignup: () => void;
}

export function AuthSection({ onShowLogin, onShowSignup }: AuthSectionProps) {

  return (
    <div className="bg-gradient-to-br from-green-900 to-green-800 py-24" id="auth">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Rejoignez EcoCrop dès aujourd'hui !
          </h2>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Découvrez une gestion agricole simplifiée et optimisée grâce à nos outils innovants
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button 
            onClick={onShowLogin}
            className="group flex items-center px-8 py-4 bg-white text-green-800 rounded-lg 
              hover:bg-green-50 transition-all duration-300 transform hover:scale-105"
          >
            <LogIn className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:translate-x-1" />
            Se Connecter
          </button>
          <button 
            onClick={onShowSignup}
            className="group flex items-center px-8 py-4 bg-transparent text-white border-2 
              border-white rounded-lg hover:bg-white/10 transition-all duration-300 
              transform hover:scale-105"
          >
            <UserPlus className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:translate-x-1" />
            S'inscrire
          </button>
        </div>
      </div>
    </div>
  );
}