import { Application, Container, Graphics, Point } from 'pixi.js';
import { Button } from './buttons/button';
import { CannonTypes } from '../objects/cannons/cannon-types.enum';


export class UI extends Container {
  constructor(public game: any) {
    super();

    const cButton1 = new Button(this, 17, 220, {
      cannonType: CannonTypes.type1,
      backgroundColor: 0x9966FF,
      lineColor: 0xFF00FF
    });
    this.addChild(cButton1);

    const cButton2 = new Button(this, 17, 280, {
      cannonType: CannonTypes.type2,
      backgroundColor: 0x9966FF,
      lineColor: 0xFF00FF
    });
    this.addChild(cButton2);
  }

  // render() {
  //
  // }
}
