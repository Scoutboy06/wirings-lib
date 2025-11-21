import type { Theme } from '@lib/themes';
import { SvgCircle, SvgGroup, SvgRect, SvgText } from '@lib/utils/Svg';
import Vec2 from '@lib/utils/Vec2';
import Component from '.';
import type WiringDiagram from '..';

type Orientation = 'right'; // | 'left' | 'up' | 'down';

export default class NotGate extends Component {
  private _pos?: Vec2;
  private width: number;
  private height: number;
  private _orientation?: Orientation;

  constructor(diagram: WiringDiagram) {
    super(diagram);
    this.width = 40;
    this.height = 40;
  }

  pos(x: number, y: number): NotGate {
    this._pos = new Vec2(x, y);
    return this;
  }

  orientation(orientation: Orientation): NotGate {
    this._orientation = orientation;
    return this;
  }
  
  insert() {
    this.diagram.addComponent(this);
  }

  getSvgElement(theme: Theme): SVGGElement {
    if (!this._pos || !this._orientation) {
      throw new Error('Position and orientation must be set before inserting the component.');
    }

    const {x, y} = this._pos;
    const w = this.width;
    const h = this.height;

    const g = new SvgGroup();
    
    const rect = new SvgRect()
      .pos(x, y)
      .width(w * 0.8)
      .height(h)
      .fill(theme.component.fill)
      .stroke(theme.component.stroke);
    g.addElement(rect.createElement());

    const text = new SvgText('1')
      .pos(x + w*0.8 / 2, y + h / 2)
      .anchorX('middle')
      .anchorY('middle')
      .fontSize(24)
      .fill(theme.component.textColor);
    g.addElement(text.createElement());

    const circle = new SvgCircle()
      .center(x + w*0.9, y + h / 2)
      .radius(w*0.1)
      .fill(theme.component.fill)
      .stroke(theme.component.stroke);
    g.addElement(circle.createElement());

    return g.createElement();
  }
}