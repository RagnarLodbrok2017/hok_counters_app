// Complete Honor of Kings Hero Database Generator
const fs = require('fs');

const allHeroes = [
  // A
  { name: "Agudo", arabic: "أغودو", role: "Marksman", difficulty: "Medium", tier: "B" },
  { name: "Alessio", arabic: "أليسيو", role: "Marksman", difficulty: "Hard", tier: "A" },
  { name: "Allain", arabic: "آلين", role: "Fighter", difficulty: "Hard", tier: "B" },
  { name: "Angela", arabic: "أنجيلا", role: "Support", difficulty: "Easy", tier: "S" },
  { name: "Arke", arabic: "آرك", role: "Assassin", difficulty: "Hard", tier: "B" },
  { name: "Arli", arabic: "آرلي", role: "Marksman", difficulty: "Medium", tier: "B" },
  { name: "Arthur", arabic: "آرثر", role: "Tank", difficulty: "Easy", tier: "B" },
  { name: "Ata", arabic: "آتا", role: "Tank", difficulty: "Medium", tier: "C" },
  { name: "Athena", arabic: "أثينا", role: "Fighter", difficulty: "Medium", tier: "A" },
  { name: "Augran", arabic: "أوغران", role: "Fighter", difficulty: "Hard", tier: "C" },

  // B
  { name: "Bai Qi", arabic: "باي تشي", role: "Tank", difficulty: "Medium", tier: "A" },
  { name: "Biron", arabic: "بيرون", role: "Fighter", difficulty: "Medium", tier: "B" },
  { name: "Butterfly", arabic: "الفراشة", role: "Assassin", difficulty: "Hard", tier: "B" },

  // C
  { name: "Cai Yan", arabic: "تساي يان", role: "Support", difficulty: "Easy", tier: "A" },
  { name: "Cao Cao", arabic: "تساو تساو", role: "Fighter", difficulty: "Medium", tier: "B" },
  { name: "Chano", arabic: "تشانو", role: "Marksman", difficulty: "Medium", tier: "B" },
  { name: "Charlotte", arabic: "شارلوت", role: "Fighter", difficulty: "Hard", tier: "A" },
  { name: "Cirrus", arabic: "سيروس", role: "Assassin", difficulty: "Hard", tier: "B" },
  { name: "Consort Yu", arabic: "القرينة يو", role: "Marksman", difficulty: "Medium", tier: "B" },

  // D
  { name: "Da Qiao", arabic: "دا تشياو", role: "Support", difficulty: "Easy", tier: "B" },
  { name: "Daji", arabic: "داجي", role: "Mage", difficulty: "Easy", tier: "A" },
  { name: "Dharma", arabic: "دارما", role: "Fighter", difficulty: "Hard", tier: "A" },
  { name: "Di Renjie", arabic: "دي رين جي", role: "Marksman", difficulty: "Medium", tier: "B" },
  { name: "Dian Wei", arabic: "ديان وي", role: "Fighter", difficulty: "Medium", tier: "B" },
  { name: "Diaochan", arabic: "دياو تشان", role: "Mage", difficulty: "Medium", tier: "A" },
  { name: "Dolia", arabic: "دوليا", role: "Support", difficulty: "Easy", tier: "B" },
  { name: "Donghuang", arabic: "دونغ هوانغ", role: "Tank", difficulty: "Hard", tier: "B" },
  { name: "Dr Bian", arabic: "الدكتور بيان", role: "Mage", difficulty: "Medium", tier: "B" },
  { name: "Dun", arabic: "دون", role: "Tank", difficulty: "Medium", tier: "C" },
  { name: "Dyadia", arabic: "دياديا", role: "Support", difficulty: "Medium", tier: "B" },

  // E-F
  { name: "Erin", arabic: "إيرين", role: "Marksman", difficulty: "Medium", tier: "B" },
  { name: "Fang", arabic: "فانغ", role: "Marksman", difficulty: "Hard", tier: "A" },
  { name: "Fatih", arabic: "فاتح", role: "Fighter", difficulty: "Medium", tier: "B" },
  { name: "Feyd", arabic: "فيد", role: "Assassin", difficulty: "Hard", tier: "B" },
  { name: "Flowborn", arabic: "مولود الزهرة", role: "Tank", difficulty: "Medium", tier: "B" },
  { name: "Fuzi", arabic: "فوزي", role: "Fighter", difficulty: "Medium", tier: "B" },

  // G
  { name: "Gan & Mo", arabic: "غان ومو", role: "Mage", difficulty: "Hard", tier: "A" },
  { name: "Gao", arabic: "غاو", role: "Mage", difficulty: "Medium", tier: "B" },
  { name: "Garo", arabic: "غارو", role: "Marksman", difficulty: "Medium", tier: "B" },
  { name: "Guan Yu", arabic: "غوان يو", role: "Fighter", difficulty: "Medium", tier: "B" },
  { name: "Guiguzi", arabic: "غوي غو زي", role: "Support", difficulty: "Hard", tier: "A" },

  // H
  { name: "Han Xin", arabic: "هان شين", role: "Assassin", difficulty: "Hard", tier: "S+" },
  { name: "Heino", arabic: "هاينو", role: "Fighter", difficulty: "Hard", tier: "A" },
  { name: "Hou Yi", arabic: "هو يي", role: "Marksman", difficulty: "Medium", tier: "A" },
  { name: "Huang Zhong", arabic: "هوانغ تشونغ", role: "Marksman", difficulty: "Easy", tier: "B" },

  // J-K
  { name: "Jing", arabic: "جينغ", role: "Assassin", difficulty: "Hard", tier: "A" },
  { name: "Kaizer", arabic: "كايزر", role: "Fighter", difficulty: "Hard", tier: "A" },
  { name: "Kongming", arabic: "كونغ مينغ", role: "Mage", difficulty: "Hard", tier: "A" },
  { name: "Kui", arabic: "كوي", role: "Support", difficulty: "Medium", tier: "B" },

  // L
  { name: "Lady Sun", arabic: "السيدة سون", role: "Marksman", difficulty: "Medium", tier: "A" },
  { name: "Lady Zhen", arabic: "السيدة تشين", role: "Mage", difficulty: "Medium", tier: "B" },
  { name: "Lam", arabic: "لام", role: "Assassin", difficulty: "Hard", tier: "A" },
  { name: "Li Bai", arabic: "لي باي", role: "Assassin", difficulty: "Hard", tier: "S" },
  { name: "Li Xin", arabic: "لي شين", role: "Fighter", difficulty: "Hard", tier: "A" },
  { name: "Lian Po", arabic: "ليان بو", role: "Tank", difficulty: "Easy", tier: "B" },
  { name: "Liang", arabic: "ليانغ", role: "Mage", difficulty: "Medium", tier: "B" },
  { name: "Liu Bang", arabic: "ليو بانغ", role: "Tank", difficulty: "Medium", tier: "B" },
  { name: "Liu Bei", arabic: "ليو بي", role: "Fighter", difficulty: "Medium", tier: "B" },
  { name: "Liu Shan", arabic: "ليو شان", role: "Tank", difficulty: "Easy", tier: "C" },
  { name: "Loong", arabic: "لونغ", role: "Marksman", difficulty: "Hard", tier: "A" },
  { name: "Lu Bu", arabic: "لو بو", role: "Fighter", difficulty: "Hard", tier: "A" },
  { name: "Luara", arabic: "لوارا", role: "Marksman", difficulty: "Medium", tier: "B" },
  { name: "Luban No.7", arabic: "لوبان رقم 7", role: "Marksman", difficulty: "Medium", tier: "A" },
  { name: "Luna", arabic: "لونا", role: "Fighter", difficulty: "Hard", tier: "S" },

  // M
  { name: "Mai Shiranui", arabic: "ماي شيرانوي", role: "Mage", difficulty: "Hard", tier: "A" },
  { name: "Marco Polo", arabic: "ماركو بولو", role: "Marksman", difficulty: "Medium", tier: "A" },
  { name: "Mayene", arabic: "مايين", role: "Fighter", difficulty: "Medium", tier: "B" },
  { name: "Meng Ya", arabic: "مينغ يا", role: "Marksman", difficulty: "Easy", tier: "B" },
  { name: "Menki", arabic: "مينكي", role: "Fighter", difficulty: "Medium", tier: "B" },
  { name: "Mi Yue", arabic: "مي يو", role: "Mage", difficulty: "Hard", tier: "A" },
  { name: "Milady", arabic: "ميلادي", role: "Mage", difficulty: "Medium", tier: "B" },
  { name: "Ming", arabic: "مينغ", role: "Support", difficulty: "Easy", tier: "B" },
  { name: "Mozi", arabic: "موزي", role: "Fighter", difficulty: "Hard", tier: "A" },
  { name: "Mulan", arabic: "مولان", role: "Fighter", difficulty: "Hard", tier: "B" },
  { name: "Musashi", arabic: "موساشي", role: "Fighter", difficulty: "Hard", tier: "A" },

  // N
  { name: "Nakoruru", arabic: "ناكورورو", role: "Assassin", difficulty: "Hard", tier: "A" },
  { name: "Nezha", arabic: "نيتشا", role: "Fighter", difficulty: "Medium", tier: "B" },
  { name: "Nuwa", arabic: "نووا", role: "Mage", difficulty: "Medium", tier: "A" },

  // P
  { name: "Pei", arabic: "بي", role: "Assassin", difficulty: "Hard", tier: "A" },
  { name: "Prince of Lanling", arabic: "أمير لانلينغ", role: "Assassin", difficulty: "Hard", tier: "A" },
  { name: "Princess Frost", arabic: "الأميرة فروست", role: "Mage", difficulty: "Medium", tier: "B" },

  // S
  { name: "Sakeer", arabic: "ساكير", role: "Support", difficulty: "Medium", tier: "B" },
  { name: "Shangguan", arabic: "شانغ غوان", role: "Mage", difficulty: "Medium", tier: "B" },
  { name: "Shi", arabic: "شي", role: "Mage", difficulty: "Hard", tier: "A" },
  { name: "Shouyue", arabic: "شو يو", role: "Marksman", difficulty: "Medium", tier: "B" },
  { name: "Sima Yi", arabic: "سيما يي", role: "Assassin", difficulty: "Hard", tier: "A" },
  { name: "Sun Bin", arabic: "سون بين", role: "Support", difficulty: "Medium", tier: "B" },
  { name: "Sun Ce", arabic: "سون تسي", role: "Fighter", difficulty: "Medium", tier: "B" },

  // U-W
  { name: "Ukyo Tachibana", arabic: "أوكيو تاتشيبانا", role: "Assassin", difficulty: "Hard", tier: "A" },
  { name: "Wukong", arabic: "ووكونغ", role: "Assassin", difficulty: "Hard", tier: "A" },
  { name: "Wuyan", arabic: "وويان", role: "Fighter", difficulty: "Medium", tier: "B" },

  // X-Y
  { name: "Xiang Yu", arabic: "شيانغ يو", role: "Tank", difficulty: "Medium", tier: "B" },
  { name: "Xiao Qiao", arabic: "شياو تشياو", role: "Mage", difficulty: "Easy", tier: "B" },
  { name: "Xuance", arabic: "شوانس", role: "Assassin", difficulty: "Hard", tier: "A" },
  { name: "Yang Jian", arabic: "يانغ جيان", role: "Fighter", difficulty: "Hard", tier: "A" },
  { name: "Yao", arabic: "ياو", role: "Fighter", difficulty: "Medium", tier: "B" },
  { name: "Yaria", arabic: "ياريا", role: "Support", difficulty: "Easy", tier: "B" },
  { name: "Ying", arabic: "ينغ", role: "Fighter", difficulty: "Hard", tier: "A" },
  { name: "Yixing", arabic: "يي شينغ", role: "Mage", difficulty: "Medium", tier: "B" },
  { name: "Yuhuan", arabic: "يو هوان", role: "Mage", difficulty: "Medium", tier: "B" },

  // Z
  { name: "Zhang Fei", arabic: "تشانغ في", role: "Tank", difficulty: "Medium", tier: "A" },
  { name: "Zhou Yu", arabic: "تشو يو", role: "Mage", difficulty: "Medium", tier: "B" },
  { name: "Zhuangzi", arabic: "تشوانغ زي", role: "Support", difficulty: "Hard", tier: "A" },
  { name: "Zilong", arabic: "زي لونغ", role: "Fighter", difficulty: "Easy", tier: "B" },
  { name: "Ziya", arabic: "زيا", role: "Mage", difficulty: "Hard", tier: "A" }
];

