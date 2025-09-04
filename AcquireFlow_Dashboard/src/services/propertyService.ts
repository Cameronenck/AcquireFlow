// Frontend API base is computed within this service; no direct config import

// API Response Types based on the provided structure
export interface PropertyAddress {
  address: string;
  city: string;
  county: string;
  fips: string;
  state: string;
  street: string;
  zip: string;
}

export interface MailAddress {
  address: string;
  city: string;
  county: string;
  state: string;
  street: string;
  zip: string;
}

export interface PropertyData {
  absenteeOwner: boolean;
  address: PropertyAddress;
  adjustableRate: boolean;
  airConditioningAvailable: boolean | null;
  apn: string;
  assessedImprovementValue: number;
  assessedLandValue: number;
  assessedValue: number;
  assumable: boolean;
  auction: boolean;
  auctionDate: string | null;
  basement: boolean;
  bathrooms: number | null;
  bedrooms: number | null;
  cashBuyer: boolean;
  companyName: string;
  corporateOwned: boolean;
  death: boolean;
  deck: boolean;
  deckArea: number;
  documentType: string;
  documentTypeCode: string;
  equity: boolean;
  equityPercent: number;
  estimatedEquity: number;
  estimatedValue: number;
  floodZone: boolean;
  floodZoneDescription: string;
  floodZoneType: string;
  foreclosure: boolean;
  forSale: boolean;
  freeClear: boolean;
  garage: boolean;
  highEquity: boolean;
  hoa: string | null;
  id: string;
  inherited: boolean;
  inStateAbsenteeOwner: boolean;
  investorBuyer: boolean;
  judgment: boolean;
  landUse: string;
  lastMortgage1Amount: number | null;
  lastSaleAmount: string;
  lastSaleArmsLength: boolean;
  lastSaleDate: string;
  lastUpdateDate: string;
  latitude: number;
  lenderName: string;
  listingAmount: number | null;
  longitude: number;
  lotSquareFeet: number;
  mailAddress: MailAddress;
  medianIncome: string;
  MFH2to4: boolean;
  MFH5plus: boolean;
  mlsActive: boolean;
  mlsCancelled: boolean;
  mlsFailed: boolean;
  mlsHasPhotos: boolean;
  mlsLastSaleDate: string;
  mlsListingPrice: number | null;
  mlsPending: boolean;
  mlsSold: boolean;
  negativeEquity: boolean;
  openMortgageBalance: number;
  outOfStateAbsenteeOwner: boolean;
  owner1LastName: string;
  ownerOccupied: boolean;
  patio: boolean;
  patioArea: number;
  pool: boolean;
  poolArea: number;
  portfolioPurchasedLast12Months: number;
  portfolioPurchasedLast6Months: number;
  preForeclosure: boolean;
  pricePerSquareFoot: number;
  priorSaleAmount: number | null;
  privateLender: boolean;
  propertyId: string;
  propertyType: string;
  propertyUse: string;
  propertyUseCode: number;
  recordingDate: string;
  rentAmount: number | null;
  reo: boolean;
  roofConstruction: string | null;
  roofMaterial: string | null;
  roomsCount: number;
  squareFeet: number;
  stories: number | null;
  taxLien: boolean;
  totalPortfolioEquity: string;
  totalPortfolioMortgageBalance: string;
  totalPortfolioValue: string;
  totalPropertiesOwned: string;
  unitsCount: number;
  vacant: boolean;
  yearBuilt: number | null;
  yearsOwned: number;
}

export interface PropertySearchResponse {
  live: boolean;
  input: Record<string, any>;
  data: PropertyData[];
}

export interface PropertySearchFilters {
  locations?: string[];
  minPrice?: number;
  maxPrice?: number;
  propertyTypes?: string[];
  motivationFactors?: string[];
  investmentStrategy?: string;
  minBeds?: number;
  maxBeds?: number;
  minBaths?: number;
  maxBaths?: number;
  minSqft?: number;
  maxSqft?: number;
  absenteeOwner?: boolean;
  highEquity?: boolean;
  outOfStateOwner?: boolean;
  corporateOwned?: boolean;
  investorBuyer?: boolean;
  preForeclosure?: boolean;
  taxLien?: boolean;
  vacant?: boolean;
  cashBuyer?: boolean;
  equityPercent?: number;
  yearsOwned?: number;
  lastSaleDate?: string;
  medianIncome?: number;
}

