import run from "../../../utils/run.ts";
import log from "../../../utils/log.ts";
import { Command, Flags } from "../../../types/command.d.ts";



const runMigrations = async (_args:Flags) => {
  await run(["npx", "contentful-migrate"]);
}

const runMigrationsCommand: Command = {
  name: "run-migrations",
  docs: "\n run migrations using the contentful-migrate node module(i know im running node modules from Deno lol)  \n",
  exec: async (args: Flags) => await runMigrations(args),
};

export default runMigrationsCommand;