/**
 * @file Minecraft Utils Shared Test - Translation
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import assert from 'assert';
import translation from '../../utils/translation.mjs';

describe('utils/translation', () => {
  const ENV_BAK = process.env;

  describe('language', () => {
    const language = translation.language;
    it('should not be empty', () => {
      assert(language);
    });
  });
  describe('getLanguage()', () => {
    it('from ENV.LC_ALL = C (should use fallback)', () => {
      process.env['LC_ALL'] = 'C';
      process.env['LC_MESSAGES'] = '';
      process.env['LANG'] = '';
      process.env['LANGUAGE'] = '';
      assert.notEqual(translation.getLanguage(), process.env['LC_ALL']);
    });
    it('from ENV.LC_ALL = en_US', () => {
      process.env['LC_ALL'] = 'en_US';
      process.env['LC_MESSAGES'] = '';
      process.env['LANG'] = '';
      process.env['LANGUAGE'] = '';
      assert.equal(translation.getLanguage(), process.env['LC_ALL']);
    });
    it('from ENV.LC_MESSAGES = en_US.UTF-8', () => {
      process.env['LC_ALL'] = '';
      process.env['LC_MESSAGES'] = 'en_US.UTF-8';
      process.env['LANG'] = '';
      process.env['LANGUAGE'] = '';
      assert.equal(translation.getLanguage(), process.env['LC_MESSAGES']);
    });
    it('from ENV.LANG = de_DE.UTF-8', () => {
      process.env['LC_ALL'] = '';
      process.env['LC_MESSAGES'] = '';
      process.env['LANG'] = 'de_DE.UTF-8';
      process.env['LANGUAGE'] = '';
      assert.equal(translation.getLanguage(), process.env['LANG']);
    });
    it('from ENV.LANGUAGE = ja_JP.SJIS', () => {
      process.env['LC_ALL'] = '';
      process.env['LC_MESSAGES'] = '';
      process.env['LANG'] = '';
      process.env['LANGUAGE'] = 'ja_JP.SJIS';
      assert.equal(translation.getLanguage(), process.env['LANGUAGE']);
    });
  });

  after(() => {
    process.env = ENV_BAK;
  });
});
