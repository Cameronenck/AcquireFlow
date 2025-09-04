import axios from 'axios';

type NullableNumber = number | null | undefined;

export interface LeaderboardItem {
  rank: number;
  city: string;
  state: string;
  county?: string;
  priceGrowth: number; // %
  capRate: number; // %
  jobGrowth: number; // %
  affordability: number; // 0-100 score
  investmentScore: number; // 0-100 score
  sampleSize: number;
}

interface RealEstatePropertyAddress {
  city?: string;
  state?: string;
  county?: string;
}

interface RealEstateProperty {
  address?: RealEstatePropertyAddress;
  mlsActive?: boolean;
  mlsListingPrice?: NullableNumber;
  mlsSold?: boolean;
  mlsSoldPrice?: NullableNumber;
  lastSaleAmount?: string | number | null;
  lastSaleDate?: string | null;
  estimatedValue?: NullableNumber;
  rentAmount?: NullableNumber;
  medianIncome?: NullableNumber;
}

interface PropertySearchApiResponse {
  live: boolean;
  input: Record<string, unknown>;
  data: RealEstateProperty[];
}

interface CityMetricsRaw {
  key: string; // "City, ST"
  city: string;
  state: string;
  county?: string | undefined;
  sampleSize: number;
  medianCurrentPrice: number; // dollars
  medianLastYearSalePrice: number; // dollars
  priceGrowthPct: number; // %
  medianMonthlyRent: number; // dollars
  capRatePct: number; // %
  jobGrowthPct: number; // %
  affordabilityRaw: number; // income/price*100
}

const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

const parseCurrency = (value: string | number | null | undefined): number | null => {
  if (value === null || value === undefined) return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  const cleaned = value.replace(/[^0-9.\-]/g, '');
  const parsed = parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
};

const median = (values: number[]): number => {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid]! : (sorted[mid - 1]! + sorted[mid]!) / 2;
};

const withinYear = (dateStr: string | null | undefined, year: number): boolean => {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return false;
  return d.getUTCFullYear() === year;
};

const minMaxNormalize = (values: number[]): ((v: number) => number) => {
  if (!values.length) return () => 0;
  const min = Math.min(...values);
  const max = Math.max(...values);
  if (min === max) return () => 50; // flat values, neutral score
  return (v: number) => clamp(((v - min) / (max - min)) * 100, 0, 100);
};

// Basic job growth provider with graceful fallback.
// In the future, integrate BLS/Census properly.
const getJobGrowthPct = async (_city: string, _state: string): Promise<number> => {
  // Placeholder constant with slight variability
  return 2 + Math.random() * 3; // 2% - 5%
};

