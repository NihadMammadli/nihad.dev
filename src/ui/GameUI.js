import { GAME_CONSTANTS, DeviceUtils } from '../game/GameConfig.js';
import { CVData } from '../data/CVData.js';

export class GameUI {
    constructor(scene) {
        this.scene = scene;
        this.isInventoryOpen = false;
        this.isQuestLogOpen = false;
    }

    create() {
        const { width, height } = this.scene.scale;

        // Create UI container
        this.uiContainer = this.scene.add.container(0, 0);
        this.uiContainer.setDepth(500);

        // Create mobile controls if on mobile
        if (DeviceUtils.isMobile()) {
            this.createMobileControls();
        }

        // Create desktop UI
        this.createDesktopUI();

        // Create inventory panel (hidden initially)
        this.createInventoryPanel();

        // Create quest log panel (hidden initially)  
        this.createQuestLogPanel();

        // Create notification system
        this.createNotificationSystem();

        // Create help overlay
        this.createHelpOverlay();
    }

    createMobileControls() {
        const { width, height } = this.scene.scale;

        // Create mobile button container
        this.mobileControls = this.scene.add.container(0, 0);
        this.mobileControls.setDepth(600);

        // Inventory button
        const invButton = this.createButton(width - 60, height - 120, 50, 50, 'INV', () => {
            this.toggleInventory();
        });

        // Quest log button
        const questButton = this.createButton(width - 60, height - 60, 50, 50, 'LOG', () => {
            this.toggleQuestLog();
        });

        this.mobileControls.add([invButton, questButton]);
        this.uiContainer.add(this.mobileControls);
    }

    createDesktopUI() {
        const { width, height } = this.scene.scale;

        // Create desktop UI elements
        this.desktopUI = this.scene.add.container(0, 0);

        // Instructions text
        const instructionText = DeviceUtils.isMobile() ?
            'TAP NPCs TO INTERACT' :
            'CLICK NPCs TO INTERACT • I: INVENTORY • Q: QUEST LOG';

        this.instructionLabel = this.scene.add.text(10, height - 25, instructionText, {
            fontFamily: 'Courier New',
            fontSize: '10px',
            color: '#888888'
        });

        this.desktopUI.add(this.instructionLabel);
        this.uiContainer.add(this.desktopUI);
    }

    createButton(x, y, width, height, text, callback) {
        const button = this.scene.add.container(x, y);

        // Button background
        const bg = this.scene.add.rectangle(0, 0, width, height, 0x333333)
            .setStrokeStyle(1, 0xffffff);

        // Button text
        const label = this.scene.add.text(0, 0, text, {
            fontFamily: 'Courier New',
            fontSize: '12px',
            color: '#ffffff'
        }).setOrigin(0.5);

        button.add([bg, label]);

        // Make interactive
        button.setInteractive(
            new Phaser.Geom.Rectangle(-width / 2, -height / 2, width, height),
            Phaser.Geom.Rectangle.Contains
        );

        // Add hover effects
        button.on('pointerover', () => {
            bg.setFillStyle(0x555555);
        });

        button.on('pointerout', () => {
            bg.setFillStyle(0x333333);
        });

        button.on('pointerdown', callback);

        return button;
    }

    createInventoryPanel() {
        const { width, height } = this.scene.scale;

        this.inventoryPanel = this.scene.add.container(width / 2, height / 2);
        this.inventoryPanel.setDepth(800);
        this.inventoryPanel.setVisible(false);

        // Panel background
        const panelWidth = Math.min(400, width - 40);
        const panelHeight = Math.min(300, height - 40);

        const bg = this.scene.add.rectangle(0, 0, panelWidth, panelHeight, 0x000000, 0.9)
            .setStrokeStyle(2, 0xffffff);

        // Title
        const title = this.scene.add.text(0, -panelHeight / 2 + 30, 'COLLECTED SKILLS', {
            fontFamily: 'Courier New',
            fontSize: '16px',
            color: '#ffff00'
        }).setOrigin(0.5);

        // Close button
        const closeBtn = this.createButton(panelWidth / 2 - 25, -panelHeight / 2 + 15, 20, 20, 'X', () => {
            this.toggleInventory();
        });

        // Skills list container
        this.skillsList = this.scene.add.container(0, -50);

        this.inventoryPanel.add([bg, title, closeBtn, this.skillsList]);
        this.uiContainer.add(this.inventoryPanel);
    }

