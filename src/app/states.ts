import { Text, Container } from 'pixi.js';

export class States extends Container {

  public money: number = 0;
  public moneyText: Text;

  public health: number = 20;
  public healthText: Text;

  public waveNumber = 1;

  constructor() {
    super();

    this.renderMoneyText();
    this.renderHealthText();
  }

  render() {
    this.moneyText.text = `${this.money} points`;
    this.healthText.text = `${this.health} health`;
  }

  private renderMoneyText() {
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
  }

  private renderHealthText() {
    this.healthText = new Text(`${this.health} health`, {
        align: 'right',
        fill: '#070aff',
        fontFamily: 'Arial',
        fontSize: '20px',
        stroke: '#FFFFFF',
        strokeThickness: 1
      }
    );

    this.healthText.position.x = 1260;
    this.healthText.position.y = 30;
    this.healthText.anchor.x = 1;

    this.addChild(this.healthText);
  }
}
