import React from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
type FilterSectionProps = {
  title: string;
  sectionKey: string;
  infoText?: string;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: (sectionKey: string) => void;
};
export const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  sectionKey,
  infoText,
  children,
  isExpanded,
  onToggle
}) => {
  return <div className="mb-6">
      <div className="flex items-center justify-between cursor-pointer py-3 border-b border-gray-200" onClick={() => onToggle(sectionKey)}>
        <div className="flex items-center">
          <h3 className="font-semibold text-dark">{title}</h3>
          {infoText && <div className="relative group ml-2">
              <Info size={14} className="text-gray-400" />
              <div className="absolute left-0 bottom-full mb-2 w-64 bg-white p-2 text-xs text-gray-600 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                {infoText}
              </div>
            </div>}
        </div>
        {isExpanded ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
      </div>
      {isExpanded && <div className="mt-3 animate-count-up">{children}</div>}
    </div>;
};