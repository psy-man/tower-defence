import { Rectangle, Graphics } from "pixi.js";


export class Spawn extends Graphics  {
  id: number;

  dir: string;
  pos: string;

  constructor(obj) {
    super();

    this.id = obj.id;
    this.dir = obj.properties.dir;
    this.pos = obj.properties.pos;

    this.lineStyle(1, 0xFF0000);
    this.drawRect(obj.x, obj.y, obj.width, obj.height);
  }
}
