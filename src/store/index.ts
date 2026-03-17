import { configureStore } from '@reduxjs/toolkit';
import auctionReducer from './slices/auctionSlice';
import tournamentReducer from './slices/tournamentSlice';
import scoringReducer from './slices/scoringSlice';

export const store = configureStore({
  reducer: {
    auction: auctionReducer,
    tournament: tournamentReducer,
    scoring: scoringReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
