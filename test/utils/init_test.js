/**
 * @file Minecraft Utils Shared Test - Gradle
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

import defaultPath from '../../utils/default_path.mjs';
import init from '../../utils/init.mjs';

describe('utils/init', () => {
  const tempPath = path.join(defaultPath.test.tmp, 'init_test');

  describe('Object', () => {
    it('should be ok', () => {
      assert.equal(typeof init, 'object');
    });
  });
  describe('createWorkspace()', () => {
    rimraf.sync(tempPath);
    const result = init.createWorkspace('', tempPath);
    it('should be successful', () => {
      assert(result);
    });
    it('files should be exists', () => {
      assert(fs.existsSync(path.join(tempPath, '.gitattributes')));
      assert(fs.existsSync(path.join(tempPath, '.gitignore')));
    });
  });
  describe('createWorkspace("minecraft-bedrock-utils")', () => {
    rimraf.sync(tempPath);
    const result = init.createWorkspace('minecraft-bedrock-utils', tempPath);
    it('should be successful', () => {
      assert(result);
    });
    it('files should be exists', () => {
      assert(fs.existsSync(path.join(tempPath, 'package.json')));
      assert(fs.existsSync(path.join(tempPath, '.gitattributes')));
      assert(fs.existsSync(path.join(tempPath, '.gitignore')));
    });
    it('package.json should include "minecraft-bedrock-utils"', () => {
      const packageJson = fs.readFileSync(path.join(tempPath, 'package.json'), {
        encoding: 'utf8',
      });
      assert(packageJson.includes('minecraft-bedrock-utils'));
    });
  });
});
