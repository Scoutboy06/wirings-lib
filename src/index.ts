import type Component from './components';
import NotGate from './components/NotGate';
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
    this.components.forEach(component => {
      console.log(component);
      svg.addElement(component.getSvgElement(this._theme));
    });
    svg.appendTo(target as HTMLElement);

  }

  addComponent(component: Component) {
    this.components.push(component);
  }

  notGate(): NotGate {
    return new NotGate(this);
  }

  setTheme(theme: Theme) {
    this._theme = theme;
  }
}
