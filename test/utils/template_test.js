/**
 * @file Minecraft Utils Shared Test - Template
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import assert from 'assert';

import template from '../../utils/template.mjs';

describe('utils/template', () => {
  const exampleText = '[[ --Hello-- ]] [[ --World-- ]]!';
  const examplePlaceholder = {
    Hello: 'Hello',
    World: 'world',
  };

  describe('.replacePlaceholder(content, placeholder)', () => {
    it('should be "Hello world!', () => {
      const result = template.replacePlaceholder(
        exampleText,
        examplePlaceholder
      );
      assert.equal(result, 'Hello world!');
    });
    it('should be "Hello world!Hello world!', () => {
      const result = template.replacePlaceholder(
        exampleText + exampleText,
        examplePlaceholder
      );
      assert.equal(result, 'Hello world!Hello world!');
    });
  });
});
