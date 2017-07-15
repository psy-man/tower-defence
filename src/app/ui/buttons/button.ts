import { Container, Graphics, Point } from 'pixi.js';
import { CannonType1 } from '../../objects/cannons/cannon-type-1';
import { UI } from '../ui';
import { Cannon } from '../../objects/cannons/cannon';
import { CannonFactory } from '../../objects/cannons/cannon.factory';
import { CannonTypes } from '../../objects/cannons/cannon-types.enum';


export class Button extends Container {
  private adding = false;
  private canBuild: boolean = false;

  constructor(public ui: UI, public x: number, public y: number, public params: {
    cannonType: CannonTypes,
    backgroundColor: number,
    lineColor: number
  }) {
    super();

    const cannonSimpleButton = new Graphics();
    cannonSimpleButton.interactive = true;
    cannonSimpleButton.buttonMode = true;
    cannonSimpleButton.beginFill(params.backgroundColor);
    cannonSimpleButton.lineStyle(2, params.lineColor, 1);
    cannonSimpleButton.drawRoundedRect(0, 0, 40, 40, 5);
    cannonSimpleButton.endFill();

    const circleContainer = new Container();

    const circle = new Graphics();
    circle.interactive = true;
    circle.buttonMode = true;
    circle.lineStyle(2, params.lineColor, 1);
    circle.drawCircle(0, 0, 30);
    circle.endFill();

    // circleContainer.position.set(300, 200);
    circleContainer.alpha = 0;

    this.addChild(circle);

    const onMouseMove = e => {
      circleContainer.position = e.data.global;

      this.canBuild = this.ui.game.map.pathMap.contains(circleContainer.x, circleContainer.y);

      circleContainer.alpha = this.canBuild ? 1 : 0.3;
    };

    this.ui.game.app.stage.on('pointerdown', e => {
      if (this.adding && this.canBuild) {
        const position: Point = e.data.global;


        const cannon = new CannonFactory(this.params.cannonType, this.ui.game, position.x, position.y);
        this.ui.game.addCannon(cannon);

        this.adding = false;
        cannonSimpleButton.alpha = 1;

        this.ui.game.app.stage.off('mousemove', onMouseMove);
        circleContainer.alpha = 0;
      }
    });

    cannonSimpleButton.on('pointerdown', e => {
      e.stopPropagation();
      console.log(1);

      cannonSimpleButton.alpha = 0.6;
      this.adding = true;

      this.ui.game.app.stage.on('mousemove', onMouseMove);

      circleContainer.position = e.data.global;
      circleContainer.alpha = 1;
    });

    this.addChild(cannonSimpleButton);
  }

  onClick(callback: () => void) {
    callback();
  }
}
