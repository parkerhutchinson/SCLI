import log from "../utils/log.ts";
import {Task} from "../types/task.d.ts";
import {manageContentfulData} from "../lib/contentful-data.ts";
import yargs from "https://cdn.deno.land/yargs/versions/yargs-v16.2.1-deno/raw/deno.ts";


interface Flags {
  name: string;
}

/**
 * 
 * @param name string: the environment name
 * @returns 
 */
const createEnvironment = async (args:string[]) => {
  const flags: Flags = yargs(args).argv;

  if (!flags['name']) {
    log("name flag not provided", "red");
    return;
  }
  
  log(`creating environment ${flags['name']}`, "green");
  const {status: environmentStatus, data: environmentData} = await manageContentfulData('environments', false);

  if (environmentStatus === 'error') {
    return environmentData.message;
  }
  
  return environmentData;
}

const createEnvironmentTask:Task = {
  name: 'create-env',
  exec: async (args:string[]) => await createEnvironment(args)
}

export default createEnvironmentTask;



