import { Point, Texture, Sprite } from "pixi.js";
import { GameObject } from '../../core/object';
import { Cannon } from '../cannons/cannon';


export class Bunny extends GameObject {

  public health: number = 100;
  public speed: number = 1;

  public angle = Math.PI;

  protected textures: Texture = Texture.fromImage(require('./../../../assets/images/bunnys.png'));

  constructor(public posX: number, public posY: number) {
    super();
  }

  setMesh(sprite: Texture) {
    this.mesh = new Sprite(sprite);
    this.mesh.interactive = true;
    // this.mesh.scale.set(0.7, 0.7);

    function onDragStart(event) {
      this.data = event.data;
      this.dragging = true;
      console.log(this.data);
    }

    function onDragEnd(event) {
      this.dragging = false;
      console.log(this.position);
    }

    function onDragMove(event) {
      if (this.dragging)
      {
        const newPosition = this.data.getLocalPosition(this.parent);
        this.position.x = newPosition.x - this.width / 2;
        this.position.y = newPosition.y - this.height / 2;
      }
    }

    this.mesh
      .on('mousedown', onDragStart)
      .on('mouseup', onDragEnd)
      .on('mouseupoutside', onDragEnd)
      .on('mousemove', onDragMove);

    return this;
  }

  move() {
    // this.angle += 0.01;
    //
    // this.getMesh().position.x = 400 + Math.cos(this.angle) * this.posX;
    // this.getMesh().position.y = 300 + Math.sin(this.angle) * this.posX;
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
