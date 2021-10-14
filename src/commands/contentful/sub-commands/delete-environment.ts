import log from "../../../utils/log.ts";
import { Command, Flags } from "../../../types/command.d.ts";
import { manageContentfulData } from "../../../lib/contentful-data.ts";
import { writeEnvFile } from "../../../lib/env-io.ts";


/**
 * @description deletes a chosen environment
 * @param args string[]: this expects name to be present
 */
const deleteEnvironment = async (args: Flags) => {

  log(`\ndeleting the ${args.name} environment`, "cyan");

  const {status: _, data} = await manageContentfulData(`environments/${args.name}`, "DELETE");
  // erase the current local setting. this will cause a wanted error on run-migrations
  await writeEnvFile("");

  console.log(data);

}

const deleteEnvironmentCommand:Command = {
  name: 'delete-env',
  requiredFlags: ['name'],
  docs: "\n delete-env will delete a contentful environment given --name's value \n",
  exec: async (args: Flags) => await deleteEnvironment(args)
}

export default deleteEnvironmentCommand;