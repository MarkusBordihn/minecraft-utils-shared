/**
 * @file Minecraft Utils Shared - Resource Config Generator
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import compareVersions from 'compare-versions';

import component from '../../default/component.mjs';

/**
 * @param {Object} options
 * @returns {Object} Item Definition
 */
const getResourceConfig = (options = {}) => {
  const result = {
    format_version: options.bedrock.formatVersion,
  };

  if (options.component == component.type.ITEM) {
    handleItemOptions(result, options);
  }

  return result;
};

/**
 * @param {Object} result
 * @param {Object} options
 */
const handleItemOptions = (result, options) => {
  result['minecraft:item'] = {
    description: {
      identifier: options.id,
    },
    components: {},
  };

  if (compareVersions.compare(options.bedrock.formatVersion, '1.16.100', '<')) {
    result['minecraft:item'].components['minecraft:icon'] =
      options.icon || options.itemName;
    result['minecraft:item'].components['minecraft:display_name'] = {
      value: `item.${options.id}.name`,
    };
    if (options.render_offsets) {
      result['minecraft:item'].components['minecraft:render_offsets'] =
        options.render_offsets;
    }
    if (options.use_animation) {
      result['minecraft:item'].components['minecraft:use_animation'] =
        options.use_animation;
    }
  }

  // Attachables ?
};

export default {
  getResourceConfig,
};
