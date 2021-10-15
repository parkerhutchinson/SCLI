import createEnvironmentCommand from "./sub-commands/create-environment.ts";
import deleteEnvironmentCommand from "./sub-commands/delete-environment.ts";
import setEnvironmentCommand from "./sub-commands/set-environment.ts";
import runMigrationsCommand from "./sub-commands/run-migrations.ts";
import { Command, Flags } from "../../types/command.d.ts";
import commandRunner from "../../utils/command-runner.ts";

/**
 * @description parent command that does nothing other than supply a namespace context for its subcommands. 
 * $scli contentful set-env --name, $scli contentful run-migrations -d . for example.
 * @param args 
 */
const contentful = async (args: Flags): Promise<void> => {
  await commandRunner([
    createEnvironmentCommand, 
    deleteEnvironmentCommand, 
    setEnvironmentCommand,
    runMigrationsCommand
  ], args);
};

const contentfulHelp = `\nIf the user needs docs they can write them like this and supply them to the docs prop of the command object. otherwise
if they need to display docs a certain way the command itself can do that and we just get out of the way\n`;

const contentfulCommand:Command = {
  name: 'contentful',
  docs: contentfulHelp,
  options: {parent: true},
  exec: async (args:Flags) => await contentful(args)
}

export default contentfulCommand;
