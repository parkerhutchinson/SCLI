import createEnvironmentCommand from "./sub-commands/create-environment.ts";
import deleteEnvironmentCommand from "./sub-commands/delete-environment.ts";
import setEnvironmentCommand from "./sub-commands/set-environment.ts";
import runMigrationsUpCommand from "./sub-commands/migration-up.ts";
import runMigrationsDownCommand from "./sub-commands/migration-down.ts";
import createMigrationCommand from "./sub-commands/create-migration.ts";
import showEnvironmentCommand from "./sub-commands/show-environment.ts";
import generateTypesCommand from "./sub-commands/generate-types.ts";

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
    runMigrationsUpCommand,
    runMigrationsDownCommand,
    createMigrationCommand,
    showEnvironmentCommand,
    generateTypesCommand
  ], args);
};

const contentfulHelp = `\nIf the user needs docs they can write and supply them to the docs prop of the command object. otherwise
if they need to display docs a certain way the command itself can do that and we just get out of the way\n`;

const contentfulCommand:Command = {
  name: 'contentful',
  docs: contentfulHelp,
  options: {parent: true},
  exec: async (args:Flags) => await contentful(args)
}

export default contentfulCommand;
