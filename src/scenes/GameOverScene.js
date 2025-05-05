import Phaser from 'phaser';

/**
 * GameOverScene
 * Displayed when the game ends.
 */
export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  /**
   * Create game objects for the game over screen
   */
  create() {
    // Add background image
    this.add.image(600, 300, 'background').setDisplaySize(1200, 600);

    // Add semi-transparent dark overlay
    this.add.rectangle(600, 300, 1200, 600, 0x000000, 0.5);

    // Game Over text
    this.add.text(600, 250, 'Game Over', {
      fontFamily: 'Arial',
      fontSize: '64px',
      color: '#ff4444',
      stroke: '#000000',
      strokeThickness: 6
    }).setOrigin(0.5);

    // Restart instructions
    this.add.text(600, 350, 'Press any key to restart', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5);

    // Listen for keyboard input to restart
    this.input.keyboard.once('keydown', () => {
      this.scene.start('TitleScene');
    });
  }
}