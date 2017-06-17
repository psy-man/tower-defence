import { Application } from 'pixi.js';

import { TiledMap } from './tiled-map/tiled-map';
import { Bunny } from './objects/bunnies/bunny';
import { Cannon } from './objects/cannons/cannon';
// import { SimpleCannon } from './objects/cannons/simple-cannon';
import { UI } from './ui/ui';
import { States } from './states';


export default class App {
  public app: Application;
  public states: States;

  public map: TiledMap;

  public debug: boolean = false;

  public WIDTH: number = 1280;
  public HEIGHT: number = 768;

  private cannons: Cannon[] = [];

  preload() {
    // This.WIDTH = window.innerWidth;
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

    this.map = new TiledMap(this, mapData);
    this.app.stage.addChild(this.map);

    const ui = new UI(this);
    this.app.stage.addChild(ui);

    this.states = new States();
    this.app.stage.addChild(this.states);

    this.map.spawns.forEach(s => s.addBunnies(10));


    // const cannon = new SimpleCannon(this.app.stage, 515, 247);
    // this.addCannon(cannon);
    //
    // const cannon1 = new SimpleCannon(this.app.stage, 932, 225);
    // this.addCannon(cannon1);
    //
    // const cannon2 = new SimpleCannon(this.app.stage, 700, 544);
    // this.addCannon(cannon2);

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

    if (bunnies.length) {
      for (const cannon of this.cannons) {
        cannon.update();
        cannon.chooseTarget(bunnies);
      }

      bunnies.forEach((bunny: Bunny) => {
        if (this.map.destination.rectangle.contains(bunny.centerX, bunny.centerY)) {
          bunny.hide();
          this.states.health--;
        }
      });
    }

    this.states.render();
  }

  private addCannon(cannon: Cannon) {
    this.cannons.push(cannon);
    this.app.stage.addChild(cannon);
  }

  private createScene() {
    this.app = new Application(this.WIDTH, this.HEIGHT, {antialias: true});
    this.app.stage.interactive = true;

    document.body.appendChild(this.app.view);
  }

  private initEvents() {
    console.log('events');
  }
}
