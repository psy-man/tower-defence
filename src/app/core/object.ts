import { Sprite } from "pixi.js";

export class GameObject {

  public mesh: Sprite;

  getMesh() {
    return this.mesh;
  }

  setPosition(x: number, y: number) {
    this.getMesh().position.x = x;
    this.getMesh().position.y = y;

    return this;
  }

  get rotation() {
    return this.getMesh().rotation;
  }

  get position() {
    return this.getMesh().position;
  }

  get positionX() {
    return this.position.x;
  }

  get positionY() {
    return this.position.y;
  }
}
