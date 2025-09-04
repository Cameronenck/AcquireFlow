# Real Estate API Integration

## Overview
The DealFinder component has been updated to integrate with a real estate API for dynamic property data.

## Setup

### 1. Environment Variables
Add the following environment variables to your `.env` file:

```env
VITE_REAL_ESTATE_API_KEY=your_real_estate_api_key_here
```

### 2. API Configuration
The integration uses the **direct external API**:
- **Full URL**: `https://api.realestateapi.com/v2/PropertySearch`
- **Method**: GET
- **Authentication**: API Key (multiple formats supported)

### 3. Features
- **Real-time property search** based on filters
- **Fallback to mock data** when API is unavailable
- **Property transformation** to calculate investment metrics
- **Error handling** with user-friendly messages

## API Response Structure
The API returns property data with the following key fields:
- Property details (address, bedrooms, bathrooms, etc.)
- Financial information (estimated value, equity, etc.)
- Owner information (absentee owner, corporate owned, etc.)
- Location data (latitude, longitude)

## Investment Metrics Calculation
The system automatically calculates:
- **Cash Flow**: Monthly rental income minus expenses
- **Cap Rate**: Annual rental income divided by property value
- **ROI**: Return on investment based on price appreciation
- **Deal Score**: 0-100 score based on investment potential factors

## Fallback Behavior
When the API is unavailable or returns no results:
1. Shows error message to user
2. Falls back to generated mock data
3. Maintains full functionality with demo properties

## Usage
The DealFinder component will automatically:
1. Load featured properties on mount
2. Apply filters when user searches
3. Transform API data for UI display
4. Handle errors gracefully

## CORS Issues & Solutions

### Problem
The browser blocks requests to external APIs due to CORS (Cross-Origin Resource Sharing) policy.

### Solutions Implemented

#### 1. Direct API Integration (Current Approach)
- Makes direct requests to `https://api.realestateapi.com/v2/PropertySearch`
- **No proxy needed** - communicates directly with the external API
- **Multiple authentication methods** tried automatically
- **CORS handling** - may encounter browser restrictions

#### 2. Graceful Fallback
- Automatic detection of CORS errors
- Falls back to mock data when API is unavailable
- User-friendly error messages

#### 3. Production Considerations
- In production, you may need to:
  - Use a backend proxy server
  - Configure the API provider's CORS settings
  - Use a CORS proxy service

### Usage
1. **Development**: Run `npm run dev` - proxy handles CORS automatically
2. **Production**: Configure your server to proxy API requests or use backend integration

## Troubleshooting

### Common Issues

#### 404 Not Found Error
If you see `404 Not Found` for `/api/realestate/PropertySearch`:
1. **Check Proxy Configuration**: Ensure `vite.config.ts` has correct proxy setup
2. **Restart Dev Server**: Run `npm run dev` after changing vite.config.ts
3. **Verify API Key**: Check that `VITE_REAL_ESTATE_API_KEY` is set in your `.env` file
4. **Check Network Tab**: Look at the actual request being made in browser DevTools

#### API Key Issues
- API might expect different header format (`X-API-Key` vs `Authorization`)
- Some APIs require API key in query parameters instead of headers
- Verify your API key has the correct permissions

#### Debugging Steps
1. Open browser DevTools → Network tab
2. Look for requests to `/api/realestate/PropertySearch`
3. Check the request headers and response
4. Look at console logs for detailed error information

### Troubleshooting Checklist
- **CORS Error**: Restart dev server after updating vite.config.ts
- **API Key**: Ensure API key is valid and has proper permissions
- **Network**: Check network connectivity
- **Endpoint**: Verify API endpoint is accessible
- **Console**: Review browser console for detailed error messages
- **Proxy**: Ensure Vite dev server is running for proxy to work
- **Environment**: Make sure `.env` file is in the correct location and properly formatted
