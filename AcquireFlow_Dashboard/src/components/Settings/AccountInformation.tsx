import React, { useState, useEffect } from 'react';
import { User, Upload, MapPin, Globe, Download, Mail, Phone, Building, Trash2, Save, Loader2 } from 'lucide-react';
import { useProfile } from '../Context/ProfileContext';
import { profileService, ProfileData, CompleteProfileResponse } from '../../services/profileService';
import { useAuth } from '../Auth/AuthContext';
import { tokenUtils } from '../../utils/tokenUtils';

export const AccountInformation = () => {
  const {
    profileImage,
    setProfileImage
  } = useProfile();
  
  const { user } = useAuth();
  
  // Check if user is authenticated
  useEffect(() => {
    const token = tokenUtils.getValidToken();
    if (!token) {
      // Redirect to login if no token found
      return;
    }
  }, []);
  
  // State for form data
  const [formData, setFormData] = useState<ProfileData>({
    profileImage: '',
    jobTitle: '',
    preferredLanguage: 'English (US)',
    companyInfo: {
      companyName: '',
      businessType: '',
      companyWebsite: '',
      companySize: '1-10 employees',
      companyAddress: {
        addressLine1: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States'
      }
    },
    localization: {
      timezone: 'Eastern Time (ET)',
      dateFormat: 'MM/DD/YYYY',
      currency: 'US Dollar ($)'
    },
    contactPreferences: {
      marketingCommunications: true,
      productUpdates: true,
      marketResearch: false
    }
  });
  
  // State for user data
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Load profile data on component mount
  useEffect(() => {
    // First, try to load user data from localStorage (from login)
    const storedUserData = localStorage.getItem('acquireflow-user-data');
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData({
          firstName: parsedUserData.firstName || '',
          lastName: parsedUserData.lastName || '',
          email: parsedUserData.email || '',
          phoneNumber: ''
        });
      } catch (error) {
        console.error('Error parsing stored user data:', error);
      }
    } else if (user) {
      // Fallback to auth context user data
      const nameParts = user.name.split(' ');
      setUserData({
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: user.email || '',
        phoneNumber: ''
      });
    }
    
    // Then load profile data from API
    loadProfileData();
  }, [user]);
  
  // Debug: Monitor form data changes
  useEffect(() => {
    console.log('Form Data Updated:', formData);
  }, [formData]);
  
  const loadProfileData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const completeProfile = await profileService.getCompleteProfile();
      
      // Debug: Log the complete profile data
      console.log('Complete Profile Data:', completeProfile);
      
      if (completeProfile.data?.user) {
        setUserData({
          firstName: completeProfile.data.user.firstName || '',
          lastName: completeProfile.data.user.lastName || '',
          email: completeProfile.data.user.email || '',
          phoneNumber: completeProfile.data.user.phoneNumber || ''
        });
      } else {
        // Debug: Log what we have in completeProfile
        console.log('No user data found, completeProfile keys:', Object.keys(completeProfile));
        console.log('Data keys:', completeProfile.data ? Object.keys(completeProfile.data) : 'No data');
      }
      
      if (completeProfile.data?.profile) {
        const profile = completeProfile.data.profile;
        
        // Debug: Log the profile data structure
        console.log('Profile Data Structure:', profile);
        
        setFormData(prev => ({
          ...prev,
          profileImage: profile.profileImage || prev.profileImage,
          jobTitle: profile.jobTitle || prev.jobTitle,
          preferredLanguage: profile.preferredLanguage || prev.preferredLanguage,
          companyInfo: {
            companyName: profile.companyInfo?.companyName || (profile as any).companyName || prev.companyInfo?.companyName || '',
            businessType: profile.companyInfo?.businessType || prev.companyInfo?.businessType || '',
            companyWebsite: profile.companyInfo?.companyWebsite || (profile as any).companyWebsite || prev.companyInfo?.companyWebsite || '',
            companySize: profile.companyInfo?.companySize || (profile as any).companySize || prev.companyInfo?.companySize || '1-10 employees',
            companyAddress: {
              addressLine1: profile.companyInfo?.companyAddress?.addressLine1 || (profile as any).companyAddress?.addressLine1 || prev.companyInfo?.companyAddress?.addressLine1 || '',
              addressLine2: profile.companyInfo?.companyAddress?.addressLine2 || (profile as any).companyAddress?.addressLine2 || prev.companyInfo?.companyAddress?.addressLine2 || '',
              city: profile.companyInfo?.companyAddress?.city || (profile as any).companyAddress?.city || prev.companyInfo?.companyAddress?.city || '',
              state: profile.companyInfo?.companyAddress?.state || (profile as any).companyAddress?.state || prev.companyInfo?.companyAddress?.state || '',
              zipCode: profile.companyInfo?.companyAddress?.zipCode || (profile as any).companyAddress?.zipCode || prev.companyInfo?.companyAddress?.zipCode || '',
              country: profile.companyInfo?.companyAddress?.country || (profile as any).companyAddress?.country || prev.companyInfo?.companyAddress?.country || 'United States'
            },
            companyLogo: profile.companyInfo?.companyLogo || prev.companyInfo?.companyLogo || ''
          },
          localization: profile.localization ? {
            timezone: profile.localization.timezone || prev.localization?.timezone || 'Eastern Time (ET)',
            dateFormat: profile.localization.dateFormat || prev.localization?.dateFormat || 'MM/DD/YYYY',
            currency: profile.localization.currency || prev.localization?.currency || 'US Dollar ($)'
          } : prev.localization,
          contactPreferences: profile.contactPreferences ? {
            marketingCommunications: profile.contactPreferences.marketingCommunications ?? prev.contactPreferences?.marketingCommunications ?? true,
            productUpdates: profile.contactPreferences.productUpdates ?? prev.contactPreferences?.productUpdates ?? true,
            marketResearch: profile.contactPreferences.marketResearch ?? prev.contactPreferences?.marketResearch ?? false
          } : prev.contactPreferences
        }));
        
        // Update profile image if exists
        if (completeProfile.data.profile.profileImage) {
          setProfileImage(completeProfile.data.profile.profileImage);
        }
      }
    } catch (err: any) {
      console.error('Error loading profile data:', err);
      if (err.message.includes('access token') || err.message.includes('Session expired')) {
        // Don't show error for auth issues, just redirect
        return;
      }
      setError(err.message || 'Failed to load profile data');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleInputChange = (field: string, value: any, nestedField?: string) => {
    if (nestedField) {
      setFormData(prev => ({
        ...prev,
        [field]: {
          ...prev[field as keyof ProfileData],
          [nestedField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };
  
  const handleCompanyAddressChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      companyInfo: {
        ...prev.companyInfo,
        companyAddress: {
          addressLine1: prev.companyInfo?.companyAddress?.addressLine1 || '',
          addressLine2: prev.companyInfo?.companyAddress?.addressLine2 || '',
          city: prev.companyInfo?.companyAddress?.city || '',
          state: prev.companyInfo?.companyAddress?.state || '',
          zipCode: prev.companyInfo?.companyAddress?.zipCode || '',
          country: prev.companyInfo?.companyAddress?.country || 'United States',
          [field]: value
        }
      }
    }));
  };
  
  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);
      setSuccess(null);
      
      // Update profile image in form data
      const dataToSave = {
        ...formData,
        profileImage: profileImage || formData.profileImage
      };
      
      await profileService.upsertProfile(dataToSave);
      
      setSuccess('Profile saved successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save profile');
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-medium text-lg">Profile Information</h2>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 flex items-center"
          >
            {isSaving ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
        <div className="p-6">
          {/* Error and Success Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {success}
            </div>
          )}
          
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 size={24} className="animate-spin text-primary" />
              <span className="ml-2 text-gray-600">Loading profile data...</span>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Photo */}
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden relative group mb-4 border-4 border-white shadow">
                  {profileImage ? <img src={profileImage} alt="Profile" className="w-full h-full object-cover" /> : <User size={48} className="text-gray-400" />}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <label className="cursor-pointer text-white flex flex-col items-center">
                      <Upload size={20} className="mb-1" />
                      <span className="text-xs">Upload</span>
                      <input type="file" className="hidden" accept="image/*" onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          const imageUrl = URL.createObjectURL(e.target.files[0]);
                          setProfileImage(imageUrl);
                        }
                      }} />
                    </label>
                  </div>
                </div>
                <button className="text-sm text-red-500 flex items-center" onClick={() => setProfileImage(null)}>
                  <Trash2 size={14} className="mr-1" />
                  Remove
                </button>
              </div>
              {/* Profile Details */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-lg" 
                    value={userData.firstName}
                    onChange={(e) => setUserData(prev => ({ ...prev, firstName: e.target.value }))}
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-lg" 
                    value={userData.lastName}
                    onChange={(e) => setUserData(prev => ({ ...prev, lastName: e.target.value }))}
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    className="w-full p-2 border border-gray-300 rounded-lg" 
                    value={userData.email}
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    className="w-full p-2 border border-gray-300 rounded-lg" 
                    value={userData.phoneNumber}
                    onChange={(e) => setUserData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-lg" 
                    value={formData.jobTitle || ''}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  />
                  {/* Debug: Show current value */}
                  <div className="text-xs text-gray-500 mt-1">
                    Current value: "{formData.jobTitle || 'empty'}"
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Language
                  </label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={formData.preferredLanguage || 'English (US)'}
                    onChange={(e) => handleInputChange('preferredLanguage', e.target.value)}
                  >
                    <option value="English (US)">English (US)</option>
                    <option value="English (UK)">English (UK)</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Japanese">Japanese</option>
                  </select>
                  {/* Debug: Show current value */}
                  <div className="text-xs text-gray-500 mt-1">
                    Current value: "{formData.preferredLanguage || 'empty'}"
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Company Information */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200">
          <h2 className="font-medium text-lg">Company Information</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-lg" 
                value={formData.companyInfo?.companyName || ''}
                onChange={(e) => handleInputChange('companyInfo', e.target.value, 'companyName')}
              />
              {/* Debug: Show current value */}
              <div className="text-xs text-gray-500 mt-1">
                Current value: "{formData.companyInfo?.companyName || 'empty'}"
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Type
              </label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.companyInfo?.businessType || ''}
                onChange={(e) => handleInputChange('companyInfo', e.target.value, 'businessType')}
              >
                <option value="">Select Business Type</option>
                <option value="Real Estate Investment">Real Estate Investment</option>
                <option value="Property Management">Property Management</option>
                <option value="Real Estate Brokerage">Real Estate Brokerage</option>
                <option value="Wholesaling">Wholesaling</option>
                <option value="Other">Other</option>
              </select>
              {/* Debug: Show current value */}
              <div className="text-xs text-gray-500 mt-1">
                Current value: "{formData.companyInfo?.businessType || 'empty'}"
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Website
              </label>
              <div className="relative">
                <Globe size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="url" 
                  className="w-full pl-9 p-2 border border-gray-300 rounded-lg" 
                  value={formData.companyInfo?.companyWebsite || ''}
                  onChange={(e) => handleInputChange('companyInfo', e.target.value, 'companyWebsite')}
                  placeholder="https://example.com"
                />
              </div>
              {/* Debug: Show current value */}
              <div className="text-xs text-gray-500 mt-1">
                Current value: "{formData.companyInfo?.companyWebsite || 'empty'}"
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Size
              </label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.companyInfo?.companySize || '1-10 employees'}
                onChange={(e) => handleInputChange('companyInfo', e.target.value, 'companySize')}
              >
                <option value="1-10 employees">1-10 employees</option>
                <option value="11-50 employees">11-50 employees</option>
                <option value="51-200 employees">51-200 employees</option>
                <option value="201-500 employees">201-500 employees</option>
                <option value="500+ employees">500+ employees</option>
              </select>
              {/* Debug: Show current value */}
              <div className="text-xs text-gray-500 mt-1">
                Current value: "{formData.companyInfo?.companySize || 'empty'}"
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Address
              </label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-3 text-gray-400" />
                <input 
                  type="text" 
                  className="w-full pl-9 p-2 border border-gray-300 rounded-lg mb-2" 
                  placeholder="Street Address" 
                  value={formData.companyInfo?.companyAddress?.addressLine1 || ''}
                  onChange={(e) => handleCompanyAddressChange('addressLine1', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="text" 
                  className="p-2 border border-gray-300 rounded-lg" 
                  placeholder="City" 
                  value={formData.companyInfo?.companyAddress?.city || ''}
                  onChange={(e) => handleCompanyAddressChange('city', e.target.value)}
                />
                <div className="grid grid-cols-2 gap-2">
                  <select 
                    className="p-2 border border-gray-300 rounded-lg"
                    value={formData.companyInfo?.companyAddress?.state || ''}
                    onChange={(e) => handleCompanyAddressChange('state', e.target.value)}
                  >
                    <option value="">Select State</option>
                    <option value="Florida">Florida</option>
                    <option value="California">California</option>
                    <option value="Texas">Texas</option>
                    <option value="New York">New York</option>
                    <option value="Illinois">Illinois</option>
                  </select>
                  <input 
                    type="text" 
                    className="p-2 border border-gray-300 rounded-lg" 
                    placeholder="Zip Code" 
                    value={formData.companyInfo?.companyAddress?.zipCode || ''}
                    onChange={(e) => handleCompanyAddressChange('zipCode', e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Logo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <div className="w-full h-32 flex items-center justify-center">
                  <img src="/AcquireFlow_Logo_%281%29.svg" alt="Company Logo" className="h-full object-contain" />
                </div>
                <div className="mt-4 flex justify-center">
                  <label className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50">
                    <Upload size={16} className="inline mr-2" />
                    Upload New Logo
                    <input type="file" className="hidden" accept="image/*" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Localization & Preferences */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200">
          <h2 className="font-medium text-lg">Localization & Preferences</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Timezone
              </label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.localization?.timezone || 'Eastern Time (ET)'}
                onChange={(e) => handleInputChange('localization', e.target.value, 'timezone')}
              >
                <option value="Eastern Time (ET)">Eastern Time (ET)</option>
                <option value="Central Time (CT)">Central Time (CT)</option>
                <option value="Mountain Time (MT)">Mountain Time (MT)</option>
                <option value="Pacific Time (PT)">Pacific Time (PT)</option>
                <option value="Alaska Time (AKT)">Alaska Time (AKT)</option>
                <option value="Hawaii Time (HST)">Hawaii Time (HST)</option>
                <option value="UTC">UTC</option>
              </select>
              {/* Debug: Show current value */}
              <div className="text-xs text-gray-500 mt-1">
                Current value: "{formData.localization?.timezone || 'empty'}"
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1">
                Date Format
              </label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.localization?.dateFormat || 'MM/DD/YYYY'}
                onChange={(e) => handleInputChange('localization', e.target.value, 'dateFormat')}
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
              {/* Debug: Show current value */}
              <div className="text-xs text-gray-500 mt-1">
                Current value: "{formData.localization?.dateFormat || 'empty'}"
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Currency
              </label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.localization?.currency || 'US Dollar ($)'}
                onChange={(e) => handleInputChange('localization', e.target.value, 'currency')}
              >
                <option value="US Dollar ($)">US Dollar ($)</option>
                <option value="Euro (€)">Euro (€)</option>
                <option value="British Pound (£)">British Pound (£)</option>
                <option value="Canadian Dollar (C$)">Canadian Dollar (C$)</option>
                <option value="Australian Dollar (A$)">Australian Dollar (A$)</option>
              </select>
              {/* Debug: Show current value */}
              <div className="text-xs text-gray-500 mt-1">
                Current value: "{formData.localization?.currency || 'empty'}"
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Contact Preferences
            </h3>
            <div className="space-y-3">
              <label className="flex items-start">
                <input 
                  type="checkbox" 
                  className="mt-1 rounded text-primary focus:ring-primary" 
                  checked={formData.contactPreferences?.marketingCommunications ?? true}
                  onChange={(e) => handleInputChange('contactPreferences', e.target.checked, 'marketingCommunications')}
                />
                <span className="ml-2 text-sm">
                  <span className="font-medium block">
                    Marketing Communications
                  </span>
                  <span className="text-gray-500">
                    Receive updates about new features, industry news, and
                    investment opportunities
                  </span>
                </span>
              </label>
              {/* Debug: Show current value */}
              <div className="text-xs text-gray-500 ml-6">
                Current value: {formData.contactPreferences?.marketingCommunications ? 'true' : 'false'}
              </div>
              <label className="flex items-start">
                <input 
                  type="checkbox" 
                  className="mt-1 rounded text-primary focus:ring-primary" 
                  checked={formData.contactPreferences?.productUpdates ?? true}
                  onChange={(e) => handleInputChange('contactPreferences', e.target.checked, 'productUpdates')}
                />
                <span className="ml-2 text-sm">
                  <span className="font-medium block">Product Updates</span>
                  <span className="text-gray-500">
                    Receive notifications about platform updates and new
                    features
                  </span>
                </span>
              </label>
              <label className="flex items-start">
                <input 
                  type="checkbox" 
                  className="mt-1 rounded text-primary focus:ring-primary" 
                  checked={formData.contactPreferences?.marketResearch ?? false}
                  onChange={(e) => handleInputChange('contactPreferences', e.target.checked, 'marketResearch')}
                />
                <span className="ml-2 text-sm">
                  <span className="font-medium block">Market Research</span>
                  <span className="text-gray-500">
                    Participate in surveys and research to help improve our
                    services
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* Data Management */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200">
          <h2 className="font-medium text-lg">Data Management</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-sm mb-2 flex items-center">
                <Download size={16} className="mr-2 text-primary" />
                Export Your Data
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Download a copy of your data including contacts, deals, and
                account information
              </p>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                  <Download size={14} className="mr-2" />
                  Export All Data (JSON)
                </button>
                <button className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                  <Download size={14} className="mr-2" />
                  Export Contacts (CSV)
                </button>
                <button className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                  <Download size={14} className="mr-2" />
                  Export Deals (CSV)
                </button>
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="font-medium text-sm mb-2 flex items-center text-red-600">
                <Trash2 size={16} className="mr-2" />
                Delete Account
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Permanently delete your account and all associated data. This
                action cannot be undone.
              </p>
              <button className="px-4 py-2 bg-white border border-red-300 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50">
                Request Account Deletion
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};