/**
 * @file Minecraft Utils Shared - Item Config Generator
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import compareVersions from 'compare-versions';
import itemConfig from '../../default/item_config.mjs';

/**
 * @param {Object} itemOptions
 * @returns {Object} Item Definition
 */
const getItemConfig = (itemOptions = {}) => {
  const options = itemConfig.normalize(itemOptions);
  const result = {
    format_version: options.bedrock.formatVersion,
    'minecraft:item': {
      description: {
        identifier: options.id,
        category: options.category || itemConfig.category.ITEM,
      },
      components: {},
    },
  };

  // Adding meta data for format version >= 1.16.100
  if (
    compareVersions.compare(options.bedrock.formatVersion, '1.16.100', '>=')
  ) {
    // Handles icon and name specific options
    result['minecraft:item'].components['minecraft:icon'] = {
      texture: options.itemName,
    };

    // Handles general options
    if (options.renderOffsets) {
      result['minecraft:item'].components['minecraft:render_offsets'] = {
        main_hand: [0, 0, 0],
        off_hand: [0, 0, 0],
      };
    }
    if (options.useAnimation) {
      result['minecraft:item'].components['minecraft:use_animation'] =
        options.use_animation;
    }
  }

  // Handle general options
  if (options.attributes) {
    handleGeneralOptions(result, options);
  }
 
  // Handle item type specific component options
  console.log('Item generator:', options);
  if (options.armor) {
    handleArmorType(result, options);
  }
  if (options.digger) {
    handleDiggerOptions(result, options);
  }
  if (options.food) {
    handleFoodType(result, options);
  }
  if (options.fuel) {
    handleFuelOptions(result, options);
  }
  if (options.projectile) {
    handleProjectileOptions(result, options);
  }
  if (options.throwable) {
    handleThrowableOptions(result, options);
  }
  if (options.weapon) {
    handleWeaponOptions(result, options);
  }

  return result;
};

/**
 * @param {Object} result
 * @param {Object} options
 */
const handleGeneralOptions = (result, options) => {
  if (options.attributes.useDuration) {
    result['minecraft:item'].components['minecraft:use_duration'] = parseInt(
      options.attributes.useDuration
    );
  }
  if (options.attributes.damage) {
    result['minecraft:item'].components['minecraft:damage'] = parseInt(
      options.attributes.damage
    );
  }
  if (options.attributes.foil) {
    result['minecraft:item'].components['minecraft:foil'] =
      options.attributes.foil || false;
  }
  if (options.attributes.handEquipped) {
    result['minecraft:item'].components['minecraft:hand_equipped'] = true;
  }
  if (options.attributes.maxStackSize) {
    result['minecraft:item'].components['minecraft:max_stack_size'] = parseInt(
      options.attributes.maxStackSize
    );
  }
  if (options.attributes.renderOffset) {
    result['minecraft:item'].components['minecraft:render_offsets'] =
      options.attributes.renderOffset;
  }
};

/**
 * @param {Object} result
 * @param {Object} options
 */
const handleArmorType = (result, options) => {
  result['minecraft:item'].components['minecraft:armor'] = {
    protection: parseInt(options.armor.protection),
  };
  if (options.armor.textureType) {
    result['minecraft:item'].components['minecraft:armor'].texture_type =
      options.armor.textureType;
  }

  switch (options.variation) {
    case 'boots':
      result['minecraft:item'].components['minecraft:creative_category'] = {
        parent: 'itemGroup.name.boots',
      };
      result['minecraft:item'].components['minecraft:enchantable'] = {
        value: 14,
        slot: 'armor_feet',
      };
      result['minecraft:item'].components['minecraft:render_offsets'] = 'boots';
      result['minecraft:item'].components['minecraft:wearable'] = {
        slot: 'slot.armor.feet',
      };
      break;
    case 'chestplate':
      result['minecraft:item'].components['minecraft:creative_category'] = {
        parent: 'itemGroup.name.chestplate',
      };
      result['minecraft:item'].components['minecraft:enchantable'] = {
        value: 14,
        slot: 'armor_torso',
      };
      result['minecraft:item'].components['minecraft:render_offsets'] =
        'chestplates';
      result['minecraft:item'].components['minecraft:wearable'] = {
        slot: 'slot.armor.chest',
      };
      break;
    case 'helmet':
      result['minecraft:item'].components['minecraft:creative_category'] = {
        parent: 'itemGroup.name.helmet',
      };
      result['minecraft:item'].components['minecraft:enchantable'] = {
        value: 14,
        slot: 'armor_head',
      };
      result['minecraft:item'].components['minecraft:wearable'] = {
        slot: 'slot.armor.head',
      };
      break;
    case 'leggings':
      result['minecraft:item'].components['minecraft:creative_category'] = {
        parent: 'itemGroup.name.leggings',
      };
      result['minecraft:item'].components['minecraft:enchantable'] = {
        value: 14,
        slot: 'armor_legs',
      };
      result['minecraft:item'].components['minecraft:render_offsets'] =
        'leggings';
      result['minecraft:item'].components['minecraft:wearable'] = {
        slot: 'slot.armor.legs',
      };
      break;
  }
};

