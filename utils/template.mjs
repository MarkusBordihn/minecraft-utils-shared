/**
 * @file Minecraft Utils Shared - Template
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';

import templateFile from '../formats/template_file.mjs';

/**
 * @param {string} template
 * @param {object} placeholder
 * @param {string} targetPath
 */
const processTemplateFile = (template, placeholder, targetPath = '') => {
  if (!fs.existsSync(template)) {
    console.error('Unable to find template:', template);
    return;
  }
  if (targetPath && !fs.existsSync(targetPath)) {
    console.error('Unable to access target path:', targetPath);
    return;
  }
  console.log(chalk.green('🏷️  Processing template', template, '...'));
  const templateDefinition = templateFile.parse(template, placeholder);
  templateDefinition.forEach((definition) => {
    const fileName = definition.fileName;
    const filePath = targetPath
      ? path.join(targetPath, definition.filePath)
      : definition.filePath;
    let content = '';

    // Handle different kind of operation based on the patch definition.
    if (definition.copy) {
      // Copy src file to dst file
      console.info(chalk.green('[Copy]'), fileName);
      fs.ensureDirSync(path.dirname(filePath));
      fs.copyFileSync(definition.copy, filePath);
    } else {
      if (definition.create) {
        // Create new file
        content = definition.code;
      } else if (filePath && fs.existsSync(filePath)) {
        // Patch existing files according the "after" or "before" placeholder.
        // We will only processing the file if the code is not already included!
        content = fs.readFileSync(filePath, 'utf-8');
        if (!content) {
          console.error(chalk.red('[Skipping]'), fileName, 'file is empty.');
        } else if (content.includes(definition.code)) {
          console.info(
            chalk.yellow('[Skipping]'),
            fileName,
            'code is already injected.'
          );
          content = '';
        } else if (definition.after) {
          const insertPositionRegExp = new RegExp(
            `${escapeRegExp(definition.after)}[ \t]*(\r\n|\n|\r)?`
          );
          const insertPosition = content.search(insertPositionRegExp);
          if (insertPosition != -1) {
            const insertPositionLength =
              content.match(insertPositionRegExp)[0].length;
            console.info(chalk.green('[After]'), 'Inject code into', fileName);
            content =
              content.slice(0, insertPosition + insertPositionLength) +
              definition.code +
              content.slice(insertPosition + insertPositionLength);
          } else {
            console.warn(
              chalk.yellow('[After]'),
              'Unable to find entry point',
              definition.after,
              'in',
              fileName
            );
          }
        } else if (definition.before) {
          const insertPosition = content.search(
            new RegExp(`[ \t]*${escapeRegExp(definition.before)}`)
          );
          if (insertPosition != -1) {
            console.info(chalk.green('[Before]'), 'Inject code into', fileName);
            content =
              content.slice(0, insertPosition) +
              definition.code +
              content.slice(insertPosition);
          } else {
            console.warn(
              chalk.yellow('[Before]'),
              'Unable to find entry point',
              definition.before,
              'in',
              fileName
            );
          }
        }
      }
      if (content) {
        fs.outputFileSync(filePath, content);
      }
    }
  });
};

/**
 * @param {string} content
 * @param {object} placeholder
 * @returns {string}
 */
const replacePlaceholder = (content, placeholder = {}) => {
  const newContent = content.replace(
    /\[\[ --([A-Za-z0-9_. ]+)-- \]\]/g,
    (matchString) => {
      const placeholderString = matchString
        .replace('[[ --', '')
        .replace('-- ]]', '')
        .trim();
      return placeholder[placeholderString] || placeholderString;
    }
  );
  return newContent;
};

/**
 * @param {string} text
 * @returns {string}
 */
const escapeRegExp = (text) => {
  return text.replace(/[\\(){}[\]^$+*?.]/g, '\\$&');
};

export default {
  processTemplateFile,
  replacePlaceholder,
};
