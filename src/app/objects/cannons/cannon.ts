import { Point, Texture, Sprite } from "pixi.js";
import { GameObject } from '../../core/object';
import { Carrot } from '../carrot';



export class Cannon extends GameObject {

  public range: number = 100;
  public speed: number = 1;
  public damage: number = 1;

  public carrots: Carrot[] = [];

  constructor(public posX: number, public posY: number) {
    super();
  }

  setMesh(sprite) {
    this.mesh = sprite;

    return this;
  }

  addCarrot(carrot: Carrot) {
    this.carrots.push(carrot);
  }
}
