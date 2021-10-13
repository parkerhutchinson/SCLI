import log from "./log.ts";
import { Command, Flags } from "../types/command.d.ts";

const defaultOpts = {
  parent: false,
  debug: false
};

/**
 * @description simple task runner wrapper that allows infinite subtask nesting
 * @param commands Commands[] array of tasks to execute
 * @param args string[] array of args passed from the command scope
 */
const commandRunner = async (commands: Command[], args: Flags) => {
  const { _: commandArgs, _$0, ...flags } = args;
  const needHelp = flags["h"];
  let hadCommands = false;

  // always get the last command in the cli
  const commandScope = commandArgs.at(-1); 

  await commands.forEach(async (command: Command) => {
    const options = Object.assign({}, defaultOpts, command.options);
    let flagErrors = false;

    if (command.name === commandScope && !options.parent) {
      hadCommands = true;
      // display docs if help is passed and docs exist on the command
      // otherwise its up to the user to define how docs display
      if (needHelp && typeof command.docs !== "undefined") {
        !options.debug && console.log(command.docs);
      } else {
        if (command.requiredFlags) {
          // ensure that the required flags exist
          command.requiredFlags.forEach((flag) => {
            if (typeof flags[flag] === "undefined") {
              flagErrors = true;
              !options.debug && log(`\nflag --${flag} is required\n`, "red");
            }
          });
        }

        (!flagErrors && !options.debug) && await command.exec(args);
      }
    }

    // if this command is a parent then just run the command without flag validation
    if (options.parent) {
      hadCommands = true;
      if (needHelp && typeof command.docs !== "undefined" && command.name === commandScope) {
        !options.debug && console.log(command.docs);
      } else {
        !options.debug && await command.exec(args);
      }
    }
    
  });
  if(!hadCommands) {
    log(`Command ${commandScope} not recongnized`, "red");
  } else {
    const ranCommand = commands.filter((command:Command) => command.name === commandScope)[0];
    return Promise.resolve({command:ranCommand, args: args});
  }
};

export default await commandRunner;