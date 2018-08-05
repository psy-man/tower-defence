import { Container, Point, Sprite, Texture, utils } from 'pixi.js';


export class Button extends Sprite {
  private onClickCallback: (e) => void = this.stub.bind(this, 'click');

  private onOverCallback: (e) => void;
  private onOutCallback: (e) => void;

  private disabledStatus = false;

  constructor(public textures: any, public x: number, public y: number) {
    super();
    this.interactive = true;
    this.buttonMode = true;
    this.width = 45;
    this.height = 45;

    this.texture = textures.normal;

    this
      .on('pointerdown', e => {
        e.stopPropagation();

        if (this.disabledStatus) {
          return false;
        }

        this.texture = textures.click;
      })
      .on('pointerup', e => {
        e.stopPropagation();

        if (this.disabledStatus) {
          return false;
        }

        this.texture = textures.normal;
        this.onClickCallback(e);
      })
      .on('pointerover', e => {
        e.stopPropagation();

        if (this.disabledStatus) {
          return false;
        }

        this.texture = textures.hover;

        if (this.onOverCallback) {
          this.onOverCallback(e);
        }
      })
      .on('pointerout', e => {
        e.stopPropagation();

        if (this.disabledStatus) {
          return false;
        }

        this.texture = textures.normal;

        if (this.onOutCallback) {
          this.onOutCallback(e);
        }
      });
  }

  set disabled(value: boolean) {
    this.disabledStatus = value;

    this.texture = this.textures[value ? 'disabled' : 'normal'];
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

  stub(eventName: string) {
    return console.error(`Callback "${eventName}" is not defined`);
  }
}
