import chalk from "chalk";

export function _errorUnderline(message) {
  return chalk.red.bold.underline(message);
}

export function uncaughtError(message) {
  console.error(
    chalk.red(`${chalk.bold.red.inverse(" ⚠  UNCAUGHT ERROR ")}\n${message}\n`)
  );
}

export function error(message) {
  console.error(
    chalk.red(`${chalk.bold.red.inverse(" ⚠  ERROR ")}\n${message}`)
  );
}

export function failed(message) {
  console.error(chalk.bold.red.inverse(` ⚠  ${message} `));
}

export function success(message) {
  console.log(chalk.green.bold.inverse(` ✔  ${message} `));
}

export function action(before, message, after = "") {
  console.log(
    `${chalk.green.italic(before)} ${chalk.green.bold(
      message
    )} ${chalk.green.italic(after)}`
  );
}

export function newLine() {
  console.log("");
}

export function successBlue(message) {
  console.log(chalk.blue.bold.inverse(` ✔  ${message} \n`));
}

export function step(message) {
  console.log(chalk.bold.blue.inverse(` ◼  ${message} \n`));
}

export function subStep(message) {
  console.log(chalk.blue.bold(` ◼  ${message}\n`));
}

export function subSuccess(message, after = "") {
  console.log(chalk.green.italic(` ✔  ${chalk.green.bold(message)} ${after} `));
}

export function errorList(title, list) {
  console.log(
    chalk.red.italic(
      `\n ${chalk.red.bold.inverse(` ⚠  ${title}: `)}\n ${list
        .map((x) => ` - ${x}`)
        .join("\n")}`
    )
  );
}

export function underline(message) {
  console.log(chalk.bold.underline.green(message));
}

export function fromCommandLine() {
  console.log(chalk.bold.underline.green(`Called from command line\n`));
  divider();
}

export function divider() {
  console.log(
    chalk.grey.italic(
      "_______________________________________________________________________________________________________________\n"
    )
  );
}
