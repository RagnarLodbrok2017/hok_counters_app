/**
 * Custom hooks for Hero data management
 * Uses TanStack Query for caching and state management
 */

import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import {
  fetchAllHeroesCached,
  fetchHeroByName,
  getHeroesByRole,
  searchHeroes,
  getCounterRecommendations,
  getTeamSynergies,
  generateTierList,
  transformHeroData,
} from '../services/api';

/**
 * Hook to fetch all heroes
 */
export const useAllHeroes = () => {
  return useQuery({
    queryKey: ['heroes', 'all'],
    queryFn: async () => {
      const apiData = await fetchAllHeroesCached();
      return Object.entries(apiData).map(([name, data]) => 
        transformHeroData(data, name)
      );
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to fetch a specific hero by name
 */
export const useHero = (heroName: string) => {
  return useQuery({
    queryKey: ['hero', heroName],
    queryFn: async () => {
      const apiData = await fetchHeroByName(heroName);
      return transformHeroData(apiData, heroName);
    },
    enabled: !!heroName,
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });
};

/**
 * Hook to fetch heroes by role
 */
export const useHeroesByRole = (role: string) => {
  return useQuery({
    queryKey: ['heroes', 'role', role],
    queryFn: () => getHeroesByRole(role),
    enabled: !!role,
    staleTime: 5 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
  });
};

/**
 * Hook to search heroes
 */
export const useHeroSearch = (query: string) => {
  return useQuery({
    queryKey: ['heroes', 'search', query],
    queryFn: () => searchHeroes(query),
    enabled: query.length >= 2, // Only search with 2+ characters
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to get counter recommendations
 */
export const useCounterRecommendations = (heroName: string) => {
  return useQuery({
    queryKey: ['counters', heroName],
    queryFn: () => getCounterRecommendations(heroName),
    enabled: !!heroName,
    staleTime: 15 * 60 * 1000, // 15 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });
};

/**
 * Hook to get team synergies
 */
export const useTeamSynergies = (heroName: string) => {
  return useQuery({
    queryKey: ['synergies', heroName],
    queryFn: () => getTeamSynergies(heroName),
    enabled: !!heroName,
    staleTime: 15 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
};

/**
 * Hook to get tier list
 */
export const useTierList = () => {
  return useQuery({
    queryKey: ['tierList'],
    queryFn: generateTierList,
    staleTime: 30 * 60 * 1000, // 30 minutes
    cacheTime: 60 * 60 * 1000, // 1 hour
  });
};

/**
 * Hook for infinite scrolling heroes list
 */
export const useInfiniteHeroes = (pageSize: number = 20) => {
  return useInfiniteQuery({
    queryKey: ['heroes', 'infinite'],
    queryFn: async ({ pageParam = 0 }) => {
      const allHeroes = await fetchAllHeroesCached();
      const transformedHeroes = Object.entries(allHeroes).map(([name, data]) => 
        transformHeroData(data, name)
      );
      
      const start = pageParam * pageSize;
      const end = start + pageSize;
      const heroes = transformedHeroes.slice(start, end);
      
      return {
        heroes,
        nextPage: end < transformedHeroes.length ? pageParam + 1 : undefined,
        hasMore: end < transformedHeroes.length,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

/**
 * Hook to get heroes statistics
 */
export const useHeroesStats = () => {
  return useQuery({
    queryKey: ['heroes', 'stats'],
    queryFn: async () => {
      const apiData = await fetchAllHeroesCached();
      const heroes = Object.entries(apiData).map(([name, data]) => 
        transformHeroData(data, name)
      );

      const roleCount = heroes.reduce((acc, hero) => {
        acc[hero.role] = (acc[hero.role] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const difficultyCount = heroes.reduce((acc, hero) => {
        acc[hero.difficulty] = (acc[hero.difficulty] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const avgStats = heroes.reduce(
        (acc, hero) => {
          acc.survival += hero.stats.survival;
          acc.attack += hero.stats.attack;
          acc.ability += hero.stats.ability;
          acc.difficulty += hero.stats.difficulty;
          return acc;
        },
        { survival: 0, attack: 0, ability: 0, difficulty: 0 }
      );

      const totalHeroes = heroes.length;
      Object.keys(avgStats).forEach(key => {
        avgStats[key as keyof typeof avgStats] = Math.round(avgStats[key as keyof typeof avgStats] / totalHeroes);
      });

      return {
        totalHeroes,
        roleDistribution: roleCount,
        difficultyDistribution: difficultyCount,
        averageStats: avgStats,
        lastUpdated: new Date().toISOString(),
      };
    },
    staleTime: 30 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
  });
};

/**
 * Hook for hero recommendations based on team composition
 */
export const useHeroRecommendations = (selectedHeroes: string[]) => {
  return useQuery({
    queryKey: ['recommendations', selectedHeroes.sort().join(',')],
    queryFn: async () => {
      if (selectedHeroes.length === 0) return [];

      const allHeroes = await fetchAllHeroesCached();
      const recommendations = [];

      // Get synergies for all selected heroes
      for (const heroName of selectedHeroes) {
        try {
          const synergies = await getTeamSynergies(heroName);
          recommendations.push(...synergies);
        } catch (error) {
          console.warn(`Failed to get synergies for ${heroName}:`, error);
        }
      }

      // Remove duplicates and selected heroes
      const uniqueRecommendations = recommendations
        .filter((rec, index, self) => 
          self.findIndex(r => r.name === rec.name) === index &&
          !selectedHeroes.includes(rec.name)
        )
        .sort((a, b) => b.synergy - a.synergy)
        .slice(0, 10); // Top 10 recommendations

      return uniqueRecommendations;
    },
    enabled: selectedHeroes.length > 0,
    staleTime: 10 * 60 * 1000,
    cacheTime: 20 * 60 * 1000,
  });
};

/**
 * Hook for getting popular heroes (mock data based on stats)
 */
export const usePopularHeroes = (limit: number = 10) => {
  return useQuery({
    queryKey: ['heroes', 'popular', limit],
    queryFn: async () => {
      const apiData = await fetchAllHeroesCached();
      const heroes = Object.entries(apiData).map(([name, data]) => 
        transformHeroData(data, name)
      );

      // Sort by a combination of pick rate and win rate (mock calculation)
      return heroes
        .sort((a, b) => {
          const scoreA = a.pickRate * 0.6 + a.winRate * 0.4;
          const scoreB = b.pickRate * 0.6 + b.winRate * 0.4;
          return scoreB - scoreA;
        })
        .slice(0, limit);
    },
    staleTime: 15 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
};

/**
 * Hook for getting recently updated heroes (mock data)
 */
export const useRecentlyUpdatedHeroes = (limit: number = 5) => {
  return useQuery({
    queryKey: ['heroes', 'recent', limit],
    queryFn: async () => {
      const apiData = await fetchAllHeroesCached();
      const heroes = Object.entries(apiData).map(([name, data]) => 
        transformHeroData(data, name)
      );

      // Randomly select heroes as "recently updated" for demo
      const shuffled = [...heroes].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, limit).map(hero => ({
        ...hero,
        lastUpdated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        updateType: ['Balance', 'Skill Rework', 'Bug Fix', 'New Skin'][Math.floor(Math.random() * 4)],
      }));
    },
    staleTime: 30 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
  });
};