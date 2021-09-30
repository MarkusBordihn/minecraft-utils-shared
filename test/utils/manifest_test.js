/**
 * @fileoverview Minecraft Utils Shared Test - Manifest
 *
 * @license Copyright 2021 Markus Bordihn
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import assert from 'assert';
import manifest from '../../utils/manifest.mjs';
import path from 'path';

describe('utils/manifest', () => {
  describe('Object', () => {
    it('should be ok', () => {
      assert.equal(typeof manifest, 'object');
    });
  });
  describe('getManifestsInSearchPath()', () => {
    it('should find two files', () => {
      const manifests = manifest.getManifestsInSearchPath(
        path.join('test_files')
      );
      assert.equal(manifests.length, '2');
    });
    it('should find one file', () => {
      const manifests = manifest.getManifestsInSearchPath(
        path.join('test_files', 'manifest', 'folder1')
      );
      assert.equal(manifests.length, '1');
    });
  });
});
