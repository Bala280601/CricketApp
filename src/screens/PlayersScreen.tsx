import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  StatusBar, TextInput, FlatList, ActivityIndicator,
} from 'react-native';
import Colors, { TierColors } from '../theme/colors';
import { Player, PlayerRole, PlayerTier } from '../data/players';
import PlayerCard from '../components/PlayerCard';
import { playerService } from '../services/playerService';

const ROLE_ICONS: Record<string, string> = {
  Batsman: '🏏', Bowler: '🎳', 'All-Rounder': '⚡', 'Wicket-Keeper': '🧤',
};

const FORMATS = ['T10', 'T20', 'ODI', 'TEST'] as const;
type Format = typeof FORMATS[number];

const PlayerDetailModal: React.FC<{ player: Player; onClose: () => void }> = ({ player, onClose }) => {
  const [activeFormat, setActiveFormat] = useState<Format>('T20');
  const tier = TierColors[player.tier];

  const getFormatBattingStats = () => {
    switch (activeFormat) {
      case 'T10': return player.batting.t10;
      case 'ODI': return player.batting.odi;
      case 'TEST': return player.batting.test;
      default: return player.batting.t20;
    }
  };
  const getFormatBowlingStats = () => {
    switch (activeFormat) {
      case 'T10': return player.bowling.t10;
      case 'ODI': return player.bowling.odi;
      case 'TEST': return player.bowling.test;
      default: return player.bowling.t20;
    }
  };

  const bStats = getFormatBattingStats();
  const wStats = getFormatBowlingStats();

  return (
    <View style={modal.overlay}>
       <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.8)" />
      <View style={[modal.container, { borderColor: tier.border + '55' }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={[modal.header, { backgroundColor: tier.bg }]}>
            <View style={[modal.avatarWrap, { borderColor: tier.border }]}>
               <Text style={modal.avatarEmoji}>{ROLE_ICONS[player.role]}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={modal.name}>{player.name}</Text>
              <Text style={modal.sub}>{player.country} • Age {player.age}</Text>
              <View style={[modal.roleBadge, { backgroundColor: Colors.surfaceVariant }]}>
                 <Text style={modal.roleBadgeText}>{player.role.toUpperCase()}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={modal.closeBtn}>
              <Text style={modal.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Stats Hub */}
          <View style={modal.statsHub}>
             {/* Format Selector */}
            <View style={modal.formatRow}>
              {FORMATS.map(f => (
                <TouchableOpacity
                  key={f}
                  style={[modal.formatTab, activeFormat === f && { backgroundColor: tier.border }]}
                  onPress={() => setActiveFormat(f)}
                >
                  <Text style={[modal.formatTabText, activeFormat === f && { color: '#000' }]}>{f}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Batting Stats */}
            {(player.role !== 'Bowler') && (
              <View style={modal.statsSection}>
                <Text style={modal.sectionLabel}>🏏 BATTING SCORES</Text>
                <View style={modal.statsGrid}>
                  <View style={modal.statItem}>
                    <Text style={modal.statVal}>{bStats.matches}</Text>
                    <Text style={modal.statLbl}>Matches</Text>
                  </View>
                  <View style={modal.statItem}>
                    <Text style={modal.statVal}>{bStats.runs ?? '—'}</Text>
                    <Text style={modal.statLbl}>Runs</Text>
                  </View>
                  <View style={modal.statItem}>
                    <Text style={[modal.statVal, { color: tier.border }]}>{bStats.average?.toFixed(1) ?? '—'}</Text>
                    <Text style={modal.statLbl}>Avg</Text>
                  </View>
                  <View style={modal.statItem}>
                    <Text style={modal.statVal}>{bStats.strikeRate ?? '—'}</Text>
                    <Text style={modal.statLbl}>S/R</Text>
                  </View>
                </View>
              </View>
            )}

            {/* Bowling Stats */}
            {(player.role === 'Bowler' || player.role === 'All-Rounder') && (
              <View style={modal.statsSection}>
                <Text style={[modal.sectionLabel, { color: Colors.secondary }]}>🎳 BOWLING RECORD</Text>
                <Text style={modal.bowlingStyle}>{player.bowling.style} {player.bowling.paceKmh ? `• ${player.bowling.paceKmh}km/h` : ''}</Text>
                <View style={modal.statsGrid}>
                  <View style={modal.statItem}>
                    <Text style={modal.statVal}>{wStats.matches}</Text>
                    <Text style={modal.statLbl}>Matches</Text>
                  </View>
                  <View style={modal.statItem}>
                    <Text style={[modal.statVal, { color: Colors.danger }]}>{wStats.wickets ?? 0}</Text>
                    <Text style={modal.statLbl}>Wkts</Text>
                  </View>
                  <View style={modal.statItem}>
                    <Text style={modal.statVal}>{wStats.economy?.toFixed(2) ?? '—'}</Text>
                    <Text style={modal.statLbl}>Eco</Text>
                  </View>
                  <View style={modal.statItem}>
                    <Text style={modal.statVal}>{wStats.bestFigures ?? '—'}</Text>
                    <Text style={modal.statLbl}>Best</Text>
                  </View>
                </View>
              </View>
            )}
          </View>

          {/* Extras */}
          <View style={modal.footer}>
             <View style={modal.priceCard}>
                <Text style={modal.priceLabel}>AUCTION BASE PRICE</Text>
                <Text style={[modal.priceVal, { color: tier.border }]}>₹{player.basePrice} LAKHS</Text>
             </View>
             <View style={modal.specialityBox}>
                <Text style={modal.sectionLabel}>CORE SKILLS</Text>
                <View style={modal.chipWrap}>
                   {player.speciality.map((s, i) => (
                     <View key={i} style={modal.chip}>
                        <Text style={modal.chipText}>{s}</Text>
                     </View>
                   ))}
                </View>
             </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const PlayersScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState<Player[]>([]);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState<PlayerRole | 'All'>('All');
  const [filterTier, setFilterTier] = useState<PlayerTier | 'All'>('All');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  React.useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    try {
      setLoading(true);
      const data = await playerService.getAllPlayers();
      setPlayers(data || []);
    } catch (error) {
      console.error('Failed to load players:', error);
    } finally {
      setLoading(false);
    }
  };

  const roles: Array<PlayerRole | 'All'> = ['All', 'Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper'];
  const tiers: Array<PlayerTier | 'All'> = ['All', 'GOLD', 'SILVER', 'BRONZE'];

  const filtered = (players || []).filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.country.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === 'All' || p.role === filterRole;
    const matchTier = filterTier === 'All' || p.tier === filterTier;
    return matchSearch && matchRole && matchTier;
  });


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>PRO DATABASE</Text>
          <Text style={styles.headerSubtitle}>{filtered.length} Scouting Profiles</Text>
        </View>
      </View>

      <View style={styles.controlPanel}>
        {/* Search */}
        <View style={styles.searchBox}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search name or country..."
            placeholderTextColor={Colors.textMuted}
            style={styles.searchInput}
          />
        </View>

        {/* Role Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar} contentContainerStyle={styles.filterInner}>
          {roles.map(r => (
            <TouchableOpacity
              key={r}
              style={[styles.roleChip, filterRole === r && styles.roleChipActive]}
              onPress={() => setFilterRole(r)}
            >
              <Text style={[styles.roleText, filterRole === r && styles.roleTextActive]}>
                {r === 'All' ? '🌐 ALL' : `${ROLE_ICONS[r]} ${r.toUpperCase()}`}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Tier Filter */}
        <View style={styles.tierPanel}>
           {tiers.map(t => (
             <TouchableOpacity
               key={t}
               style={[
                 styles.tierBtn,
                 filterTier === t && { backgroundColor: t === 'GOLD' ? Colors.gold + '22' : t === 'SILVER' ? Colors.silver + '22' : t === 'BRONZE' ? Colors.bronze + '22' : Colors.surfaceVariant }
               ]}
               onPress={() => setFilterTier(t)}
             >
               <View style={[styles.tierDot, { backgroundColor: t === 'GOLD' ? Colors.gold : t === 'SILVER' ? Colors.silver : t === 'BRONZE' ? Colors.bronze : Colors.textMuted }]} />
               <Text style={[styles.tierBtnText, filterTier === t && { color: Colors.textPrimary }]}>{t}</Text>
             </TouchableOpacity>
           ))}
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Fetching Scouting Profiles...</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={p => p.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
          renderItem={({ item }) => (
            <PlayerCard player={item} onPress={setSelectedPlayer} />
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No scouting results found.</Text>
            </View>
          }
        />
      )}

      {selectedPlayer && (
        <PlayerDetailModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
      )}
    </View>
  );
};

