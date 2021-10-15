import log from "../../../utils/log.ts";
import { Command, Flags } from "../../../types/command.d.ts";
import { writeEnvFile } from "../../../lib/env-io.ts";
import { manageContentfulData } from "../../../lib/contentful-data.ts";


/**
 * @description manually switches the active environment to --name by the user. 
 * only works if that environment has been created.
 * @param name string: the environment name
 * @returns
 */
const setEnvironment = async (args: Flags) => {

  log(`\n setting environment ${args.name} as the active environment`, "green");
  const { 
    status: environmentStatus, 
    data: environmentData
  } = await manageContentfulData(`environments`, "GET");

  if (environmentStatus === "error") {
    log(environmentData.message, "red");
  } else {
    // @ts-ignore: if there is no error then yes items does exist
    const envs = environmentData?.items.map((env:string) => env.name);
    if (envs.includes(args.name)) {
      // @ts-ignore: args.name is a string
      await writeEnvFile(args.name);
      log(
        `\n Environment ${args.name} has been set as active.`,
        "cyan"
      );
    } else {
      log(
        `\n Environment ${args.name} does not exist in contentful. try creating the environment instead using create-env --name.`,
        "red"
      );
    }
  }
};


const setEnvironmentCommand: Command = {
  name: "set-env",
  requiredFlags: ['name'],
  docs: "\n sets the local .scli to the environment given --name \n",
  exec: async (args: Flags) => await setEnvironment(args),
};

export default setEnvironmentCommand;