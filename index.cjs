/**
 * @fileoverview Minecraft Utils Shared - CommonJS version
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

const defaultPath = require('./dist/default_path.cjs');
const files = require('./dist/files.cjs');
const manifest = require('./dist/manifest.cjs');
const translation = require('./dist/translation.cjs');
const uuid = require('./dist/uuid.cjs');

exports.defaultPath = defaultPath.default;
exports.fileUtils = files.default;
exports.manifestUtils = manifest.default;
exports.translationUtils = translation.default;
exports.uuidUtils = uuid.default;
