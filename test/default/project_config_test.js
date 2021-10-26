/**
 * @file Minecraft Utils Shared Test - Default project config
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import assert from 'assert';

import defaultProjectConfig from '../../default/project_config.mjs';

describe('default/project_config', () => {
  describe('Object', () => {
    it('should be ok', () => {
      assert.equal(typeof defaultProjectConfig, 'object');
    });
  });
  describe('.config', () => {
    it('should not be empty', () => {
      assert(Object.keys(defaultProjectConfig.config).length > 0);
    });
  });
  describe('.normalize', () => {
    it('should be equal', () => {
      assert.deepEqual(
        defaultProjectConfig.normalize({}),
        defaultProjectConfig.config
      );
    });
  });
  describe('.normalize (multiple)', () => {
    it('should be equal', () => {
      assert.deepEqual(
        defaultProjectConfig.normalize(defaultProjectConfig.normalize({})),
        defaultProjectConfig.config
      );
    });
  });
});
