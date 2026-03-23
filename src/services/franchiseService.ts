import api from './api';
import { Franchise, League, FRANCHISES, LEAGUES } from '../data/franchises';

export const franchiseService = {
  getAllFranchises: async (): Promise<Franchise[]> => {
    try {
      const response = await api.get('/franchises');
      return response.data.data;
    } catch (error) {
      return FRANCHISES;
    }
  },

  getAllLeagues: async (): Promise<League[]> => {
    try {
      const response = await api.get('/leagues');
      return response.data.data;
    } catch (error) {
      return LEAGUES;
    }
  },

  updateFranchise: async (id: string, franchiseData: Partial<Franchise>): Promise<Franchise | null> => {
    try {
      const response = await api.put(`/franchises/${id}`, franchiseData);
      return response.data.data;
    } catch (error) {
      return null;
    }
  },
};
