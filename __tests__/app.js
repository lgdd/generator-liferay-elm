"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-liferay-elm:app", () => {
  beforeAll(() => {
    const mockPrompts = {
      name: "test-elm-project",
      category: "category.sample",
      description: "",
      version: "1.0.0",
      license: "MIT"
    };
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withArguments("--force")
      .withPrompts(mockPrompts);
  });

  it("creates package.json", () => {
    assert.file(["package.json"]);
  });
});
