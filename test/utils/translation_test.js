/**
 * @fileoverview Minecraft Utils Shared Test - Translation
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
