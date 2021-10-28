/**
 * @file Minecraft Utils Shared - Component
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

/**
 * @enum
 */
const type = Object.freeze({
  BLOCK: 'block',
  ITEM: 'item',
  PROJECT: 'project',
});

/**
 * @param {object} unsortedObject
 * @returns {object}
 */
const sortObjectByKeys = (unsortedObject) => {
  return Object.keys(unsortedObject)
    .sort()
    .reduce((sortedObject, key) => {
      sortedObject[key] = unsortedObject[key];
      return sortedObject;
    }, {});
};

export default {
  type,
  sortObjectByKeys,
};
