import { Point, Texture, Rectangle, Sprite } from "pixi.js";
import { Bunny } from './bunny';


export class RobotBunny extends Bunny {

  public health: number = 150;
  public speed: number = 1.2;

  constructor(public posX: number, public posY: number) {
    super(posX, posY);

    const texture = new Texture(this.textures.baseTexture, new Rectangle(2, 164, 26, 37));

    this.setMesh(texture).setPosition(posX, posY);
  }
}
