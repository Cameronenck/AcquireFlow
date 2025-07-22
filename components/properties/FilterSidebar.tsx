'use client'

import { X, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Filters {
  priceRange: [number, number]
  propertyTypes: string[]
  bedrooms: string
  bathrooms: string
  condition: string[]
  cities: string[]
  roiRange: [number, number]
}

interface FilterSidebarProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  onClose: () => void
}

const propertyTypes = ['Single Family', 'Multi Family', 'Commercial', 'Land', 'Mixed-Use']
const conditions = ['Move-in Ready', 'Needs Cosmetic Work', 'Fixer Upper', 'Tear Down']
const cities = ['Lancaster', 'York', 'Harrisburg', 'Reading', 'Allentown']
const bedroomOptions = ['any', '1', '2', '3', '4', '5+']
const bathroomOptions = ['any', '1', '2', '3', '4+']

function RangeSlider({ 
  label, 
  min, 
  max, 
  value, 
  onChange, 
  step = 1,
  formatValue = (val: number) => val.toString()
}: {
  label: string
  min: number
  max: number
  value: [number, number]
  onChange: (value: [number, number]) => void
  step?: number
  formatValue?: (val: number) => string
}) {
  const handleMinChange = (newMin: number) => {
    onChange([Math.min(newMin, value[1]), value[1]])
  }

  const handleMaxChange = (newMax: number) => {
    onChange([value[0], Math.max(newMax, value[0])])
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-text-primary">{label}</label>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value[0]}
            onChange={(e) => handleMinChange(Number(e.target.value))}
            className="flex-1 px-3 py-2 text-sm bg-bg-primary border border-border-color rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
            placeholder="Min"
          />
          <span className="text-text-muted">to</span>
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value[1]}
            onChange={(e) => handleMaxChange(Number(e.target.value))}
            className="flex-1 px-3 py-2 text-sm bg-bg-primary border border-border-color rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
            placeholder="Max"
          />
        </div>
        <div className="text-xs text-text-muted text-center">
          {formatValue(value[0])} - {formatValue(value[1])}
        </div>
      </div>
    </div>
  )
}

function MultiSelect({ 
  label, 
  options, 
  selected, 
  onChange 
}: {
  label: string
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option))
    } else {
      onChange([...selected, option])
    }
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-text-primary">{label}</label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 text-sm bg-bg-primary border border-border-color rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent flex items-center justify-between"
        >
          <span className="text-left">
            {selected.length === 0 
              ? `All ${label}` 
              : selected.length === 1 
                ? selected[0]
                : `${selected.length} selected`
            }
          </span>
          <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isOpen && "rotate-180")} />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-bg-primary border border-border-color rounded-lg shadow-lg py-1 z-10 max-h-48 overflow-y-auto">
            {options.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 px-3 py-2 hover:bg-bg-secondary cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => toggleOption(option)}
                  className="w-4 h-4 text-accent-blue border-border-color rounded focus:ring-accent-blue focus:ring-2"
                />
                <span className="text-sm text-text-primary">{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function SingleSelect({ 
  label, 
  options, 
  selected, 
  onChange 
}: {
  label: string
  options: string[]
  selected: string
  onChange: (selected: string) => void
}) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-text-primary">{label}</label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm bg-bg-primary border border-border-color rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option === 'any' ? `Any ${label}` : `${option}${option.includes('+') ? '' : '+'}`}
          </option>
        ))}
      </select>
    </div>
  )
}

export default function FilterSidebar({ filters, onFiltersChange, onClose }: FilterSidebarProps) {
  const updateFilters = (updates: Partial<Filters>) => {
    onFiltersChange({ ...filters, ...updates })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      priceRange: [0, 1000000],
      propertyTypes: [],
      bedrooms: 'any',
      bathrooms: 'any',
      condition: [],
      cities: [],
      roiRange: [0, 30]
    })
  }

  const formatPrice = (price: number) => {
    if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`
    if (price >= 1000) return `$${(price / 1000).toFixed(0)}K`
    return `$${price}`
  }

  const formatROI = (roi: number) => `${roi}%`

  const hasActiveFilters = 
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] < 1000000 ||
    filters.propertyTypes.length > 0 ||
    filters.bedrooms !== 'any' ||
    filters.bathrooms !== 'any' ||
    filters.condition.length > 0 ||
    filters.cities.length > 0 ||
    filters.roiRange[0] > 0 ||
    filters.roiRange[1] < 30

  return (
    <div className="w-80 bg-bg-secondary border-r border-border-color h-full overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-bg-tertiary rounded-md transition-colors duration-200"
          >
            <X className="w-5 h-5 text-text-muted" />
          </button>
        </div>

        {/* Clear All Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="w-full mb-6 py-2 text-sm text-accent-blue hover:text-accent-blue/80 border border-accent-blue/20 rounded-lg hover:bg-accent-blue/5 transition-colors duration-200"
          >
            Clear All Filters
          </button>
        )}

        <div className="space-y-6">
          {/* Price Range */}
          <RangeSlider
            label="Price Range"
            min={0}
            max={1000000}
            step={5000}
            value={filters.priceRange}
            onChange={(value) => updateFilters({ priceRange: value })}
            formatValue={formatPrice}
          />

          {/* Property Types */}
          <MultiSelect
            label="Property Types"
            options={propertyTypes}
            selected={filters.propertyTypes}
            onChange={(selected) => updateFilters({ propertyTypes: selected })}
          />

          {/* Bedrooms */}
          <SingleSelect
            label="Bedrooms"
            options={bedroomOptions}
            selected={filters.bedrooms}
            onChange={(selected) => updateFilters({ bedrooms: selected })}
          />

          {/* Bathrooms */}
          <SingleSelect
            label="Bathrooms"
            options={bathroomOptions}
            selected={filters.bathrooms}
            onChange={(selected) => updateFilters({ bathrooms: selected })}
          />

          {/* Condition */}
          <MultiSelect
            label="Condition"
            options={conditions}
            selected={filters.condition}
            onChange={(selected) => updateFilters({ condition: selected })}
          />

          {/* Cities */}
          <MultiSelect
            label="Cities"
            options={cities}
            selected={filters.cities}
            onChange={(selected) => updateFilters({ cities: selected })}
          />

          {/* ROI Range */}
          <RangeSlider
            label="ROI Range"
            min={0}
            max={30}
            step={0.5}
            value={filters.roiRange}
            onChange={(value) => updateFilters({ roiRange: value })}
            formatValue={formatROI}
          />
        </div>
      </div>
    </div>
  )
} 