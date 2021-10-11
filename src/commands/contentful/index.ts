import createEnvironmentTask from "../../tasks/create-environment.ts";
import deleteEnvironmentTask from "../../tasks/delete-environment.ts";
import { Command, Flags } from "../../types/command.d.ts";
import commandRunner from "../../utils/command-runner.ts";


// cli contentful subcommand --flag
const contentful = async (args: Flags): Promise<void> => {
  await commandRunner([createEnvironmentTask, deleteEnvironmentTask], args);
};

const contentfulHelp = `\nIf the user needs docs they can write them like this and supply them to the docs prop of the command object. otherwise
if they need to display docs a certain way the command itself can do that and we just get out of the way\n`;

const contentfulCommand:Command = {
  name: 'contentful',
  docs: contentfulHelp,
  exec: async (args:Flags) => await contentful(args)
}

export default contentfulCommand;
