/* eslint-disable compat/compat */
/**
 * @fileoverview Minecraft Utils Shared - Default Paths
 *
 * @license Copyright 2021 Markus Bordihn
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import { fileURLToPath, URL } from 'url';
import path from 'path';

import fileUtils from './files.mjs';
import manifestUtils from './manifest.mjs';

// General path
const configPath = path.join(
  process.cwd(),
  `.${process.env.npm_package_name || 'minecraft-utils-shared'}`
);
const modulePath = fileURLToPath(new URL('..', import.meta.url));
const projectPath = process.cwd();

// Assets path
const assetsPath = path.join(modulePath, 'assets');
const assetsInitPath = path.join(assetsPath, 'init');
const assetsItemsPath = path.join(assetsPath, 'items');
const assetsMiscPath = path.join(assetsPath, 'misc');
const assetsModelsArmorPath = path.join(assetsPath, 'armor');
const assetsModelsPath = path.join(assetsPath, 'models');

// Manifest files
const manifests = manifestUtils.getManifestsInWorkingPath();

// Minecraft Bedrock specific paths
const minecraftBedrockPath = fileUtils.returnIfFileExists(
  process.env.LOCALAPPDATA,
  'Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe'
);
const minecraftBedrockLocalStatePath = fileUtils.returnIfFileExists(
  minecraftBedrockPath,
  path.join('LocalState', 'games', 'com.mojang')
);
const minecraftBedrockDevelopmentBehaviorPacksPath =
  fileUtils.returnIfFileExists(
    minecraftBedrockLocalStatePath,
    'development_behavior_packs'
  );
const minecraftBedrockDevelopmentResourcePacksPath =
  fileUtils.returnIfFileExists(
    minecraftBedrockLocalStatePath,
    'development_resource_packs'
  );
const minecraftBedrockDevelopmentSkinPacksPath = fileUtils.returnIfFileExists(
  minecraftBedrockLocalStatePath,
  'development_skin_packs'
);
const minecraftBedrockBehaviorPacksPath = fileUtils.returnIfFileExists(
  minecraftBedrockLocalStatePath,
  'behavior_packs'
);
const minecraftBedrockResourcePacksPath = fileUtils.returnIfFileExists(
  minecraftBedrockLocalStatePath,
  'resource_packs'
);
const minecraftBedrockSkinPacksPath = fileUtils.returnIfFileExists(
  minecraftBedrockLocalStatePath,
  'skin_packs'
);

// Minecraft Forge specific paths

export default {
  // General Paths
  modulePath,

  // Project
  project: {
    config: configPath,
    path: projectPath,
  },

  // Assets specific
  assets: {
    armor: assetsModelsArmorPath,
    base: assetsPath,
    init: assetsInitPath,
    items: assetsItemsPath,
    misc: assetsMiscPath,
    models: assetsModelsPath,
  },

  // Manifests
  manifests: manifests || [],

  // Minecraft Bedrock specific
  bedrock: {
    path: minecraftBedrockPath,
    localState: minecraftBedrockLocalStatePath,
    developmentBehaviorPacks: minecraftBedrockDevelopmentBehaviorPacksPath,
    developmentResourcePacks: minecraftBedrockDevelopmentResourcePacksPath,
    developmentSkinPacks: minecraftBedrockDevelopmentSkinPacksPath,
    behaviorPacks: minecraftBedrockBehaviorPacksPath,
    resourcePacks: minecraftBedrockResourcePacksPath,
    skinPacks: minecraftBedrockSkinPacksPath,
  },

  // Minecraft Forge specific
  forge: {},

  // Misc
};
