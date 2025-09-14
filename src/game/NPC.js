import Phaser from 'phaser';

export class NPC extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, npcData) {
        super(scene, x, y, npcData.sprite || 'npc');

        this.scene = scene;
        this.npcData = npcData;
        this.setOrigin(0.5, 0.5);

        // Add to scene and physics
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Set physics properties
        this.body.setSize(24, 24);
        this.body.setImmovable(true);

        // Visual properties
        this.interactionRadius = 64;
        this.isHighlighted = false;

        // Create name label
        this.createNameLabel();

        // Create interaction indicator
        this.createInteractionIndicator();

        // Set up animations
        this.createAnimations();
        this.play('npc_idle');

        // Set up interaction detection
        this.setupInteractionDetection();
    }

    createNameLabel() {
        this.nameLabel = this.scene.add.text(this.x, this.y - 40, this.npcData.name, {
            fontFamily: 'Courier New',
            fontSize: '12px',
            color: '#ffff00',
            align: 'center',
            backgroundColor: '#000000',
            padding: { x: 4, y: 2 }
        }).setOrigin(0.5);

        this.nameLabel.setVisible(false);
    }

    createInteractionIndicator() {
        // Create floating exclamation mark or question mark
        const indicatorText = this.npcData.quest ? '!' : '?';

        this.interactionIndicator = this.scene.add.text(this.x, this.y - 20, indicatorText, {
            fontFamily: 'Courier New',
            fontSize: '16px',
            color: '#ffffff',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        this.interactionIndicator.setVisible(false);

        // Add floating animation
        this.scene.tweens.add({
            targets: this.interactionIndicator,
            y: this.y - 25,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    createAnimations() {
        // Create idle animation for NPC
        if (!this.scene.anims.exists('npc_idle')) {
            this.scene.anims.create({
                key: 'npc_idle',
                frames: [{ key: this.npcData.sprite || 'npc', frame: null }],
                frameRate: 1,
                repeat: -1
            });
        }

        // Create interaction animation
        if (!this.scene.anims.exists('npc_interact')) {
            this.scene.anims.create({
                key: 'npc_interact',
                frames: [{ key: this.npcData.sprite || 'npc', frame: null }],
                frameRate: 4,
                repeat: 2
            });
        }
    }

    setupInteractionDetection() {
        // This will be called from the GameScene to check distance
        this.interactionZone = this.scene.add.zone(this.x, this.y, this.interactionRadius * 2, this.interactionRadius * 2);
        this.interactionZone.setVisible(false); // For debugging, you can make this visible
    }

    update() {
        if (!this.scene.player) return;

        // Check distance to player
        const distance = Phaser.Math.Distance.Between(
            this.x, this.y,
            this.scene.player.x, this.scene.player.y
        );

        const isInRange = distance <= this.interactionRadius;

        // Show/hide interaction elements based on distance
        if (isInRange && !this.isHighlighted) {
            this.showInteractionUI();
        } else if (!isInRange && this.isHighlighted) {
            this.hideInteractionUI();
        }
    }

    showInteractionUI() {
        this.isHighlighted = true;

        // Show name label and interaction indicator
        this.nameLabel.setVisible(true);
        this.interactionIndicator.setVisible(true);

        // Add glow effect to the NPC
        this.setTint(0xaaffaa);

        // Scale up slightly
        this.scene.tweens.add({
            targets: this,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 200,
            ease: 'Power2'
        });
    }

    hideInteractionUI() {
        this.isHighlighted = false;

        // Hide name label and interaction indicator
        this.nameLabel.setVisible(false);
        this.interactionIndicator.setVisible(false);

        // Remove glow effect
        this.clearTint();

        // Scale back to normal
        this.scene.tweens.add({
            targets: this,
            scaleX: 1,
            scaleY: 1,
            duration: 200,
            ease: 'Power2'
        });
    }

    interact() {
        // Play interaction animation
        this.play('npc_interact');

        // Add bounce effect
        this.scene.tweens.add({
            targets: this,
            y: this.y - 10,
            duration: 150,
            yoyo: true,
            ease: 'Power2'
        });

        // Play interaction sound
        // this.scene.sound.play('sfx_interact');

        return this.npcData;
    }

    // Method to check if this NPC has been interacted with
    hasBeenTalkedTo() {
        return this.scene.gameState.completedQuests.includes(this.npcData.quest);
    }

    // Method to check if the player has collected this NPC's skill
    hasGivenSkill() {
        return this.scene.gameState.collectedSkills.includes(this.npcData.skill);
    }

    // Update the interaction indicator based on quest/skill status
    updateIndicator() {
        if (this.hasBeenTalkedTo() && this.hasGivenSkill()) {
            // Change indicator to show completion
            this.interactionIndicator.setText('✓');
            this.interactionIndicator.setColor('#00ff00');
        } else if (this.hasBeenTalkedTo()) {
            // Change to different indicator after first interaction
            this.interactionIndicator.setText('...');
            this.interactionIndicator.setColor('#888888');
        }
    }

    // Get the area this NPC represents
    getArea() {
        return this.npcData.area || 'general';
    }

    // Check if player can interact (not moving, in range)
    canInteract(player) {
        if (player.isMoving) return false;

        const distance = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);
        return distance <= this.interactionRadius;
    }

    destroy() {
        // Clean up created elements
        if (this.nameLabel) this.nameLabel.destroy();
        if (this.interactionIndicator) this.interactionIndicator.destroy();
        if (this.interactionZone) this.interactionZone.destroy();

        super.destroy();
    }
}
