import { Base, assertIntegerVec, assertInteger } from './util';
import { World } from './World';
import { Vec3, Vec3Resolvable } from './Vec3';
import { BlockFace, BlockType, BlockData } from './constants';

export class BlockManager extends Base {
  /**
   * Fetches new block hits from the game.
   *
   * On Minecraft: Pi Edition, this means right-clicking a block with a sword.
   */
  public async pollHits() {
    const res = await this.world.connection.send('events.block.hits()', true);
    if (!res) return [];
    return res
      .split('|')
      .map((messageData) => messageData.split(','))
      .map(
        ([x, y, z, face, playerId]) =>
          new BlockHit(
            this.world,
            new Vec3([Number(x), Number(y), Number(z)]),
            Number(face),
            Number(playerId)
          )
      );
  }

  /**
   * Fetches the block at the specified coordinates
   * @see [api reference](https://picraft.readthedocs.io/en/release-1.0/protocol.html#world-getblock)
   */
  public async fetch(coords: Vec3Resolvable) {
    const vec = new Vec3(coords);
    assertIntegerVec(vec);
    const blockInfo = (
      await this.world.connection.send(
        `world.getBlockWithData(${vec.toArray().join()})`,
        true
      )
    ).split(',');

    return new Block(
      this.world,
      Number(blockInfo[0]),
      Number(blockInfo[1]),
      vec
    );
  }

  /**
   * Fetches the Y of the heighest non-air block at the specified X and Z
   * @see [api reference](https://picraft.readthedocs.io/en/release-1.0/protocol.html#world-getheight)
   */
  public async fetchHeight(x: number, z: number) {
    assertInteger(x);
    assertInteger(z);
    return Number(
      await this.world.connection.send(`world.getHeight(${x},${z})`, true)
    );
  }

  /**
   * Sets the block at the specified coordinates
   * @see [api reference](https://picraft.readthedocs.io/en/release-1.0/protocol.html#world-setblock)
   */
  public async set(coords: Vec3Resolvable, block: BlockType, data?: BlockData) {
    const vec = new Vec3(coords);
    await this.world.connection.send(
      `world.setBlock(${vec.toArray().join()},${block}${
        data ? `,${data}` : ''
      })`,
      false
    );

    return new Block(this.world, block, data ?? 0, vec);
  }

  /**
   * Creates a rectangle with corners at the specified coordinates
   * @see [api reference](https://picraft.readthedocs.io/en/release-1.0/protocol.html#world-setblocks)
   */
  public async fill(
    corner1: Vec3Resolvable,
    corner2: Vec3Resolvable,
    block: BlockType,
    data?: BlockData
  ) {
    const vec1 = new Vec3(corner1);
    assertIntegerVec(vec1);
    const vec2 = new Vec3(corner2);
    assertIntegerVec(vec2);

    await this.world.connection.send(
      `world.setBlocks(${vec1.toArray().join()},${vec2
        .toArray()
        .join()},${block}${data ? `,${data}` : ''})`,
      false
    );
  }
}

export class Block extends Base {
  public constructor(
    world: World,
    /** The type of the block, e.g. {@link BlockType.WOOL wool} or {@link BlockType.STONE stone}. */
    public readonly type: BlockType,
    /** Metadata related to the block, such as color or rotation */
    public readonly data: BlockData,
    /** The location of the block in the world */
    public readonly location: Vec3
  ) {
    super(world);
  }
}

/**
 * Represents a block hit.
 *
 * On Minecraft: Pi Edition, this means right-clicking a block with a sword.
 *
 * @see {@link BlockManager.pollHits}
 */
export class BlockHit extends Base {
  public constructor(
    world: World,
    /** The location of the hit */
    public readonly location: Vec3,
    /** The face of the block that was hit */
    public readonly face: BlockFace,
    /** The ID of the player who hit the block */
    public readonly playerId: number
  ) {
    super(world);
  }

  /**
   * Fetches the block at the location of the hit
   * @see [api reference](https://picraft.readthedocs.io/en/release-1.0/protocol.html#world-getblock)
   */
  public fetchBlock() {
    return this.world.blocks.fetch(this.location);
  }
}
