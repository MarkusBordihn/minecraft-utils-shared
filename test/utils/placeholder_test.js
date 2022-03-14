/**
 * @file Minecraft Utils Shared Test - Placeholder
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import assert from 'assert';

import placeholder from '../../utils/placeholder.mjs';

describe('utils/placeholder', () => {
  describe('Object', () => {
    it('should be ok', () => {
      assert.equal(typeof placeholder, 'object');
    });
  });

  describe('getPlaceholderNames("ThisIsATest")', () => {
    const result = placeholder.getPlaceholderNames('ThisIsATest');
    it('expect ThisIsATest', () => {
      assert.equal(result.PlaceholderName, 'ThisIsATest');
    });
    it('expect thisisatest', () => {
      assert.equal(result.placeholdername, 'thisisatest');
    });
    it('expect thisIsATest', () => {
      assert.equal(result.placeholderName, 'thisIsATest');
    });
    it('expect this_is_a_test', () => {
      assert.equal(result.placeholder_name, 'this_is_a_test');
    });
    it('expect THISISATEST', () => {
      assert.equal(result.PLACEHOLDERNAME, 'THISISATEST');
    });
    it('expect THIS_IS_A_TEST', () => {
      assert.equal(result.PLACEHOLDER_NAME, 'THIS_IS_A_TEST');
    });
  });

  describe('getPlaceholderNames("This Is A Test")', () => {
    const result = placeholder.getPlaceholderNames('This Is A Test');
    it('expect ThisIsATest', () => {
      assert.equal(result.PlaceholderName, 'ThisIsATest');
    });
    it('expect thisisatest', () => {
      assert.equal(result.placeholdername, 'thisisatest');
    });
    it('expect thisIsATest', () => {
      assert.equal(result.placeholderName, 'thisIsATest');
    });
    it('expect this_is_a_test', () => {
      assert.equal(result.placeholder_name, 'this_is_a_test');
    });
    it('expect THISISATEST', () => {
      assert.equal(result.PLACEHOLDERNAME, 'THISISATEST');
    });
    it('expect THIS_IS_A_TEST', () => {
      assert.equal(result.PLACEHOLDER_NAME, 'THIS_IS_A_TEST');
    });
  });

  describe('getPlaceholderNames("This_Is_A_Test")', () => {
    const result = placeholder.getPlaceholderNames('This_Is_A_Test');
    it('expect ThisIsATest', () => {
      assert.equal(result.PlaceholderName, 'ThisIsATest');
    });
    it('expect thisisatest', () => {
      assert.equal(result.placeholdername, 'thisisatest');
    });
    it('expect thisIsATest', () => {
      assert.equal(result.placeholderName, 'thisIsATest');
    });
    it('expect this_is_a_test', () => {
      assert.equal(result.placeholder_name, 'this_is_a_test');
    });
    it('expect THISISATEST', () => {
      assert.equal(result.PLACEHOLDERNAME, 'THISISATEST');
    });
    it('expect THIS_IS_A_TEST', () => {
      assert.equal(result.PLACEHOLDER_NAME, 'THIS_IS_A_TEST');
    });
  });

  describe('getPlaceholderNames("Test")', () => {
    const result = placeholder.getPlaceholderNames('Test');
    it('expect Test', () => {
      assert.equal(result.PlaceholderName, 'Test');
    });
    it('expect test', () => {
      assert.equal(result.placeholdername, 'test');
    });
    it('expect test', () => {
      assert.equal(result.placeholderName, 'test');
    });
    it('expect test', () => {
      assert.equal(result.placeholder_name, 'test');
    });
    it('expect THISISATEST', () => {
      assert.equal(result.PLACEHOLDERNAME, 'TEST');
    });
    it('expect THIS_IS_A_TEST', () => {
      assert.equal(result.PLACEHOLDER_NAME, 'TEST');
    });
  });
});
