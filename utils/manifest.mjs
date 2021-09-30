/**
 * @fileoverview Minecraft Utils Shared - Manifest.js (Bedrock)
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

import fs from 'fs';
import glob from 'glob';
import path from 'path';

/**
 * @param {String} search_path
 * @return {Array}
 */
const getManifestsInSearchPath = (search_path = process.cwd()) => {
  const searchPath = path.resolve(search_path);
  const result = [];
  // If we found a manifest.json in root we will use this.
  if (fs.existsSync(path.join(searchPath, 'manifest.json'))) {
    return [path.join(searchPath, 'manifest.json')];
  }
  // Search for alternative manifest files.
  glob
    .sync(path.join(searchPath, '**/manifest.json'), {
      nodir: true,
    })
    .map((file) => {
      result.push(path.resolve(file));
    });
  if (result.length > 0) {
    return result;
  }
};

const getManifestsInWorkingPath = () => {
  return getManifestsInSearchPath(process.cwd());
};

export default {
  getManifestsInSearchPath,
  getManifestsInWorkingPath,
};
