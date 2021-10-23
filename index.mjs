/**
 * @file Minecraft Utils Shared - Module version
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import configuration from './utils/configuration.mjs';
import defaultPath from './utils/default_path.mjs';
import enquirer from './helper/enquirer.mjs';
import fileFinder from './utils/file_finder.mjs';
import files from './utils/files.mjs';
import init from './utils/init.mjs';
import itemConfig from './default/item_config.mjs';
import itemConfigGenerator from './generators/bedrock/itemConfigGenerator.mjs';
import normalizer from './helper/normalizer.mjs';
import projectConfig from './default/project_config';
import resourceConfigGenerator from './generators/bedrock/resourceConfigGenerator.mjs';
import translation from './utils/translation.mjs';
import uuid from './utils/uuid.mjs';

export default {
  configurationUtils: configuration,
  defaultConfig: {
    item: itemConfig,
    project: projectConfig,
  },
  defaultPath: defaultPath,
  enquirerHelper: enquirer,
  fileFinderUtils: fileFinder,
  fileUtils: files,
  generators: {
    item: itemConfigGenerator,
    resource: resourceConfigGenerator,
  },
  initUtils: init,
  normalizeHelper: normalizer,
  translationUtils: translation,
  uuidUtils: uuid,
  utilsVersion:
    'unsupported (see https://nodejs.org/api/esm.html#esm_experimental_json_modules)',
};
