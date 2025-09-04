import { Router, Request, Response } from 'express';
import axios from 'axios';
import { LeaderboardService } from '../services/leaderboardService';

const router = Router();

// Interface for property search filters
interface PropertySearchFilters {
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

/**
 * GET /api/v1/properties/search
 * Proxy endpoint to call the real estate API
 */
router.get('/search', async (req: Request, res: Response) => {
  try {
    console.log('🏠 Property search request received');
    console.log('Query params:', req.query);

    // Get API key from environment
    const apiKey = process.env['REAL_ESTATE_API_KEY'];
    console.log('🔑 API Key check:', apiKey ? `Present (${apiKey.substring(0, 10)}...)` : 'Missing');
    
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: 'Real Estate API key not configured'
      });
    }

    // Build query parameters for the external API
    const searchParams = new URLSearchParams();
    
    // Add filters to search parameters
    const filters = req.query as PropertySearchFilters;
    
    if (filters.locations && Array.isArray(filters.locations)) {
      searchParams.append('locations', filters.locations.join(','));
    }
    if (filters.minPrice) {
      searchParams.append('minPrice', filters.minPrice.toString());
    }
    if (filters.maxPrice) {
      searchParams.append('maxPrice', filters.maxPrice.toString());
    }
    if (filters.propertyTypes && Array.isArray(filters.propertyTypes)) {
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

    console.log('🌐 Calling external API for property search (POST method)');

    // Build the request body with filters
    const requestBody: any = {};
    
    // Add filters to request body (convert from query params to body params)
    if (filters.locations && Array.isArray(filters.locations)) {
      requestBody.locations = filters.locations;
    }
    if (filters.minPrice) requestBody.minPrice = filters.minPrice;
    if (filters.maxPrice) requestBody.maxPrice = filters.maxPrice;
    if (filters.propertyTypes && Array.isArray(filters.propertyTypes)) {
      requestBody.propertyTypes = filters.propertyTypes;
    }
    if (filters.minBeds) requestBody.minBeds = filters.minBeds;
    if (filters.maxBeds) requestBody.maxBeds = filters.maxBeds;
    if (filters.minBaths) requestBody.minBaths = filters.minBaths;
    if (filters.maxBaths) requestBody.maxBaths = filters.maxBaths;
    if (filters.minSqft) requestBody.minSqft = filters.minSqft;
    if (filters.maxSqft) requestBody.maxSqft = filters.maxSqft;
    
    // Add boolean filters
    if (filters.absenteeOwner !== undefined) requestBody.absenteeOwner = filters.absenteeOwner;
    if (filters.highEquity !== undefined) requestBody.highEquity = filters.highEquity;
    if (filters.outOfStateOwner !== undefined) requestBody.outOfStateOwner = filters.outOfStateOwner;
    if (filters.corporateOwned !== undefined) requestBody.corporateOwned = filters.corporateOwned;
    if (filters.investorBuyer !== undefined) requestBody.investorBuyer = filters.investorBuyer;
    if (filters.preForeclosure !== undefined) requestBody.preForeclosure = filters.preForeclosure;
    if (filters.taxLien !== undefined) requestBody.taxLien = filters.taxLien;
    if (filters.vacant !== undefined) requestBody.vacant = filters.vacant;
    if (filters.cashBuyer !== undefined) requestBody.cashBuyer = filters.cashBuyer;
    
    // Add numeric filters
    if (filters.equityPercent) requestBody.equityPercent = filters.equityPercent;
    if (filters.yearsOwned) requestBody.yearsOwned = filters.yearsOwned;
    if (filters.lastSaleDate) requestBody.lastSaleDate = filters.lastSaleDate;
    if (filters.medianIncome) requestBody.medianIncome = filters.medianIncome;

    console.log('📋 Request body:', JSON.stringify(requestBody, null, 2));

    // Use the correct format from the cURL command
    const response = await axios.post('https://api.realestateapi.com/v2/PropertySearch', requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'User-Agent': 'AcquireFlow/1.0'
      },
      timeout: 30000 // 30 second timeout
    });

    console.log('✅ External API response received:', response.status);
    console.log('📊 Data count:', response.data?.data?.length || 0);

    // Return the data to frontend
    return res.json({
      success: true,
      data: response.data
    });

  } catch (error: any) {
    console.error('❌ Property search error:', error.message);
    
    if (error.response) {
      // External API returned an error
      console.error('API Error Status:', error.response.status);
      console.error('API Error Data:', error.response.data);
      
      return res.status(error.response.status).json({
        success: false,
        message: `External API Error: ${error.response.data?.message || error.message}`,
        details: error.response.data
      });
    } else if (error.request) {
      // Network error
      return res.status(503).json({
        success: false,
        message: 'Unable to connect to real estate API service'
      });
    } else {
      // Other error
      return res.status(500).json({
        success: false,
        message: 'Internal server error while processing property search'
      });
    }
  }
});

