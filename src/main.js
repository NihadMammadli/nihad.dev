import Phaser from 'phaser';
import { GameConfig } from './game/GameConfig.js';
import { BootScene } from './scenes/BootScene.js';
import { PreloadScene } from './scenes/PreloadScene.js';
import { StartScene } from './scenes/StartScene.js';
import { GameScene } from './scenes/GameScene.js';

// Register all scenes
const config = {
    ...GameConfig,
    scene: [
        BootScene,
        PreloadScene,
        StartScene,
        GameScene
    ]
};

// Initialize the game
class CVGame {
    constructor() {
        this.game = null;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.createGame());
        } else {
            this.createGame();
        }
    }

    createGame() {
        // Create Phaser game instance
        this.game = new Phaser.Game(config);

        // Add global game instance for easy access
        window.cvGame = this.game;

        // Handle window resize
        window.addEventListener('resize', this.handleResize.bind(this), false);
    }

    handleResize() {
        if (this.game && this.game.scene.isActive()) {
            // Get active scenes and trigger their resize handlers
            const scenes = this.game.scene.scenes;
            scenes.forEach(scene => {
                if (scene.scene.isActive() && scene.handleResize) {
                    scene.handleResize();
                }
            });
        }
    }
}

// Start the application
new CVGame();
