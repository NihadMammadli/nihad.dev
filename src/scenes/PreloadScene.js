import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        // Update loading screen elements
        this.updateLoadingScreen();

        // Create loading UI
        this.createLoadingUI();

        // Load all game assets
        this.loadGameAssets();

        // Set up loading event listeners
        this.setupLoadingEvents();
    }

    create() {
        // Initialize audio context on user interaction
        this.initializeAudio();

        // Fade out loading screen and start the game
        this.fadeToStart();
    }

    updateLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const loadingText = document.getElementById('loading-text');
        const loadingProgress = document.getElementById('loading-progress');

        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }

        this.loadingElements = {
            screen: loadingScreen,
            text: loadingText,
            progress: loadingProgress
        };
    }

    createLoadingUI() {
        const { width, height } = this.scale;

        // Create in-game loading display
        this.loadingText = this.add.text(width / 2, height / 2 + 100, '', {
            fontFamily: 'Courier New',
            fontSize: '14px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
    }

    loadGameAssets() {
        // Placeholder assets - create simple colored rectangles for now
        this.createPlaceholderAssets();

        // Load audio files (we'll create simple ones or use placeholder silence)
        this.loadAudioAssets();

        // Load tilemap data
        this.loadMapAssets();
    }

    createPlaceholderAssets() {
        // Create placeholder graphics for sprites
        const graphics = this.add.graphics();

        // Player sprite (32x32 blue square)
        graphics.fillStyle(0x4080ff);
        graphics.fillRect(0, 0, 32, 32);
        graphics.generateTexture('player', 32, 32);

        // NPC sprite (32x32 green square)
        graphics.clear();
        graphics.fillStyle(0x40ff80);
        graphics.fillRect(0, 0, 32, 32);
        graphics.generateTexture('npc', 32, 32);

        // Tile sprites
        graphics.clear();
        graphics.fillStyle(0x404040);
        graphics.fillRect(0, 0, 32, 32);
        graphics.generateTexture('tile_floor', 32, 32);

        graphics.clear();
        graphics.fillStyle(0x808080);
        graphics.fillRect(0, 0, 32, 32);
        graphics.generateTexture('tile_wall', 32, 32);

        // UI elements
        graphics.clear();
        graphics.fillStyle(0x000000);
        graphics.fillRect(0, 0, 1, 1);
        graphics.generateTexture('black_pixel', 1, 1);

        graphics.clear();
        graphics.fillStyle(0xffffff);
        graphics.fillRect(0, 0, 1, 1);
        graphics.generateTexture('white_pixel', 1, 1);

        graphics.destroy();
    }

    loadAudioAssets() {
        // For now, we'll create placeholder audio or silence
        // In production, you would load actual audio files like:
        // this.load.audio('bgm_main', ['assets/audio/bgm_main.ogg', 'assets/audio/bgm_main.mp3']);
        // this.load.audio('sfx_click', ['assets/audio/sfx_click.ogg', 'assets/audio/sfx_click.mp3']);
        // this.load.audio('sfx_dialogue', ['assets/audio/sfx_dialogue.ogg', 'assets/audio/sfx_dialogue.mp3']);
    }

    loadMapAssets() {
        // Create placeholder tilemap data using simple array format
        const mapData = this.createPlaceholderMap();
        this.cache.tilemap.add('main_map', { format: Phaser.Tilemaps.Formats.ARRAY_2D, data: mapData });
    }

    createPlaceholderMap() {
        // Create a simple 25x19 map with walls around the border
        const width = 25;
        const height = 19;
        const map = [];

        for (let y = 0; y < height; y++) {
            const row = [];
            for (let x = 0; x < width; x++) {
                if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
                    row.push(1); // Wall
                } else {
                    row.push(0); // Floor
                }
            }
            map.push(row);
        }

        // Return simple 2D array for ARRAY_2D format
        return map;
    }

    setupLoadingEvents() {
        this.load.on('progress', (progress) => {
            this.updateLoadingProgress(progress);
        });

        this.load.on('fileprogress', (file) => {
            this.updateLoadingText(`Loading ${file.key}...`);
        });

        this.load.on('complete', () => {
            this.updateLoadingText('Ready to start!');
        });
    }

    updateLoadingProgress(progress) {
        if (this.loadingElements.progress) {
            this.loadingElements.progress.style.width = `${progress * 100}%`;
        }
    }

    updateLoadingText(text) {
        if (this.loadingElements.text) {
            this.loadingElements.text.textContent = text;
        }
        if (this.loadingText) {
            this.loadingText.setText(text);
        }
    }

    initializeAudio() {
        // Initialize Web Audio Context
        if (this.sound.context && this.sound.context.state === 'suspended') {
            // Will be resumed on user interaction in StartScene
        }
    }

    fadeToStart() {
        // Fade out HTML loading screen
        const loadingScreen = this.loadingElements.screen;
        if (loadingScreen) {
            loadingScreen.style.transition = 'opacity 0.5s';
            loadingScreen.style.opacity = '0';

            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }

        // Start the start scene
        setTimeout(() => {
            this.scene.start('StartScene');
        }, 600);
    }
}
