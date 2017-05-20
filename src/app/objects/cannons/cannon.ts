import { Container } from 'pixi.js';
import { getDistance, getTargetAngle } from '../../core/helpers';

import { BaseObject } from '../base-object';
import { Carrot } from '../ammo/carrot';
import { Bunny } from '../bunnies/bunny';


export class Cannon extends BaseObject {
  public range: number = 10;

  public active: boolean = false;
  public shotsPerSecond: number = 1;
  public speed: number = 1;

  public damage: number = 1;
  public radius: number = 16;

  public carrots: Carrot[] = [];

  private target: Bunny = null;
  private timer: any;

  constructor(public stage: Container, public posX: number, public posY: number) {
    super();

    this.x = posX;
    this.y = posY;

    this.initDraggable(true);
  }

  addCarrot(carrot: Carrot) {
    this.carrots.push(carrot);
    this.stage.addChild(carrot);
  }

  startShooting(target: Bunny) {
    this.target = target;
    this.rotation = getTargetAngle(this, target);

    if (!this.active) {
      this.active = true;

      this.timer = setInterval(() => {
        const carrot = new Carrot(this, this.target);
        this.addCarrot(carrot);
      }, 1000 / this.shotsPerSecond);
    }
  }

  stopShooting() {
    this.active = false;
    this.target = null;

    clearInterval(this.timer);
  }

  update() {
    this.carrots.forEach(c => c.move());
    this.carrots = this.carrots.filter(c => c.alpha > 0);

    if (this.target) {
      const distance = getDistance(this, this.target);

      if (distance > this.range || this.target.health <= 0) {
        this.stopShooting();
      }
    }
  }

  chooseTarget(bunnies: Bunny[]) {
    let closest = null;
    let target: Bunny = null;

    // Get closest target
    for (const bunny of bunnies) {
      const distance = getDistance(this, bunny);

      if (distance > this.range) {
        continue;
      }

      if ((!closest || distance < closest) && bunny.health > 0) {
        closest = distance;
        target = bunny;
      }
    }

    if (target) {
      this.startShooting(target);
    }
  }
}
