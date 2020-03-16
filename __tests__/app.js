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
  beforeAll(() => {
    const mockPrompts = {
      name: `${testProjectName}`,
      category: `${testCategory}`,
      description: `${testDescription}`,
      version: `${testVersion}`,
      license: `${testLicense}`
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

  it("creates elm.json", () => {
    assert.file(`${testProjectFolder}/elm.json`);
  });

  it("creates Main.elm", () => {
    assert.file(`${testProjectFolder}/src/Main.elm`);
  });

  it("creates index.js", () => {
    assert.file(`${testProjectFolder}/src/index.js`);
  });

  it("creates .gitignore", () => {
    assert.file(`${testProjectFolder}/.gitignore`);
  });

  it("creates package.json", () => {
    assert.file(`${testProjectFolder}/package.json`);
  });

  it("creates .npmbundlerrc", () => {
    assert.file(`${testProjectFolder}/.npmbundlerrc`);
  });

  it("creates .npmbuildrc", () => {
    assert.file(`${testProjectFolder}/.npmbuildrc`);
  });

  it("creates features/localization/Language.properties", () => {
    assert.file(
      `${testProjectFolder}/features/localization/Language.properties`
    );
  });

  it("creates bin/liferay-elm.build.js", () => {
    assert.file([`${testProjectFolder}/bin/liferay-elm-build.js`]);
  });

  // Test files content

  it("has project name in package.json", () => {
    assert.fileContent(
      `${testProjectFolder}/package.json`,
      `"name": "${testProjectName}"`
    );
  });

  it("has project license in package.json", () => {
    assert.fileContent(
      `${testProjectFolder}/package.json`,
      `"license": "${testLicense}"`
    );
  });

  it("has project version in package.json", () => {
    assert.fileContent(
      `${testProjectFolder}/package.json`,
      `"version": "${testVersion}"`
    );
  });

  it("has portlet name in package.json", () => {
    const testProjectNameWithoutHyphens = testProjectName.replace(/-/g, "");
    assert.fileContent(
      `${testProjectFolder}/package.json`,
      `"javax.portlet.name": "${testProjectNameWithoutHyphens}"`
    );
  });

  it("has project name in features/localization/Language.properties", () => {
    const testProjectNameWithoutHyphens = testProjectName.replace(/-/g, "");
    assert.fileContent(
      `${testProjectFolder}/features/localization/Language.properties`,
      `javax.portlet.title.${testProjectNameWithoutHyphens}=${testProjectName}`
    );
  });

  it("has document.getElementById('root') in index.js", () => {
    assert.fileContent(
      `${testProjectFolder}/src/index.js`,
      `document.getElementById('root')`
    );
  });
});
