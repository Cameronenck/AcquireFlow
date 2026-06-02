import { Request, Response } from 'express';
import axios from 'axios';
import { config } from '../config/env';

/**
 * Interface for MLS search request body / query params
 */
interface MlsSearchParams {
  // Location filters
  locations?: string | string[];
  city?: string;
  state?: string;
  zipCode?: string;
  // Listing status
  mlsActive?: boolean | string;
  mlsPending?: boolean | string;
  mlsSold?: boolean | string;
  // Price filters
  minPrice?: number | string;
  maxPrice?: number | string;
  // Property filters
  propertyType?: string;
  minBeds?: number | string;
  maxBeds?: number | string;
  minBaths?: number | string;
  maxBaths?: number | string;
  minSqft?: number | string;
  maxSqft?: number | string;
  // Pagination
  size?: number | string;
  from?: number | string;
}

/**
 * Parse a boolean-ish query string value.
 * Returns undefined if the input is absent/not a recognisable boolean.
 */
const parseBool = (val: unknown): boolean | undefined => {
  if (val === undefined || val === null) return undefined;
  if (typeof val === 'boolean') return val;
  const s = String(val).toLowerCase();
  if (s === 'true' || s === '1') return true;
  if (s === 'false' || s === '0') return false;
  return undefined;
};

/**
 * POST /api/v1/properties/mls-search
 *
 * Proxy endpoint that forwards MLS-filtered property search requests to the
 * RealEstateAPI.com v2 PropertySearch endpoint.  Forces mls_active: true by
 * default so DealBot always gets live MLS listings.
 *
 * Request body (all optional):
 *   locations   – array or comma-separated string of "City, ST" values
 *   city, state – alternative to locations
 *   zipCode     – ZIP code filter
 *   mlsActive   – boolean (default true)
 *   mlsPending  – include pending listings
 *   mlsSold     – include recently sold listings
 *   minPrice / maxPrice
 *   propertyType
 *   minBeds / maxBeds / minBaths / maxBaths / minSqft / maxSqft
 *   size        – result page size (default 25, max 250)
 *   from        – offset for pagination
 */
export const mlsSearch = async (req: Request, res: Response): Promise<Response> => {
  try {
    console.log('🏘️  MLS search request received');
    console.log('Body:', JSON.stringify(req.body, null, 2));
    console.log('Query:', JSON.stringify(req.query, null, 2));

    // Prefer REAL_ESTATE_API_KEY; fall back to MLS_API_KEY for backward compat
    const apiKey =
      process.env['REAL_ESTATE_API_KEY'] ||
      config.mls.apiKey;

    if (!apiKey) {
      console.error('❌ MLS API key not configured');
      return res.status(500).json({
        success: false,
        message: 'MLS API key not configured (REAL_ESTATE_API_KEY or MLS_API_KEY)',
      });
    }

    // Merge body + query params so callers can use either style
    const params: MlsSearchParams = { ...req.query, ...req.body } as MlsSearchParams;

    // Build the downstream request body
    const requestBody: Record<string, unknown> = {
      // Always include active MLS listings unless caller explicitly opts out
      mls_active: parseBool(params.mlsActive) ?? true,
    };

    // Location handling
    if (params.locations) {
      const locs = Array.isArray(params.locations)
        ? params.locations
        : String(params.locations)
            .split(',')
            .map((l) => l.trim())
            .filter(Boolean);
      if (locs.length) requestBody['locations'] = locs;
    } else {
      if (params.city)    requestBody['city']    = params.city;
      if (params.state)   requestBody['state']   = params.state;
      if (params.zipCode) requestBody['zipCode'] = params.zipCode;
    }

    // Optional listing-status flags
    const mlsPending = parseBool(params.mlsPending);
    const mlsSold    = parseBool(params.mlsSold);
    if (mlsPending !== undefined) requestBody['mls_pending'] = mlsPending;
    if (mlsSold    !== undefined) requestBody['mls_sold']    = mlsSold;

    // Price range
    if (params.minPrice !== undefined) requestBody['minPrice'] = Number(params.minPrice);
    if (params.maxPrice !== undefined) requestBody['maxPrice'] = Number(params.maxPrice);

    // Property details
    if (params.propertyType) requestBody['propertyType'] = params.propertyType;
    if (params.minBeds  !== undefined) requestBody['minBeds']  = Number(params.minBeds);
    if (params.maxBeds  !== undefined) requestBody['maxBeds']  = Number(params.maxBeds);
    if (params.minBaths !== undefined) requestBody['minBaths'] = Number(params.minBaths);
    if (params.maxBaths !== undefined) requestBody['maxBaths'] = Number(params.maxBaths);
    if (params.minSqft  !== undefined) requestBody['minSqft']  = Number(params.minSqft);
    if (params.maxSqft  !== undefined) requestBody['maxSqft']  = Number(params.maxSqft);

    // Pagination
    const size = params.size !== undefined ? Math.min(Number(params.size), 250) : 25;
    requestBody['size'] = size;
    if (params.from !== undefined) requestBody['from'] = Number(params.from);

    console.log('🌐 Calling RealEstateAPI PropertySearch (MLS)');
    console.log('📋 Payload:', JSON.stringify(requestBody, null, 2));

    const apiUrl =
      config.mls.apiUrl ||
      'https://api.realestateapi.com/v2/PropertySearch';

    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'User-Agent': 'AcquireFlow-DealBot/1.0',
      },
      timeout: 30_000,
    });

    console.log('✅ MLS API response received, status:', response.status);
    console.log('📊 Result count:', response.data?.data?.length ?? 0);

    return res.json({
      success: true,
      count: response.data?.data?.length ?? 0,
      data: response.data,
    });
  } catch (error: any) {
    console.error('❌ MLS search error:', error.message);

    if (error.response) {
      console.error('API error status:', error.response.status);
      console.error('API error data:', error.response.data);
      return res.status(error.response.status).json({
        success: false,
        message: `MLS API Error: ${error.response.data?.message || error.message}`,
        details: error.response.data,
      });
    }

    if (error.request) {
      return res.status(503).json({
        success: false,
        message: 'Unable to connect to MLS API service',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error during MLS search',
    });
  }
};

export default mlsSearch;
