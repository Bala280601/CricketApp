import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  status: 'upcoming' | 'live' | 'completed';
  result?: string;
  homeScore?: string;
  awayScore?: string;
  matchType: 'regular' | 'playoff';
  matchTitle?: string;
  matchSubTitle?: string;
  winnerId?: string;
  loserId?: string;
}

export interface TeamStats {
  teamId: string;
  played: number;
  won: number;
  lost: number;
  tied: number;
  points: number;
  nrr: number;
}

interface TournamentState {
  matches: Match[];
  pointsTable: TeamStats[];
}

const initialState: TournamentState = {
  matches: [],
  pointsTable: [],
};

const tournamentSlice = createSlice({
  name: 'tournament',
  initialState,
  reducers: {
    generateSchedule(state, action: PayloadAction<{ teamIds: string[]; rounds: number }>) {
      const { teamIds, rounds } = action.payload;
      const matches: Match[] = [];
      let matchId = 1;

      for (let r = 0; r < rounds; r++) {
        for (let i = 0; i < teamIds.length; i++) {
          for (let j = i + 1; j < teamIds.length; j++) {
            matches.push({
              id: `m${matchId++}`,
              homeTeamId: teamIds[i],
              awayTeamId: teamIds[j],
              status: 'upcoming',
              matchType: 'regular',
            });
          }
        }
      }
      state.matches = matches.sort(() => Math.random() - 0.5);
      state.pointsTable = teamIds.map(id => ({
        teamId: id,
        played: 0,
        won: 0,
        lost: 0,
        tied: 0,
        points: 0,
        nrr: 0,
      }));
    },
    generatePlayoffs(state) {
      const sortedTeams = [...state.pointsTable].sort((a, b) => b.points - a.points || b.nrr - a.nrr);
      const playoffMatches: Match[] = [];
      let baseId = state.matches.length + 1;

      if (sortedTeams.length === 3) {
        // Semi Final: 2nd vs 3rd
        playoffMatches.push({
          id: `p${baseId++}`,
          homeTeamId: sortedTeams[1].teamId,
          awayTeamId: sortedTeams[2].teamId,
          status: 'upcoming',
          matchType: 'playoff',
          matchTitle: 'Semi Final',
          matchSubTitle: 'Points Table 2nd vs 3rd',
        });
      } else if (sortedTeams.length >= 4) {
        // Semi Final 1: 1st vs 2nd
        playoffMatches.push({
          id: `p${baseId++}`,
          homeTeamId: sortedTeams[0].teamId,
          awayTeamId: sortedTeams[1].teamId,
          status: 'upcoming',
          matchType: 'playoff',
          matchTitle: 'Semi Final 1',
          matchSubTitle: 'Points Table 1st vs 2nd',
        });
        // Eliminator: 3rd vs 4th
        playoffMatches.push({
          id: `p${baseId++}`,
          homeTeamId: sortedTeams[2].teamId,
          awayTeamId: sortedTeams[3].teamId,
          status: 'upcoming',
          matchType: 'playoff',
          matchTitle: 'Eliminator',
          matchSubTitle: 'Points Table 3rd vs 4th',
        });
      }
      state.matches = [...state.matches, ...playoffMatches];
    },
    updateMatchResult(state, action: PayloadAction<{ matchId: string; winnerId: string | 'draw'; homeScore: string; awayScore: string }>) {
      const { matchId, winnerId, homeScore, awayScore } = action.payload;
      const match = state.matches.find(m => m.id === matchId);
      if (!match) return;

      match.status = 'completed';
      match.homeScore = homeScore;
      match.awayScore = awayScore;
      match.result = winnerId === 'draw' ? 'Draw' : `Winner: ${winnerId}`;
      match.winnerId = winnerId === 'draw' ? undefined : winnerId;
      match.loserId = winnerId === 'draw' ? undefined : (winnerId === match.homeTeamId ? match.awayTeamId : match.homeTeamId);

      if (match.matchType === 'regular') {
        // Update Points Table
        const homeStats = state.pointsTable.find(t => t.teamId === match.homeTeamId);
        const awayStats = state.pointsTable.find(t => t.teamId === match.awayTeamId);

        if (homeStats && awayStats) {
          homeStats.played += 1;
          awayStats.played += 1;
          if (winnerId === 'draw') {
            homeStats.tied += 1; awayStats.tied += 1;
            homeStats.points += 1; awayStats.points += 1;
          } else if (winnerId === match.homeTeamId) {
            homeStats.won += 1; homeStats.points += 2; awayStats.lost += 1;
          } else {
            awayStats.won += 1; awayStats.points += 2; homeStats.lost += 1;
          }
        }
      } else {
        // Playoff progression logic
        const sortedTeams = [...state.pointsTable].sort((a, b) => b.points - a.points || b.nrr - a.nrr);
        const nextId = `p${state.matches.length + 1}`;

        if (sortedTeams.length === 3) {
          if (match.matchTitle === 'Semi Final' && match.winnerId) {
            state.matches.push({
              id: nextId,
              homeTeamId: sortedTeams[0].teamId, // 1st Place
              awayTeamId: match.winnerId, // SF Winner
              status: 'upcoming',
              matchType: 'playoff',
              matchTitle: 'Final',
              matchSubTitle: `Points Table 1st vs Semi Final Winner`,
            });
          }
        } else if (sortedTeams.length >= 4) {
          const sf1 = state.matches.find(m => m.matchTitle === 'Semi Final 1');
          const elim = state.matches.find(m => m.matchTitle === 'Eliminator');

          if (match.matchTitle === 'Semi Final 1' || match.matchTitle === 'Eliminator') {
            if (sf1?.status === 'completed' && elim?.status === 'completed') {
              state.matches.push({
                id: nextId,
                homeTeamId: sf1.loserId!,
                awayTeamId: elim.winnerId!,
                status: 'upcoming',
                matchType: 'playoff',
                matchTitle: 'Semi Final 2',
                matchSubTitle: `Semi Final 1 Loser vs Eliminator Winner`,
              });
            }
          } else if (match.matchTitle === 'Semi Final 2' && match.winnerId) {
            state.matches.push({
              id: `p${state.matches.length + 1}`,
              homeTeamId: sf1!.winnerId!,
              awayTeamId: match.winnerId,
              status: 'upcoming',
              matchType: 'playoff',
              matchTitle: 'Final',
              matchSubTitle: `Semi Final 1 Winner vs Semi Final 2 Winner`,
            });
          }
        }
      }
    },
    resetTournament(state) {
      state.matches = [];
      state.pointsTable = [];
    }
  },
});

export const { generateSchedule, generatePlayoffs, updateMatchResult, resetTournament } = tournamentSlice.actions;
export default tournamentSlice.reducer;
