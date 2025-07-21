# 🏆 SOLO HOK - Honor of Kings Companion App

<div align="center">

![SOLO HOK Logo](https://img.shields.io/badge/SOLO-HOK-FF4444?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K)

**The Ultimate Honor of Kings Companion App**

[![React Native](https://img.shields.io/badge/React_Native-0.79.5-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~53.0.0-000020?style=flat&logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat)](LICENSE)

[📱 Download](#installation) • [🎮 Features](#features) • [🛠️ Development](#development) • [📖 Documentation](#documentation)

</div>

---

## 📖 About

**SOLO HOK** is a modern, cross-platform mobile application built with React Native and Expo, designed to be the ultimate companion for Honor of Kings (HoK) players. Whether you're climbing the ranked ladder or just starting your journey, SOLO HOK provides everything you need to master the game.

### 🎯 What Makes SOLO HOK Special?

- **📊 Comprehensive Hero Database** - Detailed information on 100+ heroes with stats, skills, and strategies
- **🔄 Smart Counter System** - AI-powered recommendations for hero counters and matchups  
- **👥 Team Builder** - Create and analyze team compositions with synergy ratings
- **📈 Live Meta Tracking** - Stay updated with current tier lists and patch changes
- **🎮 Pro Builds** - Access builds used by professional players and top-ranked users
- **🌙 Gaming-Optimized UI** - Dark-first design perfect for gaming sessions

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🏛️ **Hero Database**
- Browse 100+ heroes with advanced filtering
- Detailed skill breakdowns with damage calculations
- Lore, stats, and role-specific information
- Win rates and pick/ban statistics

### 🎯 **Counter Guide**
- Smart counter recommendations
- Lane matchup analysis
- Counter-pick strategies for draft phase
- Detailed explanations of counter mechanics

### 👥 **Team Builder**
- Interactive team composition tool
- Synergy and balance analysis
- Save and share team compositions
- Draft simulator with ban/pick phases

</td>
<td width="50%">

### 📊 **Meta Tier Lists**
- Updated tier lists by patch
- Role-specific rankings (S+ to C tier)
- Historical tier tracking
- Regional meta differences

### 🛡️ **Build Optimizer**
- Core and situational item builds
- Arcana combinations and explanations
- Role-specific build variations
- Community ratings and feedback

### 📱 **Modern Experience**
- Offline-first architecture
- Dark/Light theme support
- Cross-platform compatibility
- Real-time data synchronization

</td>
</tr>
</table>

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator
- Internet connection (for real-time Honor of Kings data)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/solo-hok.git
cd solo-hok

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm start
# or
yarn start
```

### Running on Device

```bash
# iOS
npm run ios

# Android  
npm run android

# Web
npm run web
```

### 🌐 Real-Time Data Integration

SOLO HOK now integrates with the **Honor of Kings API** by [qing762](https://github.com/qing762/honor-of-kings-api) to provide:

- **Live Hero Data** - Real hero information directly from Honor of Kings official website
- **Accurate Skills & Stats** - Up-to-date skill descriptions, cooldowns, and damage values
- **Official Images** - Hero portraits and skin images from the game
- **Counter Information** - Real counter relationships and synergies
- **Emblem Recommendations** - Official emblem builds and tips

**API Endpoint**: `https://qing762.is-a.dev/api/wangzhe`

The app automatically fetches and caches data for optimal performance while ensuring you always have the latest game information.

---

## 🛠️ Tech Stack

<div align="center">

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | React Native | 0.79.5 |
| **Platform** | Expo | ~53.0.0 |
| **Language** | TypeScript | 5.3.3 |
| **Navigation** | React Navigation | 6.x |
| **State Management** | Zustand | 5.0.1 |
| **Data Fetching** | TanStack Query | 5.59.0 |
| **UI Components** | React Native Paper | 5.12.5 |
| **Animations** | React Native Reanimated | 3.17.4 |
| **Icons** | React Native Vector Icons | 10.2.0 |

</div>

---

## 📱 Screenshots

<div align="center">
<table>
<tr>
<td align="center">
<img src="https://via.placeholder.com/250x500/222831/FFFFFF?text=Hero+List" alt="Hero List" width="200"/>
<br><b>Hero Database</b>
</td>
<td align="center">
<img src="https://via.placeholder.com/250x500/222831/FFFFFF?text=Hero+Detail" alt="Hero Detail" width="200"/>
<br><b>Hero Details</b>
</td>
<td align="center">
<img src="https://via.placeholder.com/250x500/222831/FFFFFF?text=Team+Builder" alt="Team Builder" width="200"/>
<br><b>Team Builder</b>
</td>
<td align="center">
<img src="https://via.placeholder.com/250x500/222831/FFFFFF?text=Tier+List" alt="Tier List" width="200"/>
<br><b>Tier Lists</b>
</td>
</tr>
</table>
</div>

---

## 🏗️ Project Structure

```
solo-hok/
├── 📱 App.tsx                 # Main app component
├── 📁 src/
│   ├── 🧩 components/         # Reusable UI components
│   │   └── LanguageSelector.tsx
│   ├── 🎨 theme/             # Theme configuration
│   │   └── theme.ts
│   ├── 📱 screens/           # App screens
│   │   ├── HomeScreen.tsx
│   │   ├── HeroListScreen.tsx
│   │   ├── HeroDetailScreen.tsx
│   │   ├── TeamBuilderScreen.tsx
│   │   ├── TierListScreen.tsx
│   │   └── BuildsScreen.tsx
│   ├── 🗃️ data/             # Static data and generators
│   │   ├── heroes.json
│   │   ├── builds.json
│   │   └── heroGenerator.js
│   ├── 🔄 context/          # React contexts
│   │   └── LanguageContext.tsx
│   └── 📝 types/            # TypeScript definitions
│       └── react-native-vector-icons.d.ts
├── 📋 package.json
├── ⚙️ app.json
├── 🔧 babel.config.js
├── 🚇 metro.config.js
└── 📖 README.md
```

---

## 🎮 Development

### Development Workflow

1. **Feature Development**
   ```bash
   # Create feature branch
   git checkout -b feature/hero-search
   
   # Make changes and test
   npm start
   
   # Run tests
   npm test
   ```

2. **Code Quality**
   ```bash
   # Type checking
   npx tsc --noEmit
   
   # Linting
   npx eslint src/
   
   # Formatting
   npx prettier --write src/
   ```

3. **Building**
   ```bash
   # Development build
   expo build:android --type apk
   expo build:ios --type simulator
   
   # Production build
   expo build:android --type app-bundle
   expo build:ios --type archive
   ```

### Environment Setup

Create a `.env` file in the root directory:

```env
# API Configuration
API_BASE_URL=https://api.solohok.com
API_KEY=your_api_key_here

# Firebase Configuration (if using)
FIREBASE_API_KEY=your_firebase_key
FIREBASE_PROJECT_ID=your_project_id

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_CRASH_REPORTING=true
```

---

## 📊 Data Structure

### Hero Data Example

```typescript
interface Hero {
  id: string;
  name: string;
  title: string;
  role: 'Tank' | 'Mage' | 'Assassin' | 'Marksman' | 'Support' | 'Fighter';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  stats: {
    hp: number;
    mana: number;
    attack: number;
    defense: number;
    speed: number;
  };
  skills: Skill[];
  counters: string[];
  synergies: string[];
  winRate: number;
  pickRate: number;
  banRate: number;
}
```

### Build Data Example

```typescript
interface Build {
  id: string;
  heroId: string;
  name: string;
  type: 'jungle' | 'lane' | 'support';
  items: {
    core: string[];
    situational: string[];
    boots: string;
  };
  arcana: {
    red: string[];
    blue: string[];
    green: string[];
  };
  rating: number;
  author: string;
}
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 🐛 Bug Reports

Found a bug? Please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Device/OS information

### 💡 Feature Requests

Have an idea? We'd love to hear it! Please include:
- Detailed description of the feature
- Use case and benefits
- Mockups or examples if possible

### 🔧 Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 📋 Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure code passes all checks

---

## 📈 Roadmap

### 🎯 Current Phase: MVP (v1.0)
- [x] Basic app structure and navigation
- [x] Hero database with search and filters
- [x] Hero detail pages with skills
- [x] Basic build recommendations
- [x] Tier list display
- [x] Dark/Light theme support

### 🔜 Phase 2: Enhanced Features (v1.1)
- [ ] User authentication and profiles
- [ ] Favorite heroes and builds
- [ ] Advanced team builder
- [ ] Counter recommendations
- [ ] Offline mode
- [ ] Push notifications

### 🚀 Phase 3: Community Features (v1.2)
- [ ] User-generated builds
- [ ] Rating and review system
- [ ] Social sharing
- [ ] Tournament integration
- [ ] Pro player insights
- [ ] Advanced analytics

### 🌟 Phase 4: Advanced Features (v2.0)
- [ ] AI-powered recommendations
- [ ] Live match integration
- [ ] Voice commands
- [ ] AR hero preview
- [ ] Esports tournament tracker
- [ ] Multi-language support

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Honor of Kings** by Tencent Games for the amazing game
- **React Native** and **Expo** teams for the excellent development platform
- **Gaming Community** for feedback and suggestions
- **Open Source Contributors** who make projects like this possible

---

## 📞 Support & Contact

<div align="center">

### 💬 Get Help

[![Discord](https://img.shields.io/badge/Discord-Join_Server-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/solohok)
[![GitHub Issues](https://img.shields.io/badge/GitHub-Issues-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yourusername/solo-hok/issues)
[![Email](https://img.shields.io/badge/Email-Contact_Us-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:support@solohok.com)

### 🌟 Show Your Support

If you find SOLO HOK helpful, please consider:

[![Star on GitHub](https://img.shields.io/badge/⭐-Star_on_GitHub-yellow?style=for-the-badge)](https://github.com/yourusername/solo-hok)
[![Share on Twitter](https://img.shields.io/badge/🐦-Share_on_Twitter-1DA1F2?style=for-the-badge)](https://twitter.com/intent/tweet?text=Check%20out%20SOLO%20HOK%20-%20The%20ultimate%20Honor%20of%20Kings%20companion%20app!&url=https://github.com/yourusername/solo-hok)

</div>

---

<div align="center">

**Made with ❤️ for the Honor of Kings community**

*Last updated: January 2025*

</div>