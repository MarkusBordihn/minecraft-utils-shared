/**
 * @file Minecraft Utils Shared - Template file
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

const fileMarker = '+++';
const positionMarker = '@@@';

/**
 * @enum
 */
const fileType = Object.freeze({
  JAVA: 'java',
  RESOURCE: 'resource',
  DATA: 'data',
  DATA_MINECRAFT: 'data_minecraft',
  UNKNOWN: 'unknown',
});

const resourceLocations = [
  'blockstates',
  'font',
  'lang',
  'models',
  'particles',
  'shaders',
  'texts',
  'textures',
];

const dataLocations = [
  'advancements',
  'loot_tables',
  'recipes',
  'structures',
  'tags',
];

/**
 * @param {string} file
 */
const read = (file) => {
  if (!fs.existsSync(file)) {
    console.error(chalk.red('Unable to find template file', file));
    return;
  }
  const fileContent = fs.readFileSync(file, 'utf8');
  try {
    return fileContent;
  } catch (error) {
    console.error(chalk.red('Unable to parse template file', file, ':', error));
  }
};

/**
 * @param {string} file
 * @param {object} placeholder
 */
const parse = (file, placeholder = {}) => {
  const data = [];
  let content = read(file);
  if (
    !content ||
    !content.includes(fileMarker) ||
    !content.includes(positionMarker)
  ) {
    console.warn(chalk.yellow('Template file has no valid content', file));
    return;
  }

  // Converting placeholders, if needed.
  if (Object.keys(placeholder).length > 0) {
    content = content.replace(
      /\[\[ --([A-Za-z0-9_. ]+)-- \]\]/g,
      (matchString) => {
        const placeholderString = matchString
          .replace('[[ --', '')
          .replace('-- ]]', '')
          .trim();
        return placeholder[placeholderString] || matchString;
      }
    );
  }

  // Parse template patch entries.
  const fileEntryParts = content.split(fileMarker);
  fileEntryParts.forEach((filePart) => {
    if (filePart) {
      const fileName = filePart.split(/\r\n|\n|\r/, 1)[0].trim();
      const patchParts = filePart.substring(
        filePart.indexOf(positionMarker) + positionMarker.length
      );
      const patchPart = patchParts.split(positionMarker);
      const positionInstruction = patchPart[0].trim();
      const code = patchPart[1]
        .replace(/^\r\n|\n|\r/, '')
        .replace(/(\r\n|\n|\r){2,}$/, '\r\n');
      const patchData = {
        fileName: fileName,
        filePath: path.join.apply(null, fileName.split('/')),
        fileType: getFileType(fileName),
        code: code,
      };
      if (positionInstruction.startsWith('before:')) {
        patchData['before'] = positionInstruction.replace('before:', '').trim();
      } else if (positionInstruction.startsWith('after:')) {
        patchData['after'] = positionInstruction.replace('after:', '').trim();
      } else if (positionInstruction.startsWith('create:')) {
        patchData['create'] = positionInstruction.replace('create:', '').trim();
      } else if (positionInstruction == 'create') {
        patchData['create'] = true;
      } else if (positionInstruction.startsWith('copy:')) {
        let targetFile = positionInstruction.replace('copy:', '').trim();
        if (targetFile.startsWith('/') && !targetFile.startsWith('//')) {
          const baseTemplatePath = getBaseTemplatePath(file);
          if (baseTemplatePath) {
            targetFile = path.join(
              baseTemplatePath,
              path.join.apply(null, targetFile.substring(1).split('/'))
            );
          }
        } else {
          targetFile = path.join.apply(null, targetFile.split('/'));
        }
        patchData['copy'] = targetFile;
      }
      data.push(patchData);
    }
  });
  return data;
};

/**
 * @param {string} template
 */
const getBaseTemplatePath = (template) => {
  let result = '';
  const fullTemplatePath = path.resolve(template);
  const templatePath = fullTemplatePath.split(path.sep).join('/');
  if (templatePath.includes('/templates/java/')) {
    result = templatePath.substring(
      0,
      templatePath.indexOf('/templates/java/') + '/templates'.length
    );
  } else if (templatePath.includes('/templates/resources/')) {
    result = templatePath.substring(
      0,
      templatePath.indexOf('/templates/resources/') + '/templates'.length
    );
  } else if (templatePath.includes('/templates/src/')) {
    result = templatePath.substring(
      0,
      templatePath.indexOf('/templates/src/') + '/templates'.length
    );
  } else if (templatePath.includes('/templates/')) {
    result = templatePath.substring(
      0,
      templatePath.indexOf('/templates/') + '/templates'.length
    );
  }
  if (result.includes(path.sep)) {
    return result;
  }
  return result.split('/').join(path.sep);
};

/**
 * @param {string} fileName
 * @returns {fileType} file type
 */
const getFileType = (fileName) => {
  // Normalize file path, if needed
  if (fileName.startsWith('/')) {
    fileName = fileName.substring(1);
  }
  if (fileName.startsWith('[[ --ModId-- ]]/')) {
    fileName = fileName.replace('[[ --ModId-- ]]/', '');
  }

  // Try to get parent folder for easier detection
  const targetParentFolder = fileName.includes('/')
    ? fileName.split('/')[0]
    : '';

  // Java Project files
  if (fileName.endsWith('.java') && !fileName.includes('src/main/java')) {
    return fileType.JAVA;
  }

  // Resources files
  if (
    (fileName.endsWith('.json') ||
      fileName.endsWith('.png') ||
      fileName.endsWith('.fsh') ||
      fileName.endsWith('.vsh') ||
      fileName.endsWith('.mcmeta')) &&
    !fileName.includes('src/main/resources/assets') &&
    resourceLocations.indexOf(targetParentFolder) != -1
  ) {
    return fileType.RESOURCE;
  }

  // Data files
  if (
    (fileName.endsWith('.json') || fileName.endsWith('.nbt')) &&
    !fileName.includes('src/main/resources/data') &&
    dataLocations.indexOf(targetParentFolder) != -1
  ) {
    return fileType.DATA;
  }

  // Data files (Minecraft)
  if (
    fileName.startsWith('minecraft/') &&
    (fileName.endsWith('.json') || fileName.endsWith('.nbt')) &&
    !fileName.includes('src/main/resources/data')
  ) {
    if (dataLocations.indexOf(fileName.split('/')[1]) != -1) {
      return fileType.DATA_MINECRAFT;
    }
  }

  return fileType.UNKNOWN;
};

export default {
  fileType,
  getBaseTemplatePath,
  getFileType,
  parse,
  read,
};
