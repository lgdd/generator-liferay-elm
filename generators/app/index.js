"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const path = require("path");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the happy ${chalk.cyan("generator-liferay-elm")} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: "my-elm-project"
      },
      {
        type: "input",
        name: "category",
        message: "Your project category (Liferay)",
        default: "category.sample"
      },
      {
        type: "input",
        name: "description",
        message: "Description",
        default: ""
      },
      {
        type: "input",
        name: "version",
        message: "Version",
        default: "1.0.0"
      },
      {
        type: "input",
        name: "license",
        message: "License",
        default: "MIT"
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const dest = this.props.name;

    this.destinationRoot(path.resolve(dest));

    this.fs.copy(
      this.templatePath("create-elm-app/**/*"),
      this.destinationRoot()
    );

    this.fs.copy(
      this.templatePath(".gitignore"),
      this.destinationPath(".gitignore")
    );

    this.fs.copy(
      this.templatePath("liferay-elm-build.js"),
      this.destinationPath("bin/liferay-elm-build.js")
    );

    this.fs.copyTpl(
      this.templatePath("Language.properties"),
      this.destinationPath("features/localization/Language.properties"),
      {
        name: this.props.name,
        portletname: this.props.name.replace(/-/g, "")
      }
    );

    this.fs.copy(
      this.templatePath(".npmbuildrc"),
      this.destinationPath(".npmbuildrc")
    );

    this.fs.copy(
      this.templatePath(".npmbundlerrc"),
      this.destinationPath(".npmbundlerrc")
    );

    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json"),
      {
        name: this.props.name,
        description: this.props.description,
        version: this.props.version,
        license: this.props.license,
        portletname: this.props.name.replace(/-/g, ""),
        portletcategory: this.props.category
      }
    );
  }

  install() {
    this.yarnInstall();
  }

  end() {
    console.log();
    console.log(
      chalk.green(
        "Project is successfully created in `" + this.destinationRoot() + "`."
      )
    );
    console.log();
    console.log(
      "This project is bootstrapped with",
      chalk.bold("Create Elm App:"),
      chalk.underline("https://github.com/halfzebra/create-elm-app.")
    );
    console.log();
    console.log("Inside that directory, you can run several commands:");
    console.log();
    console.log(chalk.cyan("  yarn start"));
    console.log("    Starts the development server.");
    console.log();
    console.log(chalk.cyan("  yarn build"));
    console.log("    Bundles the app into static files for production.");
    console.log();
    console.log(chalk.cyan("  yarn test"));
    console.log("    Starts the test runner.");
    console.log();
    console.log(chalk.cyan("  yarn eject"));
    console.log(
      "    Removes this tool and copies build dependencies, configuration files"
    );
    console.log(
      "    and scripts into the app directory. If you do this, you can’t go back!"
    );
    console.log();
    console.log(chalk.cyan("  yarn format"));
    console.log("    Format your sources with", chalk.italic("elm-format"));
    console.log();
    console.log(chalk.cyan("  yarn build:liferay"));
    console.log("    Bundles the app as a JAR for Liferay.");
    console.log();
    console.log("We suggest that you begin by typing:");
    console.log();
    console.log(chalk.cyan("  cd"), this.props.name);
    console.log("  " + chalk.cyan("yarn start"));
    console.log();
  }
};
