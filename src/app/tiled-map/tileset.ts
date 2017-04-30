import { Container, Texture } from 'pixi.js';


export class Tileset {
  name: string;
  firstGID: number;

  tileCount: number;

  imageWidth: number;
  imageHeight: number;

  tileWidth: number;
  tileHeight: number;

  margin: number;
  spacing: number;

  textures: Texture[] = [];

  constructor(public data, public texture) {

    this.name = data.name;
    this.firstGID = data.firstgid;

    this.tileCount = data.tilecount;

    this.imageWidth = data.imagewidth;
    this.imageHeight = data.imageheight;

    this.tileHeight = data.tileheight;
    this.tileWidth = data.tilewidth;

    this.margin = data.margin;
    this.spacing = data.spacing;

    for (let y = this.margin; y < this.imageHeight; y += this.tileHeight + this.spacing) {
      for (let x = this.margin; x < this.imageWidth; x += this.tileWidth + this.spacing) {
        const t = texture.clone();
        const frame = t.frame;

        frame.width = this.tileWidth;
        frame.height = this.tileHeight;
        frame.x = x;
        frame.y = y;

        t.frame = frame;

        this.textures.push(t);
      }
    }
  }
}
