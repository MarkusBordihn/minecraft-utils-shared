/**
 * @file Minecraft Utils Shared - CommonJS version
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const blockConfig = require('./dist/default/block_config.cjs');
const configuration = require('./dist/utils/configuration.cjs');
const defaultPath = require('./dist/utils/default_path.cjs');
const enquirer = require('./dist/helper/enquirer.cjs');
const fileFinder = require('./dist/utils/file_finder.cjs');
const files = require('./dist/utils/files.cjs');
const gradle = require('./dist/utils/gradle.cjs');
const init = require('./dist/utils/init.cjs');
const itemConfig = require('./dist/default/item_config.cjs');
const itemConfigGenerator = require('./dist/generators/bedrock/item_config_generator.cjs');
const normalizer = require('./dist/helper/normalizer.cjs');
const projectConfig = require('./dist/default/project_config.cjs');
const resourceConfigGenerator = require('./dist/generators/bedrock/resource_config_generator.cjs');
const template = require('./dist/utils/template.cjs');
const translation = require('./dist/utils/translation.cjs');
const uuid = require('./dist/utils/uuid.cjs');
const { version } = require('./package.json');

module.exports = {
  configurationUtils: configuration.default,
  defaultConfig: {
    block: blockConfig.default,
    item: itemConfig.default,
    project: projectConfig.default,
  },
  defaultPath: defaultPath.default,
  enquirerHelper: enquirer.default,
  fileFinderUtils: fileFinder.default,
  fileUtils: files.default,
  generators: {
    item: itemConfigGenerator.default,
    resource: resourceConfigGenerator.default,
  },
  gradleUtils: gradle.default,
  initUtils: init.default,
  normalizeHelper: normalizer.default,
  templateUtils: template.default,
  translationUtils: translation.default,
  uuidUtils: uuid.default,
  utilsVersion: version,
};
