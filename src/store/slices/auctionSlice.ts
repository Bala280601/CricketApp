import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Player } from '../../data/players';
import { Franchise, FRANCHISES } from '../../data/franchises';
import PLAYERS from '../../data/players';

export type AuctionStatus = 'idle' | 'bidding' | 'sold' | 'unsold' | 'rtm';
export type MatchFormat = 'T10' | 'T20' | 'ODI' | 'TEST';

interface AuctionState {
  franchises: Franchise[];
  players: Player[];
  currentPlayerIndex: number;
  currentBid: number;
  currentBidderFranchiseId: string | null;
  auctionStatus: AuctionStatus;
  soldPlayers: Player[];
  unsoldPlayers: Player[];
  auctionLog: { message: string; time: string; type: 'bid' | 'sold' | 'unsold' | 'rtm' | 'info' }[];
  selectedFormat: MatchFormat;
  rtmUsedBy: string[];  // franchise IDs that used RTM
  isAuctionStarted: boolean;
  isAuctionComplete: boolean;
  selectedLeagueId: string;
}

const safePlayers = (PLAYERS || []).filter(p => p && p.leagueIds && p.leagueIds.includes('ipl'));
const safeFranchises = (FRANCHISES || []).filter(f => f && f.leagueId === 'ipl');

const initialState: AuctionState = {
  franchises: safeFranchises,
  players: safePlayers.map(p => ({ ...p, isSold: false })),
  currentPlayerIndex: 0,
  currentBid: 0,
  currentBidderFranchiseId: null,
  auctionStatus: 'idle',
  soldPlayers: [],
  unsoldPlayers: [],
  auctionLog: [],
  selectedFormat: 'T20',
  rtmUsedBy: [],
  isAuctionStarted: false,
  isAuctionComplete: false,
  selectedLeagueId: 'ipl',
};

const timeStr = () => new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

