export type PlayerTier = 'GOLD' | 'SILVER' | 'BRONZE';
export type PlayerRole = 'Batsman' | 'Bowler' | 'All-Rounder' | 'Wicket-Keeper';
export type BowlingStyle = 'Right-arm Fast' | 'Left-arm Fast' | 'Right-arm Medium' | 'Right-arm Off-spin' | 'Left-arm Spin' | 'Leg-spin' | 'N/A';

export interface FormatStats {
  matches: number;
  runs?: number;
  average?: number;
  strikeRate?: number;
  fifties?: number;
  hundreds?: number;
  fours?: number;
  sixes?: number;
  wickets?: number;
  economy?: number;
  bowlingAverage?: number;
  bestFigures?: string;
  fiveWickets?: number;
}

export interface Player {
  id: string;
  leagueIds: string[];
  name: string;
  country: string;
  age: number;
  role: PlayerRole;
  tier: PlayerTier;
  basePrice: number;
  profileColor: string;
  nationality: 'Indian' | 'Overseas';
  batting: { t10: FormatStats; t20: FormatStats; odi: FormatStats; test: FormatStats };
  bowling: { style: BowlingStyle; paceKmh?: number; t10: FormatStats; t20: FormatStats; odi: FormatStats; test: FormatStats };
  fielding: { catches: number; runOuts: number; agility: number };
  speciality: string[];
  isSold?: boolean;
  soldTo?: string;
  soldPrice?: number;
  teamId?: string;
}

const s = (m:number,r:number,avg:number,sr:number): FormatStats => ({ matches: m, runs: r, average: avg, strikeRate: sr });
const b = (m:number,w:number,eco:number): FormatStats => ({ matches: m, wickets: w, economy: eco });
const n = (): FormatStats => ({ matches: 0 });

