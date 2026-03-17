import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setLeague } from '../store/slices/auctionSlice';
import { generateSchedule, generatePlayoffs, resetTournament, updateMatchResult } from '../store/slices/tournamentSlice';
import { initMatch } from '../store/slices/scoringSlice';
import { LEAGUES, FRANCHISES, Franchise } from '../data/franchises';
import Colors from '../theme/colors';
import ScoringScreen from './ScoringScreen';

const { width } = Dimensions.get('window');

const LeagueScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedLeagueId = useAppSelector(state => state.auction.selectedLeagueId);
  const { matches, pointsTable } = useAppSelector(state => state.tournament);
  
  const [viewMode, setViewMode] = useState<'list' | 'details' | 'scoring'>('list');
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

  const activeLeague = useMemo(() => LEAGUES.find(l => l.id === selectedLeagueId), [selectedLeagueId]);
  const leagueFranchises = useMemo(() => FRANCHISES.filter(f => f.leagueId === selectedLeagueId), [selectedLeagueId]);

  const handleSelectLeague = (leagueId: string) => {
    dispatch(setLeague(leagueId));
    setViewMode('details');
    // Default select all teams
    const allIds = FRANCHISES.filter(f => f.leagueId === leagueId).map(f => f.id);
    setSelectedTeams(allIds);
  };

  const toggleTeam = (teamId: string) => {
    if (selectedTeams.includes(teamId)) {
      setSelectedTeams(selectedTeams.filter(id => id !== teamId));
    } else {
      setSelectedTeams([...selectedTeams, teamId]);
    }
  };

  const handleGenerateMatches = () => {
    if (selectedTeams.length < 2) return;
    dispatch(generateSchedule({ teamIds: selectedTeams, rounds: 2 }));
  };

  const handleSimulateSeason = () => {
    matches.forEach(m => {
      if (m.status === 'upcoming') {
        const homeScore = Math.floor(Math.random() * 200) + 50;
        const awayScore = Math.floor(Math.random() * 200) + 50;
        const winnerId = homeScore > awayScore ? m.homeTeamId : (homeScore < awayScore ? m.awayTeamId : 'draw');
        dispatch(updateMatchResult({
          matchId: m.id,
          winnerId,
          homeScore: `${homeScore}/5`,
          awayScore: `${awayScore}/7`,
        }));
      }
    });
  };

  const handleGeneratePlayoffs = () => {
    dispatch(generatePlayoffs());
  };

  const handleStartScoring = (matchId: string, homeId: string, awayId: string) => {
    dispatch(initMatch({ matchId, homeTeamId: homeId, awayTeamId: awayId }));
    setViewMode('scoring');
  };

  const isRegularPhaseFinished = useMemo(() => {
    const regularMatches = matches.filter(m => m.matchType === 'regular');
    return regularMatches.length > 0 && regularMatches.every(m => m.status === 'completed');
  }, [matches]);

  const playoffMatches = useMemo(() => matches.filter(m => m.matchType === 'playoff'), [matches]);

  const renderDisclaimer = () => {
    const teamCount = pointsTable.length;
    return (
      <View style={styles.disclaimerBox}>
        <Text style={styles.disclaimerTitle}>🏆 TOURNAMENT PLAYOFF RULES</Text>
        {teamCount === 3 ? (
          <Text style={styles.disclaimerText}>
            • Points table 1st team direct to Final.{"\n"}
            • 2nd team vs 3rd team will play Semi Final.{"\n"}
            • Semi Final Winner vs 1st team will play the Final Match.
          </Text>
        ) : teamCount >= 4 ? (
          <Text style={styles.disclaimerText}>
            • 1st vs 2nd will play Semi Final 1 (Winner to Final, Loser to SF2).{"\n"}
            • 3rd vs 4th will play Eliminator (Winner to SF2, Loser Out).{"\n"}
            • SF1 Loser vs Eliminator Winner will play Semi Final 2.{"\n"}
            • SF1 Winner vs SF2 Winner will play the Final Match.
          </Text>
        ) : null}
      </View>
    );
  };

  const renderPointsTable = () => {
    const sortedTable = [...pointsTable].sort((a, b) => b.points - a.points || b.nrr - a.nrr);
    return (
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHead, { flex: 2 }]}>TEAM</Text>
          <Text style={styles.tableHead}>P</Text>
          <Text style={styles.tableHead}>W</Text>
          <Text style={styles.tableHead}>L</Text>
          <Text style={styles.tableHead}>PTS</Text>
        </View>
        {sortedTable.map((row, index) => {
          const team = FRANCHISES.find(f => f.id === row.teamId);
          return (
            <View key={row.teamId} style={[styles.tableRow, index % 2 === 0 && { backgroundColor: Colors.card }]}>
              <View style={[styles.teamCell, { flex: 2 }]}>
                 <View style={[styles.teamDot, { backgroundColor: team?.primaryColor }]} />
                 <Text style={styles.teamCellText}>{team?.shortName}</Text>
              </View>
              <Text style={styles.rowText}>{row.played}</Text>
              <Text style={styles.rowText}>{row.won}</Text>
              <Text style={styles.rowText}>{row.lost}</Text>
              <Text style={[styles.rowText, { color: Colors.primary, fontWeight: '900' }]}>{row.points}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  const [showCustomizer, setShowCustomizer] = useState(false);

  if (viewMode === 'scoring') {
    return <ScoringScreen onBack={() => setViewMode('details')} />;
  }

  if (viewMode === 'details' && activeLeague) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={activeLeague.color} />
        
        {/* Header */}
        <View style={[styles.detailHeader, { backgroundColor: activeLeague.color }]}>
           <View style={styles.headerRow}>
              <TouchableOpacity onPress={() => setViewMode('list')} style={styles.iconBtn}>
                 <Text style={styles.iconBtnText}>✕</Text>
              </TouchableOpacity>
              <View style={styles.headerTitles}>
                 <Text style={styles.detailTitle}>{activeLeague.shortName} ARENA</Text>
                 <Text style={styles.detailSub}>STANDINGS & FIXTURES</Text>
              </View>
              <TouchableOpacity onPress={() => setShowCustomizer(!showCustomizer)} style={[styles.iconBtn, showCustomizer && { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
                 <Text style={styles.iconBtnText}>⚙️</Text>
              </TouchableOpacity>
           </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Points Table Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
               <Text style={styles.sectionLabel}>LEAGUE STANDINGS</Text>
               <View style={styles.liveBadge}>
                  <View style={styles.liveDot} />
                  <Text style={styles.liveText}>LIVE</Text>
               </View>
            </View>
            {pointsTable.length > 0 ? (
               renderPointsTable()
            ) : (
              <View style={styles.emptyTable}>
                 <Text style={styles.emptyText}>No tournament active. Click the ⚙️ icon to set up teams and generate matches.</Text>
              </View>
            )}
          </View>

          {/* Customizer Section (Conditional) */}
          {(showCustomizer || matches.length === 0) && (
            <View style={[styles.section, styles.customizerCard]}>
              <Text style={styles.sectionLabel}>MANAGE LEAGUE TEAMS</Text>
              <Text style={styles.sectionSubtitle}>Select participating franchises</Text>
              
              <View style={styles.teamGrid}>
                 {leagueFranchises.map(f => {
                   const isSelected = selectedTeams.includes(f.id);
                   return (
                     <TouchableOpacity 
                      key={f.id} 
                      onPress={() => toggleTeam(f.id)}
                      style={[
                        styles.teamChip, 
                        isSelected && { borderColor: activeLeague.color, backgroundColor: activeLeague.color + '15' }
                      ]}
                     >
                       <Text style={[styles.teamChipText, isSelected && { color: Colors.textPrimary }]}>
                         {f.shortName}
                       </Text>
                       {isSelected && <View style={[styles.checkDot, { backgroundColor: activeLeague.color }]} />}
                     </TouchableOpacity>
                   );
                 })}
              </View>

              <TouchableOpacity 
                onPress={() => { handleGenerateMatches(); setShowCustomizer(false); }}
                style={[styles.primaryBtn, { backgroundColor: activeLeague.color }]}
              >
                 <Text style={styles.primaryBtnText}>RE-GENERATE FIXTURES</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={handleSimulateSeason}
                style={[styles.primaryBtn, { backgroundColor: Colors.surfaceVariant, marginTop: 10, borderColor: Colors.border, borderWidth: 1 }]}
              >
                 <Text style={[styles.primaryBtnText, { color: Colors.textSecondary }]}>AUTO-PLAY SEASON</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Playoffs Section */}
          {isRegularPhaseFinished && (
            <View style={styles.section}>
               {renderDisclaimer()}
               {playoffMatches.length === 0 ? (
                 <TouchableOpacity 
                  onPress={handleGeneratePlayoffs}
                  style={[styles.primaryBtn, { backgroundColor: Colors.secondary, marginTop: 15 }]}
                 >
                    <Text style={styles.primaryBtnText}>GENERATE PLAYOFF MATCHES</Text>
                 </TouchableOpacity>
               ) : (
                <View style={[styles.matchList, { marginTop: 15 }]}>
                   <Text style={[styles.sectionLabel, { color: Colors.primary }]}>PLAYOFF FIXTURES</Text>
                   {playoffMatches.map(m => {
                      const home = FRANCHISES.find(f => f.id === m.homeTeamId);
                      const away = FRANCHISES.find(f => f.id === m.awayTeamId);
                      return (
                        <TouchableOpacity 
                          key={m.id} 
                          style={styles.matchCardHorizontal}
                          onPress={() => m.status === 'upcoming' && handleStartScoring(m.id, m.homeTeamId, m.awayTeamId)}
                        >
                           <View style={styles.playoffHeader}>
                              <Text style={styles.playoffTitle}>{m.matchTitle}</Text>
                              {m.matchSubTitle && <Text style={styles.playoffSub}>{m.matchSubTitle}</Text>}
                           </View>
                           <View style={[styles.mSide, { borderRightWidth: 1, borderRightColor: Colors.border }]}>
                              <Text style={styles.mTeam} numberOfLines={1}>{home?.shortName}</Text>
                              {m.status === 'completed' && <Text style={styles.mScore}>{m.homeScore}</Text>}
                           </View>
                           <View style={styles.mVs}>
                              <Text style={styles.vsText}>{m.status === 'completed' ? 'FT' : 'VS'}</Text>
                           </View>
                           <View style={styles.mSide}>
                              <Text style={styles.mTeam} numberOfLines={1}>{away?.shortName}</Text>
                              {m.status === 'completed' && <Text style={styles.mScore}>{m.awayScore}</Text>}
                           </View>
                           {m.status === 'upcoming' && (
                             <View style={styles.scoreTag}>
                                <Text style={styles.scoreTagText}>SCORE</Text>
                             </View>
                           )}
                        </TouchableOpacity>
                      );
                   })}
                </View>
               )}
            </View>
          )}

          {/* Upcoming Regular Matches */}
          {matches.filter(m => m.matchType === 'regular').length > 0 && !isRegularPhaseFinished && (
            <View style={styles.section}>
               <Text style={styles.sectionLabel}>MATCH SCHEDULE (REGULAR SEASON)</Text>
                <ScrollView 
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.horizontalScrollContent}
                >
                  {Array.from({ length: Math.ceil(matches.length / 5) }, (_, i) => (
                    <View key={i} style={styles.matchPage}>
                      {matches.slice(i * 5, (i + 1) * 5).map(m => {
                        const home = FRANCHISES.find(f => f.id === m.homeTeamId);
                        const away = FRANCHISES.find(f => f.id === m.awayTeamId);
                        return (
                          <TouchableOpacity 
                            key={m.id} 
                            style={styles.matchCardHorizontal}
                            onPress={() => m.status === 'upcoming' && handleStartScoring(m.id, m.homeTeamId, m.awayTeamId)}
                          >
                             <View style={[styles.mSide, { borderRightWidth: 1, borderRightColor: Colors.border }]}>
                                <Text style={styles.mTeam} numberOfLines={1}>{home?.shortName}</Text>
                                {m.status === 'completed' && <Text style={styles.mScore}>{m.homeScore}</Text>}
                             </View>
                             <View style={styles.mVs}>
                                <Text style={styles.vsText}>{m.status === 'completed' ? 'FT' : 'VS'}</Text>
                             </View>
                             <View style={styles.mSide}>
                                <Text style={styles.mTeam} numberOfLines={1}>{away?.shortName}</Text>
                                {m.status === 'completed' && <Text style={styles.mScore}>{m.awayScore}</Text>}
                             </View>
                             {m.status === 'upcoming' && (
                               <View style={styles.scoreTag}>
                                  <Text style={styles.scoreTagText}>SCORE</Text>
                               </View>
                             )}
                          </TouchableOpacity>
                        );
                      })}
                      {/* Empty slots to maintain page height if needed */}
                      {matches.slice(i * 5, (i + 1) * 5).length < 5 && 
                         Array.from({ length: 5 - matches.slice(i * 5, (i + 1) * 5).length }).map((_, j) => (
                           <View key={`empty-${j}`} style={[styles.matchCardHorizontal, { opacity: 0 }]} />
                         ))
                      }
                    </View>
                  ))}
                </ScrollView>
                <View style={styles.paginationDots}>
                   {Array.from({ length: Math.ceil(matches.length / 5) }).map((_, i) => (
                     <View key={i} style={styles.pageDot} />
                   ))}
                </View>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      <View style={styles.topOrb} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>CHOOSE ARENA</Text>
        <Text style={styles.headerSubtitle}>Select a league to customize and view standings</Text>
      </View>

      <FlatList
        data={LEAGUES}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isSelected = selectedLeagueId === item.id;
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.leagueCard,
                { borderColor: isSelected ? item.color : Colors.border },
                isSelected && { backgroundColor: item.color + '05' }
              ]}
              onPress={() => handleSelectLeague(item.id)}
            >
              {isSelected && <View style={[styles.selectIndicator, { backgroundColor: item.color }]} />}
              
              <View style={[styles.logoContainer, { backgroundColor: item.color + '15' }]}>
                {item.logo ? (
                  <Image source={item.logo} style={styles.logo} />
                ) : (
                  <Text style={styles.placeholderLogo}>🏏</Text>
                )}
              </View>

              <View style={styles.info}>
                <Text style={[styles.leagueName, isSelected && { color: item.color }]}>
                  {item.name}
                </Text>
                <View style={styles.formatBadge}>
                  <Text style={styles.leagueShort}>
                    {item.shortName} • {item.id === 't10' ? '10 OVERS' : item.id === 'hundred' ? '100 BALLS' : 'T20 FORMAT'}
                  </Text>
                </View>
              </View>

              <View style={[styles.actionIndicator, isSelected && { backgroundColor: item.color }]}>
                 <Text style={[styles.indicatorText, { color: isSelected ? '#000' : Colors.textMuted }]}>
                   {isSelected ? 'OPEN' : 'ENTER'}
                 </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topOrb: {
    position: 'absolute', top: -150, left: -100, width: 300, height: 300, borderRadius: 150, backgroundColor: Colors.secondary + '05',
  },
  header: { paddingHorizontal: 25, paddingTop: 40, paddingBottom: 15 },
  headerTitle: { fontSize: 28, fontWeight: '900', color: Colors.textPrimary, letterSpacing: 4 },
  headerSubtitle: { fontSize: 12, color: Colors.textSecondary, marginTop: 6, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  listContent: { padding: 16, paddingBottom: 40 },
  leagueCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.card, borderRadius: 20, padding: 18, marginBottom: 16, borderWidth: 1, overflow: 'hidden', elevation: 8,
  },
  selectIndicator: { position: 'absolute', left: 0, top: 20, bottom: 20, width: 4, borderRadius: 2 },
  logoContainer: { width: 70, height: 70, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginRight: 18 },
  logo: { width: 55, height: 55, resizeMode: 'contain' },
  placeholderLogo: { fontSize: 32 },
  info: { flex: 1 },
  leagueName: { fontSize: 18, fontWeight: '900', color: Colors.textPrimary },
  formatBadge: { marginTop: 4 },
  leagueShort: { fontSize: 10, color: Colors.textMuted, fontWeight: '800' },
  actionIndicator: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, backgroundColor: Colors.surfaceVariant, minWidth: 70, alignItems: 'center' },
  indicatorText: { fontSize: 10, fontWeight: '900' },

  // Detail View Styles
  detailHeader: { padding: 25, paddingTop: 60, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  backBtn: { alignSelf: 'flex-start', marginBottom: 15, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 10 },
  backText: { color: '#fff', fontSize: 10, fontWeight: '900' },
  detailTitle: { fontSize: 24, fontWeight: '900', color: '#fff' },
  detailSub: { fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: '700', marginTop: 4 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitles: { flex: 1, marginLeft: 15 },
  iconBtn: { padding: 10, borderRadius: 12, backgroundColor: 'rgba(0,0,0,0.2)' },
  iconBtnText: { fontSize: 18, color: '#fff' },
  
  scrollContent: { padding: 20, paddingBottom: 40 },
  section: { marginBottom: 30 },
  sectionLabel: { fontSize: 10, fontWeight: '900', color: Colors.textMuted, letterSpacing: 2, marginBottom: 12 },
  sectionSubtitle: { fontSize: 11, color: Colors.textSecondary, marginBottom: 15 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  liveBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.danger + '22', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.danger, marginRight: 6 },
  liveText: { fontSize: 10, fontWeight: '900', color: Colors.danger },
  customizerCard: { backgroundColor: Colors.card, padding: 20, borderRadius: 24, borderStyle: 'dashed', borderWidth: 1, borderColor: Colors.border },
  
  teamGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  teamChip: { 
    paddingHorizontal: 15, paddingVertical: 10, borderRadius: 12, backgroundColor: Colors.card, 
    borderWidth: 1, borderColor: Colors.border, flexDirection: 'row', alignItems: 'center', gap: 8 
  },
  teamChipText: { fontSize: 12, fontWeight: '800', color: Colors.textMuted },
  checkDot: { width: 8, height: 8, borderRadius: 4 },
  
  primaryBtn: { padding: 18, borderRadius: 15, alignItems: 'center', elevation: 5 },
  primaryBtnText: { color: '#000', fontWeight: '900', fontSize: 13, letterSpacing: 1 },

  tableContainer: { backgroundColor: Colors.card, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: Colors.border },
  tableHeader: { flexDirection: 'row', padding: 15, backgroundColor: Colors.surfaceVariant },
  tableHead: { flex: 1, fontSize: 10, fontWeight: '900', color: Colors.textMuted, textAlign: 'center' },
  tableRow: { flexDirection: 'row', padding: 15, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: Colors.border + '11' },
  teamCell: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  teamDot: { width: 6, height: 6, borderRadius: 3 },
  teamCellText: { fontSize: 13, fontWeight: '900', color: Colors.textPrimary },
  rowText: { flex: 1, fontSize: 12, fontWeight: '700', color: Colors.textSecondary, textAlign: 'center' },
  
  emptyTable: { padding: 30, alignItems: 'center', backgroundColor: Colors.card, borderRadius: 20, borderStyle: 'dashed', borderWidth: 1, borderColor: Colors.border },
  emptyText: { fontSize: 12, color: Colors.textMuted, textAlign: 'center', lineHeight: 18 },
  
  matchList: { gap: 10, paddingBottom: 10 },
  horizontalScrollContent: { paddingVertical: 10 },
  matchPage: { width: width - 40, paddingRight: 10 },
  matchCardHorizontal: { 
    flexDirection: 'row', 
    backgroundColor: Colors.card, 
    borderRadius: 15, 
    overflow: 'hidden', 
    borderWidth: 1, 
    borderColor: Colors.border, 
    position: 'relative',
    height: 70,
    marginBottom: 8
  },
  paginationDots: { flexDirection: 'row', justifyContent: 'center', marginTop: 10, gap: 6 },
  pageDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.border },
  mSide: { flex: 1, padding: 10, alignItems: 'center', justifyContent: 'center' },
  mTeam: { fontSize: 13, fontWeight: '900', color: Colors.textPrimary },
  mScore: { fontSize: 9, fontWeight: '800', color: Colors.primary, marginTop: 4 },
  mVs: { paddingHorizontal: 12, justifyContent: 'center', backgroundColor: Colors.surfaceVariant },
  vsText: { fontSize: 9, fontWeight: '900', color: Colors.textMuted },
  scoreTag: { position: 'absolute', top: 4, right: 4, backgroundColor: Colors.primary, paddingHorizontal: 5, paddingVertical: 2, borderRadius: 4 },
  scoreTagText: { fontSize: 7, fontWeight: '900', color: '#000' },
  moreText: { textAlign: 'center', fontSize: 11, color: Colors.textMuted, marginTop: 10, fontWeight: '700' },
  disclaimerBox: { backgroundColor: '#1A1A1A', padding: 20, borderRadius: 20, borderLeftWidth: 4, borderLeftColor: Colors.secondary },
  disclaimerTitle: { fontSize: 12, fontWeight: '900', color: Colors.secondary, marginBottom: 10 },
  disclaimerText: { fontSize: 11, color: Colors.textSecondary, lineHeight: 18, fontWeight: '700' },
  playoffHeader: { position: 'absolute', top: 0, left: 0, width: '100%', height: 24, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' },
  playoffTitle: { fontSize: 8, fontWeight: '900', color: Colors.primary, letterSpacing: 1 },
  playoffSub: { fontSize: 6, fontWeight: '700', color: Colors.textMuted, marginTop: 1 },
});

export default LeagueScreen;
