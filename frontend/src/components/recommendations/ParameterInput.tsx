import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ParameterInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  unit?: string;
  icon?: LucideIcon;
  min?: number;
  max?: number;
  step?: number;
}

export function ParameterInput({
  label,
  value,
  onChange,
  unit,
  icon: Icon,
  min = 0,
  max = 100,
  step = 1,
}: ParameterInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        <div className="flex items-center space-x-2">
          {Icon && <Icon className="w-4 h-4 text-gray-500" />}
          <span>{label}</span>
        </div>
      </label>
      <div className="flex items-center space-x-2">
        <input
          type="range"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          className="flex-1"
        />
        <span className="text-sm text-gray-600 min-w-[4rem]">
          {value}{unit && ` ${unit}`}
        </span>
      </div>
    </div>
  );
}