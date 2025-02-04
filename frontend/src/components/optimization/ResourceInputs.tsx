import React from 'react';
import { ResourceParameters } from '../../types/agriculture';

interface ResourceInputsProps {
  parameters: ResourceParameters;
  onChange: (params: ResourceParameters) => void;
}

export function ResourceInputs({ parameters, onChange }: ResourceInputsProps) {
  const handleCropChange = (index: number, field: string, value: number) => {
    const newCrops = [...parameters.crops];
    newCrops[index] = { ...newCrops[index], [field]: value };
    onChange({ ...parameters, crops: newCrops });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Land Area (hectares)
          </label>
          <input
            type="number"
            value={parameters.landArea}
            onChange={(e) => onChange({ ...parameters, landArea: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Water Available (m³)
          </label>
          <input
            type="number"
            value={parameters.waterAvailable}
            onChange={(e) => onChange({ ...parameters, waterAvailable: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Crop Parameters</h3>
        {parameters.crops.map((crop, index) => (
          <div key={crop.name} className="grid grid-cols-4 gap-4 mb-4">
            <div className="font-medium">{crop.name}</div>
            <input
              type="number"
              placeholder="Cost"
              value={crop.cost}
              onChange={(e) => handleCropChange(index, 'cost', Number(e.target.value))}
              className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
            <input
              type="number"
              placeholder="Yield"
              value={crop.yield}
              onChange={(e) => handleCropChange(index, 'yield', Number(e.target.value))}
              className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
            <input
              type="number"
              placeholder="Water Needs"
              value={crop.waterNeeds}
              onChange={(e) => handleCropChange(index, 'waterNeeds', Number(e.target.value))}
              className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}