import { Container, Graphics, Point, Sprite, Texture, utils } from 'pixi.js';
import { UI } from '../ui';
import { circleButton } from './buttons-list';


export class Button extends Sprite {
  private onClickCallback: (e) => void;
  private onOverCallback: (e) => void;
  private onOutCallback: (e) => void;

  constructor(public ui: UI, public x: number, public y: number) {
    super();
    this.interactive = true;
    this.buttonMode = true;
    this.width = 45;
    this.height = 45;

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

    this.texture = list.normal;

    this
      .on('pointerdown', e => {
        e.stopPropagation();

        this.texture = list.click;
      })
      .on('pointerup', e => {
        e.stopPropagation();

        this.texture = list.normal;
        this.onClickCallback(e);
      })
      .on('pointerover', e => {
        e.stopPropagation();

        this.texture = list.hover;
        this.onOverCallback(e);
      })
      .on('pointerout', e => {
        e.stopPropagation();

        this.texture = list.normal;
        this.onOutCallback(e);
      });
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
