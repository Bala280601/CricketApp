import { Franchise, League, FRANCHISES, LEAGUES } from '../data/franchises';

export const franchiseService = {
  getAllFranchises: async (): Promise<Franchise[]> => {
    // Returning local data directly as requested
    return FRANCHISES;
  },

  getAllLeagues: async (): Promise<League[]> => {
    return LEAGUES;
  },

  updateFranchise: async (id: string, franchiseData: Partial<Franchise>): Promise<Franchise | null> => {
    // Redux handles the state, so we just return null or the ID
    return null;
  },
};
