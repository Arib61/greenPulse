import React from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

export function Alerts() {
  const alerts = [
    {
      id: 1,
      type: 'danger',
      message: 'Water shortage detected in Sector B',
      timestamp: '2 hours ago',
      icon: AlertTriangle,
      color: 'text-red-500',
    },
    {
      id: 2,
      type: 'warning',
      message: 'Potential pest infestation in Corn field',
      timestamp: '4 hours ago',
      icon: AlertCircle,
      color: 'text-yellow-500',
    },
    {
      id: 3,
      type: 'success',
      message: 'Optimal conditions for harvesting Wheat',
      timestamp: '1 day ago',
      icon: CheckCircle,
      color: 'text-green-500',
    },
  ];

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Alerts</h1>
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="space-y-6">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-4 p-4 rounded-lg border border-gray-100"
              >
                <alert.icon className={`w-6 h-6 ${alert.color}`} />
                <div className="flex-1">
                  <div className={`font-medium ${alert.color}`}>{alert.message}</div>
                  <div className="text-sm text-gray-500">{alert.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}