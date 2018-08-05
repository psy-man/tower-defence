import { Container, Polygon, utils, Graphics, Point } from 'pixi.js';
import { Grid, AStarFinder } from 'pathfinding';

import { Layer } from './layer';
import { Tileset } from './tileset';
import { Tile } from './tile';
import { Spawn } from './spawn';
import { Destination } from './destination';
import App from '../app';


export class TiledMap extends Container {
  tileWidth: number = 16;
  tileHeight: number = 16;

  tilesets: Tileset[] = [];
  layers: Layer[] = [];

  spawn: Spawn = null;
  destination: Destination = null;

  constructor(public game: App, public data) {
    super();

    this.processTilesets();
    this.processLayers();
    //
    // this.createPathGrid();
    // this.calculatePaths();
    //
    // if (this.game.debug) {
    //   this.addChild(this.gridDebug);
    // }
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
    const pathData  = layerData.objects.find(obj => obj.name === 'path');
    const spawnData  = layerData.objects.find(obj => obj.name === 'spawn');
    const destinationData  = layerData.objects.find(obj => obj.name === 'destination');

    this.spawn = new Spawn(this.game, spawnData, pathData);
    this.addChild(this.spawn);
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
