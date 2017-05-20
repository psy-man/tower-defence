import {Texture, Sprite, Rectangle} from 'pixi.js';
import {BaseObject} from '../base-object';
import {Cannon} from '../cannons/cannon';


export class Bunny extends BaseObject {

  public health: number = 100;
  public speed: number = 1000;

  protected textures: Texture = Texture.fromImage(require('./../../../assets/images/bunnys.png'));

  constructor(public texturePosition: Rectangle, public posX: number, public posY: number) {
    super();

    this.x = this.posX;
    this.y = this.posY;

    const texture = new Texture(this.textures.baseTexture, texturePosition);

    const sprite = new Sprite(texture);
    sprite.scale.set(0.5, 0.5);

    this.addChild(sprite);

    super.initDraggable();
  }

  hit(cannon: Cannon) {
    this.health -= cannon.damage;

    if (this.health <= 0) {
      this.hide();
    }
  }
}

// Const bunny1 = new Texture(wabbitTexture.baseTexture, new Rectangle(2, 47, 26, 37));
// const bunny2 = new Texture(wabbitTexture.baseTexture, new Rectangle(2, 86, 26, 37));
// const bunny3 = new Texture(wabbitTexture.baseTexture, new Rectangle(2, 125, 26, 37));
// const bunny4 = new Texture(wabbitTexture.baseTexture, new Rectangle(2, 164, 26, 37));
// const bunny5 = new Texture(wabbitTexture.baseTexture, new Rectangle(2, 2, 26, 37));
//
