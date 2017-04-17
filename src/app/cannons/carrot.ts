import { Point, Texture, Sprite } from "pixi.js";
import { GameObject } from '../core/object';
import { Bunny } from '../bunnies/bunny';
import { getTargetAngle, hitTest } from '../core/helpers';
import { Cannon } from './cannon';

export class Carrot extends GameObject {

  public range: number = 100;
  public speed: number = 5;


  constructor(public cannon: Cannon, public target: Bunny) {
    super();

    const texture = Texture.fromImage(require('./../../assets/images/carrot.png'));

    this.mesh = new Sprite(texture);
    this.mesh.rotation = cannon.rotation;

    this.setPosition(
      cannon.positionX + Math.cos(cannon.rotation) * 20,
      cannon.positionY + Math.sin(cannon.rotation) * 20
    );
  }

  move() {
    this.getMesh().rotation = getTargetAngle(this.position, this.target.position);

    this.getMesh().position.x += Math.cos(this.getMesh().rotation) * this.speed;
    this.getMesh().position.y += Math.sin(this.getMesh().rotation) * this.speed;

    if (hitTest(this.getMesh(), this.target.getMesh())) {
      this.target.hit(this.cannon);
      this.getMesh().alpha = 0;
    }
  }
}
