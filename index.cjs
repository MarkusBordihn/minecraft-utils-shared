/**
 * @file Minecraft Utils Shared - CommonJS version
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const configuration = require('./dist/utils/configuration.cjs');
const defaultPath = require('./dist/utils/default_path.cjs');
const enquirer = require('./dist/helper/enquirer.cjs');
const fileFinder = require('./dist/utils/file_finder.cjs');
const files = require('./dist/utils/files.cjs');
const init = require('./dist/utils/init.cjs');
const itemConfig = require('./dist/default/itemConfig.cjs');
const itemConfigGenerator = require('./dist/generators/bedrock/itemConfigGenerator.cjs');
const normalizer = require('./dist/helper/normalizer.cjs');
const projectConfig = require('./dist/default/projectConfig.cjs');
const resourceConfigGenerator = require('./dist/generators/bedrock/resourceConfigGenerator.cjs');
const translation = require('./dist/utils/translation.cjs');
const uuid = require('./dist/utils/uuid.cjs');
const { version } = require('./package.json');

exports.configurationUtils = configuration.default;
exports.defaultConfig = {
  item: itemConfig.default,
  project: projectConfig.default,
};
exports.defaultPath = defaultPath.default;
exports.enquirerHelper = enquirer.default;
exports.fileFinderUtils = fileFinder.default;
exports.fileUtils = files.default;
exports.generators = {
  item: itemConfigGenerator,
  resource: resourceConfigGenerator,
};
exports.initUtils = init.default;
exports.normalizeHelper = normalizer.default;
exports.translationUtils = translation.default;
exports.utilsVersion = version;
exports.uuidUtils = uuid.default;
