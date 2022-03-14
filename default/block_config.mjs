/**
 * @file Minecraft Utils Shared - Block Config
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import component from './component.mjs';
import normalizer from './../helper/normalizer.mjs';
import placeholder from './../utils/placeholder.mjs';

const configVersion = '1.0.0';

/**
 * @enum
 */
const type = Object.freeze({
  CUSTOM: 'custom',
  DOOR: 'door',
  FLOWER: 'flower',
  GRASS: 'grass',
  LIQUID: 'liquid',
  ORE: 'ore',
  ROD: 'rod',
  SAPLING: 'sapling',
  SIMPLE: 'simple',
  TEMPLATE: 'template',
  TEST: 'test',
  TRAP_DOOR: 'trap_door',
});

/**
 * @enum
 */
const typeIcon = {};
typeIcon[type.CUSTOM] = '✏️';
typeIcon[type.GRASS] = '🌿';
typeIcon[type.ORE] = '💎';
typeIcon[type.ROD] = '➖';
typeIcon[type.SIMPLE] = '🔲';
typeIcon[type.TEMPLATE] = '📑';
typeIcon[type.TEST] = '🧪';

/**
 * @enum
 */
const creativeTab = Object.freeze({
  BUILDING_BLOCKS: 'TAB_BUILDING_BLOCKS',
  COMBAT: 'TAB_COMBAT',
  DECORATIONS: 'TAB_DECORATIONS',
  FOOD: 'TAB_FOOD',
  MISC: 'TAB_MISC',
  REDSTONE: 'TAB_REDSTONE',
  SEARCH: 'TAB_SEARCH',
  TOOLS: 'TAB_TOOLS',
  TRANSPORTATION: 'TAB_TRANSPORTATION',
});

const namespace = process.env.npm_package_config_project_namespace
  ? process.env.npm_package_config_project_namespace.split(/[\s.]+/).pop()
  : 'my_block';

const config = {
  component: component.type.BLOCK,
  configVersion: configVersion,
  id: 'my_block:new_custom_block',
  blockName: 'new_custom_block',
  type: type.CUSTOM,
  name: 'New Custom Block',
  namespace: namespace,
  bedrock: {
    formatVersion: '1.16.1',
  },
  forge: {
    className: '',
  },
  placeholder: {
    BlockClassName: '',
    BLOCKNAME: 'NEWCUSTOMBLOCK',
    BLOCK_NAME: 'NEW_CUSTOM_BLOCK',
    BlockName: 'NewCustomBlock',
    blockName: 'newCustomBlock',
    block_name: 'new_custom_block',
    blockname: 'newcustomblock',
    CreativeTab: 'TAB_MISC',
    SoundType: 'SoundType.METAL',
  },
  template: '',
  description: '',
  variation: '',
  icon: 'new_custom_block',
  attributes: {
    soundType: 'SoundType.METAL',
  },
  events: {},
  misc: {},
};

/**
 * @param {string} blockType
 * @returns {string} Emoji for the given block type.
 */
const getBlockTypeIcon = (blockType) => {
  return typeIcon[blockType] || '✏️';
};

/**
 * @param {Object} options
 * @param {string} name
 * @param {blockType} blockType
 * @param {string} variation
 * @returns {Object}
 */
const normalize = (options, name, blockType, variation) => {
  const normalizedOptions = Object.assign({}, config);

  // Handle block specific options.
  for (const [key, value] of Object.entries(options)) {
    const identifier = key.includes('.') ? key.split('.')[0] + '.' : '';
    const identifierKey = identifier ? identifier.split('.')[0] : '';
    switch (identifier) {
      case 'attributes.':
      case 'bedrock.':
      case 'forge.':
        if (key.startsWith(identifier)) {
          if (!normalizedOptions[identifierKey]) {
            normalizedOptions[identifierKey] = {};
          }
          normalizedOptions[identifierKey][key.substring(identifier.length)] =
            value;
        }
        break;
      default:
        if (key.includes('.')) {
          console.warn('Possible unsupported block option', key, 'with', value);
        }
        normalizedOptions[key] = value;
    }
  }

  // Setting default options, if needed.
  if (name) {
    normalizedOptions.name = name;
  }
  if (blockType) {
    normalizedOptions.type = blockType;
  }
  if (variation) {
    normalizedOptions.variation = variation;
  }
  if (!options.blockName) {
    normalizedOptions.blockName = normalizer.normalizeName(
      normalizedOptions.name
    );
  }
  if (!options.id) {
    normalizedOptions.id = normalizer.normalizeBlockId(
      normalizedOptions.name,
      normalizedOptions.namespace.includes('.')
        ? normalizedOptions.namespace.split(/[\s.]+/).pop()
        : normalizedOptions.namespace
    );
  }
  if (!options.icon) {
    normalizedOptions.icon = normalizedOptions.blockName;
  }
  if (!options.placeholder) {
    normalizedOptions.placeholder = getPlaceholders(normalizedOptions);
  }

  return component.sortObjectByKeys(normalizedOptions);
};

/**
 * @param {object} options
 * @returns
 */
const getPlaceholders = (options) => {
  const name = placeholder.getPlaceholderNames(options.name);
  const result = {
    BlockClassName: options.forge.className,
    BLOCKNAME: name.PLACEHOLDERNAME,
    BLOCK_NAME: name.PLACEHOLDER_NAME,
    BlockName: name.PlaceholderName,
    blockName: name.placeholderName,
    block_name: name.placeholder_name,
    blockname: name.placeholdername,
    CreativeTab: creativeTab.MISC,
    SoundType: options.attributes.soundType,
  };
  return result;
};

export default {
  config,
  getBlockTypeIcon,
  normalize,
  type,
};
