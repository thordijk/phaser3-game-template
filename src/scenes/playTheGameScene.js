import Phaser from 'phaser';
import getKeys from '@capacade/arcadekeymap';
import playerImg from '../assets/img/player.png';
import ground from '../assets/img/ground.png';
import bg from '../assets/img/bg.png';

export default class playTheGame extends Phaser.Scene {
  constructor() {
    super('playTheGame');
  }

  preload() {
    this.load.image('bg', bg);
    this.load.image('player', playerImg);
    this.load.image('ground', ground);
  }

  create() {
    this.add.image(0, 0, 'bg').setOrigin(0, 0).setScale(0.78);
    this.player = this.physics.add.image(400, 150, 'player');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.body.setGravityY(300);

    const platforms = this.physics.add.staticGroup();
    for (let i = 0; i < 12; i += 1) {
      platforms.create(70 * i, 530, 'ground').setOrigin(0, 0).refreshBody();
    }
    this.physics.add.collider(this.player, platforms);
    this.keys = this.input.keyboard.addKeys(getKeys());
  }

  update() {
    if (this.keys.p1Left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.keys.p1Right.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
    }
    if (this.keys.p1Up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-390);
    }
  }
}
