import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    home: 'Home',
    heroes: 'Heroes',
    builds: 'Builds',
    teams: 'Teams',
    tierList: 'Tier List',
    
    // Common
    search: 'Search',
    filter: 'Filter',
    all: 'All',
    loading: 'Loading...',
    error: 'Error',
    
    // Hero roles
    tank: 'Tank',
    fighter: 'Fighter',
    assassin: 'Assassin',
    mage: 'Mage',
    marksman: 'Marksman',
    support: 'Support',
    
    // Difficulty
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    
    // Hero details
    overview: 'Overview',
    skills: 'Skills',
    counters: 'Counters',
    synergies: 'Synergies',
    tips: 'Tips',
    stats: 'Stats',
    lore: 'Lore',
    
    // Stats
    hp: 'HP',
    mana: 'Mana',
    attack: 'Attack',
    defense: 'Defense',
    speed: 'Speed',
    winRate: 'Win Rate',
    pickRate: 'Pick Rate',
    banRate: 'Ban Rate',
    
    // Build related
    coreItems: 'Core Items',
    situationalItems: 'Situational Items',
    arcana: 'Arcana',
    skillOrder: 'Skill Order',
    gamePhase: 'Game Phase',
    early: 'Early Game',
    mid: 'Mid Game',
    late: 'Late Game',
    
    // Team builder
    teamComposition: 'Team Composition',
    teamSynergy: 'Team Synergy',
    selectHero: 'Select Hero',
    clearTeam: 'Clear Team',
    saveTeam: 'Save Team',
    
    // Language
    language: 'Language',
    english: 'English',
    arabic: 'العربية',
    chinese: '中文',
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    heroes: 'الأبطال',
    builds: 'البناءات',
    teams: 'الفرق',
    tierList: 'قائمة المستويات',
    
    // Common
    search: 'بحث',
    filter: 'تصفية',
    all: 'الكل',
    loading: 'جاري التحميل...',
    error: 'خطأ',
    
    // Hero roles
    tank: 'دبابة',
    fighter: 'مقاتل',
    assassin: 'قاتل',
    mage: 'ساحر',
    marksman: 'رامي',
    support: 'داعم',
    
    // Difficulty
    easy: 'سهل',
    medium: 'متوسط',
    hard: 'صعب',
    
    // Hero details
    overview: 'نظرة عامة',
    skills: 'المهارات',
    counters: 'المضادات',
    synergies: 'التناغم',
    tips: 'نصائح',
    stats: 'الإحصائيات',
    lore: 'القصة',
    
    // Stats
    hp: 'الصحة',
    mana: 'المانا',
    attack: 'الهجوم',
    defense: 'الدفاع',
    speed: 'السرعة',
    winRate: 'معدل الفوز',
    pickRate: 'معدل الاختيار',
    banRate: 'معدل الحظر',
    
    // Build related
    coreItems: 'العناصر الأساسية',
    situationalItems: 'العناصر الظرفية',
    arcana: 'الأركانا',
    skillOrder: 'ترتيب المهارات',
    gamePhase: 'مرحلة اللعبة',
    early: 'بداية اللعبة',
    mid: 'منتصف اللعبة',
    late: 'نهاية اللعبة',
    
    // Team builder
    teamComposition: 'تكوين الفريق',
    teamSynergy: 'تناغم الفريق',
    selectHero: 'اختر بطل',
    clearTeam: 'مسح الفريق',
    saveTeam: 'حفظ الفريق',
    
    // Language
    language: 'اللغة',
    english: 'English',
    arabic: 'العربية',
    chinese: '中文',
  },
  zh: {
    // Navigation
    home: '首页',
    heroes: '英雄',
    builds: '出装',
    teams: '团队',
    tierList: '等级榜',
    
    // Common
    search: '搜索',
    filter: '筛选',
    all: '全部',
    loading: '加载中...',
    error: '错误',
    
    // Hero roles
    tank: '坦克',
    fighter: '战士',
    assassin: '刺客',
    mage: '法师',
    marksman: '射手',
    support: '辅助',
    
    // Difficulty
    easy: '简单',
    medium: '中等',
    hard: '困难',
    
    // Hero details
    overview: '概览',
    skills: '技能',
    counters: '克制',
    synergies: '配合',
    tips: '技巧',
    stats: '属性',
    lore: '背景',
    
    // Stats
    hp: '生命值',
    mana: '法力值',
    attack: '攻击力',
    defense: '防御力',
    speed: '移动速度',
    winRate: '胜率',
    pickRate: '选择率',
    banRate: '禁用率',
    
    // Build related
    coreItems: '核心装备',
    situationalItems: '情况装备',
    arcana: '铭文',
    skillOrder: '技能加点',
    gamePhase: '游戏阶段',
    early: '前期',
    mid: '中期',
    late: '后期',
    
    // Team builder
    teamComposition: '团队组成',
    teamSynergy: '团队配合',
    selectHero: '选择英雄',
    clearTeam: '清空团队',
    saveTeam: '保存团队',
    
    // Language
    language: '语言',
    english: 'English',
    arabic: 'العربية',
    chinese: '中文',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};