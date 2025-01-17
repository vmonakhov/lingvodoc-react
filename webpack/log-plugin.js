const chalk = require("chalk");

// this plugin if for loggin url after each time the compilation is done.
module.exports = class LogPlugin {
  constructor(port) {
    this.port = port;
  }

  apply(compiler) {
    compiler.hooks.done.tap("LogPlugin", () => {
      console.log(`> App is running at ${chalk.yellow(`http://localhost:${this.port}`)}\n`);
    });
  }
};
