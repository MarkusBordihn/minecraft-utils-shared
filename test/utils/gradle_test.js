/**
 * @file Minecraft Utils Shared Test - Gradle
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import assert from 'assert';
import path from 'path';

import { runTask } from '../../utils/gradle.mjs';

describe('utils/gradle', () => {
  const ENV_BAK = process.env;

  describe('runTask()', () => {
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

  after(() => {
    process.env = ENV_BAK;
  });
});
