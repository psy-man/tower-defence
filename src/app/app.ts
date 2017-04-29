import {
  Texture,
  Rectangle,
  Application,
  Sprite,
  Point
} from "pixi.js";

import { TiledMap } from './tiled-map/tiled-map';

import { Bunny } from './objects/bunnies/bunny';
import { SpaceBunny } from './objects/bunnies/space-bunny';
import { RobotBunny } from './objects/bunnies/robot-bunny';

import { Cannon } from './objects/cannons/cannon';
import { SimpleCannon } from './objects/cannons/simple-cannon';


export default class App {
  public app: Application;
  public map: TiledMap;

  private WIDTH: number = 1280;
  private HEIGHT: number = 768;

  private bunnies: Bunny[] = [];
  private cannons: Cannon[] = [];

  constructor() {
  }

  preload() {
    // this.WIDTH = window.innerWidth;
    // this.HEIGHT = window.innerHeight;

    return new Promise(resolve => {
      PIXI.loader
        .add('Outside_A1', require('../../src/assets/images/Outside_A1.png'))
        .add('Outside_A2', require('../../src/assets/images/Outside_A2.png'))
        .add('Outside_B', require('../../src/assets/images/Outside_B.png'))
        .load(() => {
          resolve();
        });
    });
  }

  bootstrap() {
    this.createScene();
    this.initEvents();

    const mapData = require('../../src/assets/map/map.json');

    this.map = new TiledMap(mapData);
    this.app.stage.addChild(this.map);


    // const bunny = new SpaceBunny(300, 30);
    // this.addBunny(bunny);
    //
    // const bunny1 = new RobotBunny(50, 30);
    // this.addBunny(bunny1);
    //
    // const bunny2 = new RobotBunny(425, 430);
    // this.addBunny(bunny2);
    //
    //
    // const cannon = new SimpleCannon(this.app.stage, 400, 130);
    // this.addCannon(cannon);
    //
    // const cannon1 = new SimpleCannon(this.app.stage, 200, 350);
    // this.addCannon(cannon1);
    //
    // const cannon2 = new SimpleCannon(this.app.stage, 600, 350);
    // this.addCannon(cannon2);

    this.render();
  }

  render() {
    requestAnimationFrame(() => {
      this.render();
    });


    this.bunnies.forEach(b => b.move());
    this.bunnies = this.bunnies.filter(b => b.alpha > 0);


    for (const cannon of this.cannons) {
      cannon.update();

      if (this.bunnies.length) {
        cannon.chooseTarget(this.bunnies);
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

  private createScene() {
    this.app = new Application(this.WIDTH, this.HEIGHT, { antialias: true });
    this.app.stage.interactive = true;

    document.body.appendChild(this.app.view);
  }

  private initEvents() {
    // document.body.addEventListener('mousedown', this.onMouseDown.bind(this), false);
    // document.body.addEventListener('mousewheel', this.onMouseWheel.bind(this), false);
    //
    // window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
  }
}
