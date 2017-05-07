import { Rectangle, Graphics, Point, Container } from "pixi.js";
import { Direction, Position } from '../core/enums';
import { getCenterX, getCenterY } from '../core/helpers';
import { Destination } from './destination';
import { Bunny } from '../objects/bunnies/bunny';

import { RobotBunny } from '../objects/bunnies/robot-bunny';
import { TiledMap } from './tiled-map';


export class Spawn extends Graphics  {
  id: number;

  dir: Direction;
  pos: Position;

  pathToDestination = [];
  bunnies: Bunny[] = [];


  constructor(public map: TiledMap, private obj) {
    super();

    this.id = obj.id;
    this.dir = Direction[<string>obj.properties.dir];
    this.pos = Position[<string>obj.properties.pos];

    this.lineStyle(1, 0xFF0000);
    // this.drawRect(obj.x, obj.y, obj.width, obj.height);
  }

  update() {
    this.bunnies = this.bunnies.filter(b => b.alpha > 0);
  }

  addBunnies(count) {
    const timer = setInterval(() => {
      if (count <= 0) {
        clearInterval(timer);
        return false;
      }

      this.addBunny();

      count--;
    }, 600);
  }

  addBunny() {
    const [x, y] = this.pathToDestination[0];

    const bunny = new RobotBunny(x * 16 + 8, y * 16 + 8);

    bunny.x -= bunny.width / 2;
    bunny.y -= bunny.height / 2;

    let pos = 0;

    const timer = setInterval(() => {
      if (!this.pathToDestination[pos]) {
        clearInterval(timer);
        bunny.hide();
        return false;
      }

      const [x, y] = this.pathToDestination[pos];

      bunny.x = (x * 16 + 8) - bunny.width / 2;
      bunny.y = (y * 16 + 8) - bunny.height / 2;

      pos++;

    }, bunny.speed);

    this.bunnies.push(bunny);
    this.map.stage.addChild(bunny.getMesh());
  }

  get spawnPoint(): Point {
    const x = Math.round(getCenterX(this.obj.x, this.obj.width));
    const y = Math.round(getCenterY(this.obj.y, this.obj.height));

    return new Point(x, y);
  }
}
