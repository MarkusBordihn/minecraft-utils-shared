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

  describe('.getFileType()', () => {
    it('"/test/hello_world/listen.txt" should be fileType.UNKNOWN', () => {
      assert.equal(
        templateFile.getFileType('/test/hello_world/listen.txt'),
        templateFile.fileType.UNKNOWN
      );
    });
    it('"block/ModBlocks.java" should be fileType.JAVA', () => {
      assert.equal(
        templateFile.getFileType('block/ModBlocks.java'),
        templateFile.fileType.JAVA
      );
    });
    it('"item/ModItems.java should be fileType.JAVA', () => {
      assert.equal(
        templateFile.getFileType('item/ModItems.java'),
        templateFile.fileType.JAVA
      );
    });
    it('"lang/en_us.json" should be fileType.RESOURCE', () => {
      assert.equal(
        templateFile.getFileType('lang/en_us.json'),
        templateFile.fileType.RESOURCE
      );
    });
    it('"blockstates/[[ --block_name-- ]].json" should be fileType.RESOURCE', () => {
      assert.equal(
        templateFile.getFileType('blockstates/[[ --block_name-- ]].json'),
        templateFile.fileType.RESOURCE
      );
    });
    it('"models/block/[[ --block_name-- ]].json" should be fileType.RESOURCE', () => {
      assert.equal(
        templateFile.getFileType('models/block/[[ --block_name-- ]].json'),
        templateFile.fileType.RESOURCE
      );
    });
    it('"models/item/[[ --block_name-- ]].json" should be fileType.RESOURCE', () => {
      assert.equal(
        templateFile.getFileType('models/item/[[ --block_name-- ]].json'),
        templateFile.fileType.RESOURCE
      );
    });
    it('textures/block/[[ --block_name-- ]].png" should be fileType.RESOURCE', () => {
      assert.equal(
        templateFile.getFileType('textures/block/[[ --block_name-- ]].png'),
        templateFile.fileType.RESOURCE
      );
    });
    it('[[ --ModId-- ]]/loot_tables/blocks/[[ --block_name-- ]].json" should be fileType.DATA', () => {
      assert.equal(
        templateFile.getFileType(
          '[[ --ModId-- ]]/loot_tables/blocks/[[ --block_name-- ]].json'
        ),
        templateFile.fileType.DATA
      );
    });
    it('loot_tables/blocks/[[ --block_name-- ]].json" should be fileType.DATA', () => {
      assert.equal(
        templateFile.getFileType(
          'loot_tables/blocks/[[ --block_name-- ]].json'
        ),
        templateFile.fileType.DATA
      );
    });
    it('minecraft/loot_tables/blocks/[[ --block_name-- ]].json" should be fileType.DATA_MINECRAFT', () => {
      assert.equal(
        templateFile.getFileType(
          'minecraft/loot_tables/blocks/[[ --block_name-- ]].json'
        ),
        templateFile.fileType.DATA_MINECRAFT
      );
      it('minecraft/tags/blocks/mineable/pickaxe.json" should be fileType.DATA_MINECRAFT', () => {
        assert.equal(
          templateFile.getFileType(
            'minecraft/tags/blocks/mineable/pickaxe.json'
          ),
          templateFile.fileType.DATA_MINECRAFT
        );
      });
      it('minecraft/tags/blocks/needs_iron_tool.json" should be fileType.DATA_MINECRAFT', () => {
        assert.equal(
          templateFile.getFileType(
            'minecraft/tags/blocks/needs_iron_tool.json'
          ),
          templateFile.fileType.DATA_MINECRAFT
        );
      });
    });
  });
});
