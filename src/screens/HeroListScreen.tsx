import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Searchbar, Chip, Card, Title, Paragraph } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme/theme';
import { useLanguage } from '../context/LanguageContext';
import heroesData from '../data/allHeroes.json';

const { width } = Dimensions.get('window');

const HeroListScreen = ({ navigation }: any) => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');

  const roles = ['All', 'Tank', 'Fighter', 'Assassin', 'Mage', 'Marksman', 'Support'];

  const getRoleColor = (role: string) => {
    const roleColors: { [key: string]: string } = {
      Tank: '#2196F3',
      Fighter: '#FF9800',
      Assassin: '#F44336',
      Mage: '#9C27B0',
      Marksman: '#4CAF50',
      Support: '#00BCD4',
    };
    return roleColors[role] || colors.primary;
  };

  const filteredHeroes = useMemo(() => {
    return heroesData.filter((hero) => {
      const matchesSearch = hero.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           hero.nameArabic.includes(searchQuery) ||
                           hero.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = selectedRole === 'All' || hero.role === selectedRole;
      return matchesSearch && matchesRole;
    });
  }, [searchQuery, selectedRole]);

  const renderHeroCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.heroCard}
      onPress={() => navigation.navigate('HeroDetail', { hero: item })}
    >
      <Card style={styles.card}>
        <LinearGradient
          colors={[getRoleColor(item.role), `${getRoleColor(item.role)}80`]}
          style={styles.cardGradient}
        >
          <View style={styles.heroHeader}>
            <Image source={{ uri: item.image }} style={styles.heroImage} />
            <View style={styles.tierBadge}>
              <Text style={styles.tierText}>{item.tier}</Text>
            </View>
          </View>
          <View style={styles.heroInfo}>
            <Title style={styles.heroName}>{item.name}</Title>
            <Text style={styles.heroNameArabic}>{item.nameArabic}</Text>
            <Paragraph style={styles.heroTitle}>{item.title}</Paragraph>
            <View style={styles.heroMeta}>
              <View style={styles.roleChip}>
                <Text style={styles.roleText}>{item.role}</Text>
              </View>
              <Text style={styles.difficulty}>{item.difficulty}</Text>
            </View>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{item.winRate}%</Text>
                <Text style={styles.statLabel}>Win Rate</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{item.pickRate}%</Text>
                <Text style={styles.statLabel}>Pick Rate</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{item.banRate}%</Text>
                <Text style={styles.statLabel}>Ban Rate</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder={t('search') + ' heroes...'}
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
            <Chip
              selected={selectedRole === item}
              onPress={() => setSelectedRole(item)}
              style={[
                styles.roleChipFilter,
                selectedRole === item && { backgroundColor: colors.primary }
              ]}
              textStyle={[
                styles.roleChipText,
                selectedRole === item && { color: '#FFFFFF' }
              ]}
            >
              {item}
            </Chip>
          )}
          contentContainerStyle={styles.rolesList}
        />
      </View>

      {/* Heroes List */}
      <FlatList
        data={filteredHeroes}
        renderItem={renderHeroCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.herosList}
        showsVerticalScrollIndicator={false}
      />

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {filteredHeroes.length} heroes found
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    padding: 15,
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
    marginBottom: 10,
  },
  rolesList: {
    paddingRight: 15,
  },
  roleChipFilter: {
    marginRight: 8,
    backgroundColor: colors.surface,
  },
  roleChipText: {
    color: colors.textSecondary,
  },
  herosList: {
    padding: 15,
  },
  row: {
    justifyContent: 'space-between',
  },
  heroCard: {
    width: (width - 45) / 2,
    marginBottom: 15,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 15,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: 15,
  },
  heroHeader: {
    alignItems: 'center',
    position: 'relative',
  },
  heroImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  tierBadge: {
    position: 'absolute',
    top: -5,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tierText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  heroInfo: {
    marginTop: 10,
    alignItems: 'center',
  },
  heroName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
  },
  heroNameArabic: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 5,
    fontFamily: 'System',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 11,
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 8,
  },
  heroMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  roleChip: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  roleText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  difficulty: {
    color: '#FFFFFF',
    fontSize: 10,
    opacity: 0.8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#FFFFFF',
    fontSize: 8,
    opacity: 0.7,
    marginTop: 2,
  },
  resultsContainer: {
    padding: 15,
    alignItems: 'center',
  },
  resultsText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
});

export default HeroListScreen;