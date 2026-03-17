import { ImageSourcePropType } from 'react-native';

export interface League {
  id: string;
  name: string;
  shortName: string;
  logo?: ImageSourcePropType;
  color: string;
}

export interface Franchise {
  id: string;
  leagueId: string;
  name: string;
  shortName: string;
  city: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  gradient: string[];
  logoEmoji: string;
  logo?: ImageSourcePropType;
  jerseyPattern: string;
  purse: number; // in Lakhs
  maxPlayers: number;
  playerIds: string[];
  wins?: number;
  losses?: number;
  titles?: number;
}

export const LEAGUES: League[] = [
  { id: 'ipl', name: 'Indian Premier League', shortName: 'IPL', logo: require('../assets/leagues/ipl.png'), color: '#004BA0' },
  { id: 'sa20', name: 'SA20 League', shortName: 'SA20', logo: require('../assets/leagues/sa20.png'), color: '#007A33' },
  { id: 'bbl', name: 'Big Bash League', shortName: 'BBL', logo: require('../assets/leagues/bbl.png'), color: '#ED1B24' },
  { id: 'hundred', name: 'The Hundred', shortName: '100', logo: require('../assets/leagues/hundred.png'), color: '#E91E63' },
  { id: 'lpl', name: 'Lanka Premier League', shortName: 'LPL', logo: require('../assets/leagues/lpl.png'), color: '#005AC7' },
  { id: 't10', name: 'Abu Dhabi T10', shortName: 'T10', logo: require('../assets/leagues/t10.png'), color: '#FFD700' },
];

