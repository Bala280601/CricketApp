import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OverBall {
  type: 'run' | 'wicket' | 'noball' | 'wide' | 'extra';
  runs: number;
  isWicket: boolean;
  extraType?: 'wide' | 'noball' | 'byes' | 'legbyes';
}

export interface Innings {
  teamId: string;
  totalRuns: number;
  totalWickets: number;
  totalBalls: number;
  overs: OverBall[][]; // Balls grouped into overs
  currentOver: OverBall[];
}

interface ScoringState {
  matchId: string | null;
  innings: [Innings | null, Innings | null]; // First and second innings
  currentInningsIndex: 0 | 1;
  isMatchFinished: boolean;
  target?: number;
}

const initialState: ScoringState = {
  matchId: null,
  innings: [null, null],
  currentInningsIndex: 0,
  isMatchFinished: false,
};

const scoringSlice = createSlice({
  name: 'scoring',
  initialState,
  reducers: {
    initMatch(state, action: PayloadAction<{ matchId: string; homeTeamId: string; awayTeamId: string }>) {
      state.matchId = action.payload.matchId;
      state.innings = [
        {
          teamId: action.payload.homeTeamId,
          totalRuns: 0,
          totalWickets: 0,
          totalBalls: 0,
          overs: [],
          currentOver: [],
        },
        {
          teamId: action.payload.awayTeamId,
          totalRuns: 0,
          totalWickets: 0,
          totalBalls: 0,
          overs: [],
          currentOver: [],
        }
      ];
      state.currentInningsIndex = 0;
      state.isMatchFinished = false;
      state.target = undefined;
    },
    recordBall(state, action: PayloadAction<OverBall>) {
      const ball = action.payload;
      const innings = state.innings[state.currentInningsIndex];
      if (!innings || state.isMatchFinished) return;

      // Update basic stats
      innings.totalRuns += ball.runs;
      if (ball.type === 'wide' || ball.type === 'noball') {
        innings.totalRuns += 1; // Extra run for wide/noball
      }

      if (ball.isWicket) {
        innings.totalWickets += 1;
      }

      // Add ball to current over if it's a legal ball
      const isLegalBall = ball.type !== 'wide' && ball.type !== 'noball';
      if (isLegalBall) {
        innings.totalBalls += 1;
      }

      innings.currentOver.push(ball);

      // End over check
      if (isLegalBall && innings.totalBalls % 6 === 0) {
        innings.overs.push([...innings.currentOver]);
        innings.currentOver = [];
      }

      // Innings end check (all out or overs finished - simplified for now)
      // Assuming 5 overs per match for this demo
      const maxOvers = 5;
      const isAllOut = innings.totalWickets >= 10;
      const isOversFinished = innings.totalBalls >= maxOvers * 6;

      if (isAllOut || isOversFinished) {
        if (state.currentInningsIndex === 0) {
          state.currentInningsIndex = 1;
          state.target = innings.totalRuns + 1;
        } else {
          state.isMatchFinished = true;
        }
      }

      // Target chased check
      if (state.currentInningsIndex === 1 && state.target && innings.totalRuns >= state.target) {
        state.isMatchFinished = true;
      }
    },
    undoBall(state) {
        // Simple undo logic
        const innings = state.innings[state.currentInningsIndex];
        if (!innings) return;
        
        // This would require a more robust history tracking, 
        // for now we'll leave it as placeholder or implement later if needed.
    }
  },
});

export const { initMatch, recordBall, undoBall } = scoringSlice.actions;
export default scoringSlice.reducer;
