import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, Menu } from 'lucide-react';
import { useAuth } from "../../contexts/AuthContext";

import { 
  LayoutDashboard, 
  Activity,
  Leaf,
  Lightbulb,
  Calculator,
  Bell,
  Settings,
  Home,
  BookOpen
} from 'lucide-react';

const navItems = [
  { icon: Home, key: 'dashboard', path: '/dashboard', label: 'Dashboard' },
  { icon: Activity, key: 'realTimeData', path: '/real-time-data', label: 'Real-Time Data' },
  { icon: Leaf, key: 'cropManagement', path: '/crop-management', label: 'Crop Management' },
  { icon: Lightbulb, key: 'recommendations', path: '/recommendations', label: 'Recommendations' },
  { icon: Calculator, key: 'optimization', path: '/optimization', label: 'Optimization' },
  { icon: BookOpen, key: 'directives', path: '/directives', label: 'Directives' },
  { icon: Bell, key: 'alerts', path: '/alerts', label: 'Alerts' },
  { icon: Settings, key: 'settings', path: '/settings', label: 'Settings' },
];

export function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-green-800 text-white hover:bg-green-700 transition-colors"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Navigation */}
      <nav
        className={`fixed left-0 top-0 h-full w-64 z-40 transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          bg-gradient-to-b from-green-800 to-green-900
          backdrop-blur-lg backdrop-saturate-150 bg-opacity-95
          border-r border-white/10
          shadow-xl`}
      >
        {/* Logo Section */}
        <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          {/* Logo */}
          <img
            src="../images/ecoCrops_logo.png" 
            alt="Ecocrops Logo"
            className="w-12 h-12" // Adjust size as needed
          />
          {/* Titre */}
          <h1 className="text-xl font-bold text-white">
            Ecocrops
          </h1>
          </div>
        </div>

        {/* Navigation Items */}
        <ul className="p-2 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.key}>
                <Link
                  to={item.path}
                  className={`group relative flex items-center space-x-3 px-4 py-3 rounded-lg
                    transition-all duration-300 ease-in-out
                    ${isActive 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                  )}
                  
                  {/* Icon with hover effect */}
                  <item.icon className={`w-6 h-6 transition-transform duration-300
                    ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  
                  {/* Label */}
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        {/* 🔹 Bouton de Déconnexion */}
        <div className="absolute bottom-4 left-0 w-full px-4">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <LogOut className="w-6 h-6" />
            <span>Se Déconnecter</span>
          </button>
        </div>
      </nav>
    </>
  );
}