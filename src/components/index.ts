import type { Theme } from '@lib/themes';
import type WiringDiagram from '..';

export default abstract class Component {
  protected diagram: WiringDiagram;
  protected inputs: any[] = [];
  protected outputs: any[] = [];
  
  constructor(diagram: WiringDiagram) {
    this.diagram = diagram;
  }
  
  abstract getSvgElement(theme: Theme): SVGElement;
}