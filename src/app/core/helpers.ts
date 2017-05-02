import { Point } from "pixi.js";
import { GameObject } from '../objects/object';

export function getDistance(cannon: GameObject, target: GameObject) {
  const dx = Math.pow(target.centerX - cannon.x, 2);
  const dy = Math.pow(target.centerY - cannon.y, 2);

  return Math.sqrt(dx + dy);
}

export function getTargetAngle(cannon: GameObject, target: GameObject) {
  const dist_X = cannon.x - target.centerX;
  const dist_Y = cannon.y - target.centerY;

  return Math.atan2(dist_Y, dist_X) + Math.PI;
}

// Minkowski addition
export function hitTest(A, B) {
  const w = 0.8 * (A.width + B.width);
  const h = 0.8 * (A.height + B.height);

  const dx = A.x - B.centerX;
  const dy = A.y - B.centerY;

  return Math.abs(dx) <= w && Math.abs(dy) <= h;
}


export function getCenterX(x: number, width: number): number {
  return x + width / 2;
}

export function getCenterY(y: number, height: number): number {
  return y + height / 2;
}
