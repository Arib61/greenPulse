import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { RoleCard } from '../components/RoleCard';
import { AboutSection } from '../components/welcome/AboutSection';
import { FeatureDemo } from '../components/welcome/FeatureDemo';
import { LogIn, UserPlus } from 'lucide-react';
import { LoginModal } from '../components/auth/LoginModal';
import { SignupModal } from '../components/auth/SignupModal';

export function Welcome() {
  const [selectedRole, setSelectedRole] = useState<'agriculteur' | 'ingenieur' | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = (email: string, password: string) => {
    login(email, password);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div 
          className="relative h-[600px] bg-cover bg-center"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3")'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10" />
          <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
            <h1 className="text-5xl font-bold text-white mb-6">
              {t('welcome.title')}
            </h1>
            <p className="text-xl text-gray-100 max-w-2xl mb-8">
              {t('welcome.subtitle')}
            </p>
            <p className="text-lg text-gray-200 max-w-2xl mb-12">
              {t('welcome.description')}
            </p>
          </div>
        </div>

        {/* About Section */}
        <AboutSection />

        {/* Interactive Feature Demo */}
        <FeatureDemo />

        {/* Role Selection */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            {t('welcome.roles.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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

        {/* CTA Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={() => setShowLogin(true)}
                className="flex items-center px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <LogIn className="w-5 h-5 mr-2" />
                {t('welcome.cta.login')}
              </button>
              <button 
                onClick={() => setShowSignup(true)}
                className="flex items-center px-8 py-3 bg-white text-green-600 border-2 border-green-600 rounded-lg hover:bg-green-50 transition-colors"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                {t('welcome.cta.signup')}
              </button>
            </div>
          </div>
        </div>
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