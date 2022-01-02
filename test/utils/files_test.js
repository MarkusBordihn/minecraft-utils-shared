/**
 * @file Minecraft Utils Shared Test - Files
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import assert from 'assert';
import fs from 'fs';
import path from 'path';

import defaultPath from '../../utils/default_path.mjs';
import files from '../../utils/files.mjs';

describe('utils/files', () => {
  const tempPath = path.join(defaultPath.test.tmp, 'files_test');

  describe('Object', () => {
    it('should be ok', () => {
      assert.equal(typeof files, 'object');
    });
  });

  describe('copyFileIfNotExists', () => {
    files.copyFileIfNotExists(
      path.join(defaultPath.assets.init, '.gitignore'),
      path.join(tempPath, '.gitignore')
    );
    it('should be exists', () => {
      assert(fs.existsSync(path.join(tempPath, '.gitignore')));
    });
  });
});
