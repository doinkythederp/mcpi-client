import { BlockManager } from './Block';
import { Connection, ConnectionOptions } from './Connection';

export enum WorldSetting {
  /** Controls if the the world can be changed by in-game players */
  WORLD_IMMUTABLE = 'world_immutable',
  /** Controls if player nametags are visible */
  NAMETAGS_VISIBLE = 'nametags_visible'
}

export interface WorldOptions extends ConnectionOptions {}

/**
 * Represents a connection to the Minecraft: Pi Edition game.
 * Contains methods used to interact with the API.
 *
 * ```ts
 * const world = new World();
 * await world.chat.send('Hello!');
 * ```
 */
export class World {
  public constructor(public readonly options: Readonly<WorldOptions>) {
    this.connection = new Connection(options);
    this.blocks = new BlockManager(this);

  public readonly blocks: BlockManager;

  /**
   * Destroys the connection, disconnecting from the API.
   */
  public close() {
    this.connection.destroy();
  }
  /** @internal */
  public readonly connection: Connection;
}