console.log(`Total heroes: ${allHeroes.length}`);

// Generate complete JSON structure
const generateHeroData = (hero, index) => {
  const roleStats = {
    Tank: { hp: 3600, mana: 440, attack: 165, defense: 95, speed: 345 },
    Fighter: { hp: 3400, mana: 420, attack: 175, defense: 88, speed: 370 },
    Assassin: { hp: 3200, mana: 410, attack: 180, defense: 80, speed: 390 },
    Mage: { hp: 2900, mana: 490, attack: 170, defense: 78, speed: 360 },
    Marksman: { hp: 3100, mana: 430, attack: 172, defense: 75, speed: 380 },
    Support: { hp: 2700, mana: 450, attack: 105, defense: 73, speed: 360 }
  };

  const baseStats = roleStats[hero.role] || roleStats.Fighter;
  const variation = () => Math.floor(Math.random() * 100) - 50;

  return {
    id: hero.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    name: hero.name,
    nameArabic: hero.arabic,
    title: `The ${hero.role === 'Tank' ? 'Guardian' : hero.role === 'Fighter' ? 'Warrior' :
      hero.role === 'Assassin' ? 'Shadow' : hero.role === 'Mage' ? 'Mystic' :
        hero.role === 'Marksman' ? 'Archer' : 'Supporter'}`,
    titleArabic: `${hero.role === 'Tank' ? 'الحارس' : hero.role === 'Fighter' ? 'المحارب' :
      hero.role === 'Assassin' ? 'الظل' : hero.role === 'Mage' ? 'الصوفي' :
        hero.role === 'Marksman' ? 'الرامي' : 'الداعم'}`,
    role: hero.role,
    roleArabic: hero.role === 'Tank' ? 'دبابة' : hero.role === 'Fighter' ? 'مقاتل' :
      hero.role === 'Assassin' ? 'قاتل' : hero.role === 'Mage' ? 'ساحر' :
        hero.role === 'Marksman' ? 'رامي' : 'داعم',
    difficulty: hero.difficulty,
    difficultyArabic: hero.difficulty === 'Easy' ? 'سهل' : hero.difficulty === 'Medium' ? 'متوسط' : 'صعب',
    image: `https://static.wikia.nocookie.net/honor-of-kings/images/${String.fromCharCode(97 + index % 26)}/${String.fromCharCode(97 + (index + 1) % 26)}${index}/${hero.name.replace(/\s+/g, '_')}_-_Default.png`,
    lore: `A legendary ${hero.role.toLowerCase()} with incredible power and skill.`,
    loreArabic: `${hero.role === 'Tank' ? 'دبابة' : hero.role === 'Fighter' ? 'مقاتل' :
      hero.role === 'Assassin' ? 'قاتل' : hero.role === 'Mage' ? 'ساحر' :
        hero.role === 'Marksman' ? 'رامي' : 'داعم'} أسطوري بقوة ومهارة مذهلة.`,
    stats: {
      hp: baseStats.hp + variation(),
      mana: baseStats.mana + variation(),
      attack: baseStats.attack + variation(),
      defense: baseStats.defense + variation(),
      speed: baseStats.speed + variation()
    },
    winRate: 45 + Math.random() * 15,
    pickRate: 5 + Math.random() * 20,
    banRate: Math.random() * 25,
    tier: hero.tier
  };
};

const heroDatabase = allHeroes.map(generateHeroData);

// Write to file
fs.writeFileSync('./completeHeroes.json', JSON.stringify(heroDatabase, null, 2));
console.log(`Generated ${heroDatabase.length} heroes successfully!`);