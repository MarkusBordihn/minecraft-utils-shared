/**
 * @file Minecraft Utils Shared - CommonJS version
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const defaultPath = require('./dist/utils/default_path.cjs');
const enquirer = require('./dist/helper/enquirer.cjs');
const fileFinder = require('./dist/utils/file_finder.cjs');
const files = require('./dist/utils/files.cjs');
const init = require('./dist/utils/init.cjs');
const normalizer = require('./dist/helper/normalizer.cjs');
const translation = require('./dist/utils/translation.cjs');
const uuid = require('./dist/utils/uuid.cjs');

exports.defaultPath = defaultPath.default;
exports.enquirerHelper = enquirer.default;
exports.fileFinderUtils = fileFinder.default;
exports.fileUtils = files.default;
exports.initUtils = init.default;
exports.normalizeHelper = normalizer.default;
exports.translationUtils = translation.default;
exports.uuidUtils = uuid.default;
