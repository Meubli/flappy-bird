/* eslint-disable no-undef */
import 'phaser';
import { Bird } from './bird';
import { config } from './config';
import { PipePair } from './pipe-pair';

const SPACE_BEETWWEN_PIPES = 300;

export class GameScene extends Phaser.Scene {
    ok: boolean = true;

    previousFrame: number;

    delta: number;

    bird: Bird;

    score = 0;
    scoreText :Phaser.GameObjects.Text;

    pipes: PipePair[] = [];

    info: Phaser.GameObjects.Text;

    constructor () {
        super({ key: 'GameScene' });
    }

    init (params: any): void {
        this.delta = 1000;
    }

    preload (): void {
        this.load.image('bird', '../assets/img/bird.png');
        this.load.image('pipe', '../assets/img/pipe.png');
        this.load.image('pipe2', '../assets/img/pipe2.png');
    }

    create (): void {
        this.bird = new Bird(this);

        for (let i = 1; i <= 10; i++) {
            this.pipes.push(new PipePair(this, SPACE_BEETWWEN_PIPES * i + 200));
        }

        this.drawScore();
    }

    update (time: number): void {
        if (!this.ok) {
            return;
        }

        if (this.previousFrame == null) {
            this.previousFrame = time;
        }

        const elapsedTime = (time - this.previousFrame) / 1000.0;

        this.bird.update(elapsedTime, this.input.keyboard.createCursorKeys());

        this.updatePipes(elapsedTime);

        this.checkGameOver();

        this.previousFrame = time;
    }

    updatePipes (elapsedTime: number) : void {
        const oldPipeX = this.pipes[0].X + this.pipes[0].width;

        this.pipes.forEach((pipe) => pipe.update(elapsedTime));

        const newPipeX = this.pipes[0].X + this.pipes[0].width;

        if (oldPipeX > 50 && newPipeX < 50) {
            this.score++;
            this.scoreText.text = `Score: ${this.score}`;
        }

        if (this.pipes[0].X + this.pipes[0].width < 0) {
            const p = this.pipes.shift();
            p.Reset(this.pipes[this.pipes.length - 1].X + SPACE_BEETWWEN_PIPES);
            this.pipes.push(p);
        }
    }

    checkGameOver () : void {
        if (this.bird.Bounds.bottom > config.height) {
            this.gameOver();
            return;
        }
        for (let i = 0; i < this.pipes.length; i++) {
            if (this.pipes[i].intersects(this.bird.Bounds)) {
                this.gameOver();
                return;
            }
        }
    }

    gameOver () : void {
        this.info = this.add.text(10, 10, 'GAME OVER', {
            font: '100px Arial',
            color: '#FBFBAC'
        });
        this.ok = false;
    }

    drawScore ():void {
        const text = 'Score: 0';
        const style = {
            font: '40px Roboto',
            fill: '#FFFFFF',
            align: 'center',
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000',
                blur: 2,
                fill: true
            }
        };

        this.scoreText = this.add.text(0, 0, text, style);
    }
}
