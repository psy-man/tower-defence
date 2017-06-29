import { Texture, Sprite } from 'pixi.js';
import { getTargetAngle, hitTest } from '../../core/helpers';
import { BaseObject } from '../base-object';
import { Bunny } from '../bunnies/bunny';
import { Cannon } from '../cannons/cannon';


export class Carrot extends BaseObject {

  public initialWidth: number = 20;
  public initialHeight: number = 6;

  public angleCorrection: number = -0.1;
  public distanceFromCannon: number = 30;


  constructor(public cannon: Cannon, public target: Bunny) {
    super();

    const texture = Texture.fromImage(require('../../../assets/images/carrot.png'));

    const sprite = new Sprite(texture);
    sprite.width = this.initialWidth;
    sprite.height = this.initialHeight;

    this.addChild(sprite);

    this.rotation = cannon.rotation;
    this.x = cannon.x + Math.cos(cannon.rotation + this.angleCorrection) * this.distanceFromCannon;
    this.y = cannon.y + Math.sin(cannon.rotation + this.angleCorrection) * this.distanceFromCannon;
  }

  move() {
    this.rotation = getTargetAngle(this, this.target);

    this.x += Math.cos(this.rotation) * this.cannon.speed;
    this.y += Math.sin(this.rotation) * this.cannon.speed;

    if (hitTest(this, this.target)) {
      this.target.hit(this.cannon);
      this.hide();

      this.cannon.game.states.money += this.target.price;
    }
  }
}
