import { Point, Texture, Rectangle, Sprite, Graphics, Container } from "pixi.js";
import { Cannon } from './cannon';

export class SimpleCannon extends Cannon {

  public range: number = 120;
  public speed: number = 1.2;

  constructor(public posX: number, public posY: number) {
    super(posX, posY);

    const cannon = new Container();

    const circle = new Graphics();
    circle.beginFill(0x9966FF);
    circle.drawCircle(0, 0, 16);
    circle.endFill();

    const line = new Graphics();
    line.lineStyle(4, 0xFFFFFF, 1);
    line.moveTo(0, 1);
    line.lineTo(25, 1);

    const radius = new Graphics();
    radius.lineStyle (1, 0xFFFFFF, 0.1);
    radius.drawCircle(0, 0, this.range);

    cannon.addChild(circle);
    cannon.addChild(line);
    cannon.addChild(radius);

    this.setMesh(cannon).setPosition(posX, posY);
  }
}
