import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Franchise } from '../data/franchises';
import Colors from '../theme/colors';

interface Props {
  franchise: Franchise;
  onPress?: (f: Franchise) => void;
  selected?: boolean;
  showPurse?: boolean;
}

const FranchiseCard: React.FC<Props> = ({ franchise, onPress, selected, showPurse }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress?.(franchise)}
      activeOpacity={0.85}
      style={[
        styles.container,
        { borderLeftColor: franchise.primaryColor },
        selected && { backgroundColor: franchise.primaryColor + '11', borderColor: franchise.primaryColor }
      ]}
    >
      {/* Team Hex/Circle Logo */}
      <View style={[styles.logoWrap, { borderColor: franchise.primaryColor + '44' }]}>
         <View style={[styles.logoBg, { backgroundColor: franchise.primaryColor + '15' }]}>
            {franchise.logo ? (
              <Image source={franchise.logo} style={styles.logoImage} />
            ) : (
              <Text style={styles.logoEmoji}>{franchise.logoEmoji}</Text>
            )}
         </View>
      </View>

      {/* Info Cluster */}
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.teamName}>{franchise.name}</Text>
          <View style={[styles.shBadge, { backgroundColor: franchise.primaryColor }]}>
             <Text style={styles.shText}>{franchise.shortName}</Text>
          </View>
        </View>
        <Text style={styles.city}>{franchise.city.toUpperCase()}</Text>
        
        {showPurse && (
          <View style={styles.purseBox}>
            <View style={[styles.purseDot, { backgroundColor: franchise.primaryColor }]} />
            <Text style={styles.purseLabel}>BALANCE: </Text>
            <Text style={[styles.purseValue, { color: Colors.textPrimary }]}>₹{franchise.purse}L</Text>
          </View>
        )}
      </View>

      {/* Squad Count */}
      <View style={styles.squadBox}>
         <Text style={styles.squadNum}>{franchise.playerIds.length}</Text>
         <Text style={styles.squadLbl}>SQUAD</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    borderLeftWidth: 4,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  logoWrap: {
    width: 60,
    height: 60,
    borderRadius: 18,
    borderWidth: 1,
    padding: 3,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBg: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoEmoji: {
    fontSize: 24,
  },
  logoImage: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  teamName: {
    fontSize: 15,
    fontWeight: '900',
    color: Colors.textPrimary,
  },
  shBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  shText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#000',
  },
  city: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '800',
    letterSpacing: 1,
    marginTop: 2,
  },
  purseBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  purseDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginRight: 6,
  },
  purseLabel: {
    fontSize: 9,
    color: Colors.textMuted,
    fontWeight: '900',
  },
  purseValue: {
    fontSize: 11,
    fontWeight: '900',
  },
  squadBox: {
    alignItems: 'center',
    paddingLeft: 12,
    borderLeftWidth: 1,
    borderLeftColor: Colors.border,
    minWidth: 50,
  },
  squadNum: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.textPrimary,
  },
  squadLbl: {
    fontSize: 7,
    fontWeight: '900',
    color: Colors.textMuted,
    marginTop: 2,
  },
});

export default FranchiseCard;
