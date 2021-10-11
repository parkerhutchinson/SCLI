import log from "../utils/log.ts";
import { Command } from "../types/command.d.ts";
import { manageContentfulData } from "../lib/contentful-data.ts";
import getFlags from "../utils/get-flags.ts";


/**
 * @description deletes a chosen environment
 * @param args string[]: this expects name to be present
 */
const deleteEnvironment = async (args: {[flag: string]: string}) => {

  log(`deleting the ${args.name} environment`, "cyan");

  const {status, data} = await manageContentfulData(`environments/${args.name}`, "DELETE");

  console.log(data);

}

const deleteEnvironmentTask:Command = {
  name: 'del-env',
  requiredFlags: ['name'],
  exec: async (args: string[]) => await deleteEnvironment(getFlags(args))
}

export default deleteEnvironmentTask;