/**
 * @file Minecraft Utils Shared Test - File finder
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import assert from 'assert';
import path from 'path';

import file_finder from '../../utils/file_finder.mjs';

describe('utils/file_finder', () => {
  describe('Object', () => {
    it('should be ok', () => {
      assert.equal(typeof file_finder, 'object');
    });
  });
  describe('getManifestsInSearchPath(...)', () => {
    it('should find two files', () => {
      const manifests = file_finder.getManifestsInSearchPath(
        path.join('test_files')
      );
      assert.equal(manifests.length, '2');
    });
    it('should find one file', () => {
      const manifests = file_finder.getManifestsInSearchPath(
        path.join('test_files', 'manifest', 'folder1')
      );
      assert.equal(manifests.length, '1');
    });
  });
  describe('getJavaFilesInSearchPath(...)', () => {
    it('should find two files', () => {
      const javaFiles = file_finder.getJavaFilesInSearchPath(
        path.join('test_files', 'java_files', 'project1')
      );
      assert.equal(javaFiles.length, '2');
    });
    it('should find one file', () => {
      const javaFiles = file_finder.getJavaFilesInSearchPath(
        path.join('test_files', 'java_files', 'project2')
      );
      assert.equal(javaFiles.length, '1');
    });
    it('should find two files', () => {
      const javaFiles = file_finder.getJavaFilesInSearchPath(
        path.join('test_files', 'java_files', 'project3')
      );
      assert.equal(javaFiles.length, '2');
    });
  });
  describe('getModMainClassInSearchPath(...)', () => {
    it('should find one mod main class file for project1', () => {
      const modMainClassFile = file_finder.getModMainClassInSearchPath(
        path.join('test_files', 'java_files', 'project1')
      );
      assert(modMainClassFile.endsWith('Project.java'));
      assert(modMainClassFile.includes('projectname'));
      assert(!modMainClassFile.includes('subnamespace'));
      assert(!modMainClassFile.includes('subsubnamespace'));
    });
    it('should find one mod main class file for project2', () => {
      const modMainClassFile = file_finder.getModMainClassInSearchPath(
        path.join('test_files', 'java_files', 'project2')
      );
      assert(modMainClassFile.endsWith('Project.java'));
      assert(modMainClassFile.includes('projectname'));
      assert(modMainClassFile.includes('subnamespace'));
      assert(!modMainClassFile.includes('subsubnamespace'));
    });
    it('should find one mod main class file for project3', () => {
      const modMainClassFile = file_finder.getModMainClassInSearchPath(
        path.join('test_files', 'java_files', 'project3')
      );
      assert(modMainClassFile.endsWith('Project.java'));
      assert(modMainClassFile.includes('projectname'));
      assert(modMainClassFile.includes('subnamespace'));
      assert(modMainClassFile.includes('subsubnamespace'));
    });
  });
  describe('getModInSearchPath(...)', () => {
    it('should find one mod file for project1', () => {
      const modFile = file_finder.getModInSearchPath(
        path.join('test_files', 'java_files', 'project1')
      );
      assert(modFile.endsWith('projectname'));
      assert(!modFile.includes('subnamespace'));
      assert(!modFile.includes('subsubnamespace'));
    });
    it('should find one mod file for project2', () => {
      const modFile = file_finder.getModInSearchPath(
        path.join('test_files', 'java_files', 'project2')
      );
      assert(modFile.endsWith('projectname'));
      assert(modFile.includes('subnamespace'));
      assert(!modFile.includes('subsubnamespace'));
    });
    it('should find one mod file for project3', () => {
      const modFile = file_finder.getModInSearchPath(
        path.join('test_files', 'java_files', 'project3')
      );
      assert(modFile.endsWith('projectname'));
      assert(modFile.includes('subnamespace'));
      assert(modFile.includes('subsubnamespace'));
    });
    it('should find none mod file', () => {
      const modFile = file_finder.getModInSearchPath(
        path.join('test_files', 'template_files')
      );
      assert.equal(modFile, undefined);
    });
  });
});
