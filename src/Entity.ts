import { Vec3, Vec3Resolvable } from './Vec3';
import { Base } from './util';
import { World } from './World';

export abstract class BaseEntity extends Base {
  /**
   * Fetches the current block of this entity.
   * Similar to {@link fetchPosition}, but it removes decimals.
   *
   * @see [api reference](https://picraft.readthedocs.io/en/release-1.0/protocol.html#entity-gettile)
   * @see [client player api reference](https://picraft.readthedocs.io/en/release-1.0/protocol.html#player-gettile)
   */
  public abstract fetchTile(): Promise<Vec3>;

  /**
   * Fetches the absolute position of this entity.
   *
   * @see [api reference](https://picraft.readthedocs.io/en/release-1.0/protocol.html#entity-getpos)
   * @see [client player api reference](https://picraft.readthedocs.io/en/release-1.0/protocol.html#player-getpos)
   */
  public abstract fetchPosition(): Promise<Vec3>;

  /**
   * Sets the current block of this entity.
   * Similar to {@link setPosition}, but it always goes to
   * to the center of the block.
   *
   * @see [api reference](https://picraft.readthedocs.io/en/release-1.0/protocol.html#entity-settile)
   * @see [client player api reference](https://picraft.readthedocs.io/en/release-1.0/protocol.html#player-settile)
   */
  public abstract setTile(coords: Vec3Resolvable): Promise<void>;

  /**
   * Fetches the absolute position of this entity.
   *
   * @see [api reference](https://picraft.readthedocs.io/en/release-1.0/protocol.html#entity-setpos)
   * @see [client player api reference](https://picraft.readthedocs.io/en/release-1.0/protocol.html#player-setpos)
   */
  public abstract setPosition(coords: Vec3Resolvable): Promise<void>;
}

/**
 * Represents an entity, such as a player or mob.
 */
export class Entity extends BaseEntity {
  public constructor(world: World, public readonly id: number) {
    super(world);
  }

  public async fetchTile() {
    const location = (
      await this.world.connection.send(`entity.getTile(${this.id})`, true)
    )
      .split(',')
      .map(Number);

    return new Vec3(location as [number, number, number]);
  }

  public async fetchPosition() {
    const location = (
      await this.world.connection.send(`entity.getPos(${this.id})`, true)
    )
      .split(',')
      .map(Number);

    return new Vec3(location as [number, number, number]);
  }

  public async setTile(coords: Vec3Resolvable) {
    const vec = new Vec3(coords);

    await this.world.connection.send(
      `entity.setTile(${this.id},${vec.toArray().join()})`,
      false
    );
  }

  public async setPosition(coords: Vec3Resolvable) {
    const vec = new Vec3(coords);

    await this.world.connection.send(
      `entity.setPos(${this.id},${vec.toArray().join()})`,
      false
    );
  }
}
