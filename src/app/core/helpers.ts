import { Point } from "pixi.js";
import { GameObject } from './object';

export function getDistance(object1: Point, object2: Point) {
  return Math.abs(object2.x - object1.x) + Math.abs(object2.y - object1.y);
}

// TODO: need to completely rewrite this
export function getTargetAngle(object: GameObject, target: GameObject) {
  const o_X = object.x + object.width / 2;
  const o_Y = object.y + object.height / 2;

  const t_X = target.x + target.width / 2;
  const t_Y = target.y + target.height / 2;

  const dist_X = object.x - t_X;
  const dist_Y = object.y - t_Y;

  return Math.atan2(dist_Y, dist_X) + Math.PI;
}


export function hitTest(rect1, rect2) {
  return rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.height + rect1.y > rect2.y;
}
