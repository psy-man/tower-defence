import { Point, Texture, Rectangle, Sprite } from "pixi.js";
import { Bunny } from './bunny';


export class RobotBunny extends Bunny {

  public health: number = 1;
  public speed: number = 300;

  private texturePosition: Rectangle = new Rectangle(2, 164, 26, 37);

  constructor(public posX: number, public posY: number) {
    super(posX, posY);

    this.setMesh(this.texturePosition);
  }
}
