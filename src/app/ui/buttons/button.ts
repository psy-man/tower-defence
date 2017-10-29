import { Container, Graphics, Point } from 'pixi.js';
import { UI } from '../ui';


export class Button extends Container {
  private onClickCallback: (e) => void;
  private onOverCallback: (e) => void;
  private onOutCallback: (e) => void;

  constructor(public ui: UI, public x: number, public y: number) {
    super();

    const button = new Graphics();
    button.interactive = true;
    button.buttonMode = true;

    button.beginFill(0x9966FF);
    button.lineStyle(2, 0xFF00FF, 1);
    button.drawRoundedRect(0, 0, 40, 40, 5);
    button.endFill();

    button
      .on('pointerup', e => {
        e.stopPropagation();

        this.onClickCallback(e);
      })
      .on('pointerover', e => {
        e.stopPropagation();

        this.onOverCallback(e);
      })
      .on('pointerout', e => {
        e.stopPropagation();

        this.onOutCallback(e);
      });


    this.addChild(button);
  }

  onClick(onClickCallback: (e) => void) {
    this.onClickCallback = onClickCallback;

    return this;
  }

  onHover(onOverCallback: (e?) => void, onOutCallback: (e?) => void) {
    this.onOverCallback = onOverCallback;
    this.onOutCallback = onOutCallback;

    return this;
  }
}
