import log from "../utils/log.ts";
import { Task } from "../types/task.d.ts";
import { manageContentfulData } from "../lib/contentful-data.ts";
import getFlags from "../utils/get-flags.ts";


interface Flags {
  name: string
}

/**
 * @description deletes a chosen environment
 * @param args string[]: this expects name to be present
 */
const deleteEnvironment = async (args:string[]) => {
  const flags:Flags = getFlags(args);

  log(`deleting the ${flags['name']} environment`, "cyan");

  const {status, data} = await manageContentfulData(`environments/${flags['name']}`, "DELETE");

  console.log(data);

}

const deleteEnvironmentTask:Task = {
  name: 'del-env',
  exec: async (args:string[]) => await deleteEnvironment(args)
}

export default deleteEnvironmentTask;