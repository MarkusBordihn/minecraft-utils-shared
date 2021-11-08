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
 * @returns {string}
 */
const getTemplatePath = () => {
  if (process.env) {
    if (
      (process.env.npm_lifecycle_script || '').includes(
        'minecraft-bedrock-utils'
      ) ||
      (process.env.npm_package_name || '').includes('minecraft-bedrock-utils')
    ) {
      return '.minecraft-bedrock-utils-templates';
    } else if (
      (process.env.npm_lifecycle_script || '').includes(
        'minecraft-forge-utils'
      ) ||
      (process.env.npm_package_name || '').includes('minecraft-forge-utils')
    ) {
      return '.minecraft-forge-utils-templates';
    }
  }
  return '.minecraft-utils-shared-templates';
};

// eslint-disable-next-line prefer-const
let templatePath = path.join(process.cwd(), getTemplatePath());

/**
 * Template Processing engine
 *
 * The target path could be a simple string for easier operations or
 * and object for more advanced requirements like Forge Mods.
 * We expect the targetPath Object in the following format:
 * {
 *   assetsPath: '',
 *   classPath: '',
 *   dataPath: '',
 * }
 *
 * @param {string} template
 * @param {object} placeholder
 * @param {string|object} targetPath
 */
const processTemplateFile = (template, placeholder, targetPath = '') => {
  if (!fs.existsSync(template)) {
    console.error('Unable to find template:', template);
    return;
  }

  if (targetPath && typeof targetPath == 'object') {
    console.log(
      chalk.green(
        '🏷️  Processing multi template',
        template,
        'with',
        placeholder,
        'and',
        targetPath
      )
    );
  } else {
    if (targetPath && !fs.existsSync(targetPath)) {
      console.error('Unable to access target path:', targetPath);
      return;
    }
    console.log(
      chalk.green('🏷️  Processing template', template, 'with', placeholder)
    );
  }
  const templateDefinition = templateFile.parse(template, placeholder);
  templateDefinition.forEach((definition) => {
    const fileName = definition.fileName;
    let filePath = definition.filePath;

    // Automatically detect correct target path based on file type.
    if (targetPath && typeof targetPath == 'object') {
      switch (definition.fileType) {
        case templateFile.fileType.JAVA:
          filePath = path.join(targetPath.classPath, definition.filePath);
          break;
        case templateFile.fileType.RESOURCE:
          filePath = path.join(targetPath.assetsPath, definition.filePath);
          break;
        case templateFile.fileType.DATA:
          filePath = path.join(targetPath.dataPath, definition.filePath);
          break;
        case templateFile.fileType.DATA_MINECRAFT:
          filePath = path.join(targetPath.dataPath, '..', definition.filePath);
          break;
      }
    } else if (targetPath) {
      filePath = path.join(targetPath, definition.filePath);
    }
    let content = '';

    // Handle different kind of operation based on the patch definition.
    if (definition.copy) {
      // Copy src file to dst file, if not already exists
      if (fs.existsSync(filePath)) {
        console.info(chalk.red('[Skipping Copy]'), fileName, 'already exists.');
      } else {
        console.info(chalk.green('[Copy]'), fileName);
        fs.ensureDirSync(path.dirname(filePath));
        fs.copyFileSync(definition.copy, filePath);
      }
    } else {
      if (definition.create) {
        // Create new file
        if (fs.existsSync(filePath)) {
          console.info(
            chalk.red('[Skipping Create]'),
            fileName,
            'already exists.'
          );
        } else {
          console.info(chalk.green('[Create]'), fileName);
          content = definition.code;
        }
      } else if (filePath && fs.existsSync(filePath)) {
        // Patch existing files according the "after" or "before" placeholder.
        // We will only processing the file if the code is not already included!
        content = fs.readFileSync(filePath, 'utf-8');
        if (!content) {
          console.error(
            chalk.red('[Skipping after/before]'),
            fileName,
            'file is empty.'
          );
        } else if (content.includes(definition.code)) {
          console.info(
            chalk.yellow('[Skipping after/before]'),
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

const hasCustomTemplateFiles = () => {
  return !fs.existsSync(templatePath) ? false : !fs.emptyDirSync(templatePath);
};

const getCustomTemplateFiles = () => {
  if (!fs.existsSync(templatePath)) {
    return null;
  }
  const result = [];
  fs.readdirSync(templatePath).forEach((file) => {
    const filePath = path.resolve(templatePath, file);
    if (fs.lstatSync(filePath).isFile()) {
      result.push(filePath);
    }
  });
  return result;
};

export default {
  getCustomTemplateFiles,
  hasCustomTemplateFiles,
  processTemplateFile,
  replacePlaceholder,
  templatePath,
};
