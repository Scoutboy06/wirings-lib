import Vec2 from '@lib/utils/Vec2';
import type Component from '.';
import type { Wire } from './Wire';

export class GateInput {
  readonly owner: Component;
  connections: Wire[] = [];
  _pos?: Vec2;

  constructor(owner: Component) {
    this.owner = owner;
  }

  pos(x: number, y: number) {
    this._pos = new Vec2(x, y);
    return this;
  }
}

export class GateOutput {
  readonly owner: Component;
  connections: Wire[] = [];
  _pos?: Vec2;

  constructor(owner: Component) {
    this.owner = owner;
  }

  pos(x: number, y: number) {
    this._pos = new Vec2(x, y);
    return this;
  }
}