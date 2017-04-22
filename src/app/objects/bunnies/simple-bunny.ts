import { Point, Texture, Rectangle, Sprite } from "pixi.js";
import { Bunny } from './bunny';


export class SimpleBunny extends Bunny {

  public health: number = 100;
  public speed: number = 1.2;

  private texturePosition: Rectangle = new Rectangle(2, 2, 26, 37);

  constructor(public posX: number, public posY: number) {
    super(posX, posY);

    this.setMesh(this.texturePosition);
  }
}
