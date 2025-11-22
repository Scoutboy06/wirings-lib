import Vec2 from "@lib/utils/Vec2";
import Component from ".";
import type WiringDiagram from "..";
import type { WireVertex } from "./Wire";

export class GateIO {
	readonly owner: Component;
	private isInput: boolean;
	connections: WireVertex[] = [];
	private _state = false;
	_pos?: Vec2;

	constructor(owner: Component, type: "input" | "output") {
		this.owner = owner;
		this.isInput = type === "input";
	}

	pos(x: number, y: number) {
		this._pos = new Vec2(x, y);
		return this;
	}

	get state(): boolean {
		return this._state;
	}

	setState(newState: boolean) {
		this._state = newState;
	}

	update(): void {
		if (this.isInput) {
			this.owner.update();
		}

		for (const connection of this.connections) {
		}
	}

	getSvgElement(): SVGElement {
		throw new Error("Method not implemented.");
	}
}
