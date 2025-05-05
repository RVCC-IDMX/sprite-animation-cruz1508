// Import Phaser
import Phaser from 'phaser';

// Import scenes
import TitleScene from './scenes/TitleScene';
import GameplayScene from './scenes/GameplayScene';  // NEW
import GameOverScene from './scenes/GameOverScene';  // NEW

// Game configuration
const config = {
  parent: 'game-container', // Use the container from index.html
  type: Phaser.AUTO,
  width: 1200,
  height: 600,
  backgroundColor: '#87CEEB',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  // Add all three scenes
  scene: [TitleScene, GameplayScene, GameOverScene]  // CHANGED
};

// Create the game instance
new Phaser.Game(config);