import { BlockManager } from './Block';
import { Camera } from './Camera';
import { Chat } from './Chat';
import { Connection, ConnectionOptions } from './Connection';
import { ClientPlayer } from './ClientPlayer';
import { Entity } from './Entity';

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
    this.chat = new Chat(this);
    this.blocks = new BlockManager(this);
    this.camera = new Camera(this);
    this.me = new ClientPlayer(this);

  public readonly chat: Chat;
  public readonly blocks: BlockManager;
  public readonly camera: Camera;
  public readonly me: ClientPlayer;

  /**
   * Destroys the connection, disconnecting from the API.
   */
  public close() {
    this.connection.destroy();
  }

  /**
   * Returns all players currently in the world.
   * @see [api reference](https://picraft.readthedocs.io/en/release-1.0/protocol.html#world-getplayerids)
   */
  public async getPlayers() {
    return (await this.connection.send('world.getPlayerIds()', true))
      .split('|')
      .map((id) => new Entity(this, Number(id)));
  }
  /** @internal */
  public readonly connection: Connection;
}
