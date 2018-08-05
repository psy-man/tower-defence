import { Graphics, Point } from 'pixi.js';
import { getCenter } from '../core/helpers';
import App from '../app';

import { Bunny } from '../objects/bunnies/bunny';
import { RobotBunny } from '../objects/bunnies/robot-bunny';
import { BaseObject } from '../objects/base-object';


export class Spawn extends BaseObject {
  pathToDestination = [];
  bunnies: Bunny[] = [];

  private speed: number = 1000;

  constructor(public game: App, private data, private path) {
    super();

    if (this.game.debug) {
      const graphics = new Graphics();
      graphics.lineStyle(1, 0xFF0000);
      graphics.drawRect(data.x, data.y, data.width, data.height);

      this.addChild(graphics);
    }

    const {polyline: pathData, x: offsetX, y: offsetY} = path;

    for (let i = 1; i < pathData.length; i += 1) {
      const {x: x0, y: y0} = this.normalizePoint(pathData[i - 1], {offsetX, offsetY});
      const {x: x1, y: y1} = this.normalizePoint(pathData[i], {offsetX, offsetY});

      const graphics = new Graphics();
      graphics.lineStyle(1, 0xFF00FF);
      graphics.drawRect(x0, y0, 5, 5);
      this.addChild(graphics);

      const points = this.getLine([x0, y0], [x1, y1]);

      for (const [x, y] of points) {
        const graphics = new Graphics();
        graphics.lineStyle(1, 0xFF0000);
        graphics.drawRect(x, y, 1, 1);
        this.addChild(graphics);
      }

      this.pathToDestination.push(...points);
    }
  }

  normalizePoint({x, y}, {offsetX, offsetY}) {
    return {
      x: x + offsetX,
      y: y + offsetY
    };
  }

  getLine([x1, y1], [x2, y2]) {
    let q1 = x1;
    let q2 = y2;

    let x = x2 - x1;
    let y = y2 - y1;

    const max = Math.max(Math.abs(x), Math.abs(y));

    x /= max;
    y /= max;

    const points = [];

    for (let i = 0; i < max; i += 1) {
      q1 += x;
      q2 += -y;

      points.push([q1, q2]);
    }

    if (Math.abs(y2 - y1) > 10) {
      return points.reverse();
    }

    return points;
  };

  update() {
    this.bunnies = this.bunnies.filter(b => b.alpha > 0);
  }

  addBunnies(count) {
    const timer = setInterval(() => {
      if (count <= 0) {
        clearInterval(timer);
        return false;
      }

      this.addBunny();

      count--;
    }, this.speed);
  }

  addBunny() {
    const [x, y] = this.pathToDestination[0];

    const bunny = new RobotBunny(x, y);

    bunny.x -= bunny.width / 2;
    bunny.y -= bunny.height / 2;
    bunny.visible = false;

    let pos = 0;

    const timer = setInterval(() => {
      if (!this.pathToDestination[pos]) {
        clearInterval(timer);
        bunny.visible = false;
        return false;
      }

      const [x, y] = this.pathToDestination[pos];

      bunny.x = x - bunny.width / 2;
      bunny.y = y - bunny.height / 2;

      pos++;
      bunny.visible = true;

    }, bunny.speed);

    this.bunnies.push(bunny);
    this.game.app.stage.addChild(bunny);
  }

  get spawnPoint(): Point {
    const x = Math.round(getCenter(this.data.x, this.data.width));
    const y = Math.round(getCenter(this.data.y, this.data.height));

    return new Point(x, y);
  }
}
