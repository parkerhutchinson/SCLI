import log from "../utils/log.ts";
import { Task } from "../types/task.d.ts";
import { manageContentfulData } from "../lib/contentful-data.ts";

/**
 * @description deletes a chosen environment
 * @param args string[]: this expects name to be present
 */
const deleteEnvironment = async (args: {[flag: string]: string}) => {

  log(`deleting the ${args.name} environment`, "cyan");

  const {status, data} = await manageContentfulData(`environments/${args.name}`, "DELETE");

  console.log(data);

}

const deleteEnvironmentTask:Task = {
  name: 'del-env',
  requiredFlags: ['name'],
  exec: async (args:{[flag: string]: string}) => await deleteEnvironment(args)
}

export default deleteEnvironmentTask;