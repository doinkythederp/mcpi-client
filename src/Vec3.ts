import { inspect, InspectOptionsStylized } from 'util';

export type Vec3Resolvable =
  | { x: number; y: number; z: number }
  | [x: number, y: number, z: number];

export class Vec3 {
  public constructor(data: Vec3Resolvable) {
    if (Array.isArray(data))
      data = {
        x: data[0],
        y: data[1],
        z: data[2]
      };

    this.x = data.x;
    this.y = data.y;
    this.z = data.z;
  }

  public readonly x: number;
  public readonly y: number;
  public readonly z: number;

  /** Runs a function on every value of this Vec3 */
  public map(fn: (value: number, index: number, array: number[]) => number) {
    return new Vec3(this.toArray().map(fn) as [number, number, number]);
  }

  /** Runs Math.floor on every value of this Vec3 */
  public floor() {
    return this.map(Math.floor);
  }

  /** Runs Math.ceil on every value of this Vec3 */
  public ceil() {
    return this.map(Math.ceil);
  }

  /** Runs Math.round on every value of this Vec3 */
  public round() {
    return this.map(Math.round);
  }

  /** Runs Math.abs on every value of this Vec3 */
  public abs() {
    return this.map(Math.abs);
  }

  /** Runs Math.min on every value of this Vec3 and the Vec3 passed */
  public min(vec: Vec3Resolvable) {
    const vecArr = new Vec3(vec).toArray();

    return this.map((val, i) => Math.min(val, vecArr[i]!));
  }

  /** Runs Math.max on every value of this Vec3 and the Vec3 passed */
  public max(vec: Vec3Resolvable) {
    const vecArr = new Vec3(vec).toArray();

    return this.map((val, i) => Math.max(val, vecArr[i]!));
  }

  /** Translates this Vec3 by the value passed */
  public translate(vec: Vec3Resolvable) {
    const { x, y, z } = new Vec3(vec);

    return new Vec3([this.x + x, this.y + y, this.z + z]);
  }

  /** Negates all values of this Vec3 */
  public negate() {
    return new Vec3([-this.x, -this.y, -this.z]);
  }

  /** Scales this Vec3 by a certain value */
  public scale(by: number) {
    return new Vec3([this.x * by, this.y * by, this.z * by]);
  }

  /** Calculates the distance between two Vec3's */
  public distance(vec: Vec3Resolvable) {
    vec = new Vec3(vec);

    const x = vec.x - this.x;
    const y = vec.y - this.y;
    const z = vec.z - this.z;

    return Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  }

  /** Returns true if the Vec3 passed is the same as this Vec3 */
  public equals(vec: Vec3Resolvable) {
    vec = new Vec3(vec);
    return this.x === vec.x && this.y === vec.y && this.z === vec.z;
  }

  /** Returns a Vec3 with the same value */
  public clone() {
    return new Vec3(this);
  }

  public [inspect.custom](depth: number, options: InspectOptionsStylized) {
    if (depth < 0) {
      return options.stylize('[Vec3]', 'special');
    }

    return `${options.stylize('Vec3', 'special')}<${this.toArray()
      .map((n) => options.stylize(n.toString(), 'number'))
      .join(', ')}>`;
  }

  public toArray(): [x: number, y: number, z: number] {
    return [this.x, this.y, this.z];
  }
}
