import api from './api';
import { Player, PLAYERS } from '../data/players';

export const playerService = {
  getAllPlayers: async (): Promise<Player[]> => {
    try {
      const response = await api.get('/players');
      return response.data.data;
    } catch (error) {
      console.log('Error fetching from backend, using local players data');
      return PLAYERS;
    }
  },

  createPlayer: async (playerData: Player): Promise<Player> => {
    try {
      const response = await api.post('/players', playerData);
      return response.data.data;
    } catch (error) {
      console.log('Error creating player on backend, using local mode');
      return playerData;
    }
  },

  getPlayerById: async (id: string): Promise<Player | undefined> => {
    try {
      const response = await api.get(`/players/${id}`);
      return response.data.data;
    } catch (error) {
      return PLAYERS.find(p => p.id === id);
    }
  },

  updatePlayer: async (id: string, playerData: Partial<Player>): Promise<Player | null> => {
    try {
      const response = await api.put(`/players/${id}`, playerData);
      return response.data.data;
    } catch (error) {
      return null;
    }
  },
};
