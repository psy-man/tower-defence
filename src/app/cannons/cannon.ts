import { Point, Texture, Sprite } from "pixi.js";
import { GameObject } from '../core/object';


export class Cannon extends GameObject {

  public range: number = 100;
  public speed: number = 1;
  public damage: number = 10;

  constructor(public posX: number, public posY: number) {
    super();
  }

  setMesh(sprite) {
    this.mesh = sprite;

    return this;
  }
}
