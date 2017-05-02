import { Rectangle, Graphics, Point } from "pixi.js";
import { Direction, Position } from '../core/enums';
import { getCenterX, getCenterY } from '../core/helpers';


export class Spawn extends Graphics  {
  id: number;

  dir: Direction;
  pos: Position;

  constructor(private obj) {
    super();

    this.id = obj.id;
    this.dir = Direction[<string>obj.properties.dir];
    this.pos = Position[<string>obj.properties.pos];

    this.lineStyle(1, 0xFF0000);
    this.drawRect(obj.x, obj.y, obj.width, obj.height);
  }

  get spawnPoint(): Point {
    const x = Math.round(getCenterX(this.obj.x, this.obj.width));
    const y = Math.round(getCenterY(this.obj.y, this.obj.height));

    return new Point(x, y);
  }
}
