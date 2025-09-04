import { propertyService } from '../propertyService';

// Mock fetch
global.fetch = jest.fn();

describe('PropertyService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getFeaturedProperties', () => {
    it('should fetch featured properties successfully', async () => {
      const mockResponse = {
        live: true,
        input: {},
        data: [
          {
            id: '123',
            address: {
              address: '123 Main St',
              city: 'Orlando',
              state: 'FL',
              zip: '32801'
            },
            estimatedValue: 250000,
            bedrooms: 3,
            bathrooms: 2,
            squareFeet: 1500,
            latitude: 28.5383,
            longitude: -81.3792
          }
        ]
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await propertyService.getFeaturedProperties();

      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        'https://api.realestateapi.com/v2/PropertySearch',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      );
    });

    it('should handle API errors gracefully', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ message: 'Unauthorized' })
      });

      await expect(propertyService.getFeaturedProperties()).rejects.toThrow('Unauthorized');
    });
  });

  describe('searchProperties', () => {
    it('should search properties with filters', async () => {
      const mockResponse = {
        live: true,
        input: {},
        data: []
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const filters = {
        locations: ['Orlando, FL'],
        minPrice: 100000,
        maxPrice: 300000,
        propertyTypes: ['SFR']
      };

      await propertyService.searchProperties(filters);

      expect(fetch).toHaveBeenCalledWith(
        'https://api.realestateapi.com/v2/PropertySearch?locations=Orlando%2C%20FL&minPrice=100000&maxPrice=300000&propertyTypes=SFR',
        expect.any(Object)
      );
    });
  });
});
