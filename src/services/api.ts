/**
 * Honor of Kings API Service
 * Integrates with qing762's Honor of Kings API
 * API Documentation: https://github.com/qing762/honor-of-kings-api
 */

const API_BASE_URL = 'https://qing762.is-a.dev/api/wangzhe';

export interface HeroSkill {
  skillName: string;
  cooldown: number[];
  cost: number[];
  skillDesc: string;
  skillImg: string;
}

export interface HeroSkin {
  skinName: string;
  skinImg: string;
}

export interface HeroEmblem {
  emblemName: string;
  emblemDescription: string;
  emblemImg: string;
}

export interface HeroPartner {
  name: string;
  thumbnail: string;
  description: string;
  url: string;
}

export interface HeroData {
  title: string;
  name: string;
  skill: HeroSkill[];
  survivalPercentage: string;
  attackPercentage: string;
  abilityPercentage: string;
  difficultyPercentage: string;
  skins: HeroSkin[];
  emblems: HeroEmblem[];
  emblemTips: string;
  bestPartners: Record<string, HeroPartner>;
  suppressingHeroes: Record<string, HeroPartner>;
  suppressedHeroes: Record<string, HeroPartner>;
  url: string;
}

export interface ApiResponse {
  main: Record<string, HeroData>;
}

/**
 * Fetch all heroes data from the API
 */
