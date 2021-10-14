/**
 * @file Minecraft Utils Shared Test - Files
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import assert from 'assert';

import files from '../../utils/files.mjs';

describe('utils/files', () => {
  describe('Object', () => {
    it('should be ok', () => {
      assert.equal(typeof files, 'object');
    });
  });
});
