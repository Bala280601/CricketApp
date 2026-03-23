
const players = [
  // --- CSK (f001) ---
  { id: 'csk01', leagueIds: ['ipl'], name: 'Ruturaj Gaikwad', country: 'India', age: 27, role: 'Batsman', tier: 'GOLD', basePrice: 200, profileColor: '#FDB913', nationality: 'Indian', speciality: ['Elegant Opener', 'Captain'], batting: { t10: { matches: 0 }, t20: { matches: 120, runs: 4200, average: 39, strikeRate: 138 }, odi: { matches: 10, runs: 350, average: 35, strikeRate: 95 }, test: { matches: 0 } }, bowling: { style: 'N/A', t10: { matches: 0 }, t20: { matches: 0 }, odi: { matches: 0 }, test: { matches: 0 } }, fielding: { catches: 65, runOuts: 5, agility: 9 } },
  { id: 'csk02', leagueIds: ['ipl'], name: 'MS Dhoni', country: 'India', age: 42, role: 'Wicket-Keeper', tier: 'GOLD', basePrice: 200, profileColor: '#FDB913', nationality: 'Indian', speciality: ['Finisher', 'Legendary Keeper'], batting: { t10: { matches: 0 }, t20: { matches: 350, runs: 7200, average: 38, strikeRate: 140 }, odi: { matches: 350, runs: 10773, average: 50.6, strikeRate: 87 }, test: { matches: 0 } }, bowling: { style: 'N/A', t10: { matches: 0 }, t20: { matches: 0 }, odi: { matches: 0 }, test: { matches: 0 } }, fielding: { catches: 450, runOuts: 120, agility: 7 } },
  { id: 'csk03', leagueIds: ['ipl'], name: 'Ravindra Jadeja', country: 'India', age: 35, role: 'All-Rounder', tier: 'GOLD', basePrice: 200, profileColor: '#FDB913', nationality: 'Indian', speciality: ['Gun Fielder', 'Spin Wizard'], batting: { t10: { matches: 0 }, t20: { matches: 250, runs: 3500, average: 26, strikeRate: 128 }, odi: { matches: 190, runs: 2700, average: 32, strikeRate: 85 }, test: { matches: 0 } }, bowling: { style: 'Left-arm Spin', t10: { matches: 0 }, t20: { matches: 250, wickets: 200, economy: 7.5 }, odi: { matches: 190, wickets: 210, economy: 4.9 }, test: { matches: 0 } }, fielding: { catches: 150, runOuts: 35, agility: 10 } },
  { id: 'csk04', leagueIds: ['ipl'], name: 'Matheesha Pathirana', country: 'Sri Lanka', age: 21, role: 'Bowler', tier: 'GOLD', basePrice: 200, profileColor: '#FDB913', nationality: 'Overseas', speciality: ['Slingy Action', 'Death Overs'], batting: { t10: { matches: 0 }, t20: { matches: 40, runs: 50, average: 5, strikeRate: 110 }, odi: { matches: 0 }, test: { matches: 0 } }, bowling: { style: 'Left-arm Fast', paceKmh: 148, t10: { matches: 0 }, t20: { matches: 45, wickets: 62, economy: 7.8 }, odi: { matches: 0 }, test: { matches: 0 } }, fielding: { catches: 10, runOuts: 2, agility: 8 } },
  { id: 'csk05', leagueIds: ['ipl'], name: 'Shivam Dube', country: 'India', age: 30, role: 'All-Rounder', tier: 'GOLD', basePrice: 200, profileColor: '#FDB913', nationality: 'Indian', speciality: ['Spin Basher', 'Medium Pace'], batting: { t10: { matches: 0 }, t20: { matches: 100, runs: 2100, average: 31, strikeRate: 142 }, odi: { matches: 0 }, test: { matches: 0 } }, bowling: { style: 'Right-arm Medium', t10: { matches: 0 }, t20: { matches: 100, wickets: 25, economy: 9.2 }, odi: { matches: 0 }, test: { matches: 0 } }, fielding: { catches: 20, runOuts: 3, agility: 6 } },
  // ... (More players needed to reach 25 per team)
  
  // --- MI (f002) ---
  { id: 'mi01', leagueIds: ['ipl'], name: 'Rohit Sharma', country: 'India', age: 37, role: 'Batsman', tier: 'GOLD', basePrice: 200, profileColor: '#004BA0', nationality: 'Indian', speciality: ['Hitman', 'Pull Shot Specialist'], batting: { t10: { matches: 0 }, t20: { matches: 420, runs: 11000, average: 30, strikeRate: 140 }, odi: { matches: 262, runs: 10709, average: 49, strikeRate: 92 }, test: { matches: 0 } }, bowling: { style: 'N/A', t10: { matches: 0 }, t20: { matches: 0 }, odi: { matches: 0 }, test: { matches: 0 } }, fielding: { catches: 200, runOuts: 15, agility: 7 } },
  { id: 'mi02', leagueIds: ['ipl'], name: 'Hardik Pandya', country: 'India', age: 30, role: 'All-Rounder', tier: 'GOLD', basePrice: 200, profileColor: '#004BA0', nationality: 'Indian', speciality: ['Power Hitter', 'Clutch Bowler'], batting: { t10: { matches: 0 }, t20: { matches: 250, runs: 4800, average: 28, strikeRate: 145 }, odi: { matches: 86, runs: 1700, average: 34, strikeRate: 110 }, test: { matches: 0 } }, bowling: { style: 'Right-arm Fast', paceKmh: 142, t10: { matches: 0 }, t20: { matches: 250, wickets: 160, economy: 8.2 }, odi: { matches: 86, wickets: 84, economy: 5.6 }, test: { matches: 0 } }, fielding: { catches: 110, runOuts: 18, agility: 9 } },
  { id: 'mi03', leagueIds: ['ipl'], name: 'Jasprit Bumrah', country: 'India', age: 30, role: 'Bowler', tier: 'GOLD', basePrice: 200, profileColor: '#004BA0', nationality: 'Indian', speciality: ['Yorker King', 'Economy Beast'], batting: { t10: { matches: 0 }, t20: { matches: 180, runs: 150, average: 10, strikeRate: 105 }, odi: { matches: 0 }, test: { matches: 0 } }, bowling: { style: 'Right-arm Fast', paceKmh: 150, t10: { matches: 0 }, t20: { matches: 210, wickets: 260, economy: 6.7 }, odi: { matches: 89, wickets: 149, economy: 4.6 }, test: { matches: 0 } }, fielding: { catches: 45, runOuts: 10, agility: 8 } },
  { id: 'mi04', leagueIds: ['ipl'], name: 'Suryakumar Yadav', country: 'India', age: 33, role: 'Batsman', tier: 'GOLD', basePrice: 200, profileColor: '#004BA0', nationality: 'Indian', speciality: ['360 Player', 'T20 Master'], batting: { t10: { matches: 0 }, t20: { matches: 270, runs: 7500, average: 35, strikeRate: 172 }, odi: { matches: 0 }, test: { matches: 0 } }, bowling: { style: 'N/A', t10: { matches: 0 }, t20: { matches: 0 }, odi: { matches: 0 }, test: { matches: 0 } }, fielding: { catches: 95, runOuts: 8, agility: 9 } },
  { id: 'mi05', leagueIds: ['ipl'], name: 'Ishan Kishan', country: 'India', age: 25, role: 'Wicket-Keeper', tier: 'GOLD', basePrice: 200, profileColor: '#004BA0', nationality: 'Indian', speciality: ['Pocket Dynamo', 'Aggressive Opener'], batting: { t10: { matches: 0 }, t20: { matches: 160, runs: 4200, average: 29, strikeRate: 135 }, odi: { matches: 27, runs: 933, average: 42, strikeRate: 102 }, test: { matches: 0 } }, bowling: { style: 'N/A', t10: { matches: 0 }, t20: { matches: 0 }, odi: { matches: 0 }, test: { matches: 0 } }, fielding: { catches: 80, runOuts: 12, agility: 9 } },

  // --- RCB (f004) ---
  { id: 'rcb01', leagueIds: ['ipl'], name: 'Virat Kohli', country: 'India', age: 35, role: 'Batsman', tier: 'GOLD', basePrice: 200, profileColor: '#DB0007', nationality: 'Indian', speciality: ['Run Machine', 'Chase Master'], batting: { t10: { matches: 0 }, t20: { matches: 380, runs: 12000, average: 41, strikeRate: 137 }, odi: { matches: 292, runs: 13848, average: 58, strikeRate: 93 }, test: { matches: 0 } }, bowling: { style: 'N/A', t10: { matches: 0 }, t20: { matches: 0 }, odi: { matches: 0 }, test: { matches: 0 } }, fielding: { catches: 310, runOuts: 42, agility: 9 } },
  { id: 'rcb02', leagueIds: ['ipl'], name: 'Glenn Maxwell', country: 'Australia', age: 35, role: 'All-Rounder', tier: 'GOLD', basePrice: 200, profileColor: '#DB0007', nationality: 'Overseas', speciality: ['The Big Show', 'Switch Hit'], batting: { t10: { matches: 0 }, t20: { matches: 340, runs: 9200, average: 28, strikeRate: 154 }, odi: { matches: 130, runs: 3800, average: 35, strikeRate: 126 }, test: { matches: 0 } }, bowling: { style: 'Right-arm Off-spin', t10: { matches: 0 }, t20: { matches: 340, wickets: 160, economy: 7.9 }, odi: { matches: 130, wickets: 68, economy: 5.5 }, test: { matches: 0 } }, fielding: { catches: 140, runOuts: 22, agility: 9 } },
  { id: 'rcb03', leagueIds: ['ipl'], name: 'Mohammed Siraj', country: 'India', age: 30, role: 'Bowler', tier: 'GOLD', basePrice: 200, profileColor: '#DB0007', nationality: 'Indian', speciality: ['Swing King', 'Test Tenacity'], batting: { t10: { matches: 0 }, t20: { matches: 120, runs: 80, average: 5, strikeRate: 95 }, odi: { matches: 0 }, test: { matches: 0 } }, bowling: { style: 'Right-arm Fast', paceKmh: 145, t10: { matches: 0 }, t20: { matches: 140, wickets: 165, economy: 8.4 }, odi: { matches: 41, wickets: 68, economy: 4.8 }, test: { matches: 0 } }, fielding: { catches: 25, runOuts: 4, agility: 8 } },

  // --- KKR (f003) ---
  { id: 'kkr01', leagueIds: ['ipl'], name: 'Shreyas Iyer', country: 'India', age: 29, role: 'Batsman', tier: 'GOLD', basePrice: 200, profileColor: '#3A225D', nationality: 'Indian', speciality: ['Elegant Mid-Order', 'Captain'], batting: { t10: { matches: 0 }, t20: { matches: 190, runs: 5500, average: 32, strikeRate: 132 }, odi: { matches: 59, runs: 2383, average: 49, strikeRate: 101 }, test: { matches: 0 } }, bowling: { style: 'N/A', t10: { matches: 0 }, t20: { matches: 0 }, odi: { matches: 0 }, test: { matches: 0 } }, fielding: { catches: 85, runOuts: 9, agility: 8 } },
  { id: 'kkr02', leagueIds: ['ipl'], name: 'Andre Russell', country: 'West Indies', age: 36, role: 'All-Rounder', tier: 'GOLD', basePrice: 200, profileColor: '#3A225D', nationality: 'Overseas', speciality: ['Muscle Power', 'Death Bowler'], batting: { t10: { matches: 0 }, t20: { matches: 480, runs: 8200, average: 27, strikeRate: 168 }, odi: { matches: 0 }, test: { matches: 0 } }, bowling: { style: 'Right-arm Fast', paceKmh: 144, t10: { matches: 0 }, t20: { matches: 480, wickets: 410, economy: 8.5 }, odi: { matches: 0 }, test: { matches: 0 } }, fielding: { catches: 180, runOuts: 14, agility: 8 } },
  { id: 'kkr03', leagueIds: ['ipl'], name: 'Sunil Narine', country: 'West Indies', age: 36, role: 'All-Rounder', tier: 'GOLD', basePrice: 200, profileColor: '#3A225D', nationality: 'Overseas', speciality: ['Mystery Spinner', 'Pinch Hitter'], batting: { t10: { matches: 0 }, t20: { matches: 490, runs: 3800, average: 16, strikeRate: 146 }, odi: { matches: 0 }, test: { matches: 0 } }, bowling: { style: 'Right-arm Off-spin', t10: { matches: 0 }, t20: { matches: 490, wickets: 520, economy: 6.1 }, odi: { matches: 0 }, test: { matches: 0 } }, fielding: { catches: 130, runOuts: 11, agility: 7 } },

  // --- SRH (f008) ---
  { id: 'srh01', leagueIds: ['ipl'], name: 'Pat Cummins', country: 'Australia', age: 31, role: 'Bowler', tier: 'GOLD', basePrice: 200, profileColor: '#F26522', nationality: 'Overseas', speciality: ['Captain Cool', 'Silent Assassin'], batting: { t10: { matches: 0 }, t20: { matches: 150, runs: 1200, average: 18, strikeRate: 140 }, odi: { matches: 0 }, test: { matches: 0 } }, bowling: { style: 'Right-arm Fast', paceKmh: 146, t10: { matches: 0 }, t20: { matches: 180, wickets: 195, economy: 8.1 }, odi: { matches: 85, wickets: 141, economy: 5.2 }, test: { matches: 0 } }, fielding: { catches: 70, runOuts: 8, agility: 8 } },
  { id: 'srh02', leagueIds: ['ipl'], name: 'Travis Head', country: 'Australia', age: 30, role: 'Batsman', tier: 'GOLD', basePrice: 200, profileColor: '#F26522', nationality: 'Overseas', speciality: ['Explosive Opener', 'Big Match Player'], batting: { t10: { matches: 0 }, t20: { matches: 120, runs: 3500, average: 31, strikeRate: 148 }, odi: { matches: 62, runs: 2300, average: 42, strikeRate: 102 }, test: { matches: 0 } }, bowling: { style: 'N/A', t10: { matches: 0 }, t20: { matches: 0 }, odi: { matches: 0 }, test: { matches: 0 } }, fielding: { catches: 45, runOuts: 6, agility: 8 } },

  // --- RR (f005) ---
  { id: 'rr01', leagueIds: ['ipl'], name: 'Sanju Samson', country: 'India', age: 29, role: 'Wicket-Keeper', tier: 'GOLD', basePrice: 200, profileColor: '#EA1A85', nationality: 'Indian', speciality: ['Pure Talent', 'Aggressive Keeper'], batting: { t10: { matches: 0 }, t20: { matches: 250, runs: 6200, average: 30, strikeRate: 140 }, odi: { matches: 0 }, test: { matches: 0 } }, bowling: { style: 'N/A', t10: { matches: 0 }, t20: { matches: 0 }, odi: { matches: 0 }, test: { matches: 0 } }, fielding: { catches: 160, runOuts: 25, agility: 9 } },
  { id: 'rr02', leagueIds: ['ipl'], name: 'Yuzvendra Chahal', country: 'India', age: 33, role: 'Bowler', tier: 'GOLD', basePrice: 200, profileColor: '#EA1A85', nationality: 'Indian', speciality: ['Leggie Wizard', 'Wicket Taker'], batting: { t10: { matches: 0 }, t20: { matches: 140, runs: 50, average: 4, strikeRate: 80 }, odi: { matches: 0 }, test: { matches: 0 } }, bowling: { style: 'Leg-spin', t10: { matches: 0 }, t20: { matches: 280, wickets: 210, economy: 7.6 }, odi: { matches: 72, wickets: 121, economy: 5.2 }, test: { matches: 0 } }, fielding: { catches: 35, runOuts: 3, agility: 6 } },

  // --- LSG (f006) ---
  { id: 'lsg01', leagueIds: ['ipl'], name: 'KL Rahul', country: 'India', age: 32, role: 'Batsman', tier: 'GOLD', basePrice: 200, profileColor: '#0057E7', nationality: 'Indian', speciality: ['Top Order Class', 'Stylish Batsman'], batting: { t10: { matches: 0 }, t20: { matches: 220, runs: 7500, average: 44, strikeRate: 135 }, odi: { matches: 75, runs: 2800, average: 50, strikeRate: 88 }, test: { matches: 0 } }, bowling: { style: 'N/A', t10: { matches: 0 }, t20: { matches: 0 }, odi: { matches: 0 }, test: { matches: 0 } }, fielding: { catches: 80, runOuts: 10, agility: 8 } },
  { id: 'lsg02', leagueIds: ['ipl'], name: 'Nicholas Pooran', country: 'West Indies', age: 28, role: 'Wicket-Keeper', tier: 'GOLD', basePrice: 200, profileColor: '#0057E7', nationality: 'Overseas', speciality: ['Left-hand Power', 'Finisher'], batting: { t10: { matches: 0 }, t20: { matches: 300, runs: 6000, average: 26, strikeRate: 145 }, odi: { matches: 0 }, test: { matches: 0 } }, bowling: { style: 'N/A', t10: { matches: 0 }, t20: { matches: 0 }, odi: { matches: 0 }, test: { matches: 0 } }, fielding: { catches: 90, runOuts: 15, agility: 10 } },

  // --- GT (f007) ---
  { id: 'gt01', leagueIds: ['ipl'], name: 'Shubman Gill', country: 'India', age: 24, role: 'Batsman', tier: 'GOLD', basePrice: 200, profileColor: '#1B2133', nationality: 'Indian', speciality: ['Modern Great', 'Smooth Striker'], batting: { t10: { matches: 0 }, t20: { matches: 130, runs: 4100, average: 37, strikeRate: 134 }, odi: { matches: 44, runs: 2271, average: 61, strikeRate: 103 }, test: { matches: 0 } }, bowling: { style: 'N/A', t10: { matches: 0 }, t20: { matches: 0 }, odi: { matches: 0 }, test: { matches: 0 } }, fielding: { catches: 55, runOuts: 6, agility: 9 } },
  { id: 'gt02', leagueIds: ['ipl'], name: 'Rashid Khan', country: 'Afghanistan', age: 25, role: 'Bowler', tier: 'GOLD', basePrice: 200, profileColor: '#1B2133', nationality: 'Overseas', speciality: ['Mystery Leggie', 'Clutch Hitter'], batting: { t10: { matches: 0 }, t20: { matches: 410, runs: 2200, average: 14, strikeRate: 145 }, odi: { matches: 0 }, test: { matches: 0 } }, bowling: { style: 'Leg-spin', t10: { matches: 0 }, t20: { matches: 415, wickets: 570, economy: 6.4 }, odi: { matches: 103, wickets: 181, economy: 4.2 }, test: { matches: 0 } }, fielding: { catches: 115, runOuts: 20, agility: 9 } },

  // --- DC (f009) ---
  { id: 'dc01', leagueIds: ['ipl'], name: 'Rishabh Pant', country: 'India', age: 26, role: 'Wicket-Keeper', tier: 'GOLD', basePrice: 200, profileColor: '#134791', nationality: 'Indian', speciality: ['Impact Hitter', 'Fearless Keeper'], batting: { t10: { matches: 0 }, t20: { matches: 185, runs: 4500, average: 32, strikeRate: 148 }, odi: { matches: 0 }, test: { matches: 0 } }, bowling: { style: 'N/A', t10: { matches: 0 }, t20: { matches: 0 }, odi: { matches: 0 }, test: { matches: 0 } }, fielding: { catches: 125, runOuts: 18, agility: 8 } },
  { id: 'dc02', leagueIds: ['ipl'], name: 'Kuldeep Yadav', country: 'India', age: 29, role: 'Bowler', tier: 'GOLD', basePrice: 200, profileColor: '#134791', nationality: 'Indian', speciality: ['Chinaman Special', 'Drift King'], batting: { t10: { matches: 0 }, t20: { matches: 90, runs: 100, average: 8, strikeRate: 90 }, odi: { matches: 0 }, test: { matches: 0 } }, bowling: { style: 'Left-arm Spin', t10: { matches: 0 }, t20: { matches: 150, wickets: 185, economy: 7.7 }, odi: { matches: 103, wickets: 168, economy: 5.0 }, test: { matches: 0 } }, fielding: { catches: 28, runOuts: 4, agility: 7 } },

  // --- PBKS (f010) ---
  { id: 'pbks01', leagueIds: ['ipl'], name: 'Arshdeep Singh', country: 'India', age: 25, role: 'Bowler', tier: 'GOLD', basePrice: 200, profileColor: '#ED1B24', nationality: 'Indian', speciality: ['Swing Specialist', 'Death Over Star'], batting: { t10: { matches: 0 }, t20: { matches: 60, runs: 40, average: 5, strikeRate: 100 }, odi: { matches: 0 }, test: { matches: 0 } }, bowling: { style: 'Left-arm Fast', paceKmh: 140, t10: { matches: 0 }, t20: { matches: 110, wickets: 145, economy: 8.2 }, odi: { matches: 0 }, test: { matches: 0 } }, fielding: { catches: 22, runOuts: 5, agility: 8 } },
  { id: 'pbks02', leagueIds: ['ipl'], name: 'Liam Livingstone', country: 'England', age: 31, role: 'All-Rounder', tier: 'GOLD', basePrice: 200, profileColor: '#ED1B24', nationality: 'Overseas', speciality: ['Monstrous Hitter', 'Versatile Spinner'], batting: { t10: { matches: 0 }, t20: { matches: 240, runs: 5800, average: 29, strikeRate: 146 }, odi: { matches: 0 }, test: { matches: 0 } }, bowling: { style: 'Leg-spin', t10: { matches: 0 }, t20: { matches: 180, wickets: 105, economy: 8.1 }, odi: { matches: 0 }, test: { matches: 0 } }, fielding: { catches: 95, runOuts: 12, agility: 9 } },
];

