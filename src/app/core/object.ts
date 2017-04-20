import { Sprite } from "pixi.js";

export class GameObject {

  public mesh: Sprite;

  getMesh() {
    return this.mesh;
  }

  setPosition(x: number, y: number) {
    this.getMesh().x = x;
    this.getMesh().y = y;

    return this;
  }

  hide() {
    this.getMesh().alpha = 0;
  }

  get rotation() {
    return this.getMesh().rotation;
  }

  set rotation(angle: number) {
    this.getMesh().rotation = angle;
  }

  get position() {
    return this.getMesh().position;
  }

  get width() {
    return this.getMesh().width;
  }

  get height() {
    return this.getMesh().height;
  }

  get x() {
    return this.getMesh().x;
  }

  get y() {
    return this.getMesh().y;
  }

  get alpha() {
    return this.getMesh().alpha;
  }
}
