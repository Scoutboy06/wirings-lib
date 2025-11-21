import type Component from './components';
import AndGate from './components/AndGate';
import { GateInput, GateOutput } from './components/gates';
import NotGate from './components/NotGate';
import { Wire } from './components/Wire';
import { lightTheme, type Theme } from './themes';
import { SVG } from './utils/Svg';

export default class WiringDiagram {
  private width: number;
  private height: number;
  private components: Component[] = [];
  private _theme: Theme = lightTheme;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.components = [];
  }
  
  draw(targetSelector: string) {
    const target = document.querySelector(targetSelector);
    if (!target) {
      throw new Error(`Target element not found for selector: ${targetSelector}`);
    }

    const svg = new SVG(this.width, this.height);

    const [wires, nonWires] = this.components.reduce<[Component[], Component[]]>((acc, component) => {
      if (component instanceof Wire) {
        acc[0].push(component);
      } else {
        acc[1].push(component);
      }
      return acc;
    }, [[], []]);

    wires.forEach(component => {
      console.log(component);
      svg.addElement(component.getSvgElement());
    });
    nonWires.forEach(component => {
      console.log(component);
      svg.addElement(component.getSvgElement());
    });

    const defsElement = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .component-body {
        fill: ${this._theme.component.fill};
        stroke: ${this._theme.component.stroke};
      }

      .component-text {
        fill: ${this._theme.component.textColor};
        font-size: 24px;
        pointer-events: none;
      }

      .wire {
        stroke: ${this._theme.wire.stroke};
        stroke-width: ${this._theme.wire.strokeWidth}px;
        fill: none;
        filter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.7));
      }
    `;
    defsElement.appendChild(styleElement);
    svg.addElement(defsElement);

    svg.appendTo(target as HTMLElement);
  }

  addComponent(component: Component) {
    this.components.push(component);
  }

  notGate(): NotGate {
    return new NotGate(this);
  }

  andGate(): AndGate {
    return new AndGate(this);
  }

  connect(input: GateInput, output: GateOutput): void;
  connect(output: GateOutput, input: GateInput): void;
  connect(a: GateInput | GateOutput, b: GateInput | GateOutput) {
    let input: GateInput;
    let output: GateOutput;

    if (a instanceof GateInput && b instanceof GateOutput) {
      input = a;
      output = b;
    } else if (a instanceof GateOutput && b instanceof GateInput) {
      input = b;
      output = a;
    } else {
      throw new Error('connect requires one GateInput and one GateOutput');
    }

    const wire = new Wire(this).via(input).via(output);
    this.addComponent(wire);
  }

  setTheme(theme: Theme) {
    this._theme = theme;
  }
}