/**
 * GET /api/v1/properties/featured
 * Get featured properties (default search)
 */
router.get('/featured', async (_req: Request, res: Response) => {
  try {
    console.log('🏠 Featured properties request received');

    // Get API key from environment
    const apiKey = process.env['REAL_ESTATE_API_KEY'];
    console.log('🔑 API Key check:', apiKey ? `Present (${apiKey.substring(0, 10)}...)` : 'Missing');
    
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: 'Real Estate API key not configured'
      });
    }

    console.log('🌐 Calling external API for featured properties (POST method)');
    console.log('📤 Request headers:', {
      'Content-Type': 'application/json',
      'x-api-key': `${apiKey.substring(0, 15)}...`,
      'User-Agent': 'AcquireFlow/1.0'
    });
    console.log('📤 Request body:', JSON.stringify({}, null, 2));

    // Use the correct format from the cURL command
    const response = await axios.post('https://api.realestateapi.com/v2/PropertySearch', {}, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'User-Agent': 'AcquireFlow/1.0'
      },
      timeout: 30000 // 30 second timeout
    });

    console.log('✅ External API response received:', response.status);
    console.log('📊 Featured properties count:', response.data?.data?.length || 0);

    // Return the data to frontend
    return res.json({
      success: true,
      data: response.data
    });

  } catch (error: any) {
    console.error('❌ Featured properties error:', error.message);
    
    if (error.response) {
      console.error('📊 Error Status:', error.response.status);
      console.error('📋 Error Headers:', error.response.headers);
      console.error('📄 Error Data:', error.response.data);
      console.error('🔗 Request URL:', error.config?.url);
      console.error('📤 Request Headers:', error.config?.headers);
      
      return res.status(error.response.status).json({
        success: false,
        message: `External API Error: ${error.response.data?.message || error.message}`,
        details: error.response.data,
        apiStatus: error.response.status
      });
    } else if (error.request) {
      return res.status(503).json({
        success: false,
        message: 'Unable to connect to real estate API service'
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Internal server error while fetching featured properties'
      });
    }
  }
});

/**
 * GET /api/v1/properties/market-kpis
 * Query: city=Orlando&state=FL
 */
router.get('/market-kpis', async (req: Request, res: Response) => {
  try {
    const city = ((req.query as any)['city'] as string || '').trim();
    const state = ((req.query as any)['state'] as string || '').trim();
    if (!city || !state) {
      return res.status(400).json({ success: false, message: 'city and state are required, e.g., ?city=Orlando&state=FL' });
    }
    const data = await LeaderboardService.computeCityKpisFromSample(city, state);
    const keys = Object.keys(data || {});
    const isZeroed = !data || (!data['medianPrice'] && !data['inventory'] && !data['daysOnMarket']);
    return res.json({ success: true, data, meta: { keys, city, state, zeroed: isZeroed } });
  } catch (error: any) {
    const message = error?.message || 'Failed to compute market KPIs';
    return res.status(500).json({ success: false, message });
  }
});

/**
 * GET /api/v1/properties/:id
 * Get property details by ID
 */
// Leaderboard must be defined BEFORE the catch-all :id route
/**
 * GET /api/v1/properties/leaderboard
 * Compute and return Top 10 cities to invest in
 */
router.get('/leaderboard', async (_req: Request, res: Response) => {
  try {
    const top10 = await LeaderboardService.computeLeaderboard();
    return res.json({ success: true, data: top10 });
  } catch (error: any) {
    const message = error?.message || 'Failed to compute leaderboard';
    return res.status(500).json({ success: false, message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log('🏠 Property details request for ID:', id);

    // Get API key from environment
    const apiKey = process.env['REAL_ESTATE_API_KEY'];
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: 'Real Estate API key not configured'
      });
    }

    const apiUrl = `https://api.realestateapi.com/v2/Property/${id}?apikey=${apiKey}`;
    
    console.log('🌐 Calling external API for property details');

    // Make request to external API
    const response = await axios.get(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'AcquireFlow/1.0'
      },
      timeout: 30000 // 30 second timeout
    });

    console.log('✅ External API response received:', response.status);

    // Return the data to frontend
    return res.json({
      success: true,
      data: response.data
    });

  } catch (error: any) {
    console.error('❌ Property details error:', error.message);
    
    if (error.response) {
      return res.status(error.response.status).json({
        success: false,
        message: `External API Error: ${error.response.data?.message || error.message}`,
        details: error.response.data
      });
    } else if (error.request) {
      return res.status(503).json({
        success: false,
        message: 'Unable to connect to real estate API service'
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Internal server error while fetching property details'
      });
    }
  }
});

export default router;
