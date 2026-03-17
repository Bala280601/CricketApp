import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, Dimensions } from 'react-native';
import Colors, { TierColors } from '../theme/colors';
import { useAppSelector } from '../store/hooks';
import { Player } from '../data/players';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const { players, soldPlayers, unsoldPlayers, franchises, isAuctionStarted, isAuctionComplete } = useAppSelector(s => s.auction);

  const topBid = soldPlayers.reduce((top, p) => (!top || (p.soldPrice ?? 0) > (top.soldPrice ?? 0)) ? p : top, null as any);
  const richestTeam = [...franchises].sort((a, b) => b.purse - a.purse)[0];
  const largestSquad = [...franchises].sort((a, b) => b.playerIds.length - a.playerIds.length)[0];

  const goldCount = players.filter(p => p.tier === 'GOLD').length;
  const silverCount = players.filter(p => p.tier === 'SILVER').length;
  const bronzeCount = players.filter(p => p.tier === 'BRONZE').length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      {/* Hero Section with Glow */}
      <View style={styles.hero}>
        <View style={styles.heroGlow} />
        <Text style={styles.heroIcon}>🏆</Text>
        <Text style={styles.heroTitle}>INFINITE</Text>
        <Text style={styles.heroSubtitle}>AUCTION MANAGER</Text>
        <View style={styles.heroDivider} />
        <Text style={styles.heroByline}>LEAGUE • PERFORMANCE • SCOUTING</Text>

        {/* Dynamic Status Badge */}
        <View style={[
          styles.statusBadge, 
          isAuctionComplete ? { backgroundColor: Colors.success + '22', borderColor: Colors.success } : 
          isAuctionStarted ? { backgroundColor: Colors.danger + '22', borderColor: Colors.danger } : 
          { backgroundColor: Colors.surfaceVariant, borderColor: Colors.border }
        ]}>
          <View style={[
            styles.statusDot, 
            { backgroundColor: isAuctionComplete ? Colors.success : isAuctionStarted ? Colors.danger : Colors.textMuted }
          ]} />
          <Text style={[
            styles.statusText,
            { color: isAuctionComplete ? Colors.success : isAuctionStarted ? Colors.danger : Colors.textSecondary }
          ]}>
            {isAuctionComplete ? 'SEASON COMPLETE' : isAuctionStarted ? 'AUCTION LIVE' : 'PRE-OPENING'}
          </Text>
        </View>
      </View>

      {/* Main Stats Hub */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ARENA OVERVIEW</Text>
        <View style={styles.grid}>
          <View style={[styles.card, { borderTopColor: Colors.primary }]}>
            <Text style={styles.cardVal}>{players.length}</Text>
            <Text style={styles.cardLbl}>ATHLETES</Text>
          </View>
          <View style={[styles.card, { borderTopColor: Colors.secondary }]}>
            <Text style={styles.cardVal}>{franchises.length}</Text>
            <Text style={styles.cardLbl}>TEAMS</Text>
          </View>
          <View style={[styles.card, { borderTopColor: Colors.success }]}>
            <Text style={styles.cardVal}>{soldPlayers.length}</Text>
            <Text style={styles.cardLbl}>SIGNED</Text>
          </View>
          <View style={[styles.card, { borderTopColor: Colors.danger }]}>
            <Text style={styles.cardVal}>{unsoldPlayers.length}</Text>
            <Text style={styles.cardLbl}>UNSOLD</Text>
          </View>
        </View>
      </View>

      {/* Tier Breakdown */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TIER DISTRIBUTION</Text>
        <View style={styles.tierContainer}>
           <View style={[styles.tierItem, { borderLeftColor: Colors.gold }]}>
              <Text style={[styles.tierNum, { color: Colors.gold }]}>{goldCount}</Text>
              <Text style={styles.tierTxt}>GOLD</Text>
           </View>
           <View style={[styles.tierItem, { borderLeftColor: Colors.silver }]}>
              <Text style={[styles.tierNum, { color: Colors.silver }]}>{silverCount}</Text>
              <Text style={styles.tierTxt}>SILVER</Text>
           </View>
           <View style={[styles.tierItem, { borderLeftColor: Colors.bronze }]}>
              <Text style={[styles.tierNum, { color: Colors.bronze }]}>{bronzeCount}</Text>
              <Text style={styles.tierTxt}>BRONZE</Text>
           </View>
        </View>
      </View>

      {/* Market Highlights */}
      {isAuctionStarted && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MARKET HIGHLIGHTS</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
            {topBid && (
              <View style={[styles.highlightCard, { backgroundColor: Colors.primary + '08' }]}>
                <Text style={styles.hLbl}>⭐ HIGHEST VALUATION</Text>
                <Text style={styles.hName}>{topBid.name}</Text>
                <Text style={[styles.hPrice, { color: Colors.primary }]}>₹{topBid.soldPrice}L</Text>
                <Text style={styles.hSub}>BY {franchises.find(f => f.id === topBid.soldTo)?.shortName}</Text>
              </View>
            )}
            <View style={[styles.highlightCard, { backgroundColor: Colors.secondary + '08' }]}>
              <Text style={styles.hLbl}>💎 RICHEST CAPITAL</Text>
              <View style={styles.hTeamRow}>
                 {richestTeam.logo ? <Image source={richestTeam.logo} style={styles.hLogo} /> : <Text>🏏</Text>}
                 <Text style={styles.hName}>{richestTeam.shortName}</Text>
              </View>
              <Text style={[styles.hPrice, { color: Colors.secondary }]}>₹{richestTeam.purse}L</Text>
              <Text style={styles.hSub}>REMAINING BUDGET</Text>
            </View>
             <View style={[styles.highlightCard, { backgroundColor: Colors.accent + '08' }]}>
              <Text style={styles.hLbl}>👥 SQUAD DEPTH</Text>
               <View style={styles.hTeamRow}>
                 {largestSquad.logo ? <Image source={largestSquad.logo} style={styles.hLogo} /> : <Text>🏏</Text>}
                 <Text style={styles.hName}>{largestSquad.shortName}</Text>
              </View>
              <Text style={[styles.hPrice, { color: Colors.accent }]}>{largestSquad.playerIds.length} PLAYERS</Text>
              <Text style={styles.hSub}>LARGEST ROSTER</Text>
            </View>
          </ScrollView>
        </View>
      )}

      {/* Formats Grid */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AVAILABLE FORMATS</Text>
        <View style={styles.formatGrid}>
          {[
            { name: 'T10', icon: '⚡', color: Colors.danger },
            { name: 'T20', icon: '🔥', color: Colors.primary },
            { name: 'ODI', icon: '🏏', color: Colors.secondary },
            { name: 'TEST', icon: '🏛️', color: Colors.accent },
          ].map(f => (
            <View key={f.name} style={styles.formatChip}>
               <Text style={styles.formatIcon}>{f.icon}</Text>
               <Text style={[styles.formatName, { color: f.color }]}>{f.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  hero: { 
    paddingTop: 60, paddingBottom: 40, alignItems: 'center', 
    backgroundColor: Colors.surface, position: 'relative', overflow: 'hidden',
  },
  heroGlow: { 
    position: 'absolute', top: -50, width: 200, height: 200, 
    borderRadius: 100, backgroundColor: Colors.primary + '15', 
    filter: 'blur(40px)', 
  },
  heroIcon: { fontSize: 70, marginBottom: 15, textShadowColor: Colors.primary, textShadowRadius: 15 },
  heroTitle: { fontSize: 36, fontWeight: '900', color: Colors.textPrimary, letterSpacing: 8 },
  heroSubtitle: { fontSize: 13, fontWeight: '800', color: Colors.primary, letterSpacing: 4, marginTop: 4 },
  heroDivider: { width: 40, height: 2, backgroundColor: Colors.primary, marginVertical: 15 },
  heroByline: { fontSize: 10, color: Colors.textMuted, fontWeight: '900', letterSpacing: 2 },
  
  statusBadge: { 
    flexDirection: 'row', alignItems: 'center', marginTop: 25, 
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3, marginRight: 10 },
  statusText: { fontSize: 11, fontWeight: '900', letterSpacing: 1 },

  section: { paddingHorizontal: 25, marginTop: 35 },
  sectionTitle: { fontSize: 11, fontWeight: '900', color: Colors.textMuted, letterSpacing: 2, marginBottom: 15 },
  
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: { 
    width: (width - 62) / 2, backgroundColor: Colors.card, padding: 20, 
    borderRadius: 20, borderTopWidth: 3, elevation: 5,
  },
  cardVal: { fontSize: 26, fontWeight: '900', color: Colors.textPrimary },
  cardLbl: { fontSize: 9, fontWeight: '900', color: Colors.textMuted, marginTop: 4 },
  
  tierContainer: { flexDirection: 'row', gap: 10 },
  tierItem: { flex: 1, backgroundColor: Colors.card, padding: 15, borderRadius: 15, borderLeftWidth: 4 },
  tierNum: { fontSize: 20, fontWeight: '900' },
  tierTxt: { fontSize: 8, fontWeight: '900', color: Colors.textMuted, marginTop: 2 },
  
  highlightCard: { width: 200, padding: 20, borderRadius: 24, borderWidth: 1, borderColor: Colors.border },
  hLbl: { fontSize: 8, fontWeight: '900', color: Colors.textMuted, letterSpacing: 1, marginBottom: 12 },
  hName: { fontSize: 16, fontWeight: '900', color: Colors.textPrimary },
  hPrice: { fontSize: 22, fontWeight: '900', marginVertical: 4 },
  hSub: { fontSize: 9, color: Colors.textMuted, fontWeight: '700' },
  hTeamRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4, gap: 8 },
  hLogo: { width: 20, height: 20, resizeMode: 'contain' },
  
  formatGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  formatChip: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.card, 
    paddingHorizontal: 15, paddingVertical: 10, borderRadius: 15, borderWidth: 1, borderColor: Colors.border,
  },
  formatIcon: { fontSize: 18, marginRight: 10 },
  formatName: { fontSize: 13, fontWeight: '900' },
});

export default HomeScreen;
