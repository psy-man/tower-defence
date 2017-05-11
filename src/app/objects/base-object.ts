import { Sprite, Container } from "pixi.js";
import { getCenter } from '../core/helpers';

export class BaseObject extends Container {
  constructor() {
    super();
  }

  hide() {
    this.alpha = 0;
  }

  get centerX() {
    return getCenter(this.x, this.width);
  }

  get centerY() {
    return getCenter(this.y, this.height);
  }

  initDraggable(centered: boolean = false) {
    this.interactive = true;

    function onDragStart(event) {
      this.data = event.data;
      this.dragging = true;
    }

    function onDragEnd() {
      this.dragging = false;

      console.log(this.position);
    }

    function onDragMove() {
      if (this.dragging) {
        const newPosition = this.data.getLocalPosition(this.parent);

        this.position.x = centered ? newPosition.x : newPosition.x - this.width / 2;
        this.position.y = centered ? newPosition.y : newPosition.y - this.height / 2;
      }
    }

    this
      .on('mousedown', onDragStart)
      .on('mouseup', onDragEnd)
      .on('mouseupoutside', onDragEnd)
      .on('mousemove', onDragMove);
  }
}
