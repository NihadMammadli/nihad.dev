# Nihad.dev - Interactive CV Game

An interactive gamified CV website built with Phaser 3, featuring Undertale-inspired 2D top-down gameplay mechanics. Walk around a pixel art world, interact with NPCs to learn about my professional experience, collect skills, and complete quests that represent my career journey.

## 🎮 Live Demo

Visit [nihad.dev](https://nihad.dev) to play the interactive CV game!

## ✨ Features

### Core Gameplay
- **2D Top-down Perspective**: Undertale-inspired pixel art style
- **Click/Tap to Move**: Intuitive movement with A* pathfinding
- **Interactive NPCs**: Each character represents different aspects of my CV
- **Dialogue System**: Typewriter effect dialogue boxes with smooth animations
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### CV Integration
- **Career Journey**: NPCs represent different roles, skills, and experiences
- **Skill Collection**: Gather skills by interacting with NPCs (inventory system)
- **Quest System**: Track progress through different areas of my professional life
- **Achievement System**: Complete quests to unlock the full CV experience

### Technical Features
- **Modular Architecture**: Easy to extend with new scenes, NPCs, and content
- **Mobile-Friendly**: Touch controls and responsive UI
- **Fast Loading**: Optimized asset loading and lightweight codebase
- **Accessible**: Keyboard shortcuts and clear visual feedback

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Yarn package manager

### Installation & Development
```bash
# Clone the repository
git clone https://github.com/username/nihad.dev.git
cd nihad.dev

# Install dependencies
yarn install

# Start development server
yarn dev

# Open http://localhost:3000 in your browser
```

### Build for Production
```bash
# Create production build
yarn build

# Preview production build
yarn preview
```

## 🎯 How to Play

1. **Start the Adventure**: Click "START ADVENTURE" on the main menu
2. **Move Your Character**: Click/tap anywhere to move (or use WASD/Arrow keys)
3. **Interact with NPCs**: Click on the green characters to start conversations
4. **Collect Skills**: Each NPC teaches you about different aspects of my experience
5. **Track Progress**: Use the Inventory (I key) and Quest Log (Q key) to see your progress
6. **Complete Quests**: Interact with all NPCs to complete the full CV experience

### Controls
- **Mouse/Touch**: Click/tap to move and interact
- **Keyboard**: WASD or Arrow keys for movement
- **I Key**: Open/close inventory
- **Q Key**: Open/close quest log  
- **H Key**: Show help overlay
- **ESC Key**: Open inventory (alternative)

## 📱 Mobile Support

The game is fully optimized for mobile devices:
- Touch-friendly controls
- Responsive canvas scaling
- Mobile-specific UI buttons
- Optimized performance for various screen sizes

## 🏗️ Architecture

### Project Structure
```
src/
├── game/           # Core game classes
│   ├── GameConfig.js    # Game configuration and constants
│   ├── Player.js        # Player character logic
│   └── NPC.js          # Non-player character system
├── scenes/         # Phaser scenes
│   ├── BootScene.js     # Initial loading scene
│   ├── PreloadScene.js  # Asset loading scene
│   ├── StartScene.js    # Main menu scene
│   └── GameScene.js     # Main gameplay scene
├── utils/          # Utility systems
│   ├── DialogueSystem.js    # Dialogue box and typewriter effect
│   └── PathfindingSystem.js # A* pathfinding for movement
├── ui/             # User interface
│   └── GameUI.js        # Inventory, quest log, and notifications
├── data/           # Content and data
│   └── CVData.js        # CV content, NPC data, and quests
└── main.js         # Application entry point
```

### Key Systems

#### Dialogue System
- Typewriter effect with configurable speed
- Character name display
- Click/tap to continue or skip
- Mobile and desktop input handling

#### Pathfinding System  
- A* algorithm implementation
- Grid-based collision detection
- Smooth character movement
- Obstacle avoidance

#### Game State Management
- Skill collection tracking
- Quest completion system
- Persistent UI state
- Progress notifications

## 🎨 Customization Guide

### Adding New NPCs

1. **Update CVData.js**:
```javascript
// Add to the getNPCs() function
{
    id: 'new_npc',
    name: 'NPC Name',
    sprite: 'npc', 
    dialogue: 'Your dialogue text here...',
    skill: 'Skill Name',
    quest: 'Quest Name',
    area: 'section_name'
}
```

2. **Position the NPC** in `GameScene.js`:
```javascript
// Add position to findNPCPosition() function
const positions = [
    // ... existing positions
    { x: newX * 32 + 16, y: newY * 32 + 16 }
];
```

### Adding New Skills

Update the `skills` array in `CVData.js`:
```javascript
{
    name: "New Skill",
    category: "Category",
    level: "Expert|Advanced|Intermediate|Beginner", 
    description: "Skill description"
}
```

### Adding New Quests

Update the `getQuests()` function in `CVData.js`:
```javascript
{
    id: 'quest_id',
    title: 'Quest Title',
    description: 'Quest description',
    requirements: ['requirement1', 'requirement2'],
    reward: 'Reward description',
    status: 'active'
}
```

### Customizing Visual Style

- **Colors**: Update `GAME_CONSTANTS.COLORS` in `GameConfig.js`
- **Fonts**: Modify font families in UI components
- **Animations**: Adjust timing in `GAME_CONSTANTS.ANIMATIONS`
- **Sprites**: Replace placeholder assets with custom pixel art

### Adding Audio

1. **Load Audio** in `PreloadScene.js`:
```javascript
this.load.audio('bgm_main', ['assets/audio/bgm_main.ogg', 'assets/audio/bgm_main.mp3']);
this.load.audio('sfx_dialogue', ['assets/audio/sfx_dialogue.wav']);
```

2. **Play Audio** in relevant scenes:
```javascript
this.sound.play('sfx_dialogue', { volume: 0.5 });
```

## 🚢 Deployment

The project is configured for static hosting. Build artifacts can be deployed to:

- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your Git repository  
- **GitHub Pages**: Upload build files
- **Any static host**: Upload contents of `dist` folder

### Environment Configuration

No environment variables required for basic functionality. For advanced features:

```bash
# Optional: Analytics tracking ID
VITE_ANALYTICS_ID=your_analytics_id

# Optional: API endpoints
VITE_API_URL=your_api_url
```

## 🔧 Development Tips

### Performance Optimization
- Keep sprite sizes reasonable (32x32 or 64x64 for pixel art)
- Use object pooling for particles or effects
- Minimize simultaneous audio playback
- Optimize tilemap size for target devices

### Mobile Testing
```bash
# Test on local network
npm run dev -- --host

# Access from mobile device
http://your-local-ip:3000
```

### Debugging
- Set `debug: true` in physics config for collision visualization
- Use browser developer tools for performance profiling
- Enable Phaser debug mode in development

## 🤝 Contributing

Feel free to suggest improvements, report bugs, or contribute enhancements:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Contact

**Nihad**
- Email: contact@nihad.dev
- Website: [nihad.dev](https://nihad.dev)
- Portfolio: Interactive CV Game (you're looking at it!)

---

*Built with ❤️ using Phaser 3, Vite, and lots of pixel art inspiration from Undertale*