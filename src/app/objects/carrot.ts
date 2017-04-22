import { Point, Texture, Sprite } from "pixi.js";
import { GameObject } from '../core/object';
import { Bunny } from './bunnies/bunny';
import { getTargetAngle, hitTest } from '../core/helpers';
import { Cannon } from './cannons/cannon';

export class Carrot extends GameObject {

  public range: number = 100;
  public speed: number = 2;

  public initialWidth: number = 20;
  public initialHeight: number = 6;

  public angleCorrection: number = - 0.1;
  public distanceFromCannon: number = 30;


  constructor(public cannon: Cannon, public target: Bunny) {
    super();

    const texture = Texture.fromImage(require('../../assets/images/carrot.png'));

    this.mesh = new Sprite(texture);
    this.mesh.rotation = cannon.rotation;
    this.mesh.interactive = true;

    // this.mesh.scale.set(0.5, 0.5);

    this.mesh.width = this.initialWidth;
    this.mesh.height = this.initialHeight;

    this.setPosition(
      cannon.x + Math.cos(cannon.rotation + this.angleCorrection) * this.distanceFromCannon,
      cannon.y + Math.sin(cannon.rotation + this.angleCorrection) * this.distanceFromCannon
    );


    function onDragStart(event) {
      this.data = event.data;
      this.dragging = true;
    }

    function onDragEnd(event) {
      this.dragging = false;
      console.log(this.position);
    }

    function onDragMove(event) {
      if (this.dragging) {
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
  }

  move() {
    this.getMesh().rotation = getTargetAngle(this, this.target);

    this.getMesh().position.x += Math.cos(this.getMesh().rotation) * this.speed;
    this.getMesh().position.y += Math.sin(this.getMesh().rotation) * this.speed;

    if (hitTest(this, this.target)) {
      this.target.hit(this.cannon);
      this.hide();
    }
  }
}
