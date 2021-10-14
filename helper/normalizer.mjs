/**
 * @file Minecraft Utils Shared - Normalizer
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

/**
 * @param {string} name
 * @returns {string}
 */
const normalizeClassName = (name = '') => {
  return name
    .replace(/(^\w|\s\w)/g, (firstChar) => firstChar.toUpperCase())
    .replace(/\s+/g, '')
    .replace(/[_-]+/g, '')
    .replace(/[^a-zA-Z0-9_-]/g, '');
};

/**
 * @param {string} name
 * @returns {string}
 */
const normalizeFileName = (name = '') => {
  return name
    .replace(/\s+/g, '_')
    .replace(':', '__')
    .replace(/[^a-zA-Z0-9_.-]/g, '');
};

/**
 * @param {string} name
 * @returns {string}
 */
const normalizeModId = (name = '') => {
  return name
    .replace(/\s+/g, '')
    .replace(/[_-]+/g, '')
    .replace(/[^a-zA-Z0-9_-]/g, '')
    .toLowerCase();
};

/**
 * @param {string} name
 * @returns {string}
 */
const normalizeName = (name = '') => {
  return name
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_-]/g, '')
    .toLowerCase();
};

/**
 * @param {string} name
 * @param {string} namespace
 * @returns {string}
 */
const normalizeItemId = (name = '', namespace = 'my_items') => {
  return `${normalizeName(namespace)}:${normalizeName(name)}`;
};

/**
 * @param {string} name
 * @returns {string}
 */
const normalizePathName = (name = '') => {
  return name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
};

/**
 * @param {string} name
 * @returns {string}
 */
const normalizeVendorName = (name = '') => {
  return name.replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase();
};

export default {
  normalizeClassName,
  normalizeFileName,
  normalizeItemId,
  normalizeModId,
  normalizeName,
  normalizePathName,
  normalizeVendorName,
};
