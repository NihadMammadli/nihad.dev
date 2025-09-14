export const GameConfig = {
    type: Phaser.AUTO,
    parent: 'game-container',
    backgroundColor: '#000000',

    // Responsive canvas configuration
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
        min: {
            width: 320,
            height: 240
        },
        max: {
            width: 1920,
            height: 1440
        }
    },

    // Physics configuration
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },

    // Rendering configuration
    render: {
        pixelArt: true,
        antialias: false,
        powerPreference: 'high-performance'
    },

    // Audio configuration
    audio: {
        disableWebAudio: false,
        context: false
    },

    // Input configuration
    input: {
        activePointers: 3, // Support multi-touch
        smoothFactor: 0.3
    },

    // Game data
    gameData: {
        version: '1.0.0',
        title: 'Nihad.dev CV Adventure'
    }
};

// Game constants
export const GAME_CONSTANTS = {
    // World settings
    TILE_SIZE: 32,
    WORLD_WIDTH: 25,
    WORLD_HEIGHT: 19,

    // Player settings
    PLAYER_SPEED: 150,
    PLAYER_SIZE: 32,

    // UI settings
    DIALOGUE_HEIGHT: 120,
    DIALOGUE_PADDING: 16,
    TEXT_SPEED: 30, // Characters per second

    // Mobile settings
    MOBILE_BREAKPOINT: 768,
    TOUCH_THRESHOLD: 10,

    // Colors (Undertale-inspired palette)
    COLORS: {
        WHITE: 0xffffff,
        BLACK: 0x000000,
        YELLOW: 0xffff00,
        BLUE: 0x0080ff,
        RED: 0xff0000,
        GREEN: 0x00ff00,
        PURPLE: 0x800080,
        DARK_BLUE: 0x000080,
        DIALOGUE_BG: 0x000000,
        DIALOGUE_BORDER: 0xffffff,
        UI_BG: 0x202020,
        UI_BORDER: 0x808080
    },

    // Audio settings
    AUDIO: {
        MASTER_VOLUME: 0.7,
        BGM_VOLUME: 0.5,
        SFX_VOLUME: 0.8
    },

    // Animation settings
    ANIMATIONS: {
        TYPEWRITER_DELAY: 33, // ~30fps
        FADE_DURATION: 500,
        MOVE_DURATION: 300
    }
};

// Device detection utilities
export const DeviceUtils = {
    isMobile() {
        return window.innerWidth <= GAME_CONSTANTS.MOBILE_BREAKPOINT ||
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    isTouch() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    },

    getScreenRatio() {
        return window.innerWidth / window.innerHeight;
    }
};
