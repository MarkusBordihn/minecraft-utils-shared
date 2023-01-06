/**
 * @file Minecraft Utils Shared - Debug
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import configurationUtils from './configuration.mjs';
import defaultPath from './default_path.mjs';
import translationUtils from './translation.mjs';

const args = process.argv.slice(2);

const debug = () => {
  const projectConfig = configurationUtils.loadProjectConfig();

  console.log('minecraft-utils-shared:', args, '\n');
  console.log('Detected Language:', translationUtils.language);
  if (projectConfig) {
    console.log('\nProject Config', projectConfig);
  }
  console.log('\nDetected paths:', defaultPath);
  console.log('\nProcess Env:', process.env);
  console.log('Version', process.env.npm_package_version);
};

debug();
