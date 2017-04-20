import { Point, Texture, Sprite } from "pixi.js";
import { GameObject } from '../core/object';
import { Bunny } from './bunnies/bunny';
import { getTargetAngle, hitTest } from '../core/helpers';
import { Cannon } from './cannons/cannon';

export class Carrot extends GameObject {

  public range: number = 100;
  public speed: number = 5;


  constructor(public cannon: Cannon, public target: Bunny) {
    super();

    const texture = Texture.fromImage(require('../../assets/images/carrot.png'));

    this.mesh = new Sprite(texture);
    this.mesh.rotation = cannon.rotation;
    // this.mesh.scale.set(0.5, 0.5);

    this.mesh.width = 17;
    this.mesh.height = 6;

    this.setPosition(
      cannon.x - 2 + Math.cos(cannon.rotation) * 30,
      cannon.y - 2 + Math.sin(cannon.rotation) * 30
    );
  }

  move() {
    this.getMesh().rotation = getTargetAngle(this, this.target);

    this.getMesh().position.x += Math.cos(this.getMesh().rotation) * this.speed;
    this.getMesh().position.y += Math.sin(this.getMesh().rotation) * this.speed;

    if (hitTest(this.getMesh(), this.target.getMesh())) {
      this.target.hit(this.cannon);
      this.hide();
    }
  }
}
