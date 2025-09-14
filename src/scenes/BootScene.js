import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Create simple loading graphics
        this.createLoadingGraphics();

        // Load critical assets needed for the preload scene
        this.loadCriticalAssets();
    }

    create() {
        // Start the preload scene
        this.scene.start('PreloadScene');
    }

    createLoadingGraphics() {
        const { width, height } = this.scale;

        // Create loading text
        this.add.text(width / 2, height / 2 - 50, 'BOOTING CV ADVENTURE...', {
            fontFamily: 'Courier New',
            fontSize: '16px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        // Create loading bar frame
        const barWidth = 200;
        const barHeight = 20;
        const barX = (width - barWidth) / 2;
        const barY = height / 2;

        this.add.rectangle(barX, barY, barWidth, barHeight, 0x333333)
            .setOrigin(0, 0.5);

        this.add.rectangle(barX, barY, barWidth, barHeight, null)
            .setStrokeStyle(2, 0xffffff)
            .setOrigin(0, 0.5);

        // Progress bar
        this.progressBar = this.add.rectangle(barX + 2, barY, 0, barHeight - 4, 0xffffff)
            .setOrigin(0, 0.5);

        // Listen for loading events
        this.load.on('progress', this.updateProgress, this);
    }

    loadCriticalAssets() {
        // For now, just create placeholder rectangles that will be replaced with actual assets
        this.load.image('pixel', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');
    }

    updateProgress(progress) {
        const barWidth = 196; // 200 - 4 (padding)
        this.progressBar.width = barWidth * progress;
    }
}