export interface LeaderboardItem {
  rank: number;
  city: string;
  state: string;
  county?: string;
  priceGrowth: number;
  capRate: number;
  jobGrowth: number;
  affordability: number; // 0-100 score
  investmentScore: number; // 0-100
  sampleSize: number;
}

export interface MarketKpisResponse {
  city: string;
  state: string;
  medianPrice: number;
  priceChangeMoM: number;
  inventory: number;
  inventoryChangeMoM: number;
  daysOnMarket: number;
  daysOnMarketChangeMoM: number;
  opportunityScore: number;
}

class PropertyService {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    // Use your backend API instead of direct external API
    this.baseUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3000/api/v1';
    this.apiKey = ''; // Not needed for backend calls
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const method = (options.method || 'GET').toUpperCase();
      const baseHeaders: Record<string, string> = { 'Accept': 'application/json' };
      // Only set Content-Type for non-GET or when a body is present to avoid unnecessary preflight
      if (method !== 'GET' && !(options.headers && (options.headers as any)['Content-Type'])) {
        baseHeaders['Content-Type'] = 'application/json';
      }
      const response = await fetch(url, {
        ...options,
        headers: {
          ...baseHeaders,
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      // If CORS error, provide a more helpful message
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('CORS_ERROR: Unable to connect to real estate API. Using mock data instead.');
      }
      throw error;
    }
  }

  /**
   * Search for properties based on filters
   */
  async searchProperties(filters: PropertySearchFilters): Promise<PropertySearchResponse> {
    const searchParams = new URLSearchParams();
    
    // Add filters to search parameters
    if (filters.locations && filters.locations.length > 0) {
      searchParams.append('locations', filters.locations.join(','));
    }
    if (filters.minPrice) {
      searchParams.append('minPrice', filters.minPrice.toString());
    }
    if (filters.maxPrice) {
      searchParams.append('maxPrice', filters.maxPrice.toString());
    }
    if (filters.propertyTypes && filters.propertyTypes.length > 0) {
      searchParams.append('propertyTypes', filters.propertyTypes.join(','));
    }
    if (filters.minBeds) {
      searchParams.append('minBeds', filters.minBeds.toString());
    }
    if (filters.maxBeds) {
      searchParams.append('maxBeds', filters.maxBeds.toString());
    }
    if (filters.minBaths) {
      searchParams.append('minBaths', filters.minBaths.toString());
    }
    if (filters.maxBaths) {
      searchParams.append('maxBaths', filters.maxBaths.toString());
    }
    if (filters.minSqft) {
      searchParams.append('minSqft', filters.minSqft.toString());
    }
    if (filters.maxSqft) {
      searchParams.append('maxSqft', filters.maxSqft.toString());
    }
    if (filters.absenteeOwner !== undefined) {
      searchParams.append('absenteeOwner', filters.absenteeOwner.toString());
    }
    if (filters.highEquity !== undefined) {
      searchParams.append('highEquity', filters.highEquity.toString());
    }
    if (filters.outOfStateOwner !== undefined) {
      searchParams.append('outOfStateOwner', filters.outOfStateOwner.toString());
    }
    if (filters.corporateOwned !== undefined) {
      searchParams.append('corporateOwned', filters.corporateOwned.toString());
    }
    if (filters.investorBuyer !== undefined) {
      searchParams.append('investorBuyer', filters.investorBuyer.toString());
    }
    if (filters.preForeclosure !== undefined) {
      searchParams.append('preForeclosure', filters.preForeclosure.toString());
    }
    if (filters.taxLien !== undefined) {
      searchParams.append('taxLien', filters.taxLien.toString());
    }
    if (filters.vacant !== undefined) {
      searchParams.append('vacant', filters.vacant.toString());
    }
    if (filters.cashBuyer !== undefined) {
      searchParams.append('cashBuyer', filters.cashBuyer.toString());
    }
    if (filters.equityPercent) {
      searchParams.append('equityPercent', filters.equityPercent.toString());
    }
    if (filters.yearsOwned) {
      searchParams.append('yearsOwned', filters.yearsOwned.toString());
    }
    if (filters.lastSaleDate) {
      searchParams.append('lastSaleDate', filters.lastSaleDate);
    }
    if (filters.medianIncome) {
      searchParams.append('medianIncome', filters.medianIncome.toString());
    }

    const queryString = searchParams.toString();
    const endpoint = `/properties/search${queryString ? `?${queryString}` : ''}`;
    
    const result = await this.request<{success: boolean, data: PropertySearchResponse}>(endpoint);
    return result.data;
  }

