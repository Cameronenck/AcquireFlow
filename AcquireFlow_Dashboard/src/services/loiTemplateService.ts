import { tokenUtils } from '../utils/tokenUtils';

export interface LOITemplate {
  _id: string;
  userId: string;
  name: string;
  description: string;
  content: string;
  icon: string;
  isCustom: boolean;
  isDefault: boolean;
  category?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateTemplateRequest {
  name: string;
  description: string;
  content: string;
  icon?: string;
  category?: string;
  tags?: string[];
}

export interface UpdateTemplateRequest {
  name?: string;
  description?: string;
  content?: string;
  icon?: string;
  category?: string;
  tags?: string[];
}

export interface LOITemplateResponse {
  success: boolean;
  message: string;
  data?: LOITemplate | LOITemplate[];
}

class LOITemplateService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/v1/loi-templates`;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = tokenUtils.getAccessToken();
    
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Create a new LOI template
   */
  async createTemplate(templateData: CreateTemplateRequest): Promise<LOITemplate> {
    const response = await this.request<LOITemplateResponse>('', {
      method: 'POST',
      body: JSON.stringify(templateData),
    });

    if (response.success && response.data) {
      return response.data as LOITemplate;
    }
    throw new Error(response.message || 'Failed to create template');
  }

  /**
   * Get all templates for the current user
   */
  async getUserTemplates(): Promise<LOITemplate[]> {
    const response = await this.request<LOITemplateResponse>('');

    if (response.success && response.data) {
      return response.data as LOITemplate[];
    }
    throw new Error(response.message || 'Failed to fetch templates');
  }

  /**
   * Get a specific template by ID
   */
  async getTemplateById(templateId: string): Promise<LOITemplate> {
    const response = await this.request<LOITemplateResponse>(`/${templateId}`);

    if (response.success && response.data) {
      return response.data as LOITemplate;
    }
    throw new Error(response.message || 'Failed to fetch template');
  }

  /**
   * Update an existing template
   */
  async updateTemplate(templateId: string, updateData: UpdateTemplateRequest): Promise<LOITemplate> {
    const response = await this.request<LOITemplateResponse>(`/${templateId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });

    if (response.success && response.data) {
      return response.data as LOITemplate;
    }
    throw new Error(response.message || 'Failed to update template');
  }

  /**
   * Delete a template
   */
  async deleteTemplate(templateId: string): Promise<void> {
    const response = await this.request<LOITemplateResponse>(`/${templateId}`, {
      method: 'DELETE',
    });

    if (!response.success) {
      throw new Error(response.message || 'Failed to delete template');
    }
  }

  /**
   * Duplicate a template
   */
  async duplicateTemplate(templateId: string): Promise<LOITemplate> {
    const response = await this.request<LOITemplateResponse>(`/${templateId}/duplicate`, {
      method: 'POST',
    });

    if (response.success && response.data) {
      return response.data as LOITemplate;
    }
    throw new Error(response.message || 'Failed to duplicate template');
  }

  /**
   * Search templates
   */
  async searchTemplates(searchTerm: string): Promise<LOITemplate[]> {
    const response = await this.request<LOITemplateResponse>(`/search?q=${encodeURIComponent(searchTerm)}`);

    if (response.success && response.data) {
      return response.data as LOITemplate[];
    }
    throw new Error(response.message || 'Failed to search templates');
  }

  /**
   * Seed default templates for the current user
   */
  async seedDefaultTemplates(): Promise<void> {
    const response = await this.request<LOITemplateResponse>('/seed-defaults', {
      method: 'POST',
    });

    if (!response.success) {
      throw new Error(response.message || 'Failed to seed default templates');
    }
  }
}

export const loiTemplateService = new LOITemplateService();
