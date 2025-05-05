import Phaser from 'phaser';

/**
 * GameplayScene
 * The main gameplay scene with animated character.
 */
export default class GameplayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameplayScene' });

    // Initialize properties
    this.player = null;
    this.cursors = null;
  }

  /**
   * Create game objects and set up the gameplay
   */
  create() {
    // Add background image
    this.add.image(600, 300, 'background').setDisplaySize(1200, 600);

    // Create animations
    this.createAnimations();

    // Create player using the new method
    this.createPlayer();

    // Set up input controls
    this.cursors = this.input.keyboard.createCursorKeys();

    // Add escape key to end game
    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.start('GameOverScene');
    });

    // Add Game Instructions
    this.add.text(600, 50, 'Use Arrow Keys to Move • Press ESC to End', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5);
  }

  /**
   * Create and configure the player character
   */
  createPlayer() {
    // Add player sprite at the left side of the screen
    this.player = this.physics.add.sprite(170, 450, 'character');

    // Scale the player down (the cat sprite is quite large)
    this.player.setScale(0.5);

    // Enable physics body
    this.player.setCollideWorldBounds(true);

    // Adjust the physics body size for better collision
    // This creates a tighter collision box around the character
    this.player.body.setSize(
      this.player.width * 0.6,  // 60% of the sprite width
      this.player.height * 0.8  // 80% of the sprite height
    );

    // Center the physics body
    this.player.body.setOffset(
      this.player.width * 0.2,  // 20% offset from left
      this.player.height * 0.2  // 20% offset from top
    );
  }

  /**
   * Create character animations from the sprite sheet
   */
  createAnimations() {
    // Walking animation using all 10 frames (0-9) from the cat sprite sheet
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('character', {
        start: 0,   // First frame
        end: 9      // Last frame (there are 10 frames total, 0-9)
      }),
      frameRate: 10,  // 10 frames per second
      repeat: -1      // -1 means loop indefinitely
    });

    // Idle animation using just the first frame
    // For a more complex idle animation, you could use multiple frames
    // but our sprite sheet only has walking frames
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('character', {
        frames: [0]  // Just use the first frame for a standing pose
      }),
      frameRate: 10,
      repeat: -1
    });
  }

  /**
   * Update game objects on every frame
   */
  update() {
    const speed = 160;  // Movement speed in pixels per second
    const halfWidth = this.player.width * 0.5 * this.player.scale;
    const worldWidth = this.scale.width;

    // Reset horizontal velocity
    this.player.setVelocityX(0);

    // Enable gravity
    this.physics.world.gravity.y = 300;

    // Handle jump
    if (this.cursors.up.isDown && Math.floor(this.player.y) > 480) {
      this.player.setVelocityY(-330);
    }

    // Handle left movement
    if (this.cursors.left.isDown && this.player.x > halfWidth) {
      this.player.setVelocityX(-speed);
      this.player.setFlipX(true);  // Flip sprite to face left
      this.player.anims.play('walk', true);
    }
    // Handle right movement
    else if (this.cursors.right.isDown && this.player.x < worldWidth - halfWidth) {
      this.player.setVelocityX(speed);
      this.player.setFlipX(false);  // Normal orientation facing right
      this.player.anims.play('walk', true);
    }
    // No movement or at edge
    else {
      // Play idle animation instead of stopping
      this.player.anims.play('idle', true);
    }


  }
}