import createEnvironmentTask from "../../tasks/create-environment.ts";
import deleteEnvironmentTask from "../../tasks/delete-environment.ts";
import { Command } from "../../types/command.d.ts";
import commandRunner from "../../utils/command-runner.ts";

const subTasks: Command[] = [createEnvironmentTask, deleteEnvironmentTask];

const contentful = async (args: string[]): Promise<void> => {
  await commandRunner(subTasks, args);
};

const contentfulCommand:Command = {
  name: 'contentful',
  exec: async (args:string[]) => await contentful(args)
}

export default contentfulCommand;
