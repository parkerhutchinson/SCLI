import run from "../../../utils/run.ts";
import log from "../../../utils/log.ts";
import { Command, Flags } from "../../../types/command.d.ts";
import { readEnvFile } from "../../../lib/env-io.ts";

/**
 * @description the is a wrapper to contentful-migrate to run the "down"
 * feature of that tool which reverts the most recently run migration
 * given that you have supplied a "down" script in the migration file.
 * @param args
 * @property {bool} d: flag for running a dry-run on the pending migrations so we can spot check if any errors arise.
 */
const migrationDown = async (args: Flags) => {
  const dryRun = args["d"];
  const { contentType } = args;
  const spaceId: string | undefined = Deno.env.get("CONTENTFUL_SPACE_ID");
  const manageToken: string | undefined = Deno.env.get(
    "CONTENTFUL_MANAGEMENT_ACCESS_TOKEN"
  );
  const envId: string | undefined = await readEnvFile();

  if (dryRun) {
    log("executing dry on pending migrations", "cyan");
  }

  console.log(`\n reverting last run migrations on ${envId} environment \n`);

  if (dryRun) {
    await run([
      "npx",
      "contentful-migrate",
      "down",
      `--access-token=${manageToken}`,
      `--space-id=${spaceId}`,
      `--environment-id=${envId}`, 
      `--content-type=${contentType}`,
      "-d",
    ]);
  } else {
    await run([
      "npx",
      "contentful-migrate",
      "down",
      `--access-token=${manageToken}`,
      `--space-id=${spaceId}`,
      `--environment-id=${envId}`,
      `--content-type=${contentType}`,
    ]);
  }
};

const runMigrationsDownCommand: Command = {
  name: "migration-down",
  requiredFlags: ["content-type"],
  docs: "\n run migrations using the contentful-migrate node module(i know im running node modules from Deno lol)  \n",
  exec: async (args: Flags) => await migrationDown(args),
};

export default runMigrationsDownCommand;
