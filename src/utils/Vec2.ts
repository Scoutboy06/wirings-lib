export default class Vec2 {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	add(other: Vec2): Vec2 {
		return new Vec2(this.x + other.x, this.y + other.y);
	}

	sub(other: Vec2): Vec2 {
		return new Vec2(this.x - other.x, this.y - other.y);
	}

	scale(factor: number): Vec2 {
		return new Vec2(this.x * factor, this.y * factor);
	}

	lengthSq(): number {
		return this.x * this.x + this.y * this.y;
	}

	length(): number {
		return Math.sqrt(this.lengthSq());
	}

	lerp(other: Vec2, t: number): Vec2 {
		return new Vec2(
			this.x + (other.x - this.x) * t,
			this.y + (other.y - this.y) * t,
		);
	}
}
