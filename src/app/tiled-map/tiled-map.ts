import { Container, Polygon, utils } from "pixi.js";
import { Layer } from './layer';
import { Tileset } from './tileset';
import { Tile } from './tile';
import { Spawn } from './spawn';
import { Destination } from './destination';

export class TiledMap extends Container {

  tilesets: Tileset[] = [];
  layers: Layer[] = [];
  spawns: Spawn[] = [];

  destination: Destination = null;

  pathMap: Polygon = null;

  constructor(public data) {
    super();

    this.processTilesets();
    this.processLayers();
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
          const spawn = new Spawn(object);

          this.spawns.push(spawn);
          this.addChild(spawn);
          break;
        }
        case 'destination': {
          const destination = new Destination(object);

          this.destination = destination;
          this.addChild(destination);
          break;
        }
      }
    });
  }

  private decodeData(data) {
    const decodedCharBuffer = new Buffer(data, 'base64');
    const result = [];

    for(let i = 0; i < decodedCharBuffer.length; i+=4) {
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
