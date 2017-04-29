import { Point, Texture, Sprite } from "pixi.js";
import { GameObject } from './object';
import { Bunny } from './bunnies/bunny';
import { getTargetAngle, hitTest } from '../core/helpers';
import { Cannon } from './cannons/cannon';

export class Carrot extends GameObject {

  public initialWidth: number = 20;
  public initialHeight: number = 6;

  public angleCorrection: number = - 0.1;
  public distanceFromCannon: number = 30;


  constructor(public cannon: Cannon, public target: Bunny) {
    super();

    const texture = Texture.fromImage(require('../../assets/images/carrot.png'));

    this.mesh = new Sprite(texture);
    this.mesh.rotation = cannon.rotation;
    // this.mesh.scale.set(0.5, 0.5);

    this.mesh.width = this.initialWidth;
    this.mesh.height = this.initialHeight;

    this.x = cannon.x + Math.cos(cannon.rotation + this.angleCorrection) * this.distanceFromCannon;
    this.y = cannon.y + Math.sin(cannon.rotation + this.angleCorrection) * this.distanceFromCannon;

    // this.initDraggable();
  }

  move() {
    this.getMesh().rotation = getTargetAngle(this, this.target);

    this.x += Math.cos(this.rotation) * this.cannon.speed;
    this.y += Math.sin(this.rotation) * this.cannon.speed;

    if (hitTest(this, this.target)) {
      this.target.hit(this.cannon);
      this.hide();
    }
  }
}