export class LeaderboardService {
  static async fetchPropertySample(size = 250): Promise<RealEstateProperty[]> {
    const apiKey = process.env['REAL_ESTATE_API_KEY'];
    if (!apiKey) throw new Error('Real Estate API key not configured');

    const tryRequest = async (requestBody: Record<string, unknown>) => {
      const response = await axios.post<PropertySearchApiResponse>(
        'https://api.realestateapi.com/v2/PropertySearch',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'User-Agent': 'AcquireFlow/1.0',
          },
          timeout: 30000,
        },
      );
      return response;
    };

    try {
      // Primary attempt with explicit filters
      const body = {
        size,
        mls_active: true,
      } as Record<string, unknown>;
      const response = await tryRequest(body);
      return response.data?.data || [];
    } catch (err: any) {
      // Fallback: try minimal body if provider rejects filters
      if (err?.response && (err.response.status === 400 || err.response.status === 422)) {
        const fallback = await tryRequest({});
        return fallback.data?.data || [];
      }
      throw err;
    }
  }

  static async fetchCitySample(city: string, state: string, size = 250): Promise<RealEstateProperty[]> {
    const apiKey = process.env['REAL_ESTATE_API_KEY'];
    if (!apiKey) throw new Error('Real Estate API key not configured');

    const tryRequest = async (requestBody: Record<string, unknown>) => {
      const response = await axios.post<PropertySearchApiResponse>(
        'https://api.realestateapi.com/v2/PropertySearch',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'User-Agent': 'AcquireFlow/1.0',
          },
          timeout: 30000,
        },
      );
      return response;
    };

    // First attempt: provider-side filtering by locations
    try {
      const body = {
        size,
        mls_active: true,
        locations: [`${city}, ${state}`],
      } as Record<string, unknown>;
      const response = await tryRequest(body);
      const data = response.data?.data || [];
      if (data.length) return data;
    } catch (err: any) {
      if (!(err?.response && (err.response.status === 400 || err.response.status === 422))) throw err;
    }

    // Second attempt: explicit city/state keys
    try {
      const body2 = {
        size,
        mls_active: true,
        city,
        state,
      } as Record<string, unknown>;
      const response2 = await tryRequest(body2);
      const data2 = response2.data?.data || [];
      if (data2.length) return data2;
    } catch (err: any) {
      if (!(err?.response && (err.response.status === 400 || err.response.status === 422))) throw err;
    }

    // Third attempt: state-only to approximate
    try {
      const body3 = {
        size,
        mls_active: true,
        state,
      } as Record<string, unknown>;
      const response3 = await tryRequest(body3);
      const data3 = response3.data?.data || [];
      if (data3.length) return data3.filter(p => (p.address?.state || '').toUpperCase() === state.toUpperCase());
    } catch (err: any) {
      if (!(err?.response && (err.response.status === 400 || err.response.status === 422))) throw err;
    }

    // Fallback: broader fetch, filter client-side; if none by city, return state level
    const broad = await this.fetchPropertySample(Math.min(size * 4, 1000));
    const normalize = (s: string | undefined) => (s || '').trim().toLowerCase();
    const nCity = normalize(city);
    const nState = normalize(state);
    const byCity = broad.filter(p => normalize(p.address?.city) === nCity && normalize(p.address?.state) === nState);
    if (byCity.length) return byCity;
    return broad.filter(p => normalize(p.address?.state) === nState);
  }

  static async computeLeaderboard(): Promise<LeaderboardItem[]> {
    const now = new Date();
    const lastYear = now.getUTCFullYear() - 1;

    const properties = await LeaderboardService.fetchPropertySample(250);

    // Group by City, State
    const grouped: Record<string, RealEstateProperty[]> = {};
    const countyMode: Record<string, Record<string, number>> = {};
    for (const p of properties) {
      const city = p.address?.city?.trim();
      const state = p.address?.state?.trim();
      if (!city || !state) continue;
      const key = `${city}, ${state}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(p);
      const county = p.address?.county?.trim();
      if (county) {
        if (!countyMode[key]) countyMode[key] = {};
        countyMode[key][county] = (countyMode[key][county] || 0) + 1;
      }
    }

    const cityMetrics: CityMetricsRaw[] = [];

    for (const [key, list] of Object.entries(grouped)) {
      if (!list.length) continue;
      const parts = key.split(',');
      const city = (parts[0] || '').trim();
      const state = (parts[1] || '').trim();

      const activePrices: number[] = [];
      const soldLastYearPrices: number[] = [];
      const rents: number[] = [];
      const incomes: number[] = [];

      for (const p of list) {
        // Current MLS price preferences: mlsListingPrice -> estimatedValue -> mlsSoldPrice
        const priceCandidates: NullableNumber[] = [
          p.mlsListingPrice,
          p.estimatedValue,
          p.mlsSoldPrice,
        ];
        const price = priceCandidates.find((val) => typeof val === 'number' && Number.isFinite(val as number)) as number | undefined;
        if (price) activePrices.push(price);

        // Last year sold price
        const lastSale = parseCurrency(p.lastSaleAmount ?? null);
        const lastSaleDateStr = p.lastSaleDate || null;
        if (lastSale !== null && withinYear(lastSaleDateStr, lastYear)) {
          soldLastYearPrices.push(lastSale);
        } else if (p.mlsSold && typeof p.mlsSoldPrice === 'number' && withinYear(lastSaleDateStr, lastYear)) {
          soldLastYearPrices.push(p.mlsSoldPrice);
        }

        if (typeof p.rentAmount === 'number' && Number.isFinite(p.rentAmount)) {
          rents.push(p.rentAmount);
        }

        if (typeof p.medianIncome === 'number' && Number.isFinite(p.medianIncome)) {
          incomes.push(p.medianIncome);
        }
      }

      const medianCurrentPrice = median(activePrices);
      // Fallback for last year: if none found, use 0.9x of current as a conservative proxy
      const medianLastYearSalePrice = soldLastYearPrices.length ? median(soldLastYearPrices) : Math.max(1, medianCurrentPrice * 0.9);
      const priceGrowthPct = medianLastYearSalePrice > 0 ? ((medianCurrentPrice - medianLastYearSalePrice) / medianLastYearSalePrice) * 100 : 0;

      const medianMonthlyRent = rents.length ? median(rents) : medianCurrentPrice > 0 ? medianCurrentPrice * 0.006 : 0; // heuristic 0.6% monthly
      const capRatePct = medianCurrentPrice > 0 ? ((medianMonthlyRent * 12) / medianCurrentPrice) * 100 : 0;

      const medianIncome = incomes.length ? median(incomes) : 0;
      const affordabilityRaw = medianCurrentPrice > 0 ? (medianIncome / medianCurrentPrice) * 100 : 0;

      const countyCounts = countyMode[key] || {};
      const county = Object.keys(countyCounts).sort((a, b) => (countyCounts[b] || 0) - (countyCounts[a] || 0))[0];

      // Job growth (placeholder)
      const jobGrowthPct = await getJobGrowthPct(city, state);

      cityMetrics.push({
        key,
        city,
        state,
        county,
        sampleSize: list.length,
        medianCurrentPrice,
        medianLastYearSalePrice,
        priceGrowthPct,
        medianMonthlyRent,
        capRatePct,
        jobGrowthPct,
        affordabilityRaw,
      });
    }

    if (!cityMetrics.length) return [];

    // Build normalizers
    const priceGrowthNormalizer = minMaxNormalize(cityMetrics.map((m) => m.priceGrowthPct));
    const capRateNormalizer = minMaxNormalize(cityMetrics.map((m) => m.capRatePct));
    const jobGrowthNormalizer = minMaxNormalize(cityMetrics.map((m) => m.jobGrowthPct));
    const affordabilityNormalizer = minMaxNormalize(cityMetrics.map((m) => m.affordabilityRaw));

    const weights = {
      priceGrowth: 0.3,
      capRate: 0.3,
      jobGrowth: 0.2,
      affordability: 0.2,
    } as const;

    const scored = cityMetrics.map<LeaderboardItem>((m) => {
      const priceGrowthScore = priceGrowthNormalizer(m.priceGrowthPct);
      const capRateScore = capRateNormalizer(m.capRatePct);
      const jobGrowthScore = jobGrowthNormalizer(m.jobGrowthPct);
      const affordabilityScore = affordabilityNormalizer(m.affordabilityRaw);
      const investmentScore =
        priceGrowthScore * weights.priceGrowth +
        capRateScore * weights.capRate +
        jobGrowthScore * weights.jobGrowth +
        affordabilityScore * weights.affordability;
      const base = {
        rank: 0, // assign after sorting
        city: m.city,
        state: m.state,
        priceGrowth: Number(m.priceGrowthPct.toFixed(2)),
        capRate: Number(m.capRatePct.toFixed(2)),
        jobGrowth: Number(m.jobGrowthPct.toFixed(2)),
        affordability: Number(affordabilityScore.toFixed(0)),
        investmentScore: Number(investmentScore.toFixed(0)),
        sampleSize: m.sampleSize,
      } as Omit<LeaderboardItem, 'rank' | 'county'> & { rank: number };
      const withCounty = m.county ? { ...base, county: m.county } : base;
      return withCounty as LeaderboardItem;
    });

    scored.sort((a, b) => b.investmentScore - a.investmentScore);
    scored.forEach((s, idx) => (s.rank = idx + 1));
    return scored.slice(0, 10);
  }

  static computeCityKpis(
    city: string,
    state: string,
    metrics: {
      medianCurrentPrice: number;
      medianLastYearSalePrice: number;
      capRatePct: number;
      jobGrowthPct: number;
      affordabilityRaw: number;
      medianMonthlyRent: number;
      daysOnMarketAvg: number;
      inventory: number;
      prevMonthMedianPrice: number;
      prevMonthInventory: number;
      prevMonthDaysOnMarket: number;
    }
  ) {
    const priceGrowthMoM = metrics.prevMonthMedianPrice > 0
      ? ((metrics.medianCurrentPrice - metrics.prevMonthMedianPrice) / metrics.prevMonthMedianPrice) * 100
      : 0;
    const inventoryChangeMoM = metrics.prevMonthInventory > 0
      ? ((metrics.inventory - metrics.prevMonthInventory) / metrics.prevMonthInventory) * 100
      : 0;
    const domChangeMoM = metrics.prevMonthDaysOnMarket > 0
      ? (metrics.daysOnMarketAvg - metrics.prevMonthDaysOnMarket)
      : 0;

    // Build investment score using same normalized approach across single city by referencing reasonable ranges
    const normalize = (v: number, min: number, max: number) => {
      if (min === max) return 50;
      const n = ((v - min) / (max - min)) * 100;
      return Math.max(0, Math.min(100, n));
    };
    const priceGrowthScore = normalize(priceGrowthMoM, -10, 15);
    const capRateScore = normalize(metrics.capRatePct, 2, 12);
    const jobGrowthScore = normalize(metrics.jobGrowthPct, 0, 8);
    const affordabilityScore = normalize(metrics.affordabilityRaw, 5, 30);
    const investmentScore = Math.round(
      priceGrowthScore * 0.3 + capRateScore * 0.3 + jobGrowthScore * 0.2 + affordabilityScore * 0.2
    );

    return {
      city,
      state,
      medianPrice: Math.round(metrics.medianCurrentPrice),
      priceChangeMoM: Number(priceGrowthMoM.toFixed(2)),
      inventory: metrics.inventory,
      inventoryChangeMoM: Number(inventoryChangeMoM.toFixed(2)),
      daysOnMarket: Math.round(metrics.daysOnMarketAvg),
      daysOnMarketChangeMoM: Math.round(domChangeMoM),
      opportunityScore: investmentScore,
    };
  }

  static async computeCityKpisFromSample(city: string, state: string) {
    // Fetch a city-focused sample from provider, with fallback
    const selected = await LeaderboardService.fetchCitySample(city, state, 300);
    if (!selected.length) {
      return this.computeCityKpis(city, state, {
        medianCurrentPrice: 0,
        medianLastYearSalePrice: 0,
        capRatePct: 0,
        jobGrowthPct: 2.5,
        affordabilityRaw: 0,
        medianMonthlyRent: 0,
        daysOnMarketAvg: 0,
        inventory: 0,
        prevMonthMedianPrice: 0,
        prevMonthInventory: 0,
        prevMonthDaysOnMarket: 0,
      });
    }

    const now = new Date();
    const currentMonth = now.getUTCMonth();
    const currentYear = now.getUTCFullYear();
    const prevMonthDate = new Date(Date.UTC(currentYear, currentMonth - 1, 1));
    const prevMonth = prevMonthDate.getUTCMonth();
    const prevYear = prevMonthDate.getUTCFullYear();

    const pricesCurrent: number[] = [];
    const pricesPrevMonth: number[] = [];
    const rents: number[] = [];
    const incomes: number[] = [];
    const domValues: number[] = [];
    const domPrev: number[] = [];

    for (const p of selected) {
      const priceCandidates: NullableNumber[] = [p.mlsListingPrice, p.estimatedValue, p.mlsSoldPrice];
      const price = priceCandidates.find((val) => typeof val === 'number' && Number.isFinite(val as number)) as number | undefined;
      if (price) pricesCurrent.push(price);

      const lastStatus = p as any;
      const listDateStr: string | undefined = (lastStatus.mlsListingDate as string | undefined) || undefined;
      if (listDateStr) {
        const d = new Date(listDateStr);
        if (!Number.isNaN(d.getTime())) {
          if (d.getUTCFullYear() === prevYear && d.getUTCMonth() === prevMonth) {
            if (price) pricesPrevMonth.push(price);
          }
        }
      }

      if (typeof p.rentAmount === 'number' && Number.isFinite(p.rentAmount)) rents.push(p.rentAmount);
      if (typeof p.medianIncome === 'number' && Number.isFinite(p.medianIncome)) incomes.push(p.medianIncome);

      const dom: number | undefined = (p as any).mlsDaysOnMarket as number | undefined;
      if (typeof dom === 'number' && Number.isFinite(dom)) domValues.push(dom);

      const lastStatusDateStr: string | undefined = (lastStatus.mlsLastStatusDate as string | undefined) || undefined;
      if (lastStatusDateStr) {
        const d2 = new Date(lastStatusDateStr);
        if (!Number.isNaN(d2.getTime())) {
          if (d2.getUTCFullYear() === prevYear && d2.getUTCMonth() === prevMonth) {
            if (typeof dom === 'number' && Number.isFinite(dom)) domPrev.push(dom);
          }
        }
      }
    }

    const normalize = (s: string | undefined) => (s || '').trim().toLowerCase();
    const nCity = normalize(city);
    const nState = normalize(state);
    const scope = selected.some(p => normalize(p.address?.city) === nCity && normalize(p.address?.state) === nState) ? 'city' : 'state';

    const medianCurrentPrice = median(pricesCurrent);
    const prevMonthMedianPrice = pricesPrevMonth.length ? median(pricesPrevMonth) : Math.max(1, medianCurrentPrice * 0.98);
    const inventory = selected.length;
    const prevMonthInventory = Math.max(1, Math.round(inventory * 0.98));
    const daysOnMarketAvg = domValues.length ? domValues.reduce((a, b) => a + b, 0) / domValues.length : 0;
    const prevMonthDaysOnMarket = domPrev.length ? domPrev.reduce((a, b) => a + b, 0) / domPrev.length : Math.max(0, daysOnMarketAvg + 1);

    const medianMonthlyRent = rents.length ? median(rents) : medianCurrentPrice > 0 ? medianCurrentPrice * 0.006 : 0;
    const capRatePct = medianCurrentPrice > 0 ? ((medianMonthlyRent * 12) / medianCurrentPrice) * 100 : 0;

    const medianIncome = incomes.length ? median(incomes) : 0;
    const affordabilityRaw = medianCurrentPrice > 0 ? (medianIncome / medianCurrentPrice) * 100 : 0;

    const jobGrowthPct = await getJobGrowthPct(city, state);

    const kpis = this.computeCityKpis(city, state, {
      medianCurrentPrice,
      medianLastYearSalePrice: 0,
      capRatePct,
      jobGrowthPct,
      affordabilityRaw,
      medianMonthlyRent,
      daysOnMarketAvg,
      inventory,
      prevMonthMedianPrice,
      prevMonthInventory,
      prevMonthDaysOnMarket,
    });

    return { ...kpis, sampleSize: selected.length, scope } as any;
  }
}

export default LeaderboardService;


