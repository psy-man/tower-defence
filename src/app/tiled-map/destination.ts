import { Graphics, Container, Rectangle } from 'pixi.js';
import App from '../app';


export class Destination extends Container {
  id: number;
  rectangle: Rectangle;

  constructor(public game: App, private obj) {
    super();

    this.id = this.obj.id;
    this.rectangle = new Rectangle(obj.x, obj.y, obj.width, obj.height);

    if (this.game.debug) {
      const graphics = new Graphics();

      graphics.lineStyle(1, 0xFFFFFF);
      graphics.drawRect(obj.x, obj.y, obj.width, obj.height);

      this.addChild(graphics);
    }
  }
}
