import { apiClient } from '../../../api/axios';
import { ENDPOINTS } from '../../../api/endpoints';
import type { Lead, LeadFormData, LeadsFilters, PaginatedResponse } from '../types';

export const leadsApi = {
  getLeads: async (filters: LeadsFilters): Promise<PaginatedResponse<Lead>> => {
    const { data } = await apiClient.get(ENDPOINTS.LEADS.BASE, { params: filters });
    return data;
  },
  
  getLead: async (id: string): Promise<Lead> => {
    const { data } = await apiClient.get(`${ENDPOINTS.LEADS.BASE}/${id}`);
    return data.data;
  },

  createLead: async (lead: LeadFormData): Promise<Lead> => {
    const { data } = await apiClient.post(ENDPOINTS.LEADS.BASE, lead);
    return data.data;
  },

  updateLead: async (id: string, lead: Partial<LeadFormData>): Promise<Lead> => {
    const { data } = await apiClient.put(`${ENDPOINTS.LEADS.BASE}/${id}`, lead);
    return data.data;
  },

  deleteLead: async (id: string): Promise<void> => {
    await apiClient.delete(`${ENDPOINTS.LEADS.BASE}/${id}`);
  },

  exportLeads: async (filters: LeadsFilters): Promise<void> => {
    const response = await apiClient.get(ENDPOINTS.LEADS.EXPORT, {
      params: filters,
      responseType: 'blob',
    });
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `leads_export_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },
};
