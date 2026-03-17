import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { playerService } from '../services/playerService';
import { franchiseService } from '../services/franchiseService';
import { initializeAuction } from '../store/slices/auctionSlice';
import { PLAYERS } from '../data/players';
import { FRANCHISES } from '../data/franchises';
import Colors from '../theme/colors';

const DataLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const dispatch = useDispatch();

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try fetching from API
      const [apiPlayers, apiFranchises] = await Promise.all([
        playerService.getAllPlayers(),
        franchiseService.getAllFranchises(),
      ]);

      dispatch(initializeAuction({ players: apiPlayers, franchises: apiFranchises }));
      setLoading(false);
    } catch (err) {
      console.log('API not reachable, falling back to local data:', err);
      
      // Fallback to local .ts files automatically
      // This ensures the app works even if the backend isn't running
      dispatch(initializeAuction({ 
        players: PLAYERS, 
        franchises: FRANCHISES 
      }));
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.text}>Synchronizing Arena Data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={loadInitialData}>
           <Text style={styles.retryText}>Reload and Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginTop: 20,
    color: Colors.textSecondary,
    fontWeight: '700',
    letterSpacing: 1,
  },
  errorIcon: { fontSize: 50, marginBottom: 20 },
  errorText: { color: Colors.danger, textAlign: 'center', fontWeight: '700', marginBottom: 10 },
  retryText: { color: Colors.primary, fontWeight: '900', textDecorationLine: 'underline' },
});

export default DataLoader;
