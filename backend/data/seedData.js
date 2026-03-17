const players = [
  {
    id: 'p001', leagueIds: ['ipl'],
    name: 'Arjun Kapoor', country: 'India', age: 28, role: 'Batsman',
    tier: 'GOLD', basePrice: 200, profileColor: '#F59E0B', nationality: 'Indian',
    speciality: ['Power Hitter', 'Captain Material'],
    batting: {
      t10: { matches: 45, runs: 1020, average: 34, strikeRate: 198, fifties: 5, hundreds: 0, fours: 92, sixes: 78 },
      t20: { matches: 112, runs: 3680, average: 36.8, strikeRate: 152, fifties: 28, hundreds: 3, fours: 310, sixes: 200 },
      odi: { matches: 78, runs: 2950, average: 42.1, strikeRate: 98, fifties: 22, hundreds: 7, fours: 270, sixes: 80 },
      test: { matches: 35, runs: 2100, average: 48.8, strikeRate: 62, fifties: 15, hundreds: 5, fours: 210, sixes: 20 }
    },
    bowling: { style: 'N/A' },
    fielding: { catches: 82, runOuts: 12, agility: 8 }
  },
  // Add more players here...
];

const franchises = [
  {
    id: 'f001', leagueId: 'ipl', name: 'Chennai Super Kings', shortName: 'CSK', city: 'Chennai',
    primaryColor: '#FDB913', secondaryColor: '#0060A8', accentColor: '#FDB913',
    gradient: ['#FDB913', '#F8981D'], logoEmoji: '🦁',
    jerseyPattern: 'Yellow with Blue Lion', purse: 1000, maxPlayers: 25, playerIds: [], titles: 5,
  },
  // Add more franchises here...
];

module.exports = { players, franchises };
