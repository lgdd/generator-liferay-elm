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
        message: "What's your project name?",
        default: "my-elm-project"
      },
      {
        type: "input",
        name: "description",
        message: "How would you describe your project?",
        default: ""
      },
      {
        type: "input",
        name: "version",
        message: "Which version do you want to use as a starting point?",
        default: "1.0.0"
      },
      {
        type: "input",
        name: "license",
        message: "Which license do you want to use for your project?",
        default: "MIT"
      },
      {
        type: "input",
        name: "category",
        message:
          "Which Liferay widget category should be associated with your project?",
        default: "category.sample"
      },
      {
        type: "confirm",
        name: "docker",
        message:
          "Do you want me to prepare a pre-configured Liferay Docker environment?"
      },
      {
        when: answer => {
          return !answer.docker;
        },
        type: "input",
        name: "deployFolder",
        message:
          "In this case, where is the Liferay deploy folder you want to use?",
        default: "/opt/liferay/deploy"
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

    this.fs.copy(this.templatePath("base/**/*"), this.destinationRoot());

    this.fs.copyTpl(
      this.templatePath("extras/Main.elm"),
      this.destinationPath("src/Main.elm"),
      {
        name: this.props.name
      }
    );

    this.fs.copyTpl(
      this.templatePath("extras/main.css"),
      this.destinationPath("src/main.css"),
      {
        name: this.props.name
      }
    );

    this.fs.copy(
      this.templatePath("extras/_gitignore"),
      this.destinationPath(".gitignore")
    );

    this.fs.copy(
      this.templatePath("extras/liferay-elm-build.js"),
      this.destinationPath("bin/liferay-elm-build.js")
    );

    this.fs.copy(
      this.templatePath("extras/liferay-elm-deploy.js"),
      this.destinationPath("bin/liferay-elm-deploy.js")
    );

    this.fs.copyTpl(
      this.templatePath("extras/Language.properties"),
      this.destinationPath("features/localization/Language.properties"),
      {
        name: this.props.name,
        portletname: this.props.name.replace(/-/g, "")
      }
    );

    this.fs.copyTpl(
      this.templatePath("extras/_npmbuildrc"),
      this.destinationPath(".npmbuildrc"),
      {
        deployFolder: this.props.docker
          ? "./docker/liferay/deploy"
          : this.props.deployFolder
      }
    );

    this.fs.copy(
      this.templatePath("extras/_npmbundlerrc"),
      this.destinationPath(".npmbundlerrc")
    );

    this.fs.copyTpl(
      this.templatePath("extras/package.json"),
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

    if (this.props.docker) {
      this.fs.copy(
        this.templatePath(
          "extras/com.liferay.portal.remote.cors.configuration.PortalCORSConfiguration-default.config"
        ),
        this.destinationPath(
          "docker/liferay/files/osgi/configs/com.liferay.portal.remote.cors.configuration.PortalCORSConfiguration-default.config"
        )
      );
      this.fs.copy(
        this.templatePath("extras/_gitkeep"),
        this.destinationPath("docker/liferay/deploy/.gitkeep")
      );
      this.fs.copy(
        this.templatePath("extras/Dockerfile"),
        this.destinationPath("docker/liferay/Dockerfile")
      );
      this.fs.copy(
        this.templatePath("extras/docker-compose.yml"),
        this.destinationPath("docker-compose.yml")
      );
    }

    this.fs.copy(
      this.templatePath("extras/yarn.lock"),
      this.destinationPath("yarn.lock")
    );
  }

  install() {
    this.yarnInstall();
  }

  end() {
    console.log();
    console.log(
      chalk.green(
        "✅ Project is successfully created in `" +
          this.destinationRoot() +
          "`."
      )
    );
    console.log();
    console.log(
      "📝 This project is bootstrapped with",
      chalk.bold("Create Elm App:"),
      chalk.underline("https://github.com/halfzebra/create-elm-app.")
    );
    console.log();
    console.log("🔍 Inside that directory, you can run several commands:");
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
    console.log("    Format your sources with", chalk.italic("elm-format."));
    console.log();
    console.log(chalk.cyan("  yarn build:liferay"));
    console.log("    Bundles the app as a JAR for Liferay.");
    console.log();
    console.log(chalk.cyan("  yarn deploy:liferay"));
    if (this.props.docker) {
      console.log(
        "    Bundles the app as a JAR for Liferay and copy it to",
        chalk.italic("./docker/liferay/deploy")
      );
      console.log();
      console.log(
        "    ⚠️  " +
          chalk.italic(
            "If the deploy doesn't seem to work " +
              "(i.e. you don't see any logs related to it on Liferay side),"
          )
      );
      console.log(
        chalk.italic(
          "    you might need to remove the JAR under the deploy folder and " +
            "re-run the deploy command."
        )
      );
    } else {
      console.log(
        "    Bundles the app as a JAR for Liferay and copy it to the deploy folder defined in",
        chalk.italic(".npmbuildrc.")
      );
    }

    console.log();
    console.log("📌 I suggest that you begin by typing:");
    console.log();
    console.log(chalk.cyan("  cd"), this.props.name);
    if (this.props.docker) {
      console.log("  " + chalk.cyan("docker-compose up -d"));
    }

    console.log("  " + chalk.cyan("yarn start"));
    console.log();
  }
};
