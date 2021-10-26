/**
 * @file Minecraft Utils Shared Test - Template File
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import assert from 'assert';
import path from 'path';

import templateFile from '../../formats/template_file.mjs';

const testFilePath = path.join('test_files', 'template_files');

describe('format/TemplateFile', () => {
  describe('Object', () => {
    it('should be ok', () => {
      assert.equal(typeof templateFile, 'object');
    });
  });

  describe('.parse()', () => {
    it('Invalid file', () => {
      const failedTemplateFile = templateFile.parse(
        path.join(testFilePath, 'invalid_file.java')
      );
      assert.deepEqual(failedTemplateFile, undefined);
    });
    it('Single entry', () => {
      const singleTemplateFile = templateFile.parse(
        path.join(testFilePath, 'single_entry_file.java')
      );
      assert(singleTemplateFile[0].code.includes('TEST_ITEM'));
      assert.equal(
        singleTemplateFile[0].filePath,
        path.join('test', 'file.java')
      );
      assert.equal(singleTemplateFile[0].after, '// Register Items');
    });
    it('Multiple entries', () => {
      const multipleTemplateFile = templateFile.parse(
        path.join(testFilePath, 'multiple_entry_file.java')
      );
      assert(multipleTemplateFile[0].code.includes('TEST_ITEM'));
      assert.equal(
        multipleTemplateFile[0].filePath,
        path.join('test', 'test_item.java')
      );
      assert.equal(multipleTemplateFile[0].after, '// Register Items');

      assert(multipleTemplateFile[1].code.includes('TEST_ITEM_2'));
      assert.equal(
        multipleTemplateFile[1].filePath,
        path.join('test', 'test_item_2.java')
      );
      assert.equal(multipleTemplateFile[1].before, '// Register Items');

      assert(multipleTemplateFile[2].code.includes('TEST_ITEM_3'));
      assert.equal(
        multipleTemplateFile[2].filePath,
        path.join('test', 'test_item_3.java')
      );
      assert.equal(multipleTemplateFile[2].after, '// Deregister Items');

      assert(multipleTemplateFile[3].code.includes('TEST_ITEM_4'));
      assert.equal(
        multipleTemplateFile[3].filePath,
        path.join('test', 'test_item_4.java')
      );
      assert.equal(multipleTemplateFile[3].create, true);

      assert(multipleTemplateFile[4].code.includes('TEST_ITEM_5'));
      assert.equal(
        multipleTemplateFile[4].filePath,
        path.join('test', 'test_item_5.java')
      );
      assert.equal(multipleTemplateFile[4].create, 'overwrite');
    });
  });

  describe('.getBaseTemplatePath(template)', () => {
    it('should be "/home/example/templates', () => {
      assert.equal(
        templateFile.getBaseTemplatePath(
          path.join('home', 'example', 'templates', 'src', 'java', 'test.java')
        ),
        path.join(process.cwd(), 'home', 'example', 'templates')
      );
    });
    it('should be "/home/example/templates', () => {
      assert.equal(
        templateFile.getBaseTemplatePath(
          path.join('home', 'example', 'templates', 'resources', 'test.png')
        ),
        path.join(process.cwd(), 'home', 'example', 'templates')
      );
    });
    it('should be "/home/example/templates', () => {
      assert.equal(
        templateFile.getBaseTemplatePath(
          path.join('home', 'example', 'templates', 'java', 'test.java')
        ),
        path.join(process.cwd(), 'home', 'example', 'templates')
      );
    });
    it('should be "/example_templates/templates', () => {
      assert.equal(
        templateFile.getBaseTemplatePath(
          path.join('core_templates', 'templates', 'src', 'java', 'test.java')
        ),
        path.join(process.cwd(), 'core_templates', 'templates')
      );
    });
  });
});
