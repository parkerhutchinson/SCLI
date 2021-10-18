import run from "../../../utils/run.ts";
import log from "../../../utils/log.ts";
import { Command, Flags } from "../../../types/command.d.ts";
import {readEnvFile} from "../../../lib/env-io.ts";


/**
 * @description this is a wrapper for a an existing cli tool called contentful-migrate. 
 * This lets me manage contentful migrations closer to what you'd expect from other ORMs like in Django.
 * This has two modes. one where it runs all pending migrations and writes the changes to disk on the contentful db.
 * and two the dry-run which runs the migrations without committing them to disk for error checking.
 * @param args 
 * @property {bool} d: flag for running a dry-run on the pending migrations so we can spot check if any errors arise.
 */
const migrationDown = async (args:Flags) => {
  const dryRun = args['d'];
  const spaceId: string | undefined = Deno.env.get("CONTENTFUL_SPACE_ID");
  const manageToken: string | undefined = Deno.env.get("CONTENTFUL_MANAGEMENT_ACCESS_TOKEN");
  const envId: string | undefined = await readEnvFile();

  if (dryRun) {
    log('executing dry on pending migrations', "cyan");
  }

  console.log(`\n running pending migrations on ${envId} environment \n`);

  if (dryRun) {
    await run(["npx", "contentful-migrate", "down", `--access-token=${manageToken}`,`--space-id=${spaceId}`,`--environment-id=${envId}`, '-d']);
  } else {
    await run(["npx", "contentful-migrate", "down", `--access-token=${manageToken}`,`--space-id=${spaceId}`,`--environment-id=${envId}`]);
  }
  
}

const runMigrationsDownCommand: Command = {
  name: "migration-down",
  docs: "\n run migrations using the contentful-migrate node module(i know im running node modules from Deno lol)  \n",
  exec: async (args: Flags) => await migrationDown(args),
};

export default runMigrationsDownCommand;