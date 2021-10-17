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
  LEGGINGS: 'leggings',
  PROJECTILE: 'projectile',
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
typeIcon[type.LEGGINGS] = '👖';
typeIcon[type.PROJECTILE] = '🏹';
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
});

const config = {
  component: component.type.ITEM,
  configVersion: configVersion,
  id: '',
  itemName: '',
  type: type.CUSTOM,
  name: 'New custom item',
  namespace: process.env.npm_package_config_project_namespace || 'my_item',
  bedrock: {
    formatVersion: '1.16.1',
  },
  description: '',
  variation: '',
  icon: '',
  category: '',
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
      normalizedOptions.namespace
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

  return component.sortObjectByKeys(normalizedOptions);
};

export default {
  category,
  config,
  getItemTypeIcon,
  normalize,
  type,
};
