import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Card, Title, Paragraph, Chip, Button, Divider, Snackbar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme/theme';
import { useHero, useCounterRecommendations, useTeamSynergies } from '../hooks/useHeroes';

const { width } = Dimensions.get('window');

const HeroDetailScreen = ({ route, navigation }: any) => {
  const { hero, heroName } = route.params;
  const [activeTab, setActiveTab] = useState('overview');
  const [showError, setShowError] = useState(false);

  // Use real API data if heroName is provided, otherwise use passed hero data
  const { 
    data: apiHero, 
    isLoading: heroLoading, 
    error: heroError 
  } = useHero(heroName || hero?.name);

  const { 
    data: counterData = { counters: [], counteredBy: [] }, 
    isLoading: countersLoading 
  } = useCounterRecommendations(heroName || hero?.name);

  const { 
    data: synergies = [], 
    isLoading: synergiesLoading 
  } = useTeamSynergies(heroName || hero?.name);

  // Use API data if available, otherwise fallback to passed hero data
  const currentHero = apiHero || hero;

  if (heroLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading hero details...</Text>
      </View>
    );
  }

  if (heroError || !currentHero) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="alert-circle-outline" size={64} color={colors.error || '#F44336'} />
        <Text style={styles.errorTitle}>Failed to load hero</Text>
        <Text style={styles.errorSubtitle}>Please try again later</Text>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

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

  const getSkillIcon = (iconName: string) => {
    const iconMap: { [key: string]: string } = {
      sword: 'sword',
      flash: 'flash',
      tornado: 'tornado',
      'sword-cross': 'sword-cross',
      eye: 'eye',
      fan: 'fan',
      heart: 'heart',
      'circle-outline': 'circle-outline',
      shield: 'shield',
      'run-fast': 'run-fast',
      cog: 'cog',
      bomb: 'bomb',
      'crosshairs-gps': 'crosshairs-gps',
      airplane: 'airplane',
      'heart-multiple': 'heart-multiple',
      web: 'web',
      'shield-heart': 'shield-heart',
    };
    return iconMap[iconName] || 'help';
  };

  // Get hero image safely
  const getHeroImage = () => {
    if (currentHero.skins && currentHero.skins.length > 0) {
      return currentHero.skins[0].image;
    }
    return 'https://via.placeholder.com/150x150/333/fff?text=Hero';
  };

  // Safe access to hero properties with fallbacks
  const getHeroStats = () => {
    if (currentHero.stats) {
      return {
        survival: currentHero.stats.survival || 0,
        attack: currentHero.stats.attack || 0,
        ability: currentHero.stats.ability || 0,
        difficulty: currentHero.stats.difficulty || 0,
      };
    }
    return { survival: 0, attack: 0, ability: 0, difficulty: 0 };
  };

  const getHeroSkills = () => {
    return currentHero.skills || [];
  };

  const getHeroEmblems = () => {
    return currentHero.emblems || [];
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'information' },
    { id: 'skills', label: 'Skills', icon: 'sword' },
    { id: 'builds', label: 'Builds', icon: 'hammer-wrench' },
    { id: 'counters', label: 'Counters', icon: 'shield-alert' },
  ];

  const renderTabContent = () => {
    const stats = getHeroStats();
    const skills = getHeroSkills();
    const emblems = getHeroEmblems();

    switch (activeTab) {
      case 'overview':
        return (
          <View style={styles.tabContent}>
            {/* Stats */}
            <Card style={styles.sectionCard}>
              <Card.Content>
                <Title style={styles.sectionTitle}>Hero Stats</Title>
                <View style={styles.statsGrid}>
                  <View style={styles.statItem}>
                    <Icon name="shield-heart" size={20} color="#F44336" />
                    <Text style={styles.statValue}>{stats.survival}%</Text>
                    <Text style={styles.statLabel}>Survival</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Icon name="sword" size={20} color="#FF9800" />
                    <Text style={styles.statValue}>{stats.attack}%</Text>
                    <Text style={styles.statLabel}>Attack</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Icon name="auto-fix" size={20} color="#9C27B0" />
                    <Text style={styles.statValue}>{stats.ability}%</Text>
                    <Text style={styles.statLabel}>Ability</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Icon name="chart-line" size={20} color="#4CAF50" />
                    <Text style={styles.statValue}>{stats.difficulty}%</Text>
                    <Text style={styles.statLabel}>Difficulty</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>

            {/* Lore */}
            <Card style={styles.sectionCard}>
              <Card.Content>
                <Title style={styles.sectionTitle}>About</Title>
                <Paragraph style={styles.loreText}>
                  {currentHero.lore || `${currentHero.title} - ${currentHero.name} is a powerful ${currentHero.role} hero in Honor of Kings.`}
                </Paragraph>
              </Card.Content>
            </Card>

            {/* Emblems */}
            {emblems.length > 0 && (
              <Card style={styles.sectionCard}>
                <Card.Content>
                  <Title style={styles.sectionTitle}>Recommended Emblems</Title>
                  {emblems.map((emblem: any, index: number) => (
                    <View key={index} style={styles.emblemItem}>
                      <Image 
                        source={{ uri: emblem.image }} 
                        style={styles.emblemIcon}
                        defaultSource={{ uri: 'https://via.placeholder.com/32x32/333/fff?text=E' }}
                      />
                      <View style={styles.emblemInfo}>
                        <Text style={styles.emblemName}>{emblem.name}</Text>
                        <Text style={styles.emblemDescription}>{emblem.description}</Text>
                      </View>
                    </View>
                  ))}
                  {currentHero.emblemTips && (
                    <View style={styles.tipItem}>
                      <Icon name="lightbulb" size={16} color={colors.warning || '#FFD93D'} />
                      <Text style={styles.tipText}>{currentHero.emblemTips}</Text>
                    </View>
                  )}
                </Card.Content>
              </Card>
            )}
          </View>
        );

      case 'skills':
        return (
          <View style={styles.tabContent}>
            {skills.length > 0 ? skills.map((skill: any, index: number) => (
              <Card key={index} style={styles.skillCard}>
                <LinearGradient
                  colors={[getRoleColor(currentHero.role), `${getRoleColor(currentHero.role)}40`]}
                  style={styles.skillHeader}
                >
                  <View style={styles.skillTitleRow}>
                    <View style={styles.skillIconContainer}>
                      <Icon 
                        name={getSkillIcon(skill.icon || 'help')} 
                        size={24} 
                        color="#FFFFFF" 
                      />
                    </View>
                    <View style={styles.skillInfo}>
                      <Text style={styles.skillName}>{skill.name || skill.skillName}</Text>
                      <Text style={styles.skillType}>
                        {skill.type ? skill.type.toUpperCase() : index === 0 ? 'PASSIVE' : `SKILL ${index}`}
                      </Text>
                    </View>
                    {skill.cooldown && skill.cooldown.length > 0 && skill.cooldown[0] > 0 && (
                      <View style={styles.skillMeta}>
                        <Text style={styles.skillCooldown}>
                          CD: {Array.isArray(skill.cooldown) ? skill.cooldown[0] : skill.cooldown}s
                        </Text>
                        {skill.cost && skill.cost.length > 0 && skill.cost[0] > 0 && (
                          <Text style={styles.skillMana}>
                            Cost: {Array.isArray(skill.cost) ? skill.cost[0] : skill.cost}
                          </Text>
                        )}
                      </View>
                    )}
                  </View>
                </LinearGradient>
                <Card.Content style={styles.skillContent}>
                  <Text style={styles.skillDescription}>
                    {skill.description || skill.skillDesc || 'No description available'}
                  </Text>
                  {skill.skillImg && (
                    <Image 
                      source={{ uri: skill.skillImg }} 
                      style={styles.skillImage}
                      defaultSource={{ uri: 'https://via.placeholder.com/64x64/333/fff?text=Skill' }}
                    />
                  )}
                </Card.Content>
              </Card>
            )) : (
              <Card style={styles.emptyCard}>
                <Card.Content>
                  <Text style={styles.emptyText}>No skill information available</Text>
                </Card.Content>
              </Card>
            )}
          </View>
        );

      case 'builds':
        return (
          <View style={styles.tabContent}>
            <Card style={styles.emptyCard}>
              <Card.Content>
                <Text style={styles.emptyText}>Build recommendations coming soon!</Text>
                <Text style={styles.emptySubtext}>
                  We're working on integrating build data from the API.
                </Text>
              </Card.Content>
            </Card>
          </View>
        );

      case 'counters':
        return (
          <View style={styles.tabContent}>
            {/* Counters */}
            <Card style={styles.sectionCard}>
              <Card.Content>
                <Title style={styles.sectionTitle}>Strong Against</Title>
                {countersLoading ? (
                  <ActivityIndicator size="small" color={colors.primary} />
                ) : counterData.counters.length > 0 ? (
                  <View style={styles.heroGrid}>
                    {counterData.counters.map((counter: any, index: number) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.miniHeroCard}
                        onPress={() => navigation.push('HeroDetail', { heroName: counter.name })}
                      >
                        <Image 
                          source={{ uri: counter.thumbnail }} 
                          style={styles.miniHeroImage}
                          defaultSource={{ uri: 'https://via.placeholder.com/50x50/333/fff?text=Hero' }}
                        />
                        <Text style={styles.miniHeroName}>{counter.name}</Text>
                        <Text style={styles.effectivenessText}>{counter.effectiveness}%</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : (
                  <Text style={styles.emptyText}>No counter data available</Text>
                )}
              </Card.Content>
            </Card>

            {/* Countered By */}
            <Card style={styles.sectionCard}>
              <Card.Content>
                <Title style={styles.sectionTitle}>Weak Against</Title>
                {countersLoading ? (
                  <ActivityIndicator size="small" color={colors.primary} />
                ) : counterData.counteredBy.length > 0 ? (
                  <View style={styles.heroGrid}>
                    {counterData.counteredBy.map((counter: any, index: number) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.miniHeroCard}
                        onPress={() => navigation.push('HeroDetail', { heroName: counter.name })}
                      >
                        <Image 
                          source={{ uri: counter.thumbnail }} 
                          style={styles.miniHeroImage}
                          defaultSource={{ uri: 'https://via.placeholder.com/50x50/333/fff?text=Hero' }}
                        />
                        <Text style={styles.miniHeroName}>{counter.name}</Text>
                        <Text style={styles.effectivenessText}>{counter.effectiveness}%</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : (
                  <Text style={styles.emptyText}>No counter data available</Text>
                )}
              </Card.Content>
            </Card>

            {/* Synergies */}
            <Card style={styles.sectionCard}>
              <Card.Content>
                <Title style={styles.sectionTitle}>Synergizes With</Title>
                {synergiesLoading ? (
                  <ActivityIndicator size="small" color={colors.primary} />
                ) : synergies.length > 0 ? (
                  <View style={styles.heroGrid}>
                    {synergies.map((synergy: any, index: number) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.miniHeroCard}
                        onPress={() => navigation.push('HeroDetail', { heroName: synergy.name })}
                      >
                        <Image 
                          source={{ uri: synergy.thumbnail }} 
                          style={styles.miniHeroImage}
                          defaultSource={{ uri: 'https://via.placeholder.com/50x50/333/fff?text=Hero' }}
                        />
                        <Text style={styles.miniHeroName}>{synergy.name}</Text>
                        <Text style={styles.synergyText}>{synergy.synergy}%</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : (
                  <Text style={styles.emptyText}>No synergy data available</Text>
                )}
              </Card.Content>
            </Card>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Hero Header */}
      <LinearGradient
        colors={[getRoleColor(currentHero.role), `${getRoleColor(currentHero.role)}80`]}
        style={styles.heroHeader}
      >
        <View style={styles.heroHeaderContent}>
          <Image source={{ uri: getHeroImage() }} style={styles.heroImage} />
          <View style={styles.heroInfo}>
            <Text style={styles.heroName}>{currentHero.name}</Text>
            <Text style={styles.heroNameArabic}>{currentHero.nameArabic || ''}</Text>
            <Text style={styles.heroTitle}>{currentHero.title}</Text>
            <Text style={styles.heroTitleArabic}>{currentHero.titleArabic || ''}</Text>
            <View style={styles.heroMeta}>
              <Chip style={styles.roleChip} textStyle={styles.roleText}>
                {currentHero.role}
              </Chip>
              <View style={styles.tierBadge}>
                <Text style={styles.tierText}>{currentHero.tier || 'A'}</Text>
              </View>
            </View>
            <View style={styles.statsRow}>
              <View style={styles.statBadge}>
                <Text style={styles.statBadgeValue}>{currentHero.winRate || 0}%</Text>
                <Text style={styles.statBadgeLabel}>Win Rate</Text>
              </View>
              <View style={styles.statBadge}>
                <Text style={styles.statBadgeValue}>{currentHero.pickRate || 0}%</Text>
                <Text style={styles.statBadgeLabel}>Pick Rate</Text>
              </View>
              <View style={styles.statBadge}>
                <Text style={styles.statBadgeValue}>{currentHero.banRate || 0}%</Text>
                <Text style={styles.statBadgeLabel}>Ban Rate</Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tabsRow}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tab,
                  activeTab === tab.id && styles.activeTab
                ]}
                onPress={() => setActiveTab(tab.id)}
              >
                <Icon 
                  name={tab.icon} 
                  size={20} 
                  color={activeTab === tab.id ? '#FFFFFF' : colors.textSecondary} 
                />
                <Text style={[
                  styles.tabText,
                  activeTab === tab.id && styles.activeTabText
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Tab Content */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {renderTabContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heroHeader: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  heroHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  heroInfo: {
    flex: 1,
    marginLeft: 20,
  },
  heroName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  heroNameArabic: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 5,
    fontFamily: 'System',
  },
  heroTitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 2,
  },
  heroTitleArabic: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.7,
    marginBottom: 10,
    fontFamily: 'System',
  },
  heroMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  roleChip: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginRight: 10,
  },
  roleText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  tierBadge: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tierText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBadge: {
    alignItems: 'center',
    flex: 1,
  },
  statBadgeValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statBadgeLabel: {
    color: '#FFFFFF',
    fontSize: 10,
    opacity: 0.8,
  },
  tabsContainer: {
    backgroundColor: colors.surface,
    paddingVertical: 10,
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: colors.surfaceVariant,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    color: colors.textSecondary,
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
  },
  sectionCard: {
    backgroundColor: colors.surface,
    marginBottom: 15,
    borderRadius: 12,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    width: '30%',
    marginBottom: 15,
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  loreText: {
    color: colors.textSecondary,
    lineHeight: 22,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  tipText: {
    color: colors.textSecondary,
    marginLeft: 10,
    flex: 1,
    lineHeight: 18,
  },
  skillCard: {
    backgroundColor: colors.surface,
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  skillHeader: {
    padding: 15,
  },
  skillTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  skillInfo: {
    flex: 1,
  },
  skillName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skillType: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.8,
  },
  skillMeta: {
    alignItems: 'flex-end',
  },
  skillCooldown: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  skillMana: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.8,
  },
  skillContent: {
    padding: 15,
  },
  skillDescription: {
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: 10,
  },
  skillDamage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  damageLabel: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  damageValue: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  buildCard: {
    backgroundColor: colors.surface,
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  buildHeader: {
    padding: 15,
  },
  buildTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buildName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buildType: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.8,
  },
  buildRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#FFFFFF',
    marginLeft: 4,
    fontWeight: 'bold',
  },
  buildContent: {
    padding: 15,
  },
  buildSectionTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  itemChip: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  itemText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  arcanaRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  arcanaItem: {
    alignItems: 'center',
  },
  arcanaIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  arcanaText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  arcanaName: {
    color: colors.textSecondary,
    fontSize: 10,
  },
  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  heroGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  miniHeroCard: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 15,
  },
  miniHeroImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  miniHeroName: {
    color: colors.textSecondary,
    fontSize: 10,
    textAlign: 'center',
  },
  // Loading and error states
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 16,
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
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
  backButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Emblem styles
  emblemItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 8,
    backgroundColor: colors.surfaceVariant || colors.surface,
    borderRadius: 8,
  },
  emblemIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  emblemInfo: {
    flex: 1,
  },
  emblemName: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  emblemDescription: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },
  // Skill image
  skillImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 10,
  },
  // Counter and synergy effectiveness
  effectivenessText: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 2,
  },
  synergyText: {
    color: '#4CAF50',
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 2,
  },
  // Empty state subtext
  emptySubtext: {
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 12,
    marginTop: 8,
  },
});

export default HeroDetailScreen;