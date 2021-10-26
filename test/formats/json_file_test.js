/**
 * @file Minecraft Utils Shared Test - JSON file
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import assert from 'assert';
import jsonFile from '../../formats/json_file.mjs';

describe('format/JSONFile', () => {
  describe('Object', () => {
    it('should be ok', () => {
      assert.equal(typeof jsonFile, 'object');
    });
  });
});
