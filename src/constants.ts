/** Represents a face of a block */
export enum BlockFace {
  Y_NEGATIVE,
  Y_POSITIVE,
  Z_NEGATIVE,
  Z_POSITIVE,
  X_NEGATIVE,
  X_POSITIVE
}

/**
 * Represents a block, such as Wool or Stone
 *
 * ```ts
 * // Sets the block at 0, 10, 0 to stone
 * world.blocks.set([0, 10, 0], Block.STONE);
 * ```
 *
 * @see [reference](https://wiki.mcpirevival.tk/wiki/Minecraft:_Pi_Edition_block_list)
 */
export enum BlockType {
  AIR = 0,
  STONE = 1,
  GRASS_BLOCK = 2,
  DIRT = 3,
  COBBLESTONE = 4,
  PLANKS = 5,
  SAPLING = 6,
  BEDROCK = 7,
  WATER = 8,
  STILL_WATER = 9,
  LAVA = 10,
  STILL_LAVA = 11,
  SAND = 12,
  GRAVEL = 13,
  GOLD_ORE = 14,
  IRON_ORE = 15,
  COAL_ORE = 16,
  LOG = 17,
  LEAVES = 18,
  GLASS = 20,
  LAPIS_ORE = 21,
  LAPIS_BLOCK = 22,
  SANDSTONE = 24,
  BED = 26,
  COBWEB = 30,
  BUSH = 31,
  WOOL = 35,
  DANDELION = 37,
  BLUE_ROSE = 38,
  BROWN_MUSHROOM = 39,
  RED_MUSHROOM = 40,
  GOLD_BLOCK = 41,
  IRON_BLOCK = 42,
  DOUBLE_SLAB = 43,
  SLAB = 44,
  BRICKS = 45,
  TNT = 46,
  BOOKSHELF = 47,
  MOSSY_COBBLESTONE = 48,
  OBSIDIAN = 49,
  TORCH = 50,
  FIRE = 51,
  WOODEN_STAIRS = 53,
  CHEST = 54,
  DIAMOND_ORE = 56,
  DIAMOND_BLOCK = 57,
  CRAFTING_TABLE = 58,
  WHEAT = 59,
  FARMLAND = 60,
  FURNACE = 61,
  LIT_FURNACE = 62,
  SIGN = 63,
  WOODEN_DOOR = 64,
  LADDER = 65,
  COBBLESTONE_STAIRS = 67,
  WALL_SIGN = 68,
  IRON_DOOR = 71,
  REDSTONE_ORE = 73,
  LIT_REDSTONE_ORE = 73,
  SNOW = 78,
  ICE = 79,
  SNOW_BLOCK = 80,
  CACTUS = 81,
  CLAY = 82,
  SUGARCANE = 83,
  FENCE = 85,
  NETHERRACK = 87,
  GLOWSTONE = 89,
  INVISIBLE_BEDROCK = 95,
  TRAPDOOR = 96,
  STONE_BRICKS = 98,
  GLASS_PANE = 102,
  MELON = 103,
  MELON_STEM = 105,
  FENCE_GATE = 107,
  BRICK_STAIRS = 108,
  STONE_BRICK_STAIRS = 109,
  NETHER_BRICKS = 112,
  NETHER_BRICK_STAIRS = 114,
  SANDSTONE_STAIRS = 128,
  QUARTZ = 155,
  QUARTZ_STAIRS = 156,
  STONECUTTER = 245,
  GLOWING_OBSIDIAN = 246,
  NETHER_REACTOR_CORE = 247,
  UPDATE = 248,
  ATEUPD = 249,
  GRASS_BLOCK_CARRIED = 253,
  LEAVES_CARRIED = 254,
  STONE_1 = 255 // FIXME: bad name
}

/**
 * Represents extra data about a block.
 *
 * ```ts
 * // Sets the block at 0, 10, 0 to a spruce log
 * world.blocks.set([0, 10, 0], Block.LOG, BlockData.SPRUCE);
 * ```
 *
 * @see [reference](https://wiki.mcpirevival.tk/wiki/Minecraft:_Pi_Edition_block_list)
 */
