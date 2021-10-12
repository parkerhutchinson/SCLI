import log from "../utils/log.ts";
import { Command, Flags } from "../types/command.d.ts";
import { manageContentfulData } from "../lib/contentful-data.ts";


/**
 * @description deletes a chosen environment
 * @param args string[]: this expects name to be present
 */
const deleteEnvironment = async (args: Flags) => {

  log(`\ndeleting the ${args.name} environment`, "cyan");

  const {status, data} = await manageContentfulData(`environments/${args.name}`, "DELETE");

  console.log(data);

}

const deleteEnvironmentTask:Command = {
  name: 'del-env',
  requiredFlags: ['name'],
  docs: '\n --name is used to determine the environment to delete',
  exec: async (args: Flags) => await deleteEnvironment(args)
}

export default deleteEnvironmentTask;