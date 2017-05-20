import { Rectangle } from 'pixi.js';
import { Bunny } from './bunny';


export class SpaceBunny extends Bunny {

  public health: number = 120;
  public speed: number = 1.2;

  constructor(public posX: number, public posY: number) {
    super(new Rectangle(2, 2, 26, 37), posX, posY);
  }
}