/**
 * @param {Object} result
 * @param {Object} options
 */
const handleDiggerOptions = (result, options) => {
  result['minecraft:item'].components['minecraft:digger'] = {
    use_efficiency: options.digger.useEfficiency || false,
  };
  if (options.digger.destroySpeeds) {
    result['minecraft:item'].components['minecraft:digger'].destroy_speeds = [];
  }
  if (options.digger.onDig) {
    result['minecraft:item'].components['minecraft:digger'].on_dig = '';
  }
};

/**
 * @param {Object} result
 * @param {Object} options
 */
const handleFoodType = (result, options) => {
  result['minecraft:item'].components['minecraft:food'] = {
    can_always_eat: options.can_always_eat || false,
    nutrition: parseInt(options.nutrition),
    saturation_modifier: options.saturation_modifier || 'normal',
    using_converts_to: options.using_converts_to || '',
  };
  if (options.effects) {
    result['minecraft:item'].components['minecraft:food'].effects = [];
  }
};

/**
 * @param {Object} result
 * @param {Object} options
 */
const handleFuelOptions = (result, options) => {
  result['minecraft:item'].components['minecraft:fuel'] = {
    duration: parseInt(options.fuel.duration),
  };
};

/**
 * @param {Object} result
 * @param {Object} options
 */
const handleProjectileOptions = (result, options) => {
  result['minecraft:item'].components['minecraft:projectile'] = {
    projectile_entity: options.projectile.projectileEntity || 'minecraft:arrow',
    minimum_critical_power: options.projectile.minimumCriticalPower || 1,
  };
};

/**
 * @param {Object} result
 * @param {Object} options
 */
const handleThrowableOptions = (result, options) => {
  result['minecraft:item'].components['minecraft:throwable'] = {
    do_swing_animation: options.throwable.doSwingAnimation || false,
    launch_power_scale: parseFloat(options.throwable.launchPowerScale) || 1.0,
    max_draw_duration: parseFloat(options.throwable.maxDrawDuration) || 0.0,
    max_launch_power: parseFloat(options.throwable.maxLaunchPower) || 1.0,
    min_draw_duration: parseFloat(options.throwable.minDrawDuration) || 0.0,
    scale_power_by_draw_duration:
      options.throwable.scalePowerByDrawDuration || false,
  };
  result['minecraft:item'].components['minecraft:projectile'] = {
    projectile_entity: 'minecraft:arrow',
    minimum_critical_power: 1,
  };
};

/**
 * @param {Object} result
 * @param {Object} options
 */
const handleWeaponOptions = (result, options) => {
  result['minecraft:item'].components['minecraft:weapon'] = {};
  if (options.weapon.onHitBlock) {
    result['minecraft:item'].components['minecraft:weapon'].on_hit_block =
      options.weapon.onHitBlock;
  }
  if (options.weapon.onHurtEntity) {
    result['minecraft:item'].components['minecraft:weapon'].on_hurt_entity =
      options.weapon.onHurtEntity;
  }
  if (options.weapon.onNotHurtEntity) {
    result['minecraft:item'].components['minecraft:weapon'].on_not_hurt_entity =
      options.weapon.onNotHurtEntity;
  }
};

export default {
  getItemConfig,
};
