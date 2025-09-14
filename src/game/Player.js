import { GAME_CONSTANTS } from './GameConfig.js';

export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        this.scene = scene;
        this.setOrigin(0.5, 0.5);

        // Add to scene and physics
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Set physics properties
        this.body.setSize(24, 24); // Slightly smaller than sprite for better collision
        this.body.setCollideWorldBounds(true);

        // Movement properties
        this.moveSpeed = GAME_CONSTANTS.PLAYER_SPEED;
        this.isMoving = false;
        this.targetPath = [];
        this.currentTarget = null;
        this.pathIndex = 0;
        this.moveThreshold = 4; // Pixels to consider "arrived" at target

        // Animation properties
        this.facing = 'down';

        // Create animations
        this.createAnimations();

        // Set initial animation
        this.play('idle_down');
    }

    createAnimations() {
        // Since we're using placeholder sprites, we'll create simple animations
        // In a real game, you'd have sprite sheets with multiple frames

        if (!this.scene.anims.exists('idle_down')) {
            this.scene.anims.create({
                key: 'idle_down',
                frames: [{ key: 'player', frame: null }],
                frameRate: 1,
                repeat: -1
            });
        }

        if (!this.scene.anims.exists('walk_down')) {
            this.scene.anims.create({
                key: 'walk_down',
                frames: [{ key: 'player', frame: null }],
                frameRate: 8,
                repeat: -1
            });
        }

        if (!this.scene.anims.exists('walk_up')) {
            this.scene.anims.create({
                key: 'walk_up',
                frames: [{ key: 'player', frame: null }],
                frameRate: 8,
                repeat: -1
            });
        }

        if (!this.scene.anims.exists('walk_left')) {
            this.scene.anims.create({
                key: 'walk_left',
                frames: [{ key: 'player', frame: null }],
                frameRate: 8,
                repeat: -1
            });
        }

        if (!this.scene.anims.exists('walk_right')) {
            this.scene.anims.create({
                key: 'walk_right',
                frames: [{ key: 'player', frame: null }],
                frameRate: 8,
                repeat: -1
            });
        }
    }

    moveTo(targetX, targetY, pathfinding) {
        if (!pathfinding) return;

        // Find path to target
        const path = pathfinding.findPath(this.x, this.y, targetX, targetY);

        if (path.length === 0) {
            return; // No valid path
        }

        // Set up movement
        this.targetPath = path;
        this.pathIndex = 0;
        this.isMoving = true;
        this.setCurrentTarget();
    }

    setCurrentTarget() {
        if (this.pathIndex < this.targetPath.length) {
            this.currentTarget = this.targetPath[this.pathIndex];
            this.updateFacing();
            this.playWalkAnimation();
        } else {
            this.stopMovement();
        }
    }

    update() {
        if (!this.isMoving || !this.currentTarget) {
            return;
        }

        // Calculate distance to current target
        const dx = this.currentTarget.x - this.x;
        const dy = this.currentTarget.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Check if we've arrived at current target
        if (distance <= this.moveThreshold) {
            this.pathIndex++;
            this.setCurrentTarget();
            return;
        }

        // Move towards current target
        const angle = Math.atan2(dy, dx);
        const velocityX = Math.cos(angle) * this.moveSpeed;
        const velocityY = Math.sin(angle) * this.moveSpeed;

        this.body.setVelocity(velocityX, velocityY);
    }

    stopMovement() {
        this.isMoving = false;
        this.currentTarget = null;
        this.targetPath = [];
        this.pathIndex = 0;
        this.body.setVelocity(0, 0);
        this.playIdleAnimation();
    }

    updateFacing() {
        if (!this.currentTarget) return;

        const dx = this.currentTarget.x - this.x;
        const dy = this.currentTarget.y - this.y;

        // Determine primary direction
        if (Math.abs(dx) > Math.abs(dy)) {
            this.facing = dx > 0 ? 'right' : 'left';
        } else {
            this.facing = dy > 0 ? 'down' : 'up';
        }
    }

    playWalkAnimation() {
        const animKey = `walk_${this.facing}`;
        if (!this.anims.isPlaying || this.anims.currentAnim?.key !== animKey) {
            this.play(animKey);
        }
    }

    playIdleAnimation() {
        const animKey = `idle_${this.facing}`;
        if (this.scene.anims.exists(animKey)) {
            this.play(animKey);
        } else {
            this.play('idle_down');
        }
    }

    // Method to check if player can interact with something
    canInteract(target, maxDistance = 64) {
        if (this.isMoving) return false;

        const distance = Phaser.Math.Distance.Between(this.x, this.y, target.x, target.y);
        return distance <= maxDistance;
    }

    // Get the tile position the player is on
    getTilePosition() {
        return {
            x: Math.floor(this.x / GAME_CONSTANTS.TILE_SIZE),
            y: Math.floor(this.y / GAME_CONSTANTS.TILE_SIZE)
        };
    }
}
