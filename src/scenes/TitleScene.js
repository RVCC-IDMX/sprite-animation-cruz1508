import Phaser from 'phaser';

/**
 * TitleScene
 * The first scene shown when the game starts.
 */
export default class TitleScene extends Phaser.Scene {
  constructor() {
    // The key is used to reference this scene
    super({ key: 'TitleScene' });
  }

  /**
   * Preload assets for the game
   */
  preload() {
    // Load a background image
    this.load.image('background', 'assets/images/background.png');

    // Load the character sprite sheet with calculated dimensions
    this.load.spritesheet('character', 'assets/images/character.png', {
      frameWidth: 340,   // Width of each frame (3400px total width ÷ 10 frames)
      frameHeight: 474   // Height of each frame
    });
  }

  /**
   * Create game objects and set up the title screen
   */
  create() {
    // Add background image, stretching to fit the game canvas
    this.add.image(600, 300, 'background').setDisplaySize(1200, 600);

    this.add.text(600, 200, '🐾 Character Animation 🐾', {
      fontFamily: 'Arial',
      fontSize: '48px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);

    // Add instructions
    this.add.text(600, 300, 'Press any key to start', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5);

    // Listen for keyboard input to start the game
    this.input.keyboard.once('keydown', () => {
      this.scene.start('GameplayScene');  // CHANGED: Now actually starts the game
    });
  }
}