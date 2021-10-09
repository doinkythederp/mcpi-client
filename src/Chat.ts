import { Base } from './util';
import { World } from './World';

export class Chat extends Base {
  /**
   * Sends a message to the chat.
   * ```ts
   * world.chat.send('Hello, Pi!');
   * ```
   *
   * @see [api reference](https://picraft.readthedocs.io/en/release-1.0/protocol.html#chat-post)
   */
  public async send(message: string) {
    await this.world.connection.send(
      message
        .split('\n')
        .map((content) => `chat.post(${content})`)
        .join('\n'),
      false
    );
  }

  /**
   * Fetches new chat messages from a RaspberryJuice game.
   * ```ts
   * for (const message of await world.chat.poll()) {
   *  console.log(message.content)
   * }
   * ```
   */
  public async poll() {
    return (await this.world.connection.send('events.chat.posts()', true))
      .split('|')
      .map((messageData) => messageData.split(','))
      .map(
        ([authorId, content]) =>
          new ChatMessage(this.world, String(content), Number(authorId))
      );
  }
}

/**
 * Represents a Minecraft chat message.
 */
export class ChatMessage extends Base {
  public constructor(
    world: World,
    /** The content of the message */
    public readonly content: string,
    /** The ID of the player who sent the message */
    public readonly authorId: number
  ) {
    super(world);
  }
}
