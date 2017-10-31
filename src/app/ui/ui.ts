import { Application, Container, Graphics, Point, Sprite, utils } from 'pixi.js';
import { Button } from './buttons/button';


export class UI extends Container {
  constructor(public game: any) {
    super();

    const button = new Button(this, 17, 220);

    button
      .onClick(e => {
        console.log(e);
      })
      .onHover(
        () => console.log('in'),
        () => console.log('out')
      );

    this.addChild(button);

    // const cButton1 = new Button(this, 17, 220, {
    //   cannonType: CannonTypes.type1,
    //   backgroundColor: 0x9966FF,
    //   lineColor: 0xFF00FF
    // });
    // this.addChild(cButton1);
    //
    // const cButton2 = new Button(this, 17, 280, {
    //   cannonType: CannonTypes.type2,
    //   backgroundColor: 0x9966FF,
    //   lineColor: 0xFF00FF
    // });
    // this.addChild(cButton2);
  }

  // render() {
  //
  // }
}
