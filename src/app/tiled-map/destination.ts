import { Rectangle, Graphics, Point, Container } from "pixi.js";


export class Destination extends Container  {
  id: number;

  constructor(private obj) {
    super();

    this.id = obj.id;

    const graphics = new Graphics();

    graphics.lineStyle(1, 0xFFFFFF);
    graphics.drawRect(obj.x, obj.y, obj.width, obj.height);

    this.addChild(graphics);
  }
}
