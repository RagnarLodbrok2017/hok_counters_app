import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme/theme';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const { t } = useLanguage();
  
  const featuredHeroes = [
    { name: 'Li Bai', role: t('assassin'), tier: 'S', winRate: '52.3%' },
    { name: 'Angela', role: t('support'), tier: 'S', winRate: '53.1%' },
    { name: 'Diaochan', role: t('mage'), tier: 'A', winRate: '48.7%' },
  ];

  const quickActions = [
    { title: t('heroes'), icon: 'sword', screen: 'Heroes', color: '#FF4444' },
    { title: t('builds'), icon: 'hammer-wrench', screen: 'Builds', color: '#00D9FF' },
    { title: t('teams'), icon: 'account-group', screen: 'Teams', color: '#FFD93D' },
    { title: t('tierList'), icon: 'trophy', screen: 'Tier List', color: '#9C27B0' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <LinearGradient
        colors={['#FF4444', '#FF6B6B']}
        style={styles.headerGradient}
      >
        <View style={styles.headerTop}>
          <LanguageSelector />
        </View>
        <View style={styles.header}>
          <Text style={styles.appTitle}>SOLO HOK</Text>
          <Text style={styles.subtitle}>Honor of Kings Companion</Text>
          <Text style={styles.version}>v1.0.0 • Patch 1.98.1.15</Text>
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickActionCard}
              onPress={() => navigation.navigate(action.screen)}
            >
              <LinearGradient
                colors={[action.color, `${action.color}80`]}
                style={styles.quickActionGradient}
              >
                <Icon name={action.icon} size={32} color="#FFFFFF" />
                <Text style={styles.quickActionText}>{action.title}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Featured Heroes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Meta Heroes</Text>
        {featuredHeroes.map((hero, index) => (
          <Card key={index} style={styles.heroCard}>
            <Card.Content style={styles.heroCardContent}>
              <View style={styles.heroInfo}>
                <View>
                  <Title style={styles.heroName}>{hero.name}</Title>
                  <Paragraph style={styles.heroRole}>{hero.role}</Paragraph>
                </View>
                <View style={styles.heroStats}>
                  <View style={[styles.tierBadge, { backgroundColor: hero.tier === 'S' ? '#FF4444' : '#00D9FF' }]}>
                    <Text style={styles.tierText}>{hero.tier}</Text>
                  </View>
                  <Text style={styles.winRate}>{hero.winRate}</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* Latest Updates */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Latest Updates</Text>
        <Card style={styles.updateCard}>
          <Card.Content>
            <Title style={styles.updateTitle}>Patch 1.98.1.15 Notes</Title>
            <Paragraph style={styles.updateText}>
              • Li Bai damage increased by 5%{'\n'}
              • Angela shield duration buffed{'\n'}
              • New hero: Yao available now{'\n'}
              • Balance changes to jungle items
            </Paragraph>
            <Button
              mode="contained"
              style={styles.updateButton}
              onPress={() => {}}
            >
              Read Full Notes
            </Button>
          </Card.Content>
        </Card>
      </View>

      {/* Stats Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Game Statistics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>120+</Text>
            <Text style={styles.statLabel}>Heroes</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Builds</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>50M+</Text>
            <Text style={styles.statLabel}>Players</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerGradient: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    padding: 30,
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 5,
  },
  version: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.7,
    marginTop: 5,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 15,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 60) / 2,
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  quickActionGradient: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  quickActionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  heroCard: {
    backgroundColor: colors.surface,
    marginBottom: 10,
    borderRadius: 12,
  },
  heroCardContent: {
    padding: 15,
  },
  heroInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroName: {
    color: colors.textPrimary,
    fontSize: 18,
    marginBottom: 0,
  },
  heroRole: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  heroStats: {
    alignItems: 'flex-end',
  },
  tierBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 5,
  },
  tierText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  winRate: {
    color: colors.success,
    fontWeight: 'bold',
    fontSize: 14,
  },
  updateCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  updateTitle: {
    color: colors.textPrimary,
    fontSize: 18,
  },
  updateText: {
    color: colors.textSecondary,
    lineHeight: 20,
    marginVertical: 10,
  },
  updateButton: {
    backgroundColor: colors.primary,
    marginTop: 10,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 5,
  },
});

export default HomeScreen;