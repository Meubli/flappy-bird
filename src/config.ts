import { GameScene } from './game-scene';

export const config = {
    title: 'Flappy',
    width: 1600,
    pipespeed: 200,
    height: 600,
    parent: 'game',
    scene: [GameScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    backgroundColor: '#18216D'
};
