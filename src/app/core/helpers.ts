import { Point } from "pixi.js";
import { GameObject } from './object';

export function getDistance(cannon: GameObject, target: GameObject) {
  return Math.sqrt(
    Math.pow(target.centerX - cannon.x, 2) + Math.pow(target.centerY - cannon.y, 2)
  );
}

export function getTargetAngle(cannon: GameObject, target: GameObject) {
  const dist_X = cannon.x - target.centerX;
  const dist_Y = cannon.y - target.centerY;

  return Math.atan2(dist_Y, dist_X) + Math.PI;
}

// Minkowski addition
export function hitTest(A, B) {
  const w = 0.5 * (A.width + B.width);
  const h = 0.5 * (A.height + B.height);

  const dx = A.centerX - B.centerX;
  const dy = A.centerY - B.centerY;

  return Math.abs(dx) <= w && Math.abs(dy) <= h;
}
