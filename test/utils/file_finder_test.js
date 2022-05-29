/**
 * @file Minecraft Utils Shared Test - File finder
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import assert from 'assert';
import path from 'path';

import file_finder from '../../utils/file_finder.mjs';

describe('utils/file_finder', () => {
  describe('Object', () => {
    it('should be ok', () => {
      assert.equal(typeof file_finder, 'object');
    });
  });
  describe('getManifestsInSearchPath()', () => {
    it('should find two files', () => {
      const manifests = file_finder.getManifestsInSearchPath(
        path.join('test_files')
      );
      assert.equal(manifests.length, '2');
    });
    it('should find one file', () => {
      const manifests = file_finder.getManifestsInSearchPath(
        path.join('test_files', 'manifest', 'folder1')
      );
      assert.equal(manifests.length, '1');
    });
  });
});
