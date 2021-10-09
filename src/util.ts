import { World } from './World';
import assert = require('assert/strict');
import { Vec3 } from './Vec3';

export abstract class Base {
  public constructor(world: World) {
    Object.defineProperty(this, 'world', { value: world });
  }

  public readonly world!: World;
}

export function assertInteger(n: number) {
  assert(Number.isInteger(n), `Expected an integer, got ${n}`);
}

export function assertIntegerVec(vec: Vec3) {
  vec.toArray().map(assertInteger);
}
