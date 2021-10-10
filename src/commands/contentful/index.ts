import createEnvironmentTask from "../../tasks/create-environment.ts";
import deleteEnvironmentTask from "../../tasks/delete-environment.ts";
import { Task } from "../../types/task.d.ts";
import { Command } from "../../types/command.d.ts";
import taskRunner from "../../utils/task-runner.ts";

const subTasks: Task[] = [createEnvironmentTask, deleteEnvironmentTask];

const contentful = async (args: string[]): Promise<void> => {
  await taskRunner(subTasks, args);
};

const contentfulCommand:Command = {
  name: 'contentful',
  exec: async (args:string[]) => await contentful(args)
}

export default contentfulCommand;
