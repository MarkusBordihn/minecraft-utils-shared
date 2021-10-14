/**
 * @file Minecraft Utils Shared Test - UUID
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import assert from 'assert';

import uuid from '../../utils/uuid.mjs';

describe('utils/uuid', () => {
  describe('getUUID() v4', () => {
    const firstUUID = uuid.getUUID();
    const secondUUID = uuid.getUUID();
    it('should not be empty', () => {
      assert(firstUUID);
      assert(secondUUID);
    });
    it('should be not equal', () => {
      assert.notEqual(firstUUID, secondUUID);
    });
  });
  describe('getUUID(name) v5', () => {
    const firstUUID = uuid.getUUID('test');
    const secondUUID = uuid.getUUID('test');
    const thirdUUID = uuid.getUUID('test2');
    it('should not be empty', () => {
      assert(firstUUID);
      assert(secondUUID);
      assert(thirdUUID);
    });
    it('should be not equal', () => {
      assert.notEqual(firstUUID, thirdUUID);
      assert.notEqual(secondUUID, thirdUUID);
    });
    it('should be equal', () => {
      assert.equal(firstUUID, secondUUID);
    });
  });
});
