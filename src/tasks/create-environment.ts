import log from "../utils/log.ts";
import { Command, Flags } from "../types/command.d.ts";
import { manageContentfulData } from "../lib/contentful-data.ts";


/**
 * @description creates a new environment given a name and also assigns access tokens to new environment
 * @param name string: the environment name
 * @returns
 */
const createEnvironment = async (args: Flags) => {
  log(`creating environment ${args.name}`, "green");

  const { 
    status: environmentStatus, 
    data: environmentData
  } = await manageContentfulData(`environments/${args.name}`, "PUT", {Name: args.name,});
  
  if (environmentStatus === "error") {
    log(environmentData.message, "red");
  } else {
    log(
      `Environment ${environmentData.name} has successfully been requested for creation. This task may take several minutes to resolve.`,
      "cyan"
    );
  }
};


const createEnvironmentTask: Command = {
  name: "create-env",
  requiredFlags: ['name'],
  exec: async (args: Flags) => await createEnvironment(args),
};

export default createEnvironmentTask;
