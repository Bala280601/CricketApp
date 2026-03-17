import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, FlatList, Image,
} from 'react-native';
import Colors, { TierColors } from '../theme/colors';
import { useAppSelector } from '../store/hooks';
import FranchiseCard from '../components/FranchiseCard';
import { Franchise } from '../data/franchises';
import { PlayerTier } from '../data/players';

const ROLE_ICONS: Record<string, string> = {
  Batsman: '🏏', Bowler: '🎳', 'All-Rounder': '⚡', 'Wicket-Keeper': '🧤',
};

const FranchiseDetailView: React.FC<{ franchise: Franchise; soldPlayers: any[]; onBack: () => void }> = ({ franchise, soldPlayers, onBack }) => {
  const teamPlayers = soldPlayers.filter(p => p.soldTo === franchise.id);
  const spent = teamPlayers.reduce((acc, p) => acc + (p.soldPrice ?? 0), 0);
  const roles = ['Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper'];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar barStyle="light-content" backgroundColor={franchise.primaryColor} />
      
      {/* Dynamic Header */}
      <View style={[detail.banner, { backgroundColor: franchise.primaryColor }]}>
        <View style={detail.bannerOverlay} />
        <TouchableOpacity style={detail.backBtn} onPress={onBack}>
          <Text style={detail.backBtnText}>✕</Text>
        </TouchableOpacity>
        
        <View style={detail.bannerMain}>
          <View style={detail.logoRing}>
            {franchise.logo ? (
              <Image source={franchise.logo} style={detail.bannerLogo} />
            ) : (
              <Text style={detail.bannerEmoji}>{franchise.logoEmoji}</Text>
            )}
          </View>
          <View style={detail.bannerInfo}>
             <Text style={detail.bannerName}>{franchise.name}</Text>
             <Text style={detail.bannerCity}>{franchise.city.toUpperCase()}</Text>
          </View>
        </View>

        <View style={detail.bannerDashboard}>
           <View style={detail.dashItem}>
              <Text style={detail.dashVal}>₹{franchise.purse}L</Text>
              <Text style={detail.dashLbl}>REMAINING</Text>
           </View>
           <View style={detail.dashDivider} />
           <View style={detail.dashItem}>
              <Text style={detail.dashVal}>{teamPlayers.length}</Text>
              <Text style={detail.dashLbl}>ACQUIRED</Text>
           </View>
           <View style={detail.dashDivider} />
           <View style={detail.dashItem}>
              <Text style={detail.dashVal}>₹{spent}L</Text>
              <Text style={detail.dashLbl}>INVESTED</Text>
           </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {teamPlayers.length === 0 ? (
          <View style={detail.emptySquad}>
            <Text style={{ fontSize: 60, opacity: 0.3 }}>🏟️</Text>
            <Text style={detail.emptySquadText}>EMPTY ROSTER</Text>
            <Text style={detail.emptySquadSub}>This franchise hasn't signed any players yet.</Text>
          </View>
        ) : (
          roles.map(role => {
            const rolePlayers = teamPlayers.filter(p => p.role === role);
            if (rolePlayers.length === 0) return null;
            return (
              <View key={role} style={detail.roleSection}>
                <Text style={detail.roleTitle}>{role.toUpperCase()} UNlT ({rolePlayers.length})</Text>
                {rolePlayers.map(p => (
                  <View key={p.id} style={detail.playerRow}>
                    <View style={[detail.playerAvatar, { backgroundColor: TierColors[p.tier as PlayerTier].bg, borderColor: TierColors[p.tier as PlayerTier].border }]}>
                      <Text style={detail.playerEmoji}>{ROLE_ICONS[p.role]}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={detail.playerName}>{p.name}</Text>
                      <Text style={detail.playerCountry}>{p.country}</Text>
                    </View>
                    <View style={detail.playerPriceBox}>
                       <Text style={detail.playerPriceLabel}>BOUGHT FOR</Text>
                       <Text style={[detail.playerPriceVal, { color: franchise.primaryColor }]}>₹{p.soldPrice}L</Text>
                    </View>
                  </View>
                ))}
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

const TeamsScreen: React.FC = () => {
  const { franchises, soldPlayers } = useAppSelector(s => s.auction);
  const [selectedFranchise, setSelectedFranchise] = useState<Franchise | null>(null);

  if (selectedFranchise) {
    const fr = franchises.find(f => f.id === selectedFranchise.id) ?? selectedFranchise;
    return (
      <FranchiseDetailView
        franchise={fr}
        soldPlayers={soldPlayers}
        onBack={() => setSelectedFranchise(null)}
      />
    );
  }

  const totalSpent = soldPlayers.reduce((a, p) => a + (p.soldPrice ?? 0), 0);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FRANCHISE HUB</Text>
        <Text style={styles.headerSubtitle}>{franchises.length} Teams Registered</Text>
      </View>

      {/* Modern Dashboard */}
      <View style={styles.globalStats}>
        <View style={styles.gStat}>
          <Text style={styles.gStatVal}>{soldPlayers.length}</Text>
          <Text style={styles.gStatLbl}>CONTRACTS</Text>
        </View>
        <View style={styles.gStatDivider} />
        <View style={styles.gStat}>
          <Text style={[styles.gStatVal, { color: Colors.primary }]}>₹{totalSpent}L</Text>
          <Text style={styles.gStatLbl}>TOTAL SPEND</Text>
        </View>
      </View>

      <FlatList
        data={franchises}
        keyExtractor={f => f.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        renderItem={({ item }) => (
          <FranchiseCard franchise={item} onPress={setSelectedFranchise} showPurse />
        )}
      />
    </View>
  );
};

const detail = StyleSheet.create({
  banner: { padding: 25, paddingTop: 40, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, overflow: 'hidden' },
  bannerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' },
  backBtn: { position: 'absolute', top: 20, right: 20, padding: 10, zIndex: 10 },
  backBtnText: { color: '#fff', fontSize: 18, fontWeight: '900' },
  bannerMain: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  logoRing: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#fff', padding: 10, marginRight: 20, elevation: 10 },
  bannerLogo: { width: '100%', height: '100%', resizeMode: 'contain' },
  bannerEmoji: { fontSize: 40, textAlign: 'center' },
  bannerInfo: { flex: 1 },
  bannerName: { fontSize: 24, fontWeight: '900', color: '#fff' },
  bannerCity: { fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: '800', letterSpacing: 2, marginTop: 4 },
  
  bannerDashboard: { flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 20, padding: 15, alignItems: 'center' },
  dashItem: { flex: 1, alignItems: 'center' },
  dashVal: { fontSize: 15, fontWeight: '900', color: '#fff' },
  dashLbl: { fontSize: 8, color: 'rgba(255,255,255,0.6)', fontWeight: '900', marginTop: 4 },
  dashDivider: { width: 1, height: 20, backgroundColor: 'rgba(255,255,255,0.1)' },
  
  emptySquad: { alignItems: 'center', paddingVertical: 100, paddingHorizontal: 40 },
  emptySquadText: { fontSize: 16, fontWeight: '900', color: Colors.textMuted, marginTop: 20, letterSpacing: 2 },
  emptySquadSub: { fontSize: 12, color: Colors.textMuted, marginTop: 8, textAlign: 'center', fontWeight: '600' },
  
  roleSection: { paddingHorizontal: 20, marginTop: 25 },
  roleTitle: { fontSize: 11, fontWeight: '900', color: Colors.textMuted, letterSpacing: 2, marginBottom: 15 },
  playerRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.card, borderRadius: 18, padding: 12, marginBottom: 10 },
  playerAvatar: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  playerEmoji: { fontSize: 18 },
  playerName: { fontSize: 15, fontWeight: '900', color: Colors.textPrimary },
  playerCountry: { fontSize: 11, color: Colors.textMuted, fontWeight: '700', marginTop: 2 },
  playerPriceBox: { alignItems: 'flex-end' },
  playerPriceLabel: { fontSize: 7, color: Colors.textMuted, fontWeight: '900' },
  playerPriceVal: { fontSize: 14, fontWeight: '900' },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: 25, paddingTop: 40, paddingBottom: 10 },
  headerTitle: { fontSize: 28, fontWeight: '900', color: Colors.textPrimary, letterSpacing: 3 },
  headerSubtitle: { fontSize: 13, color: Colors.textSecondary, fontWeight: '700', marginTop: 4 },
  
  globalStats: { flexDirection: 'row', margin: 16, backgroundColor: Colors.card, borderRadius: 20, padding: 20, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: Colors.border },
  gStat: { flex: 1, alignItems: 'center' },
  gStatVal: { fontSize: 24, fontWeight: '900', color: Colors.textPrimary },
  gStatLbl: { fontSize: 8, color: Colors.textMuted, fontWeight: '900', marginTop: 4, letterSpacing: 1 },
  gStatDivider: { width: 1, height: 30, backgroundColor: Colors.border },
});

export default TeamsScreen;
