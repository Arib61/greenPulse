import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Sprout, Brain, LineChart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { RoleCard } from '../components/RoleCard';
import { AboutSection } from '../components/welcome/AboutSection';
import { FeatureDemo } from '../components/welcome/FeatureDemo';
import { AuthSection } from '../components/auth/AuthSection';
import { LoginModal } from '../components/auth/LoginModal';
import { SignupModal } from '../components/auth/SignupModal';


export function Welcome() {
  const [selectedRole, setSelectedRole] = useState<'agriculteur' | 'ingenieur' | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleLogin = (email: string, password: string) => {
    login(email, password);
    navigate('/dashboard');
  };

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section with Video Background */}
        <div className="relative h-screen">
          <div className="absolute inset-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              poster="https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3"
            >
              <source src="https://player.vimeo.com/external/454527119.sd.mp4?s=8d4e7dfd3aee2543ac7a48e4e4e5a9fd8539e9c5&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
              <img
                src="https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3"
                alt="Agriculture background"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </video>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          </div>

          {/* Hero Content */}
          <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
            <h1 
              className={`text-5xl md:text-7xl font-bold text-white mb-6 transform transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              Transformons l'Agriculture <span className="text-green-400">au Maroc</span>
            </h1>
            <div 
              className={`text-xl md:text-2xl text-gray-100 max-w-3xl mb-6 transform transition-all duration-1000 delay-300 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <p className="font-semibold mb-4">
                Bienvenue sur EcoCrop — Votre Partenaire pour une Agriculture Durable
              </p>
              <p className="text-lg md:text-xl text-gray-200">
                EcoCrop vous accompagne dans votre transition vers une agriculture plus durable. Que vous soyez Agriculteur ou Ingénieur Agronome, nos outils vous aident à optimiser vos cultures tout en préservant l'environnement.
              </p>
            </div>
            
            <button
              onClick={scrollToFeatures}
              className={`group flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-full 
                hover:bg-green-600 transform transition-all duration-300 hover:scale-105 
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              Découvrir
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </div>

        {/* About Section */}
        <div id="about">
          <AboutSection />
        </div>

        {/* Interactive Feature Demo */}
        <div id="demo">
          <FeatureDemo />
        </div>

        {/* Role Selection */}
        <div id="roles" className="max-w-7xl mx-auto px-6 py-24 bg-gray-50">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Choisissez Votre Rôle
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <RoleCard
              role="agriculteur"
              selected={selectedRole === 'agriculteur'}
              onSelect={() => setSelectedRole('agriculteur')}
            />
            <RoleCard
              role="ingenieur"
              selected={selectedRole === 'ingenieur'}
              onSelect={() => setSelectedRole('ingenieur')}
            />
          </div>
        </div>

        {/* Auth Section */}
        <AuthSection
          onShowLogin={() => setShowLogin(true)}
          onShowSignup={() => setShowSignup(true)}
        />
      </main>

      <Footer />

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
        />
      )}
      {showSignup && (
        <SignupModal
          onClose={() => setShowSignup(false)}
          selectedRole={selectedRole}
        />
      )}
    </div>
  );
}