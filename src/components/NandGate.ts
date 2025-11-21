import { SvgCircle, SvgGroup, SvgRect, SvgText } from "@lib/utils/Svg";
import Vec2 from "@lib/utils/Vec2";
import Component from ".";
import type WiringDiagram from "..";
import { GateInput, GateOutput } from "./gates";

type Orientation = "right"; // | 'left' | 'up' | 'down';

export default class NandGate extends Component {
	private _pos?: Vec2;
	private width: number;
	private height: number;
	private _orientation: Orientation = "right";

	constructor(diagram: WiringDiagram) {
		super(diagram);
		this.width = 40;
		this.height = 40;
	}

	pos(x: number, y: number): NandGate {
		this._pos = new Vec2(x, y);
		return this;
	}

	orientation(orientation: Orientation): NandGate {
		this._orientation = orientation;
		return this;
	}

	insert(): NandGate {
		this.diagram.addComponent(this);
		return this;
	}

	inputs(idx: 0 | 1): GateInput {
		if (!this._pos) {
			throw new Error("Position must be set before getting inputs.");
		}
		if (idx === 0) {
			return new GateInput(this).pos(
				this._pos.x + 2,
				this._pos.y + this.height / 3,
			);
		}
		if (idx === 1) {
			return new GateInput(this).pos(
				this._pos.x + 2,
				this._pos.y + (2 * this.height) / 3,
			);
		}
		throw new Error("Invalid input index for NandGate. Must be 0 or 1.");
	}

	output(): GateOutput {
		if (!this._pos) {
			throw new Error("Position must be set before getting output.");
		}
		return new GateOutput(this).pos(
			this._pos.x + this.width - 2,
			this._pos.y + this.height / 2,
		);
	}

	getSvgElement(): SVGGElement {
		if (!this._pos) {
			throw new Error("Position must be set before inserting the component.");
		}

		const group = new SvgGroup();

		const { x, y } = this._pos;
		const w = this.width;
		const h = this.height;

		const rect = new SvgRect()
			.pos(x, y)
			.size(w * 0.8, h)
			.cssClass("component-body");
		group.addElement(rect.createElement());

		const text = new SvgText("&")
			.pos(x + (w * 0.8) / 2, y + h / 2)
			.anchorX("middle")
			.anchorY("middle")
			.cssClass("component-text");
		group.addElement(text.createElement());

		const circle = new SvgCircle()
			.center(x + w * 0.9, y + h / 2)
			.radius(w * 0.1)
			.cssClass("component-body");
		group.addElement(circle.createElement());

		return group.createElement();
	}
}
