import { Point, Texture, Rectangle, Sprite, Graphics, Container } from "pixi.js";
import { Cannon } from './cannon';

export class SimpleCannon extends Cannon {

  public range: number = 200;

  public shotsPerSecond: number = 3;
  public speed: number = 20;

  public damage: number = 2;
  public radius: number = 16;

  constructor(public stage: Container, public posX: number, public posY: number) {
    super(stage, posX, posY);

    const cannon = new Container();

    const circle = new Graphics();
    circle.beginFill(0x9966FF);
    circle.drawCircle(0, 0, this.radius);
    circle.endFill();

    const line = new Graphics();
    line.lineStyle(4, 0xFFFFFF, 1);
    line.moveTo(0, 1);
    line.lineTo(25, 1);

    const radius = new Graphics();
    radius.lineStyle (1, 0x9966FF, 0.4);
    radius.drawCircle(0, 0, this.range);

    cannon.addChild(circle);
    cannon.addChild(line);
    cannon.addChild(radius);

    this.addChild(cannon);
  }
}
