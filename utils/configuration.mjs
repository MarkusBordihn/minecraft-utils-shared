/**
 * @file Minecraft Utils Shared - Configuration
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

import files from './files.mjs';
import normalizer from './../helper/normalizer.mjs';
import defaultProjectConfig from './../default/project_config.mjs';

/**
 * @returns {string}
 */
const getConfigurationExtension = () => {
  switch (getConfigurationPath()) {
    case '.minecraft-bedrock-utils':
      return '.mbu';
    case '.minecraft-forge-utils':
      return '.mfu';
    default:
      return '.mus';
  }
};

/**
 * @returns {string}
 */
const getConfigurationPath = () => {
  if (process.env) {
    if (
      (process.env.npm_lifecycle_script || '').includes(
        'minecraft-bedrock-utils'
      ) ||
      (process.env.npm_package_name || '').includes('minecraft-bedrock-utils')
    ) {
      return '.minecraft-bedrock-utils';
    } else if (
      (process.env.npm_lifecycle_script || '').includes(
        'minecraft-forge-utils'
      ) ||
      (process.env.npm_package_name || '').includes('minecraft-forge-utils')
    ) {
      return '.minecraft-forge-utils';
    }
  }
  return '.minecraft-utils-shared';
};

// eslint-disable-next-line prefer-const
let configPath = path.join(process.cwd(), getConfigurationPath());
// eslint-disable-next-line prefer-const
let configExtension = getConfigurationExtension();
// eslint-disable-next-line prefer-const
let projectConfig = path.join(configPath, `project${configExtension}`);

/**
 * @param {string} file
 * @returns {Object}
 */
const loadConfig = (file) => {
  if (!fs.existsSync(file)) {
    console.error(chalk.red('Unable to load configuration file', file));
    return {};
  }

  if (!file.endsWith(configExtension)) {
    console.warn(
      chalk.yellow(
        `File is not ending with ${configExtension} suffix, but will try to load it!`
      )
    );
  }

  const configurationFile = fs.readFileSync(file);
  return JSON.parse(configurationFile);
};

/**
 * @param {string} name
 * @returns {Object}
 */
const loadDefaultConfig = (name) => {
  return loadConfig(path.join(configPath, normalizer.normalizeFileName(name)));
};

/**
 * @returns {Object}
 */
const loadProjectConfig = () => {
  if (!fs.existsSync(projectConfig)) {
    console.warn(
      chalk.yellow(
        'Project file',
        projectConfig,
        'does not exists, using default values instead!'
      )
    );
    return defaultProjectConfig.config;
  }
  return loadConfig(projectConfig);
};

/**
 * @param {string} file
 * @param {Object} options
 */
const saveConfig = (file, options = {}) => {
  // Make sure file has an valid or known extension.
  if (
    !file.endsWith(configExtension) &&
    !file.endsWith('.mbu') &&
    !file.endsWith('.mfu') &&
    !file.endsWith('.mus')
  ) {
    file = `${file}${configExtension}`;
  }

  if (fs.existsSync(file)) {
    console.log('Overwrite configuration for', options.name, 'in file', file);
    files.createBackupFile(file);
  } else {
    console.log('Storing configuration for', options.name, 'in file', file);
  }

  // Remove context and other options to avoid a endless loop.
  delete options.context;
  delete options.save_config;

  fs.writeFileSync(file, JSON.stringify(options, null, 2));
};

/**
 * @param {string} name
 * @param {Object} options
 */
const saveDefaultConfig = (name, options = {}) => {
  files.createFolderIfNotExists(configPath);
  saveConfig(
    path.join(configPath, normalizer.normalizeFileName(name)),
    options
  );
};

/**
 * @param {Object} options
 */
const saveProjectConfig = (options = {}) => {
  files.createFolderIfNotExists(configPath);
  saveConfig(projectConfig, options);
};

export default {
  configExtension,
  configPath,
  loadConfig,
  loadDefaultConfig,
  loadProjectConfig,
  projectConfig,
  saveConfig,
  saveDefaultConfig,
  saveProjectConfig,
};
