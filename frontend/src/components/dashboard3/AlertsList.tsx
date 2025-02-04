import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface Alert {
  id: string;
  type: 'danger' | 'warning' | 'success';
  message: string;
  timestamp: string;
}

export function AlertsList() {
  const alerts: Alert[] = [
    {
      id: '1',
      type: 'danger',
      message: 'Low soil moisture detected in Plot A',
      timestamp: '2h ago',
    },
    {
      id: '2',
      type: 'success',
      message: 'Optimal conditions for harvest in Plot C',
      timestamp: '4h ago',
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Recent Alerts</h3>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-3 rounded-lg flex items-center space-x-3 ${
              alert.type === 'danger' ? 'bg-red-50' : 'bg-green-50'
            }`}
          >
            {alert.type === 'danger' ? (
              <AlertTriangle className="w-5 h-5 text-red-500" />
            ) : (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
            <div className="flex-1">
              <p className="text-sm font-medium">{alert.message}</p>
              <p className="text-xs text-gray-500">{alert.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}