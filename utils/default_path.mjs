/**
 * @file Minecraft Utils Shared - Default Paths
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import os from 'os';
import path from 'path';
import { fileURLToPath, URL } from 'url';

import configuration from './configuration.mjs';
import fileFinderUtils from './file_finder.mjs';
import fileUtils from './files.mjs';
import template from './template.mjs';

// General path
const configPath = configuration.configPath;
const modulePath = fileURLToPath(new URL('..', import.meta.url));
const projectPath = process.cwd();
const templatePath = template.templatePath;

// Assets path
const assetsPath =
  modulePath.endsWith(`${path.sep}dist`) ||
  modulePath.endsWith(`${path.sep}dist${path.sep}`)
    ? path.join(modulePath, '..', 'assets')
    : path.join(modulePath, 'assets');

// Manifest files
const manifests = fileFinderUtils.getManifestsInWorkingPath();

// Java files
const javaFiles = fileFinderUtils.getJavaFilesInWorkingPath();

// Minecraft Bedrock specific paths
const minecraftBedrockPath = fileUtils.returnIfFileExists(
  process.env.LOCALAPPDATA,
  'Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe'
);
const minecraftBedrockLocalStatePath = fileUtils.returnIfFileExists(
  minecraftBedrockPath,
  path.join('LocalState', 'games', 'com.mojang')
);

// Minecraft Forge specific paths
const minecraftForgeModPath = javaFiles
  ? fileFinderUtils.getModInWorkingPath(javaFiles)
  : '';

export default {
  // General Paths
  modulePath,

  // Project
  project: {
    config: configPath,
    path: projectPath,
    template: templatePath,
  },

  // Assets specific
  assets: {
    armor: path.join(assetsPath, 'armor'),
    base: assetsPath,
    init: path.join(assetsPath, 'init'),
    items: path.join(assetsPath, 'items'),
    logos: path.join(assetsPath, 'logos'),
    misc: path.join(assetsPath, 'misc'),
    models: path.join(assetsPath, 'models'),
  },

  // Manifests
  manifests: manifests || [],

  // Java files
  javaFiles: javaFiles || [],

  // Minecraft Bedrock specific
  bedrock: {
    client: {
      path: minecraftBedrockPath,
      localState: minecraftBedrockLocalStatePath,
      developmentBehaviorPacks: fileUtils.returnIfFileExists(
        minecraftBedrockLocalStatePath,
        'development_behavior_packs'
      ),
      developmentResourcePacks: fileUtils.returnIfFileExists(
        minecraftBedrockLocalStatePath,
        'development_resource_packs'
      ),
      developmentSkinPacks: fileUtils.returnIfFileExists(
        minecraftBedrockLocalStatePath,
        'development_skin_packs'
      ),
      behaviorPacks: fileUtils.returnIfFileExists(
        minecraftBedrockLocalStatePath,
        'behavior_packs'
      ),
      resourcePacks: fileUtils.returnIfFileExists(
        minecraftBedrockLocalStatePath,
        'resource_packs'
      ),
      skinPacks: fileUtils.returnIfFileExists(
        minecraftBedrockLocalStatePath,
        'skin_packs'
      ),
    },
    behaviorPack: manifests
      ? fileFinderUtils.getBehaviorPackInWorkingPath(manifests)
      : '',
    resourcePack: manifests
      ? fileFinderUtils.getResourcePackInWorkingPath(manifests)
      : '',
  },

  // Minecraft Forge specific
  forge: {
    javaPath: path.join(projectPath, 'src', 'main', 'java'),
    modPath: minecraftForgeModPath,
    itemPath: fileUtils.returnIfFileExists(minecraftForgeModPath, 'item'),
  },

  // Test
  test: {
    tmp: path.join(os.tmpdir(), '.minecraft-utils-shared'),
  },

  // Misc
  misc: {
    tmp: os.tmpdir(),
  },
};
