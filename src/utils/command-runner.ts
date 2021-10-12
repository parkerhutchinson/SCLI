import log from "./log.ts";
import { Command, Flags } from "../types/command.d.ts";

const defaultOpts = {
  parent: false,
};

/**
 * @description simple task runner wrapper that allows infinite subtask nesting
 * @param commands Commands[] array of tasks to execute
 * @param args string[] array of args passed from the command scope
 */
const commandRunner = async (commands: Command[], args: Flags) => {
  const { _: commandArgs, _$0, ...flags } = args;
  const needHelp = flags["h"];
  const commandFlags = flags;
  let hadCommands = false;
  // pretty helpful new api for arrays
  // always get the last command in the cli
  const commandScope = commandArgs.at(-1); 

  await commands.forEach(async (command: Command) => {
    const options = Object.assign({}, defaultOpts, command.options);
    let flagErrors;

    if (command.name === commandScope && !options.parent) {
      hadCommands = true;
      // display docs if help is passed and docs exist on the command
      // otherwise its up to the user to define how docs display
      if (needHelp && typeof command.docs !== "undefined") {
        console.log(command.docs);
      } else {
        if (command.requiredFlags) {
          // ensure that the required flags exist
          command.requiredFlags.forEach((flag) => {
            if (typeof commandFlags[flag] === "undefined") {
              flagErrors = true;
              log(`\nflag --${flag} is required\n`, "red");
            }
          });
        }

        !flagErrors && (await command.exec(args));
      }
    }

    // if this command is a parent then just run the command without flag validation
    if (options.parent) {
      hadCommands = true;
      if (
        needHelp &&
        typeof command.docs !== "undefined" &&
        command.name === commandScope
      ) {
        console.log(command.docs);
      } else {
        await command.exec(args);
      }
    }
  });

  !hadCommands && log(`Command ${commandScope} not recongnized`, "red");
};

export default commandRunner;
