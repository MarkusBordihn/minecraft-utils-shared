/**
 * @file Minecraft Utils Shared - Project Config
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import os from 'os';
import path from 'path';

import component from './component.mjs';
import normalizer from './../helper/normalizer.mjs';
import translation from './../utils/translation.mjs';

const configVersion = '0.0.1';

/**
 * @enum
 */
const gameType = Object.freeze({
  BEDROCK: 'bedrock',
  FORGE: 'forge',
  UNKNOWN: 'unknown',
});

/**
 * @enum
 */
const type = Object.freeze({
  ADD_ON: 'add-on',
  BEHAVIOR_PACK: 'behavior_pack',
  MOD: 'mod',
  RESOURCE_PACK: 'resource_pack',
  SKIN_PACK: 'skin_pack',
  UNKNOWN: 'unknown',
});

const author = process.env.USER || os.userInfo().username || 'Author Name';
const id = 'new_mod';
const projectPath = process.cwd();
const possibleNamespacePrefix =
  translation.language.substring(0, 2).toLocaleLowerCase() || 'net';

const config = {
  author: author,
  component: component.type.PROJECT,
  configVersion: configVersion,
  gameType: gameType.UNKNOWN,
  type: type.UNKNOWN,
  bedrock: {
    behaviorPack: {
      description:
        'Behavior Pack for ' +
        (process.env.npm_package_config_project_name ||
          process.env.npm_package_name ||
          'New cool items'),
    },
    resourcePack: {
      description:
        'Resource Pack for ' +
        (process.env.npm_package_config_project_name ||
          process.env.npm_package_name ||
          'New cool items'),
    },
    skinPack: {
      description:
        'Skin Pack for ' +
        (process.env.npm_package_config_project_name ||
          process.env.npm_package_name ||
          'New cool skins'),
    },
    folderName:
      normalizer.normalizePathName(
        process.env.npm_package_config_project_folder_name
      ) ||
      normalizer.normalizePathName(
        process.env.npm_package_config_project_name
      ) ||
      normalizer.normalizePathName(process.env.npm_package_name) ||
      'New_cool_items',
  },
  forge: {
    assetsPath: path.join(
      projectPath,
      ...'src/main/resources/assets/new_mod'.split('/')
    ),
    className: 'NewModClassName',
    classPath: path.join(
      projectPath,
      ...'src/main/java/net/example'.split('/')
    ),
    description: 'This is the description for a new Forge mod',
    id: id,
    license: 'MIT',
    templatePath: '',
    namespace:
      `${possibleNamespacePrefix}.${normalizer.normalizeModId(author)}.${id}` ||
      'net.example',
    vendorName: `${normalizer.normalizeVendorName(author)}`,
  },
  name:
    process.env.npm_package_config_project_name ||
    process.env.npm_package_name ||
    'New Project',
  minEngineVersion: '1.16.5',
  misc: {},
  version: process.env.npm_package_version || '1.0.0',
};

/**
 * @param {Object} options
 * @param {string} name
 * @param {gameType} projectGameType
 * @returns {Object}
 */
const normalize = (options, name, projectGameType) => {
  const normalizedOptions = Object.assign({}, config);

  // Handle bedrock, forge and misc specific options.
  for (const [key, value] of Object.entries(options)) {
    if (key.startsWith('bedrock.behaviorPack.')) {
      normalizedOptions['bedrock']['behaviorPack'][
        key.replace('bedrock.behaviorPack.', '')
      ] = value;
    } else if (key.startsWith('bedrock.resourcePack.')) {
      normalizedOptions['bedrock']['resourcePack'][
        key.replace('bedrock.resourcePack.', '')
      ] = value;
    } else if (key.startsWith('bedrock.skinPack.')) {
      normalizedOptions['bedrock']['skinPack'][
        key.replace('bedrock.skinPack.', '')
      ] = value;
    } else if (key.startsWith('bedrock.')) {
      normalizedOptions['bedrock'][key.replace('bedrock.', '')] = value;
    } else if (key.startsWith('forge.')) {
      normalizedOptions['forge'][key.replace('forge.', '')] = value;
    } else if (key.startsWith('misc.')) {
      normalizedOptions['misc'][key.replace('misc.', '')] = value;
    } else {
      normalizedOptions[key] = value;
    }
  }

  // Setting default options.
  if (name) {
    normalizedOptions.name = name;
  }
  if (projectGameType) {
    normalizedOptions.gameType = projectGameType;
  }

  // Add Forge specific adjustments
  if (!normalizedOptions.forge.classPath && options.namespace) {
    normalizedOptions.forge.classPath = path.join(
      process.cwd(),
      'src',
      'main',
      'java',
      ...options.namespace.split('.')
    );
  }
  if (!normalizedOptions.forge.assetsPath && options.id) {
    normalizedOptions.forge.assetsPath = path.join(
      process.cwd(),
      'src',
      'main',
      'resources',
      'assets',
      options.id
    );
  }

  return component.sortObjectByKeys(normalizedOptions);
};

export default {
  config,
  normalize,
  gameType,
  type,
};
