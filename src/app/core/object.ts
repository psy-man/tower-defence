import { Sprite } from "pixi.js";

export class GameObject {

  public mesh: Sprite;

  getMesh() {
    return this.mesh;
  }

  hide() {
    this.getMesh().alpha = 0;
  }



  get width() {
    return this.getMesh().width;
  }

  get height() {
    return this.getMesh().height;
  }


  get rotation() {
    return this.getMesh().rotation;
  }

  set rotation(angle: number) {
    this.getMesh().rotation = angle;
  }


  get x() {
    return this.getMesh().x;
  }
  set x(x: number) {
    this.getMesh().x = x;
  }

  get y() {
    return this.getMesh().y;
  }
  set y(y: number) {
    this.getMesh().y = y;
  }

  get centerX() {
    return this.x + this.width / 2;
  }

  get centerY() {
    return this.y + this.height / 2;
  }


  get alpha() {
    return this.getMesh().alpha;
  }

  initDraggable(centered: boolean = false) {
    this.mesh.interactive = true;

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

    this.getMesh()
      .on('mousedown', onDragStart)
      .on('mouseup', onDragEnd)
      .on('mouseupoutside', onDragEnd)
      .on('mousemove', onDragMove);
  }
}
