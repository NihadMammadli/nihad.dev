import Phaser from 'phaser';
import { GAME_CONSTANTS, DeviceUtils } from '../game/GameConfig.js';
import { Player } from '../game/Player.js';
import { DialogueSystem } from '../utils/DialogueSystem.js';
import { PathfindingSystem } from '../utils/PathfindingSystem.js';
import { CVData } from '../data/CVData.js';
import { NPC } from '../game/NPC.js';
import { GameUI } from '../ui/GameUI.js';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        const { width, height } = this.scale;

        // Fade in from black
        this.cameras.main.fadeIn(500, 0, 0, 0);

        // Initialize game systems
        this.initializeWorld();
        this.createPlayer();
        this.createNPCs();
        this.setupSystems();
        this.setupInput();
        this.createUI();

        // Start background music
        this.startBackgroundMusic();
    }

    initializeWorld() {
        // Create tilemap from cached data with explicit dimensions
        this.map = this.make.tilemap({
            key: 'main_map',
            tileWidth: 32,
            tileHeight: 32,
            width: 25,
            height: 19
        });

        // Add tilesets for floor (index 0) and wall (index 1)
        const tileset = this.map.addTilesetImage('tiles', 'tile_floor', 32, 32);

        // Create layers - for ARRAY_2D format, the layer is created from the data directly
        this.groundLayer = this.map.createLayer(0, tileset, 0, 0);

        // Set up world bounds
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        // Set up camera bounds
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        // Create collision layer (walls)
        this.createCollisionLayer();
    }

    createCollisionLayer() {
        // Create collision bodies for walls
        this.collisionLayer = this.physics.add.staticGroup();

        for (let y = 0; y < this.map.height; y++) {
            for (let x = 0; x < this.map.width; x++) {
                const tile = this.groundLayer.getTileAt(x, y);
                if (tile && tile.index === 1) { // Wall tile
                    // Create collision rectangle
                    const wallSprite = this.add.rectangle(
                        x * 32 + 16,
                        y * 32 + 16,
                        32,
                        32,
                        0x808080
                    );
                    this.physics.add.existing(wallSprite, true);
                    this.collisionLayer.add(wallSprite);
                }
            }
        }
    }

    createPlayer() {
        // Find a good starting position (first walkable tile)
        let startX = 64, startY = 64;

        for (let y = 1; y < this.map.height - 1; y++) {
            for (let x = 1; x < this.map.width - 1; x++) {
                const tile = this.groundLayer.getTileAt(x, y);
                if (!tile || tile.index === 0) {
                    startX = x * 32 + 16;
                    startY = y * 32 + 16;
                    break;
                }
            }
            if (startX !== 64) break;
        }

        this.player = new Player(this, startX, startY);

        // Set up camera to follow player
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

        // Set up collision between player and walls
        this.physics.add.collider(this.player, this.collisionLayer);
    }

    createNPCs() {
        this.npcs = this.physics.add.group();

        // Create NPCs based on CV data
        const npcData = CVData.getNPCs();

        npcData.forEach((npcInfo, index) => {
            // Find a suitable position for each NPC
            const position = this.findNPCPosition(index);
            const npc = new NPC(this, position.x, position.y, npcInfo);
            this.npcs.add(npc);
        });

        // Set up collision between NPCs and walls
        this.physics.add.collider(this.npcs, this.collisionLayer);
    }

    findNPCPosition(index) {
        // Distribute NPCs around the map
        const positions = [
            { x: 5 * 32 + 16, y: 5 * 32 + 16 },   // Top-left area
            { x: 15 * 32 + 16, y: 8 * 32 + 16 },  // Center-right
            { x: 8 * 32 + 16, y: 12 * 32 + 16 },  // Bottom-center
            { x: 18 * 32 + 16, y: 15 * 32 + 16 }, // Bottom-right
            { x: 3 * 32 + 16, y: 15 * 32 + 16 }   // Bottom-left
        ];

        return positions[index % positions.length];
    }

    setupSystems() {
        // Initialize pathfinding
        this.pathfinding = new PathfindingSystem(this);
        this.pathfinding.setGrid(this.map, this.groundLayer);

        // Initialize dialogue system
        this.dialogueSystem = new DialogueSystem(this);

        // Initialize game state
        this.gameState = {
            collectedSkills: [],
            completedQuests: [],
            currentArea: 'main'
        };
    }

    setupInput() {
        // Handle click/tap for movement
        this.input.on('pointerdown', this.handlePointerDown, this);

        // Handle keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys('W,S,A,D');

        // Add keyboard shortcuts
        this.input.keyboard.on('keydown-ESC', this.toggleMenu, this);
        this.input.keyboard.on('keydown-I', this.toggleInventory, this);
        this.input.keyboard.on('keydown-Q', this.toggleQuestLog, this);
        this.input.keyboard.on('keydown-H', this.toggleHelp, this);
    }

    createUI() {
        this.gameUI = new GameUI(this);
        this.gameUI.create();
    }

    startBackgroundMusic() {
        // In a real implementation, you'd load and play background music
        // this.bgm = this.sound.add('bgm_main', { loop: true, volume: 0.5 });
        // this.bgm.play();
    }

    handlePointerDown(pointer) {
        // Don't move if dialogue is active
        if (this.dialogueSystem.isActive) {
            return;
        }

        // Check if clicking on an interactive object first
        const interactable = this.getInteractableAtPosition(pointer.worldX, pointer.worldY);
        if (interactable) {
            this.interactWith(interactable);
            return;
        }

        // Otherwise, move player to clicked position
        this.player.moveTo(pointer.worldX, pointer.worldY, this.pathfinding);
    }

    getInteractableAtPosition(worldX, worldY) {
        // Check NPCs
        for (const npc of this.npcs.children.entries) {
            const distance = Phaser.Math.Distance.Between(worldX, worldY, npc.x, npc.y);
            if (distance < 32) {
                return npc;
            }
        }
        return null;
    }

    interactWith(target) {
        // Check if player is close enough to interact
        if (!this.player.canInteract(target)) {
            // Move player closer, then interact
            this.player.moveTo(target.x, target.y, this.pathfinding);

            // Set up a timer to check when player arrives
            this.time.delayedCall(500, () => {
                if (this.player.canInteract(target)) {
                    this.performInteraction(target);
                }
            });
            return;
        }

        this.performInteraction(target);
    }

    performInteraction(target) {
        if (target instanceof NPC) {
            this.dialogueSystem.showDialogue({
                character: target.npcData.name,
                text: target.npcData.dialogue,
                onComplete: () => {
                    // Handle post-dialogue actions
                    if (target.npcData.skill) {
                        this.collectSkill(target.npcData.skill);
                    }
                    if (target.npcData.quest) {
                        this.completeQuest(target.npcData.quest);
                    }

                    // Update NPC indicator
                    target.updateIndicator();
                }
            });
        }
    }

    collectSkill(skill) {
        if (!this.gameState.collectedSkills.includes(skill)) {
            this.gameState.collectedSkills.push(skill);
            this.gameUI.showSkillCollected(skill);
            console.log(`Collected skill: ${skill}`);
        }
    }

    completeQuest(quest) {
        if (!this.gameState.completedQuests.includes(quest)) {
            this.gameState.completedQuests.push(quest);
            this.gameUI.showQuestCompleted(quest);
            console.log(`Completed quest: ${quest}`);
        }
    }

    toggleMenu() {
        this.gameUI.toggleInventory();
    }

    toggleInventory() {
        this.gameUI.toggleInventory();
    }

    toggleQuestLog() {
        this.gameUI.toggleQuestLog();
    }

    toggleHelp() {
        // Show help overlay again
        if (this.gameUI.helpOverlay) {
            this.gameUI.helpOverlay.setVisible(true);
            this.gameUI.helpOverlay.setAlpha(1);
        }
    }

    update() {
        // Update player
        this.player.update();

        // Update NPCs
        this.npcs.children.entries.forEach(npc => {
            if (npc.update) {
                npc.update();
            }
        });

        // Update keyboard movement (optional, since we have click-to-move)
        this.handleKeyboardInput();
    }

    handleKeyboardInput() {
        // Allow WASD/Arrow key movement when not in dialogue
        if (this.dialogueSystem.isActive) {
            return;
        }

        const speed = GAME_CONSTANTS.PLAYER_SPEED;
        let moving = false;

        if (this.cursors.left.isDown || this.wasd.A.isDown) {
            this.player.body.setVelocityX(-speed);
            this.player.stopMovement(); // Cancel click movement
            moving = true;
        } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
            this.player.body.setVelocityX(speed);
            this.player.stopMovement();
            moving = true;
        }

        if (this.cursors.up.isDown || this.wasd.W.isDown) {
            this.player.body.setVelocityY(-speed);
            this.player.stopMovement();
            moving = true;
        } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
            this.player.body.setVelocityY(speed);
            this.player.stopMovement();
            moving = true;
        }

        // If no keys pressed, stop keyboard movement
        if (!moving && !this.player.isMoving) {
            this.player.body.setVelocity(0, 0);
            this.player.playIdleAnimation();
        }
    }

    handleResize() {
        // Handle screen resize
        if (this.gameUI) {
            this.gameUI.handleResize();
        }

        if (this.dialogueSystem) {
            // Recreate dialogue UI with new dimensions
            this.dialogueSystem.destroy();
            this.dialogueSystem = new DialogueSystem(this);
        }
    }
}