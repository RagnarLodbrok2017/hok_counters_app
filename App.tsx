import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { theme } from './src/theme/theme';
import { LanguageProvider, useLanguage } from './src/context/LanguageContext';
import HomeScreen from './src/screens/HomeScreen';
import HeroListScreen from './src/screens/HeroListScreen';
import HeroDetailScreen from './src/screens/HeroDetailScreen';
import BuildsScreen from './src/screens/BuildsScreen';
import TeamBuilderScreen from './src/screens/TeamBuilderScreen';
import TierListScreen from './src/screens/TierListScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const queryClient = new QueryClient();

// Heroes Stack Navigator
function HeroesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HeroesList" component={HeroListScreen} />
      <Stack.Screen name="HeroDetail" component={HeroDetailScreen} />
    </Stack.Navigator>
  );
}

// Main Tab Navigator with translations
function MainTabNavigator() {
  const { t } = useLanguage();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Heroes':
              iconName = focused ? 'sword' : 'sword';
              break;
            case 'Builds':
              iconName = focused ? 'hammer-wrench' : 'hammer-wrench';
              break;
            case 'Teams':
              iconName = focused ? 'account-group' : 'account-group-outline';
              break;
            case 'Tier List':
              iconName = focused ? 'trophy' : 'trophy-outline';
              break;
            default:
              iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF4444',
        tabBarInactiveTintColor: '#EEEEEE',
        tabBarStyle: {
          backgroundColor: '#222831',
          borderTopColor: '#393E46',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: '#222831',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: t('home') }}
      />
      <Tab.Screen 
        name="Heroes" 
        component={HeroesStack}
        options={{ title: t('heroes') }}
      />
      <Tab.Screen 
        name="Builds" 
        component={BuildsScreen}
        options={{ title: t('builds') }}
      />
      <Tab.Screen 
        name="Teams" 
        component={TeamBuilderScreen}
        options={{ title: t('teams') }}
      />
      <Tab.Screen 
        name="Tier List" 
        component={TierListScreen}
        options={{ title: t('tierList') }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <StatusBar style="light" backgroundColor="#222831" />
            <MainTabNavigator />
          </NavigationContainer>
        </PaperProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}