export const fetchAllHeroes = async (): Promise<Record<string, HeroData>> => {
  try {
    const response = await fetch(API_BASE_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ApiResponse = await response.json();
    return data.main;
  } catch (error) {
    console.error('Error fetching heroes data:', error);
    throw new Error('Failed to fetch heroes data');
  }
};

/**
 * Fetch specific hero data by name
 */
export const fetchHeroByName = async (heroName: string): Promise<HeroData> => {
  try {
    const encodedName = encodeURIComponent(heroName);
    const response = await fetch(`${API_BASE_URL}/heroes/${encodedName}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: HeroData = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching hero ${heroName}:`, error);
    throw new Error(`Failed to fetch hero: ${heroName}`);
  }
};

/**
 * Transform API hero data to app format
 */
export const transformHeroData = (apiHero: HeroData, heroName: string) => {
  // Determine role based on stats and name patterns
  const determineRole = (hero: HeroData): string => {
    const survival = parseInt(hero.survivalPercentage);
    const attack = parseInt(hero.attackPercentage);
    const ability = parseInt(hero.abilityPercentage);
    
    if (survival >= 80) return 'Tank';
    if (ability >= 70) return 'Mage';
    if (attack >= 70 && survival < 50) return 'Marksman';
    if (attack >= 60 && survival >= 50) return 'Fighter';
    if (survival >= 60 && ability >= 40) return 'Support';
    return 'Assassin';
  };

  // Determine difficulty based on percentage
  const determineDifficulty = (difficultyPercentage: string): string => {
    const difficulty = parseInt(difficultyPercentage);
    if (difficulty <= 40) return 'Easy';
    if (difficulty <= 70) return 'Medium';
    return 'Hard';
  };

  return {
    id: heroName.toLowerCase().replace(/\s+/g, '-'),
    name: apiHero.name,
    title: apiHero.title,
    role: determineRole(apiHero),
    difficulty: determineDifficulty(apiHero.difficultyPercentage),
    stats: {
      survival: parseInt(apiHero.survivalPercentage),
      attack: parseInt(apiHero.attackPercentage),
      ability: parseInt(apiHero.abilityPercentage),
      difficulty: parseInt(apiHero.difficultyPercentage),
    },
    skills: apiHero.skill.map((skill, index) => ({
      id: `skill_${index}`,
      name: skill.skillName,
      type: index === 0 ? 'passive' : index === 3 ? 'ultimate' : `skill${index}`,
      description: skill.skillDesc,
      cooldown: skill.cooldown,
      manaCost: skill.cost,
      image: skill.skillImg,
    })),
    skins: apiHero.skins.map((skin, index) => ({
      id: `skin_${index}`,
      name: skin.skinName,
      image: skin.skinImg,
      rarity: index === 0 ? 'default' : 'epic', // First skin is usually default
    })),
    emblems: apiHero.emblems.map((emblem, index) => ({
      id: `emblem_${index}`,
      name: emblem.emblemName,
      description: emblem.emblemDescription,
      image: emblem.emblemImg.startsWith('//') ? `https:${emblem.emblemImg}` : emblem.emblemImg,
    })),
    emblemTips: apiHero.emblemTips,
    counters: Object.keys(apiHero.suppressingHeroes),
    counteredBy: Object.keys(apiHero.suppressedHeroes),
    synergies: Object.keys(apiHero.bestPartners),
    partners: apiHero.bestPartners,
    suppressingHeroes: apiHero.suppressingHeroes,
    suppressedHeroes: apiHero.suppressedHeroes,
    officialUrl: apiHero.url,
    // Generate some mock data for features not in API
    winRate: Math.floor(Math.random() * 20) + 45, // 45-65%
    pickRate: Math.floor(Math.random() * 15) + 5, // 5-20%
    banRate: Math.floor(Math.random() * 25) + 5, // 5-30%
    releaseDate: '2020-01-01', // Default date
    lore: `${apiHero.title} - ${apiHero.name} is a powerful hero in Honor of Kings.`,
  };
};

/**
 * Get heroes by role
 */
export const getHeroesByRole = async (role: string): Promise<any[]> => {
  const allHeroes = await fetchAllHeroes();
  const transformedHeroes = Object.entries(allHeroes).map(([name, data]) => 
    transformHeroData(data, name)
  );
  
  return transformedHeroes.filter(hero => hero.role === role);
};

/**
 * Search heroes by name
 */
export const searchHeroes = async (query: string): Promise<any[]> => {
  const allHeroes = await fetchAllHeroes();
  const transformedHeroes = Object.entries(allHeroes).map(([name, data]) => 
    transformHeroData(data, name)
  );
  
  const lowercaseQuery = query.toLowerCase();
  return transformedHeroes.filter(hero => 
    hero.name.toLowerCase().includes(lowercaseQuery) ||
    hero.title.toLowerCase().includes(lowercaseQuery)
  );
};

/**
 * Get counter recommendations for a hero
 */
export const getCounterRecommendations = async (heroName: string) => {
  try {
    const heroData = await fetchHeroByName(heroName);
    
    return {
      counters: Object.entries(heroData.suppressingHeroes).map(([name, data]) => ({
        name: data.name,
        thumbnail: data.thumbnail,
        description: data.description,
        effectiveness: Math.floor(Math.random() * 30) + 70, // 70-100%
      })),
      counteredBy: Object.entries(heroData.suppressedHeroes).map(([name, data]) => ({
        name: data.name,
        thumbnail: data.thumbnail,
        description: data.description,
        effectiveness: Math.floor(Math.random() * 30) + 70, // 70-100%
      })),
    };
  } catch (error) {
    console.error('Error getting counter recommendations:', error);
    return { counters: [], counteredBy: [] };
  }
};

/**
 * Get team synergy recommendations
 */
export const getTeamSynergies = async (heroName: string) => {
  try {
    const heroData = await fetchHeroByName(heroName);
    
    return Object.entries(heroData.bestPartners).map(([name, data]) => ({
      name: data.name,
      thumbnail: data.thumbnail,
      description: data.description,
      synergy: Math.floor(Math.random() * 30) + 70, // 70-100%
    }));
  } catch (error) {
    console.error('Error getting team synergies:', error);
    return [];
  }
};

/**
 * Generate tier list based on win rates and pick rates
 */
export const generateTierList = async () => {
  try {
    const allHeroes = await fetchAllHeroes();
    const transformedHeroes = Object.entries(allHeroes).map(([name, data]) => 
      transformHeroData(data, name)
    );

    // Sort heroes by a combination of stats for tier ranking
    const rankedHeroes = transformedHeroes.sort((a, b) => {
      const scoreA = (a.stats.attack + a.stats.ability + a.stats.survival) / 3;
      const scoreB = (b.stats.attack + b.stats.ability + b.stats.survival) / 3;
      return scoreB - scoreA;
    });

    const totalHeroes = rankedHeroes.length;
    const tierSizes = {
      'S+': Math.ceil(totalHeroes * 0.05), // Top 5%
      'S': Math.ceil(totalHeroes * 0.15),  // Next 15%
      'A': Math.ceil(totalHeroes * 0.25),  // Next 25%
      'B': Math.ceil(totalHeroes * 0.35),  // Next 35%
      'C': totalHeroes, // Remaining
    };

    let currentIndex = 0;
    const tierList: Record<string, any[]> = {};

    for (const [tier, size] of Object.entries(tierSizes)) {
      const endIndex = tier === 'C' ? totalHeroes : currentIndex + size;
      tierList[tier] = rankedHeroes.slice(currentIndex, endIndex);
      currentIndex = endIndex;
    }

    return tierList;
  } catch (error) {
    console.error('Error generating tier list:', error);
    return {};
  }
};

/**
 * Cache management
 */
class ApiCache {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  set(key: string, data: any) {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  get(key: string) {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() - cached.timestamp > this.CACHE_DURATION) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  clear() {
    this.cache.clear();
  }
}

export const apiCache = new ApiCache();

/**
 * Cached version of fetchAllHeroes
 */
export const fetchAllHeroesCached = async () => {
  const cacheKey = 'all_heroes';
  const cached = apiCache.get(cacheKey);
  
  if (cached) {
    return cached;
  }

  const data = await fetchAllHeroes();
  apiCache.set(cacheKey, data);
  return data;
};