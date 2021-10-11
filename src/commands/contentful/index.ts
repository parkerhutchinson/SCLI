import createEnvironmentTask from "../../tasks/create-environment.ts";
import deleteEnvironmentTask from "../../tasks/delete-environment.ts";
import { Command, Flags } from "../../types/command.d.ts";
import commandRunner from "../../utils/command-runner.ts";

const subCommands: Command[] = [createEnvironmentTask, deleteEnvironmentTask];

const contentful = async (args: Flags): Promise<void> => {
  await commandRunner(subCommands, args);
};

const contentfulHelp = `testing help idea`;

const contentfulCommand:Command = {
  name: 'contentful',
  docs: contentfulHelp,
  exec: async (args:Flags) => await contentful(args)
}

export default contentfulCommand;
