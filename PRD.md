# SOLO HOK – Product Requirements Document (PRD)

## 📌 Overview

**SOLO HOK** is a modern, cross-platform mobile application built using **React Native with Expo**. It serves as the ultimate companion app for *Honor of Kings* (HoK) players, providing detailed information about heroes, builds, counters, meta guides, team planning, and pro-level strategies — all in a user-friendly, dark-mode-first interface.

---

## 🎯 Goals

- Provide a fully browsable and searchable HoK hero database
- Deliver meta builds, arcana, counters, and guide content
- Help users plan optimal teams and matchups
- Update dynamically with patches and tier list changes
- Offer a sleek, responsive UI for competitive mobile gaming

---

## 🏷 App Name

**SOLO HOK**

---

## 🎨 Branding

### Logo Guidelines:
- Abstract combination of **"S"** and **"HOK"** with a crown or sword motif
- Flat modern look, minimal gradients
- Primary Colors:
  - Accent: `#FF4444`
  - Background: `#222831`
  - Foreground: `#FFFFFF`
- Export format: SVG + PNG

---

## 📦 Core Features

### 1. Hero Database
- Browse all HoK heroes (100+ heroes)
- Filters: Role (Tank, Mage, Assassin, Marksman, Support, Fighter)
- Hero detail page includes:
  - Lore & role description
  - Base stats and scaling
  - Skill breakdown with effects, damage, and cooldowns
  - Best builds and arcana recommendations
  - Counters and synergies
  - Pro tips & playstyle notes
  - Win rate and pick rate statistics

### 2. Counter Guide
- View strongest counters per hero
- Suggestions for beating specific heroes by role
- Explanation of counter mechanics
- Lane matchup guides
- Counter-pick recommendations during draft

### 3. Team Builder
- Select 5 heroes to form a team
- Display team balance and synergy rating
- Save/load team compositions
- Recommend based on meta heroes
- Team composition analysis (damage types, CC, mobility)
- Draft simulator with ban/pick phases

### 4. Meta Tier List
- Updated tier list by patch
- Roles divided: S+, S, A, B, C tiers
- Notes for each tier placement
- Historical tier tracking
- Regional meta differences (China, Global, etc.)

### 5. Best Builds
- Builds per hero:
  - Core items and situational items
  - Full item sets with explanations
  - Arcana combinations (red, blue, green)
  - Role-specific builds (jungle vs lane)
  - Early, mid, and late game item priorities
- Community ratings and comments
- Patch-based versioning
- Pro player builds and preferences

### 6. Strategy & Game Plans
- Game phase strategies (early, mid, late game)
- Laning tips, roaming patterns
- Objective control guides (Dragon, Dark Slayer, towers)
- Team fight positioning and tactics
- Push/peel/engage strategies
- Map control and vision guides

### 7. Updates & Patch Notes
- Patch highlights and summaries
- Hero balance changes with impact analysis
- New hero previews and guides
- Meta shift commentary
- Item and equipment updates
- Game mode changes and events

### 8. User Accounts
- Sign up/log in (Firebase Auth)
- Save favorite heroes and builds
- Sync teams and strategies across devices
- Personal statistics tracking
- Achievement system
- Friend system and sharing

### 9. Search & Filters
- Global search: Heroes, Builds, Guides
- Advanced filters:
  - Role, difficulty, release date
  - Build type, cost, effectiveness
  - Arcana setup and combinations
- Sort options: popularity, win rate, alphabetical

### 10. Additional Features
- Dark/Light mode toggle
- Offline mode for core data
- Push notifications for patches
- In-app news and announcements
- Tutorial system for new players
- Glossary of game terms

---

## 🔧 Tech Stack

- **Frontend:** React Native + Expo SDK 49+
- **Navigation:** React Navigation v6
- **State Management:** Zustand
- **Backend:** Firebase (Auth, Firestore, Storage)
- **UI Library:** React Native Paper + Custom Components
- **Animations:** React Native Reanimated + Lottie
- **Data Fetching:** TanStack Query (React Query)
- **Image Handling:** Expo Image
- **Local Storage:** AsyncStorage + MMKV
- **Push Notifications:** Expo Notifications
- **Analytics:** Firebase Analytics
- **Crash Reporting:** Firebase Crashlytics

---

## 📚 Data Schema Examples

