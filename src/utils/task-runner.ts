import log from "./log.ts";
import { Task } from "../types/task.d.ts";
import getFlags from "./get-flags.ts";

/**
 * @description simple task runner wrapper that allows infinite subtask nesting
 * @param tasks Task[] array of tasks to execute
 * @param args string[] array of args passed from the command scope
 */
const taskRunner = async (tasks: Task[], args: string[]) => {
  const scopeArgs = args.filter((_, index: number) => index !== 0);
  const taskFlags = getFlags(scopeArgs);
  let commandSupplied;

  await tasks.forEach(async (subTask: Task) => {
    let flagErrors;

    if(subTask.name === scopeArgs[0]) {
      commandSupplied = true;

      if (subTask.requiredFlags) {
        const suppliedFlags: string[] = Array.from(Object.keys(taskFlags));
        subTask.requiredFlags.forEach((flag) => {
          if (!suppliedFlags.includes(flag)) {
            flagErrors = true;
            log(`flag --${flag} is require \n`, "red");
          }
        });
      }

      !flagErrors && await subTask.exec(taskFlags);
    } 
  });

  !commandSupplied && log('command not recongnized', "red");
};

export default taskRunner;
