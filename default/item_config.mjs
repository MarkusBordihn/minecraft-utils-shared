/**
 * @file Minecraft Utils Shared - Item Config
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import component from './component.mjs';
import normalizer from './../helper/normalizer.mjs';

const configVersion = '0.0.1';

/**
 * @enum
 */
const type = Object.freeze({
  ARMOR: 'armor',
  BLOCK_PLACER: 'blockPlacer',
  BOOTS: 'boots',
  CHESTPLATE: 'chestplate',
  CUSTOM: 'custom',
  DIGGER: 'digger',
  DYE_POWDER: 'dyePowder',
  ENTITY_PLACER: 'entityPlacer',
  FOOD: 'food',
  FUEL: 'fuel',
  HELMET: 'helmet',
  SIMPLE: 'simple',
  LEGGINGS: 'leggings',
  PROJECTILE: 'projectile',
  TEST: 'test',
  THROWABLE: 'throwable',
  WEAPON: 'weapon',
  WEARABLE: 'wearable',
});

/**
 * @enum
 */
const typeIcon = {};
typeIcon[type.ARMOR] = '🛡️';
typeIcon[type.BLOCK_PLACER] = '🔲';
typeIcon[type.BOOTS] = '🥾';
typeIcon[type.CHESTPLATE] = '👕';
typeIcon[type.CUSTOM] = '✏️';
typeIcon[type.DIGGER] = '⛏️';
typeIcon[type.DYE_POWDER] = '✨';
typeIcon[type.ENTITY_PLACER] = '🕷️';
typeIcon[type.FOOD] = '🍎';
typeIcon[type.FUEL] = '🛢️';
typeIcon[type.HELMET] = '⛑';
typeIcon[type.SIMPLE] = '🌿';
typeIcon[type.LEGGINGS] = '👖';
typeIcon[type.PROJECTILE] = '🏹';
typeIcon[type.TEST] = '🧪';
typeIcon[type.THROWABLE] = '❄️';
typeIcon[type.WEAPON] = '⚔️';
typeIcon[type.WEARABLE] = '👖';

/**
 * @enum
 */
const category = Object.freeze({
  EQUIPMENT: 'equipment',
  ITEMS: 'items',
  NATURE: 'nature',
  TEST: 'test',
});

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
  : 'my_item';

const config = {
  component: component.type.ITEM,
  configVersion: configVersion,
  id: 'my_item:new_custom_item',
  itemName: 'new_custom_item',
  type: type.CUSTOM,
  name: 'New custom item',
  namespace: namespace,
  bedrock: {
    formatVersion: '1.16.1',
  },
  forge: {
    className: '',
  },
  placeholder: {
    CreativeTab: 'TAB_MISC',
    ITEM_NAME: 'NEW_CUSTOM_ITEM',
    ItemClassName: '',
    item_name: 'new_custom_item',
  },
  description: '',
  variation: '',
  icon: 'new_custom_item',
  category: category.ITEMS,
  attributes: {
    foil: false,
  },
  events: {},
  misc: {},
};

/**
 * @param {string} itemType
 * @returns {string} Emoji for the given item type.
 */
const getItemTypeIcon = (itemType) => {
  return typeIcon[itemType] || '✏️';
};

/**
 * @param {Object} options
 * @param {string} name
 * @param {itemType} itemType
 * @param {string} variation
 * @returns {Object}
 */
const normalize = (options, name, itemType, variation) => {
  const normalizedOptions = Object.assign({}, config);

  // Handle specific options.
  for (const [key, value] of Object.entries(options)) {
    const identifier = key.includes('.') ? key.split('.')[0] + '.' : '';
    const identifierKey = identifier ? identifier.split('.')[0] : '';
    switch (identifier) {
      case 'armor.':
      case 'attachable.':
      case 'attributes.':
      case 'bedrock.':
      case 'digger.':
      case 'food.':
      case 'forge.':
      case 'fuel.':
      case 'misc.':
      case 'renderOffset.':
      case 'textures.':
      case 'throwable.':
      case 'weapon.':
      case 'wearable.':
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
          console.warn('Possible unsupported item option', key, 'with', value);
        }
        normalizedOptions[key] = value;
    }
  }

  // Setting default options, if needed.
  if (name) {
    normalizedOptions.name = name;
  }
  if (itemType) {
    normalizedOptions.type = itemType;
  }
  if (variation) {
    normalizedOptions.variation = variation;
  }
  if (!options.itemName) {
    normalizedOptions.itemName = normalizer.normalizeName(
      normalizedOptions.name
    );
  }
  if (!options.id) {
    normalizedOptions.id = normalizer.normalizeItemId(
      normalizedOptions.name,
      normalizedOptions.namespace.includes('.')
        ? normalizedOptions.namespace.split(/[\s.]+/).pop()
        : normalizedOptions.namespace
    );
  }
  if (!options.icon) {
    normalizedOptions.icon = normalizedOptions.itemName;
  }
  if (!options.category) {
    switch (normalizedOptions.type) {
      case type.ARMOR:
      case type.DIGGER:
      case type.THROWABLE:
      case type.WEAPON:
      case type.WEARABLE:
        normalizedOptions.category = category.EQUIPMENT;
        break;
      case type.FOOD:
        normalizedOptions.category = category.NATURE;
        break;
      case type.CUSTOM:
      case type.FUEL:
      default:
        normalizedOptions.category = category.ITEMS;
    }
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
  const result = {
    ITEM_NAME: options.itemName.toUpperCase(),
    item_name: options.itemName.toLowerCase(),
    CreativeTab: creativeTab.MISC,
    ItemClassName: options.forge.className,
  };
  return result;
};

export default {
  category,
  config,
  creativeTab,
  getItemTypeIcon,
  normalize,
  type,
};
