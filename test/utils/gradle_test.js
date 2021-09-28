/**
 * @fileoverview Minecraft Utils Shared Test - Gradle
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

import assert from 'assert';
import path from 'path';
import { runTask } from '../../utils/gradle.js';

describe('utils/gradle', () => {
  describe('runTask()', () => {
    process.env['GRADLE_HOME_TEST'] = '';
    const testFail = runTask(undefined, path.resolve('gradleWrapper'));
    it('should fail', () => {
      assert.equal(testFail, false);
    });
    process.env['GRADLE_HOME_TEST'] = path.resolve('gradleWrapper');
    const testOk = runTask(undefined, path.resolve('gradleWrapper'));
    it('should be ok', () => {
      assert.ok(testOk);
    });
  });
  describe('runTask(task_name)', () => {
    process.env['GRADLE_HOME_TEST'] = path.resolve('gradleWrapper');
    const testOk = runTask('--version');
    it('should be ok', () => {
      assert.ok(testOk);
    });
  });
  describe('runTask(task_name, workspace)', () => {
    process.env['GRADLE_HOME_TEST'] = path.resolve('gradleWrapper');
    const testOk = runTask('--version', path.resolve('gradleWrapper'));
    it('should be ok', () => {
      assert.ok(testOk);
    });
  });
});
