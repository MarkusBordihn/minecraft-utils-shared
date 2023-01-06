/**
 * @file Minecraft Utils Shared - TOML file
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import chalk from 'chalk';
import fs from 'fs';
import toml from 'toml';

const read = (file) => {
  if (!fs.existsSync(file)) {
    console.error(chalk.red('Unable to find toml file', file));
    return;
  }
  const fileContent = fs.readFileSync(file);
  try {
    return toml.parse(fileContent);
  } catch (error) {
    console.error(chalk.red('Unable to parse toml file', file, ':', error));
  }
};

export default {
  read,
};
