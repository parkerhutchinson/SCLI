import log from "./log.ts";
import { Command, Flags } from "../types/command.d.ts";


/**
 * @description simple task runner wrapper that allows infinite subtask nesting
 * @param commands Commands[] array of tasks to execute
 * @param args string[] array of args passed from the command scope
 */
const commandRunner = async (commands: Command[], args: Flags) => {
  const {_: commandArgs, _$0, ...flags} = args;
  const needHelp = typeof flags['h'] !== 'undefined';
  const commandFlags = flags;

  let commandSupplied;

  await commands.forEach(async (command: Command) => {
    let flagErrors;

    if(commandArgs.includes(command.name)) {
      commandSupplied = true;

      // display docs if help is passed and docs exist on the command
      // otherwise its up to the user to define how docs display
      if (needHelp && typeof command.docs !== 'undefined') {
        console.log(command.docs);
      } else {
        if (command.requiredFlags) {
          // ensure that the required flags exist
          command.requiredFlags.forEach((flag) => {
            if (typeof commandFlags[flag] === 'undefined') {
              flagErrors = true;
              log(`flag --${flag} is require\n`, "red");
            }
          });
        }
  
        !flagErrors && await command.exec(args);
      }

    } 
  });

  !commandSupplied && log('task not recongnized\n', "red");
};

export default commandRunner;
