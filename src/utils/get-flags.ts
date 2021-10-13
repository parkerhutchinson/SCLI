import yargs from "https://cdn.deno.land/yargs/versions/yargs-v16.2.1-deno/raw/deno.ts";

/**
 * 
 * @param {string[]} args: user supplied string[] from Deno.args
 * @returns object
 * @property {string[]} object._ 
 * @property {string} object.$0
 * @property {{[key: string]: unknown}} object.value
 * 
 */
const getFlags = (args:string[]) => {
  return yargs(args).argv;
}

export default getFlags;