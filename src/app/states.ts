import { Text, Container } from 'pixi.js';

export class States extends Container {

  public money: number = 0;
  public moneyText: Text;

  public health: number = 20;

  public waveNumber = 1;

  constructor() {
    super();

    this.moneyText = new Text(`${this.money} points`, {
      align: 'right',
      fill: '#cc00ff',
      fontFamily: 'Arial',
      fontSize: '20px',
      stroke: '#FFFFFF',
      strokeThickness: 1
      }
    );

    this.moneyText.position.x = 1260;
    this.moneyText.position.y = 5;
    this.moneyText.anchor.x = 1;

    this.addChild(this.moneyText);

    setInterval(() => {
      this.money++;
    }, 1000);
  }

  render() {
    this.moneyText.text = `${this.money} points`;
  }
}
