import { Point, Texture, Sprite } from "pixi.js";
import { GameObject } from '../core/object';
import { Cannon } from '../cannons/cannon';


export class Bunny extends GameObject {

  public health: number = 100;
  public speed: number = 1;

  public angle = Math.PI;

  protected textures: Texture = Texture.fromImage(require('./../../assets/images/bunnys.png'));

  constructor(public posX: number, public posY: number) {
    super();
  }

  setMesh(sprite: Texture) {
    this.mesh = new Sprite(sprite);
    this.mesh.scale.set(0.7, 0.7);

    return this;
  }

  move() {
    this.angle += 0.005;

    this.getMesh().position.x = 400 + Math.cos(this.angle) * this.posX;
    this.getMesh().position.y = 300 + Math.sin(this.angle) * this.posX;
  }

  hit(cannon: Cannon) {
    this.health -= cannon.damage;

    if (this.health <= 0) {
      this.getMesh().alpha = 0;
    }
  }
}

// const bunny1 = new Texture(wabbitTexture.baseTexture, new Rectangle(2, 47, 26, 37));
// const bunny2 = new Texture(wabbitTexture.baseTexture, new Rectangle(2, 86, 26, 37));
// const bunny3 = new Texture(wabbitTexture.baseTexture, new Rectangle(2, 125, 26, 37));
// const bunny4 = new Texture(wabbitTexture.baseTexture, new Rectangle(2, 164, 26, 37));
// const bunny5 = new Texture(wabbitTexture.baseTexture, new Rectangle(2, 2, 26, 37));
//
