/**
 * @file Minecraft Utils Shared - Attachable Config Generator
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import itemConfig from '../../default/item_config.mjs';

/**
 * @param {Object} itemOptions
 * @returns {Object} Item Definition
 */
const getAttachableConfig = (itemOptions = {}) => {
  const options = itemConfig.normalize(itemOptions);
  const result = {
    format_version: options.bedrock.formatVersion,
    'minecraft:attachable': {
      description: {
        identifier: options.id,
        materials: {
          default: 'armor',
          enchanted: 'armor_enchanted',
        },
        textures: {
          default: options.textures_default || '',
          enchanted: options.textures_enchanted || '',
        },
        geometry: {
          default: options.attachable.geometry || '',
        },
        scripts: {
          parent_setup: '',
        },
        render_controllers: options.render_controllers || [
          'controller.render.armor',
        ],
      },
    },
  };
  return result;
};
