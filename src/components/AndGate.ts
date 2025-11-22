import { SvgGroup, SvgRect, SvgText } from "@lib/utils/Svg";
import Vec2 from "@lib/utils/Vec2";
import Component from ".";
import type WiringDiagram from "..";
import { GateIO } from "./gates";

type Orientation = "right"; // | 'left' | 'up' | 'down';

export default class AndGate extends Component {
	private _pos?: Vec2;
	private width: number;
	private height: number;
	private _orientation?: Orientation = "right";
	private _inputs: [GateIO, GateIO];
	private _output: GateIO;

	constructor(diagram: WiringDiagram) {
		super(diagram);
		this.width = 40;
		this.height = 40;
		this._inputs = [new GateIO(diagram, this), new GateIO(diagram, this)];
		this._output = new GateIO(diagram, this);
	}

	pos(x: number, y: number): AndGate {
		this._pos = new Vec2(x, y);
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

	inputs(idx: 0 | 1): GateIO {
		if (!this._pos) {
			throw new Error("Position must be set before getting inputs.");
		}
		if (idx === 0) {
			return this._inputs[0].pos(this._pos.x, this._pos.y + this.height / 3);
		} else if (idx === 1) {
			return this._inputs[1].pos(
				this._pos.x,
				this._pos.y + (2 * this.height) / 3,
			);
		}

		throw new Error("Invalid input index for AND gate. Must be 0 or 1.");
	}

	output(): GateIO {
		if (!this._pos) {
			throw new Error("Position must be set before getting output.");
		}
		return this._output.pos(
			this._pos.x + this.width,
			this._pos.y + this.height / 2,
		);
	}

	update(): void {
		const newState = this._inputs[0].state && this._inputs[1].state;
		const oldState = this.output().state;

		if (newState === oldState) return;

		this.output().setState(newState);
	}

	getSvgElement(): SVGGElement {
		if (!this._pos || !this._orientation) {
			throw new Error(
				"Position and orientation must be set before inserting the component.",
			);
		}

		const group = new SvgGroup();

		const { x, y } = this._pos;
		const w = this.width;
		const h = this.height;

		const rect = new SvgRect().pos(x, y).size(w, h).cssClass("component-body");
		group.addElement(rect.createElement());

		const text = new SvgText("&")
			.pos(x + w / 2, y + h / 2)
			.anchorX("middle")
			.anchorY("middle")
			.cssClass("component-text");
		group.addElement(text.createElement());

		return group.createElement();
	}
}
