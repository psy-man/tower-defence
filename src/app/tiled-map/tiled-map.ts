import { Container, utils } from "pixi.js";
import { Layer } from './layer';
import { Tileset } from './tileset';
import { Tile } from './tile';

export class TiledMap extends Container {

  private tilesets: Tileset[] = [];
  private layers: Layer[] = [];

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
      const {name, opacity} = layerData;
      const layer = new Layer(name, opacity);

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
    });
  }

  private findTilesetAndTexture(gid) {
    let tileset;

    for (const tile of this.tilesets) {
      tileset = tile;
      if(tileset.firstGID <= gid) { break; }
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