export const PLAYERS: Player[] = [
  // --- CSK (f001) ---
  { id: 'csk01', leagueIds: ['ipl'], name: 'Ruturaj Gaikwad', country: 'India', age: 27, role: 'Batsman', tier: 'GOLD', basePrice: 200, profileColor: '#FDB913', nationality: 'Indian', speciality: ['Elegant Opener', 'Captain'], batting: { t10: n(), t20: s(120, 4200, 39, 138), odi: s(10, 350, 35, 95), test: n() }, bowling: { style: 'N/A', t10: n(), t20: n(), odi: n(), test: n() }, fielding: { catches: 65, runOuts: 5, agility: 9 } },
  { id: 'csk02', leagueIds: ['ipl'], name: 'MS Dhoni', country: 'India', age: 42, role: 'Wicket-Keeper', tier: 'GOLD', basePrice: 200, profileColor: '#FDB913', nationality: 'Indian', speciality: ['Finisher', 'Legendary Keeper'], batting: { t10: n(), t20: s(350, 7200, 38, 140), odi: s(350, 10773, 50.6, 87), test: n() }, bowling: { style: 'N/A', t10: n(), t20: n(), odi: n(), test: n() }, fielding: { catches: 450, runOuts: 120, agility: 7 } },
  { id: 'csk03', leagueIds: ['ipl'], name: 'Ravindra Jadeja', country: 'India', age: 35, role: 'All-Rounder', tier: 'GOLD', basePrice: 200, profileColor: '#FDB913', nationality: 'Indian', speciality: ['Gun Fielder', 'Spin Wizard'], batting: { t10: n(), t20: s(250, 3500, 26, 128), odi: s(190, 2700, 32, 85), test: n() }, bowling: { style: 'Left-arm Spin', t10: n(), t20: b(250, 200, 7.5), odi: b(190, 210, 4.9), test: n() }, fielding: { catches: 150, runOuts: 35, agility: 10 } },
  { id: 'csk04', leagueIds: ['ipl'], name: 'Matheesha Pathirana', country: 'Sri Lanka', age: 21, role: 'Bowler', tier: 'GOLD', basePrice: 200, profileColor: '#FDB913', nationality: 'Overseas', speciality: ['Slingy Action', 'Death Overs'], batting: { t10: n(), t20: s(40, 50, 5, 110), odi: n(), test: n() }, bowling: { style: 'Left-arm Fast', paceKmh: 148, t10: n(), t20: b(45, 62, 7.8), odi: n(), test: n() }, fielding: { catches: 10, runOuts: 2, agility: 8 } },
  { id: 'csk05', leagueIds: ['ipl'], name: 'Shivam Dube', country: 'India', age: 30, role: 'All-Rounder', tier: 'GOLD', basePrice: 200, profileColor: '#FDB913', nationality: 'Indian', speciality: ['Spin Basher', 'Medium Pace'], batting: { t10: n(), t20: s(100, 2100, 31, 142), odi: n(), test: n() }, bowling: { style: 'Right-arm Medium', t10: n(), t20: b(100, 25, 9.2), odi: n(), test: n() }, fielding: { catches: 20, runOuts: 3, agility: 6 } },
  // ... (More players needed to reach 25 per team)
  
  // --- MI (f002) ---
  { id: 'mi01', leagueIds: ['ipl'], name: 'Rohit Sharma', country: 'India', age: 37, role: 'Batsman', tier: 'GOLD', basePrice: 200, profileColor: '#004BA0', nationality: 'Indian', speciality: ['Hitman', 'Pull Shot Specialist'], batting: { t10: n(), t20: s(420, 11000, 30, 140), odi: s(262, 10709, 49, 92), test: n() }, bowling: { style: 'N/A', t10: n(), t20: n(), odi: n(), test: n() }, fielding: { catches: 200, runOuts: 15, agility: 7 } },
  { id: 'mi02', leagueIds: ['ipl'], name: 'Hardik Pandya', country: 'India', age: 30, role: 'All-Rounder', tier: 'GOLD', basePrice: 200, profileColor: '#004BA0', nationality: 'Indian', speciality: ['Power Hitter', 'Clutch Bowler'], batting: { t10: n(), t20: s(250, 4800, 28, 145), odi: s(86, 1700, 34, 110), test: n() }, bowling: { style: 'Right-arm Fast', paceKmh: 142, t10: n(), t20: b(250, 160, 8.2), odi: b(86, 84, 5.6), test: n() }, fielding: { catches: 110, runOuts: 18, agility: 9 } },
  { id: 'mi03', leagueIds: ['ipl'], name: 'Jasprit Bumrah', country: 'India', age: 30, role: 'Bowler', tier: 'GOLD', basePrice: 200, profileColor: '#004BA0', nationality: 'Indian', speciality: ['Yorker King', 'Economy Beast'], batting: { t10: n(), t20: s(180, 150, 10, 105), odi: n(), test: n() }, bowling: { style: 'Right-arm Fast', paceKmh: 150, t10: n(), t20: b(210, 260, 6.7), odi: b(89, 149, 4.6), test: n() }, fielding: { catches: 45, runOuts: 10, agility: 8 } },
  { id: 'mi04', leagueIds: ['ipl'], name: 'Suryakumar Yadav', country: 'India', age: 33, role: 'Batsman', tier: 'GOLD', basePrice: 200, profileColor: '#004BA0', nationality: 'Indian', speciality: ['360 Player', 'T20 Master'], batting: { t10: n(), t20: s(270, 7500, 35, 172), odi: n(), test: n() }, bowling: { style: 'N/A', t10: n(), t20: n(), odi: n(), test: n() }, fielding: { catches: 95, runOuts: 8, agility: 9 } },
  { id: 'mi05', leagueIds: ['ipl'], name: 'Ishan Kishan', country: 'India', age: 25, role: 'Wicket-Keeper', tier: 'GOLD', basePrice: 200, profileColor: '#004BA0', nationality: 'Indian', speciality: ['Pocket Dynamo', 'Aggressive Opener'], batting: { t10: n(), t20: s(160, 4200, 29, 135), odi: s(27, 933, 42, 102), test: n() }, bowling: { style: 'N/A', t10: n(), t20: n(), odi: n(), test: n() }, fielding: { catches: 80, runOuts: 12, agility: 9 } },

  // --- RCB (f004) ---
  { id: 'rcb01', leagueIds: ['ipl'], name: 'Virat Kohli', country: 'India', age: 35, role: 'Batsman', tier: 'GOLD', basePrice: 200, profileColor: '#DB0007', nationality: 'Indian', speciality: ['Run Machine', 'Chase Master'], batting: { t10: n(), t20: s(380, 12000, 41, 137), odi: s(292, 13848, 58, 93), test: n() }, bowling: { style: 'N/A', t10: n(), t20: n(), odi: n(), test: n() }, fielding: { catches: 310, runOuts: 42, agility: 9 } },
  { id: 'rcb02', leagueIds: ['ipl'], name: 'Glenn Maxwell', country: 'Australia', age: 35, role: 'All-Rounder', tier: 'GOLD', basePrice: 200, profileColor: '#DB0007', nationality: 'Overseas', speciality: ['The Big Show', 'Switch Hit'], batting: { t10: n(), t20: s(340, 9200, 28, 154), odi: s(130, 3800, 35, 126), test: n() }, bowling: { style: 'Right-arm Off-spin', t10: n(), t20: b(340, 160, 7.9), odi: b(130, 68, 5.5), test: n() }, fielding: { catches: 140, runOuts: 22, agility: 9 } },
  { id: 'rcb03', leagueIds: ['ipl'], name: 'Mohammed Siraj', country: 'India', age: 30, role: 'Bowler', tier: 'GOLD', basePrice: 200, profileColor: '#DB0007', nationality: 'Indian', speciality: ['Swing King', 'Test Tenacity'], batting: { t10: n(), t20: s(120, 80, 5, 95), odi: n(), test: n() }, bowling: { style: 'Right-arm Fast', paceKmh: 145, t10: n(), t20: b(140, 165, 8.4), odi: b(41, 68, 4.8), test: n() }, fielding: { catches: 25, runOuts: 4, agility: 8 } },

  // --- KKR (f003) ---
  { id: 'kkr01', leagueIds: ['ipl'], name: 'Shreyas Iyer', country: 'India', age: 29, role: 'Batsman', tier: 'GOLD', basePrice: 200, profileColor: '#3A225D', nationality: 'Indian', speciality: ['Elegant Mid-Order', 'Captain'], batting: { t10: n(), t20: s(190, 5500, 32, 132), odi: s(59, 2383, 49, 101), test: n() }, bowling: { style: 'N/A', t10: n(), t20: n(), odi: n(), test: n() }, fielding: { catches: 85, runOuts: 9, agility: 8 } },
  { id: 'kkr02', leagueIds: ['ipl'], name: 'Andre Russell', country: 'West Indies', age: 36, role: 'All-Rounder', tier: 'GOLD', basePrice: 200, profileColor: '#3A225D', nationality: 'Overseas', speciality: ['Muscle Power', 'Death Bowler'], batting: { t10: n(), t20: s(480, 8200, 27, 168), odi: n(), test: n() }, bowling: { style: 'Right-arm Fast', paceKmh: 144, t10: n(), t20: b(480, 410, 8.5), odi: n(), test: n() }, fielding: { catches: 180, runOuts: 14, agility: 8 } },
  { id: 'kkr03', leagueIds: ['ipl'], name: 'Sunil Narine', country: 'West Indies', age: 36, role: 'All-Rounder', tier: 'GOLD', basePrice: 200, profileColor: '#3A225D', nationality: 'Overseas', speciality: ['Mystery Spinner', 'Pinch Hitter'], batting: { t10: n(), t20: s(490, 3800, 16, 146), odi: n(), test: n() }, bowling: { style: 'Right-arm Off-spin', t10: n(), t20: b(490, 520, 6.1), odi: n(), test: n() }, fielding: { catches: 130, runOuts: 11, agility: 7 } },

  // --- SRH (f008) ---
  { id: 'srh01', leagueIds: ['ipl'], name: 'Pat Cummins', country: 'Australia', age: 31, role: 'Bowler', tier: 'GOLD', basePrice: 200, profileColor: '#F26522', nationality: 'Overseas', speciality: ['Captain Cool', 'Silent Assassin'], batting: { t10: n(), t20: s(150, 1200, 18, 140), odi: n(), test: n() }, bowling: { style: 'Right-arm Fast', paceKmh: 146, t10: n(), t20: b(180, 195, 8.1), odi: b(85, 141, 5.2), test: n() }, fielding: { catches: 70, runOuts: 8, agility: 8 } },
  { id: 'srh02', leagueIds: ['ipl'], name: 'Travis Head', country: 'Australia', age: 30, role: 'Batsman', tier: 'GOLD', basePrice: 200, profileColor: '#F26522', nationality: 'Overseas', speciality: ['Explosive Opener', 'Big Match Player'], batting: { t10: n(), t20: s(120, 3500, 31, 148), odi: s(62, 2300, 42, 102), test: n() }, bowling: { style: 'N/A', t10: n(), t20: n(), odi: n(), test: n() }, fielding: { catches: 45, runOuts: 6, agility: 8 } },

  // --- RR (f005) ---
  { id: 'rr01', leagueIds: ['ipl'], name: 'Sanju Samson', country: 'India', age: 29, role: 'Wicket-Keeper', tier: 'GOLD', basePrice: 200, profileColor: '#EA1A85', nationality: 'Indian', speciality: ['Pure Talent', 'Aggressive Keeper'], batting: { t10: n(), t20: s(250, 6200, 30, 140), odi: n(), test: n() }, bowling: { style: 'N/A', t10: n(), t20: n(), odi: n(), test: n() }, fielding: { catches: 160, runOuts: 25, agility: 9 } },
  { id: 'rr02', leagueIds: ['ipl'], name: 'Yuzvendra Chahal', country: 'India', age: 33, role: 'Bowler', tier: 'GOLD', basePrice: 200, profileColor: '#EA1A85', nationality: 'Indian', speciality: ['Leggie Wizard', 'Wicket Taker'], batting: { t10: n(), t20: s(140, 50, 4, 80), odi: n(), test: n() }, bowling: { style: 'Leg-spin', t10: n(), t20: b(280, 210, 7.6), odi: b(72, 121, 5.2), test: n() }, fielding: { catches: 35, runOuts: 3, agility: 6 } },

  // --- LSG (f006) ---
  { id: 'lsg01', leagueIds: ['ipl'], name: 'KL Rahul', country: 'India', age: 32, role: 'Batsman', tier: 'GOLD', basePrice: 200, profileColor: '#0057E7', nationality: 'Indian', speciality: ['Top Order Class', 'Stylish Batsman'], batting: { t10: n(), t20: s(220, 7500, 44, 135), odi: s(75, 2800, 50, 88), test: n() }, bowling: { style: 'N/A', t10: n(), t20: n(), odi: n(), test: n() }, fielding: { catches: 80, runOuts: 10, agility: 8 } },
  { id: 'lsg02', leagueIds: ['ipl'], name: 'Nicholas Pooran', country: 'West Indies', age: 28, role: 'Wicket-Keeper', tier: 'GOLD', basePrice: 200, profileColor: '#0057E7', nationality: 'Overseas', speciality: ['Left-hand Power', 'Finisher'], batting: { t10: n(), t20: s(300, 6000, 26, 145), odi: n(), test: n() }, bowling: { style: 'N/A', t10: n(), t20: n(), odi: n(), test: n() }, fielding: { catches: 90, runOuts: 15, agility: 10 } },

  // --- GT (f007) ---
  { id: 'gt01', leagueIds: ['ipl'], name: 'Shubman Gill', country: 'India', age: 24, role: 'Batsman', tier: 'GOLD', basePrice: 200, profileColor: '#1B2133', nationality: 'Indian', speciality: ['Modern Great', 'Smooth Striker'], batting: { t10: n(), t20: s(130, 4100, 37, 134), odi: s(44, 2271, 61, 103), test: n() }, bowling: { style: 'N/A', t10: n(), t20: n(), odi: n(), test: n() }, fielding: { catches: 55, runOuts: 6, agility: 9 } },
  { id: 'gt02', leagueIds: ['ipl'], name: 'Rashid Khan', country: 'Afghanistan', age: 25, role: 'Bowler', tier: 'GOLD', basePrice: 200, profileColor: '#1B2133', nationality: 'Overseas', speciality: ['Mystery Leggie', 'Clutch Hitter'], batting: { t10: n(), t20: s(410, 2200, 14, 145), odi: n(), test: n() }, bowling: { style: 'Leg-spin', t10: n(), t20: b(415, 570, 6.4), odi: b(103, 181, 4.2), test: n() }, fielding: { catches: 115, runOuts: 20, agility: 9 } },

  // --- DC (f009) ---
  { id: 'dc01', leagueIds: ['ipl'], name: 'Rishabh Pant', country: 'India', age: 26, role: 'Wicket-Keeper', tier: 'GOLD', basePrice: 200, profileColor: '#134791', nationality: 'Indian', speciality: ['Impact Hitter', 'Fearless Keeper'], batting: { t10: n(), t20: s(185, 4500, 32, 148), odi: n(), test: n() }, bowling: { style: 'N/A', t10: n(), t20: n(), odi: n(), test: n() }, fielding: { catches: 125, runOuts: 18, agility: 8 } },
  { id: 'dc02', leagueIds: ['ipl'], name: 'Kuldeep Yadav', country: 'India', age: 29, role: 'Bowler', tier: 'GOLD', basePrice: 200, profileColor: '#134791', nationality: 'Indian', speciality: ['Chinaman Special', 'Drift King'], batting: { t10: n(), t20: s(90, 100, 8, 90), odi: n(), test: n() }, bowling: { style: 'Left-arm Spin', t10: n(), t20: b(150, 185, 7.7), odi: b(103, 168, 5.0), test: n() }, fielding: { catches: 28, runOuts: 4, agility: 7 } },

  // --- PBKS (f010) ---
  { id: 'pbks01', leagueIds: ['ipl'], name: 'Arshdeep Singh', country: 'India', age: 25, role: 'Bowler', tier: 'GOLD', basePrice: 200, profileColor: '#ED1B24', nationality: 'Indian', speciality: ['Swing Specialist', 'Death Over Star'], batting: { t10: n(), t20: s(60, 40, 5, 100), odi: n(), test: n() }, bowling: { style: 'Left-arm Fast', paceKmh: 140, t10: n(), t20: b(110, 145, 8.2), odi: n(), test: n() }, fielding: { catches: 22, runOuts: 5, agility: 8 } },
  { id: 'pbks02', leagueIds: ['ipl'], name: 'Liam Livingstone', country: 'England', age: 31, role: 'All-Rounder', tier: 'GOLD', basePrice: 200, profileColor: '#ED1B24', nationality: 'Overseas', speciality: ['Monstrous Hitter', 'Versatile Spinner'], batting: { t10: n(), t20: s(240, 5800, 29, 146), odi: n(), test: n() }, bowling: { style: 'Leg-spin', t10: n(), t20: b(180, 105, 8.1), odi: n(), test: n() }, fielding: { catches: 95, runOuts: 12, agility: 9 } },
],

// Helper to fill squads to 25 players if needed manually
// For now, I've provided the Top tier real players above.
// I can add more names in chunks to avoid token limits.

export default PLAYERS;
