import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Searchbar, Chip, Card, Title, Paragraph, Snackbar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme/theme';
import { useLanguage } from '../context/LanguageContext';
import { useAllHeroes, useHeroSearch } from '../hooks/useHeroes';

const { width } = Dimensions.get('window');

const HeroListScreen = ({ navigation }: any) => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [showError, setShowError] = useState(false);

  const roles = ['All', 'Tank', 'Fighter', 'Assassin', 'Mage', 'Marksman', 'Support'];

  // Use real API data
  const {
    data: allHeroes = [],
    isLoading,
    error,
    refetch
  } = useAllHeroes();

  const {
    data: searchResults = [],
    isLoading: isSearching
  } = useHeroSearch(searchQuery);

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
    let filtered = searchQuery.length >= 2 ? searchResults : allHeroes;

    if (selectedRole !== 'All') {
      filtered = filtered.filter(hero => hero.role === selectedRole);
    }

    return filtered;
  }, [allHeroes, searchResults, selectedRole, searchQuery]);

  const renderHeroCard = ({ item }: { item: any }) => {
    const heroImage = item.skins?.[0]?.image || 'https://via.placeholder.com/150x150/333/fff?text=Hero';

    return (
      <TouchableOpacity
        style={styles.heroCard}
        onPress={() => navigation.navigate('HeroDetail', {
          hero: item,
          heroName: item.name
        })}
      >
        <Card style={styles.card}>
          <LinearGradient
            colors={[getRoleColor(item.role), `${getRoleColor(item.role)}80`]}
            style={styles.cardGradient}
          >
            <View style={styles.heroHeader}>
              <Image source={{ uri: heroImage }} style={styles.heroImage} />
              <View style={styles.tierBadge}>
                <Text style={styles.tierText}>
                  {item.tier || Math.floor(item.stats?.survival / 20) || 'A'}
                </Text>
              </View>
            </View>
            <View style={styles.heroInfo}>
              <Title style={styles.heroName}>{item.name}</Title>
              <Text style={styles.heroNameArabic}>{item.nameArabic || ''}</Text>
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
                  <Text style={styles.statValue}>{item.banRate || 0}%</Text>
                  <Text style={styles.statLabel}>Ban Rate</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Card>
      </TouchableOpacity>
    );
  };

  const renderLoadingState = () => (
    <View style={styles.loadingState}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.loadingText}>Loading heroes...</Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="magnify-close" size={64} color={colors.textSecondary} />
      <Text style={styles.emptyTitle}>No heroes found</Text>
      <Text style={styles.emptySubtitle}>
        {searchQuery
          ? `No results for "${searchQuery}"`
          : 'Try adjusting your filters'
        }
      </Text>
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.errorState}>
      <Icon name="alert-circle-outline" size={64} color={colors.error || '#F44336'} />
      <Text style={styles.errorTitle}>Failed to load heroes</Text>
      <Text style={styles.errorSubtitle}>
        Please check your connection and try again
      </Text>
      <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  if (error) {
    return (
      <View style={styles.container}>
        {renderErrorState()}
      </View>
    );
  }

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
          right={() => (isSearching && searchQuery.length >= 2) ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : null}
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
      {isLoading ? (
        renderLoadingState()
      ) : filteredHeroes.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={filteredHeroes}
          renderItem={renderHeroCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.herosList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={refetch}
              colors={[colors.primary]}
            />
          }
        />
      )}

      {/* Results Count */}
      {!isLoading && filteredHeroes.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsText}>
            {filteredHeroes.length} heroes found
          </Text>
        </View>
      )}

      <Snackbar
        visible={showError}
        onDismiss={() => setShowError(false)}
        duration={3000}
        action={{
          label: 'Retry',
          onPress: () => refetch(),
        }}
      >
        Failed to load heroes data
      </Snackbar>
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
  // Loading state styles
  loadingState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 16,
    marginTop: 16,
  },
  // Empty state styles
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
  },
  // Error state styles
  errorState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  errorSubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HeroListScreen;