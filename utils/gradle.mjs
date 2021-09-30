/**
 * @file Minecraft Utils Shared - Gradle
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import chalk from 'chalk';
import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import { spawnSync } from 'child_process';

const isWindows = os.type() == 'Windows NT' || os.platform == 'win32';

/**
 * @param {string} taskName
 * @param {string} projectPath
 * @returns {boolean}
 */
const runTask = (taskName = '', projectPath = '') => {
  const gradleApp = getGradleExecutable();
  if (!gradleApp) {
    return false;
  }
  if (!isWindows && gradleApp.endsWith('gradlew')) {
    fs.chmodSync(gradleApp, 0o755);
  }
  if (taskName) {
    console.log(
      chalk.green(
        'Running gradle task',
        taskName,
        projectPath ? `in ${projectPath}` : '...',
        `on ${os.type()} (${os.platform()})`
      )
    );
  }
  const gradleArgs = taskName ? [taskName] : [];
  if (projectPath) {
    gradleArgs.push('--project-dir');
    gradleArgs.push(projectPath);
  }
  const gradleCommand = spawnSync(gradleApp, gradleArgs, { stdio: 'inherit' });
  if (gradleCommand.error) {
    console.error(chalk.red('Unable to run Gradle Task:'), gradleCommand.error);
    return false;
  }
  return true;
};

/**
 * @returns {string}
 */
const getGradleExecutable = () => {
  if (isWindows && fs.existsSync('gradlew.bat')) {
    return 'gradlew.bat';
  }
  if (fs.existsSync('gradlew')) {
    return 'gradlew';
  }
  if (process.env.GRADLE_HOME_TEST || process.env.GRADLE_HOME) {
    const gradleHomePath =
      process.env.GRADLE_HOME_TEST || process.env.GRADLE_HOME;
    if (isWindows && fs.existsSync(path.join(gradleHomePath, 'gradlew.bat'))) {
      return path.join(gradleHomePath, 'gradlew.bat');
    }
    if (fs.existsSync(path.join(gradleHomePath, 'gradlew'))) {
      return path.join(gradleHomePath, 'gradlew');
    }
    if (fs.existsSync(path.join(gradleHomePath, 'bin', 'gradle'))) {
      return path.join(gradleHomePath, 'bin', 'gradle');
    }
  }
  const searchGradle = (spawnSync('which', ['gradle']).stderr || '').toString();
  if (searchGradle) {
    return searchGradle.trim();
  }
  console.error(chalk.red('Unable to locate Gradle Wrapper or Gradle!'));
  return '';
};

export { runTask };
