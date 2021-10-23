/**
 * @file Minecraft Utils Shared Test - Configuration
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

import assert from 'assert';

import configuration from '../../utils/configuration.mjs';
import defaultProjectConfig from './../../default/project_config.mjs';

describe('utils/configuration', () => {
  const defaultConfigurationExtension_ = configuration.configExtension;
  const defaultConfigurationPath_ = configuration.configPath;
  const defaultProjectConfig_ = configuration.projectConfig;

  describe('Object', () => {
    it('should be ok', () => {
      assert.equal(typeof configuration, 'object');
    });
  });
  describe('overwrite .configPath', () => {
    configuration.configPath = 'test123';
    it('should be test123', () => {
      assert.equal(configuration.configPath, 'test123');
      configuration.configPath = defaultConfigurationPath_;
    });
  });
  describe('overwrite .configExtension', () => {
    configuration.configExtension = '.test123';
    it('should be .test123', () => {
      assert.equal(configuration.configExtension, '.test123');
      configuration.configExtension = defaultConfigurationExtension_;
    });
  });
  describe('overwrite .projectConfig', () => {
    configuration.projectConfig = 'MyProjectConfig.cfg';
    it('should be MyProjectConfig.cfg', () => {
      assert.equal(configuration.projectConfig, 'MyProjectConfig.cfg');
      configuration.projectConfig = defaultProjectConfig_;
    });
  });
  describe('loadProjectConfig', () => {
    const projectConfig = configuration.loadProjectConfig();
    it('should be default', () => {
      assert.equal(projectConfig, defaultProjectConfig.config);
    });
  });

  after(() => {
    configuration.configExtension = defaultConfigurationExtension_;
    configuration.configPath = defaultConfigurationPath_;
    configuration.projectConfig = defaultProjectConfig_;
  });
});
