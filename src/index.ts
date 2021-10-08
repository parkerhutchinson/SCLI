import yargs from "https://cdn.deno.land/yargs/versions/yargs-v16.2.1-deno/raw/deno.ts";
import log from "./utils/log.ts";
import run from "./utils/run.ts";
import createEnvTask from "./tasks/create-environment.ts";
import { getContentfulData } from "./lib/contentful-data.ts";

await run(["npx", "contentful-migrate"]);

const { status: entriesStatus, data: entriesData } = await getContentfulData(
  "asdfasd"
);

const data = await createEnvTask.exec('test');

console.log(data);
// if (environmentStatus !== 'error') {
//   console.log(environmentData);
// } else {
//   log(environmentData.message, "red");
// }

if (entriesStatus !== "error") {
  console.log(entriesData);
} else {
  log(entriesData.message, "red");
}

// prototype 3 user supplied data
interface IArguments {
  "create-environment": string;
}

// const COMMANDS = 'contentful'|'stereo';
// const subCommandExists = SubCommandList.includes(Deno.args[0]);

const InputArgs: IArguments = yargs(Deno.args).argv;

console.log(InputArgs);

log(InputArgs["create-environment"], "blue");
