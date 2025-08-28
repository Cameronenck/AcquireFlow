import React from 'react';
import { Home, Building, Building2, Warehouse, MapPin } from 'lucide-react';
import { useFilters } from './FilterContext';
type PropertyType = 'singleFamily' | 'multiFamily' | 'commercial' | 'land' | 'industrial';
interface PropertyTypeOption {
  id: PropertyType;
  name: string;
  icon: React.ReactNode;
  description: string;
}
export const PropertyTypeFilter: React.FC = () => {
  const {
    filters,
    updateFilters
  } = useFilters();
  const propertyTypes: PropertyTypeOption[] = [{
    id: 'singleFamily',
    name: 'Single Family',
    icon: <Home size={20} className="text-primary" />,
    description: 'Residential homes for single families'
  }, {
    id: 'multiFamily',
    name: 'Multi-Family',
    icon: <Building size={20} className="text-primary" />,
    description: '2-4 unit residential properties'
  }, {
    id: 'commercial',
    name: 'Commercial',
    icon: <Building2 size={20} className="text-primary" />,
    description: 'Office, retail, and mixed-use buildings'
  }, {
    id: 'industrial',
    name: 'Industrial',
    icon: <Warehouse size={20} className="text-primary" />,
    description: 'Warehouses and manufacturing facilities'
  }, {
    id: 'land',
    name: 'Land',
    icon: <MapPin size={20} className="text-primary" />,
    description: 'Vacant land and development opportunities'
  }];
  const handlePropertyTypeToggle = (typeId: PropertyType) => {
    const currentTypes = filters.propertyTypes || [];
    let newTypes: PropertyType[];
    if (currentTypes.includes(typeId)) {
      newTypes = currentTypes.filter(id => id !== typeId);
    } else {
      newTypes = [...currentTypes, typeId];
    }
    updateFilters({
      propertyTypes: newTypes
    });
  };
  return <div className="space-y-3">
      {propertyTypes.map(type => <div key={type.id} className={`p-3 rounded-lg border cursor-pointer transition-all ${filters.propertyTypes?.includes(type.id) ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-200 hover:border-gray-300 bg-white'}`} onClick={() => handlePropertyTypeToggle(type.id)}>
          <div className="flex items-center">
            <div className={`mr-3 ${filters.propertyTypes?.includes(type.id) ? 'text-primary' : 'text-gray-400'}`}>
              {type.icon}
            </div>
            <div>
              <h4 className="font-medium text-dark">{type.name}</h4>
              <p className="text-xs text-gray-500 mt-0.5">{type.description}</p>
            </div>
          </div>
        </div>)}
    </div>;
};