export const FRANCHISES: Franchise[] = [
  // IPL Teams
  {
    id: 'f001', leagueId: 'ipl', name: 'Chennai Super Kings', shortName: 'CSK', city: 'Chennai',
    primaryColor: '#FDB913', secondaryColor: '#0060A8', accentColor: '#FDB913',
    gradient: ['#FDB913', '#F8981D'], logoEmoji: '🦁', logo: require('../assets/logos/csk.png'),
    jerseyPattern: 'Yellow with Blue Lion', purse: 1000, maxPlayers: 25, playerIds: [], titles: 5,
  },
  {
    id: 'f002', leagueId: 'ipl', name: 'Mumbai Indians', shortName: 'MI', city: 'Mumbai',
    primaryColor: '#004BA0', secondaryColor: '#D11D25', accentColor: '#B3995D',
    gradient: ['#004BA0', '#002B5C'], logoEmoji: '🌀', logo: require('../assets/logos/mi.png'),
    jerseyPattern: 'Blue with Gold accents', purse: 1000, maxPlayers: 25, playerIds: [], titles: 5,
  },
  {
    id: 'f003', leagueId: 'ipl', name: 'Kolkata Knight Riders', shortName: 'KKR', city: 'Kolkata',
    primaryColor: '#3A225D', secondaryColor: '#B3A123', accentColor: '#3A225D',
    gradient: ['#3A225D', '#2B1B47'], logoEmoji: '⚔️', logo: require('../assets/logos/kkr.png'),
    jerseyPattern: 'Purple and Gold', purse: 1000, maxPlayers: 25, playerIds: [], titles: 3,
  },
  {
    id: 'f004', leagueId: 'ipl', name: 'Royal Challengers Bangalore', shortName: 'RCB', city: 'Bangalore',
    primaryColor: '#DB0007', secondaryColor: '#000000', accentColor: '#DB0007',
    gradient: ['#DB0007', '#000000'], logoEmoji: '🦁', logo: require('../assets/logos/rcb.png'),
    jerseyPattern: 'Red and Black', purse: 1000, maxPlayers: 25, playerIds: [], titles: 0,
  },
  {
    id: 'f005', leagueId: 'ipl', name: 'Rajasthan Royals', shortName: 'RR', city: 'Rajasthan',
    primaryColor: '#EA1A85', secondaryColor: '#004B99', accentColor: '#EA1A85',
    gradient: ['#EA1A85', '#004B99'], logoEmoji: '👑', logo: require('../assets/logos/rr.png'),
    jerseyPattern: 'Pink and Blue', purse: 1000, maxPlayers: 25, playerIds: [], titles: 1,
  },
  {
    id: 'f006', leagueId: 'ipl', name: 'Lucknow Super Giants', shortName: 'LSG', city: 'Lucknow',
    primaryColor: '#0057E2', secondaryColor: '#FF4A00', accentColor: '#0057E2',
    gradient: ['#0057E2', '#003A94'], logoEmoji: '🦅', logo: require('../assets/logos/lsg.png'),
    jerseyPattern: 'Sky Blue and Turquoise', purse: 1000, maxPlayers: 25, playerIds: [], titles: 0,
  },
  {
    id: 'f007', leagueId: 'ipl', name: 'Gujarat Titans', shortName: 'GT', city: 'Gujarat',
    primaryColor: '#1B2133', secondaryColor: '#B3995D', accentColor: '#1B2133',
    gradient: ['#1B2133', '#2C3E50'], logoEmoji: '⛰️', logo: require('../assets/logos/gt.png'),
    jerseyPattern: 'Navy Blue and Gold', purse: 1000, maxPlayers: 25, playerIds: [], titles: 1,
  },
  {
    id: 'f008', leagueId: 'ipl', name: 'Sunrisers Hyderabad', shortName: 'SRH', city: 'Hyderabad',
    primaryColor: '#F26522', secondaryColor: '#000000', accentColor: '#F26522',
    gradient: ['#F26522', '#ED1C24'], logoEmoji: '🦅', logo: require('../assets/logos/srh.png'),
    jerseyPattern: 'Orange and Black', purse: 1000, maxPlayers: 25, playerIds: [], titles: 1,
  },
  {
    id: 'f009', leagueId: 'ipl', name: 'Delhi Capitals', shortName: 'DC', city: 'Delhi',
    primaryColor: '#0078BC', secondaryColor: '#EF4123', accentColor: '#0078BC',
    gradient: ['#0078BC', '#004B99'], logoEmoji: '🐯', logo: require('../assets/logos/dc.png'),
    jerseyPattern: 'Blue and Red', purse: 1000, maxPlayers: 25, playerIds: [], titles: 0,
  },
  {
    id: 'f010', leagueId: 'ipl', name: 'Punjab Kings', shortName: 'PBKS', city: 'Punjab',
    primaryColor: '#DD1F2D', secondaryColor: '#D1D3D4', accentColor: '#DD1F2D',
    gradient: ['#DD1F2D', '#A11E22'], logoEmoji: '🦁', logo: require('../assets/logos/pbks.png'),
    jerseyPattern: 'Red and Silver', purse: 1000, maxPlayers: 25, playerIds: [], titles: 0,
  },

  // SA20 Teams
  {
    id: 'sa01', leagueId: 'sa20', name: 'Sunrisers Eastern Cape', shortName: 'SEC', city: 'Gqeberha',
    primaryColor: '#F26522', secondaryColor: '#000000', accentColor: '#F26522',
    gradient: ['#F26522', '#ED1C24'], logoEmoji: '🦅', logo: require('../assets/logos/sa20/sec.png'),
    jerseyPattern: 'Orange and Black', purse: 1000, maxPlayers: 18, playerIds: [], titles: 2,
  },
  {
    id: 'sa02', leagueId: 'sa20', name: 'Pretoria Capitals', shortName: 'PC', city: 'Pretoria',
    primaryColor: '#005AC7', secondaryColor: '#FFFFFF', accentColor: '#005AC7',
    gradient: ['#005AC7', '#003A94'], logoEmoji: '🏛️', logo: require('../assets/logos/sa20/pc.png'),
    jerseyPattern: 'Blue and White', purse: 1000, maxPlayers: 18, playerIds: [],
  },
  {
    id: 'sa03', leagueId: 'sa20', name: 'MI Cape Town', shortName: 'MICT', city: 'Cape Town',
    primaryColor: '#004BA0', secondaryColor: '#D11D25', accentColor: '#B3995D',
    gradient: ['#004BA0', '#002B5C'], logoEmoji: '🌀', logo: require('../assets/logos/sa20/mict.png'),
    jerseyPattern: 'Blue and Gold', purse: 1000, maxPlayers: 18, playerIds: [],
  },
  {
    id: 'sa04', leagueId: 'sa20', name: 'Joburg Super Kings', shortName: 'JSK', city: 'Johannesburg',
    primaryColor: '#FDB913', secondaryColor: '#0060A8', accentColor: '#FDB913',
    gradient: ['#FDB913', '#F8981D'], logoEmoji: '🦁', logo: require('../assets/logos/sa20/jsk.png'),
    jerseyPattern: 'Yellow and Blue', purse: 1000, maxPlayers: 18, playerIds: [],
  },
  {
    id: 'sa05', leagueId: 'sa20', name: 'Durban\'s Super Giants', shortName: 'DSG', city: 'Durban',
    primaryColor: '#0058A3', secondaryColor: '#E97103', accentColor: '#0058A3',
    gradient: ['#0058A3', '#003A94'], logoEmoji: '🌊', logo: require('../assets/logos/sa20/dsg.png'),
    jerseyPattern: 'Blue and Orange', purse: 1000, maxPlayers: 18, playerIds: [],
  },
  {
    id: 'sa06', leagueId: 'sa20', name: 'Paarl Royals', shortName: 'PR', city: 'Paarl',
    primaryColor: '#EA1A85', secondaryColor: '#004B99', accentColor: '#EA1A85',
    gradient: ['#EA1A85', '#004B99'], logoEmoji: '👑', logo: require('../assets/logos/sa20/pr.png'),
    jerseyPattern: 'Pink and Blue', purse: 1000, maxPlayers: 18, playerIds: [],
  },

  // BBL Teams
  {
    id: 'bbl01', leagueId: 'bbl', name: 'Adelaide Strikers', shortName: 'AS', city: 'Adelaide',
    primaryColor: '#00AAE5', secondaryColor: '#000000', accentColor: '#00AAE5',
    gradient: ['#00AAE5', '#0088CC'], logoEmoji: '⚡', logo: require('../assets/logos/bbl/as.png'),
    jerseyPattern: 'Blue and White', purse: 1000, maxPlayers: 18, playerIds: [],
  },
  {
    id: 'bbl02', leagueId: 'bbl', name: 'Brisbane Heat', shortName: 'BH', city: 'Brisbane',
    primaryColor: '#00A19A', secondaryColor: '#000000', accentColor: '#00A19A',
    gradient: ['#00A19A', '#007A74'], logoEmoji: '🔥', logo: require('../assets/logos/bbl/bh.png'),
    jerseyPattern: 'Teal and Black', purse: 1000, maxPlayers: 18, playerIds: [],
  },
  {
    id: 'bbl03', leagueId: 'bbl', name: 'Hobart Hurricanes', shortName: 'HH', city: 'Hobart',
    primaryColor: '#602D91', secondaryColor: '#FFFFFF', accentColor: '#602D91',
    gradient: ['#602D91', '#4A1D70'], logoEmoji: '🌪️', logo: require('../assets/logos/bbl/hh.png'),
    jerseyPattern: 'Purple and White', purse: 1000, maxPlayers: 18, playerIds: [],
  },
  {
    id: 'bbl04', leagueId: 'bbl', name: 'Melbourne Renegades', shortName: 'MR', city: 'Melbourne',
    primaryColor: '#E20613', secondaryColor: '#000000', accentColor: '#E20613',
    gradient: ['#E20613', '#B3050F'], logoEmoji: '🕵️', logo: require('../assets/logos/bbl/mr.png'),
    jerseyPattern: 'Red and Black', purse: 1000, maxPlayers: 18, playerIds: [],
  },
  {
    id: 'bbl05', leagueId: 'bbl', name: 'Melbourne Stars', shortName: 'MS', city: 'Melbourne',
    primaryColor: '#00A651', secondaryColor: '#FFFFFF', accentColor: '#00A651',
    gradient: ['#00A651', '#007F3E'], logoEmoji: '⭐', logo: require('../assets/logos/bbl/ms.png'),
    jerseyPattern: 'Green and White', purse: 1000, maxPlayers: 18, playerIds: [],
  },
  {
    id: 'bbl06', leagueId: 'bbl', name: 'Perth Scorchers', shortName: 'PS', city: 'Perth',
    primaryColor: '#F58220', secondaryColor: '#000000', accentColor: '#F58220',
    gradient: ['#F58220', '#E56210'], logoEmoji: '🔥', logo: require('../assets/logos/bbl/ps.png'),
    jerseyPattern: 'Orange and Black', purse: 1000, maxPlayers: 18, playerIds: [],
  },
  {
    id: 'bbl07', leagueId: 'bbl', name: 'Sydney Sixers', shortName: 'SS', city: 'Sydney',
    primaryColor: '#E6248C', secondaryColor: '#000000', accentColor: '#E6248C',
    gradient: ['#E6248C', '#C41E7A'], logoEmoji: '6️⃣', logo: require('../assets/logos/bbl/ss.png'),
    jerseyPattern: 'Magenta and Black', purse: 1000, maxPlayers: 18, playerIds: [],
  },
  {
    id: 'bbl08', leagueId: 'bbl', name: 'Sydney Thunder', shortName: 'ST', city: 'Sydney',
    primaryColor: '#B2DA24', secondaryColor: '#1A1A1A', accentColor: '#B2DA24',
    gradient: ['#B2DA24', '#96B81E'], logoEmoji: '⚡', logo: require('../assets/logos/bbl/st.png'),
    jerseyPattern: 'Lime and Black', purse: 1000, maxPlayers: 18, playerIds: [],
  },

  // The Hundred Teams
  {
    id: 'h01', leagueId: 'hundred', name: 'Birmingham Phoenix', shortName: 'BPH', city: 'Birmingham',
    primaryColor: '#F15A24', secondaryColor: '#00B4FF', accentColor: '#F15A24',
    gradient: ['#F15A24', '#D14A1F'], logoEmoji: '🔥', logo: require('../assets/logos/hundred/bph.png'),
    jerseyPattern: 'Orange and Blue', purse: 1000, maxPlayers: 15, playerIds: [],
  },
  {
    id: 'h02', leagueId: 'hundred', name: 'London Spirit', shortName: 'LNS', city: 'London',
    primaryColor: '#002E5D', secondaryColor: '#FFFFFF', accentColor: '#002E5D',
    gradient: ['#002E5D', '#001E3D'], logoEmoji: '👻', logo: require('../assets/logos/hundred/lns.png'),
    jerseyPattern: 'Navy and White', purse: 1000, maxPlayers: 15, playerIds: [],
  },
  {
    id: 'h03', leagueId: 'hundred', name: 'Manchester Originals', shortName: 'MOR', city: 'Manchester',
    primaryColor: '#1A1A1A', secondaryColor: '#FFFFFF', accentColor: '#1A1A1A',
    gradient: ['#1A1A1A', '#000000'], logoEmoji: '🐝', logo: require('../assets/logos/hundred/mor.png'),
    jerseyPattern: 'Black and White', purse: 1000, maxPlayers: 15, playerIds: [],
  },
  {
    id: 'h04', leagueId: 'hundred', name: 'Northern Superchargers', shortName: 'NSC', city: 'Leeds',
    primaryColor: '#6F263D', secondaryColor: '#FFFFFF', accentColor: '#6F263D',
    gradient: ['#6F263D', '#5A1E31'], logoEmoji: '⚡', logo: require('../assets/logos/hundred/nsc.png'),
    jerseyPattern: 'Maroon and White', purse: 1000, maxPlayers: 15, playerIds: [],
  },
  {
    id: 'h05', leagueId: 'hundred', name: 'Oval Invincibles', shortName: 'OVI', city: 'London',
    primaryColor: '#00A695', secondaryColor: '#1A1A1A', accentColor: '#00A695',
    gradient: ['#00A695', '#008779'], logoEmoji: '🛡️', logo: require('../assets/logos/hundred/ovi.png'),
    jerseyPattern: 'Teal and Black', purse: 1000, maxPlayers: 15, playerIds: [],
  },
  {
    id: 'h06', leagueId: 'hundred', name: 'Southern Brave', shortName: 'SOB', city: 'Southampton',
    primaryColor: '#BADA55', secondaryColor: '#1A1A1A', accentColor: '#BADA55',
    gradient: ['#BADA55', '#9BB546'], logoEmoji: '🦁', logo: require('../assets/logos/hundred/sob.png'),
    jerseyPattern: 'Neon Green and Black', purse: 1000, maxPlayers: 15, playerIds: [],
  },
  {
    id: 'h07', leagueId: 'hundred', name: 'Trent Rockets', shortName: 'TRT', city: 'Nottingham',
    primaryColor: '#FFD700', secondaryColor: '#000000', accentColor: '#FFD700',
    gradient: ['#FFD700', '#E6C200'], logoEmoji: '🚀', logo: require('../assets/logos/hundred/trt.png'),
    jerseyPattern: 'Yellow and Black', purse: 1000, maxPlayers: 15, playerIds: [],
  },
  {
    id: 'h08', leagueId: 'hundred', name: 'Welsh Fire', shortName: 'WEF', city: 'Cardiff',
    primaryColor: '#E20613', secondaryColor: '#FFFFFF', accentColor: '#E20613',
    gradient: ['#E20613', '#B3050F'], logoEmoji: '🐉', logo: require('../assets/logos/hundred/wef.png'),
    jerseyPattern: 'Red and White', purse: 1000, maxPlayers: 15, playerIds: [],
  },

  // LPL Teams
  {
    id: 'lp01', leagueId: 'lpl', name: 'Colombo Strikers', shortName: 'CS', city: 'Colombo',
    primaryColor: '#FDB913', secondaryColor: '#E20613', accentColor: '#FDB913',
    gradient: ['#FDB913', '#F8981D'], logoEmoji: '🌩️', logo: require('../assets/logos/lpl/cs.png'),
    jerseyPattern: 'Yellow and Red', purse: 1000, maxPlayers: 20, playerIds: [],
  },
  {
    id: 'lp02', leagueId: 'lpl', name: 'Dambulla Sixers', shortName: 'DS', city: 'Dambulla',
    primaryColor: '#00A651', secondaryColor: '#FFFFFF', accentColor: '#00A651',
    gradient: ['#00A651', '#007F3E'], logoEmoji: '6️⃣', logo: require('../assets/logos/lpl/ds.png'),
    jerseyPattern: 'Green and White', purse: 1000, maxPlayers: 20, playerIds: [],
  },
  {
    id: 'lp03', leagueId: 'lpl', name: 'Galle Marvels', shortName: 'GM', city: 'Galle',
    primaryColor: '#005AC7', secondaryColor: '#FDB913', accentColor: '#005AC7',
    gradient: ['#005AC7', '#003A94'], logoEmoji: '🌊', logo: require('../assets/logos/lpl/gm.png'),
    jerseyPattern: 'Blue and Gold', purse: 1000, maxPlayers: 20, playerIds: [],
  },
  {
    id: 'lp04', leagueId: 'lpl', name: 'Jaffna Stallions', shortName: 'JS', city: 'Jaffna',
    primaryColor: '#6B2B2B', secondaryColor: '#FFFFFF', accentColor: '#6B2B2B',
    gradient: ['#6B2B2B', '#5A2424'], logoEmoji: '🐎', logo: require('../assets/logos/lpl/js.png'),
    jerseyPattern: 'Maroon and White', purse: 1000, maxPlayers: 20, playerIds: [],
  },
  {
    id: 'lp05', leagueId: 'lpl', name: 'Kandy Falcons', shortName: 'KF', city: 'Kandy',
    primaryColor: '#F15A24', secondaryColor: '#1A1A1A', accentColor: '#F15A24',
    gradient: ['#F15A24', '#D14A1F'], logoEmoji: '🦅', logo: require('../assets/logos/lpl/kf.png'),
    jerseyPattern: 'Orange and Black', purse: 1000, maxPlayers: 20, playerIds: [],
  },

  // Abu Dhabi T10 Teams
  {
    id: 't10_01', leagueId: 't10', name: 'Deccan Gladiators', shortName: 'DG', city: 'Abu Dhabi',
    primaryColor: '#1A1A1A', secondaryColor: '#FFD700', accentColor: '#1A1A1A',
    gradient: ['#1A1A1A', '#000000'], logoEmoji: '⚔️', logo: require('../assets/logos/t10/dg.png'),
    jerseyPattern: 'Black and Gold', purse: 500, maxPlayers: 15, playerIds: [],
  },
  {
    id: 't10_02', leagueId: 't10', name: 'Delhi Bulls', shortName: 'DB', city: 'Abu Dhabi',
    primaryColor: '#E20613', secondaryColor: '#000000', accentColor: '#E20613',
    gradient: ['#E20613', '#B3050F'], logoEmoji: '🐂', logo: require('../assets/logos/t10_gen.png'),
    jerseyPattern: 'Red and Black', purse: 500, maxPlayers: 15, playerIds: [],
  },
  {
    id: 't10_03', leagueId: 't10', name: 'New York Warriors', shortName: 'NYW', city: 'Abu Dhabi',
    primaryColor: '#002E5D', secondaryColor: '#EF4123', accentColor: '#002E5D',
    gradient: ['#002E5D', '#001E3D'], logoEmoji: '🗽', logo: require('../assets/logos/t10_gen.png'),
    jerseyPattern: 'Blue and Red', purse: 500, maxPlayers: 15, playerIds: [],
  },
  {
    id: 't10_04', leagueId: 't10', name: 'Morrisville Samp Army', shortName: 'MSA', city: 'Abu Dhabi',
    primaryColor: '#BADA55', secondaryColor: '#1A1A1A', accentColor: '#BADA55',
    gradient: ['#BADA55', '#9BB546'], logoEmoji: '🐍', logo: require('../assets/logos/t10_gen.png'),
    jerseyPattern: 'Green and Black', purse: 500, maxPlayers: 15, playerIds: [],
  },
  {
    id: 't10_05', leagueId: 't10', name: 'Northern Warriors', shortName: 'NW', city: 'Abu Dhabi',
    primaryColor: '#6F263D', secondaryColor: '#FFD700', accentColor: '#6F263D',
    gradient: ['#6F263D', '#5A1E31'], logoEmoji: '⚔️', logo: require('../assets/logos/t10_gen.png'),
    jerseyPattern: 'Maroon and Gold', purse: 500, maxPlayers: 15, playerIds: [],
  },
  {
    id: 't10_06', leagueId: 't10', name: 'Team Abu Dhabi', shortName: 'TAD', city: 'Abu Dhabi',
    primaryColor: '#00A695', secondaryColor: '#FFFFFF', accentColor: '#00A695',
    gradient: ['#00A695', '#008779'], logoEmoji: '🏙️', logo: require('../assets/logos/t10_gen.png'),
    jerseyPattern: 'Teal and White', purse: 500, maxPlayers: 15, playerIds: [],
  },
  {
    id: 't10_07', leagueId: 't10', name: 'Chennai Braves', shortName: 'CB', city: 'Abu Dhabi',
    primaryColor: '#FDB913', secondaryColor: '#1A1A1A', accentColor: '#FDB913',
    gradient: ['#FDB913', '#F8981D'], logoEmoji: '🦁', logo: require('../assets/logos/t10_gen.png'),
    jerseyPattern: 'Yellow and Black', purse: 500, maxPlayers: 15, playerIds: [],
  },
  {
    id: 't10_08', leagueId: 't10', name: 'Bangla Tigers', shortName: 'BT', city: 'Abu Dhabi',
    primaryColor: '#DD1F2D', secondaryColor: '#006A4E', accentColor: '#DD1F2D',
    gradient: ['#DD1F2D', '#A11E22'], logoEmoji: '🐯', logo: require('../assets/logos/t10_gen.png'),
    jerseyPattern: 'Red and Green', purse: 500, maxPlayers: 15, playerIds: [],
  },
  {
    id: 't10_09', leagueId: 't10', name: 'Ajman Bolts', shortName: 'AB', city: 'Abu Dhabi',
    primaryColor: '#00AAE5', secondaryColor: '#1A1A1A', accentColor: '#00AAE5',
    gradient: ['#00AAE5', '#0088CC'], logoEmoji: '⚡', logo: require('../assets/logos/t10_gen.png'),
    jerseyPattern: 'Blue and Black', purse: 500, maxPlayers: 15, playerIds: [],
  },
  {
    id: 't10_10', leagueId: 't10', name: 'UP Nawabs', shortName: 'UPN', city: 'Abu Dhabi',
    primaryColor: '#602D91', secondaryColor: '#FFD700', accentColor: '#602D91',
    gradient: ['#602D91', '#4A1D70'], logoEmoji: '👑', logo: require('../assets/logos/t10_gen.png'),
    jerseyPattern: 'Purple and Gold', purse: 500, maxPlayers: 15, playerIds: [],
  },
];

export default FRANCHISES;
