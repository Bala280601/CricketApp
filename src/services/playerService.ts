import { Player, PLAYERS } from '../data/players';

export const playerService = {
  getAllPlayers: async (): Promise<Player[]> => {
    // Returning local data directly as requested
    return PLAYERS;
  },

  createPlayer: async (playerData: Player): Promise<Player> => {
    // In local-only mode, we just return the data back
    // The state management (Redux) will handle the actual addition to the list
    return playerData;
  },

  getPlayerById: async (id: string): Promise<Player | undefined> => {
    return PLAYERS.find(p => p.id === id);
  },

  updatePlayer: async (id: string, playerData: Partial<Player>): Promise<Player | null> => {
    // Return null or the updated object; Redux handles the actual state change
    return null; 
  },
};
