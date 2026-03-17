import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity,
  Alert, ActivityIndicator, KeyboardAvoidingView, Platform
} from 'react-native';
import { useDispatch } from 'react-redux';
import Colors from '../theme/colors';
import { playerService } from '../services/playerService';
import { PlayerRole, PlayerTier } from '../data/players';
import { addPlayerLocally } from '../store/slices/auctionSlice';

const AddPlayerScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    age: '',
    role: 'Batsman' as PlayerRole,
    tier: 'BRONZE' as PlayerTier,
    basePrice: '',
    nationality: 'Indian' as 'Indian' | 'Overseas',
    speciality: '',
    leagueIds: 'ipl', 
  });

  const roles: PlayerRole[] = ['Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper'];
  const tiers: PlayerTier[] = ['GOLD', 'SILVER', 'BRONZE'];

  const handleSave = async () => {
    if (!formData.name || !formData.country || !formData.basePrice) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    try {
      setLoading(true);
      const playerToSave = {
        id: `p${Date.now()}`,
        ...formData,
        age: parseInt(formData.age) || 25,
        basePrice: parseFloat(formData.basePrice),
        speciality: formData.speciality.split(',').map(s => s.trim()).filter(s => s),
        leagueIds: formData.leagueIds.split(',').map(s => s.trim()),
        batting: {
          t10: { matches: 0 }, t20: { matches: 0 }, odi: { matches: 0 }, test: { matches: 0 }
        },
        bowling: {
          style: 'N/A',
          t10: { matches: 0 }, t20: { matches: 0 }, odi: { matches: 0 }, test: { matches: 0 }
        },
        fielding: { catches: 0, runOuts: 0, agility: 5 },
        profileColor: Colors.primary
      };

      try {
        await playerService.createPlayer(playerToSave as any); 
      } catch (apiError) {
        console.log('Backend not available, saving to local state only:', apiError);
      }
      
      // Always update local state so the user sees the new player immediately
      dispatch(addPlayerLocally(playerToSave as any));
      
      Alert.alert('Success', 'Player added to the arena!');
      setFormData({
        name: '', country: '', age: '', role: 'Batsman', tier: 'BRONZE',
        basePrice: '', nationality: 'Indian', speciality: '', leagueIds: 'ipl'
      });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save player');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>DRAFT NEW ATHLETE</Text>
        <Text style={styles.subtitle}>Fill the scouting report to add a player to the database</Text>

        <View style={styles.form}>
          <Text style={styles.label}>FULL NAME *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Virat Kohli"
            placeholderTextColor={Colors.textMuted}
            value={formData.name}
            onChangeText={t => setFormData({ ...formData, name: t })}
          />

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.label}>COUNTRY *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. India"
                placeholderTextColor={Colors.textMuted}
                value={formData.country}
                onChangeText={t => setFormData({ ...formData, country: t })}
              />
            </View>
            <View style={{ width: 80 }}>
              <Text style={styles.label}>AGE</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="25"
                placeholderTextColor={Colors.textMuted}
                value={formData.age}
                onChangeText={t => setFormData({ ...formData, age: t })}
              />
            </View>
          </View>

          <Text style={styles.label}>PLAYER ROLE</Text>
          <View style={styles.pickerRow}>
            {roles.map(r => (
              <TouchableOpacity
                key={r}
                style={[styles.pickerBtn, formData.role === r && styles.activePicker]}
                onPress={() => setFormData({ ...formData, role: r })}
              >
                <Text style={[styles.pickerText, formData.role === r && styles.activePickerText]}>{r}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>TIER CATEGORY</Text>
          <View style={styles.pickerRow}>
            {tiers.map(t => (
              <TouchableOpacity
                key={t}
                style={[styles.pickerBtn, formData.tier === t && styles.activePicker]}
                onPress={() => setFormData({ ...formData, tier: t })}
              >
                <Text style={[styles.pickerText, formData.tier === t && styles.activePickerText]}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.label}>BASE PRICE (LAKHS) *</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="200"
                placeholderTextColor={Colors.textMuted}
                value={formData.basePrice}
                onChangeText={t => setFormData({ ...formData, basePrice: t })}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>NATIONALITY</Text>
              <View style={styles.pickerRow}>
                {['Indian', 'Overseas'].map(n => (
                  <TouchableOpacity
                    key={n}
                    style={[styles.pickerBtn, formData.nationality === n && styles.activePicker]}
                    onPress={() => setFormData({ ...formData, nationality: n as any })}
                  >
                    <Text style={[styles.pickerText, formData.nationality === n && styles.activePickerText]}>{n}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <Text style={styles.label}>SPECIALITIES (COMMA SEPARATED)</Text>
          <TextInput
            style={styles.input}
            placeholder="Six Machine, Powerplay Specialist"
            placeholderTextColor={Colors.textMuted}
            value={formData.speciality}
            onChangeText={t => setFormData({ ...formData, speciality: t })}
          />

          <Text style={styles.label}>LEAGUE IDS (COMMA SEPARATED)</Text>
          <TextInput
            style={styles.input}
            placeholder="ipl, sa20, bbl"
            placeholderTextColor={Colors.textMuted}
            value={formData.leagueIds}
            onChangeText={t => setFormData({ ...formData, leagueIds: t })}
          />

          <TouchableOpacity 
            style={[styles.submitBtn, loading && styles.disabledBtn]} 
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.submitText}>REGISTER PLAYER 🚀</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: 25, paddingBottom: 50 },
  title: { fontSize: 28, fontWeight: '900', color: Colors.textPrimary, letterSpacing: 2 },
  subtitle: { fontSize: 13, color: Colors.textSecondary, marginTop: 8, marginBottom: 30, fontWeight: '600' },
  form: { gap: 20 },
  label: { fontSize: 10, fontWeight: '900', color: Colors.textMuted, letterSpacing: 1.5, marginBottom: 8 },
  input: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 15,
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  row: { flexDirection: 'row', alignItems: 'flex-end' },
  pickerRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pickerBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activePicker: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '11',
  },
  pickerText: { color: Colors.textMuted, fontSize: 11, fontWeight: '800' },
  activePickerText: { color: Colors.primary },
  submitBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: Colors.primary,
    shadowRadius: 10,
    shadowOpacity: 0.3,
    elevation: 5,
  },
  disabledBtn: { opacity: 0.6 },
  submitText: { color: '#000', fontWeight: '900', fontSize: 15, letterSpacing: 1 },
});

export default AddPlayerScreen;
