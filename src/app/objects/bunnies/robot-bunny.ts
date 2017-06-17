import { Rectangle } from 'pixi.js';
import { Bunny } from './bunny';


export class RobotBunny extends Bunny {

  public health: number = 2;
  public speed: number = 200;

  constructor(public posX: number, public posY: number) {
    super(new Rectangle(2, 164, 26, 37), posX, posY);
  }
}
