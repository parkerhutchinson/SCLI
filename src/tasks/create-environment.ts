import yargs from "https://cdn.deno.land/yargs/versions/yargs-v16.2.1-deno/raw/deno.ts";
import log from "../utils/log.ts";
import {task as TTask} from "../types/task.d.ts";
import {manageContentfulData} from "../lib/contentful-data.ts";

// testing user supplied data
interface IArguments {
  "create-env": string;
}

// sub command ideation
// const COMMANDS = 'contentful'|'stereo';
// const subCommandExists = SubCommandList.includes(Deno.args[0]);

const InputArgs: IArguments = yargs(Deno.args).argv;
console.log(InputArgs);

log(InputArgs["create-env"], "blue");


const createEnvironment = async (name:string) => {
  const {status: environmentStatus, data: environmentData} = await manageContentfulData('environments', false);
  return environmentData;
}

const task:TTask = {
  command: 'create-env',
  flags: [{name: '--name'}],
  exec: async (name:string) => await createEnvironment(name)
}

export default task;