### Hero Data Structure
```json
{
  "id": "li-bai",
  "name": "Li Bai",
  "title": "Poetic Swordsman",
  "role": "Assassin",
  "difficulty": "Hard",
  "releaseDate": "2016-10-01",
  "lore": "A poetic swordsman who slashes through enemies with elegant strikes.",
  "stats": {
    "hp": 3225,
    "mana": 420,
    "attack": 181,
    "defense": 85,
    "speed": 380
  },
  "skills": [
    {
      "name": "Chivalrous Sword",
      "type": "passive",
      "description": "Li Bai's abilities mark enemies. After 4 marks, his next ability deals true damage.",
      "cooldown": 0,
      "manaCost": 0
    },
    {
      "name": "Blade of Time",
      "type": "skill1",
      "description": "Dashes forward dealing damage and marking enemies.",
      "cooldown": [8, 7.4, 6.8, 6.2, 5.6, 5],
      "manaCost": [60, 65, 70, 75, 80, 85],
      "damage": [350, 400, 450, 500, 550, 600]
    }
  ],
  "recommendedBuilds": [
    {
      "name": "Burst Assassin",
      "items": ["rapacious-bite", "bloodweeper", "nightmare", "fenrirs-tooth", "blade-of-despair", "immortal"],
      "arcana": {
        "red": "hunt",
        "blue": "mutation", 
        "green": "reaver"
      },
      "description": "High burst damage for eliminating squishy targets"
    }
  ],
  "counters": ["ying-zheng", "luban-7", "angela"],
  "synergies": ["zhang-fei", "diaochan", "sun-bin"],
  "tips": [
    "Avoid CC before engaging with ultimate",
    "Look for flanking opportunities",
    "Use passive marks efficiently"
  ],
  "winRate": 52.3,
  "pickRate": 8.7,
  "banRate": 15.2
}
```

### Build Data Structure
```json
{
  "id": "li-bai-burst",
  "heroId": "li-bai",
  "name": "Burst Assassin",
  "type": "jungle",
  "patch": "1.98.1.15",
  "items": {
    "core": ["rapacious-bite", "bloodweeper", "nightmare"],
    "situational": ["fenrirs-tooth", "blade-of-despair", "immortal"],
    "boots": "swift-boots"
  },
  "arcana": {
    "red": ["hunt", "hunt", "hunt", "hunt", "hunt"],
    "blue": ["mutation", "mutation", "mutation", "mutation", "mutation"],
    "green": ["reaver", "reaver", "reaver", "reaver", "reaver"]
  },
  "skillOrder": [2, 1, 2, 3, 2, 1, 2, 1, 2, 1, 3, 1, 3, 3, 3],
  "gamePhase": {
    "early": "Focus on farming and ganking overextended enemies",
    "mid": "Look for picks on isolated targets",
    "late": "Flank in team fights and eliminate carries"
  },
  "rating": 4.6,
  "votes": 1247,
  "author": "ProPlayer123",
  "lastUpdated": "2024-01-15"
}
```

---

## 🧪 Development Phases

### ✅ Phase 1 (MVP - 8 weeks)
- Basic app structure and navigation
- Static hero database with search and filters
- Hero detail pages with skills and basic info
- Simple build recommendations
- Basic tier list display
- Dark/Light theme implementation

### 🔜 Phase 2 (Enhanced Features - 6 weeks)
- Firebase integration (auth, database)
- User accounts and favorites
- Team builder with synergy analysis
- Counter recommendations
- Advanced search and filtering
- Offline mode implementation

### 🔮 Phase 3 (Community & Advanced - 8 weeks)
- User-generated content (builds, guides)
- Rating and review system
- Push notifications for updates
- Advanced analytics and statistics
- Social features (sharing, friends)
- Admin panel for content management

### 🚀 Phase 4 (Polish & Scale - 4 weeks)
- Performance optimization
- Advanced animations and micro-interactions
- Comprehensive testing
- App store optimization
- Marketing materials and screenshots

---

## 🎯 Target Audience

### Primary Users
- **Competitive HoK Players** (Rank: Diamond+)
  - Need: Advanced strategies, meta builds, counter picks
  - Age: 18-28
  - Usage: Daily, before/during ranked sessions

- **Casual Players** (Rank: Gold-Platinum)
  - Need: Hero guides, basic builds, improvement tips
  - Age: 16-35
  - Usage: 2-3 times per week

