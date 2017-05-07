import {
  Texture,
  Rectangle,
  Application,
  Sprite,
  Point,
  Graphics,
  Container
} from "pixi.js";

import { TiledMap } from './tiled-map/tiled-map';

import { Bunny } from './objects/bunnies/bunny';
import { SpaceBunny } from './objects/bunnies/space-bunny';
import { RobotBunny } from './objects/bunnies/robot-bunny';

import { Cannon } from './objects/cannons/cannon';
import { SimpleCannon } from './objects/cannons/simple-cannon';

import {Grid, AStarFinder, Heuristic} from 'pathfinding';
import { Spawn } from './tiled-map/spawn';


export default class App {
  public app: Application;
  public map: TiledMap;

  private WIDTH: number = 1280;
  private HEIGHT: number = 768;


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
        .load(resolve);
    });
  }

  bootstrap() {
    this.createScene();
    this.initEvents();

    const mapData = require('../../src/assets/map/map.json');

    this.map = new TiledMap(this.app.stage, this.WIDTH, this.HEIGHT, mapData);
    this.app.stage.addChild(this.map);

    // const bunny = new SpaceBunny(300, 30);
    // this.addBunny(bunny);
    // //

    this.map.spawns.forEach(s => s.addBunnies(100));
    //
    // const bunny2 = new RobotBunny(425, 430);
    // this.addBunny(bunny2);
    //
    //
    const cannon = new SimpleCannon(this.app.stage, 515, 247);
    this.addCannon(cannon);

    const cannon1 = new SimpleCannon(this.app.stage, 932, 225);
    this.addCannon(cannon1);

    const cannon2 = new SimpleCannon(this.app.stage, 700, 544);
    this.addCannon(cannon2);

    this.render();
  }

  render() {
    requestAnimationFrame(() => {
      this.render();
    });

    let bunnies: Bunny[] = [];

    this.map.spawns.forEach(spawn => {
      spawn.update();

      bunnies = [...bunnies, ...spawn.bunnies];
    });

    for (const cannon of this.cannons) {
      cannon.update();

      if (bunnies.length) {
        cannon.chooseTarget(bunnies);
      }
    }
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
