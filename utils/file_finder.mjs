/**
 * @file Minecraft Utils Shared - File Finder
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import fs from 'fs';
import glob from 'glob';
import path from 'path';

import javaFile from '../formats/java_file.mjs';
import jsonFile from '../formats/json_file.mjs';

const workingPath = process.cwd();
const javaSrcPath = path.join(workingPath, 'src', 'main', 'java');

/**
 * @param {string} search_path
 * @returns {Array<string>}
 */
const getManifestsInSearchPath = (search_path = process.cwd()) => {
  const searchPath = path.resolve(search_path);
  const result = [];
  // If we found a manifest.json in root we will use this.
  if (fs.existsSync(path.join(searchPath, 'manifest.json'))) {
    return [path.join(searchPath, 'manifest.json')];
  }
  // Search for alternative manifest files.
  glob
    .sync(path.join(searchPath, '**/manifest.json'), {
      nodir: true,
    })
    .map((file) => {
      result.push(path.resolve(file));
    });
  if (result.length > 0) {
    return result;
  }
};

/**
 * @returns {string}
 */
const getManifestsInWorkingPath = () => {
  return getManifestsInSearchPath(workingPath);
};

/**
 * @param {string} search_path
 * @param {Array<string>} manifests
 * @returns {string}
 */
const getBehaviorPackInSearchPath = (search_path, manifests) => {
  const relevantManifests = manifests || getManifestsInSearchPath(search_path);
  for (const file of relevantManifests || []) {
    const manifest = jsonFile.read(file);
    if (manifest && manifest.header && manifest.modules) {
      for (const module of manifest.modules) {
        if (module.type == 'data' || module.type == 'client_data') {
          return path.resolve(path.dirname(file));
        }
      }
    }
  }
  return '';
};

/**
 * @param {Array<string>} manifests
 * @returns {string}
 */
const getBehaviorPackInWorkingPath = (manifests) => {
  return getBehaviorPackInSearchPath(workingPath, manifests);
};

/**
 * @param {string} search_path
 * @param {Array<string>} manifests
 * @returns {string}
 */
const getResourcePackInSearchPath = (search_path, manifests) => {
  const relevantManifests = manifests || getManifestsInSearchPath(search_path);
  for (const file of relevantManifests || []) {
    const manifest = jsonFile.read(file);
    if (manifest && manifest.header && manifest.modules) {
      for (const module of manifest.modules) {
        if (module.type == 'resources') {
          return path.resolve(path.dirname(file));
        }
      }
    }
  }
};

/**
 * @param {Array<string>} manifests
 * @returns {string}
 */
const getResourcePackInWorkingPath = (manifests) => {
  return getResourcePackInSearchPath(workingPath, manifests);
};

/**
 * @param {string} search_path
 * @returns {Array<string>}
 */
const getJavaFilesInSearchPath = (search_path = process.cwd()) => {
  const searchPath = path.resolve(search_path);
  const result = [];
  // Search for java files.
  glob
    .sync(path.join(searchPath, '**/*.java'), {
      nodir: true,
    })
    .map((file) => {
      result.push(path.resolve(file));
    });
  if (result.length > 0) {
    return result;
  }
};

/**
 * @returns {string}
 */
const getJavaFilesInWorkingPath = () => {
  return getJavaFilesInSearchPath(javaSrcPath);
};

/**
 * @param {string} search_path
 * @param {Array<string>} java_files
 * @returns {string}
 */
 const getModInSearchPath = (search_path, java_files) => {
  const relevantJavaFiles = java_files || getJavaFilesInSearchPath(search_path);
  for (const file of relevantJavaFiles || []) {
    const javaFileContent = javaFile.read(file);
    if (javaFileContent && javaFileContent.includes('@Mod(Constants.MOD_ID)')) {
      return path.resolve(path.dirname(file));
    }
  }
};

/**
 * @param {Array<string>} java_files
 * @returns {string}
 */
const getModInWorkingPath = (java_files) => {
  return getModInSearchPath(workingPath, java_files);
};

export default {
  getBehaviorPackInSearchPath,
  getBehaviorPackInWorkingPath,
  getJavaFilesInSearchPath,
  getJavaFilesInWorkingPath,
  getManifestsInSearchPath,
  getManifestsInWorkingPath,
  getModInSearchPath,
  getModInWorkingPath,
  getResourcePackInSearchPath,
  getResourcePackInWorkingPath,
};
