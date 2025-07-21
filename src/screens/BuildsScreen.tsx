import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Card, Title, Paragraph, Chip, Button, Divider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme/theme';
import buildsData from '../data/builds.json';
import heroesData from '../data/heroes.json';

const BuildsScreen = () => {
  const [selectedType, setSelectedType] = useState('All');
  const [expandedBuild, setExpandedBuild] = useState<string | null>(null);

  const buildTypes = ['All', 'jungle', 'mid', 'solo', 'support', 'adc'];

  const getHeroName = (heroId: string) => {
    const hero = heroesData.find(h => h.id === heroId);
    return hero ? hero.name : 'Unknown Hero';
  };

  const getTypeColor = (type: string) => {
    const typeColors: { [key: string]: string } = {
      jungle: '#4CAF50',
      mid: '#9C27B0',
      solo: '#FF9800',
      support: '#00BCD4',
      adc: '#F44336',
    };
    return typeColors[type] || colors.primary;
  };

  const filteredBuilds = buildsData.filter(build => 
    selectedType === 'All' || build.type === selectedType
  );

  const renderBuildCard = ({ item }: { item: any }) => {
    const isExpanded = expandedBuild === item.id;
    
    return (
      <Card style={styles.buildCard}>
        <TouchableOpacity
          onPress={() => setExpandedBuild(isExpanded ? null : item.id)}
        >
          <LinearGradient
            colors={[getTypeColor(item.type), `${getTypeColor(item.type)}40`]}
            style={styles.buildHeader}
          >
            <View style={styles.buildTitleRow}>
              <View style={styles.buildInfo}>
                <Title style={styles.buildName}>{item.name}</Title>
                <Paragraph style={styles.heroName}>{getHeroName(item.heroId)}</Paragraph>
              </View>
              <View style={styles.buildMeta}>
                <View style={styles.ratingContainer}>
                  <Icon name="star" size={16} color="#FFD93D" />
                  <Text style={styles.rating}>{item.rating}</Text>
                </View>
                <Text style={styles.votes}>({item.votes} votes)</Text>
              </View>
            </View>
            
            <View style={styles.buildTags}>
              <Chip style={styles.typeChip} textStyle={styles.chipText}>
                {item.type.toUpperCase()}
              </Chip>
              <Chip style={styles.patchChip} textStyle={styles.chipText}>
                {item.patch}
              </Chip>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.buildDetails}>
            {/* Core Items */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Core Items</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.itemsRow}>
                  {item.items.core.map((itemName: string, index: number) => (
                    <View key={index} style={styles.itemCard}>
                      <View style={styles.itemIcon}>
                        <Icon name="sword" size={20} color={colors.primary} />
                      </View>
                      <Text style={styles.itemName}>{itemName}</Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>

            <Divider style={styles.divider} />

            {/* Arcana */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Arcana Setup</Text>
              <View style={styles.arcanaRow}>
                <View style={styles.arcanaItem}>
                  <View style={[styles.arcanaIcon, { backgroundColor: '#F44336' }]}>
                    <Text style={styles.arcanaText}>R</Text>
                  </View>
                  <Text style={styles.arcanaName}>{item.arcana.red}</Text>
                </View>
                <View style={styles.arcanaItem}>
                  <View style={[styles.arcanaIcon, { backgroundColor: '#2196F3' }]}>
                    <Text style={styles.arcanaText}>B</Text>
                  </View>
                  <Text style={styles.arcanaName}>{item.arcana.blue}</Text>
                </View>
                <View style={styles.arcanaItem}>
                  <View style={[styles.arcanaIcon, { backgroundColor: '#4CAF50' }]}>
                    <Text style={styles.arcanaText}>G</Text>
                  </View>
                  <Text style={styles.arcanaName}>{item.arcana.green}</Text>
                </View>
              </View>
            </View>

            <Divider style={styles.divider} />

            {/* Game Phases */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Strategy Guide</Text>
              <View style={styles.phaseContainer}>
                <View style={styles.phase}>
                  <Text style={styles.phaseTitle}>Early Game</Text>
                  <Text style={styles.phaseText}>{item.gamePhase.early}</Text>
                </View>
                <View style={styles.phase}>
                  <Text style={styles.phaseTitle}>Mid Game</Text>
                  <Text style={styles.phaseText}>{item.gamePhase.mid}</Text>
                </View>
                <View style={styles.phase}>
                  <Text style={styles.phaseTitle}>Late Game</Text>
                  <Text style={styles.phaseText}>{item.gamePhase.late}</Text>
                </View>
              </View>
            </View>

            <Divider style={styles.divider} />

            {/* Build Info */}
            <View style={styles.buildFooter}>
              <Text style={styles.author}>By {item.author}</Text>
              <Text style={styles.lastUpdated}>Updated: {item.lastUpdated}</Text>
            </View>
          </View>
        )}
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterRow}>
            {buildTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.filterTab,
                  selectedType === type && styles.activeFilterTab
                ]}
                onPress={() => setSelectedType(type)}
              >
                <Text style={[
                  styles.filterText,
                  selectedType === type && styles.activeFilterText
                ]}>
                  {type === 'All' ? 'All Builds' : type.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Builds List */}
      <FlatList
        data={filteredBuilds}
        renderItem={renderBuildCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.buildsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filterContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  filterTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: colors.surface,
  },
  activeFilterTab: {
    backgroundColor: colors.primary,
  },
  filterText: {
    color: colors.textSecondary,
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  buildsList: {
    padding: 15,
  },
  buildCard: {
    backgroundColor: colors.surface,
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  buildHeader: {
    padding: 20,
  },
  buildTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  buildInfo: {
    flex: 1,
  },
  buildName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  heroName: {
    color: '#FFFFFF',
    opacity: 0.8,
    fontSize: 14,
  },
  buildMeta: {
    alignItems: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  votes: {
    color: '#FFFFFF',
    opacity: 0.7,
    fontSize: 12,
    marginTop: 2,
  },
  buildTags: {
    flexDirection: 'row',
  },
  typeChip: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginRight: 10,
  },
  patchChip: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  chipText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  buildDetails: {
    backgroundColor: colors.surfaceVariant,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemsRow: {
    flexDirection: 'row',
  },
  itemCard: {
    alignItems: 'center',
    marginRight: 15,
    width: 80,
  },
  itemIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemName: {
    color: colors.textSecondary,
    fontSize: 10,
    textAlign: 'center',
  },
  arcanaRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  arcanaItem: {
    alignItems: 'center',
  },
  arcanaIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  arcanaText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  arcanaName: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  phaseContainer: {
    gap: 15,
  },
  phase: {
    backgroundColor: colors.surface,
    padding: 15,
    borderRadius: 10,
  },
  phaseTitle: {
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  phaseText: {
    color: colors.textSecondary,
    lineHeight: 18,
  },
  divider: {
    backgroundColor: colors.outline,
    marginVertical: 15,
  },
  buildFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  author: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  lastUpdated: {
    color: colors.textSecondary,
    fontSize: 12,
  },
});

export default BuildsScreen;