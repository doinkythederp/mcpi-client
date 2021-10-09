import { World } from './World';
import assert = require('assert/strict');

export abstract class Base {
  public constructor(world: World) {
    Object.defineProperty(this, 'world', { value: world });
  }

  public readonly world!: World;
}
