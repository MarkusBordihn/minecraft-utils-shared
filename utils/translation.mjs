/**
 * @file Minecraft Utils Shared - Translation
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

/**
 * @returns {string}
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
