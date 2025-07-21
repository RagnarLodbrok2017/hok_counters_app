import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Card, Title, Chip, Searchbar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme/theme';
import heroesData from '../data/heroes.json';

const TierListScreen = () => {
  const [selectedRole, setSelectedRole] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const roles = ['All', 'Tank', 'Fighter', 'Assassin', 'Mage', 'Marksman', 'Support'];
  const tiers = ['S+', 'S', 'A', 'B', 'C'];

  const getTierColor = (tier: string) => {
    const tierColors: { [key: string]: string } = {
      'S+': '#FF4444',
      'S': '#FF9800',
      'A': '#4CAF50',
      'B': '#2196F3',
      'C': '#9E9E9E',
    };
    return tierColors[tier] || colors.primary;
  };

  const getRoleIcon = (role: string) => {
    const roleIcons: { [key: string]: string } = {
      Tank: 'shield',
      Fighter: 'sword',
      Assassin: 'knife',
      Mage: 'auto-fix',
      Marksman: 'bow-arrow',
      Support: 'heart',
    };
    return roleIcons[role] || 'help';
  };

  const filteredHeroes = heroesData.filter(hero => {
    const matchesRole = selectedRole === 'All' || hero.role === selectedRole;
    const matchesSearch = hero.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const groupedByTier = tiers.reduce((acc, tier) => {
    acc[tier] = filteredHeroes.filter(hero => hero.tier === tier);
    return acc;
  }, {} as { [key: string]: any[] });

  const renderHeroItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.heroItem}>
      <LinearGradient
        colors={[getTierColor(item.tier), `${getTierColor(item.tier)}80`]}
        style={styles.heroGradient}
      >
        <Image source={{ uri: item.image }} style={styles.heroAvatar} />
        <View style={styles.heroInfo}>
          <Text style={styles.heroName}>{item.name}</Text>
          <View style={styles.heroMeta}>
            <Icon 
              name={getRoleIcon(item.role)} 
              size={12} 
              color="#FFFFFF" 
              style={styles.roleIcon}
            />
            <Text style={styles.heroRole}>{item.role}</Text>
          </View>
        </View>
        <View style={styles.heroStats}>
          <Text style={styles.winRate}>{item.winRate}%</Text>
          <Text style={styles.statLabel}>WR</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderTierSection = (tier: string) => {
    const heroes = groupedByTier[tier];
    if (heroes.length === 0) return null;

    return (
      <View key={tier} style={styles.tierSection}>
        <View style={styles.tierHeader}>
          <LinearGradient
            colors={[getTierColor(tier), `${getTierColor(tier)}80`]}
            style={styles.tierBadge}
          >
            <Text style={styles.tierTitle}>{tier}</Text>
            <Text style={styles.tierCount}>({heroes.length})</Text>
          </LinearGradient>
          <View style={styles.tierDescription}>
            <Text style={styles.tierDescText}>
              {getTierDescription(tier)}
            </Text>
          </View>
        </View>
        <FlatList
          data={heroes}
          renderItem={renderHeroItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>
    );
  };

  const getTierDescription = (tier: string) => {
    const descriptions: { [key: string]: string } = {
      'S+': 'Overpowered - Ban or pick priority',
      'S': 'Very Strong - Excellent in current meta',
      'A': 'Strong - Solid picks for ranked',
      'B': 'Balanced - Situational but viable',
      'C': 'Weak - Needs buffs or specific comps',
    };
    return descriptions[tier] || '';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Tier List</Title>
        <Text style={styles.headerSubtitle}>Patch 1.98.1.15 • Updated Daily</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search heroes..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
          iconColor={colors.primary}
        />
      </View>

      {/* Role Filter */}
      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={roles}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.roleFilter,
                selectedRole === item && styles.activeRoleFilter
              ]}
              onPress={() => setSelectedRole(item)}
            >
              <Text style={[
                styles.roleFilterText,
                selectedRole === item && styles.activeRoleFilterText
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.rolesList}
        />
      </View>

      {/* Tier List */}
      <FlatList
        data={tiers}
        renderItem={({ item }) => renderTierSection(item)}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.tierList}
      />

      {/* Legend */}
      <Card style={styles.legendCard}>
        <Card.Content>
          <Text style={styles.legendTitle}>Tier Explanations</Text>
          <View style={styles.legendGrid}>
            {tiers.map(tier => (
              <View key={tier} style={styles.legendItem}>
                <View style={[styles.legendBadge, { backgroundColor: getTierColor(tier) }]}>
                  <Text style={styles.legendTier}>{tier}</Text>
                </View>
                <Text style={styles.legendDesc}>{getTierDescription(tier)}</Text>
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 5,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  searchBar: {
    backgroundColor: colors.surface,
    elevation: 0,
  },
  searchInput: {
    color: colors.textPrimary,
  },
  filterContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  rolesList: {
    paddingRight: 15,
  },
  roleFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: colors.surface,
  },
  activeRoleFilter: {
    backgroundColor: colors.primary,
  },
  roleFilterText: {
    color: colors.textSecondary,
    fontWeight: '600',
  },
  activeRoleFilterText: {
    color: '#FFFFFF',
  },
  tierList: {
    paddingHorizontal: 20,
  },
  tierSection: {
    marginBottom: 25,
  },
  tierHeader: {
    marginBottom: 15,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  tierTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  tierCount: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.8,
  },
  tierDescription: {
    paddingLeft: 5,
  },
  tierDescText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontStyle: 'italic',
  },
  heroItem: {
    marginBottom: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  heroGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  heroAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  heroInfo: {
    flex: 1,
    marginLeft: 15,
  },
  heroName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  heroMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleIcon: {
    marginRight: 4,
  },
  heroRole: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.8,
  },
  heroStats: {
    alignItems: 'center',
  },
  winRate: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#FFFFFF',
    fontSize: 10,
    opacity: 0.7,
  },
  legendCard: {
    margin: 20,
    backgroundColor: colors.surface,
  },
  legendTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  legendGrid: {
    gap: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
    minWidth: 30,
    alignItems: 'center',
  },
  legendTier: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  legendDesc: {
    color: colors.textSecondary,
    fontSize: 12,
    flex: 1,
  },
});

export default TierListScreen;