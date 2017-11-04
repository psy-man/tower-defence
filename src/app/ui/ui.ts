import { Application, Container, Graphics, Point, Sprite, Texture, utils } from 'pixi.js';
import { Button } from './buttons/button';
import { circleButton } from './buttons/buttons-list';


export class UI extends Container {
  constructor(public game: any) {
    super();

    const texture: Texture = utils.TextureCache.Button;
    const list: any = {};

    for (const [key, value] of Object.entries(circleButton.primary)) {
      const t = texture.clone();
      const frame = t.frame;
      frame.width = circleButton.width;
      frame.height = circleButton.height;
      frame.x = value.x;
      frame.y = value.y;
      t.frame = frame;

      list[key] = t;
    }

    const button = new Button(list, 10, 210);

    button
      .onClick(e => {
        console.log(e);
      });

    this.addChild(button);


    const button1 = new Button(list, 10, 260);
    button1.disabled = true;
    this.addChild(button1);

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
