import { SvgCircle, SvgGroup, SvgPath } from "@lib/utils/Svg";
import Vec2 from "@lib/utils/Vec2";
import Component from ".";
import type WiringDiagram from "..";
import type { GateInput, GateOutput } from "./gates";

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
	readonly id: string;

	constructor(diagram: WiringDiagram) {
		super(diagram);
		this.id = `wire-${diagram.nextId()}`;
	}

	via(node: GateInput | GateOutput): Wire {
		if (!node._pos) {
			throw new Error("Node position is not set");
		}
		this.vertices.push(new WireVertex(node._pos.x, node._pos.y, node));
		return this;
	}

	setState(state: boolean): Wire {
		this.state = state;
		return this;
	}

	private getElectrons(): SvgPath[] {
		const electrons: SvgPath[] = [];

		for (let i = 1; i < this.vertices.length; i++) {
			const prevVertex = this.vertices[i - 1];
			const vertex = this.vertices[i];

			if (!this.state) continue;

			const len = vertex._pos.sub(prevVertex._pos).length();
			console.log("Wire segment length:", len);
			const numElectrons = Math.floor(len * 0.05);
			console.log(numElectrons);

			for (let j = 0; j < numElectrons; j++) {
				const t = (j + 1) / (numElectrons + 1);

				const electron = new SvgCircle()
					.radius(2)
					.animate(this.id, len * 0.05, -t * len * 0.07) // TODO: adjust numbers for equal distancing
					.cssClass("wire-electron") as unknown as SvgPath;
				electrons.push(electron);
			}
		}

		return electrons;
	}

	getSvgElement(): SVGGElement {
		const group = new SvgGroup();

		if (this.vertices.length === 0) {
			console.warn("Wire has no vertices");
			return group.createElement();
		}

		const path = new SvgPath()
			.moveTo(this.vertices[0]._pos.x, this.vertices[0]._pos.y)
			.cssClass("wire")
			.id(this.id);

		if (this.state) {
			path.cssClass("wire-on");
		} else {
			path.cssClass("wire-off");
		}

		for (let i = 1; i < this.vertices.length; i++) {
			const { x, y } = this.vertices[i]._pos;
			path.lineTo(x, y);
		}
		group.addElement(path.createElement());

		const movingElectrons = this.getElectrons();
		movingElectrons.forEach((electron) => {
			group.addElement(electron.createElement());
		});

		return group.createElement();
	}
}
