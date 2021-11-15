/**
 * @file Minecraft Utils Shared - Project Config
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import os from 'os';
import path from 'path';
import { spawnSync } from 'child_process';

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

// Relative Path converter
const toRelativePath = (folderPath) => {
  if (path.isAbsolute(folderPath)) {
    return path.relative(projectPath, folderPath);
  }
  return folderPath;
};

const gitAuthor =
  spawnSync('git', ['config', 'user.name'], {
    shell: true,
  })
    .stdout.toString()
    .split('\n')[0]
    .trim() || '';
const author =
  gitAuthor || process.env.USER || os.userInfo().username || 'Author Name';
const projectId = 'new_project';
const projectPath = process.cwd();
const possibleNamespacePrefix =
  translation.language.substring(0, 2).toLocaleLowerCase() || 'net';
const assetsPath = path.join(
  projectPath,
  ...'src/main/resources/assets/new_project'.split('/')
);
const classPath = path.join(
  projectPath,
  ...'src/main/java/net/example'.split('/')
);
const dataPath = path.join(projectPath, 'src', 'main', 'resources', 'data');
const namespace =
  process.env.npm_package_config_project_namespace ||
  `${possibleNamespacePrefix}.${normalizer.normalizeModId(
    author
  )}.${projectId}` ||
  'net.example';

const config = {
  author: author,
  id: projectId,
  component: component.type.PROJECT,
  configVersion: configVersion,
  gameType: gameType.UNKNOWN,
  type: type.UNKNOWN,
  license: 'MIT',
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
    assetsPath: toRelativePath(assetsPath),
    className: 'NewModClassName',
    classPath: toRelativePath(classPath),
    dataPath: toRelativePath(dataPath),
    description: 'This is the description for a new Forge mod',
    namespace: namespace,
    templatePath: '',
    templatesPath: '',
    vendorName: `${normalizer.normalizeVendorName(author)}`,
  },
  placeholder: {
    Author: author,
    ModId: 'new_project',
    ModName: 'minecraft-utils-shared',
    assetsPath: toRelativePath(assetsPath),
    classPath: toRelativePath(classPath),
    dataPath: toRelativePath(dataPath),
    packageNamespace: namespace,
  },
  name:
    process.env.npm_package_config_project_name ||
    process.env.npm_package_name ||
    'New Project',
  minEngineVersion: '1.17.1',
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
  if (options['forge.namespace']) {
    normalizedOptions.forge.classPath = toRelativePath(
      path.join(
        process.cwd(),
        'src',
        'main',
        'java',
        ...options['forge.namespace'].split('.')
      )
    );
  }
  if (options.id) {
    normalizedOptions.forge.assetsPath = toRelativePath(
      path.join(process.cwd(), 'src', 'main', 'resources', 'assets', options.id)
    );
  }
  if (!options.placeholder) {
    normalizedOptions.placeholder = getPlaceholders(normalizedOptions);
  }

  return component.sortObjectByKeys(normalizedOptions);
};

/**
 * @param {object} options
 * @returns
 */
const getPlaceholders = (options) => {
  const result = {
    Author: options.author,
    ModId: options.id,
    ModName: options.name,
    assetsPath: toRelativePath(options.forge.assetsPath || ''),
    classPath: toRelativePath(options.forge.classPath || ''),
    dataPath: toRelativePath(options.forge.dataPath || ''),
    packageNamespace: options.forge.namespace,
  };
  return result;
};

export default {
  config,
  normalize,
  gameType,
  type,
};
