/**
 * @fileoverview Minecraft Utils Shared - Gradle
 *
 * @license Copyright 2021 Markus Bordihn
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import chalk from 'chalk';
import fs from 'fs-extra';
import isWindows from 'is-windows';
import { spawnSync } from 'child_process';

/**
 * @param {String} taskName
 * @param {String} projectPath
 * @return {Boolean}
 */
const runTask = (taskName = '', projectPath = '') => {
  const gradleApp = getGradleExecutable();
  if (!gradleApp) {
    return false;
  }
  if (taskName) {
    console.log(
      chalk.green(
        'Running gradle task',
        taskName,
        projectPath ? `in ${projectPath}` : '...'
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
 * @return {String}
 */
const getGradleExecutable = () => {
  if (isWindows && fs.existsSync('gradlew.bat')) {
    return 'gradlew.bat';
  }
  if (fs.existsSync('gradlew')) {
    return 'gradlew';
  }
  if (process.env.GRADLE_HOME) {
    return process.env.GRADLE_HOME;
  }
  if (process.env.GRADLE_HOME_TEST) {
    return process.env.GRADLE_HOME_TEST;
  }
  const searchGradle = (spawnSync('which', ['gradle']).stderr || '').toString();
  if (searchGradle) {
    return searchGradle.trim();
  }
  console.error(chalk.red('Unable to locate Gradle Wrapper or Gradle!'));
  return '';
};

export { runTask };
