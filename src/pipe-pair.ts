import { config } from './config';
import { GameScene } from './game-scene';

export class PipePair {
    spriteUp: Phaser.GameObjects.Rectangle;

    spriteDown: Phaser.GameObjects.Rectangle;

    constructor(scene: GameScene, posX: number) {
        const height =
            Math.random() * ((6 * config.height) / 10) + config.height / 5;

        this.spriteUp = scene.add.rectangle(
            posX,
            0,
            80,
            height-config.height*1.5/10,
            0x66ff66
        );

        this.spriteUp.displayOriginX = 0;
        this.spriteUp.displayOriginY = 0;

        this.spriteDown = scene.add.rectangle(
            posX,
            height + config.height*1.5/10,
            80,
            config.height,
            0x66ff66
        );
        this.spriteDown.displayOriginX = 0;
        this.spriteDown.displayOriginY = 0;
    }

    update(elepsedTime: number) {
        this.spriteDown.x -= config.pipespeed * elepsedTime;
        this.spriteUp.x -= config.pipespeed * elepsedTime;
    }

    get X() {
        return this.spriteDown.x;
    }

    get width() {
        return this.spriteDown.width;
    }

    Reset(x: number) {
        const height =
            Math.random() * ((7 * config.height) / 10) + config.height / 10;
        this.spriteDown.x = x;
        this.spriteDown.y = height - config.height;

        this.spriteUp.x = x;
        this.spriteUp.y = height + config.height / 10;
    }

    intersects(bound: Phaser.Geom.Rectangle): any {
        const retour =
            Phaser.Geom.Intersects.GetRectangleToRectangle(
                bound,
                this.spriteDown.getBounds()
            ).length != 0 ||
            Phaser.Geom.Intersects.GetRectangleToRectangle(
                bound,
                this.spriteUp.getBounds()
            ).length != 0;

        return retour;
    }
}
