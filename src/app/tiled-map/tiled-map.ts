import { Container, Polygon, utils, Graphics } from 'pixi.js';
import { Grid, AStarFinder } from 'pathfinding';

import { Layer } from './layer';
import { Tileset } from './tileset';
import { Tile } from './tile';
import { Spawn } from './spawn';
import { Destination } from './destination';
import { Walkable } from '../core/enums';
import App from '../app';


export class TiledMap extends Container {
  tileWidth: number = 16;
  tileHeight: number = 16;

  tilesets: Tileset[] = [];
  layers: Layer[] = [];
  spawns: Spawn[] = [];

  destination: Destination = null;

  pathMap: Polygon = null;
  grid: Grid;

  gridDebug: Container = new Container();

  constructor(public game: App, public data) {
    super();

    this.processTilesets();
    this.processLayers();

    this.createPathGrid();
    this.calculatePaths();

    if (this.game.debug) {
      this.addChild(this.gridDebug);
    }
  }

  private processTilesets() {
    this.data.tilesets.forEach(tilesetData => {
      const texture = utils.TextureCache[tilesetData.name];

      if (!texture) {
        throw new Error(`${tilesetData.name} texture does not exist`);
      }

      const tileset = new Tileset(tilesetData, texture);
      this.tilesets.push(tileset);
    });
  }

  private processLayers() {
    this.data.layers.forEach(layerData => {
      switch (layerData.type) {
        case 'tilelayer':
          return this.processTileLayer(layerData);
        case 'objectgroup':
          return this.processObjects(layerData);
        default:
          console.error(`${layerData.type} is not supported`);
          break;
      }
    });
  }

  private createPathGrid() {
    const matrix = [];

    for (let y = 0, dy = 0; y < this.game.HEIGHT; y += this.tileHeight, dy++) {
      matrix[dy] = [];
      for (let x = 0, dx = 0; x < this.game.WIDTH; x += this.tileWidth, dx++) {
        const xx = x + this.tileWidth / 2;
        const yy = y + this.tileHeight / 2;

        matrix[dy][dx] = this.pathMap.contains(xx, yy) ? Walkable.yes : Walkable.no;

        if (this.game.debug && matrix[dy][dx] === Walkable.yes) {
          const g = new Graphics();
          g.lineStyle(1, 0x000000, 0.2);
          g.drawRect(xx, yy, 1, 1);
          this.gridDebug.addChild(g);
        }
      }
    }

    this.grid = new Grid(matrix);
  }

  private calculatePaths() {
    const finder = new AStarFinder({
      allowDiagonal: true,
      dontCrossCorners: true
      // Heuristic: Heuristic.chebyshev
    });

    this.spawns.forEach(spawn => {
      const {x, y} = spawn.spawnPoint;

      let xx = Math.round(x / this.tileWidth);
      let yy = Math.round(y / this.tileHeight);

      if (xx === 80) {
        xx = 79;
      }

      if (yy === 48) {
        yy = 47;
      }

      spawn.pathToDestination = finder.findPath(xx, yy, 42, 22, this.grid.clone());

      if (this.game.debug) {
        spawn.pathToDestination.forEach(([x, y]) => {
          const g = new Graphics();
          g.lineStyle(1, 0xFF0000);
          g.drawRect(x * 16 + 8, y * 16 + 8, 1, 1);

          this.gridDebug.addChild(g);
        });
      }
    });
  }

  private processTileLayer(layerData) {
    const {name, visible} = layerData;
    const layer = new Layer(name, visible);

    if (layerData.encoding === 'base64') {
      layerData.data = this.decodeData(layerData.data);
    }

    for (let x = 0; x < layerData.width; x++) {
      for (let y = 0; y < layerData.height; y++) {
        const index = x + (y * layerData.width);
        const gid = layerData.data[index];

        if (gid !== 0) {
          const tilesetAndTexture = this.findTilesetAndTexture(gid);
          const texture = tilesetAndTexture.texture;

          const tile = new Tile(gid, texture);

          tile.x = this.computeXCoordinate(x, this.data.tilewidth);
          tile.y = this.computeYCoordinate(y, this.data.tileheight);

          layer.addChild(tile);
        }
      }
    }

    this.layers[layer.name] = layer;
    this.addChild(layer);
  }

  private processObjects(layerData) {
    layerData.objects.forEach(object => {
      switch (object.name) {
        case 'path-map': {
          const points = [];

          object.polygon.forEach(({x, y}) => {
            points.push(x + object.x);
            points.push(y + object.y);
          });

          this.pathMap = new Polygon(points);
          break;
        }
        case 'spawn': {
          const spawn = new Spawn(this.game, object);

          this.spawns.push(spawn);
          this.addChild(spawn);
          break;
        }
        case 'destination': {
          const destination = new Destination(this.game, object);

          this.destination = destination;
          this.addChild(destination);
          break;
        }
        default:
          console.error(`${object.name} is not supported`);
          break;
      }
    });
  }

  private decodeData(data) {
    const decodedCharBuffer = new Buffer(data, 'base64');
    const result = [];

    for (let i = 0; i < decodedCharBuffer.length; i += 4) {
      result.push(decodedCharBuffer.readInt32LE(i));
    }

    return result;
  }

  private findTilesetAndTexture(gid) {
    let tileset;

    for (const tile of this.tilesets) {
      if (gid < tile.firstGID || gid > tile.firstGID + tile.tileCount) {
        continue;
      }

      tileset = tile;
      break;
    }

    const ix = gid - tileset.firstGID;

    return {tileset, texture: tileset.textures[ix]};
  }

  private computeXCoordinate(i, tileWidth) {
    return i * tileWidth;
  }

  private computeYCoordinate(j, tileHeight) {
    return j * tileHeight + tileHeight;
  }
}
