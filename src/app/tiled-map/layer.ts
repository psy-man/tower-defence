import { Container } from 'pixi.js';


export class Layer extends Container {
  constructor(public name: string, public opacity: number) {
    super();
  }
}
