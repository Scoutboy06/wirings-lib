import Vec2 from "./Vec2";

type AnchorPoint = "start" | "middle" | "end";

abstract class SVGElementWrapper {
	protected _anchorX: AnchorPoint = "start";
	protected _anchorY: AnchorPoint = "start";
	protected _cssClasses: string[] = [];
	protected _animateMotion?: SVGAnimateMotionElement;
	protected _id?: string;
	abstract createElement(): SVGElement;

	cssClass(className: string) {
		this._cssClasses.push(className);
		return this;
	}

	get _cssClass(): string | null {
		if (this._cssClasses.length > 0) {
			return this._cssClasses.join(" ");
		}
		return null;
	}

	id(id: string) {
		this._id = id;
		return this;
	}

	animate(
		pathId: string,
		duration: number,
		begin: number = 0,
		repeatCount: string = "indefinite",
	) {
		const animateMotion = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"animateMotion",
		);
		const mpath = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"mpath",
		);
		mpath.setAttributeNS(
			"http://www.w3.org/1999/xlink",
			"xlink:href",
			`#${pathId}`,
		);
		animateMotion.appendChild(mpath);
		animateMotion.setAttribute("dur", `${duration}s`);
		animateMotion.setAttribute("begin", `${begin}s`);
		animateMotion.setAttribute("repeatCount", repeatCount);
		this._animateMotion = animateMotion;
		return this;
	}
}

export class SVG {
	private element: SVGElement;

	constructor(width: number = 800, height: number = 600) {
		this.element = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"svg",
		);
		this.element.setAttribute("width", width.toString());
		this.element.setAttribute("height", height.toString());
		this.element.setAttribute("viewBox", `0 0 ${width} ${height}`);
	}

	cssClass(className: string) {
		this.element.setAttribute("class", className);
		return this;
	}

	appendTo(parent: HTMLElement) {
		parent.appendChild(this.element);
	}

	addElement(element: SVGElement) {
		this.element.appendChild(element);
	}
}

export class SvgPath extends SVGElementWrapper {
	private d: string;
	private _stroke?: string;
	private _strokeWidth?: number;
	private _fill?: string;

	constructor() {
		super();
		this.d = "";
	}

	moveTo(x: number, y: number) {
		this.d += `M${x} ${y} `;
		return this;
	}

	lineTo(x: number, y: number) {
		this.d += `L${x} ${y} `;
		return this;
	}

	close() {
		this.d += "Z ";
		return this;
	}

	stroke(color: string) {
		this._stroke = color;
		return this;
	}

	strokeWidth(width: number) {
		this._strokeWidth = width;
		return this;
	}

	fill(color: string) {
		this._fill = color;
		return this;
	}

	getPathString() {
		return this.d.trim();
	}

	createElement() {
		const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute("d", this.getPathString());
		if (this._stroke) {
			path.setAttribute("stroke", this._stroke);
		}
		if (this._strokeWidth) {
			path.setAttribute("stroke-width", this._strokeWidth.toString());
		}
		if (this._fill) {
			path.setAttribute("fill", this._fill);
		}
		if (this._cssClass) {
			path.setAttribute("class", this._cssClass);
		}
		if (this._animateMotion) {
			path.appendChild(this._animateMotion);
		}
		if (this._id) {
			path.setAttribute("id", this._id);
		}
		return path;
	}
}

export class SvgRect extends SVGElementWrapper {
	private _pos?: Vec2;
	private _width?: number;
	private _height?: number;
	private _fillColor?: string;
	private _strokeColor?: string;
	private _strokeWidth?: number;

	pos(x: number, y: number) {
		this._pos = new Vec2(x, y);
		return this;
	}

	size(width: number, height: number) {
		this._width = width;
		this._height = height;
		return this;
	}

	width(width: number) {
		this._width = width;
		return this;
	}

	height(height: number) {
		this._height = height;
		return this;
	}

	fill(color: string) {
		this._fillColor = color;
		return this;
	}

	stroke(color: string) {
		this._strokeColor = color;
		return this;
	}

