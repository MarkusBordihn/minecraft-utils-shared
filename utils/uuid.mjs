/**
 * @file Minecraft Utils Shared - UUID
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';

/**
 * @param {string} name
 * @param {string} namespace
 * @returns {string}
 */
const getUUID = (name, namespace = '9ef07506-dc88-45ca-b065-085ba8e79440') => {
  if (name && namespace) {
    return uuidv5(name, namespace);
  }
  return uuidv4();
};

export default { getUUID };
