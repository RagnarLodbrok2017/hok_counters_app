import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Card, Avatar, Chip, ProgressBar } from 'react-native-paper';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/theme';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 2 cards per row with margins

interface HeroCardProps {
  hero: {
    id: string;
    name: string;
    title: string;
    role: string;
    difficulty: string;
    stats: {
      survival: number;
      attack: number;
      ability: number;
      difficulty: number;
    };
    skins: Array<{
      id: string;
      name: string;
      image: string;
    }>;
    winRate: number;
    pickRate: number;
  };
  onPress: () => void;
  compact?: boolean;
}

const getRoleColor = (role: string): string => {
  const roleColors: Record<string, string> = {
    Tank: '#4CAF50',
    Fighter: '#FF9800',
    Assassin: '#F44336',
    Mage: '#9C27B0',
    Marksman: '#2196F3',
    Support: '#00BCD4',
  };
  return roleColors[role] || theme.colors.primary;
};

const getDifficultyColor = (difficulty: string): string => {
  const difficultyColors: Record<string, string> = {
    Easy: '#4CAF50',
    Medium: '#FF9800',
    Hard: '#F44336',
  };
  return difficultyColors[difficulty] || theme.colors.primary;
};

export const HeroCard: React.FC<HeroCardProps> = ({ hero, onPress, compact = false }) => {
  const roleColor = getRoleColor(hero.role);
  const difficultyColor = getDifficultyColor(hero.difficulty);
  const heroImage = hero.skins?.[0]?.image || 'https://via.placeholder.com/150x150/333/fff?text=Hero';

  if (compact) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.compactCard}>
        <View style={styles.compactContent}>
          <Image
            source={{ uri: heroImage }}
            style={styles.compactAvatar}
            contentFit="cover"
          />
          <View style={styles.compactInfo}>
            <Text style={styles.compactName} numberOfLines={1}>
              {hero.name}
            </Text>
            <Text style={styles.compactRole} numberOfLines={1}>
              {hero.role}
            </Text>
          </View>
          <View style={styles.compactStats}>
            <Text style={styles.compactWinRate}>
              {hero.winRate}%
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, { width: cardWidth }]}>
      <Card style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: heroImage }}
            style={styles.heroImage}
            contentFit="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.imageOverlay}
          />
          <View style={styles.imageContent}>
            <Chip
              mode="flat"
              textStyle={styles.roleChipText}
              style={[styles.roleChip, { backgroundColor: roleColor }]}
            >
              {hero.role}
            </Chip>
          </View>
        </View>

        <Card.Content style={styles.cardContent}>
          <Text style={styles.heroName} numberOfLines={1}>
            {hero.name}
          </Text>
          <Text style={styles.heroTitle} numberOfLines={1}>
            {hero.title}
          </Text>

          <View style={styles.statsContainer}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Survival</Text>
              <ProgressBar
                progress={hero.stats.survival / 100}
                color={theme.colors.primary}
                style={styles.progressBar}
              />
              <Text style={styles.statValue}>{hero.stats.survival}%</Text>
            </View>

            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Attack</Text>
              <ProgressBar
                progress={hero.stats.attack / 100}
                color="#FF9800"
                style={styles.progressBar}
              />
              <Text style={styles.statValue}>{hero.stats.attack}%</Text>
            </View>

            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Ability</Text>
              <ProgressBar
                progress={hero.stats.ability / 100}
                color="#9C27B0"
                style={styles.progressBar}
              />
              <Text style={styles.statValue}>{hero.stats.ability}%</Text>
            </View>
          </View>

          <View style={styles.bottomRow}>
            <Chip
              mode="flat"
              textStyle={styles.difficultyChipText}
              style={[styles.difficultyChip, { backgroundColor: difficultyColor }]}
            >
              {hero.difficulty}
            </Chip>
            <View style={styles.ratesContainer}>
              <Text style={styles.rateText}>WR: {hero.winRate}%</Text>
              <Text style={styles.rateText}>PR: {hero.pickRate}%</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  cardContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
  },
  imageContainer: {
    height: 120,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  imageContent: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  roleChip: {
    height: 24,
  },
  roleChipText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 12,
  },
  heroName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: 2,
  },
  heroTitle: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 12,
  },
  statsContainer: {
    marginBottom: 12,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 10,
    color: theme.colors.onSurfaceVariant,
    width: 45,
  },
  progressBar: {
    flex: 1,
    height: 4,
    marginHorizontal: 8,
    borderRadius: 2,
  },
  statValue: {
    fontSize: 10,
    color: theme.colors.onSurface,
    width: 30,
    textAlign: 'right',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyChip: {
    height: 20,
  },
  difficultyChipText: {
    color: 'white',
    fontSize: 9,
    fontWeight: 'bold',
  },
  ratesContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  rateText: {
    fontSize: 10,
    color: theme.colors.onSurfaceVariant,
  },
  // Compact styles
  compactCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  compactContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  compactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  compactInfo: {
    flex: 1,
  },
  compactName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: 2,
  },
  compactRole: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
  },
  compactStats: {
    alignItems: 'flex-end',
  },
  compactWinRate: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});