  /**
   * Get featured properties (default search)
   */
   async getFeaturedProperties(): Promise<PropertySearchResponse> {
    console.log('🔍 Fetching featured properties from backend:', `${this.baseUrl}/properties/featured`);
    
    try {
      const result = await this.request<{success: boolean, data: PropertySearchResponse}>('/properties/featured');
      console.log('✅ Backend API Response received:', result);
      return result.data;
    } catch (error) {
      console.log('❌ Backend API Error:', error);
      throw error;
    }
  }

  /**
   * Get property details by ID
   */
  async getPropertyDetails(propertyId: string): Promise<PropertyData> {
    const result = await this.request<{success: boolean, data: PropertyData}>(`/properties/${propertyId}`);
    return result.data;
  }

  /**
   * Get properties by location
   */
  async getPropertiesByLocation(location: string): Promise<PropertySearchResponse> {
    const searchParams = new URLSearchParams();
    searchParams.append('locations', location);
    
    const result = await this.request<{success: boolean, data: PropertySearchResponse}>(`/properties/search?${searchParams.toString()}`);
    return result.data;
  }

  /**
   * Get Top 10 cities leaderboard from backend
   */
  async getInvestmentLeaderboard(): Promise<LeaderboardItem[]> {
    const result = await this.request<{ success: boolean; data: LeaderboardItem[] }>(
      `/properties/leaderboard`
    );
    return result.data;
  }

  /**
   * Get market KPIs for a city/state pair like "Orlando, FL"
   */
  async getMarketKpis(location: string): Promise<MarketKpisResponse> {
    const [city, state] = location.split(',').map(s => s.trim());
    if (!city || !state) throw new Error('Invalid location; expected format "City, ST"');
    const qs = new URLSearchParams({ city, state }).toString();
    const result = await this.request<{ success: boolean; data: MarketKpisResponse }>(`/properties/market-kpis?${qs}`);
    return result.data;
  }
}

export const propertyService = new PropertyService();

// Simple test function to debug backend API
export const testAPI = async () => {
  console.log('🧪 Testing BACKEND API...');
  
  const backendUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3000/api/v1';
  const testUrl = `${backendUrl}/properties/featured`;
  
  console.log('🎯 Backend API URL:', testUrl);
  
  try {
    console.log('\n🔍 Testing: Backend Featured Properties');
    console.log(`📍 URL: ${testUrl}`);
    
    const response = await fetch(testUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    console.log(`📊 Status: ${response.status} ${response.statusText}`);
    console.log(`📋 Response Headers:`, Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ SUCCESS! Backend data received:', data);
      return data;
    } else {
      const error = await response.text();
      console.log('❌ Backend error response:', error);
    }
    
  } catch (error) {
    console.log('❌ Backend API Error:', error);
    console.log('\n🚫 Backend API test failed. This could be due to:');
    console.log('1. Backend server not running');
    console.log('2. Backend server not accessible');
    console.log('3. REAL_ESTATE_API_KEY not set in backend environment');
    console.log('4. External API endpoint issues');
  }
};
