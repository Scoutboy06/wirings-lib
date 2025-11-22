import type Component from "./components";
import AndGate from "./components/AndGate";
import type { GateIO } from "./components/gates";
import NandGate from "./components/NandGate";
import NotGate from "./components/NotGate";
import UserInputBit from "./components/UserInputBit";
import { Wire } from "./components/Wire";
import { lightTheme, type Theme } from "./themes";
import { SVG } from "./utils/Svg";

export interface ConnectOptions {
	on: boolean;
}

const defaultOptions: ConnectOptions = {
	on: false,
};

export default class WiringDiagram {
	private width: number;
	private height: number;
	private components: Component[] = [];
	private _theme: Theme = lightTheme;
	private _nextId: number = 0;
	private interactive: boolean;

	constructor(width: number, height: number, interactive = false) {
		this.width = width;
		this.height = height;
		this.interactive = interactive;
	}

	draw(targetSelector: string) {
		const target = document.querySelector(targetSelector);
		if (!target) {
			throw new Error(
				`Target element not found for selector: ${targetSelector}`,
			);
		}

		const svg = new SVG(this.width, this.height).cssClass("wiring-diagram");

		const [wires, nonWires] = this.components.reduce<
			[Component[], Component[]]
		>(
			(acc, component) => {
				if (component instanceof Wire) {
					acc[0].push(component);
				} else {
					acc[1].push(component);
				}
				return acc;
			},
			[[], []],
		);

		wires.forEach((component) => {
			console.log(component);
			svg.addElement(component.getSvgElement());
		});
		nonWires.forEach((component) => {
			console.log(component);
			svg.addElement(component.getSvgElement());
		});

		const defsElement = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"defs",
		);
		const styleElement = document.createElement("style");
		styleElement.textContent = `
      .wiring-diagram {
        background-color: ${this._theme.backgroundColor};
      }
    
      .wiring-diagram .component-body {
        fill: ${this._theme.component.fill};
        stroke: ${this._theme.component.stroke};
      }

      .wiring-diagram .component-text {
        fill: ${this._theme.component.textColor};
        font-size: 24px;
        pointer-events: none;
        user-select: none;
      }

      .wiring-diagram .wire {
        stroke: ${this._theme.wire.stroke};
        stroke-width: ${this._theme.wire.strokeWidth}px;
        fill: none;
        filter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.7));
      }

      .wiring-diagram .wire-electron {
        stroke: ${this._theme.wire.stroke};
        fill: ${this._theme.wire.onColor};
      }

			.wiring-diagram .user-input-bit {
				fill: ${this._theme.userInputBit.inactiveFill};
				stroke: ${this._theme.userInputBit.inactiveStroke};
			}

			.wiring-diagram .user-input-bit.active {
				fill: ${this._theme.userInputBit.activeFill};
				stroke: ${this._theme.userInputBit.activeStroke};
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

	nandGate(): NandGate {
		return new NandGate(this);
	}

	userInputBit(): UserInputBit {
		return new UserInputBit(this);
	}

	connect(
		a: GateIO,
		b: GateIO,
		options: ConnectOptions = defaultOptions,
	): void {
		const wire = new Wire(this).via(a).via(b).setState(options.on);
		this.addComponent(wire);
	}

	setTheme(theme: Theme) {
		this._theme = theme;
	}

	nextId(): number {
		return this._nextId++;
	}

	runSimulation() {
		this.components
			.filter((c) => !(c instanceof Wire))
			.forEach((component) => {
				component.update();
			});
	}
}
