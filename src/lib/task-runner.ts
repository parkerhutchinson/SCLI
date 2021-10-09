import { Task } from "../types/task.d.ts";


const taskRunner = async (tasks:Task[], args:string[]) => {
  const taskArgs = args.filter((_,index:number) => index !== 0);
  await tasks.forEach(
    async (subTask: Task) => {
      subTask.name === taskArgs[0] && (await subTask.exec(taskArgs))
    }
  );
}

export default taskRunner;