const franchises = [
  // IPL Teams
  {
    id: 'f001', leagueId: 'ipl', name: 'Chennai Super Kings', shortName: 'CSK', city: 'Chennai',
    primaryColor: '#FDB913', secondaryColor: '#0060A8', accentColor: '#FDB913',
    gradient: ['#FDB913', '#F8981D'], logoEmoji: '🦁', logo: 'assets/logos/csk.png',
    jerseyPattern: 'Yellow with Blue Lion', purse: 1000, maxPlayers: 25, playerIds: [], titles: 5,
  },
  {
    id: 'f002', leagueId: 'ipl', name: 'Mumbai Indians', shortName: 'MI', city: 'Mumbai',
    primaryColor: '#004BA0', secondaryColor: '#D11D25', accentColor: '#B3995D',
    gradient: ['#004BA0', '#002B5C'], logoEmoji: '🌀', logo: 'assets/logos/mi.png',
    jerseyPattern: 'Blue with Gold accents', purse: 1000, maxPlayers: 25, playerIds: [], titles: 5,
  },
  {
    id: 'f003', leagueId: 'ipl', name: 'Kolkata Knight Riders', shortName: 'KKR', city: 'Kolkata',
    primaryColor: '#3A225D', secondaryColor: '#B3A123', accentColor: '#3A225D',
    gradient: ['#3A225D', '#2B1B47'], logoEmoji: '⚔️', logo: 'assets/logos/kkr.png',
    jerseyPattern: 'Purple and Gold', purse: 1000, maxPlayers: 25, playerIds: [], titles: 3,
  },
  {
    id: 'f004', leagueId: 'ipl', name: 'Royal Challengers Bangalore', shortName: 'RCB', city: 'Bangalore',
    primaryColor: '#DB0007', secondaryColor: '#000000', accentColor: '#DB0007',
    gradient: ['#DB0007', '#000000'], logoEmoji: '🦁', logo: 'assets/logos/rcb.png',
    jerseyPattern: 'Red and Black', purse: 1000, maxPlayers: 25, playerIds: [], titles: 0,
  },
  {
    id: 'f005', leagueId: 'ipl', name: 'Rajasthan Royals', shortName: 'RR', city: 'Rajasthan',
    primaryColor: '#EA1A85', secondaryColor: '#004B99', accentColor: '#EA1A85',
    gradient: ['#EA1A85', '#004B99'], logoEmoji: '👑', logo: 'assets/logos/rr.png',
    jerseyPattern: 'Pink and Blue', purse: 1000, maxPlayers: 25, playerIds: [], titles: 1,
  },
  {
    id: 'f006', leagueId: 'ipl', name: 'Lucknow Super Giants', shortName: 'LSG', city: 'Lucknow',
    primaryColor: '#0057E2', secondaryColor: '#FF4A00', accentColor: '#0057E2',
    gradient: ['#0057E2', '#003A94'], logoEmoji: '🦅', logo: 'assets/logos/lsg.png',
    jerseyPattern: 'Sky Blue and Turquoise', purse: 1000, maxPlayers: 25, playerIds: [], titles: 0,
  },
  {
    id: 'f007', leagueId: 'ipl', name: 'Gujarat Titans', shortName: 'GT', city: 'Gujarat',
    primaryColor: '#1B2133', secondaryColor: '#B3995D', accentColor: '#1B2133',
    gradient: ['#1B2133', '#2C3E50'], logoEmoji: '⛰️', logo: 'assets/logos/gt.png',
    jerseyPattern: 'Navy Blue and Gold', purse: 1000, maxPlayers: 25, playerIds: [], titles: 1,
  },
  {
    id: 'f008', leagueId: 'ipl', name: 'Sunrisers Hyderabad', shortName: 'SRH', city: 'Hyderabad',
    primaryColor: '#F26522', secondaryColor: '#000000', accentColor: '#F26522',
    gradient: ['#F26522', '#ED1C24'], logoEmoji: '🦅', logo: 'assets/logos/srh.png',
    jerseyPattern: 'Orange and Black', purse: 1000, maxPlayers: 25, playerIds: [], titles: 1,
  },
  {
    id: 'f009', leagueId: 'ipl', name: 'Delhi Capitals', shortName: 'DC', city: 'Delhi',
    primaryColor: '#0078BC', secondaryColor: '#EF4123', accentColor: '#0078BC',
    gradient: ['#0078BC', '#004B99'], logoEmoji: '🐯', logo: 'assets/logos/dc.png',
    jerseyPattern: 'Blue and Red', purse: 1000, maxPlayers: 25, playerIds: [], titles: 0,
  },
  {
    id: 'f010', leagueId: 'ipl', name: 'Punjab Kings', shortName: 'PBKS', city: 'Punjab',
    primaryColor: '#DD1F2D', secondaryColor: '#D1D3D4', accentColor: '#DD1F2D',
    gradient: ['#DD1F2D', '#A11E22'], logoEmoji: '🦁', logo: 'assets/logos/pbks.png',
    jerseyPattern: 'Red and Silver', purse: 1000, maxPlayers: 25, playerIds: [], titles: 0,
  },

  // SA20 Teams
  {
    id: 'sa01', leagueId: 'sa20', name: 'Sunrisers Eastern Cape', shortName: 'SEC', city: 'Gqeberha',
    primaryColor: '#F26522', secondaryColor: '#000000', accentColor: '#F26522',
    gradient: ['#F26522', '#ED1C24'], logoEmoji: '🦅', logo: 'assets/logos/sa20/sec.png',
    jerseyPattern: 'Orange and Black', purse: 1000, maxPlayers: 18, playerIds: [], titles: 2,
  },
  {
    id: 'sa02', leagueId: 'sa20', name: 'Pretoria Capitals', shortName: 'PC', city: 'Pretoria',
    primaryColor: '#005AC7', secondaryColor: '#FFFFFF', accentColor: '#005AC7',
    gradient: ['#005AC7', '#003A94'], logoEmoji: '🏛️', logo: 'assets/logos/sa20/pc.png',
    jerseyPattern: 'Blue and White', purse: 1000, maxPlayers: 18, playerIds: [],
  },
  {
    id: 'sa03', leagueId: 'sa20', name: 'MI Cape Town', shortName: 'MICT', city: 'Cape Town',
    primaryColor: '#004BA0', secondaryColor: '#D11D25', accentColor: '#B3995D',
    gradient: ['#004BA0', '#002B5C'], logoEmoji: '🌀', logo: 'assets/logos/sa20/mict.png',
    jerseyPattern: 'Blue and Gold', purse: 1000, maxPlayers: 18, playerIds: [],
  },
  {
    id: 'sa04', leagueId: 'sa20', name: 'Joburg Super Kings', shortName: 'JSK', city: 'Johannesburg',
    primaryColor: '#FDB913', secondaryColor: '#0060A8', accentColor: '#FDB913',
    gradient: ['#FDB913', '#F8981D'], logoEmoji: '🦁', logo: 'assets/logos/sa20/jsk.png',
    jerseyPattern: 'Yellow and Blue', purse: 1000, maxPlayers: 18, playerIds: [],
  },
  {
    id: 'sa05', leagueId: 'sa20', name: 'Durban\'s Super Giants', shortName: 'DSG', city: 'Durban',
    primaryColor: '#0058A3', secondaryColor: '#E97103', accentColor: '#0058A3',
    gradient: ['#0058A3', '#003A94'], logoEmoji: '🌊', logo: 'assets/logos/sa20/dsg.png',
    jerseyPattern: 'Blue and Orange', purse: 1000, maxPlayers: 18, playerIds: [],
  },
  {
    id: 'sa06', leagueId: 'sa20', name: 'Paarl Royals', shortName: 'PR', city: 'Paarl',
    primaryColor: '#EA1A85', secondaryColor: '#004B99', accentColor: '#EA1A85',
    gradient: ['#EA1A85', '#004B99'], logoEmoji: '👑', logo: 'assets/logos/sa20/pr.png',
    jerseyPattern: 'Pink and Blue', purse: 1000, maxPlayers: 18, playerIds: [],
  },

  // BBL Teams
  {
    id: 'bbl01', leagueId: 'bbl', name: 'Adelaide Strikers', shortName: 'AS', city: 'Adelaide',
    primaryColor: '#00AAE5', secondaryColor: '#000000', accentColor: '#00AAE5',
    gradient: ['#00AAE5', '#0088CC'], logoEmoji: '⚡', logo: 'assets/logos/bbl/as.png',
    jerseyPattern: 'Blue and White', purse: 1000, maxPlayers: 18, playerIds: [],
  },
  {
    id: 'bbl02', leagueId: 'bbl', name: 'Brisbane Heat', shortName: 'BH', city: 'Brisbane',
    primaryColor: '#00A19A', secondaryColor: '#000000', accentColor: '#00A19A',
    gradient: ['#00A19A', '#007A74'], logoEmoji: '🔥', logo: 'assets/logos/bbl/bh.png',
    jerseyPattern: 'Teal and Black', purse: 1000, maxPlayers: 18, playerIds: [],
  },
  {
    id: 'bbl03', leagueId: 'bbl', name: 'Hobart Hurricanes', shortName: 'HH', city: 'Hobart',
    primaryColor: '#602D91', secondaryColor: '#FFFFFF', accentColor: '#602D91',
    gradient: ['#602D91', '#4A1D70'], logoEmoji: '🌪️', logo: 'assets/logos/bbl/hh.png',
    jerseyPattern: 'Purple and White', purse: 1000, maxPlayers: 18, playerIds: [],
  },
  {
    id: 'bbl04', leagueId: 'bbl', name: 'Melbourne Renegades', shortName: 'MR', city: 'Melbourne',
    primaryColor: '#E20613', secondaryColor: '#000000', accentColor: '#E20613',
    gradient: ['#E20613', '#B3050F'], logoEmoji: '🕵️', logo: 'assets/logos/bbl/mr.png',
    jerseyPattern: 'Red and Black', purse: 1000, maxPlayers: 18, playerIds: [],
  },
  {
    id: 'bbl05', leagueId: 'bbl', name: 'Melbourne Stars', shortName: 'MS', city: 'Melbourne',
    primaryColor: '#00A651', secondaryColor: '#FFFFFF', accentColor: '#00A651',
    gradient: ['#00A651', '#007F3E'], logoEmoji: '⭐', logo: 'assets/logos/bbl/ms.png',
    jerseyPattern: 'Green and White', purse: 1000, maxPlayers: 18, playerIds: [],
  },
  {
    id: 'bbl06', leagueId: 'bbl', name: 'Perth Scorchers', shortName: 'PS', city: 'Perth',
    primaryColor: '#F58220', secondaryColor: '#000000', accentColor: '#F58220',
    gradient: ['#F58220', '#E56210'], logoEmoji: '🔥', logo: 'assets/logos/bbl/ps.png',
    jerseyPattern: 'Orange and Black', purse: 1000, maxPlayers: 18, playerIds: [],
  },
  {
    id: 'bbl07', leagueId: 'bbl', name: 'Sydney Sixers', shortName: 'SS', city: 'Sydney',
    primaryColor: '#E6248C', secondaryColor: '#000000', accentColor: '#E6248C',
    gradient: ['#E6248C', '#C41E7A'], logoEmoji: '6️⃣', logo: 'assets/logos/bbl/ss.png',
    jerseyPattern: 'Magenta and Black', purse: 1000, maxPlayers: 18, playerIds: [],
  },
  {
    id: 'bbl08', leagueId: 'bbl', name: 'Sydney Thunder', shortName: 'ST', city: 'Sydney',
    primaryColor: '#B2DA24', secondaryColor: '#1A1A1A', accentColor: '#B2DA24',
    gradient: ['#B2DA24', '#96B81E'], logoEmoji: '⚡', logo: 'assets/logos/bbl/st.png',
    jerseyPattern: 'Lime and Black', purse: 1000, maxPlayers: 18, playerIds: [],
  },

  // The Hundred Teams
  {
    id: 'h01', leagueId: 'hundred', name: 'Birmingham Phoenix', shortName: 'BPH', city: 'Birmingham',
    primaryColor: '#F15A24', secondaryColor: '#00B4FF', accentColor: '#F15A24',
    gradient: ['#F15A24', '#D14A1F'], logoEmoji: '🔥', logo: 'assets/logos/hundred/bph.png',
    jerseyPattern: 'Orange and Blue', purse: 1000, maxPlayers: 15, playerIds: [],
  },
  {
    id: 'h02', leagueId: 'hundred', name: 'London Spirit', shortName: 'LNS', city: 'London',
    primaryColor: '#002E5D', secondaryColor: '#FFFFFF', accentColor: '#002E5D',
    gradient: ['#002E5D', '#001E3D'], logoEmoji: '👻', logo: 'assets/logos/hundred/lns.png',
    jerseyPattern: 'Navy and White', purse: 1000, maxPlayers: 15, playerIds: [],
  },
  {
    id: 'h03', leagueId: 'hundred', name: 'Manchester Originals', shortName: 'MOR', city: 'Manchester',
    primaryColor: '#1A1A1A', secondaryColor: '#FFFFFF', accentColor: '#1A1A1A',
    gradient: ['#1A1A1A', '#000000'], logoEmoji: '🐝', logo: 'assets/logos/hundred/mor.png',
    jerseyPattern: 'Black and White', purse: 1000, maxPlayers: 15, playerIds: [],
  },
  {
    id: 'h04', leagueId: 'hundred', name: 'Northern Superchargers', shortName: 'NSC', city: 'Leeds',
    primaryColor: '#6F263D', secondaryColor: '#FFFFFF', accentColor: '#6F263D',
    gradient: ['#6F263D', '#5A1E31'], logoEmoji: '⚡', logo: 'assets/logos/hundred/nsc.png',
    jerseyPattern: 'Maroon and White', purse: 1000, maxPlayers: 15, playerIds: [],
  },
  {
    id: 'h05', leagueId: 'hundred', name: 'Oval Invincibles', shortName: 'OVI', city: 'London',
    primaryColor: '#00A695', secondaryColor: '#1A1A1A', accentColor: '#00A695',
    gradient: ['#00A695', '#008779'], logoEmoji: '🛡️', logo: 'assets/logos/hundred/ovi.png',
    jerseyPattern: 'Teal and Black', purse: 1000, maxPlayers: 15, playerIds: [],
  },
  {
    id: 'h06', leagueId: 'hundred', name: 'Southern Brave', shortName: 'SOB', city: 'Southampton',
    primaryColor: '#BADA55', secondaryColor: '#1A1A1A', accentColor: '#BADA55',
    gradient: ['#BADA55', '#9BB546'], logoEmoji: '🦁', logo: 'assets/logos/hundred/sob.png',
    jerseyPattern: 'Neon Green and Black', purse: 1000, maxPlayers: 15, playerIds: [],
  },
  {
    id: 'h07', leagueId: 'hundred', name: 'Trent Rockets', shortName: 'TRT', city: 'Nottingham',
    primaryColor: '#FFD700', secondaryColor: '#000000', accentColor: '#FFD700',
    gradient: ['#FFD700', '#E6C200'], logoEmoji: '🚀', logo: 'assets/logos/hundred/trt.png',
    jerseyPattern: 'Yellow and Black', purse: 1000, maxPlayers: 15, playerIds: [],
  },
  {
    id: 'h08', leagueId: 'hundred', name: 'Welsh Fire', shortName: 'WEF', city: 'Cardiff',
    primaryColor: '#E20613', secondaryColor: '#FFFFFF', accentColor: '#E20613',
    gradient: ['#E20613', '#B3050F'], logoEmoji: '🐉', logo: 'assets/logos/hundred/wef.png',
    jerseyPattern: 'Red and White', purse: 1000, maxPlayers: 15, playerIds: [],
  },

  // LPL Teams
  {
    id: 'lp01', leagueId: 'lpl', name: 'Colombo Strikers', shortName: 'CS', city: 'Colombo',
    primaryColor: '#FDB913', secondaryColor: '#E20613', accentColor: '#FDB913',
    gradient: ['#FDB913', '#F8981D'], logoEmoji: '🌩️', logo: 'assets/logos/lpl/cs.png',
    jerseyPattern: 'Yellow and Red', purse: 1000, maxPlayers: 20, playerIds: [],
  },
  {
    id: 'lp02', leagueId: 'lpl', name: 'Dambulla Sixers', shortName: 'DS', city: 'Dambulla',
    primaryColor: '#00A651', secondaryColor: '#FFFFFF', accentColor: '#00A651',
    gradient: ['#00A651', '#007F3E'], logoEmoji: '6️⃣', logo: 'assets/logos/lpl/ds.png',
    jerseyPattern: 'Green and White', purse: 1000, maxPlayers: 20, playerIds: [],
  },
  {
    id: 'lp03', leagueId: 'lpl', name: 'Galle Marvels', shortName: 'GM', city: 'Galle',
    primaryColor: '#005AC7', secondaryColor: '#FDB913', accentColor: '#005AC7',
    gradient: ['#005AC7', '#003A94'], logoEmoji: '🌊', logo: 'assets/logos/lpl/gm.png',
    jerseyPattern: 'Blue and Gold', purse: 1000, maxPlayers: 20, playerIds: [],
  },
  {
    id: 'lp04', leagueId: 'lpl', name: 'Jaffna Stallions', shortName: 'JS', city: 'Jaffna',
    primaryColor: '#6B2B2B', secondaryColor: '#FFFFFF', accentColor: '#6B2B2B',
    gradient: ['#6B2B2B', '#5A2424'], logoEmoji: '🐎', logo: 'assets/logos/lpl/js.png',
    jerseyPattern: 'Maroon and White', purse: 1000, maxPlayers: 20, playerIds: [],
  },
  {
    id: 'lp05', leagueId: 'lpl', name: 'Kandy Falcons', shortName: 'KF', city: 'Kandy',
    primaryColor: '#F15A24', secondaryColor: '#1A1A1A', accentColor: '#F15A24',
    gradient: ['#F15A24', '#D14A1F'], logoEmoji: '🦅', logo: 'assets/logos/lpl/kf.png',
    jerseyPattern: 'Orange and Black', purse: 1000, maxPlayers: 20, playerIds: [],
  },

  // Abu Dhabi T10 Teams
  {
    id: 't10_01', leagueId: 't10', name: 'Deccan Gladiators', shortName: 'DG', city: 'Abu Dhabi',
    primaryColor: '#1A1A1A', secondaryColor: '#FFD700', accentColor: '#1A1A1A',
    gradient: ['#1A1A1A', '#000000'], logoEmoji: '⚔️', logo: 'assets/logos/t10/dg.png',
    jerseyPattern: 'Black and Gold', purse: 500, maxPlayers: 15, playerIds: [],
  },
  {
    id: 't10_02', leagueId: 't10', name: 'Delhi Bulls', shortName: 'DB', city: 'Abu Dhabi',
    primaryColor: '#E20613', secondaryColor: '#000000', accentColor: '#E20613',
    gradient: ['#E20613', '#B3050F'], logoEmoji: '🐂', logo: 'assets/logos/t10/db.png',
    jerseyPattern: 'Red and Black', purse: 500, maxPlayers: 15, playerIds: [],
  },
  {
    id: 't10_03', leagueId: 't10', name: 'New York Warriors', shortName: 'NYW', city: 'Abu Dhabi',
    primaryColor: '#002E5D', secondaryColor: '#EF4123', accentColor: '#002E5D',
    gradient: ['#002E5D', '#001E3D'], logoEmoji: '🗽', logo: 'assets/logos/t10/nyw.png',
    jerseyPattern: 'Blue and Red', purse: 500, maxPlayers: 15, playerIds: [],
  },
  {
    id: 't10_04', leagueId: 't10', name: 'Morrisville Samp Army', shortName: 'MSA', city: 'Abu Dhabi',
    primaryColor: '#BADA55', secondaryColor: '#1A1A1A', accentColor: '#BADA55',
    gradient: ['#BADA55', '#9BB546'], logoEmoji: '🐍', logo: 'assets/logos/t10/msa.png',
    jerseyPattern: 'Green and Black', purse: 500, maxPlayers: 15, playerIds: [],
  },
  {
    id: 't10_05', leagueId: 't10', name: 'Northern Warriors', shortName: 'NW', city: 'Abu Dhabi',
    primaryColor: '#6F263D', secondaryColor: '#FFD700', accentColor: '#6F263D',
    gradient: ['#6F263D', '#5A1E31'], logoEmoji: '⚔️', logo: 'assets/logos/t10/nw.png',
    jerseyPattern: 'Maroon and Gold', purse: 500, maxPlayers: 15, playerIds: [],
  },
  {
    id: 't10_06', leagueId: 't10', name: 'Team Abu Dhabi', shortName: 'TAD', city: 'Abu Dhabi',
    primaryColor: '#00A695', secondaryColor: '#FFFFFF', accentColor: '#00A695',
    gradient: ['#00A695', '#008779'], logoEmoji: '🏙️', logo: 'assets/logos/t10/tad.png',
    jerseyPattern: 'Teal and White', purse: 500, maxPlayers: 15, playerIds: [],
  },
  {
    id: 't10_07', leagueId: 't10', name: 'Chennai Braves', shortName: 'CB', city: 'Abu Dhabi',
    primaryColor: '#FDB913', secondaryColor: '#1A1A1A', accentColor: '#FDB913',
    gradient: ['#FDB913', '#F8981D'], logoEmoji: '🦁', logo: 'assets/logos/t10/cb.png',
    jerseyPattern: 'Yellow and Black', purse: 500, maxPlayers: 15, playerIds: [],
  },
  {
    id: 't10_08', leagueId: 't10', name: 'Bangla Tigers', shortName: 'BT', city: 'Abu Dhabi',
    primaryColor: '#DD1F2D', secondaryColor: '#006A4E', accentColor: '#DD1F2D',
    gradient: ['#DD1F2D', '#A11E22'], logoEmoji: '🐯', logo: 'assets/logos/t10/bt.png',
    jerseyPattern: 'Red and Green', purse: 500, maxPlayers: 15, playerIds: [],
  },
  {
    id: 't10_09', leagueId: 't10', name: 'Ajman Bolts', shortName: 'AB', city: 'Abu Dhabi',
    primaryColor: '#00AAE5', secondaryColor: '#1A1A1A', accentColor: '#00AAE5',
    gradient: ['#00AAE5', '#0088CC'], logoEmoji: '⚡', logo: 'assets/logos/t10/ab.png',
    jerseyPattern: 'Blue and Black', purse: 500, maxPlayers: 15, playerIds: [],
  },
  {
    id: 't10_10', leagueId: 't10', name: 'UP Nawabs', shortName: 'UPN', city: 'Abu Dhabi',
    primaryColor: '#602D91', secondaryColor: '#FFD700', accentColor: '#602D91',
    gradient: ['#602D91', '#4A1D70'], logoEmoji: '👑', logo: 'assets/logos/t10/upn.png',
    jerseyPattern: 'Purple and Gold', purse: 500, maxPlayers: 15, playerIds: [],
  },
];

const leagues = [
  { id: 'ipl', name: 'Indian Premier League', shortName: 'IPL', logo: 'assets/leagues/ipl.png', color: '#004BA0' },
  { id: 'sa20', name: 'SA20 League', shortName: 'SA20', logo: 'assets/leagues/sa20.png', color: '#007A33' },
  { id: 'bbl', name: 'Big Bash League', shortName: 'BBL', logo: 'assets/leagues/bbl.png', color: '#ED1B24' },
  { id: 'hundred', name: 'The Hundred', shortName: '100', logo: 'assets/leagues/hundred.png', color: '#E91E63' },
  { id: 'lpl', name: 'Lanka Premier League', shortName: 'LPL', logo: 'assets/leagues/lpl.png', color: '#005AC7' },
  { id: 't10', name: 'Abu Dhabi T10', shortName: 'T10', logo: 'assets/leagues/t10.png', color: '#FFD700' },
];

module.exports = { players, franchises, leagues };
