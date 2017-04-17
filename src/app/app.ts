import {
  Texture,
  Rectangle,
  Application,
  Sprite,
  Point
} from "pixi.js";

import { RobotBunny } from './bunnies/robot-bunny';
import { SimpleCannon } from './cannons/simple-cannon';
import { Bunny } from './bunnies/bunny';
import { Cannon } from './cannons/cannon';

import { getDistance, getTargetAngle } from './core/helpers';
import { Carrot } from './cannons/carrot';
import { SpaceBunny } from './bunnies/space-bunny';
import { SimpleBunny } from './bunnies/simple-bunny';


export default class App {
  public app: any;

  private WIDTH: number = 800;
  private HEIGHT: number = 600;

  private bunnies: Bunny[] = [];
  private cannons: Cannon[] = [];
  private carrots: Carrot[] = [];

  constructor() {
  }

  preload() {
    // this.WIDTH = window.innerWidth;
    // this.HEIGHT = window.innerHeight;

    return Promise.resolve();
  }

  bootstrap() {
    this.createScene();
    this.initEvents();

    const bunny = new SpaceBunny(200, 30);
    this.addBunny(bunny);

    const bunny1 = new SimpleBunny(100, 30);
    this.addBunny(bunny1);

    const bunny2 = new RobotBunny(150, 30);
    this.addBunny(bunny2);

    const cannon = new SimpleCannon(400, 300);
    this.addCannon(cannon);

    this.render();
  }

  render() {
    requestAnimationFrame(() => {
      this.render();
    });

    this.bunnies.forEach(b => b.move());
    this.bunnies = this.bunnies.filter(b => b.getMesh().alpha > 0);

    this.carrots.forEach(c => c.move());
    this.carrots = this.carrots.filter(c => c.getMesh().alpha > 0);

    if (this.bunnies.length) {
      for (const cannon of this.cannons) {
        let closest = null;
        let target: Bunny = null;

        for (let bunny of this.bunnies) {
          const distance = getDistance(cannon.position, bunny.position);

          if (!closest || distance < closest) {
            closest = distance;
            target = bunny;
          }
        }

        cannon.getMesh().rotation = getTargetAngle(cannon.position, target.position);

        if (this.carrots.length < 1) {
          const carrot = new Carrot(cannon, target);
          this.addCarrot(carrot);
        }
      }
    }
  }

  private addBunny(bunny: Bunny) {
    this.bunnies.push(bunny);
    this.app.stage.addChild(bunny.getMesh());
  }

  private addCannon(cannon: Cannon) {
    this.cannons.push(cannon);
    this.app.stage.addChild(cannon.getMesh());
  }

  private addCarrot(carrot: Carrot) {
    this.carrots.push(carrot);
    this.app.stage.addChild(carrot.getMesh());
  }

  private createScene() {
    this.app = new Application(this.WIDTH, this.HEIGHT, { antialias: true });

    document.body.appendChild(this.app.view);
  }

  private initEvents() {
    // document.body.addEventListener('mousedown', this.onMouseDown.bind(this), false);
    // document.body.addEventListener('mousewheel', this.onMouseWheel.bind(this), false);
    //
    // window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
  }
}
