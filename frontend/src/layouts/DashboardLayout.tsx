import React from 'react';
import { Navbar } from '../components/navigation/Navbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}