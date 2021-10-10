import yargs from "https://cdn.deno.land/yargs/versions/yargs-v16.2.1-deno/raw/deno.ts";

const getFlags = (args:string[]) => {
  return yargs(args).argv;
}

export default getFlags;