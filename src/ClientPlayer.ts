import { BaseEntity } from './Entity';
import { Vec3, Vec3Resolvable } from './Vec3';

export enum ClientPlayerSetting {
  /** Controls if the player automatically jumps when they run into a block */
  AUTOJUMP = 'autojump'
}

export class ClientPlayer extends BaseEntity {
  public async fetchTile() {
    const location = (
      await this.world.connection.send(`player.getTile()`, true)
    )
      .split(',')
      .map(Number);

    return new Vec3(location as [number, number, number]);
  }

  public async fetchPosition() {
    const location = (await this.world.connection.send(`player.getPos()`, true))
      .split(',')
      .map(Number);

    return new Vec3(location as [number, number, number]);
  }

  public async setTile(coords: Vec3Resolvable) {
    const vec = new Vec3(coords);

    await this.world.connection.send(
      `player.setTile(${vec.toArray().join()})`,
      false
    );
  }

  public async setPosition(coords: Vec3Resolvable) {
    const vec = new Vec3(coords);

    await this.world.connection.send(
      `player.setPos(${vec.toArray().join()})`,
      false
    );
  }

  /**
   * Changes a setting for the client player.
   *
   * @see [api reference](https://picraft.readthedocs.io/en/release-1.0/protocol.html#player-setting)
   */
  public async changeSetting<Strict extends boolean>(
    key: ClientPlayerSetting | (Strict extends true ? never : string),
    value: boolean
  ) {
    await this.world.connection.send(
      `player.setting(${key},${Number(value)})`,
      false
    );
  }
}
