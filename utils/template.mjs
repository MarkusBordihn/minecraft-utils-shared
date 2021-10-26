/**
 * @file Minecraft Utils Shared - Template
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

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
  const templateDefinition = templateFile.parse(template, placeholder);
  templateDefinition.forEach((definition) => {
    const filePath = targetPath
      ? path.join(targetPath, definition.fileName)
      : definition.fileName;
    let content = '';
    if (definition.create) {
      content = definition.code;
    } else if (filePath && fs.existsSync(filePath)) {
      content = fs.readFileSync(filePath, 'utf-8');
      if (content.includes(definition.code)) {
        console.warn('Skipping', filePath, 'code is already injected.');
      } else if (definition.after) {
        const insertPosition = content.indexOf(definition.after);
        if (insertPosition != -1) {
          content =
            content.slice(0, insertPosition + definition.after.length) +
            definition.code +
            content.slice(insertPosition + definition.after.length);
        }
      } else if (definition.before) {
        const insertPosition = content.indexOf(definition.before);
        if (insertPosition != -1) {
          content =
            content.slice(0, insertPosition) +
            definition.code +
            content.slice(insertPosition);
        }
      }
    }
    fs.writeFileSync(filePath, content);
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

export default {
  processTemplateFile,
  replacePlaceholder,
};
