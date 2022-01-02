/**
 * @file Minecraft Utils Shared - Init
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import chalk from 'chalk';
import execa from 'execa';
import fs from 'fs-extra';
import path from 'path';

import defaultPath from './default_path.mjs';
import fileUtils from './files.mjs';

/**
 * @param {string} npmPackage
 * @param {string} targetPath (optional)
 * @returns {boolean}
 */
const createWorkspace = (npmPackage, targetPath = defaultPath.project.path) => {
  if (targetPath == null) {
    console.log(chalk.red('Invalid target path for creating workspace!'));
    return false;
  } else if (!targetPath) {
    console.log(chalk.red('Preparing workspace in current directory!'));
    targetPath = './';
  } else {
    console.log(chalk.green('Preparing workspace at', targetPath));
  }

  // Check if we got a valid targetPath
  if (fs.existsSync(targetPath)) {
    console.log(chalk.green('✔️ Found workspace path ...'));
  } else {
    console.log(chalk.yellow('❌ Found no workspace path will create one ...'));
    fs.ensureDirSync(targetPath);
  }

  // Make sure we have a existing package.json file
  if (fs.existsSync(path.join(targetPath, 'package.json'))) {
    console.log(chalk.green('✔️ Found existing package.json ...'));
  } else {
    console.log(
      chalk.yellow('❌ Found no package.json will create a basic one ...')
    );
    try {
      execa.commandSync('npm init -y private', { cwd: targetPath });
    } catch (error) {
      console.error(chalk.red('⚠️ Unable to create package.json file:', error));
      return false;
    }
  }

  // Confirm the file exists before going to the next steps.
  if (!fs.existsSync(path.join(targetPath, 'package.json'))) {
    console.error(chalk.red('⚠️ Unable to find package.json file, give up!'));
    return false;
  }

  // Installing a local copy of the npm package, if provided.
  if (npmPackage) {
    console.log(chalk.green('Installing package', npmPackage, ' ...'));
    try {
      execa.commandSync(`npm install ${npmPackage}`, { cwd: targetPath });
    } catch (error) {
      console.error(
        chalk.red(`⚠️ Unable to install a local copy of ${npmPackage}:`),
        error
      );
      return false;
    }
  }

  // Add git related files if not exists.
  const gitAttributesFile = path.join(
    defaultPath.assets.init,
    '.gitattributes'
  );
  if (fs.existsSync(gitAttributesFile)) {
    console.log(
      chalk.green('Copying .gitattributes files from', gitAttributesFile)
    );
    fileUtils.copyFileIfNotExists(
      path.join(gitAttributesFile),
      path.join(targetPath, '.gitattributes')
    );
  }
  const gitIgnoreFile = path.join(defaultPath.assets.init, '.gitignore');
  if (fs.existsSync(gitIgnoreFile)) {
    console.log(chalk.green('Copying .gitignore file from', gitIgnoreFile));
    fileUtils.copyFileIfNotExists(
      path.join(gitIgnoreFile),
      path.join(targetPath, '.gitignore')
    );
  } else {
    // Try to copy the .npmignore file instead.
    const npmIgnoreFile = path.join(defaultPath.assets.init, '.npmignore');
    if (fs.existsSync(npmIgnoreFile)) {
      console.log(chalk.green('Copying .npmignore file from', gitIgnoreFile));
      fileUtils.copyFileIfNotExists(
        path.join(npmIgnoreFile),
        path.join(targetPath, '.gitignore')
      );
    }
  }

  // Install pre-defined package, if defined!
  if (npmPackage) {
    if (targetPath != defaultPath.project.path) {
      console.info(
        `\nUse "${chalk.green(
          'npx ' + npmPackage + ' new'
        )}" inside ${chalk.grey(targetPath)} to create a new project!.\n`
      );
    } else {
      console.info(
        `\nUse "${chalk.green(
          'npx ' + npmPackage + ' new'
        )}" to create a new project!.\n`
      );
    }
  }

  console.log(chalk.green('Done. ✔️'));
  return true;
};

export default { createWorkspace };
