import log from "../utils/log.ts";
import { Task } from "../types/task.d.ts";
import { manageContentfulData } from "../lib/contentful-data.ts";
import getFlags from "../utils/get-flags.ts";

interface Flags {
  name: string;
}

/**
 * @description creates a new environment given a name and also assigns access tokens to new environment
 * @param name string: the environment name
 * @returns
 */
const createEnvironment = async (args: string[]) => {
  const flags: Flags = getFlags(args);

  if (!flags["name"]) {
    log("name flag not provided", "red");
    return;
  }

  log(`creating environment ${flags["name"]}`, "green");

  const { 
    status: environmentStatus, 
    data: environmentData
  } = await manageContentfulData(`environments/${flags["name"]}`, "PUT", {Name: flags["name"],});
  
  if (environmentStatus === "error") {
    log(environmentData.message, "red");
  } else {
    log(
      `Environment ${environmentData.name} has successfully been requested for creation. This task may take several minutes to resolve.`,
      "cyan"
    );
  }
};

const createEnvironmentTask: Task = {
  name: "create-env",
  exec: async (args: string[]) => await createEnvironment(args),
};

export default createEnvironmentTask;
