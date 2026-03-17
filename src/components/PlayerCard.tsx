import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { Player } from '../data/players';
import { TierColors, Colors } from '../theme/colors';

const { width } = Dimensions.get('window');

interface Props {
  player: Player;
  onPress?: (player: Player) => void;
  showSoldBadge?: boolean;
  compact?: boolean;
}

const ROLE_ICONS: Record<string, string> = {
  'Batsman': '🏏',
  'Bowler': '🎳',
  'All-Rounder': '⚡',
  'Wicket-Keeper': '🧤',
};

const FLAG_EMOJIS: Record<string, string> = {
  'India': '🇮🇳',
  'Australia': '🇦🇺',
  'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  'South Africa': '🇿🇦',
  'Sri Lanka': '🇱🇰',
  'West Indies': '🌴',
  'Afghanistan': '🇦🇫',
  'Pakistan': '🇵🇰',
  'Ireland': '🇮🇪',
};

const PlayerCard: React.FC<Props> = ({ player, onPress, showSoldBadge, compact }) => {
  const tier = TierColors[player.tier];

  return (
    <TouchableOpacity
      onPress={() => onPress?.(player)}
      activeOpacity={0.85}
      style={[
        styles.container, 
        { borderColor: tier.border + '33' }, 
        compact && styles.compact
      ]}
    >
      {/* Tier Glow */}
      <View style={[styles.tierIndicator, { backgroundColor: tier.border }]} />

      {/* Avatar with Glow */}
      <View style={[styles.avatarContainer, { borderColor: tier.border + '55' }]}>
        <View style={[styles.avatar, { backgroundColor: tier.bg }]}>
          <Text style={styles.avatarEmoji}>{ROLE_ICONS[player.role]}</Text>
        </View>
        <View style={[styles.avatarGlow, { backgroundColor: tier.border + '22' }]} />
      </View>

      {/* Info */}
      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>{player.name}</Text>
          <View style={[styles.tierBadge, { backgroundColor: tier.border + '22' }]}>
            <Text style={[styles.tierBadgeText, { color: tier.border }]}>{player.tier}</Text>
          </View>
        </View>
        
        <Text style={styles.country}>
          {FLAG_EMOJIS[player.country] || '🏴'} {player.country}
        </Text>

        <View style={styles.tags}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{ROLE_ICONS[player.role]} {player.role}</Text>
          </View>
          {player.nationality === 'Overseas' && (
            <View style={[styles.tag, { backgroundColor: Colors.secondary + '15' }]}>
              <Text style={[styles.tagText, { color: Colors.secondary }]}>OVERSEAS</Text>
            </View>
          )}
        </View>
      </View>

      {/* Price / Status */}
      <View style={styles.priceBlock}>
        <Text style={styles.priceLabel}>BASE PRICE</Text>
        <Text style={[styles.price, { color: Colors.textPrimary }]}>₹{player.basePrice}L</Text>
        
        {showSoldBadge && player.isSold && (
          <View style={[styles.statusBadge, { backgroundColor: Colors.success + '22' }]}>
            <Text style={[styles.statusText, { color: Colors.success }]}>SOLD</Text>
          </View>
        )}
        {showSoldBadge && !player.isSold && (
          <View style={[styles.statusBadge, { backgroundColor: Colors.danger + '22' }]}>
            <Text style={[styles.statusText, { color: Colors.danger }]}>UNSOLD</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  compact: {
    padding: 12,
    marginBottom: 8,
  },
  tierIndicator: {
    position: 'absolute',
    left: 0,
    top: 15,
    bottom: 15,
    width: 3,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    padding: 2,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarGlow: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    zIndex: -1,
  },
  avatarEmoji: {
    fontSize: 22,
  },
  info: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    gap: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '900',
    color: Colors.textPrimary,
  },
  tierBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  tierBadgeText: {
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1,
  },
  country: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginBottom: 8,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    backgroundColor: Colors.surfaceVariant,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 9,
    color: Colors.textSecondary,
    fontWeight: '800',
  },
  priceBlock: {
    alignItems: 'flex-end',
    minWidth: 80,
  },
  priceLabel: {
    fontSize: 8,
    color: Colors.textMuted,
    fontWeight: '900',
    letterSpacing: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: '900',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 6,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});

export default PlayerCard;
