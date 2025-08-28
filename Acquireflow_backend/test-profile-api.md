# Profile API Testing Guide

This document contains curl commands to test all the profile API endpoints.

## Prerequisites

1. **Backend server running** on `http://localhost:3000`
2. **Valid access token** from authentication (login/signup)
3. **User account** already created

## Authentication

First, you need to get an access token. Use one of these methods:

### Option 1: Login with existing user
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-email@example.com",
    "password": "your-password"
  }'
```

### Option 2: Sign up new user
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }'
```

**Save the `accessToken` from the response for use in subsequent requests.**

## Profile API Endpoints

### 1. Create Profile

```bash
curl -X POST http://localhost:3000/api/v1/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "profileImage": "https://example.com/profile.jpg",
    "jobTitle": "Real Estate Investor",
    "preferredLanguage": "English (US)",
    "companyInfo": {
      "companyName": "AcquireFlow Investments",
      "businessType": "Real Estate Investment",
      "companyWebsite": "https://acquireflow.ai",
      "companySize": "1-10 employees",
      "companyAddress": {
        "addressLine1": "123 Business Ave, Suite 200",
        "city": "Orlando",
        "state": "Florida",
        "zipCode": "32801",
        "country": "United States"
      },
      "companyLogo": "https://example.com/logo.png"
    },
    "localization": {
      "timezone": "Eastern Time (ET)",
      "dateFormat": "MM/DD/YYYY",
      "currency": "US Dollar ($)"
    },
    "contactPreferences": {
      "marketingCommunications": true,
      "productUpdates": true,
      "marketResearch": false
    }
  }'
```

### 2. Get Profile

```bash
curl -X GET http://localhost:3000/api/v1/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 3. Get Complete Profile (with user info)

```bash
curl -X GET http://localhost:3000/api/v1/profile/complete \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 4. Update Profile

```bash
curl -X PUT http://localhost:3000/api/v1/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "jobTitle": "Senior Real Estate Investor",
    "companyInfo": {
      "companySize": "11-50 employees"
    },
    "contactPreferences": {
      "marketResearch": true
    }
  }'
```

### 5. Upsert Profile (create if doesn't exist, update if it does)

```bash
curl -X POST http://localhost:3000/api/v1/profile/upsert \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "profileImage": "https://example.com/new-profile.jpg",
    "jobTitle": "Real Estate Investment Manager",
    "preferredLanguage": "English (US)",
    "companyInfo": {
      "companyName": "AcquireFlow Investments LLC",
      "businessType": "Real Estate Investment & Management",
      "companyWebsite": "https://acquireflow.ai",
      "companySize": "11-50 employees",
      "companyAddress": {
        "addressLine1": "456 Corporate Blvd, Floor 3",
        "city": "Miami",
        "state": "Florida",
        "zipCode": "33101",
        "country": "United States"
      }
    },
    "localization": {
      "timezone": "Eastern Time (ET)",
      "dateFormat": "MM/DD/YYYY",
      "currency": "US Dollar ($)"
    },
    "contactPreferences": {
      "marketingCommunications": true,
      "productUpdates": true,
      "marketResearch": true
    }
  }'
```

### 6. Delete Profile

```bash
curl -X DELETE http://localhost:3000/api/v1/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 7. Get All Profiles with Company Info (Admin)

```bash
curl -X GET http://localhost:3000/api/v1/profile/company-info \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 8. Search Profiles by Company Name

```bash
curl -X GET "http://localhost:3000/api/v1/profile/search/company?companyName=AcquireFlow" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Test Data Examples

### Minimal Profile Creation
```bash
curl -X POST http://localhost:3000/api/v1/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "jobTitle": "Real Estate Investor",
    "companyInfo": {
      "companyName": "My Investment Co",
      "businessType": "Real Estate",
      "companySize": "1-10 employees",
      "companyAddress": {
        "addressLine1": "123 Main St",
        "city": "Orlando",
        "state": "Florida",
        "zipCode": "32801"
      }
    }
  }'
```

### Profile with Only Basic Info
```bash
curl -X POST http://localhost:3000/api/v1/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "jobTitle": "Investor",
    "preferredLanguage": "English (US)"
  }'
```

## Expected Responses

### Successful Profile Creation (201)
```json
{
  "success": true,
  "message": "Profile created successfully",
  "data": {
    "_id": "profile_id_here",
    "userId": "user_id_here",
    "profileImage": "https://example.com/profile.jpg",
    "jobTitle": "Real Estate Investor",
    "preferredLanguage": "English (US)",
    "companyInfo": {
      "companyName": "AcquireFlow Investments",
      "businessType": "Real Estate Investment",
      "companyWebsite": "https://acquireflow.ai",
      "companySize": "1-10 employees",
      "companyAddress": {
        "addressLine1": "123 Business Ave, Suite 200",
        "city": "Orlando",
        "state": "Florida",
        "zipCode": "32801",
        "country": "United States"
      }
    },
    "localization": {
      "timezone": "Eastern Time (ET)",
      "dateFormat": "MM/DD/YYYY",
      "currency": "US Dollar ($)"
    },
    "contactPreferences": {
      "marketingCommunications": true,
      "productUpdates": true,
      "marketResearch": false
    },
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Successful Profile Update (200)
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "_id": "profile_id_here",
    "userId": "user_id_here",
    "jobTitle": "Senior Real Estate Investor",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

### Error Response (400/401/404/500)
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Testing Flow

1. **Login/Signup** to get access token
2. **Create profile** with full data
3. **Get profile** to verify creation
4. **Update profile** with partial data
5. **Get complete profile** to see user + profile data
6. **Test validation** with invalid data
7. **Test authentication** without token
8. **Clean up** by deleting profile

## Common Issues & Solutions

### 1. Authentication Error (401)
- Ensure you're using a valid access token
- Check that the token hasn't expired
- Verify the Authorization header format: `Bearer <token>`

### 2. Validation Error (400)
- Check required fields (companyName, businessType, companySize, address)
- Verify enum values (companySize, timezone, dateFormat, currency)
- Ensure proper data types (strings, booleans, objects)

### 3. Profile Not Found (404)
- Verify the user ID in the token
- Check if profile exists for the user
- Ensure you're authenticated with the correct user

### 4. Server Error (500)
- Check backend logs for detailed error information
- Verify database connection
- Check if all required services are running

## Environment Variables

Make sure these are set in your `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/acquireflow
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=3600
```

## Notes

- All profile endpoints require authentication
- Profile data is validated against schemas
- Company information is required for full profile creation
- Profile updates are partial (only specified fields are updated)
- The upsert endpoint is useful for first-time profile creation
- Company search is case-insensitive
- All timestamps are in ISO 8601 format