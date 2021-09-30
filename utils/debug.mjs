/**
 * @file Minecraft Utils Shared - Debug
 * @license Apache-2.0
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
