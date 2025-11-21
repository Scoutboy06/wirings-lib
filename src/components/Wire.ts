import { SvgGroup, SvgPath } from '@lib/utils/Svg';
import Vec2 from '@lib/utils/Vec2';
import Component from '.';
import type WiringDiagram from '..';
import type { GateInput, GateOutput } from './gates';

export class WireVertex {
  node?: GateInput | GateOutput;
  readonly _pos: Vec2;

  constructor(x: number, y: number, node: GateInput | GateOutput) {
    this._pos = new Vec2(x, y);
    this.node = node;
  }
}

export class Wire extends Component {
  vertices: WireVertex[] = [];
  state = false;
  
  constructor(diagram: WiringDiagram) {
    super(diagram);
  }

  via(node: GateInput | GateOutput): Wire {
    if (!node._pos) {
      throw new Error('Node position is not set');
    }
    this.vertices.push(new WireVertex(node._pos!.x, node._pos!.y, node));
    return this;
  }

  getSvgElement(): SVGGElement {
    const group = new SvgGroup();

    if(this.vertices.length === 0) {
      console.warn('Wire has no vertices');
      return group.createElement();
    }

    const path = new SvgPath()
      .moveTo(this.vertices[0]._pos.x, this.vertices[0]._pos.y)
      .cssClass('wire');
    
    this.vertices.slice(1).forEach(vertex => {
      path.lineTo(vertex._pos.x, vertex._pos.y);
    });

    group.addElement(path.createElement());

    return group.createElement();
  }
}