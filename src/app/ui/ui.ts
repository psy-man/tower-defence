import { Application, Container, Graphics, Point } from 'pixi.js';
import { SimpleCannon } from '../objects/cannons/simple-cannon';
import { Cannon } from '../objects/cannons/cannon';

// TODO: need to refactor this
// TODO: need to add Button, GameState classes
export class UI extends Container {

  private adding = false;

  private canBuild: boolean = false;

  constructor(public game: any) {
    super();

    const circleContainer = new Container();

    const circle = new Graphics();
    circle.interactive = true;
    circle.buttonMode = true;
    circle.lineStyle(2, 0xFF00FF, 1);
    circle.drawCircle(0, 0, 30);
    circle.endFill();

    circleContainer.position.set(300, 200);
    circleContainer.alpha = 0;

    circleContainer.addChild(circle);

    this.addChild(circleContainer);

    const onMouseMove = e => {
      circleContainer.position = e.data.global;

      this.canBuild = game.map.pathMap.contains(circleContainer.x, circleContainer.y);

      circleContainer.alpha = this.canBuild ? 1 : 0.3;
    };


    game.app.stage.on('pointerdown', e => {
      if (this.adding && this.canBuild) {
        const position: Point = e.data.global;

        const cannon = new SimpleCannon(this.game.app.stage, position.x, position.y);
        this.game.addCannon(cannon);

        this.adding = false;
        cannonSimpleButton.alpha = 1;

        game.app.stage.off('mousemove', onMouseMove);
        circleContainer.alpha = 0;
      }
    });

    const cannonSimpleButton = new Graphics();
    cannonSimpleButton.interactive = true;
    cannonSimpleButton.buttonMode = true;
    cannonSimpleButton.beginFill(0x9966FF);
    cannonSimpleButton.lineStyle(2, 0xFF00FF, 1);
    cannonSimpleButton.drawRoundedRect(17, 220, 40, 40, 5);
    cannonSimpleButton.endFill();

    cannonSimpleButton.on('pointerdown', e => {
      e.stopPropagation();

      cannonSimpleButton.alpha = 0.6;
      this.adding = true;

      game.app.stage.on('mousemove', onMouseMove);

      circleContainer.position = e.data.global;
      circleContainer.alpha = 1;
    });

    this.addChild(cannonSimpleButton);
  }
}
