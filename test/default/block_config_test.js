/**
 * @file Minecraft Utils Shared Test - Default item config
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import assert from 'assert';

import defaultBlockConfig from '../../default/block_config.mjs';

describe('default/block_config', () => {
  describe('Object', () => {
    it('should be ok', () => {
      assert.equal(typeof defaultBlockConfig, 'object');
    });
  });
  describe('.config', () => {
    it('should not be empty', () => {
      assert(Object.keys(defaultBlockConfig.config).length > 0);
    });
  });
  describe('.type', () => {
    it('should not be empty', () => {
      assert(Object.keys(defaultBlockConfig.type).length > 0);
      assert.equal(defaultBlockConfig.type.TEST, 'test');
    });
  });
  describe('.getBlockTypeIcon', () => {
    it('should be equal', () => {
      assert.equal(
        defaultBlockConfig.getBlockTypeIcon(defaultBlockConfig.type.TEST),
        '🧪'
      );
    });
  });
  describe('.normalize', () => {
    it('should be equal', () => {
      assert.deepEqual(
        defaultBlockConfig.normalize({}),
        defaultBlockConfig.config
      );
    });
  });
  describe('.normalize (multiple)', () => {
    it('should be equal', () => {
      assert.deepEqual(
        defaultBlockConfig.normalize(defaultBlockConfig.normalize({})),
        defaultBlockConfig.config
      );
    });
  });
  describe('.normalize (options)', () => {
    const values = {
      'armor.test': 1,
      'attachable.test': 2,
      'attributes.test': 3,
      'bedrock.test': 4,
      'digger.test': 5,
      'food.test': 6,
      'forge.test': 7,
      'fuel.test': 8,
      'misc.test': 9,
      'renderOffset.test': 10,
      'textures.test': 11,
      'throwable.test': 12,
      'weapon.test': 13,
      'wearable.test': 14,
    };
    const options = defaultBlockConfig.normalize(values);
    it('should be equal the predefined values', () => {
      assert.equal(options['armor.test'], values['armor.test']);
      assert.equal(options['attachable.test'], values['attachable.test']);
      assert.equal(options.attributes.test, values['attributes.test']);
      assert.equal(options.bedrock.test, values['bedrock.test']);
      assert.equal(options['digger.test'], values['digger.test']);
      assert.equal(options['food.test'], values['food.test']);
      assert.equal(options.forge.test, values['forge.test']);
      assert.equal(options['fuel.test'], values['fuel.test']);
      assert.equal(options['misc.test'], values['misc.test']);
      assert.equal(options['renderOffset.test'], values['renderOffset.test']);
      assert.equal(options['textures.test'], values['textures.test']);
      assert.equal(options['throwable.test'], values['throwable.test']);
      assert.equal(options['weapon.test'], values['weapon.test']);
      assert.equal(options['wearable.test'], values['wearable.test']);
    });
  });
});
