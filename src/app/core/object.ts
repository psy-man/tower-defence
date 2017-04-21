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

  get centerX() {
    return this.x + this.width / 2;
  }

  get centerY() {
    return this.y + this.height / 2;
  }

  get center() {
    return {
      x: this.centerX,
      y: this.centerY
    }
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