    createQuestLogPanel() {
        const { width, height } = this.scene.scale;

        this.questLogPanel = this.scene.add.container(width / 2, height / 2);
        this.questLogPanel.setDepth(800);
        this.questLogPanel.setVisible(false);

        // Panel background
        const panelWidth = Math.min(450, width - 40);
        const panelHeight = Math.min(350, height - 40);

        const bg = this.scene.add.rectangle(0, 0, panelWidth, panelHeight, 0x000000, 0.9)
            .setStrokeStyle(2, 0xffffff);

        // Title
        const title = this.scene.add.text(0, -panelHeight / 2 + 30, 'QUEST LOG', {
            fontFamily: 'Courier New',
            fontSize: '16px',
            color: '#ffff00'
        }).setOrigin(0.5);

        // Close button
        const closeBtn = this.createButton(panelWidth / 2 - 25, -panelHeight / 2 + 15, 20, 20, 'X', () => {
            this.toggleQuestLog();
        });

        // Quests list container
        this.questsList = this.scene.add.container(0, -50);

        this.questLogPanel.add([bg, title, closeBtn, this.questsList]);
        this.uiContainer.add(this.questLogPanel);
    }

    createNotificationSystem() {
        this.notifications = this.scene.add.container(0, 100);
        this.notifications.setDepth(900);
        this.uiContainer.add(this.notifications);
    }

    createHelpOverlay() {
        // Create help text for first-time players
        const { width, height } = this.scene.scale;

        this.helpOverlay = this.scene.add.container(width / 2, height / 2);
        this.helpOverlay.setDepth(1000);

        const helpBg = this.scene.add.rectangle(0, 0, width - 40, height - 40, 0x000000, 0.8)
            .setStrokeStyle(2, 0xffffff);

        const helpText = `WELCOME TO NIHAD'S INTERACTIVE CV!

${DeviceUtils.isMobile() ? 'TAP' : 'CLICK'} to move your character around the world.
${DeviceUtils.isMobile() ? 'TAP' : 'CLICK'} on NPCs (green characters) to learn about my experience.

Each NPC represents a different aspect of my professional journey:
• Career Guide - Work Experience
• Tech Mentor - Technical Skills  
• Project Showcase - Portfolio Projects
• Networking Hub - Contact Information
• Achievement Keeper - Key Accomplishments

Collect skills and complete quests to unlock the full CV experience!

${DeviceUtils.isMobile() ? 'TAP ANYWHERE TO START' : 'CLICK ANYWHERE TO START'}`;

        const helpLabel = this.scene.add.text(0, 0, helpText, {
            fontFamily: 'Courier New',
            fontSize: '14px',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: width - 80, useAdvancedWrap: true }
        }).setOrigin(0.5);

        this.helpOverlay.add([helpBg, helpLabel]);
        this.uiContainer.add(this.helpOverlay);

