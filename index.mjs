/**
 * @file Minecraft Utils Shared - Module version
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import defaultPath from './utils/default_path.mjs';
import enquirer from './helper/enquirer.mjs';
import fileFinder from './utils/file_finder.mjs';
import files from './utils/files.mjs';
import init from './utils/init.mjs';
import normalizer from './helper/normalizer.mjs';
import translation from './utils/translation.mjs';
import uuid from './utils/uuid.mjs';

export default {
  defaultPath: defaultPath,
  enquirerHelper: enquirer,
  fileFinderUtils: fileFinder,
  fileUtils: files,
  initUtils: init,
  normalizeHelper: normalizer,
  translationUtils: translation,
  uuidUtils: uuid,
};
