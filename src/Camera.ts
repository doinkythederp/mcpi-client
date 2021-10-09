import { Base } from './util';
import { Vec3, Vec3Resolvable } from './Vec3';

export class Camera extends Base {
  /**
   * Sets the camera to follow the target entity's head.
   * The target defaults to the host player.
   *
   * @see [api reference](https://picraft.readthedocs.io/en/release-1.0/protocol.html#camera-mode-setnormal)
   */
  public async normal(entityId?: number) {
    await this.world.connection.send(
      `camera.mode.setNormal(${entityId ?? ''})`,
      false
    );
  }

  /**
   * Sets the camera to point straight down at the target
   * entity from several blocks above.
   * The target defaults to the host player.
   *
   * @see [api reference](https://picraft.readthedocs.io/en/release-1.0/protocol.html#camera-mode-setfollow)
   */
  public async follow(entityId?: number) {
    await this.world.connection.send(
      `camera.mode.setFollow(${entityId ?? ''})`,
      false
    );
  }

  /**
   * Fixes the camera in place so that it does't
   * move on its own.
   * Enables the {@link setPosition} method.
   *
   * @see [api reference](https://picraft.readthedocs.io/en/release-1.0/protocol.html#camera-mode-setfixed)
   */
  public async fixed() {
    await this.world.connection.send(`camera.mode.setFixed()`, false);
  }

  /**
   * If the camera is in {@link fixed fixed mode},
   * moves it to the specified position.
   *
   * @see [api reference](https://picraft.readthedocs.io/en/release-1.0/protocol.html#camera-setpos)
   */
  public async setPosition(coords: Vec3Resolvable) {
    const vec = new Vec3(coords);
    await this.world.connection.send(
      `camera.setPos(${vec.toArray().join()})`,
      false
    );
  }
}
