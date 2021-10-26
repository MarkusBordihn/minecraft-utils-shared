/**
 * @file Minecraft Utils Shared Test - CommonJS Mapping Test
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const assert = require('assert');

const minecraftUtilsShared = require('../../index.cjs');
const {
  configurationUtils,
  defaultConfig,
  defaultPath,
  enquirerHelper,
  fileFinderUtils,
  fileUtils,
  generators,
  gradleUtils,
  initUtils,
  normalizeHelper,
  templateUtils,
  translationUtils,
  utilsVersion,
  uuidUtils,
} = require('../../index.cjs');

describe('CommonJS Mapping', () => {
  describe('Object', () => {
    it('should be ok', () => {
      assert.equal(typeof minecraftUtilsShared, 'object');
    });
  });

  describe('Exports', () => {
    it('configurationUtils', () => {
      assert.equal(typeof configurationUtils, 'object');
    });
    it('defaultConfig', () => {
      assert.equal(typeof defaultConfig, 'object');
    });
    it('defaultPath', () => {
      assert.equal(typeof defaultPath, 'object');
    });
    it('enquirerHelper', () => {
      assert.equal(typeof enquirerHelper, 'object');
    });
    it('fileUtils', () => {
      assert.equal(typeof fileUtils, 'object');
    });
    it('fileFinderUtils', () => {
      assert.equal(typeof fileFinderUtils, 'object');
    });
    it('generators', () => {
      assert.equal(typeof generators, 'object');
    });
    it('gradleUtils', () => {
      assert.equal(typeof gradleUtils, 'object');
    });
    it('initUtils', () => {
      assert.equal(typeof initUtils, 'object');
    });
    it('normalizeHelper', () => {
      assert.equal(typeof normalizeHelper, 'object');
    });
    it('templateUtils', () => {
      assert.equal(typeof templateUtils, 'object');
    });
    it('translationUtils', () => {
      assert.equal(typeof translationUtils, 'object');
    });
    it('utilsVersion', () => {
      assert.equal(typeof utilsVersion, 'string');
    });
    it('uuidUtils', () => {
      assert.equal(typeof uuidUtils, 'object');
    });
  });
});
