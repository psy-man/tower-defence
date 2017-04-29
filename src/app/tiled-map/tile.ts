import { Sprite, Texture } from 'pixi.js';

export class Tile extends Sprite {
  constructor(
    public gid: number,
    texture: Texture
  ) {
    super(texture);

    this.anchor.set(0, 1);
  }
}
