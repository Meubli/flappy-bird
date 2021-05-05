/* eslint-disable no-undef */
import { config } from './config';
import { GameScene } from './game-scene';

const GRAVITY = 18;
const MAX_MONTER_VELOCITY = -10;
const MAX_DESCENDRE_VELOCITY = 10;
const ACCELERATION_UP = -10;

export class Bird {
    sprite: Phaser.GameObjects.Image;

    velocity = 0;

    constructor (scene: GameScene) {
        this.sprite = scene.add.image(100, 200, 'bird');
        this.sprite.displayHeight = 50;
        this.sprite.displayWidth = 50;
    }

    update (elepsedTime: number, keys: Phaser.Types.Input.Keyboard.CursorKeys) : void {
        this.velocity += GRAVITY * elepsedTime;
        this.handleInput(keys);
        this.velocity = Math.min(
            Math.max(this.velocity, MAX_MONTER_VELOCITY),
            MAX_DESCENDRE_VELOCITY
        );
        this.sprite.y += this.velocity;

        const v = new Phaser.Math.Vector2(config.pipespeed, this.velocity);

        v.normalize();

        console.log((Math.atan(v.y / v.x) * 180) / Math.PI);

        this.sprite.angle = ((Math.atan(v.y / v.x) * 180) / Math.PI) * 12;
    }

    handleInput (keys: Phaser.Types.Input.Keyboard.CursorKeys) : void {
        if (Phaser.Input.Keyboard.JustDown(keys.up)) {
            this.velocity += ACCELERATION_UP;
        }
    }

    get Y (): number {
        return this.sprite.y;
    }

    get Bounds (): Phaser.Geom.Rectangle {
        return this.sprite.getBounds();
    }
}
