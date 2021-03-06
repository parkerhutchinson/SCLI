import log from "../../../utils/log.ts";
import { Command, Flags } from "../../../types/command.d.ts";
import { manageContentfulData } from "../../../lib/contentful-data.ts";
import { writeEnvFile } from "../../../lib/env-io.ts";


/**
 * @description creates a new environment given a name and also assigns access tokens to new environment
 * @param name string: the environment name
 * @returns
 */
const createEnvironment = async (args: Flags) => {
  const {name} = args;
  log(`\ncreating environment ${name}`, "green");

  const { 
    status: environmentStatus, 
    data: environmentData
  } = await manageContentfulData(`environments/${name}`, "PUT", {Name: name,});
  
  if (environmentStatus === "error") {
    log(environmentData.message, "red");
  } else {
    // @ts-ignore: we know this will be a string and not a string[]
    await writeEnvFile(name);
    log(
      `\nEnvironment ${environmentData.name} has successfully been requested for creation. This task may take several minutes to resolve.`,
      "cyan"
    );
  }
};


const createEnvironmentCommand: Command = {
  name: "create-env",
  requiredFlags: ['name'],
  docs: "\n create-env will create a new contentful environment given --name's value \n",
  exec: async (args: Flags) => await createEnvironment(args),
};

export default createEnvironmentCommand;