const modal = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.9)', 
    justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: 20,
  },
  container: {
    width: '100%', maxHeight: '85%', backgroundColor: Colors.surface,
    borderRadius: 30, borderWidth: 1, overflow: 'hidden',
  },
  header: { flexDirection: 'row', alignItems: 'center', padding: 25 },
  avatarWrap: { width: 70, height: 70, borderRadius: 35, borderWidth: 2, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  avatarEmoji: { fontSize: 30 },
  name: { fontSize: 24, fontWeight: '900', color: Colors.textPrimary },
  sub: { fontSize: 13, color: Colors.textSecondary, fontWeight: '700', marginTop: 2 },
  roleBadge: { marginTop: 8, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start' },
  roleBadgeText: { fontSize: 9, fontWeight: '900', color: Colors.textSecondary, letterSpacing: 1 },
  closeBtn: { position: 'absolute', top: 20, right: 20, padding: 10 },
  closeBtnText: { color: Colors.textMuted, fontSize: 20 },
  
  statsHub: { padding: 20, backgroundColor: Colors.card },
  formatRow: { flexDirection: 'row', gap: 6, marginBottom: 20 },
  formatTab: { flex: 1, paddingVertical: 8, borderRadius: 12, backgroundColor: Colors.surfaceVariant, alignItems: 'center' },
  formatTabText: { fontSize: 11, fontWeight: '900', color: Colors.textMuted },
  
  statsSection: { marginBottom: 20 },
  sectionLabel: { fontSize: 10, fontWeight: '900', color: Colors.textMuted, letterSpacing: 2, marginBottom: 12 },
  bowlingStyle: { fontSize: 12, color: Colors.textSecondary, fontWeight: '700', marginBottom: 10 },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  statItem: { flex: 1 },
  statVal: { fontSize: 20, fontWeight: '900', color: Colors.textPrimary },
  statLbl: { fontSize: 9, color: Colors.textMuted, fontWeight: '700', marginTop: 2 },
  
  footer: { padding: 20 },
  priceCard: { backgroundColor: Colors.surfaceVariant, padding: 15, borderRadius: 15, alignItems: 'center', marginBottom: 20 },
  priceLabel: { fontSize: 10, color: Colors.textMuted, fontWeight: '900', marginBottom: 4 },
  priceVal: { fontSize: 22, fontWeight: '900' },
  specialityBox: {},
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: Colors.card, borderWidth: 1, borderColor: Colors.border, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  chipText: { fontSize: 11, fontWeight: '700', color: Colors.textSecondary },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: 25, paddingTop: 40, paddingBottom: 20 },
  headerTitle: { fontSize: 28, fontWeight: '900', color: Colors.textPrimary, letterSpacing: 3 },
  headerSubtitle: { fontSize: 13, color: Colors.textSecondary, fontWeight: '700', marginTop: 4 },
  
  controlPanel: { borderBottomWidth: 1, borderBottomColor: Colors.border, paddingBottom: 15 },
  searchBox: { paddingHorizontal: 20, marginBottom: 15 },
  searchInput: { backgroundColor: Colors.card, height: 50, borderRadius: 15, paddingHorizontal: 15, color: Colors.textPrimary, borderWidth: 1, borderColor: Colors.border },
  
  filterBar: { marginBottom: 15 },
  filterInner: { paddingHorizontal: 20, gap: 10 },
  roleChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, backgroundColor: Colors.card, borderWidth: 1, borderColor: Colors.border },
  roleChipActive: { borderColor: Colors.primary, backgroundColor: Colors.primary + '11' },
  roleText: { color: Colors.textMuted, fontSize: 11, fontWeight: '900' },
  roleTextActive: { color: Colors.primary },
  
  tierPanel: { flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between' },
  tierBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 8, marginHorizontal: 4, borderRadius: 10, backgroundColor: Colors.card },
  tierDot: { width: 6, height: 6, borderRadius: 3, marginRight: 8 },
  tierBtnText: { fontSize: 9, fontWeight: '900', color: Colors.textMuted },
  
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 15, color: Colors.textSecondary, fontWeight: '700', fontSize: 14 },

  empty: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: Colors.textMuted, fontWeight: '700' },
});

export default PlayersScreen;
