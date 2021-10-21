import run from "../../../utils/run.ts";
import log from "../../../utils/log.ts";
import { Command, Flags } from "../../../types/command.d.ts";
import { readEnvFile } from "../../../lib/env-io.ts";

/**
 * @description A subprocess call to contentful-migrate to run the "up"
 * feature of that tool which writes the most recently writen migration
 * given that you have supplied an "up" script in the migration file.
 * @param args
 * @property {bool} d: flag for running a dry-run on the pending migrations so we can spot check if any errors arise.
 */
const migrationUp = async (args: Flags) => {
  const { d: dryRun } = args;
  const spaceId: string | undefined = Deno.env.get("CONTENTFUL_SPACE_ID");
  const manageToken: string | undefined = Deno.env.get(
    "CONTENTFUL_MANAGEMENT_ACCESS_TOKEN"
  );
  const envId: string | undefined = await readEnvFile();

  if (dryRun) {
    log("executing dry on pending migrations", "cyan");
  }

  console.log(`\n running pending migrations on ${envId} environment \n`);

  if (dryRun) {
    await run([
      "npx",
      "contentful-migrate",
      "up",
      `--access-token=${manageToken}`,
      `--space-id=${spaceId}`,
      `--environment-id=${envId}`,
      "--all",
      "-d",
    ]);
  } else {
    await run([
      "npx",
      "contentful-migrate",
      "up",
      `--access-token=${manageToken}`,
      `--space-id=${spaceId}`,
      `--environment-id=${envId}`,
      "--all",
    ]);
  }
};

const runMigrationsUpCommand: Command = {
  name: "migration-up",
  docs: "\n run migrations using the contentful-migrate node module(i know im running node modules from Deno lol)  \n",
  exec: async (args: Flags) => await migrationUp(args),
};

export default runMigrationsUpCommand;
