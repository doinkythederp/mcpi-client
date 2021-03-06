import { BlockManager } from './Block';
import { Camera } from './Camera';
import { Chat } from './Chat';
import { Connection, ConnectionOptions } from './Connection';
import { Base } from './util';
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
    this.checkpoint = new WorldCheckpoint(this);
  }

  public readonly chat: Chat;
  public readonly blocks: BlockManager;
  public readonly camera: Camera;
  public readonly me: ClientPlayer;
  public readonly checkpoint: WorldCheckpoint;

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

  /**
   * Changes a setting for the client player.
   * @see [api reference](https://picraft.readthedocs.io/en/release-1.0/protocol.html#world-setting)
   */
  public async changeSetting<Strict extends boolean>(
    key: WorldSetting | (Strict extends true ? never : string),
    value: boolean
  ) {
    await this.connection.send(`world.setting(${key},${Number(value)})`, false);
  }

  /** @internal */
  public readonly connection: Connection;
}

export class WorldCheckpoint extends Base {
  /**
   * Saves the current state of the world, which can be restored later with a call to {@link restore}.
   * @see [api reference](https://picraft.readthedocs.io/en/release-1.0/protocol.html#world-checkpoint-save)
   */
  public async create() {
    await this.world.connection.send(`world.checkpoint.save()`, false);
  }

  /**
   * If a checkpoint has been created with {@link create}, restores the world to its state.
   * @see [api reference](https://picraft.readthedocs.io/en/release-1.0/protocol.html#world-checkpoint-restore)
   */
  public async restore() {
    await this.world.connection.send(`world.checkpoint.save()`, false);
  }
}
