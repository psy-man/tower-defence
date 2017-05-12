import { Point } from "pixi.js";
import { BaseObject } from '../objects/base-object';


export function getDistance(cannon: BaseObject, target: BaseObject) {
  const dx = Math.pow(target.centerX - cannon.x, 2);
  const dy = Math.pow(target.centerY - cannon.y, 2);

  return Math.sqrt(dx + dy);
}

export function getTargetAngle(cannon: BaseObject, target: BaseObject) {
  const dist_X = cannon.x - target.centerX;
  const dist_Y = cannon.y - target.centerY;

  return Math.atan2(dist_Y, dist_X) + Math.PI;
}

// Minkowski addition
export function hitTest(object1: BaseObject, object2: BaseObject) {
  const w = 0.8 * (object1.width + object2.width);
  const h = 0.8 * (object1.height + object2.height);

  const dx = object1.x - object2.centerX;
  const dy = object1.y - object2.centerY;

  return Math.abs(dx) <= w && Math.abs(dy) <= h;
}

export function getCenter(i: number, j: number): number {
  return i + j / 2;
}
