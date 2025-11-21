import type { Theme } from '@lib/themes';
import { SvgGroup, SvgRect, SvgText } from '@lib/utils/Svg';
import type Vec2 from '@lib/utils/Vec2';
import Component from '.';
import type WiringDiagram from '..';
import { GateInput, GateOutput } from './gates';

type Orientation = 'right'; // | 'left' | 'up' | 'down';

export default class AndGate extends Component {
  private _pos?: Vec2;
  private width: number
  private height: number
  private _orientation?: Orientation = 'right';

  constructor(diagram: WiringDiagram) {
    super(diagram);
    this.width = 40;
    this.height = 40;
  }

  pos(x: number, y: number): AndGate {
    this._pos = {x, y};
    return this;
  }

  orientation(orientation: Orientation): AndGate {
    this._orientation = orientation;
    return this;
  }

  insert(): AndGate {
    this.diagram.addComponent(this);
    return this;
  }

  inputs(idx: number): GateInput | null {
    if (!this._pos) {
      throw new Error('Position must be set before getting inputs.');
    }
    if (idx === 0) {
      return new GateInput(this).pos(this._pos.x+2, this._pos.y + this.height / 3);
    }
    if (idx === 1) {
      return new GateInput(this).pos(this._pos.x+2, this._pos.y + (2 * this.height) / 3);
    }
    return null;
  }

  output(): GateOutput {
    if (!this._pos) {
      throw new Error('Position must be set before getting output.');
    }
    return new GateOutput(this).pos(this._pos.x + this.width - 2, this._pos.y + this.height / 2);
  }

  getSvgElement(): SVGGElement {
    if (!this._pos || !this._orientation) {
      throw new Error('Position and orientation must be set before inserting the component.');
    }

    const group = new SvgGroup();

    const {x, y} = this._pos;
    const w = this.width;
    const h = this.height;

    const rect = new SvgRect()
      .pos(x, y)
      .size(w, h)
      .cssClass('component-body');
    group.addElement(rect.createElement());

    const text = new SvgText('&')
      .pos(x + w / 2, y + h / 2)
      .anchorX('middle')
      .anchorY('middle')
      .cssClass('component-text');
    group.addElement(text.createElement());

    return group.createElement();
  }
}