### Secondary Users
- **New Players**
  - Need: Hero explanations, beginner guides
  - Usage: Learning phase, decreasing over time

- **Content Creators**
  - Need: Latest meta information, statistics
  - Usage: Research for videos/streams

---

## 📊 Success Metrics

### User Engagement
- Daily Active Users (DAU): Target 10K+ by month 6
- Session Duration: Target 8+ minutes average
- Retention Rate: 40% Day 7, 20% Day 30
- User-generated content: 100+ builds per month

### App Performance
- App Store Rating: 4.5+ stars
- Crash Rate: <1%
- Load Time: <3 seconds for hero data
- Offline Functionality: 90% of features available

### Business Metrics
- Downloads: 100K+ in first year
- Premium Conversion: 5% of active users
- Revenue: $10K+ monthly by month 12

---

## 🚀 Deployment Strategy

### Development Environment
- Expo Development Build
- Firebase Emulator Suite
- TestFlight (iOS) / Internal Testing (Android)

### Production Deployment
- **Android**: Google Play Store
- **iOS**: Apple App Store
- **Web**: Progressive Web App (optional)

### Release Strategy
- Closed Beta: 50 users (2 weeks)
- Open Beta: 500 users (4 weeks)
- Soft Launch: Select regions (4 weeks)
- Global Launch: Worldwide release

---

## 💰 Monetization Strategy

### Freemium Model
- **Free Tier**: Basic hero info, limited builds, ads
- **Premium Tier** ($4.99/month or $39.99/year):
  - Ad-free experience
  - Unlimited saved teams and builds
  - Advanced statistics and analytics
  - Early access to new features
  - Priority customer support

### Additional Revenue Streams
- In-app purchases for cosmetic themes
- Sponsored content from gaming brands
- Affiliate marketing for gaming accessories

---

## 🔒 Privacy & Security

### Data Collection
- Minimal personal data collection
- Anonymous usage analytics
- User consent for all data sharing
- GDPR and CCPA compliance

### Security Measures
- Firebase Security Rules
- Data encryption in transit and at rest
- Regular security audits
- Secure authentication flows

---

## 📱 Platform Requirements

### Minimum Requirements
- **iOS**: iOS 12.0+, iPhone 6s or newer
- **Android**: Android 7.0+ (API level 24), 2GB RAM
- **Storage**: 100MB initial, 500MB with cached data
- **Network**: Works offline, syncs when online

### Recommended Specifications
- **iOS**: iOS 15.0+, iPhone 11 or newer
- **Android**: Android 10.0+, 4GB RAM
- **Network**: WiFi or 4G for optimal experience

---

## 🧾 Technical Considerations

### Performance Optimization
- Image lazy loading and caching
- Virtual lists for large datasets
- Code splitting and bundle optimization
- Background sync for data updates

### Accessibility
- Screen reader support
- High contrast mode
- Adjustable font sizes
- Voice navigation support

### Internationalization
- Multi-language support (English, Chinese, Korean, Japanese)
- Regional content variations
- Currency and date localization

---

## 📎 References & Inspiration

- **Primary Reference**: https://gaminggblog.com/
- **Official HoK Resources**: Tencent's official websites and APIs
- **Community Sources**: Reddit r/HonorOfKings, Discord servers
- **Competitive Data**: Tournament statistics, pro player builds
- **Design Inspiration**: Modern gaming apps, esports platforms

---

## 🎨 UI/UX Guidelines

### Design Principles
- **Gaming-First**: Dark theme optimized for gaming sessions
- **Information Dense**: Maximum data in minimal space
- **Quick Access**: Common actions within 2 taps
- **Visual Hierarchy**: Clear distinction between content types

### Color Palette
```
Primary: #FF4444 (Red accent)
Background: #222831 (Dark gray)
Surface: #393E46 (Medium gray)
Text Primary: #FFFFFF (White)
Text Secondary: #EEEEEE (Light gray)
Success: #00D9FF (Cyan)
Warning: #FFD93D (Yellow)
Error: #FF6B6B (Light red)
```

### Typography
- **Headers**: Montserrat Bold
- **Body**: Inter Regular
- **Monospace**: JetBrains Mono (for stats)

---

*This PRD serves as the foundation for developing SOLO HOK, the ultimate Honor of Kings companion app. Regular updates and iterations based on user feedback and market changes are expected throughout the development process.*