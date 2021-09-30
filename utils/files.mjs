/**
 * @file Minecraft Utils Shared - Files
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import chalk from 'chalk';
import fs from 'fs-extra';
import glob from 'glob';
import path from 'path';

/**
 * @param {string} source
 * @param {string} target
 */
const copyFileIfNotExists = (source, target) => {
  if (fs.existsSync(source) && !fs.existsSync(target)) {
    fs.copyFileSync(source, target);
  }
};

/**
 * @param {string} source
 * @param {string} target
 */
const copyFolderIfNotExists = (source, target) => {
  if (fs.existsSync(source) && !fs.existsSync(target)) {
    fs.copySync(source, target);
  }
};

/**
 * @param {string} source
 * @param {string} target
 */
const createBackupFile = (source, target) => {
  if (fs.existsSync(source)) {
    if (!target || source == target) {
      fs.copyFileSync(source, `${source}.bak`);
    } else {
      fs.copyFileSync(source, target);
    }
  }
};

/**
 * @param {string} folderPath
 * @param {string} name
 * @param {string} content
 */
const createFileIfNotExists = (folderPath, name, content = '') => {
  const pathName = name ? path.join(folderPath, name) : folderPath;
  if (!fs.existsSync(pathName)) {
    fs.writeFileSync(pathName, content, (error) => {
      if (error) {
        return console.error(
          chalk.red('Error creating new file', pathName, ':', error)
        );
      }
    });
  }
};

/**
 * @param {string} folderPath
 * @param {string} name
 */
const createFolderIfNotExists = (folderPath, name) => {
  const pathName = name ? path.join(folderPath, name) : folderPath;
  if (!fs.existsSync(pathName)) {
    fs.mkdir(pathName, { recursive: true }, (error) => {
      if (error) {
        return console.error(
          chalk.red('Error creating new folder', pathName, ':', error)
        );
      }
    });
  }
};

/**
 * @param {string} name
 * @returns {string}
 */
const normalizeFileName = (name = '') => {
  return name
    .replace(/\s+/g, '_')
    .replace(':', '__')
    .replace(/[^a-zA-Z0-9_.-]/g, '');
};

/**
 * @param {string} oldPath
 * @param {string} newPath
 * @param {boolean} overwrite
 */
const renameFileIfExists = (oldPath, newPath, overwrite = false) => {
  if (fs.existsSync(oldPath)) {
    fs.moveSync(oldPath, newPath, { overwrite: overwrite });
  }
};

/**
 * @param {string} pattern
 * @param {string} from
 * @param {string} to
 * @returns {Array<string>}
 */
const replaceInFiles = (pattern, from, to) => {
  const relevantFiles = [];
  const result = [];
  glob
    .sync(pattern, {
      nodir: true,
    })
    .map((file) => {
      relevantFiles.push(path.resolve(file));
    });
  if (relevantFiles.length <= 0) {
    return result;
  }
  for (const file of relevantFiles || []) {
    const content = fs.readFileSync(file, 'utf-8');
    if (content && content.includes(from)) {
      // Use split and join to replace all findings.
      fs.writeFileSync(file, content.split(from).join(to), (error) => {
        if (error) {
          return console.error(
            chalk.red('Error replacing content for', file, ':', error)
          );
        }
      });
      result.push(file);
    }
  }
  return result;
};

/**
 * @param {string} filePath
 * @param {string} file
 * @returns {string}
 */
const returnIfFileExists = (filePath, file) => {
  if (file) {
    if (!filePath) {
      return '';
    }
    filePath = path.join(filePath, file);
  }
  return fs.existsSync(filePath) ? filePath : '';
};

/**
 * @param {string} pattern
 * @param {string} name
 * @param {string} to
 */
const setPlaceholder = (pattern, name, to) => {
  replaceInFiles(pattern, `[[ --${name}-- ]]`, to);
};

export default {
  copyFileIfNotExists,
  copyFolderIfNotExists,
  createBackupFile,
  createFileIfNotExists,
  createFolderIfNotExists,
  normalizeFileName,
  renameFileIfExists,
  replaceInFiles,
  returnIfFileExists,
  setPlaceholder,
};
