import { Task } from "../types/task.d.ts";

/**
 * @description simple task runner wrapper that allows infinite subtask nesting
 * @param tasks Task[] array of tasks to execute
 * @param args string[] array of args passed from the command scope
 */
const taskRunner = async (tasks:Task[], args:string[]) => {
  const taskArgs = args.filter((_,index:number) => index !== 0);
  await tasks.forEach(
    async (subTask: Task) => {
      subTask.name === taskArgs[0] && (await subTask.exec(taskArgs))
    }
  );
}

export default taskRunner;