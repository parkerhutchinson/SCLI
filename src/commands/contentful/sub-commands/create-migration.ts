import run from "../../../utils/run.ts";
import log from "../../../utils/log.ts";
import { Command, Flags } from "../../../types/command.d.ts";


/**
 * @description create migration file template given the 
 * content-type and the name of the migration
 * @param args 
 * @property {bool} d: flag for running a dry-run on the pending migrations so we can spot check if any errors arise.
 */
const createMigration = async (args:Flags) => {
  const contentType = args['content-type'];
  const name = args['name'];

  log(`creating migraiton file ${name} for content type ${contentType}`, "cyan");
  
  await run(["npx", "contentful-migrate", "create", `${name}`, `--content-type=${contentType}`]);
 
}

const createMigrationCommand: Command = {
  name: "create-migration",
  requiredFlags: ['name', 'content-type'],
  docs: "\n Create migration file using the npm module contentful-migrate  \n",
  exec: async (args: Flags) => await createMigration(args),
};

export default createMigrationCommand;