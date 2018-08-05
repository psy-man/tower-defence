import { Application, Graphics } from 'pixi.js';

import { TiledMap } from './tiled-map/tiled-map';
import { Bunny } from './objects/bunnies/bunny';
import { Cannon } from './objects/cannons/cannon';
import { UI } from './ui/ui';
import { States } from './states';
import { CannonType1 } from './objects/cannons/cannon-type-1';
import { RobotBunny } from './objects/bunnies/robot-bunny';


export default class App {
  public app: Application;
  public states: States;
  public ui: UI;

  public map: TiledMap;

  public debug: boolean = true;

  public WIDTH: number = 1280;
  public HEIGHT: number = 768;

  private cannons: Cannon[] = [];

  preload() {
    // This.WIDTH = window.innerWidth;
    // this.HEIGHT = window.innerHeight;

    return new Promise(resolve => {
      PIXI.loader
        .add('tileset', require('../../src/assets/images/tile-set.png'))
        .add('Button', require('../../src/assets/images/Button.png'))
        .load(resolve);
    });
  }

  bootstrap() {
    this.createScene();
    this.initEvents();

    const mapData = require('../../src/assets/map/map.json');

    console.log(mapData);

    this.map = new TiledMap(this, mapData);
    this.app.stage.addChild(this.map);

    // this.ui = new UI(this);
    // this.app.stage.addChild(this.ui);
    //
    this.states = new States();
    this.app.stage.addChild(this.states);

    this.map.spawn.addBunnies(20);


    const cannon = new CannonType1(this, 286, 354);
    this.addCannon(cannon);

    const cannon1 = new CannonType1(this, 930, 530);
    this.addCannon(cannon1);
    //
    // const cannon2 = new CannonType1(this.app.stage, 700, 544);
    // this.addCannon(cannon2);

    this.render();
  }

  render() {
    requestAnimationFrame(() => {
      this.render();
    });

    this.map.spawn.update();

    for (const cannon of this.cannons) {
      cannon.update();

      if (this.map.spawn.bunnies.length) {
        cannon.chooseTarget(this.map.spawn.bunnies);
      }
    }

    // if (this.map.spawn.bunnies.length) {
    //   this.map.spawn.bunnies.forEach((bunny: Bunny) => {
    //     if (this.map.destination.rectangle.contains(bunny.centerX, bunny.centerY)) {
    //       bunny.hide();
    //       this.states.health--;
    //     }
    //   });
    // }

    // this.ui.render();
    // this.states.render();
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
