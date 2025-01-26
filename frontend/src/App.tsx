import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Welcome } from './pages/Welcome';
import { Dashboard } from './pages/Dashboard';
import { RealTimeData } from './pages/RealTimeData';
import { CropManagement } from './pages/CropManagement';
import { Recommendations } from './pages/Recommendations';
import { Optimization } from './pages/Optimization';
import { Directives } from './pages/Directives';
import { Alerts } from './pages/Alerts';
import { Settings } from './pages/Settings';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './styles/rtl.css';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

export default function App() {
  const { i18n } = useTranslation();

  return (
    <div dir={i18n.dir()} lang={i18n.language}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/real-time-data"
              element={
                <PrivateRoute>
                  <RealTimeData />
                </PrivateRoute>
              }
            />
            <Route
              path="/crop-management"
              element={
                <PrivateRoute>
                  <CropManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/recommendations"
              element={
                <PrivateRoute>
                  <Recommendations />
                </PrivateRoute>
              }
            />
            <Route
              path="/optimization"
              element={
                <PrivateRoute>
                  <Optimization />
                </PrivateRoute>
              }
            />
            <Route
              path="/directives"
              element={
                <PrivateRoute>
                  <Directives />
                </PrivateRoute>
              }
            />
            <Route
              path="/alerts"
              element={
                <PrivateRoute>
                  <Alerts />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}