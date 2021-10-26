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
    console.log('Replace placeholders');
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
      const patchParts = filePart.substr(
        filePart.indexOf(positionMarker) + positionMarker.length
      );
      const patchPart = patchParts.split(positionMarker);
      const positionInstruction = patchPart[0].trim();
      const code = patchPart[1].replace(/^\r\n|\n|\r/, '');
      const patchData = {
        fileName: path.join.apply(null, fileName.split('/')),
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
      }
      data.push(patchData);
    }
  });
  return data;
};

export default {
  read,
  parse,
};