export enum BlockData {
  // LOG, LEAVES, SAPLING
  OAK = 0,
  SPRUCE = 1,
  BIRCH = 2,
  // WATER, STILL_WATER, LAVA, STILL_WATER
  LIQUID_FULL = 0,
  LIQUID_7 = 1,
  LIQUID_6 = 2,
  LIQUID_5 = 3,
  LIQUID_4 = 4,
  LIQUID_3 = 5,
  LIQUID_2 = 6,
  LIQUID_1 = 7,
  LIQUID_FLOWING_DOWN = 8,
  // SANDSTONE
  SANDSTONE_NORMAL = 0,
  SANDSTONE_CHISELLED = 1,
  SANDSTONE_SMOOTH = 1,
  // BED
  BED_BOTTOM_Z_POSITIVE = 0,
  BED_BOTTOM_X_POSITIVE = 1,
  BED_BOTTOM_Z_NEGATIVE = 2,
  BED_BOTTOM_X_NEGATIVE = 3,
  BED_TOP_Z_POSITIVE = 8,
  BED_TOP_X_POSITIVE = 9,
  BED_TOP_Z_NEGATIVE = 10,
  BED_TOP_X_NEGATIVE = 11,
  // BUSH
  BUSH_DEAD = 0,
  BUSH_GRASS = 1,
  BUSH_FERN = 3,
  // WOOL
  WHITE = 0,
  ORANGE = 1,
  MAGENTA = 2,
  LIGHT_BLUE = 3,
  YELLOW = 4,
  LIME = 5,
  PINK = 6,
  GRAY = 7,
  LIGHT_GRAY = 8,
  CYAN = 9,
  PURPLE = 10,
  BLUE = 11,
  BROWN = 12,
  GREEN = 13,
  RED = 14,
  BLACK = 15,
  // SLAB, DOUBLE_SLAB
  SLAB_STONE = 0,
  SLAB_SANDSTONE = 1,
  SLAB_WOOD = 2,
  SLAB_COBBLESTONE = 3,
  SLAB_BRICKS = 4,
  SLAB_STONE_BRICKS = 5,
  SLAB_POLISHED_STONE = 6,
  SLAB_STONE_TOP = 8,
  SLAB_SANDSTONE_TOP = 9,
  SLAB_WOOD_TOP = 10,
  SLAB_COBBLESTONE_TOP = 11,
  SLAB_BRICKS_TOP = 12,
  SLAB_STONE_BRICKS_TOP = 13,
  SLAB_POLISHED_STONE_TOP = 14,
  // TNT
  TNT_INACTIVE = 0,
  TNT_ACTIVE = 1,
  // WOODEN_STAIRS, COBBLESTONE_STAIRS, BRICK_STAIRS,
  // STONE_BRICK_STAIRS, NETHER_BRICK_STAIRS, SANDSTONE_STAIRS,
  // QUARTZ_STAIRS
  STAIRS_X_POSITIVE = 0,
  STAIRS_X_NEGATIVE = 1,
  STAIRS_Z_POSITIVE = 2,
  STAIRS_Z_NEGATIVE = 3,
  STAIRS_X_POSITIVE_UPSIDE_DOWN = 4,
  STAIRS_X_NEGATIVE_UPSIDE_DOWN = 5,
  STAIRS_Z_POSITIVE_UPSIDE_DOWN = 6,
  STAIRS_Z_NEGATIVE_UPSIDE_DOWN = 7,
  // CHEST
  CHEST_NOT_FACING = 0,
  CHEST_Z_NEGATIVE = 2,
  CHEST_Z_POSITIVE = 3,
  CHEST_X_NEGATIVE = 4,
  CHEST_X_POSITIVE = 5,
  // MELON_STEM, WHEAT
  GROWTH_STAGE_0 = 0,
  GROWTH_STAGE_1 = 1,
  GROWTH_STAGE_2 = 2,
  GROWTH_STAGE_3 = 3,
  GROWTH_STAGE_4 = 4,
  GROWTH_STAGE_5 = 5,
  GROWTH_STAGE_6 = 6,
  GROWTH_STAGE_7 = 7,
  // SIGN
  SIGN_Z_POSITIVE = 0,
  SIGN_Z_POSITIVE_POSITIVE_X_NEGATIVE = 1,
  SIGN_Z_POSITIVE_X_NEGATIVE = 2,
  SIGN_Z_POSITIVE_X_NEGATIVE_NEGATIVE = 3,
  SIGN_X_NEGATIVE = 4,
  SIGN_X_NEGATIVE_NEGATIVE_Z_NEGATIVE = 5,
  SIGN_X_NEGATIVE_Z_NEGATIVE = 6,
  SIGN_X_NEGATIVE_Z_NEGATIVE_NEGATIVE = 7,
  SIGN_Z_NEGATIVE = 8,
  SIGN_Z_NEGATIVE_NEGATICE_X_POSITIVE = 9,
  SIGN_Z_NEGATIVE_X_POSITIVE = 10,
  SIGN_Z_NEGATIVE_X_POSITIVE_POSITIVE = 11,
  SIGN_X_POSITIVE = 12,
  SIGN_X_POSITIVE_POSITIVE_Z_POSITIVE = 13,
  SIGN_X_POSITIVE_Z_POSITIVE = 14,
  SIGN_X_POSITIVE_Z_POSITIVE_POSITIVE = 15,
  // WOODEN_DOOR, IRON_DOOR
  DOOR_OPENED_BOTTOM_X_NEGATIVE = 0,
  DOOR_OPENED_BOTTOM_Z_NEGATIVE = 1,
  DOOR_OPENED_BOTTOM_X_POSITIVE = 2,
  DOOR_OPENED_BOTTOM_Z_POSITIVE = 3,
  DOOR_CLOSED_BOTTOM_X_NEGATIVE = 4,
  DOOR_CLOSED_BOTTOM_Z_NEGATIVE = 5,
  DOOR_CLOSED_BOTTOM_X_POSITIVE = 6,
  DOOR_CLOSED_BOTTOM_Z_POSITIVE = 7,
  DOOR_CLOSED_TOP_X_NEGATIVE = 8,
  // TRAPDOOR
  TRAPDOOR_CLOSED_Z_POSITIVE = 0,
  TRAPDOOR_CLOSED_Z_NEGATIVE = 1,
  TRAPDOOR_CLOSED_X_POSITIVE = 2,
  TRAPDOOR_CLOSED_X_NEGATIVE = 3,
  TRAPDOOR_OPENED_Z_POSITIVE = 4,
  TRAPDOOR_OPENED_Z_NEGATIVE = 5,
  TRAPDOOR_OPENED_X_POSITIVE = 6,
  TRAPDOOR_OPENED_X_NEGATIVE = 7,
  // FENCE_GATE
  FENCE_GATE_CLOSED_Z_POSITIVE = 0,
  FENCE_GATE_CLOSED_X_POSITIVE = 1,
  FENCE_GATE_CLOSED_Z_NEGATIVE = 2,
  FENCE_GATE_CLOSED_X_NEGATIVE = 3,
  FENCE_GATE_OPENED_Z_POSITIVE = 4,
  FENCE_GATE_OPENED_X_POSITIVE = 5,
  FENCE_GATE_OPENED_Z_NEGATIVE = 6,
  FENCE_GATE_OPENED_X_NEGATIVE = 7,
  // QUARTZ
  QUARTZ_NORMAL = 0,
  QUARTZ_CHISELLED = 1,
  QUARTZ_PILLAR = 2,
  // FARMLAND
  FARMLAND_DRY = 0,
  FARMLAND_WET = 1,
  // NETHER_REACTOR_CORE
  NETHER_REACTOR_CORE_NORMAL = 0,
  NETHER_REACTOR_CORE_ACTIVE = 1,
  NETHER_REACTOR_CORE_BURNED = 2
}
