import run from "../../../utils/run.ts";
import log from "../../../utils/log.ts";
import { Command, Flags } from "../../../types/command.d.ts";
import { readEnvFile } from "../../../lib/env-io.ts";
import { manageContentfulData } from "../../../lib/contentful-data.ts";

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
  const { status: _environmentStatus, data: environmentData } =
    await manageContentfulData(`environments`, "GET");

  const envId: string | undefined = await readEnvFile();
  // get the current master alias env to make sure we dont run migrations on master.
  // @ts-ignore: why
  const masterEnvIds = environmentData.items
    // @ts-ignore: 
    .map((item) => ({ name: item.name, id: item.sys.id }))
    // @ts-ignore: 
    .filter((item) => item.id === 'master')[0];

  if (dryRun) {
    log("executing dry on pending migrations", "cyan");
  }
  
  if (masterEnvIds.name !== envId) {
    console.log(`\n running pending migrations on ${envId} environment \n`);
    if (dryRun) {
      await run([
        "npx",
        "contentful-migrate",
        "up",
        `--access-token=${manageToken}`,
        `--space-id=${spaceId}`,
        `--environment-id=${envId}`,
        "-d",
        "--all",
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
  } else {
    log(`can't run migration on environment ${envId} as its currently the alias for master \n`, "red");
  }
};

const runMigrationsUpCommand: Command = {
  name: "migration-up",
  docs: "\n run migrations using the contentful-migrate node module(i know im running node modules from Deno lol)  \n",
  exec: async (args: Flags) => await migrationUp(args),
};

export default runMigrationsUpCommand;
