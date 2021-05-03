import "phaser";
import { config } from "./config";
import { GameScene } from "./game-scene";

export class FlappyGame extends Phaser.Game {
  constructor() {
    super(config);
  }
}
window.onload = () => {
  var game = new FlappyGame();
};