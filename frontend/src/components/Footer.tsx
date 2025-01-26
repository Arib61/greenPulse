import React from 'react';
import { Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Mail className="h-5 w-5 text-gray-600" />
            <span className="text-gray-600">support@ecocrop.ma</span>
            <Phone className="h-5 w-5 text-gray-600 ml-4" />
            <span className="text-gray-600">+212 500-000000</span>
          </div>
          <p className="text-sm text-gray-500">
            © 2024 EcoCrop. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}