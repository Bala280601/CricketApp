import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
  Animated,
  Alert,
} from 'react-native';
import { playerService } from '../services/playerService';
import { franchiseService } from '../services/franchiseService';
import Colors from '../theme/colors';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  startAuction, placeBid, sellPlayer, markUnsold,
  useRTM, nextPlayer, resetAuction, timerExpired,
} from '../store/slices/auctionSlice';
import { TierColors } from '../theme/colors';
import { LEAGUES } from '../data/franchises';

const { width } = Dimensions.get('window');

const ROLE_ICONS: Record<string, string> = {
  Batsman: '🏏', Bowler: '🎳', 'All-Rounder': '⚡', 'Wicket-Keeper': '🧤',
};

const TIMER_SECONDS = 10;

const AuctionScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    franchises, players, currentPlayerIndex, currentBid,
    currentBidderFranchiseId, auctionStatus, auctionLog,
    isAuctionStarted, isAuctionComplete, soldPlayers, unsoldPlayers,
    selectedLeagueId,
  } = useAppSelector(s => s.auction);

  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerAnim = useRef(new Animated.Value(1)).current;

  const currentPlayer = players[currentPlayerIndex];
  const tier = currentPlayer ? TierColors[currentPlayer.tier] : TierColors.BRONZE;
  const currentBidder = franchises.find(f => f.id === currentBidderFranchiseId);
  const currentLeague = LEAGUES.find(l => l.id === selectedLeagueId);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    setTimeLeft(TIMER_SECONDS);
    timerAnim.setValue(1);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          stopTimer();
          dispatch(timerExpired());
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [stopTimer, dispatch, timerAnim]);

  // Start timer when auction is bidding and player changes
  useEffect(() => {
    if (isAuctionStarted && auctionStatus === 'bidding') {
      startTimer();
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [currentPlayerIndex, isAuctionStarted, auctionStatus]);

  // Reset timer on every new bid
  useEffect(() => {
    if (auctionStatus === 'bidding' && currentBidderFranchiseId) {
      startTimer();
    }
  }, [currentBid, currentBidderFranchiseId]);

  const placeQuickBid = (franchiseId: string) => {
    const next = currentBidderFranchiseId === null
      ? currentBid
      : Math.ceil((currentBid * 1.1) / 5) * 5;
    dispatch(placeBid({ franchiseId, bidAmount: next }));
  };

  const timerColor = timeLeft <= 3 ? Colors.danger : timeLeft <= 6 ? Colors.warning : Colors.secondary;
  const timerPct = timeLeft / TIMER_SECONDS;

  if (!isAuctionStarted) {
    return (
      <View style={styles.startContainer}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
        <View style={styles.glowOrb} />
        <View style={styles.introContent}>
          <Text style={styles.gavel}>🔨</Text>
          <Text style={styles.startTitle}>LIMITLESS AUCTION</Text>
          {currentLeague && (
            <View style={[styles.leagueBadge, { borderColor: currentLeague.color }]}>
              <Text style={[styles.leagueBadgeText, { color: currentLeague.color }]}>
                {currentLeague.name}
              </Text>
            </View>
          )}
          <Text style={styles.startSubtitle}>
            {players.length} Elite Players • {franchises.length} Competitors
          </Text>
          <View style={styles.statsRow}>
            <View style={[styles.statBox, { borderColor: Colors.gold + '44' }]}>
              <Text style={[styles.statVal, { color: Colors.gold }]}>{players.filter(p => p.tier === 'GOLD').length}</Text>
              <Text style={styles.statLabel}>GOLD</Text>
            </View>
            <View style={[styles.statBox, { borderColor: Colors.silver + '44' }]}>
              <Text style={[styles.statVal, { color: Colors.silver }]}>{players.filter(p => p.tier === 'SILVER').length}</Text>
              <Text style={styles.statLabel}>SILVER</Text>
            </View>
            <View style={[styles.statBox, { borderColor: Colors.bronze + '44' }]}>
              <Text style={[styles.statVal, { color: Colors.bronze }]}>{players.filter(p => p.tier === 'BRONZE').length}</Text>
              <Text style={styles.statLabel}>BRONZE</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.startBtn} onPress={() => dispatch(startAuction())}>
            <Text style={styles.startBtnText}>ENTERING ROOM 🚀</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (isAuctionComplete) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
        <View style={styles.completeHeader}>
          <Text style={styles.trophyEmoji}>🏆</Text>
          <Text style={styles.completeTitle}>SEASON WRAP UP</Text>
          <Text style={styles.completeSubtitle}>{soldPlayers.length} Drafted • {unsoldPlayers.length} Unsold</Text>
        </View>

        {franchises.map(f => (
          <View key={f.id} style={[styles.summaryCard, { borderColor: f.primaryColor + '44' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <View style={[styles.teamLogoBg, { backgroundColor: f.primaryColor + '15' }]}>
                <Text style={styles.summaryEmoji}>{f.logoEmoji}</Text>
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.summaryTeamName}>{f.name}</Text>
                <Text style={{ color: f.primaryColor, fontSize: 13, fontWeight: '700' }}>
                  PURSE: ₹{f.purse}L
                </Text>
              </View>
              <View style={[styles.playerCountBadge, { backgroundColor: f.primaryColor }]}>
                <Text style={{ color: '#000', fontWeight: '900', fontSize: 12 }}>{f.playerIds.length} SQUAD</Text>
              </View>
            </View>
            {soldPlayers.filter(p => p.soldTo === f.id).map(p => (
              <View key={p.id} style={styles.summaryPlayerRow}>
                <Text style={styles.summaryPlayerIcon}>{ROLE_ICONS[p.role]}</Text>
                <Text style={styles.summaryPlayerName}>{p.name}</Text>
                <Text style={[styles.summaryPlayerPrice, { color: TierColors[p.tier]?.border || Colors.textMuted }]}>
                  ₹{p.soldPrice}L
                </Text>
              </View>
            ))}
          </View>
        ))}

        <TouchableOpacity style={styles.resetBtn} onPress={() => dispatch(resetAuction())}>
          <Text style={styles.resetBtnText}>🔄 RESET BOARD</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  const handleSell = async () => {
    const player = players[currentPlayerIndex];
    if (!player || !currentBidderFranchiseId) return;

    try {
      await playerService.updatePlayer(player.id, {
        isSold: true,
        soldTo: currentBidderFranchiseId,
        soldPrice: currentBid,
        teamId: currentBidderFranchiseId,
      });

      const franchise = franchises.find(f => f.id === currentBidderFranchiseId);
      if (franchise) {
        await franchiseService.updateFranchise(franchise.id, {
          purse: franchise.purse - currentBid,
          playerIds: [...franchise.playerIds, player.id],
        });
      }

      dispatch(sellPlayer());
    } catch (error) {
      console.error('Sale sync error:', error);
      Alert.alert('Database Error', 'Could not save result.');
    }
  };

  const handleUnsold = async () => {
    const player = players[currentPlayerIndex];
    if (!player) return;
    try {
      await playerService.updatePlayer(player.id, { isSold: false });
      dispatch(markUnsold());
    } catch (error) {
      console.error('Unsold sync error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      {/* Modern Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>🔨 LIVE ARENA</Text>
          <Text style={styles.headerSubtitle}>{currentLeague?.name}</Text>
        </View>
        <View style={styles.progressContainer}>
          <Text style={styles.headerProgress}>{currentPlayerIndex + 1} / {players.length}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${((currentPlayerIndex + 1) / players.length) * 100}%` }]} />
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Multi-layered Player Stage */}
        {currentPlayer && (
          <View style={[styles.playerStage, { borderColor: tier.border + '66' }]}>
             <View style={[styles.tierStrip, { backgroundColor: tier.border }]}>
              <Text style={styles.tierStripText}>⭐ {currentPlayer.tier} CATEGORY</Text>
            </View>

            <View style={styles.playerStageTop}>
              <View style={[styles.bigAvatar, { backgroundColor: tier.bg, borderColor: tier.border }]}>
                <Text style={styles.bigAvatarEmoji}>{ROLE_ICONS[currentPlayer.role]}</Text>
                <View style={[styles.avatarGlow, { backgroundColor: tier.border + '33' }]} />
              </View>
              <View style={styles.playerMainInfo}>
                <Text style={styles.playerStageName}>{currentPlayer.name}</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.playerStageCountry}>🌍 {currentPlayer.country}</Text>
                  <Text style={styles.dot}>•</Text>
                  <Text style={styles.playerStageCountry}>🎂 Age {currentPlayer.age}</Text>
                </View>
                <Text style={[styles.playerStageRole, { color: tier.border }]}>{currentPlayer.role}</Text>
                <View style={styles.specialityChips}>
                  {currentPlayer.speciality.map((s: string, i: number) => (
                    <View key={i} style={styles.chip}>
                      <Text style={styles.chipText}>{s.toUpperCase()}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            <View style={styles.miniStats}>
              {(currentPlayer.role === 'Batsman' || currentPlayer.role === 'All-Rounder' || currentPlayer.role === 'Wicket-Keeper') && (
                <>
                  <View style={styles.miniStat}>
                    <Text style={styles.miniStatVal}>{currentPlayer.batting.t20.average?.toFixed(1) || 'N/A'}</Text>
                    <Text style={styles.miniStatLabel}>AVG</Text>
                  </View>
                  <View style={styles.miniStat}>
                    <Text style={styles.miniStatVal}>{currentPlayer.batting.t20.strikeRate || 'N/A'}</Text>
                    <Text style={styles.miniStatLabel}>S/R</Text>
                  </View>
                </>
              )}
              {(currentPlayer.role === 'Bowler' || currentPlayer.role === 'All-Rounder') && (
                <>
                  <View style={styles.miniStat}>
                    <Text style={styles.miniStatVal}>{currentPlayer.bowling.t20.wickets || 'N/A'}</Text>
                    <Text style={styles.miniStatLabel}>WKTS</Text>
                  </View>
                  <View style={styles.miniStat}>
                    <Text style={styles.miniStatVal}>{currentPlayer.bowling.t20.economy || 'N/A'}</Text>
                    <Text style={styles.miniStatLabel}>ECO</Text>
                  </View>
                </>
              )}
            </View>

            {auctionStatus === 'bidding' && (
              <View style={styles.timerSection}>
                <View style={styles.timerTrack}>
                  <Animated.View style={[styles.timerFill, {
                    width: `${timerPct * 100}%`,
                    backgroundColor: timerColor,
                    shadowColor: timerColor,
                    shadowRadius: 10,
                    shadowOpacity: 0.8,
                  }]} />
                </View>
                <View style={styles.timerData}>
                  <Text style={styles.timerStatus}>
                    {currentBidderFranchiseId ? '⚡ HAMMER FALLING' : '⏳ WAITING FOR FIRST BID'}
                  </Text>
                  <Text style={[styles.timerSecs, { color: timerColor }]}>{timeLeft}s</Text>
                </View>
              </View>
            )}

            <View style={styles.bidDashboard}>
              <View style={styles.bidSide}>
                <Text style={styles.dashboardLabel}>CURRENT PRICE</Text>
                <Text style={[styles.dashboardVal, { color: tier.border }]}>₹{currentBid}L</Text>
              </View>
              <View style={styles.bidDivider} />
              <View style={styles.bidSide}>
                <Text style={styles.dashboardLabel}>TOP BIDDER</Text>
                {currentBidder ? (
                  <View style={styles.highBidderRow}>
                    {currentBidder.logo && <Image source={currentBidder.logo} style={styles.bidderMiniLogo} />}
                    <Text style={styles.bidderNameText}>{currentBidder.shortName}</Text>
                  </View>
                ) : (
                  <Text style={styles.noBidderText}>PENDING</Text>
                )}
              </View>
            </View>

            {auctionStatus === 'sold' && (
              <View style={[styles.statusOverlay, { backgroundColor: Colors.success + 'CC' }]}>
                <Text style={styles.overlayMainText}>✅ SOLD</Text>
                <Text style={styles.overlaySubText}>₹{currentBid}L to {currentBidder?.name}</Text>
              </View>
            )}
            {auctionStatus === 'unsold' && (
              <View style={[styles.statusOverlay, { backgroundColor: Colors.danger + 'CC' }]}>
                <Text style={styles.overlayMainText}>❌ UNSOLD</Text>
              </View>
            )}
             {auctionStatus === 'rtm' && (
              <View style={[styles.statusOverlay, { backgroundColor: Colors.accent + 'CC' }]}>
                <Text style={styles.overlayMainText}>🔄 RTM ACTIVATED</Text>
                <Text style={styles.overlaySubText}>MATCHED AT ₹{currentBid}L</Text>
              </View>
            )}
          </View>
        )}

        {auctionStatus === 'bidding' && (
          <View style={styles.bidderContainer}>
            <Text style={styles.bidderGroupTitle}>ACTIVE FRANCHISES</Text>
            {franchises.map(f => {
               const isCurrentBidder = f.id === currentBidderFranchiseId;
               const nextBidAmount = currentBidderFranchiseId === null
                 ? currentBid
                 : Math.ceil((currentBid * 1.1) / 5) * 5;
               const canAfford = f.purse >= nextBidAmount;
               const disableBid = isCurrentBidder || !canAfford;

               return (
                <TouchableOpacity 
                  key={f.id} 
                  style={[
                    styles.bidCard, 
                    { borderLeftColor: f.primaryColor },
                    disableBid && { opacity: 0.5 }
                  ]}
                  onPress={() => placeQuickBid(f.id)}
                  disabled={disableBid}
                >
                  <View style={styles.bidCardLeft}>
                    <View style={[styles.bidTeamLogoWrap, { backgroundColor: f.primaryColor + '22' }]}>
                      {f.logo ? <Image source={f.logo} style={styles.bidCardLogo} /> : <Text style={{fontSize: 18}}>{f.logoEmoji}</Text>}
                    </View>
                    <View>
                      <Text style={styles.bidTeamName}>{f.name}</Text>
                      <Text style={[styles.bidPurse, { color: f.primaryColor }]}>₹{f.purse}L Left</Text>
                    </View>
                  </View>
                  <View style={[styles.bidPriceTag, { backgroundColor: isCurrentBidder ? Colors.success : f.primaryColor }]}>
                    <Text style={styles.bidPriceText}>
                      {isCurrentBidder ? 'LEADING' : `₹${nextBidAmount}L`}
                    </Text>
                  </View>
                </TouchableOpacity>
               );
            })}
          </View>
        )}

        <View style={styles.actionHub}>
          {auctionStatus === 'bidding' && (
            <>
              {currentBidderFranchiseId && (
                <TouchableOpacity style={[styles.hubBtn, styles.hubBtnSold]} onPress={handleSell}>
                  <Text style={styles.hubBtnText}>SOLD</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={[styles.hubBtn, styles.hubBtnUnsold]} onPress={handleUnsold}>
                <Text style={styles.hubBtnText}>UNSOLD</Text>
              </TouchableOpacity>
            </>
          )}
          {(auctionStatus === 'sold' || auctionStatus === 'unsold' || auctionStatus === 'rtm') && (
            <TouchableOpacity style={[styles.hubBtn, styles.hubBtnNext]} onPress={() => dispatch(nextPlayer())}>
              <Text style={styles.hubBtnText}>NEXT PLAYER ➡️</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Styled Log Section */}
        <View style={styles.logContainer}>
          <Text style={styles.logTitle}>ACTIVITY FEED</Text>
          <View style={styles.logContent}>
            {auctionLog.slice(0, 10).map((log, i) => (
              <View key={i} style={styles.logEntry}>
                <Text style={styles.logTime}>{log.time}</Text>
                <View style={[styles.logDot, { backgroundColor: 
                  log.type === 'sold' ? Colors.success : 
                  log.type === 'bid' ? Colors.primary : 
                  log.type === 'unsold' ? Colors.danger : Colors.textMuted }]} />
                <Text style={[styles.logText, { color: log.type === 'info' ? Colors.textSecondary : Colors.textPrimary }]}>
                  {log.message}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  glowOrb: {
    position: 'absolute', top: -100, right: -100,
    width: 300, height: 300, borderRadius: 150,
    backgroundColor: Colors.primary + '08',
  },
  startContainer: { flex: 1, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center', padding: 30 },
  introContent: { alignItems: 'center', width: '100%' },
  gavel: { fontSize: 90, marginBottom: 10, textShadowColor: Colors.primary, textShadowRadius: 20 },
  startTitle: { fontSize: 30, fontWeight: '900', color: Colors.textPrimary, letterSpacing: 5, textAlign: 'center' },
  leagueBadge: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 16,
    borderRadius: 30, borderWidth: 1, marginVertical: 15, backgroundColor: Colors.surfaceVariant,
  },
  leagueBadgeLogo: { width: 22, height: 22, marginRight: 10, resizeMode: 'contain' },
  leagueBadgeText: { fontSize: 13, fontWeight: '800' },
  startSubtitle: { fontSize: 14, color: Colors.textSecondary, marginBottom: 40 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 50 },
  statBox: { alignItems: 'center', padding: 15, borderRadius: 16, borderWidth: 1, backgroundColor: Colors.card, width: width * 0.25 },
  statVal: { fontSize: 24, fontWeight: '900' },
  statLabel: { fontSize: 10, color: Colors.textMuted, fontWeight: '700', marginTop: 4 },
  startBtn: {
    backgroundColor: Colors.primary, paddingHorizontal: 50, paddingVertical: 20, borderRadius: 40,
    shadowColor: Colors.primary, shadowRadius: 15, shadowOpacity: 0.5, elevation: 10,
  },
  startBtnText: { color: '#000', fontWeight: '900', letterSpacing: 1.5 },

  // Header
  header: { 
    paddingHorizontal: 20, paddingVertical: 15, backgroundColor: Colors.surface,
    borderBottomWidth: 1, borderBottomColor: Colors.border, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  headerTitle: { color: Colors.primary, fontSize: 18, fontWeight: '900', letterSpacing: 1 },
  headerSubtitle: { color: Colors.textSecondary, fontSize: 12, fontWeight: '600', marginTop: 2 },
  progressContainer: { alignItems: 'flex-end', width: 100 },
  headerProgress: { color: Colors.textMuted, fontSize: 11, fontWeight: '800', marginBottom: 4 },
  progressBar: { width: '100%', height: 4, backgroundColor: Colors.border, borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: Colors.primary },

  // Stage
  playerStage: { 
    margin: 15, borderRadius: 24, borderWidth: 1, backgroundColor: Colors.card, 
    overflow: 'hidden', position: 'relative',
  },
  tierStrip: { paddingVertical: 5, alignItems: 'center' },
  tierStripText: { fontSize: 10, fontWeight: '900', color: '#000', letterSpacing: 2 },
  playerStageTop: { flexDirection: 'row', padding: 20, alignItems: 'center' },
  bigAvatar: { 
    width: 84, height: 84, borderRadius: 42, borderWidth: 2, 
    alignItems: 'center', justifyContent: 'center', marginRight: 20, position: 'relative',
  },
  avatarGlow: { position: 'absolute', width: 100, height: 100, borderRadius: 50, zIndex: -1 },
  bigAvatarEmoji: { fontSize: 32 },
  playerMainInfo: { flex: 1 },
  playerStageName: { fontSize: 22, fontWeight: '900', color: Colors.textPrimary },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  playerStageCountry: { fontSize: 12, color: Colors.textSecondary, fontWeight: '600' },
  dot: { color: Colors.textMuted, marginHorizontal: 6 },
  playerStageRole: { fontSize: 13, fontWeight: '800', marginTop: 6, textTransform: 'uppercase' },
  specialityChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  chip: { backgroundColor: Colors.surfaceVariant, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  chipText: { fontSize: 9, color: Colors.textSecondary, fontWeight: '800' },
  
  miniStats: { 
    flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, 
    borderTopWidth: 1, borderTopColor: Colors.border, backgroundColor: Colors.glassLight,
  },
  miniStat: { alignItems: 'center' },
  miniStatVal: { fontSize: 18, fontWeight: '900', color: Colors.textPrimary },
  miniStatLabel: { fontSize: 9, color: Colors.textMuted, fontWeight: '700', marginTop: 2 },

  // Timer
  timerSection: { paddingHorizontal: 20, paddingVertical: 12, backgroundColor: Colors.surface },
  timerTrack: { height: 6, backgroundColor: Colors.border, borderRadius: 3, overflow: 'hidden' },
  timerFill: { height: '100%', borderRadius: 3 },
  timerData: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  timerStatus: { fontSize: 10, color: Colors.textMuted, fontWeight: '800' },
  timerSecs: { fontSize: 24, fontWeight: '900' },

  // Dashboard
  bidDashboard: { 
    flexDirection: 'row', padding: 20, backgroundColor: Colors.surfaceVariant, 
    borderTopWidth: 1, borderTopColor: Colors.border,
  },
  bidSide: { flex: 1, alignItems: 'center' },
  bidDivider: { width: 1, height: '80%', backgroundColor: Colors.border },
  dashboardLabel: { fontSize: 10, color: Colors.textMuted, fontWeight: '800', marginBottom: 6 },
  dashboardVal: { fontSize: 30, fontWeight: '900' },
  highBidderRow: { flexDirection: 'row', alignItems: 'center' },
  bidderMiniLogo: { width: 22, height: 22, marginRight: 8, resizeMode: 'contain' },
  bidderNameText: { fontSize: 16, fontWeight: '900', color: Colors.textPrimary },
  noBidderText: { fontSize: 16, color: Colors.textMuted, fontWeight: '800' },

  statusOverlay: { 
    ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center', 
    zIndex: 10, borderRadius: 24,
  },
  overlayMainText: { fontSize: 40, fontWeight: '900', color: '#fff', textShadowRadius: 10, textShadowColor: '#000' },
  overlaySubText: { fontSize: 16, color: '#fff', fontWeight: '800', marginTop: 10 },

  // Bidder Cards
  bidderContainer: { paddingHorizontal: 15, marginTop: 10 },
  bidderGroupTitle: { fontSize: 11, color: Colors.textMuted, fontWeight: '900', letterSpacing: 2, marginBottom: 15 },
  bidCard: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
    backgroundColor: Colors.card, borderRadius: 16, padding: 12, marginBottom: 10, 
    borderLeftWidth: 4, height: 70,
  },
  bidCardLeft: { flexDirection: 'row', alignItems: 'center' },
  bidTeamLogoWrap: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  bidCardLogo: { width: 32, height: 32, resizeMode: 'contain' },
  bidTeamName: { fontSize: 15, fontWeight: '800', color: Colors.textPrimary },
  bidPurse: { fontSize: 11, fontWeight: '700', marginTop: 2 },
  bidPriceTag: { paddingHorizontal: 15, paddingVertical: 10, borderRadius: 12, minWidth: 90, alignItems: 'center' },
  bidPriceText: { color: '#000', fontSize: 12, fontWeight: '900' },

  actionHub: { flexDirection: 'row', padding: 15, gap: 10 },
  hubBtn: { flex: 1, paddingVertical: 16, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  hubBtnSold: { backgroundColor: Colors.successDark, borderWidth: 1, borderColor: Colors.success },
  hubBtnUnsold: { backgroundColor: Colors.dangerDark, borderWidth: 1, borderColor: Colors.danger },
  hubBtnNext: { backgroundColor: Colors.info, elevation: 5 },
  hubBtnText: { color: '#fff', fontSize: 15, fontWeight: '900', letterSpacing: 1 },

  logContainer: { padding: 15, marginBottom: 30 },
  logTitle: { fontSize: 11, color: Colors.textMuted, fontWeight: '900', letterSpacing: 2, marginBottom: 15 },
  logContent: { backgroundColor: Colors.surfaceVariant, borderRadius: 20, padding: 15, borderWidth: 1, borderColor: Colors.border },
  logEntry: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  logDot: { width: 6, height: 6, borderRadius: 3, marginRight: 12 },
  logTime: { fontSize: 10, color: Colors.textMuted, width: 50, fontWeight: '700' },
  logText: { flex: 1, fontSize: 12, fontWeight: '600' },

  trophyEmoji: { fontSize: 70 },
  completeHeader: { alignItems: 'center', paddingVertical: 40 },
  completeTitle: { fontSize: 28, fontWeight: '900', color: Colors.primary, letterSpacing: 2 },
  completeSubtitle: { fontSize: 14, color: Colors.textSecondary, marginTop: 8 },
  summaryCard: { backgroundColor: Colors.card, borderRadius: 20, borderWidth: 1, padding: 20, marginHorizontal: 15, marginBottom: 15 },
  teamLogoBg: { width: 44, height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  summaryLogo: { width: 30, height: 30, resizeMode: 'contain' },
  summaryEmoji: { fontSize: 24 },
  summaryTeamName: { fontSize: 16, fontWeight: '900', color: Colors.textPrimary },
  summaryPlayerRow: { flexDirection: 'row', paddingVertical: 8, borderTopWidth: 1, borderTopColor: Colors.border, alignItems: 'center' },
  summaryPlayerName: { flex: 1, color: Colors.textSecondary, fontSize: 13, fontWeight: '600' },
  summaryPlayerPrice: { fontWeight: '900', fontSize: 13 },
  playerCountBadge: { marginLeft: 'auto', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  summaryPlayerIcon: { marginRight: 8 },
  resetBtn: { backgroundColor: Colors.danger, margin: 15, paddingVertical: 18, borderRadius: 15, alignItems: 'center' },
  resetBtnText: { color: '#fff', fontWeight: '900', fontSize: 16 },
});

export default AuctionScreen;
