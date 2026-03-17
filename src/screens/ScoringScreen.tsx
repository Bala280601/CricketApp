import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { recordBall } from '../store/slices/scoringSlice';
import { updateMatchResult } from '../store/slices/tournamentSlice';
import Colors from '../theme/colors';
import { FRANCHISES } from '../data/franchises';

const { width } = Dimensions.get('window');

const ScoringScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const dispatch = useAppDispatch();
  const { matchId, innings, currentInningsIndex, isMatchFinished, target } = useAppSelector(state => state.scoring);
  
  const currentInnings = innings[currentInningsIndex];
  if (!currentInnings || !matchId) return null;

  const team = FRANCHISES.find(f => f.id === currentInnings.teamId);

  const handlePressRun = (runs: number) => {
    dispatch(recordBall({ type: 'run', runs, isWicket: false }));
  };

  const handlePressWicket = () => {
    dispatch(recordBall({ type: 'wicket', runs: 0, isWicket: true }));
  };

  const handlePressExtra = (type: 'wide' | 'noball') => {
    dispatch(recordBall({ type, runs: 0, isWicket: false }));
  };

  const handleFinishMatch = () => {
    const inn1 = innings[0];
    const inn2 = innings[1];
    if (inn1 && inn2) {
      let winnerId: string | 'draw' = 'draw';
      if (inn1.totalRuns > inn2.totalRuns) winnerId = inn1.teamId;
      else if (inn2.totalRuns > inn1.totalRuns) winnerId = inn2.teamId;

      dispatch(updateMatchResult({
        matchId,
        winnerId,
        homeScore: `${inn1.totalRuns}/${inn1.totalWickets}`,
        awayScore: `${inn2.totalRuns}/${inn2.totalWickets}`,
      }));
    }
    onBack();
  };

  const formatOvers = (balls: number) => {
    const overs = Math.floor(balls / 6);
    const remainingBalls = balls % 6;
    return `${overs}.${remainingBalls}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      {/* Score Header */}
      <View style={[styles.header, { borderBottomColor: team?.primaryColor || Colors.primary }]}>
        <View style={styles.teamInfo}>
           <Text style={[styles.teamName, { color: team?.primaryColor || Colors.primary }]}>
             {team?.name} {currentInningsIndex === 1 ? '(CHASING)' : ''}
           </Text>
           <Text style={styles.oversText}>OVERS {formatOvers(currentInnings.totalBalls)} / 5.0</Text>
        </View>
        <View style={styles.scoreRow}>
           <Text style={styles.scoreText}>{currentInnings.totalRuns}</Text>
           <Text style={styles.wicketText}>- {currentInnings.totalWickets}</Text>
        </View>
        {target !== undefined && (
          <Text style={styles.targetText}>TARGET: {target}</Text>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.mainContent}>
        {/* Recent Balls */}
        <View style={styles.recentSection}>
           <Text style={styles.label}>RECENT BALLS</Text>
           <View style={styles.ballsRow}>
              {currentInnings.currentOver.slice(-6).map((b, i) => (
                <View key={i} style={[styles.ballCircle, b.isWicket && styles.wicketBall, b.runs === 4 && styles.fourBall, b.runs === 6 && styles.sixBall]}>
                   <Text style={styles.ballText}>{b.isWicket ? 'W' : b.runs}</Text>
                </View>
              ))}
              {currentInnings.currentOver.length === 0 && <Text style={styles.emptyBalls}>Empty Over</Text>}
           </View>
        </View>

        {isMatchFinished ? (
          <View style={styles.summaryBox}>
             <Text style={styles.finishTitle}>MATCH CONCLUDED</Text>
             <Text style={styles.summaryText}>
               {innings[0]?.teamId}: {innings[0]?.totalRuns}/{innings[0]?.totalWickets}
             </Text>
             <Text style={styles.summaryText}>
               {innings[1]?.teamId}: {innings[1]?.totalRuns}/{innings[1]?.totalWickets}
             </Text>
             <TouchableOpacity style={styles.finishBtn} onPress={handleFinishMatch}>
                <Text style={styles.finishBtnText}>EXIT & SAVE RESULT</Text>
             </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.controls}>
             {/* Run Controls */}
             <View style={styles.controlRow}>
                {[0, 1, 2, 3].map(r => (
                  <TouchableOpacity key={r} style={styles.runBtn} onPress={() => handlePressRun(r)}>
                    <Text style={styles.btnText}>{r}</Text>
                  </TouchableOpacity>
                ))}
             </View>
             <View style={styles.controlRow}>
                <TouchableOpacity style={[styles.runBtn, styles.boundaryBtn]} onPress={() => handlePressRun(4)}>
                   <Text style={[styles.btnText, { color: '#FFD700' }]}>FOUR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.runBtn, styles.boundaryBtn]} onPress={() => handlePressRun(6)}>
                   <Text style={[styles.btnText, { color: '#FFD700' }]}>SIX</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.runBtn, styles.wicketBtn]} onPress={handlePressWicket}>
                   <Text style={styles.btnText}>OUT</Text>
                </TouchableOpacity>
             </View>
             
             {/* Extra Controls */}
             <View style={styles.controlRow}>
                <TouchableOpacity style={styles.extraBtn} onPress={() => handlePressExtra('wide')}>
                   <Text style={styles.extraBtnText}>WD</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.extraBtn} onPress={() => handlePressExtra('noball')}>
                   <Text style={styles.extraBtnText}>NB</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.extraBtn, { backgroundColor: Colors.danger+'22' }]} onPress={onBack}>
                   <Text style={[styles.extraBtnText, { color: Colors.danger }]}>EXIT</Text>
                </TouchableOpacity>
             </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { padding: 25, backgroundColor: Colors.card, borderBottomWidth: 3 },
  teamInfo: { marginBottom: 10 },
  teamName: { fontSize: 18, fontWeight: '900', letterSpacing: 1 },
  oversText: { fontSize: 13, color: Colors.textMuted, fontWeight: '800', marginTop: 4 },
  scoreRow: { flexDirection: 'row', alignItems: 'flex-end' },
  scoreText: { fontSize: 72, fontWeight: '900', color: Colors.textPrimary, lineHeight: 80 },
  wicketText: { fontSize: 36, fontWeight: '900', color: Colors.textSecondary, marginBottom: 12, marginLeft: 10 },
  targetText: { fontSize: 14, color: Colors.secondary, fontWeight: '900', marginTop: 10 },
  
  mainContent: { padding: 20 },
  recentSection: { marginBottom: 40 },
  label: { fontSize: 10, fontWeight: '900', color: Colors.textMuted, letterSpacing: 2, marginBottom: 15 },
  ballsRow: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  ballCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.surfaceVariant, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.border },
  wicketBall: { backgroundColor: Colors.danger, borderColor: Colors.danger },
  fourBall: { borderColor: '#FFD700', borderWidth: 2 },
  sixBall: { borderColor: '#FFD700', backgroundColor: '#FFD700'+'11', borderWidth: 2 },
  ballText: { fontSize: 14, fontWeight: '900', color: Colors.textPrimary },
  emptyBalls: { color: Colors.textMuted, fontStyle: 'italic' },
  
  controls: { gap: 15, marginTop: 20 },
  controlRow: { flexDirection: 'row', gap: 15 },
  runBtn: { flex: 1, height: 65, borderRadius: 15, backgroundColor: Colors.card, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.border, elevation: 3 },
  btnText: { fontSize: 18, fontWeight: '900', color: Colors.textPrimary },
  boundaryBtn: { borderColor: '#FFD700', backgroundColor: '#FFD700'+'08' },
  wicketBtn: { backgroundColor: Colors.danger+'22', borderColor: Colors.danger },
  extraBtn: { flex: 1, height: 50, borderRadius: 12, backgroundColor: Colors.surfaceVariant, alignItems: 'center', justifyContent: 'center' },
  extraBtnText: { fontSize: 14, fontWeight: '900', color: Colors.textSecondary },
  
  summaryBox: { padding: 30, backgroundColor: Colors.card, borderRadius: 24, alignItems: 'center', borderWidth: 1, borderColor: Colors.primary },
  finishTitle: { fontSize: 20, fontWeight: '900', color: Colors.primary, marginBottom: 20 },
  summaryText: { fontSize: 16, fontWeight: '700', color: Colors.textSecondary, marginBottom: 10 },
  finishBtn: { marginTop: 30, paddingHorizontal: 30, paddingVertical: 18, backgroundColor: Colors.primary, borderRadius: 15 },
  finishBtnText: { color: '#000', fontWeight: '900', fontSize: 14 },
});

export default ScoringScreen;
