import log from "./log.ts";
import { Command } from "../types/command.d.ts";
import getFlags from "./get-flags.ts";

/**
 * @description simple task runner wrapper that allows infinite subtask nesting
 * @param commands Commands[] array of tasks to execute
 * @param args string[] array of args passed from the command scope
 */
const commandRunner = async (commands: Command[], args: string[]) => {
  const scopeArgs = args.filter((_, index: number) => index !== 0);
  const commandFlags = getFlags(scopeArgs);
  let commandSupplied;

  await commands.forEach(async (command: Command) => {
    let flagErrors;

    if(command.name === scopeArgs[0]) {
      commandSupplied = true;

      if (command.requiredFlags) {
        const suppliedFlags: string[] = Array.from(Object.keys(commandFlags));

        command.requiredFlags.forEach((flag) => {
          if (!suppliedFlags.includes(flag)) {
            flagErrors = true;
            log(`flag --${flag} is require\n`, "red");
          }
        });
      }

      !flagErrors && await command.exec(scopeArgs);
    } 
  });

  !commandSupplied && log('task not recongnized\n', "red");
};

export default commandRunner;
