import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  { icon: Home, key: 'dashboard', path: '/dashboard' },
  { icon: Activity, key: 'realTimeData', path: '/real-time-data' },
  { icon: Leaf, key: 'cropManagement', path: '/crop-management' },
  { icon: Lightbulb, key: 'recommendations', path: '/recommendations' },
  { icon: Calculator, key: 'optimization', path: '/optimization' },
  { icon: BookOpen, key: 'directives', path: '/directives' },
  { icon: Bell, key: 'alerts', path: '/alerts' },
  { icon: Settings, key: 'settings', path: '/settings' },
];

export function Navbar() {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-green-800 text-white">
      <div className="p-4 border-b border-green-700">
        <h1 className="text-xl font-bold">{t('common.dashboard')}</h1>
      </div>
      <ul className="p-2">
        {navItems.map((item) => (
          <li key={item.key}>
            <Link
              to={item.path}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-green-700'
                  : 'hover:bg-green-700'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{t(`common.${item.key}`)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}