	strokeWidth(width: number) {
		this._strokeWidth = width;
		return this;
	}

	createElement(): SVGRectElement {
		if (!this._pos || this._width === undefined || this._height === undefined) {
			throw new Error(
				"Position, width, and height must be set before creating rect element.",
			);
		}
		const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		rect.setAttribute("x", this._pos.x.toString());
		rect.setAttribute("y", this._pos.y.toString());
		rect.setAttribute("width", this._width.toString());
		rect.setAttribute("height", this._height.toString());
		if (this._fillColor) {
			rect.setAttribute("fill", this._fillColor);
		}
		if (this._strokeColor) {
			rect.setAttribute("stroke", this._strokeColor);
		}
		if (this._strokeWidth !== undefined) {
			rect.setAttribute("stroke-width", this._strokeWidth.toString());
		}
		if (this._cssClass) {
			rect.setAttribute("class", this._cssClass);
		}
		if (this._animateMotion) {
			rect.appendChild(this._animateMotion);
		}
		if (this._id) {
			rect.setAttribute("id", this._id);
		}
		return rect;
	}
}

export class SvgCircle extends SVGElementWrapper {
	private _center?: Vec2;
	private _radius?: number;

	center(x: number, y: number) {
		this._center = new Vec2(x, y);
		return this;
	}

	radius(radius: number) {
		this._radius = radius;
		return this;
	}

	createElement(): SVGElement {
		if (this._radius === undefined) {
			throw new Error("Radius must be set before creating circle element.");
		}
		const circle = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"circle",
		);
		if (this._center) {
			circle.setAttribute("cx", this._center.x.toString());
			circle.setAttribute("cy", this._center.y.toString());
		}
		circle.setAttribute("r", this._radius.toString());
		if (this._cssClass) {
			circle.setAttribute("class", this._cssClass);
		}
		if (this._animateMotion) {
			circle.appendChild(this._animateMotion);
		}
		if (this._id) {
			circle.setAttribute("id", this._id);
		}
		return circle;
	}
}

export class SvgText extends SVGElementWrapper {
	private _content: string;
	private _pos?: Vec2;

	constructor(content: string) {
		super();
		this._content = content;
	}

	pos(x: number, y: number) {
		this._pos = new Vec2(x, y);
		return this;
	}

	anchorX(anchor: AnchorPoint) {
		this._anchorX = anchor;
		return this;
	}

	anchorY(anchor: AnchorPoint) {
		this._anchorY = anchor;
		return this;
	}

	createElement() {
		if (!this._pos) {
			throw new Error("Position must be set before creating text element.");
		}

		const textEl = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"text",
		);
		textEl.textContent = this._content;

		textEl.setAttribute("x", this._pos.x.toString());
		textEl.setAttribute("y", this._pos.y.toString());

		const anchorXMap: Record<AnchorPoint, string> = {
			start: "start",
			middle: "middle",
			end: "end",
		};
		textEl.setAttribute("text-anchor", anchorXMap[this._anchorX]);

		const anchorYMap: Record<AnchorPoint, string> = {
			start: "auto",
			middle: "central",
			end: "hanging",
		};
		textEl.setAttribute("dominant-baseline", anchorYMap[this._anchorY]);

		if (this._cssClass) {
			textEl.setAttribute("class", this._cssClass);
		}
		if (this._animateMotion) {
			textEl.appendChild(this._animateMotion);
		}
		if (this._id) {
			textEl.setAttribute("id", this._id);
		}

		return textEl;
	}
}

export class SvgGroup extends SVGElementWrapper {
	private elements: SVGElement[] = [];

	addElement(element: SVGElement) {
		this.elements.push(element);
		return this;
	}

	createElement() {
		const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
		this.elements.forEach((el) => {
			group.appendChild(el);
		});
		if (this._cssClass) {
			group.setAttribute("class", this._cssClass);
		}
		if (this._animateMotion) {
			group.appendChild(this._animateMotion);
		}
		if (this._id) {
			group.setAttribute("id", this._id);
		}
		return group;
	}
}
