import { Application, Container, Graphics, Point } from 'pixi.js';
import { SimpleCannon } from '../objects/cannons/simple-cannon';
import { Cannon } from '../objects/cannons/cannon';

export class UI extends Container {

  private adding = false;

  constructor(public app: any) {
    super();

    app.app.stage.on('pointerdown', e => {
      if (this.adding) {
        const position: Point = e.data.global;

        const cannon = new SimpleCannon(this.app.app.stage, position.x, position.y);
        this.app.addCannon(cannon);

        this.adding = false;
      } else {
        cannonSimple.alpha = 1;
        this.adding = true;
      }
    });

    const cannonSimple = new Graphics();
    cannonSimple.interactive = true;
    cannonSimple.buttonMode = true;
    cannonSimple.beginFill(0x9966FF);
    cannonSimple.lineStyle(2, 0xFF00FF, 1);
    cannonSimple.drawRoundedRect(17, 220, 40, 40, 5);
    cannonSimple.endFill();

    cannonSimple.on('pointerdown', () => {
      cannonSimple.alpha = 0.6;
    });

    // cannonSimple.on('pointerup', () => {
    //   cannonSimple.alpha = 1;
    //
    //   this.adding = true;
    // });

    this.addChild(cannonSimple);
  }
}
