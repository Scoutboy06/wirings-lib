import type WiringDiagram from "..";

export default abstract class Component {
	protected diagram: WiringDiagram;
	protected id: string;

	constructor(diagram: WiringDiagram) {
		this.diagram = diagram;
		this.id = diagram.nextId().toString();
	}

	abstract update(): void;

	abstract getSvgElement(): SVGElement;
}
