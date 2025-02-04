import React from 'react';

interface ParameterInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export function ParameterInput({ label, value, onChange }: ParameterInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
      />
    </div>
  );
}
