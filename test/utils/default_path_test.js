/**
 * @file Minecraft Utils Shared Test - Default Path
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import assert from 'assert';
import defaultPath from '../../utils/default_path.mjs';

describe('utils/default_path', () => {
  describe('Object', () => {
    it('should be ok', () => {
      assert.equal(typeof defaultPath, 'object');
    });
  });
  describe('workingPath', () => {
    it('should be equal with process.cwd()', () => {
      assert.equal(defaultPath.project.path, process.cwd());
    });
  });
});