const auctionSlice = createSlice({
  name: 'auction',
  initialState,
  reducers: {
    startAuction(state) {
      if (!state.players || state.players.length === 0) {
        state.auctionLog.push({ message: '⚠️ No players found for this league!', time: timeStr(), type: 'info' });
        return;
      }
      state.isAuctionStarted = true;
      state.auctionStatus = 'bidding';
      state.currentBid = state.players[0].basePrice || 0;
      state.auctionLog.push({ message: '🚀 Auction has started!', time: timeStr(), type: 'info' });
    },
    placeBid(state, action: PayloadAction<{ franchiseId: string; bidAmount: number }>) {
      const { franchiseId, bidAmount } = action.payload;
      const franchise = state.franchises.find(f => f.id === franchiseId);
      if (!franchise) return;

      if (state.currentBidderFranchiseId === franchiseId) return;

      const isFirstBid = state.currentBidderFranchiseId === null;
      if (isFirstBid) {
        if (bidAmount < state.currentBid) return;
      } else {
        if (bidAmount <= state.currentBid) return;
      }

      if (franchise.purse < bidAmount) return;
      state.currentBid = bidAmount;
      state.currentBidderFranchiseId = franchiseId;
      state.auctionStatus = 'bidding';
      state.auctionLog.unshift({
        message: `💰 ${franchise.shortName} bid ₹${bidAmount}L for ${state.players[state.currentPlayerIndex]?.name}`,
        time: timeStr(),
        type: 'bid',
      });
    },
    sellPlayer(state) {
      const player = state.players[state.currentPlayerIndex];
      if (!player || !state.currentBidderFranchiseId) return;
      const franchiseIdx = state.franchises.findIndex(f => f.id === state.currentBidderFranchiseId);
      if (franchiseIdx < 0) return;
      const franchise = state.franchises[franchiseIdx];
      if (franchise.purse < state.currentBid) return;

      state.franchises[franchiseIdx].purse -= state.currentBid;
      state.franchises[franchiseIdx].playerIds.push(player.id);

      state.players[state.currentPlayerIndex] = {
        ...player,
        isSold: true,
        soldTo: state.currentBidderFranchiseId,
        soldPrice: state.currentBid,
        teamId: state.currentBidderFranchiseId,
      };

      state.soldPlayers.push(state.players[state.currentPlayerIndex]);
      state.auctionStatus = 'sold';
      state.auctionLog.unshift({
        message: `✅ SOLD! ${player.name} → ${franchise.name} for ₹${state.currentBid}L`,
        time: timeStr(),
        type: 'sold',
      });
    },
    markUnsold(state) {
      const player = state.players[state.currentPlayerIndex];
      if (!player) return;
      state.players[state.currentPlayerIndex] = { ...player, isSold: false };
      state.unsoldPlayers.push(player);
      state.auctionStatus = 'unsold';
      state.auctionLog.unshift({
        message: `❌ UNSOLD: ${player.name} — No bids`,
        time: timeStr(),
        type: 'unsold',
      });
    },
    useRTM(state, action: PayloadAction<{ franchiseId: string }>) {
      const { franchiseId } = action.payload;
      const player = state.players[state.currentPlayerIndex];
      if (!player || state.rtmUsedBy.includes(franchiseId)) return;
      const franchise = state.franchises.find(f => f.id === franchiseId);
      if (!franchise || franchise.purse < state.currentBid) return;
      state.rtmUsedBy.push(franchiseId);
      state.auctionStatus = 'rtm';
      state.auctionLog.unshift({
        message: `🔄 RTM Used! ${franchise.shortName} matches ₹${state.currentBid}L for ${player.name}`,
        time: timeStr(),
        type: 'rtm',
      });
    },
    nextPlayer(state) {
      const nextIdx = state.currentPlayerIndex + 1;
      if (nextIdx >= state.players.length) {
        state.isAuctionComplete = true;
        state.auctionStatus = 'idle';
        state.auctionLog.unshift({ message: '🏆 Auction Complete! All players processed.', time: timeStr(), type: 'info' });
        return;
      }
      state.currentPlayerIndex = nextIdx;
      state.currentBid = state.players[nextIdx]?.basePrice || 0;
      state.currentBidderFranchiseId = null;
      state.auctionStatus = 'bidding';
      state.auctionLog.unshift({
        message: `📢 Next up: ${state.players[nextIdx]?.name} (Base: ₹${state.players[nextIdx]?.basePrice}L)`,
        time: timeStr(),
        type: 'info',
      });
    },
    resetAuction(state) {
      const lid = state.selectedLeagueId;
      Object.assign(state, initialState);
      state.selectedLeagueId = lid;
      state.players = (PLAYERS || []).filter(p => p && p.leagueIds && p.leagueIds.includes(lid)).map(p => ({ ...p, isSold: false }));
      state.franchises = (FRANCHISES || []).filter(f => f && f.leagueId === lid).map(f => ({ ...f, playerIds: [], purse: 1000 }));
    },
    setLeague(state, action: PayloadAction<string>) {
      const lid = action.payload;
      state.selectedLeagueId = lid;
      state.isAuctionStarted = false;
      state.isAuctionComplete = false;
      state.currentPlayerIndex = 0;
      state.currentBid = 0;
      state.currentBidderFranchiseId = null;
      state.auctionStatus = 'idle';
      state.soldPlayers = [];
      state.unsoldPlayers = [];
      state.auctionLog = [{ message: `🏟️ League switched to ${lid.toUpperCase()}`, time: timeStr(), type: 'info' }];
      state.franchises = (FRANCHISES || []).filter(f => f && f.leagueId === lid).map(f => ({ ...f, playerIds: [], purse: 1000 }));
      state.players = (PLAYERS || []).filter(p => p && p.leagueIds && p.leagueIds.includes(lid)).map(p => ({ ...p, isSold: false }));
    },
    timerExpired(state) {
      const player = state.players[state.currentPlayerIndex];
      if (!player) return;
      if (state.currentBidderFranchiseId) {
        const franchiseIdx = state.franchises.findIndex(f => f.id === state.currentBidderFranchiseId);
        if (franchiseIdx < 0) return;
        const franchise = state.franchises[franchiseIdx];
        if (franchise.purse < state.currentBid) return;
        state.franchises[franchiseIdx].purse -= state.currentBid;
        state.franchises[franchiseIdx].playerIds.push(player.id);
        state.players[state.currentPlayerIndex] = {
          ...player, isSold: true,
          soldTo: state.currentBidderFranchiseId,
          soldPrice: state.currentBid,
          teamId: state.currentBidderFranchiseId,
        };
        state.soldPlayers.push(state.players[state.currentPlayerIndex]);
        state.auctionStatus = 'sold';
        state.auctionLog.unshift({
          message: `⏱️ AUTO-SOLD! ${player.name} → ${franchise.name} for ₹${state.currentBid}L`,
          time: timeStr(), type: 'sold',
        });
      } else {
        state.players[state.currentPlayerIndex] = { ...player, isSold: false };
        state.unsoldPlayers.push(player);
        state.auctionStatus = 'unsold';
        state.auctionLog.unshift({
          message: `⏱️ AUTO-UNSOLD: ${player.name} — No bids received`,
          time: timeStr(), type: 'unsold',
        });
      }
    },
    setFormat(state, action: PayloadAction<MatchFormat>) {
      state.selectedFormat = action.payload;
    },
    initializeAuction(state, action: PayloadAction<{ players: Player[]; franchises: Franchise[] }>) {
      const { players, franchises } = action.payload;
      state.players = (players || []).map(p => ({ ...p, isSold: false }));
      state.franchises = franchises || [];
      state.soldPlayers = [];
      state.unsoldPlayers = [];
      state.isAuctionStarted = false;
      state.isAuctionComplete = false;
      state.currentPlayerIndex = 0;
      state.auctionStatus = 'idle';
    },
    addPlayerLocally(state, action: PayloadAction<Player>) {
      state.players.push({ ...action.payload, isSold: false });
      state.auctionLog.unshift({ 
        message: `🆕 New Player Scouted: ${action.payload.name}`, 
        time: timeStr(), 
        type: 'info' 
      });
    },
  },
});

export const {
  startAuction, placeBid, sellPlayer, markUnsold,
  useRTM, nextPlayer, resetAuction, setLeague, setFormat, timerExpired,
  initializeAuction, addPlayerLocally,
} = auctionSlice.actions;

export default auctionSlice.reducer;
