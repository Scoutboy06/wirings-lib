import { SvgCircle } from "@lib/utils/Svg";
import Vec2 from "@lib/utils/Vec2";
import Component from ".";
import type WiringDiagram from "..";
import { GateIO } from "./gates";

export default class UserInputBit extends Component {
	private _pos?: Vec2;
	private _radius: number;
	private _active: boolean = false;
	private _output: GateIO;

	constructor(diagram: WiringDiagram) {
		super(diagram);
		this._radius = 10;
		this._output = new GateIO(this, "output");
	}

	pos(x: number, y: number): UserInputBit {
		this._pos = new Vec2(x, y);
		return this;
	}

	insert(): UserInputBit {
		this.diagram.addComponent(this);
		return this;
	}

	output(): GateIO {
		if (!this._pos) {
			throw new Error("Position must be set before getting output.");
		}
		return this._output.pos(
			this._pos.x + this._radius * 2 - 4,
			this._pos.y + this._radius,
		);
	}

	active(active: boolean): UserInputBit {
		this._active = active;
		return this;
	}

	update(): void {
		this._output.setState(this._active);
		this._output.update();
	}

	getSvgElement(): SVGElement {
		if (!this._pos) {
			throw new Error("Position must be set before getting SVG element.");
		}

		const rect = new SvgCircle()
			.center(this._pos.x + this._radius, this._pos.y + this._radius)
			.radius(this._radius)
			.cssClass("user-input-bit");

		if (this._active) {
			rect.cssClass("active");
		}

		return rect.createElement();
	}
}
