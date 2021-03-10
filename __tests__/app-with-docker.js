"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const rimraf = require("rimraf");

describe("generator-liferay-elm:app", () => {
  const testProjectName = "test-elm-project";
  const testParentFolder = path.join(__dirname, "tmp");
  const testProjectFolder = `${testParentFolder}/${testProjectName}`;
  const testVersion = "1.0.0";
  const testDescription = "My beautiful Elm project for Liferay";
  const testLicense = "MIT";
  const testCategory = "category.elm";
  const defaultDockerDeployfolder = "./docker/liferay/deploy";

  beforeAll(() => {
    const mockPrompts = {
      name: `${testProjectName}`,
      description: `${testDescription}`,
      version: `${testVersion}`,
      license: `${testLicense}`,
      category: `${testCategory}`,
      docker: true
    };
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .inDir(testParentFolder)
      .withArguments("--force")
      .withPrompts(mockPrompts);
  });

  afterAll(() => {
    rimraf.sync(testParentFolder);
  });

  // Test files creation

  it("creates Dockerfile", () => {
    assert.file(`${testProjectFolder}/docker/liferay/Dockerfile`);
  });

  it("creates docker-compose.yml", () => {
    assert.file(`${testProjectFolder}/docker-compose.yml`);
  });

  it("creates com.liferay.portal.remote.cors.configuration.PortalCORSConfiguration-default.config", () => {
    assert.file(
      `${testProjectFolder}/docker/liferay/files/osgi/configs/com.liferay.portal.remote.cors.configuration.PortalCORSConfiguration-default.config`
    );
  });

  it("has deploy folder in .npmbuildrc", () => {
    assert.fileContent(
      `${testProjectFolder}/.npmbuildrc`,
      `"deployDir": "${defaultDockerDeployfolder}"`
    );
  });
});
