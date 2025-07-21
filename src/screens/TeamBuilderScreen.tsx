import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { Card, Title, Button, Chip, FAB } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme/theme';
import heroesData from '../data/heroes.json';

interface TeamSlot {
  id: string;
  role: string;
  hero: any | null;
}

const TeamBuilderScreen = () => {
  const [team, setTeam] = useState<TeamSlot[]>([
    { id: '1', role: 'Tank', hero: null },
    { id: '2', role: 'Fighter', hero: null },
    { id: '3', role: 'Assassin', hero: null },
    { id: '4', role: 'Mage', hero: null },
    { id: '5', role: 'Marksman', hero: null },
  ]);
  
  const [showHeroSelector, setShowHeroSelector] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

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

  const getTeamBalance = () => {
    const filledSlots = team.filter(slot => slot.hero !== null);
    const roles = filledSlots.map(slot => slot.hero?.role);
    
    const balance = {
      physical: roles.filter(role => ['Marksman', 'Assassin', 'Fighter'].includes(role)).length,
      magical: roles.filter(role => ['Mage'].includes(role)).length,
      tank: roles.filter(role => ['Tank'].includes(role)).length,
      support: roles.filter(role => ['Support'].includes(role)).length,
    };

    return balance;
  };

  const getTeamSynergy = () => {
    const filledHeroes = team.filter(slot => slot.hero !== null).map(slot => slot.hero);
    let synergyScore = 0;
    
    // Simple synergy calculation based on hero synergies
    filledHeroes.forEach(hero1 => {
      filledHeroes.forEach(hero2 => {
        if (hero1.id !== hero2.id && hero1.synergies?.includes(hero2.id)) {
          synergyScore += 20;
        }
      });
    });

    return Math.min(100, synergyScore);
  };

  const selectHero = (hero: any) => {
    if (selectedSlot) {
      const updatedTeam = team.map(slot => 
        slot.id === selectedSlot ? { ...slot, hero } : slot
      );
      setTeam(updatedTeam);
      setShowHeroSelector(false);
      setSelectedSlot(null);
    }
  };

  const removeHero = (slotId: string) => {
    const updatedTeam = team.map(slot => 
      slot.id === slotId ? { ...slot, hero: null } : slot
    );
    setTeam(updatedTeam);
  };

  const clearTeam = () => {
    Alert.alert(
      'Clear Team',
      'Are you sure you want to clear all heroes?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => setTeam(team.map(slot => ({ ...slot, hero: null })))
        },
      ]
    );
  };

  const renderTeamSlot = ({ item }: { item: TeamSlot }) => (
    <TouchableOpacity
      style={styles.teamSlot}
      onPress={() => {
        if (item.hero) {
          Alert.alert(
            item.hero.name,
            'What would you like to do?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Replace', onPress: () => {
                setSelectedSlot(item.id);
                setShowHeroSelector(true);
              }},
              { text: 'Remove', style: 'destructive', onPress: () => removeHero(item.id) },
            ]
          );
        } else {
          setSelectedSlot(item.id);
          setShowHeroSelector(true);
        }
      }}
    >
      <LinearGradient
        colors={[getRoleColor(item.role), `${getRoleColor(item.role)}80`]}
        style={styles.slotGradient}
      >
        {item.hero ? (
          <View style={styles.heroSlot}>
            <Text style={styles.heroName}>{item.hero.name}</Text>
            <Text style={styles.heroRole}>{item.hero.role}</Text>
            <View style={styles.tierBadge}>
              <Text style={styles.tierText}>{item.hero.tier}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.emptySlot}>
            <Icon name="plus" size={30} color="#FFFFFF" />
            <Text style={styles.slotRole}>{item.role}</Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderHeroSelector = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.heroSelectorCard}
      onPress={() => selectHero(item)}
    >
      <Card style={styles.selectorCard}>
        <LinearGradient
          colors={[getRoleColor(item.role), `${getRoleColor(item.role)}60`]}
          style={styles.selectorGradient}
        >
          <Text style={styles.selectorHeroName}>{item.name}</Text>
          <Text style={styles.selectorHeroRole}>{item.role}</Text>
          <View style={styles.selectorStats}>
            <Text style={styles.selectorStat}>WR: {item.winRate}%</Text>
            <View style={styles.selectorTier}>
              <Text style={styles.selectorTierText}>{item.tier}</Text>
            </View>
          </View>
        </LinearGradient>
      </Card>
    </TouchableOpacity>
  );

  if (showHeroSelector) {
    return (
      <View style={styles.container}>
        <View style={styles.selectorHeader}>
          <Title style={styles.selectorTitle}>Select Hero</Title>
          <Button
            mode="outlined"
            onPress={() => setShowHeroSelector(false)}
            textColor={colors.textPrimary}
            style={styles.cancelButton}
          >
            Cancel
          </Button>
        </View>
        <FlatList
          data={heroesData}
          renderItem={renderHeroSelector}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.selectorRow}
          contentContainerStyle={styles.selectorList}
        />
      </View>
    );
  }

  const balance = getTeamBalance();
  const synergy = getTeamSynergy();

  return (
    <View style={styles.container}>
      {/* Team Composition */}
      <View style={styles.teamContainer}>
        <Title style={styles.teamTitle}>Team Composition</Title>
        <FlatList
          data={team}
          renderItem={renderTeamSlot}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.teamList}
        />
      </View>

      {/* Team Analysis */}
      <Card style={styles.analysisCard}>
        <Card.Content>
          <Title style={styles.analysisTitle}>Team Analysis</Title>
          
          {/* Synergy Score */}
          <View style={styles.synergyContainer}>
            <Text style={styles.synergyLabel}>Team Synergy</Text>
            <View style={styles.synergyBar}>
              <LinearGradient
                colors={['#4CAF50', '#8BC34A']}
                style={[styles.synergyFill, { width: `${synergy}%` }]}
              />
            </View>
            <Text style={styles.synergyScore}>{synergy}%</Text>
          </View>

          {/* Team Balance */}
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceTitle}>Damage Balance</Text>
            <View style={styles.balanceRow}>
              <View style={styles.balanceItem}>
                <Icon name="sword" size={20} color="#F44336" />
                <Text style={styles.balanceText}>Physical: {balance.physical}</Text>
              </View>
              <View style={styles.balanceItem}>
                <Icon name="auto-fix" size={20} color="#9C27B0" />
                <Text style={styles.balanceText}>Magical: {balance.magical}</Text>
              </View>
            </View>
            <View style={styles.balanceRow}>
              <View style={styles.balanceItem}>
                <Icon name="shield" size={20} color="#2196F3" />
                <Text style={styles.balanceText}>Tank: {balance.tank}</Text>
              </View>
              <View style={styles.balanceItem}>
                <Icon name="heart" size={20} color="#00BCD4" />
                <Text style={styles.balanceText}>Support: {balance.support}</Text>
              </View>
            </View>
          </View>

          {/* Recommendations */}
          <View style={styles.recommendationsContainer}>
            <Text style={styles.recommendationsTitle}>Recommendations</Text>
            {balance.tank === 0 && (
              <Chip style={styles.recommendationChip} textStyle={styles.recommendationText}>
                Add a Tank for better survivability
              </Chip>
            )}
            {balance.physical + balance.magical < 3 && (
              <Chip style={styles.recommendationChip} textStyle={styles.recommendationText}>
                Need more damage dealers
              </Chip>
            )}
            {synergy < 50 && (
              <Chip style={styles.recommendationChip} textStyle={styles.recommendationText}>
                Consider heroes with better synergy
              </Chip>
            )}
          </View>
        </Card.Content>
      </Card>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Button
          mode="outlined"
          onPress={clearTeam}
          style={styles.clearButton}
          textColor={colors.error}
        >
          Clear Team
        </Button>
        <Button
          mode="contained"
          onPress={() => Alert.alert('Save Team', 'Team saved successfully!')}
          style={styles.saveButton}
        >
          Save Team
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  teamContainer: {
    padding: 20,
  },
  teamTitle: {
    color: colors.textPrimary,
    marginBottom: 15,
  },
  teamList: {
    paddingRight: 20,
  },
  teamSlot: {
    width: 120,
    height: 140,
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  slotGradient: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroSlot: {
    alignItems: 'center',
  },
  heroName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  heroRole: {
    color: '#FFFFFF',
    opacity: 0.8,
    fontSize: 12,
    marginBottom: 10,
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
  emptySlot: {
    alignItems: 'center',
  },
  slotRole: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 10,
  },
  analysisCard: {
    margin: 20,
    backgroundColor: colors.surface,
  },
  analysisTitle: {
    color: colors.textPrimary,
    marginBottom: 20,
  },
  synergyContainer: {
    marginBottom: 20,
  },
  synergyLabel: {
    color: colors.textSecondary,
    marginBottom: 10,
  },
  synergyBar: {
    height: 8,
    backgroundColor: colors.surfaceVariant,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 5,
  },
  synergyFill: {
    height: '100%',
    borderRadius: 4,
  },
  synergyScore: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  balanceContainer: {
    marginBottom: 20,
  },
  balanceTitle: {
    color: colors.textSecondary,
    marginBottom: 10,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  balanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  balanceText: {
    color: colors.textSecondary,
    marginLeft: 8,
  },
  recommendationsContainer: {
    marginBottom: 10,
  },
  recommendationsTitle: {
    color: colors.textSecondary,
    marginBottom: 10,
  },
  recommendationChip: {
    backgroundColor: colors.warning,
    marginBottom: 5,
  },
  recommendationText: {
    color: colors.background,
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 20,
    gap: 15,
  },
  clearButton: {
    flex: 1,
    borderColor: colors.error,
  },
  saveButton: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  selectorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  selectorTitle: {
    color: colors.textPrimary,
  },
  cancelButton: {
    borderColor: colors.textSecondary,
  },
  selectorList: {
    padding: 15,
  },
  selectorRow: {
    justifyContent: 'space-between',
  },
  heroSelectorCard: {
    width: '48%',
    marginBottom: 15,
  },
  selectorCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  selectorGradient: {
    padding: 15,
  },
  selectorHeroName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  selectorHeroRole: {
    color: '#FFFFFF',
    opacity: 0.8,
    fontSize: 12,
    marginBottom: 10,
  },
  selectorStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectorStat: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  selectorTier: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  selectorTierText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 10,
  },
});

export default TeamBuilderScreen;