        // Hide help overlay on first interaction
        this.scene.input.once('pointerdown', () => {
            this.hideHelpOverlay();
        });
    }

    hideHelpOverlay() {
        this.scene.tweens.add({
            targets: this.helpOverlay,
            alpha: 0,
            duration: 500,
            onComplete: () => {
                this.helpOverlay.setVisible(false);
            }
        });
    }

    toggleInventory() {
        this.isInventoryOpen = !this.isInventoryOpen;

        if (this.isInventoryOpen) {
            this.updateInventoryContent();
            this.inventoryPanel.setVisible(true);

            // Fade in animation
            this.inventoryPanel.setAlpha(0);
            this.scene.tweens.add({
                targets: this.inventoryPanel,
                alpha: 1,
                duration: 300
            });
        } else {
            // Fade out animation
            this.scene.tweens.add({
                targets: this.inventoryPanel,
                alpha: 0,
                duration: 300,
                onComplete: () => {
                    this.inventoryPanel.setVisible(false);
                }
            });
        }
    }

    toggleQuestLog() {
        this.isQuestLogOpen = !this.isQuestLogOpen;

        if (this.isQuestLogOpen) {
            this.updateQuestLogContent();
            this.questLogPanel.setVisible(true);

            // Fade in animation
            this.questLogPanel.setAlpha(0);
            this.scene.tweens.add({
                targets: this.questLogPanel,
                alpha: 1,
                duration: 300
            });
        } else {
            // Fade out animation
            this.scene.tweens.add({
                targets: this.questLogPanel,
                alpha: 0,
                duration: 300,
                onComplete: () => {
                    this.questLogPanel.setVisible(false);
                }
            });
        }
    }

    updateInventoryContent() {
        // Clear existing content
        this.skillsList.removeAll(true);

        const collectedSkills = this.scene.gameState.collectedSkills;

        if (collectedSkills.length === 0) {
            const emptyText = this.scene.add.text(0, 0, 'No skills collected yet.\nTalk to NPCs to learn more!', {
                fontFamily: 'Courier New',
                fontSize: '12px',
                color: '#888888',
                align: 'center'
            }).setOrigin(0.5);

            this.skillsList.add(emptyText);
            return;
        }

        collectedSkills.forEach((skillName, index) => {
            const skillData = CVData.getSkill(skillName) || { name: skillName, description: 'Professional skill acquired' };

            const skillText = this.scene.add.text(0, index * 30, `• ${skillData.name}`, {
                fontFamily: 'Courier New',
                fontSize: '12px',
                color: '#00ff00'
            }).setOrigin(0.5, 0);

            this.skillsList.add(skillText);
        });
    }

    updateQuestLogContent() {
        // Clear existing content
        this.questsList.removeAll(true);

        const quests = CVData.getQuests();
        const completedQuests = this.scene.gameState.completedQuests;

        quests.forEach((quest, index) => {
            const isCompleted = quest.requirements.every(req => completedQuests.includes(req));
            const color = isCompleted ? '#00ff00' : '#ffffff';
            const status = isCompleted ? '[COMPLETED]' : '[IN PROGRESS]';

            const questText = this.scene.add.text(0, index * 60, `${quest.title} ${status}\n${quest.description}`, {
                fontFamily: 'Courier New',
                fontSize: '10px',
                color: color,
                wordWrap: { width: 380, useAdvancedWrap: true }
            }).setOrigin(0.5, 0);

            this.questsList.add(questText);
        });
    }

    showSkillCollected(skill) {
        this.showNotification(`Skill Acquired: ${skill}!`, '#00ff00');
    }

    showQuestCompleted(quest) {
        this.showNotification(`Quest Completed: ${quest}!`, '#ffff00');
    }

    showNotification(text, color = '#ffffff') {
        const { width } = this.scene.scale;

        const notification = this.scene.add.text(width / 2, 50, text, {
            fontFamily: 'Courier New',
            fontSize: '14px',
            color: color,
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);

        this.notifications.add(notification);

        // Animate in
        notification.setAlpha(0);
        this.scene.tweens.add({
            targets: notification,
            alpha: 1,
            y: notification.y + 20,
            duration: 500,
            ease: 'Power2'
        });

        // Auto remove after delay
        this.scene.time.delayedCall(3000, () => {
            this.scene.tweens.add({
                targets: notification,
                alpha: 0,
                y: notification.y - 20,
                duration: 500,
                ease: 'Power2',
                onComplete: () => {
                    notification.destroy();
                }
            });
        });
    }

    handleResize() {
        const { width, height } = this.scene.scale;

        // Update mobile controls position
        if (this.mobileControls) {
            this.mobileControls.list.forEach((button, index) => {
                button.setPosition(width - 60, height - 120 + (index * 60));
            });
        }

        // Update instruction label
        if (this.instructionLabel) {
            this.instructionLabel.setPosition(10, height - 25);
        }

        // Update panels
        if (this.inventoryPanel) {
            this.inventoryPanel.setPosition(width / 2, height / 2);
        }

        if (this.questLogPanel) {
            this.questLogPanel.setPosition(width / 2, height / 2);
        }
    }
}
