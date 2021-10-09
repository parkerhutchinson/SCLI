import createEnvironmentTask from "../../tasks/create-environment.ts";
import { Task } from "../../types/task.d.ts";
import { Command } from "../../types/command.d.ts";
import taskRunner from "../../lib/task-runner.ts";

const subTasks: Task[] = [createEnvironmentTask];

const contentful = async (args: string[]): Promise<void> => {
  await taskRunner(subTasks, args);
};

const contentfulCommand:Command = {
  name: 'contentful',
  exec: async (args:string[]) => await contentful(args)
}

export default contentfulCommand;
