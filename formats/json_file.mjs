/**
 * @file Minecraft Utils Shared - JSON file
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import chalk from 'chalk';
import fs from 'fs';

/**
 * @param {string} file 
 * @returns 
 */
const read = (file) => {
  if (!fs.existsSync(file)) {
    console.error(chalk.red('Unable to find JSON file', file));
    return;
  }
  const fileContent = fs.readFileSync(file);
  try {
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(chalk.red('Unable to parse JSON file', file, ':', error));
  }
};

/**
 * @param {string} file
 * @param {Object} content
 * @param {Object} options
 */
const write = (file, content = {}, options = {}) => {
  if (fs.existsSync(file)) {
    if (!options.overwrite) {
      console.error(chalk.red('JSON file already exists under', file));
      return;
    } else {
      console.warn(chalk.orange('Overwriting existing json file', file));
    }
  }
  fs.writeFileSync(file, JSON.stringify(content, null, 2));
};

/**
 * @param {string} file 
 * @param {Object} new_content 
 */
const add = (file, new_content) => {
  const existingContent = read(file);
  const newContent = { ...existingContent, ...new_content };
  write(file, newContent, { overwrite: true });
};

export default {
  add,
  read,
  write,
};
