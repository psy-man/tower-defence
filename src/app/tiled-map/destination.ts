import { Rectangle, Graphics, Point } from "pixi.js";
import { getCenterX, getCenterY } from '../core/helpers';


export class Destination extends Graphics  {
  id: number;

  constructor(private obj) {
    super();

    this.id = obj.id;

    this.lineStyle(1, 0xFFFFFF);
    this.drawRect(obj.x, obj.y, obj.width, obj.height);
  }
}
