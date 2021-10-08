import yargs from "https://cdn.deno.land/yargs/versions/yargs-v16.2.1-deno/raw/deno.ts";
import log from "./utils/log.ts";
import run from "./utils/run.ts";
import createEnvTask from "./tasks/create-environment.ts";

// testing my subproccess wrapper.
await run(["npx", "contentful-migrate"]);

// testing the task API 
const data = await createEnvTask.exec('test');
console.log(data);

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
