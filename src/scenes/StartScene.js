import Phaser from 'phaser';
import { GAME_CONSTANTS, DeviceUtils } from '../game/GameConfig.js';

export class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    create() {
        const { width, height } = this.scale;

        // Create background
        this.createBackground();

        // Create title
        this.createTitle();

        // Create start button
        this.createStartButton();

        // Create controls info
        this.createControlsInfo();

        // Handle responsive layout
        this.handleResize();

        // Resume audio context on interaction
        this.input.once('pointerdown', this.resumeAudioContext, this);
    }

    createBackground() {
        const { width, height } = this.scale;

        // Create starfield background
        this.createStarfield();

        // Add subtle gradient overlay
        const overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.3);
    }

    createStarfield() {
        const { width, height } = this.scale;

        // Create animated starfield
        for (let i = 0; i < 50; i++) {
            const x = Phaser.Math.Between(0, width);
            const y = Phaser.Math.Between(0, height);
            const star = this.add.circle(x, y, 1, 0xffffff, Phaser.Math.FloatBetween(0.3, 1));

            // Add subtle twinkle animation
            this.tweens.add({
                targets: star,
                alpha: Phaser.Math.FloatBetween(0.2, 0.8),
                duration: Phaser.Math.Between(1000, 3000),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }
    }

    createTitle() {
        const { width, height } = this.scale;

        // Main title
        this.titleText = this.add.text(width / 2, height / 3, 'NIHAD.DEV', {
            fontFamily: 'Courier New',
            fontSize: '48px',
            color: '#ffffff',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        // Subtitle
        this.subtitleText = this.add.text(width / 2, height / 3 + 60, 'Interactive CV Adventure', {
            fontFamily: 'Courier New',
            fontSize: '18px',
            color: '#ffff00',
            align: 'center'
        }).setOrigin(0.5);

        // Add title animation
        this.tweens.add({
            targets: this.titleText,
            scaleX: 1.05,
            scaleY: 1.05,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    createStartButton() {
        const { width, height } = this.scale;

        // Button background
        const buttonWidth = 200;
        const buttonHeight = 50;
        const buttonY = height * 0.6;

        this.startButton = this.add.container(width / 2, buttonY);

        // Button rectangle
        const buttonBg = this.add.rectangle(0, 0, buttonWidth, buttonHeight, 0x000000)
            .setStrokeStyle(2, 0xffffff);

        // Button text
        const buttonText = this.add.text(0, 0, 'START ADVENTURE', {
            fontFamily: 'Courier New',
            fontSize: '16px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        this.startButton.add([buttonBg, buttonText]);

        // Make button interactive
        this.startButton.setInteractive(
            new Phaser.Geom.Rectangle(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight),
            Phaser.Geom.Rectangle.Contains
        );

        // Button hover effects
        this.startButton.on('pointerover', () => {
            buttonBg.setFillStyle(0x333333);
            buttonText.setColor('#ffff00');
            this.startButton.setScale(1.05);
        });

        this.startButton.on('pointerout', () => {
            buttonBg.setFillStyle(0x000000);
            buttonText.setColor('#ffffff');
            this.startButton.setScale(1);
        });

        // Button click handler
        this.startButton.on('pointerdown', this.startGame, this);

        // Add pulsing animation
        this.tweens.add({
            targets: this.startButton,
            alpha: 0.8,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    createControlsInfo() {
        const { width, height } = this.scale;

        let controlText;
        if (DeviceUtils.isMobile()) {
            controlText = 'TAP TO MOVE • TAP OBJECTS TO INTERACT';
        } else {
            controlText = 'CLICK TO MOVE • CLICK OBJECTS TO INTERACT';
        }

        this.controlsText = this.add.text(width / 2, height * 0.8, controlText, {
            fontFamily: 'Courier New',
            fontSize: '12px',
            color: '#808080',
            align: 'center'
        }).setOrigin(0.5);
    }

    startGame() {
        // Play start sound effect (if available)
        // this.sound.play('sfx_start');

        // Fade out and start main game scene
        this.cameras.main.fadeOut(500, 0, 0, 0);

        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('GameScene');
        });
    }

    resumeAudioContext() {
        // Resume Web Audio Context if suspended
        if (this.sound.context && this.sound.context.state === 'suspended') {
            this.sound.context.resume();
        }
    }

    handleResize() {
        // This will be called when screen resizes
        const { width, height } = this.scale;

        if (this.titleText) {
            this.titleText.setPosition(width / 2, height / 3);
        }

        if (this.subtitleText) {
            this.subtitleText.setPosition(width / 2, height / 3 + 60);
        }

        if (this.startButton) {
            this.startButton.setPosition(width / 2, height * 0.6);
        }

        if (this.controlsText) {
            this.controlsText.setPosition(width / 2, height * 0.8);
        }

        // Update responsive font sizes
        if (DeviceUtils.isMobile()) {
            this.titleText?.setFontSize('32px');
            this.subtitleText?.setFontSize('14px');
            this.controlsText?.setFontSize('10px');
        } else {
            this.titleText?.setFontSize('48px');
            this.subtitleText?.setFontSize('18px');
            this.controlsText?.setFontSize('12px');
        }
    }
}
