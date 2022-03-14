/**
 * @file Minecraft Utils Shared - Gradle
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

/**
 * @param {string} name
 * @returns {Object}
 */
const getPlaceholderNames = (name = '') => {
  // Split and normalize name, expect CamelCaps input.
  let splittedName = name.split(/(?=[A-Z])/);
  if (name.includes('_')) {
    splittedName = name.split('_');
  } else if (name.includes(' ')) {
    splittedName = name.split(' ');
  }
  const normalizedName = splittedName.join('');

  if (splittedName.length > 1) {
    // Return different variants of the placeholder name, if more than two words.
    return {
      PlaceholderName: normalizedName,
      placeholdername: normalizedName.toLocaleLowerCase(),
      placeholderName:
        splittedName[0].toLocaleLowerCase() + splittedName.slice(1).join(''),
      placeholder_name: splittedName.join('_').toLocaleLowerCase(),
      PLACEHOLDERNAME: normalizedName.toLocaleUpperCase(),
      PLACEHOLDER_NAME: splittedName.join('_').toLocaleUpperCase(),
    };
  } else {
    // Return simplified version for single word.
    return {
      PlaceholderName: normalizedName,
      placeholdername: normalizedName.toLocaleLowerCase(),
      placeholderName: normalizedName.toLocaleLowerCase(),
      placeholder_name: normalizedName.toLocaleLowerCase(),
      PLACEHOLDERNAME: normalizedName.toLocaleUpperCase(),
      PLACEHOLDER_NAME: normalizedName.toLocaleUpperCase(),
    };
  }
};

export default { getPlaceholderNames };
