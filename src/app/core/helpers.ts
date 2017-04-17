import { Point } from "pixi.js";

export function getDistance(object1: Point, object2: Point) {
  return Math.abs(object2.x - object1.x) + Math.abs(object2.y - object1.y);
}

export function getTargetAngle(object: Point, target: Point) {
  const dist_X = object.x - target.x;
  const dist_Y = object.y - target.y;

  return Math.atan2(dist_Y, dist_X) + Math.PI;
}

export function hitTest(r1, r2) {
  let hit;
  let combinedHalfWidths;
  let combinedHalfHeights;
  let vx;
  let vy;

  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occuring. Check for a collision on the y axis
    hit = Math.abs(vy) < combinedHalfHeights;
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
}
