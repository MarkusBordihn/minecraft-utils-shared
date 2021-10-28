/**
 * @file Minecraft Utils Shared - Module version
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import blockConfig from './default/block_config.mjs';
import configuration from './utils/configuration.mjs';
import defaultPath from './utils/default_path.mjs';
import enquirer from './helper/enquirer.mjs';
import fileFinder from './utils/file_finder.mjs';
import files from './utils/files.mjs';
import gradle from './utils/gradle.mjs';
import init from './utils/init.mjs';
import itemConfig from './default/item_config.mjs';
import itemConfigGenerator from './generators/bedrock/item_config_generator.mjs';
import normalizer from './helper/normalizer.mjs';
import projectConfig from './default/project_config.mjs';
import resourceConfigGenerator from './generators/bedrock/resource_config_generator.mjs';
import template from './utils/template.mjs';
import translation from './utils/translation.mjs';
import uuid from './utils/uuid.mjs';

const defaultConfig = {
  block: blockConfig,
  item: itemConfig,
  project: projectConfig,
};

const generators = {
  item: itemConfigGenerator,
  resource: resourceConfigGenerator,
};

const utilsVersion =
  'unsupported (see https://nodejs.org/api/esm.html#esm_experimental_json_modules)';

// Export default
export default {
  configurationUtils: configuration,
  defaultConfig,
  defaultPath: defaultPath,
  enquirerHelper: enquirer,
  fileFinderUtils: fileFinder,
  fileUtils: files,
  generators,
  gradleUtils: gradle,
  initUtils: init,
  normalizeHelper: normalizer,
  templateUtils: template,
  translationUtils: translation,
  utilsVersion,
  uuidUtils: uuid,
};

// Export single entries
export {
  configuration as configurationUtils,
  defaultConfig,
  defaultPath,
  enquirer as enquirerHelper,
  fileFinder as fileFinderUtils,
  files as fileUtils,
  generators,
  gradle as gradleUtils,
  init as initUtils,
  normalizer as normalizeHelper,
  template as templateUtils,
  translation as translationUtils,
  utilsVersion,
  uuid as uuidUtils,
};
