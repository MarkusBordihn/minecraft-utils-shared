/**
 * @fileoverview Minecraft Utils Shared - Debug
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

import translationUtils from './translation.mjs';
import defaultPath from './default_path.mjs';

const args = process.argv.slice(2);

const debug = () => {
  console.log('minecraft-utils-shared:', args, '\n');
  console.log('Detected Language:', translationUtils.language);
  console.log('Detected paths:', defaultPath);
  console.log('Process Env:', process.env);
};

debug();