import { Point, Texture, Sprite, Rectangle } from "pixi.js";
import { GameObject } from '../object';
import { Cannon } from '../cannons/cannon';


export class Bunny extends GameObject {

  public health: number = 1;
  public speed: number = 1000;

  protected textures: Texture = Texture.fromImage(require('./../../../assets/images/bunnys.png'));

  constructor(public posX: number, public posY: number) {
    super();
  }

  setMesh(position: Rectangle) {
    const texture = new Texture(this.textures.baseTexture, position);

    this.mesh = new Sprite(texture);

    this.x = this.posX;
    this.y = this.posY;
    this.mesh.scale.set(0.5, 0.5);

    // this.initDraggable();
  }

  move() {

  }

  hit(cannon: Cannon) {
    this.health -= cannon.damage;

    if (this.health <= 0) {
      this.hide();
    }
  }
}

// const bunny1 = new Texture(wabbitTexture.baseTexture, new Rectangle(2, 47, 26, 37));
// const bunny2 = new Texture(wabbitTexture.baseTexture, new Rectangle(2, 86, 26, 37));
// const bunny3 = new Texture(wabbitTexture.baseTexture, new Rectangle(2, 125, 26, 37));
// const bunny4 = new Texture(wabbitTexture.baseTexture, new Rectangle(2, 164, 26, 37));
// const bunny5 = new Texture(wabbitTexture.baseTexture, new Rectangle(2, 2, 26, 37));
//
