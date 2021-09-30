/**
 * @fileoverview Minecraft Utils Shared - Translation
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

/**
 * @return {String}
 */
const getLanguage = () => {
  const detectedLanguage =
    (process.env.LC_ALL && process.env.LC_ALL.length > 1
      ? process.env.LC_ALL
      : '') ||
    process.env.LC_MESSAGES ||
    process.env.LANG ||
    process.env.LANGUAGE ||
    (Intl
      ? // eslint-disable-next-line new-cap
        Intl.DateTimeFormat().resolvedOptions().locale
      : '') ||
    '';
  if (!detectedLanguage) {
    console.warn('Unable to detect language for current environment!');
  }
  return detectedLanguage;
};

/* Static reference */
const language = getLanguage();

export default { language, getLanguage };
