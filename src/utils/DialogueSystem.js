import { GAME_CONSTANTS } from '../game/GameConfig.js';

export class DialogueSystem {
    constructor(scene) {
        this.scene = scene;
        this.isActive = false;
        this.currentDialogue = null;
        this.textBuffer = '';
        this.displayedText = '';
        this.textIndex = 0;
        this.typewriterTimer = null;
        this.skipEnabled = true;

        this.createDialogueUI();
    }

    createDialogueUI() {
        const { width, height } = this.scene.scale;

        // Create dialogue container
        this.dialogueContainer = this.scene.add.container(0, height);
        this.dialogueContainer.setDepth(1000);

        // Dialogue box background
        const dialogueHeight = GAME_CONSTANTS.DIALOGUE_HEIGHT;
        this.dialogueBg = this.scene.add.rectangle(
            width / 2,
            -dialogueHeight / 2,
            width - 20,
            dialogueHeight,
            GAME_CONSTANTS.COLORS.DIALOGUE_BG
        ).setStrokeStyle(2, GAME_CONSTANTS.COLORS.DIALOGUE_BORDER);

        // Character name container
        this.nameContainer = this.scene.add.container(30, -dialogueHeight + 15);
        this.nameBg = this.scene.add.rectangle(0, 0, 120, 25, GAME_CONSTANTS.COLORS.DIALOGUE_BG)
            .setStrokeStyle(1, GAME_CONSTANTS.COLORS.DIALOGUE_BORDER);
        this.nameText = this.scene.add.text(0, 0, '', {
            fontFamily: 'Courier New',
            fontSize: '14px',
            color: '#ffff00',
            align: 'center'
        }).setOrigin(0.5);

        this.nameContainer.add([this.nameBg, this.nameText]);

        // Main dialogue text
        this.dialogueText = this.scene.add.text(
            GAME_CONSTANTS.DIALOGUE_PADDING,
            -dialogueHeight + 40,
            '',
            {
                fontFamily: 'Courier New',
                fontSize: '14px',
                color: '#ffffff',
                align: 'left',
                wordWrap: {
                    width: width - 60,
                    useAdvancedWrap: true
                },
                lineSpacing: 4
            }
        );

        // Continue indicator
        this.continueIndicator = this.scene.add.text(
            width - 40,
            -20,
            '▼',
            {
                fontFamily: 'Courier New',
                fontSize: '12px',
                color: '#ffffff',
                align: 'center'
            }
        ).setOrigin(0.5).setVisible(false);

        // Add pulsing animation to continue indicator
        this.scene.tweens.add({
            targets: this.continueIndicator,
            alpha: 0.3,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Add all elements to container
        this.dialogueContainer.add([
            this.dialogueBg,
            this.nameContainer,
            this.dialogueText,
            this.continueIndicator
        ]);

        // Hide initially
        this.dialogueContainer.setAlpha(0);
    }

    showDialogue(dialogueData) {
        if (this.isActive) return;

        this.isActive = true;
        this.currentDialogue = dialogueData;
        this.textBuffer = dialogueData.text || '';
        this.displayedText = '';
        this.textIndex = 0;

        // Set character name
        if (dialogueData.character) {
            this.nameText.setText(dialogueData.character.toUpperCase());
            this.nameContainer.setVisible(true);
        } else {
            this.nameContainer.setVisible(false);
        }

        // Show dialogue box with animation
        this.scene.tweens.add({
            targets: this.dialogueContainer,
            alpha: 1,
            y: this.scene.scale.height - GAME_CONSTANTS.DIALOGUE_HEIGHT,
            duration: 300,
            ease: 'Power2',
            onComplete: () => {
                this.startTypewriter();
            }
        });

        // Set up input handling
        this.setupDialogueInput();
    }

    hideDialogue() {
        if (!this.isActive) return;

        this.stopTypewriter();

        // Hide dialogue box with animation
        this.scene.tweens.add({
            targets: this.dialogueContainer,
            alpha: 0,
            y: this.scene.scale.height,
            duration: 300,
            ease: 'Power2',
            onComplete: () => {
                this.isActive = false;
                this.continueIndicator.setVisible(false);
                if (this.currentDialogue.onComplete) {
                    this.currentDialogue.onComplete();
                }
            }
        });

        this.removeDialogueInput();
    }

    startTypewriter() {
        this.stopTypewriter();
        this.continueIndicator.setVisible(false);

        this.typewriterTimer = this.scene.time.addEvent({
            delay: GAME_CONSTANTS.ANIMATIONS.TYPEWRITER_DELAY,
            callback: this.typeNextCharacter,
            callbackScope: this,
            repeat: this.textBuffer.length - 1
        });
    }

    typeNextCharacter() {
        if (this.textIndex < this.textBuffer.length) {
            this.displayedText += this.textBuffer[this.textIndex];
            this.dialogueText.setText(this.displayedText);
            this.textIndex++;

            // Play typing sound effect
            // this.scene.sound.play('sfx_dialogue');
        } else {
            this.stopTypewriter();
            this.continueIndicator.setVisible(true);
        }
    }

    stopTypewriter() {
        if (this.typewriterTimer) {
            this.typewriterTimer.remove();
            this.typewriterTimer = null;
        }
    }

    skipTypewriter() {
        if (this.typewriterTimer && this.skipEnabled) {
            this.stopTypewriter();
            this.displayedText = this.textBuffer;
            this.dialogueText.setText(this.displayedText);
            this.continueIndicator.setVisible(true);
        }
    }

    setupDialogueInput() {
        // Handle click/tap to continue or skip
        this.dialogueInputHandler = () => {
            if (this.typewriterTimer) {
                this.skipTypewriter();
            } else {
                this.hideDialogue();
            }
        };

        this.scene.input.on('pointerdown', this.dialogueInputHandler);

        // Handle keyboard input (Space or Enter to continue)
        this.keyboardHandler = (event) => {
            if (event.code === 'Space' || event.code === 'Enter') {
                this.dialogueInputHandler();
            }
        };

        this.scene.input.keyboard.on('keydown', this.keyboardHandler);
    }

    removeDialogueInput() {
        if (this.dialogueInputHandler) {
            this.scene.input.off('pointerdown', this.dialogueInputHandler);
            this.dialogueInputHandler = null;
        }

        if (this.keyboardHandler) {
            this.scene.input.keyboard.off('keydown', this.keyboardHandler);
            this.keyboardHandler = null;
        }
    }

    destroy() {
        this.stopTypewriter();
        this.removeDialogueInput();
        if (this.dialogueContainer) {
            this.dialogueContainer.destroy();
        }
    }
}
